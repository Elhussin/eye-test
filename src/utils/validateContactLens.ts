import {ContactLensValidator } from "eye-test-utils";

export const validateContactLens=(data:any)=>{
const contactLensValidator = new ContactLensValidator();  
 const rightSphere = contactLensValidator.convertToSpheric({SPH: data.right_sphere,CY: data.right_cylinder,AX: data.right_axis,BV: data.vertical_distance_right,ADD: data.right_reading_add});

 const leftSphere = contactLensValidator.convertToSpheric({SPH: data.left_sphere,CY: data.left_cylinder,AX: data.left_axis,BV: data.vertical_distance_left,ADD: data.left_reading_add});

 const rightToric = contactLensValidator.convertToToric({SPH: data.right_sphere,CY: data.right_cylinder,AX: data.right_axis,BV: data.vertical_distance_right,ADD: data.right_reading_add});

 const leftToric = contactLensValidator.convertToToric({SPH: data.left_sphere,CY: data.left_cylinder,AX: data.left_axis,BV: data.vertical_distance_left,ADD: data.left_reading_add});

return {
    rightSphere,
    leftSphere,
    rightToric,
    leftToric
}
}