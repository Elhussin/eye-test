"use client";
import { Eye, Glasses, CircleOff } from "lucide-react";
import { categorizedMaterials } from '../../constants/data'
export default function LensInputForm({
  baseCurveMode,
  setBaseCurveMode,
  baseCurve,
  setBaseCurve,
  results,
  spherePower,
  setSpherePower,
  cylinderPower,
  setCylinderPower,
  cylinderAxis,
  setCylinderAxis,
  ipd,
  setIpd,
  frameEyesize,
  setFrameEyesize,
  frameBridge,
  setFrameBridge,
  lensMaterial,
  setLensMaterial,
}: any) {
  return (

    <>
      {/* main continer */}
      <div className="bg-surface rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-8 pd-4" >
        {/* Extra Detials */}
        <div className="grid gap-4">
          {/* titile */}
          <div >
            <h2 className="text-base font-semibold text-gray-700 mb-4 flex items-center gap-2" dir="rtl">
              <Glasses className="w-5 h-5 text-purple-600" />
              بيانات الإطار والمريض
            </h2>
          </div>
          {/* first row */}
          <div className="grid grid-cols-3 gap-4">

            {/* IPD */}
            <div>
              <label className="label">IPD (mm)</label>
              <input
                type="number"
                value={ipd}
                onChange={(e) => setIpd(parseFloat(e.target.value))}
                step="0.5"
                min="45"
                max="75"
                className="input-text"
              />
            </div>
            {/* Frame Eyesize */}
            <div>
              <label className="label ">
                <span className="flex items-center gap-2">Frame  <CircleOff className="w-4 h-4 mr-2 text-gray-600" /></span>

              </label>
              <input
                type="number"
                value={frameEyesize}
                onChange={(e) => setFrameEyesize(parseFloat(e.target.value))}
                step="1"
                min="40"
                max="65"
                className="input-text"
              />
            </div>

            {/* Frame Bridge */}
            <div>
              <label className="label">Bridge (mm)</label>
              <input
                type="number"
                value={frameBridge}
                onChange={(e) => setFrameBridge(parseFloat(e.target.value))}
                step="1"
                min="12"
                max="24"
                className="input-text"
              />
            </div>
          </div>

          <div className="grid  gap-4">
            {/* Lens Material */}
            <div>
              <label className="label">Lens Index</label>
              <select
                value={lensMaterial}
                onChange={(e) => setLensMaterial(e.target.value)}
                className="input-text"
              >
                {Object.entries(categorizedMaterials).map(([label, options]: any) => (
                  <optgroup key={label} label={label}>
                    {options.map((material: any) => (
                      <option key={material.key} value={material.key}>
                        {material.displayText}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

          </div>

        </div>

        {/* basic Detials */}
        <div className="grid gap-4">
          {/* titile */}
          <div >
            <h2 className="text-base font-semibold text-gray-700 mb-4 flex items-center gap-2" dir="rtl">
              <Eye className="w-5 h-5 text-indigo-500" />
              البيانات الأساسية
            </h2>
          </div>

          {/* Eye Test */} 
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "SPH", value: spherePower, set: setSpherePower, step: 0.25, min: -60, max: 60 , },
              { label: "CYL", value: cylinderPower, set: setCylinderPower, step: 0.25, min: -15, max: 15 },
              { label: "AX", value: cylinderAxis, set: setCylinderAxis, step: 1, min: 0, max: 180 },
            ].map((item) => (
              <div key={item.label}>
                <label className="label">{item.label}</label>
                <input
                  type="number"
                  value={item.value}
                  // onChange={(e) => item.set(parseFloat(e.target.value))}
                    onChange={(e) => item.set(e.target.value)}

                  step={item.step}
                  min={item.min}
                  max={item.max}
                  title ={`Plase Enter ${item.label} between ${item.min} and ${item.max}`}
                  className="input-text"
                />
              </div>
            ))}
          </div>

          {/* Base Curve */}
          <div className="grid  gap-4 ">
            <div>
              <div className="grid grid-cols-2">
                <label className="label">Base Curve (D)</label>
                <div className="flex gap-2">
                  <label className="flex items-center gap-2 cursor-pointer ">
                    <input
                      type="radio"
                      value="automatic"
                      checked={baseCurveMode === "automatic"}
                      onChange={(e) => setBaseCurveMode(e.target.value)}
                      className="input-checkbox"
                    />
                    Auto
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer ">
                    <input
                      type="radio"
                      value="manual"
                      checked={baseCurveMode === "manual"}
                      onChange={(e) => setBaseCurveMode(e.target.value)}
                      className="input-checkbox"
                    />
                    Manual
                  </label>
                </div>
              </div>
              <div>
                {baseCurveMode === "manual" ? (
                  <input
                    type="number"
                    value={baseCurve}
                    onChange={(e) => setBaseCurve(parseFloat(e.target.value))}
                    step="0.25"
                    min="2"
                    max="12"
                    className="input-text"
                  />
                ) : (
                  <input
                    disabled
                    type="text"
                    value={results?.baseCurve ?? "--"}
                    className="input-text input-disabled"
                  />
                )}
              </div>
            </div>

          </div>
        </div>




      </div>


    </>
  );

}
