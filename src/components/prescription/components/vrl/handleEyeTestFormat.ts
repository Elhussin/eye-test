import { safeToast } from "./toastService"; 

export const handleEyeTestFormat = ({
  field,
  value,
  setFieldErrors,
  setValue,
  getValues,
}: any) => {
  if (!value || value.trim() === "") {
    setFieldErrors((prev: any) => ({ ...prev, [field]: false }));
    return;
  }

  let formatted = value.replace(",", ".").trim();
  const numeric = Number(formatted);

  if (isNaN(numeric)) {
    setFieldErrors((prev: any) => ({ ...prev, [field]: true }));
    safeToast("❌ Only valid numeric values allowed", { type: "error" });
    return;
  }

  setFieldErrors((prev: any) => ({ ...prev, [field]: false }));

  if (field.includes("sphere") || field.includes("cylinder") || field.includes("reading_add")) {
    formatted = numeric.toFixed(2);
  }

  if (field.includes("axis")) {
    if (numeric < 1 || numeric > 180) {
      setFieldErrors((prev) => ({ ...prev, [field]: true }));
      safeToast("⚠️ Axis must be between 1 and 180", { type: "warning" });
      return;
    }
    formatted = Math.round(numeric).toString();
  }

  setValue(field, formatted);

  const side = field.includes("right") ? "right" : "left";
  const cylField = `${side}_cylinder`;
  const axisField = `${side}_axis`;

  if (field.includes("cylinder") && numeric === 0) {
    setValue(axisField, "");
    return;
  }

  if (field.includes("axis")) {
    const cylVal = Number(getValues()[cylField] || 0);
    if (cylVal === 0) {
      setValue(field, "");
      safeToast("❌ Axis should be empty if CYL = 0", { type: "error" });
    }
  }
};
