"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import EyeRow from "./EyeRow";
import EyeExtraRow from "./EyeExtraRow";
import { EyeTestLabel, EyeTestLabelProps } from "./eyeTestLabel";
import { OtherEyeTestFailed } from "./OtherEyeTestFailed";
import ContactLensViewer from "./ContactLensViewer";
import { validateEyeTest, validateContactLens } from "../utils/handleEyeTestFormat";
// import { safeToast } from "../utils/toastService";




export default function EyeTest() {

  const [fieldErrors, setFieldErrors] = useState<Record<string, boolean>>({});
  const [contactLensData, setContactLensData] = useState<any>({});
  const [isView,SetIsView] = useState(false);
 
  const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm();


  // Submit Handler
  const hendaleEdit =()=>{
    SetIsView(false);
  }
  const hendalePrint =()=>{
    window.print();
  }
  const onSubmit =  (data: any) => {
    validateEyeTest(data);
      const eyeTest = validateEyeTest(data);
      if(!eyeTest ){
        return
      }
      const contactLens= validateContactLens(data);
      SetIsView(true);

      setContactLensData(contactLens);

  };

  console.log(isView);
  
  return (
    <div className="print mt-1.5">
                {isView && (
                  <h2 className="text-2xl font-bold p-5 ">Eye Test Resault</h2>

            )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 " dir="ltr">
        {/* Eyes Block */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">

          <div className="grid grid-cols-1 gap-2">
            <EyeTestLabel />
            <EyeRow side="right" {...{ register, isView, setValue, getValues, fieldErrors, setFieldErrors }} />
            <EyeRow side="left" {...{ register, isView, setValue, getValues, fieldErrors, setFieldErrors }} />
          </div>
          <div className="grid grid-cols-1 gap-2 mt-4 md:mt-0">
            <EyeTestLabelProps />
            <EyeExtraRow side="right" {...{ register, isView, setValue, getValues, fieldErrors, setFieldErrors }} />
            <EyeExtraRow side="left" {...{ register, isView, setValue, getValues, fieldErrors, setFieldErrors }} />
          </div>
        </div>
  
        <OtherEyeTestFailed {...{errors, register, isView }} />

        {!isView && (
        <div className="flex justify-end gap-2 btn-card">
          <button
            type="submit"
            title="Save eye test data"
            className="btn flex items-center justify-center gap-1 w-48 !bg-blue-500 hover:!bg-blue-700 !text-white"
          >
            Save
          </button>

        </div>
        )}


      </form>
      { isView&& contactLensData && Object.keys(contactLensData).length > 0 && (
        <ContactLensViewer
          rightSphere={contactLensData.rightSphere}
          leftSphere={contactLensData.leftSphere}
          rightToric={contactLensData.rightToric}
          leftToric={contactLensData.leftToric}
        />
      )}
        {isView && (
          <div className="flex justify-end gap-2 btn-card">
            <button className="btn flex items-center justify-center gap-1 w-48 btn-secondary" type="button" title="Print eye test data" onClick={hendalePrint}>Print</button>
            <button className="btn flex items-center justify-center gap-1 w-48 btn-warning" type="button" title="Edit eye test data" onClick={hendaleEdit}>Edit</button>
          </div>
        )}
    </div>
  );
}
