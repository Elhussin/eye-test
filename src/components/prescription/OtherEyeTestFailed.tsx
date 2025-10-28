import type { OtherFailedProps } from "../../types";
export const OtherEyeTestFailed = (props: OtherFailedProps) => {

  const { register, isView, } = props;

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 gap-2 other-faield">
            {/* Customer */}
      <div className="grid grid-cols gap-2 mt-4 items-start">
        <div className=" items-center col-span-1">
          <label>
            Customer Name
          </label>
        </div>
        <div className="col-span-2 md:col-span-2 flex">
          <input
            {...register("customer",)}
            // { required: "Customer is required" }
            className={`input-text p-0 ${isView ? "bg-gray-200" : ""}`}
            placeholder="Customer..."
            title="Customer"
            disabled={isView}
          />

        </div>
      </div>
      {/* Company name */}
      <div className="grid grid-cols gap-2 mt-4 items-start">
        <div className=" items-center col-span-1">
          <label>
            Company Name 
          </label>
        </div>
        <div className="col-span-2 md:col-span-2 flex">
          <input
            {...register("company")}
            className={`input-text p-0 ${isView ? "bg-gray-200" : ""}`}
            placeholder="Company..."
            title="Company"
            disabled={isView}
          />
        </div>
      </div>

      {/* Doctor name */}
      <div className="grid grid-cols gap-2 mt-4 items-start">
        <div className=" items-center col-span-1">
          <label>
            Doctor Name
          </label>
        </div>
        <div className="col-span-2 md:col-span-2 flex">
          <input
            {...register("doctor")}
            className={`input-text p-0 ${isView ? "bg-gray-200" : ""}`}
            placeholder="Doctor..."
            title="Doctor"
            disabled={isView}
          />
        </div>
      </div>

      {/* Notes */}
      <div className="grid grid-cols gap-2 mt-4 items-start">
        <div className="flex items-center">
          <label className="">Notes</label>
        </div>
        <div className="col-span-2 md:col-span-2">
          <input

            {...register("notes")}
            className={`input-text p-0 ${isView ? "bg-gray-200" : ""}`}
            placeholder="Notes..."
            title="Notes"
            disabled={isView}
          />
        </div>
      </div>


    </div>
  )
}

