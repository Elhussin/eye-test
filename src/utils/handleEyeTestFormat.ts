import { EyeTestValidator } from "eye-test-utils";

interface HandleEyeTestFormatProps {
    field: string;
    value: string;
    setFieldErrors: any;
    setValue: any;
    getValues: any;

}

const validator = new EyeTestValidator();

const validatorMap: Record<string, (n: number) => number | string | null> = {
  sphere: (n: number) => validator.validateSPH(n),
  cylinder: (n: number) => validator.validateCYL(n),
  axis: (n: number) => validator.validateAxis(n),
  add: (n: number) => validator.validateADD(n),
  pupillary_distance: (n: number) => validator.validatePD(n),
  sigmant: (n: number) => validator.validateSG(n),
  vertical_distance: (n: number) => validator.validateVertexDistance(n),
};


export const handleEyeTestFormat = (props:HandleEyeTestFormatProps) => {
    const {field, value,setFieldErrors,setValue,getValues} = props

    if(isNaN(Number(value))){
      setFieldErrors((prev:any) => ({ ...prev, [field]: true }));
      return;
    }else if(!value ){
      setFieldErrors((prev:any) => ({ ...prev, [field]: false }));
      return; 
    }
    const num = Number(value);
    const validatorKey = Object.keys(validatorMap).find((k) => field.includes(k));

    if (!validatorKey) return;
  
    const formatted = validatorMap[validatorKey](num);
  
    const applyValue = (targetField: string, val: string | number) => {
      setValue(targetField, val);
      setFieldErrors((prev:any) => ({ ...prev, [targetField]: false }));
    };
  
    if (formatted !== null) {
      const mirrorFields: Record<string, string> = {
        right_pupillary_distance: "left_pupillary_distance",
        right_reading_add: "left_reading_add",
        sigmant_right: "sigmant_left",
      };
  
      if (field in mirrorFields) {
        let val = formatted as number;
        if (field === "right_pupillary_distance" && val >= 45) val = val / 2;
        applyValue(field, val);
        applyValue(mirrorFields[field], val);
      } else {
        applyValue(field, formatted);
      }
  
      if (
        field.includes("sphere") ||
        field.includes("cylinder") ||
        field.includes("axis")
      ){
        
        const side = field.startsWith("right") ? "right" : "left";
        const sph = parseFloat(getValues(`${side}_sphere`));
        const cyl = parseFloat(getValues(`${side}_cylinder`));
        const axis = parseFloat(getValues(`${side}_axis`));
  
        if (!isNaN(sph) && !isNaN(cyl) && !isNaN(axis)) {
          const transformed = validator.transformSphCylAxis(sph, cyl, axis);
          if (transformed) {
            applyValue(`${side}_sphere`, transformed.sph);
            applyValue(`${side}_cylinder`, transformed.cyl);
            applyValue(`${side}_axis`, transformed.axis);
          }
        }
      }
    } else {
  
      setFieldErrors((prev:any) => ({ ...prev, [field]: true }));
    }
  };



