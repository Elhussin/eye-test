export const validateEyeTest = (data: any) => {
  const fields = [
    "right_sphere", "left_sphere",
    "right_cylinder", "left_cylinder",
    "right_axis", "left_axis",
    "right_reading_add", "left_reading_add",
  ];

  const errors: Record<string, string> = {};
  let valid = true;

  fields.forEach(field => {
    const value = data[field];

    if (!value || value.toString().trim() === "") {
      return; // مش إجباري كله
    }

    const numeric = Number(value);
    if (isNaN(numeric)) {
      valid = false;
      errors[field] = "Must be numeric";
    }

    if (field.includes("axis")) {
      if (numeric < 1 || numeric > 180) {
        valid = false;
        errors[field] = "Axis 1–180";
      }
    }
  });

  // CYL & AXIS Validation Pair
  ["right", "left"].forEach(side => {
    const cyl = Number(data[`${side}_cylinder`] || 0);
    const axis = data[`${side}_axis`] || "";

    if (cyl === 0 && axis !== "") {
      valid = false;
      errors[`${side}_axis`] = "Axis must be empty when CYL = 0";
    }
  });

  return {
    valid,
    errors,
    message: valid ? "" : "⚠️ Please fix highlighted fields before saving.",
  };
};
