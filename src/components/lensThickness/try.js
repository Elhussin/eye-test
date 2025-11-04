/**
 * Calculates the estimated maximum edge thickness for a minus lens.
 * @param {number} sphere Sphere power in Diopters (negative for minus lenses).
 * @param {number} cylinder Cylinder power in Diopters (usually negative).
 * @param {number} axis Cylinder axis in degrees (1 to 180).
 * @param {number} pd Patient's monocular pupillary distance (mm).
 * @param {number} frameA Frame A measurement (lens width, mm).
 * @param {number} frameDBL Frame DBL (distance between lenses, mm).
 * @param {number} effectiveDiameter Frame Effective Diameter (ED, mm).
 * @param {number} refractiveIndex Lens material refractive index (e.g., 1.5, 1.6, 1.67, 1.74).
 * @param {number} minCenterThickness Minimum required center thickness (mm, typically 1.0mm to 2.2mm).
 * @returns {number} Estimated maximum edge thickness in millimeters.
 */
function estimateMaxEdgeThickness(sphere, cylinder, axis, pd, frameA, frameDBL, effectiveDiameter, refractiveIndex, minCenterThickness) {
    // 1. Determine the Minimum Blank Size (MBS)
    // MBS = ED + A + DBL - PD (rule of thumb, or more accurately 2 * effective radius)
    // A more practical approach is using MBS = ED + 2 * Decentration
    const totalDecentration = (frameA + frameDBL) - pd;
    const mbs = effectiveDiameter + totalDecentration; // Use effective diameter for accuracy

    // 2. Determine the effective power through the relevant meridian (180° for minus lens max thickness in most cases)
    // Power along any meridian = Fsph + Fcyl * sin^2(A)
    // A is the angle between the given axis and the meridian of interest (e.g., 180 or 90)
    // For simplicity here, we approximate power along 180 meridian for typical frame shapes, ignoring the sign for thickness calculation.
    const angleRad = axis * Math.PI / 180;
    const power180 = sphere + cylinder * Math.sin(angleRad) * Math.sin(angleRad);
    const effectivePower = Math.abs(power180); // Use absolute value for thickness

    // 3. Use an approximate K-value formula
    // K-values are pre-calculated constants based on material index and diameter.
    // An approximate formula can be derived from the sag formula: K ≈ (Diameter^2) / (2000 * (Index - 1))
    const K = (mbs * mbs) / (2000 * (refractiveIndex - 1));

    // 4. Calculate the total thickness
    // Thickness = Power * K + Minimum Center Thickness
    const maxEdgeThickness = (effectivePower * K) + minCenterThickness;

    return maxEdgeThickness;
}

// Example Usage for a -3.00 DS, -1.00 DC x 045 lens
// Frame: 52mm A size, 16mm DBL, 54mm ED. Patient PD 62mm.
// Lens material: Spectralite (Index 1.56, approx K-value at 60mm is 0.68)
const sphere = -3.00;
const cylinder = -1.00;
const axis = 45;
const pd = 62; // Total PD; for monocular calculations, separate PDs for each eye are better.
const frameA = 52;
const frameDBL = 16;
const effectiveDiameter = 54;
const refractiveIndex = 1.56;
const minCenterThickness = 1.0; // Minimum center thickness for a minus lens

const edgeThickness = estimateMaxEdgeThickness(sphere, cylinder, axis, pd, frameA, frameDBL, effectiveDiameter, refractiveIndex, minCenterThickness);
console.log(`Estimated maximum edge thickness: ${edgeThickness.toFixed(2)} mm`);
