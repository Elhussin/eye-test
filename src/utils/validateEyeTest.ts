import { safeToast } from "./toastService";
import { EyeTestValidator } from "eye-test-utils";

export const validateEyeTest=(data:any)=>{
    const validator = new EyeTestValidator();
  
    // validate both eyes
    const right = validator.validatePrescription({
      sphere: data.right_sphere,
      cylinder: data.right_cylinder,
      axis: data.right_axis,
      add: data.right_reading_add,
      pd: data.right_pupillary_distance,
      sg: data.sigmant_right,
    });


    if (!right.valid) {
      right.errors.forEach((err) => safeToast("Right eye: " + err, { type: "error" }));
      return false;
    }


    const left = validator.validatePrescription({
      sphere: data.left_sphere,
      cylinder: data.left_cylinder,
      axis: data.left_axis,
      add: data.left_reading_add,
      pd: data.left_pupillary_distance,
      sg: data.sigmant_left,
    });

    if (!left.valid) {
      left.errors.forEach((err) => safeToast("Left eye: " + err, { type: "error" }));
      return false;
    }
    return true;
}
