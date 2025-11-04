import { materials } from '../../constants/data'
import {Notes} from './Notes'
interface LensVisualizerProps {
  results: any;
  lensMaterial: string; // Now TypeScript will enforce valid material keys
}
export default function LensVisualizer({ results, lensMaterial }: LensVisualizerProps) {
  if (!results) return null;

  const effectivePower = parseFloat(results.effectivePower);
  const centerThick = parseFloat(results.center);
  const edgeThick = parseFloat(results.edge);
  const diameter = parseFloat(results.effectiveDiameter);

  // إعداد المقاييس
  const scale = 2.5; // عرض العدسة بالبكسل لكل مم
  const thicknessScale = 8; // مقياس السمك
  const lensWidth = diameter * scale;
  const centerX = 160;
  const centerY = 110;
  const halfWidth = lensWidth / 2;

  // إعداد الظلال والانعكاسات
  const gradientId = "lensGrad";
  const reflectionId = "lensReflection";

  // نوع العدسة
  const isMinus = effectivePower < -0.25;
  const isPlus = effectivePower > 0.25;
  const lensType = isMinus ? "مقعرة (-)" : isPlus ? "محدبة (+)" : "مسطحة (0)";

  // إعداد المنحنى
  const curvature = Math.min(50, Math.abs(edgeThick - centerThick) * 2);

  const centerHeight = centerThick * thicknessScale;
  const edgeHeight = edgeThick * thicknessScale;
  const material = materials[lensMaterial]
  return (

    <div className="space-y-6">
      {/* النتائج الرئيسية */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8' dir="rtl">
        <div className="bg-linear-to-br from-blue-600 to-indigo-700 rounded-xl p-6 text-gray-800">
          <h2 className="text-2xl font-bold mb-4">النتائج المحسوبة</h2>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm">
              <p className="text-sm opacity-90 mb-1">السمك المركزي</p>
              <p className="text-3xl font-bold">{results.center}</p>
              <p className="text-xs opacity-75">ملليمتر</p>
            </div>

            <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm">
              <p className="text-sm opacity-90 mb-1">سمك الحافة</p>
              <p className="text-3xl font-bold">{results.edge}</p>
              <p className="text-xs opacity-75">ملليمتر</p>
            </div>

            <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm">
              <p className="text-sm opacity-90 mb-1">القطر الفعال</p>
              <p className="text-2xl font-bold">{results.effectiveDiameter}</p>
              <p className="text-xs opacity-75">ملليمتر</p>
            </div>

            <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm">
              <p className="text-sm opacity-90 mb-1">Decentration</p>
              <p className="text-2xl font-bold">{results.decentration}</p>
              <p className="text-xs opacity-75">ملليمتر</p>
            </div>
          </div>

          <div className="bg-white bg-opacity-10 rounded-lg p-3 backdrop-blur-sm text-sm space-y-1">
            <p><span className="font-semibold">القوة الفعالة:</span> {results.effectivePower}D</p>
            <p><span className="font-semibold">Base Curve:</span> {results.baseCurve}D</p>
            <p><span className="font-semibold">Back Curve:</span> {results.backCurve}D</p>
            <p><span className="font-semibold">نوع العدسة:</span> {lensType}</p>
            <p><span className="font-semibold">الوزن التقريبي:</span> {results.weight}g</p>
          </div>
        </div>

        {/* معلومات المادة */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
          <h3 className="text-lg font-bold text-gray-800 mb-3">معلومات المادة والحسابات</h3>
          <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
            <div>
              <p className="font-semibold text-green-700">المادة:</p>
              <p>{material.name}</p>
            </div>
            <div>
              <p className="font-semibold text-green-700">معامل الانكسار:</p>
              <p>{material.index}</p>
            </div>
            <div>
              <p className="font-semibold text-green-700">Abbe Value:</p>
              <p>{material.abbe} (جودة البصرية)</p>
            </div>
            <div>
              <p className="font-semibold text-green-700">السمك الأدنى:</p>
              <p>{results.minThickness}mm</p>
            </div>
            <div>
              <p className="font-semibold text-green-700">Front Sagitta:</p>
              <p>{results.frontSagitta}mm</p>
            </div>
            <div>
              <p className="font-semibold text-green-700">Back Sagitta:</p>
              <p>{results.backSagitta}mm</p>
            </div>
          </div>
        </div>
      </div>

      {/* التمثيل البصري */}
      <div className='grid grid-cols-1 md:grid-cols-2' dir="rtl">
        <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 text-start">
            التمثيل البصري الدقيق للعدسة
          </h3>
          <div className="flex justify-center">
            <svg width="320" height="220" viewBox="0 0 320 220">
              <defs>
                <linearGradient id="lensGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
                </linearGradient>
                <filter id="shadow">
                  <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3" />
                </filter>
              </defs>

              {(() => {
                const effectivePower = parseFloat(results.effectivePower);
                const centerThick = parseFloat(results.center);
                const edgeThick = parseFloat(results.edge);
                const diameter = parseFloat(results.effectiveDiameter);

                const scale = 2.5;
                const lensWidth = diameter * scale;
                const centerX = 160;
                const centerY = 110;
                const thicknessScale = 8;

                if (effectivePower < 0) {
                  // عدسة مقعرة
                  // const centerHeight = centerThick * thicknessScale;
                  // const edgeHeight = edgeThick * thicknessScale;
                  // const halfWidth = lensWidth / 2;
                  // const curvature = Math.min(50, (edgeHeight - centerHeight) / 2);
                  // عدسة مقعرة
                  const centerHeightScaled = centerThick * thicknessScale; // السمك المركزي بالبكسل
                  const edgeHeightScaled = edgeThick * thicknessScale; // سمك الحافة بالبكسل
                  const halfWidth = lensWidth / 2;

                  // الفرق بين الحافة والمركز بالبكسل
                  const sagDifferenceScaled = (edgeThick - centerThick) * thicknessScale;

                  // مسار السطح العلوي (لتمثيل الانحناء)
                  // نستخدم نصف الفرق السهمي في نقطة التحكم Q
                  const controlPointYTop = centerY - centerHeightScaled / 2;

                  return (
                    <>

                      {/* مسار العدسة (Front Surface) */}
                      <path
                        d={`M ${centerX - halfWidth} ${centerY - edgeHeightScaled / 2}
                              Q ${centerX} ${controlPointYTop - sagDifferenceScaled * 0.5}, 
                              ${centerX + halfWidth} ${centerY - edgeHeightScaled / 2}`}
                      // ... (بقية الخصائص)
                      />

                      {/* مسار العدسة (Back Surface) */}
                      <path
                        d={`M ${centerX - halfWidth} ${centerY + edgeHeightScaled / 2}
                              Q ${centerX} ${centerY + centerHeightScaled / 2 + sagDifferenceScaled * 0.5}, 
                              ${centerX + halfWidth} ${centerY + edgeHeightScaled / 2}`}
                      // ... (بقية الخصائص)
                      />

                      {/* مسار التعبئة (Fill Path) */}
                      <path
                        d={`M ${centerX - halfWidth} ${centerY - edgeHeightScaled / 2}
                              Q ${centerX} ${controlPointYTop - sagDifferenceScaled * 0.5}, 
                              ${centerX + halfWidth} ${centerY - edgeHeightScaled / 2}
                              L ${centerX + halfWidth} ${centerY + edgeHeightScaled / 2}
                              Q ${centerX} ${centerY + centerHeightScaled / 2 + sagDifferenceScaled * 0.5}, 
                              ${centerX - halfWidth} ${centerY + edgeHeightScaled / 2}
                              Z`}
                        fill="url(#lensGrad)"
                        filter="url(#shadow)"
                      />
                      <path
                        d={`M ${centerX - halfWidth} ${centerY - edgeHeight / 2}
                                   Q ${centerX} ${centerY - centerHeight / 2 - curvature}, 
                                     ${centerX + halfWidth} ${centerY - edgeHeight / 2}`}
                        fill="none"
                        stroke="#1e40af"
                        strokeWidth="2.5"
                      />

                      <path
                        d={`M ${centerX - halfWidth} ${centerY + edgeHeight / 2}
                                   Q ${centerX} ${centerY + centerHeight / 2 + curvature}, 
                                     ${centerX + halfWidth} ${centerY + edgeHeight / 2}`}
                        fill="none"
                        stroke="#1e40af"
                        strokeWidth="2.5"
                      />

                      <path
                        d={`M ${centerX - halfWidth} ${centerY - edgeHeight / 2}
                                   Q ${centerX} ${centerY - centerHeight / 2 - curvature}, 
                                     ${centerX + halfWidth} ${centerY - edgeHeight / 2}
                                   L ${centerX + halfWidth} ${centerY + edgeHeight / 2}
                                   Q ${centerX} ${centerY + centerHeight / 2 + curvature}, 
                                     ${centerX - halfWidth} ${centerY + edgeHeight / 2}
                                   Z`}
                        fill="url(#lensGrad)"
                        filter="url(#shadow)"
                      />

                      <line
                        x1={centerX}
                        y1={centerY - centerHeight / 2 - curvature}
                        x2={centerX}
                        y2={centerY + centerHeight / 2 + curvature}
                        stroke="#ef4444"
                        strokeWidth="2"
                        strokeDasharray="3,3"
                      />

                      <line
                        x1={centerX + halfWidth}
                        y1={centerY - edgeHeight / 2}
                        x2={centerX + halfWidth}
                        y2={centerY + edgeHeight / 2}
                        stroke="#22c55e"
                        strokeWidth="2"
                        strokeDasharray="3,3"
                      />

                      <text x={centerX - 35} y={centerY - 5} fill="#ef4444" fontSize="12" fontWeight="bold">
                        مركز: {results.center}mm
                      </text>
                      <text x={centerX + halfWidth + 10} y={centerY + 5} fill="#22c55e" fontSize="12" fontWeight="bold">
                        حافة: {results.edge}mm
                      </text>

                      <line
                        x1={centerX - halfWidth}
                        y1={centerY + edgeHeight / 2 + 25}
                        x2={centerX + halfWidth}
                        y2={centerY + edgeHeight / 2 + 25}
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                      <line
                        x1={centerX - halfWidth}
                        y1={centerY + edgeHeight / 2 + 20}
                        x2={centerX - halfWidth}
                        y2={centerY + edgeHeight / 2 + 30}
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                      <line
                        x1={centerX + halfWidth}
                        y1={centerY + edgeHeight / 2 + 20}
                        x2={centerX + halfWidth}
                        y2={centerY + edgeHeight / 2 + 30}
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                      <text
                        x={centerX}
                        y={centerY + edgeHeight / 2 + 45}
                        fill="#6366f1"
                        fontSize="12"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        قطر: {results.effectiveDiameter}mm
                      </text>

                      <circle cx={centerX - halfWidth - 20} cy={centerY} r="12" fill="#ef4444" opacity="0.9" />
                      <text x={centerX - halfWidth - 20} y={centerY + 5} fill="white" fontSize="16" fontWeight="bold" textAnchor="middle">
                        -
                      </text>
                    </>
                  );
                } else if (effectivePower > 0) {
                  // عدسة محدبة
                  const centerHeight = centerThick * thicknessScale;
                  const edgeHeight = edgeThick * thicknessScale;
                  const halfWidth = lensWidth / 2;
                  const curvature = Math.min(50, (centerHeight - edgeHeight) / 2);

                  return (
                    <>
                      <path
                        d={`M ${centerX - halfWidth} ${centerY - edgeHeight / 2}
                                   Q ${centerX} ${centerY - centerHeight / 2 - curvature}, 
                                     ${centerX + halfWidth} ${centerY - edgeHeight / 2}`}
                        fill="none"
                        stroke="#1e40af"
                        strokeWidth="2.5"
                      />

                      <path
                        d={`M ${centerX - halfWidth} ${centerY + edgeHeight / 2}
                                   Q ${centerX} ${centerY + centerHeight / 2 + curvature}, 
                                     ${centerX + halfWidth} ${centerY + edgeHeight / 2}`}
                        fill="none"
                        stroke="#1e40af"
                        strokeWidth="2.5"
                      />

                      <path
                        d={`M ${centerX - halfWidth} ${centerY - edgeHeight / 2}
                                   Q ${centerX} ${centerY - centerHeight / 2 - curvature}, 
                                     ${centerX + halfWidth} ${centerY - edgeHeight / 2}
                                   L ${centerX + halfWidth} ${centerY + edgeHeight / 2}
                                   Q ${centerX} ${centerY + centerHeight / 2 + curvature}, 
                                     ${centerX - halfWidth} ${centerY + edgeHeight / 2}
                                   Z`}
                        fill="url(#lensGrad)"
                        filter="url(#shadow)"
                      />

                      <line
                        x1={centerX}
                        y1={centerY - centerHeight / 2 - curvature}
                        x2={centerX}
                        y2={centerY + centerHeight / 2 + curvature}
                        stroke="#ef4444"
                        strokeWidth="2"
                        strokeDasharray="3,3"
                      />

                      <line
                        x1={centerX - halfWidth}
                        y1={centerY - edgeHeight / 2}
                        x2={centerX - halfWidth}
                        y2={centerY + edgeHeight / 2}
                        stroke="#22c55e"
                        strokeWidth="2"
                        strokeDasharray="3,3"
                      />

                      <text x={centerX - 35} y={centerY - centerHeight / 2 - curvature - 10} fill="#ef4444" fontSize="12" fontWeight="bold">
                        مركز: {results.center}mm
                      </text>
                      <text x={centerX - halfWidth - 60} y={centerY + 5} fill="#22c55e" fontSize="12" fontWeight="bold">
                        حافة: {results.edge}mm
                      </text>

                      <line
                        x1={centerX - halfWidth}
                        y1={centerY + centerHeight / 2 + curvature + 25}
                        x2={centerX + halfWidth}
                        y2={centerY + centerHeight / 2 + curvature + 25}
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                      <line
                        x1={centerX - halfWidth}
                        y1={centerY + centerHeight / 2 + curvature + 20}
                        x2={centerX - halfWidth}
                        y2={centerY + centerHeight / 2 + curvature + 30}
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                      <line
                        x1={centerX + halfWidth}
                        y1={centerY + centerHeight / 2 + curvature + 20}
                        x2={centerX + halfWidth}
                        y2={centerY + centerHeight / 2 + curvature + 30}
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                      <text
                        x={centerX}
                        y={centerY + centerHeight / 2 + curvature + 45}
                        fill="#6366f1"
                        fontSize="12"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        قطر: {results.effectiveDiameter}mm
                      </text>

                      <circle cx={centerX + halfWidth + 20} cy={centerY} r="12" fill="#22c55e" opacity="0.9" />
                      <text x={centerX + halfWidth + 20} y={centerY + 5} fill="white" fontSize="16" fontWeight="bold" textAnchor="middle">
                        +
                      </text>
                    </>
                  );
                } else {
                  // عدسة مسطحة
                  const height = centerThick * thicknessScale;
                  const halfWidth = lensWidth / 2;

                  return (
                    <>
                      <rect
                        x={centerX - halfWidth}
                        y={centerY - height / 2}
                        width={lensWidth}
                        height={height}
                        fill="url(#lensGrad)"
                        stroke="#1e40af"
                        strokeWidth="2.5"
                        rx="3"
                        filter="url(#shadow)"
                      />

                      <line
                        x1={centerX}
                        y1={centerY - height / 2}
                        x2={centerX}
                        y2={centerY + height / 2}
                        stroke="#1e40af"
                        strokeWidth="2"
                        strokeDasharray="3,3"
                      />

                      <text x={centerX - 45} y={centerY - height / 2 - 10} fill="#1e40af" fontSize="12" fontWeight="bold">
                        سمك موحد: {results.center}mm
                      </text>

                      <line
                        x1={centerX - halfWidth}
                        y1={centerY + height / 2 + 25}
                        x2={centerX + halfWidth}
                        y2={centerY + height / 2 + 25}
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                      <line
                        x1={centerX - halfWidth}
                        y1={centerY + height / 2 + 20}
                        x2={centerX - halfWidth}
                        y2={centerY + height / 2 + 30}
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                      <line
                        x1={centerX + halfWidth}
                        y1={centerY + height / 2 + 20}
                        x2={centerX + halfWidth}
                        y2={centerY + height / 2 + 30}
                        stroke="#6366f1"
                        strokeWidth="2"
                      />
                      <text
                        x={centerX}
                        y={centerY + height / 2 + 45}
                        fill="#6366f1"
                        fontSize="12"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        قطر: {results.effectiveDiameter}mm
                      </text>
                    </>
                  );
                }
              })()}
            </svg>
          </div>

          <div className="mt-4 text-start text-sm text-gray-600 space-y-1">
            <p className="font-semibold">الرسم يمثل:</p>
            <p>✓ شكل العدسة الفعلي (محدب/مقعر)</p>
            <p>✓ السمك المركزي والحافة بالنسب الصحيحة</p>
            <p>✓ القطر الفعال المحسوب للتنفيذ</p>
          </div>
        </div>
       <Notes />
      </div>
    </div>
  );
}
