//  ues in crud
export interface CrudFormOptions {
  alias: string;
  defaultValues?: any;
  onSuccess?: () => void;
  onError?: (err: any) => void;
  className?: string;
  submitText?: string;
}

export interface formRequestProps extends CrudFormOptions  {
  onCancel?: () => void;
  showCancelButton?: boolean;
  mode?: 'create' | 'edit'|'login';
  id?: string | number | undefined;
  submitForm?: (data?: any) => Promise<{ success: boolean; error?: any }>;
  istenant?: boolean;
  title?: string;
  message?: string;
  
}

/* ======================
   🔹 UI Helpers
   ====================== */
export const errorInputClass = "border-red-500 bg-red-500 text-white focus:ring-red-500";
export const normalInputClass = "border-gray-300 focus:ring-blue-500";
   
   

/* ======================
   🔹 EyeRow Component
   ====================== */
export interface EyeRowProps {
    side: "right" | "left";
    register: any;
    isView: boolean;
    fieldErrors: Record<string, boolean>;
    setFieldErrors: (fieldErrors: Record<string, boolean>) => void;
    setValue: (field: string, value: string) => void;
    getValues: (field: string) => string;
  }
   

/* ======================
   🔹 Main Form Component
   ====================== */
export interface PrescriptionFormProps extends formRequestProps {
  isView?: boolean;
}

export interface OtherFailedProps{
   register:any;
   // customers:Record<string,any>[];
   // setShowModal:(value:boolean)=>void;
   errors:any;
   isView?:boolean;
 }
