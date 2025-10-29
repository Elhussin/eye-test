
"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import EyeRow from "./EyeRow";
import EyeExtraRow from "./EyeExtraRow";
import { EyeTestLabel, EyeTestLabelProps } from "./eyeTestLabel";
import { OtherEyeTestFailed } from "./OtherEyeTestFailed";
import ContactLensViewer from "./ContactLensViewer";
import { validateEyeTest } from "../../utils/validateEyeTest";
import { validateContactLens } from "../../utils/validateContactLens";
import { Printer, Pencil, Download, } from "lucide-react";

export default function EyeTest() {
  const [fieldErrors, setFieldErrors] = useState<Record<string, boolean>>({});
  const [eyeTestData, setEyeTestData] = useState<any>({});
  const [contactLensData, setContactLensData] = useState<any>({});
  const [isView, setIsView] = useState(false);
  const [isContactLens, setIsContactLens] = useState(false);


  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  // ----------------- EVENTS ----------------- //
  const handleSave = handleSubmit((data: any) => {
    const eyeTest = validateEyeTest(data);
    if (!eyeTest) return;

    setEyeTestData(eyeTest);
    setIsView(true);
    setIsContactLens(false);
  });

  const handleContactLens = handleSubmit((data: any) => {
    const eyeTest = validateEyeTest(data);
    if (!eyeTest) return;

    const contactLens = validateContactLens(data);
    setEyeTestData(eyeTest);
    setContactLensData(contactLens);
    setIsView(true);
    setIsContactLens(true);
  });

  const handleEdit = () => {
    setIsView(false);
    setIsContactLens(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    // يمكن لاحقًا استبداله بمكتبة jsPDF أو html2pdf
    const content = JSON.stringify(
      {
        eyeTestData,
        contactLensData,
      },
      null,
      2
    );
    const blob = new Blob([content], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "EyeTestData.pdf";
    link.click();
  };

  // ----------------- RENDER ----------------- //
  return (
    <div className="print mt-1.5">
      {isView && <h2 className="border-b mb-2">Eye Test Result</h2>}

      <form className="space-y-6" dir="ltr">
        {/* Eyes Block */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="grid grid-cols-1 gap-2">
            <EyeTestLabel />
            <EyeRow
              side="right"
              {...{
                register,
                isView,
                setValue,
                getValues,
                fieldErrors,
                setFieldErrors,
              }}
            />
            <EyeRow
              side="left"
              {...{
                register,
                isView,
                setValue,
                getValues,
                fieldErrors,
                setFieldErrors,
              }}
            />
          </div>

          <div className="grid grid-cols-1 gap-2 mt-4 md:mt-0">
            <EyeTestLabelProps />
            <EyeExtraRow
              side="right"
              {...{
                register,
                isView,
                setValue,
                getValues,
                fieldErrors,
                setFieldErrors,
              }}
            />
            <EyeExtraRow
              side="left"
              {...{
                register,
                isView,
                setValue,
                getValues,
                fieldErrors,
                setFieldErrors,
              }}
            />
          </div>
        </div>

        {/* Contact Lens Viewer */}
        {contactLensData && Object.keys(contactLensData).length > 0 && (
          <ContactLensViewer {...contactLensData} />
        )}

        <OtherEyeTestFailed {...{ errors, register, isView }} />

        {/* ACTION BTNS */}
        {!isView ? (
          <div className="btn-card nan-print flex gap-2 flex-wrap">
            <button
              type="button"
              title="Save eye test data"
              className="btn bg-blue-500 hover:bg-blue-700 text-white"
              onClick={handleSave}
            >
              Save
            </button>

            <button
              type="button"
              title="Convert To Contact Lens"
              className="btn bg-blue-500 hover:bg-blue-700 text-white"
              onClick={handleContactLens}
            >
              Contact Lens
            </button>
          </div>
        ) : (
          <div className="btn-card nan-print flex flex-wrap gap-2">
            <button
              type="button"
              title="Edit eye test data"
              className="btn bg-blue-500 hover:bg-blue-700 text-white"
              onClick={handleEdit}
            >
              <Pencil size={20} />
            </button>

            <button
              type="button"
              title="Print eye test data"
              className="btn bg-blue-500 hover:bg-blue-700 text-white"
              onClick={handlePrint}
            >
              <Printer size={20} />
            </button>

            <button
              type="button"
              title="Download PDF"
              className="btn bg-green-500 hover:bg-green-700 text-white"
              onClick={handleDownloadPDF}
            >
              <Download size={20} />
            </button>

            {!isContactLens && (
              <button
                type="button"
                title="Convert To Contact Lens"
                className="btn bg-blue-500 hover:bg-blue-700 text-white"
                onClick={handleContactLens}
              >
                Contact Lens
              </button>
            )}
          </div>
        )}
      </form>


    </div>
  );
}
