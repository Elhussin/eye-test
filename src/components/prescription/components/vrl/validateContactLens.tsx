export const validateContactLens = (data: any) => {
  const buildLens = (side: "right" | "left") => ({
    SPH: data[`${side}_sphere`] || "-",
    CY: data[`${side}_cylinder`] || "-",
    ADD: data[`${side}_reading_add`] || "-",
    AX: data[`${side}_axis`] || "-",
    BV: 8.6, // 👈 تقدر تغيّر لاحقًا
  });

  return {
    rightSphere: buildLens("right"),
    leftSphere: buildLens("left"),
    rightToric: buildLens("right"),
    leftToric: buildLens("left"),
  };
};
