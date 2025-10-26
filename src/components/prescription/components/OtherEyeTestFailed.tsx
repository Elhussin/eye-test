import type { OtherFailedProps } from "../types";
export const OtherEyeTestFailed = (props: OtherFailedProps) => {

  const { register, isView,errors } = props;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      {/* Notes */}
      <div className="grid grid-cols-[80px_repeat(4,1fr)] gap-2 mt-4 items-start">
        <div className="flex items-center">
          <label className="">Notes</label>
        </div>
        <div className="col-span-4 md:col-span-4">
          <textarea

            {...register("notes")}
            className={`input-text p-0 ${isView ? "bg-gray-200" : ""}`}
            rows={1}
            placeholder="Notes..."
            title="Notes"
            disabled={isView}
          />
        </div>
      </div>

      {/* Customer */}
      <div className="grid grid-cols-[80px_repeat(4,1fr)] gap-2 mt-4 items-start">
        <div className=" items-center col-span-1">
          <label>
            Customer Name <span className="text-red-500">*</span>
          </label>
        </div>
        <div className="col-span-4 md:col-span-3 flex">
          <input
            {...register("customer", { required: "Customer is required" })}
            className={`input-text p-0 ${isView ? "bg-gray-200" : ""}`}
            placeholder="Customer..."
            title="Customer"
            disabled={isView}

          />

        </div>

      </div>
          <span className="text-red-500">{errors.customer?.message}</span>
    </div>
  )
}

