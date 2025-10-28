"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import EyeRow from "./EyeRow";
import EyeExtraRow from "./EyeExtraRow";
import { EyeTestLabel, EyeTestLabelProps } from "./eyeTestLabel";
import { OtherEyeTestFailed } from "./OtherEyeTestFailed";
import ContactLensViewer from "./ContactLensViewer";
import { validateEyeTest, } from "../../utils/validateEyeTest";
import { validateContactLens } from "../../utils/validateContactLens";
// import { safeToast } from "../utils/toastService";
import { Printer, Pencil } from 'lucide-react';




export default function EyeTest() {

  const [fieldErrors, setFieldErrors] = useState<Record<string, boolean>>({});
  const [contactLensData, setContactLensData] = useState<any>({});
  const [isView, SetIsView] = useState(false);
  const [isContactLens, SetIsContactLens] = useState(false);
  const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm();


  // Submit Handler
  const hendaleEdit = () => {
    SetIsView(false);
    SetIsContactLens(false);
  }
  const hendalePrint = () => {
    window.print();
  }

  const hendaleContactLens = () => {
    SetIsContactLens(true);
    SetIsView(true);
  }

  const onSubmit = (data: any) => {
    validateEyeTest(data);
    const eyeTest = validateEyeTest(data);
    if (!eyeTest) {
      return
    }
    const contactLens = validateContactLens(data);
    SetIsView(true);

    setContactLensData(contactLens);

  };


  return (
    <div className="print mt-1.5">
      {isView && (
        <h2 className="border-b mb-2">Eye Test Resault</h2>

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

        {isContactLens && contactLensData && Object.keys(contactLensData).length > 0 && (
          <ContactLensViewer
            rightSphere={contactLensData.rightSphere}
            leftSphere={contactLensData.leftSphere}
            rightToric={contactLensData.rightToric}
            leftToric={contactLensData.leftToric}
          />
        )}
        <OtherEyeTestFailed {...{ errors, register, isView }} />

        {!isView && (
          <div className="btn-card nan-print">
            <button
              type="submit"
              title="Save eye test data"
              className="btn flex items-center justify-center gap-1 w24 bg-blue-500 hover:bg-blue-700 text-white"
            >
              Save
            </button>
            <button className="btn flex items-center justify-center gap-1 w24 bg-blue-500 hover:bg-blue-700 text-white"
              type="button" title="Convert To Contact Lens" onClick={hendaleContactLens}>Contact Lens
            </button>
          </div>
        )}


      </form>

      {isView && (
        <div className="btn-card nan-print">
          <button className="btn flex items-center justify-center gap-1 w24 bg-blue-500 hover:bg-blue-700 text-white" type="button" title="Edit eye test data" onClick={hendaleEdit}><Pencil size={20} /></button>
          <button className="btn flex items-center justify-center gap-1 w24  bg-blue-500 hover:bg-blue-700 text-white" type="button" title="Print eye test data" onClick={hendalePrint}><Printer size={20} /></button>
          {!isContactLens && (
            <button className="btn flex items-center justify-center gap-1 w24 bg-blue-500 hover:bg-blue-700 text-white"
              type="button" title="Convert To Contact Lens" onClick={hendaleContactLens}>Contact Lens
            </button>
          )}
        </div>
      )}
    </div>
  );
}
