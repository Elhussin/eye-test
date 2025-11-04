import LensInputForm from "./LensInputForm";
import LensVisualization from "./LensVisualizer";
import { useState } from "react";
import { calculateLensThickness } from "../../utils/calculateLensThickness";
import { Header } from "./Header"
export default function LensCalculator() {
  const [baseCurveMode, setBaseCurveMode] = useState("automatic");
  const [baseCurve, setBaseCurve] = useState(6);
  const [spherePower, setSpherePower] = useState(5);
  const [cylinderPower, setCylinderPower] = useState(1);
  const [cylinderAxis, setCylinderAxis] = useState(90);
  const [ipd, setIpd] = useState(62);
  const [frameEyesize, setFrameEyesize] = useState(54);
  const [frameBridge, setFrameBridge] = useState(18);
  const [lensMaterial, setLensMaterial] = useState("1.56");

  const results = calculateLensThickness({
    spherePower,
    cylinderPower,
    baseCurveMode,
    baseCurve,
    ipd,
    frameEyesize,
    frameBridge,
    lensMaterial,
  });

  return (

    <div className=" bg-surface p-4" >
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <Header />
          {/* <div className="grid lg:grid-cols-2 gap-6"> */}
            <LensInputForm
              baseCurveMode={baseCurveMode}
              setBaseCurveMode={setBaseCurveMode}
              baseCurve={baseCurve}
              setBaseCurve={setBaseCurve}
              spherePower={spherePower}
              setSpherePower={setSpherePower}
              cylinderPower={cylinderPower}
              setCylinderPower={setCylinderPower}
              cylinderAxis={cylinderAxis}
              setCylinderAxis={setCylinderAxis}
              ipd={ipd}
              setIpd={setIpd}
              frameEyesize={frameEyesize}
              setFrameEyesize={setFrameEyesize}
              frameBridge={frameBridge}
              setFrameBridge={setFrameBridge}
              lensMaterial={lensMaterial}
              setLensMaterial={setLensMaterial}
              results={results}
            />


            <LensVisualization results={results} lensMaterial={lensMaterial} />
          </div>
         
        {/* </div> */}
      </div>
    </div>
  );
}
