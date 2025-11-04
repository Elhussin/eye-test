import { Info } from "lucide-react";
export const Notes = () => {
  return (
    <div className="bg-amber-50 border-r-4 border-amber-500 rounded-lg p-4" dir="rtl">
      <div className="flex items-start gap-3">
        <Info className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
        <div className="text-sm text-gray-700">
          <p className="font-semibold text-amber-900 mb-2">توصيات مهنية ونقاط مهمة:</p>
          <ul className="space-y-1">
            <li>• <strong>القياسات العالية (±4D وأكثر):</strong> استخدم معامل انكسار 1.67 أو أعلى لتقليل السمك</li>
            <li>• <strong>Polycarbonate/Trivex:</strong> مثالي للأطفال والرياضيين (مقاوم للكسر) لكن يحتاج سمك أكبر</li>
            <li>• <strong>Abbe Value:</strong> كلما زاد = وضوح أفضل وتشوه لوني أقل (CR-39 الأفضل: 58)</li>
            <li>• <strong>Decentration العالي:</strong> يزيد من السمك - قد تحتاج لإطار أصغر أو مادة أعلى كثافة</li>
            <li>• <strong>الأسطوانة العالية ({">"}2D):</strong> تتطلب سمك مركزي إضافي للاستقرار</li>
            <li>• <strong>الزجاج:</strong> أوضح بصرياً وأرفع لكن أثقل وأقل أماناً (تجنبه للأطفال)</li>
            <li>• <strong>الوزن:</strong> حساب تقريبي - قد يختلف ±15% حسب التصميم النهائي</li>
            <li>• <strong>Back Curve السالب:</strong> يشير لعدسة مقعرة في الخلف (Minus lenses)</li>
          </ul>
        </div>
      </div>
    </div>
  )
}