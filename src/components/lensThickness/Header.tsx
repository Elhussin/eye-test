import { Calculator } from "lucide-react";
export const Header = () => {
    return (
          <div className="bg-blue-900 text-white p-6">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Calculator className="w-10 h-10" />
              <h1 className="text-3xl font-semibold">حاسبة سمك العدسات </h1>
            </div>
            <p className="text-center text-blue-100">حساب دقيق لسمك العدسة مع جميع المعايير المهنية</p>
          </div>
    )
}