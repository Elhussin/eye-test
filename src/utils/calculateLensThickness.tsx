import {materials} from '../constants/data'

/**
 * حساب سماكة العدسات مع Cylinder وAxis
 * @param {Object} params - بيانات العدسة
 * @param {number} params.spherePower - SPH
 * @param {number} params.cylinderPower - CYL
 * @param {number} params.cylinderAxis - محور الأسطوانة
 * @param {number} params.ipd - المسافة بين العينين
 * @param {number} params.frameEyesize - حجم العدسة داخل الإطار (Eyesize)
 * @param {number} params.frameBridge - عرض الجسر (Bridge)
 * @param {string} params.lensMaterial - مادة العدسة
 * @param {string} params.baseCurveMode - "automatic" أو "manual"
 * @param {number} [params.baseCurve] - إذا Base Curve يدوي
 * @returns {Object} النتائج المحسوبة
 */
export function calculateLensThickness(params: any) {
  const {
    spherePower,
    cylinderPower,
    ipd,
    frameEyesize,
    frameBridge,
    lensMaterial,
    baseCurveMode,
    baseCurve = 6.0,
  } = params;


  const material = materials[lensMaterial];
  const n = material.index;
  const density = material.density;

  // 1. القوة والمريديانات
  const effectivePower = spherePower + (cylinderPower / 2);
  const powerMeridian1 = spherePower;
  const powerMeridian2 = spherePower + cylinderPower;
  const maxPower = Math.max(Math.abs(powerMeridian1), Math.abs(powerMeridian2));

  // 2. Base Curve (القوة الأمامية الموجبة)
  const actualBaseCurve = baseCurveMode === 'automatic'
    ? (spherePower >= 0 ? 6.0 + (spherePower / 2) : 6.0 + (spherePower / 4))
    : baseCurve;
  // ضمان Base Curve موجبة
  const P_front = Math.abs(actualBaseCurve); 

  // 3. 🎯 التعديل: القطر المستخدم لحساب Sagitta
  // نستخدم نصف قطر ثابت محافظ (عادةً 48 مم قطر) لتجنب المبالغة في تقدير سمك الحافة/المركز
  const r_for_sagitta = 24.0; 
  const semiDiameter = r_for_sagitta;

  // حساب Decentration لأغراض MBS (قد لا يكون مستخدماً لـ Sagitta)
  const pdPerEye = ipd / 2;
  const frameCenter = (frameEyesize + frameBridge) / 2;
  const horizontalDecentration = Math.abs(frameCenter - pdPerEye);
  const effectiveDiameter = frameEyesize + 2 * horizontalDecentration + 2; 

  // 4. دالة حساب نصف القطر R (mm)
  // R (mm) = 1000 * (n - 1) / Power (D)
  const calcR = (power) => {
    const P_abs = Math.abs(power);
    return P_abs !== 0 ? (1000 * (n - 1)) / P_abs : Infinity;
  };
  
  // 5. 🎯 تصحيح: حساب قوى ونصف أقطار الأسطح
  
  // R_front: نصف قطر محدب (موجب)
  const R_front = calcR(P_front); 

  // القوة الخلفية المطلوبة (لكل مريديان)
  const P_back1 = powerMeridian1 - P_front; // يجب أن تكون سالبة
  const P_back2 = powerMeridian2 - P_front; // يجب أن تكون سالبة

  // نأخذ أقصى قوة مطلقة للسطح الخلفي لحساب Sagitta
  const P_back_max = Math.max(Math.abs(P_back1), Math.abs(P_back2)); 
  const R_back = calcR(P_back_max); 

  // 6. دالة Sagitta
  const sagitta = (r, R) => {
    if (!isFinite(R) || r >= R) return 0;
    return R - Math.sqrt(R * R - r * r);
  };

  // 7. حساب Sagitta للأسطح
  const s_front = sagitta(semiDiameter, R_front);
  const s_back = sagitta(semiDiameter, R_back);

  // 8. حساب الزيادة القصوى في السمك (Sagittal Difference)
  const sagMax = Math.abs(s_front - s_back);

// 9. الحد الأدنى للسمك (Min Thickness) - تم تعديله ليكون أكثر توافقاً مع المعايير التجارية
    let minThickness;

    // القيمة الدنيا للعدسات البلاستيكية القياسية (CR-39, 1.56)
    if (n < 1.586) { 
        // إذا كانت القوة عالية (> 4 D)، نستخدم 2.0 مم. وإلا، نستخدم 1.5 مم
        minThickness = maxPower > 4 ? 2.0 : 1.5; 
    } 
    // القيمة الدنيا للمواد المقاومة للكسر (Polycarbonate, Trivex)
    else if (lensMaterial === 'polycarbonate' || lensMaterial === 'trivex') {
        minThickness = 1.0; // قيمة دنيا شائعة جداً (1.0 مم)
    }
    // القيمة الدنيا للمؤشرات العالية (1.67, 1.74)
    else {
        minThickness = maxPower > 4 ? 1.3 : 1.0;
    }

    // هامش إضافي للأستجماتيزم القوي (كما كان سابقاً)
    if (Math.abs(cylinderPower) > 2.0) minThickness += 0.3;

// ... (بقية الكود)
  // 10. حساب السمك النهائي
  let centerThickness, edgeThickness;
  
  if (effectivePower < -0.25) { // مقعرة (-): أسمك عند الحافة
    centerThickness = minThickness; // الحد الأدنى في المركز
    edgeThickness = centerThickness + sagMax; 
    if (effectivePower < -6) edgeThickness *= 1.05; 
  } else if (effectivePower > 0.25) { // محدبة (+): أسمك في المركز
    edgeThickness = minThickness; // الحد الأدنى عند الحافة
    centerThickness = edgeThickness + sagMax; 
    if (effectivePower > 4) centerThickness *= 1.05; 
  } else { // قريبة من الصفر
    centerThickness = minThickness;
    edgeThickness = minThickness;
  }

  // 11. تقدير الوزن
  const avgThickness = (centerThickness + edgeThickness) / 2; 
  const volume = Math.PI * Math.pow(effectiveDiameter / 10, 2) * (avgThickness / 10); 
  const weight = volume * density; 

  return {
    center: centerThickness.toFixed(2),
    edge: edgeThickness.toFixed(2),
    effectiveDiameter: effectiveDiameter.toFixed(1),
    r_for_sagitta: r_for_sagitta.toFixed(1), // لإظهار القطر المستخدم
    decentration: horizontalDecentration.toFixed(1),
    baseCurve: P_front.toFixed(2),
    effectivePower: effectivePower.toFixed(2),
    minThickness: minThickness.toFixed(1),
    weight: weight.toFixed(1),
    frontSagitta: s_front.toFixed(2),
    backSagitta: s_back.toFixed(2),
    sagittalDifference: sagMax.toFixed(2),
    P_back1: P_back1.toFixed(2),
    P_back2: P_back2.toFixed(2),
    lensType: effectivePower < 0 ? 'مقعرة (-)' : effectivePower > 0 ? 'محدبة (+)' : 'مسطحة',
    backCurve: P_back_max.toFixed(2), // 👈 إضافة هذه الخاصية
  };
}