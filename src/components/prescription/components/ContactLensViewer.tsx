import React from "react";

type LensData = {
  SPH: string;
  CY?: string;
  ADD: string;
  "Exact SPH": string;
  "Exact CY"?: string;
  AX: string;
  BV: number;
};


type Props = {
  leftSphere: LensData;
  rightSphere: LensData;
  leftToric: LensData;
  rightToric: LensData;
};

const ContactLensViewer: React.FC<Props> = ({
  rightSphere,
  leftSphere,
  rightToric,
  leftToric,
}) => {
  const renderSection = (title: string, data: LensData) => (
    <>

      <div className="border rounded-lg shadow-sm p-4 mb-4">
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <table className="table-auto w-full text-sm">
          <tbody>
            {Object.entries(data).map(([key, value]) => (
              <tr key={key} className="border-b last:border-0">
                <td className="font-medium pr-3">{key}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );

  return (
    <div className="grid grid-cols-1  gap-4 mt-4">
      <div className="">
        <h2 className="font-semibold text-lg mb-2 border-b pb-2">Spherical Contact Lenses</h2>
        <div className="grid grid-cols-2 gap-4">
        {renderSection("Right Sphere", rightSphere)}
        {renderSection("Left Sphere", leftSphere)}
        </div>
      </div>
      <div className="">
        <h2 className="font-semibold text-lg mb-2 border-b pb-2">Toric Contact Lenses</h2>
        <div className="grid grid-cols-2 gap-4">
        {renderSection("Right Toric", rightToric)}
        {renderSection("Left Toric", leftToric)}
        </div>
      </div>
    </div>
  );
};

export default ContactLensViewer;
