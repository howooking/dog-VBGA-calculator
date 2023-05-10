import { useRef, useState, useEffect } from "react";
import { compensate } from "../util/fuction/compensate";
import { compensate_res } from "../util/fuction/compensate_res";
import { pHCause } from "../util/fuction/pHCause";
import { whyNotCompensated } from "../util/fuction/whyNotCompensated";
import Button from "./Button";

export default function Step3_5({
  setIsStep3,
  setIsStep3_5,
  states,
  selectedRR,
  setIsStep4,
  aspect,
  setAspect,
}) {
  const selectInput = useRef();
  const pHinput = states.pH;
  const pHRRMin = selectedRR[0].min;
  const pHRRMax = selectedRR[0].min;
  const PvCO2Input = states.PvCO2;
  const PvCO2Med = (Number(selectedRR[1].min) + Number(selectedRR[1].max)) / 2;
  const HCO3Input = states.HCO3;
  const HCO3Med = (Number(selectedRR[5].min) + Number(selectedRR[5].max)) / 2;

  const [isMetabolic, setIsMetabolic] = useState(false);
  const isMetabolicSetting = () => {
    if (
      pHCause(pHinput, pHRRMin, pHRRMax, PvCO2Input, PvCO2Med) ===
        "Metabolic Acidosis" ||
      pHCause(pHinput, pHRRMin, pHRRMax, PvCO2Input, PvCO2Med) ===
        "Metabolic Alkalosis"
    ) {
      setIsMetabolic(true);
    } else {
      setIsMetabolic(false);
    }
  };
  useEffect(() => {
    isMetabolicSetting();
  });

  return (
    <div className="Step">
      <Button
        text={"<"}
        type={"circle"}
        onClick={() => {
          setIsStep3(true);
          setIsStep3_5(false);
        }}
      />
      <div className="center">
        <div className="page">
          <h2>Step3.5 : 보상 안되는 원인 분석</h2>
          <h4>
            <div>
              {pHCause(pHinput, pHRRMin, pHRRMax, PvCO2Input, PvCO2Med)}
            </div>
            <div>
              {compensate(
                pHinput,
                pHRRMin,
                pHRRMax,
                PvCO2Input,
                PvCO2Med,
                HCO3Input,
                HCO3Med,
                selectInput,
                aspect,
                setAspect
              )}
            </div>
            <div>
              {compensate_res(
                pHinput,
                pHRRMin,
                pHRRMax,
                PvCO2Input,
                PvCO2Med,
                HCO3Input,
                HCO3Med,
                aspect
              )}
            </div>
            <div>
              <span style={{ color: "red" }}>
                {whyNotCompensated(
                  pHinput,
                  pHRRMin,
                  pHRRMax,
                  PvCO2Input,
                  PvCO2Med,
                  HCO3Input,
                  HCO3Med,
                  aspect
                )}
              </span>
            </div>
          </h4>
          <p>보상이 안된다 = 혼합원인이 있거나 보상능력을 초과한 경우</p>
          <div className="tip">
            <div>💡TIP </div>
            <div>● "or"는 임상증상을 고려해서 판단해주세요.</div>
          </div>
        </div>
        <button
          className="close"
          onClick={() => {
            setIsStep3_5(false);
            setAspect("양상");
          }}
        >
          Close
        </button>
      </div>
      <Button
        text={">"}
        type={"circle"}
        onClick={() => {
          if (isMetabolic) {
            setIsStep4(true);
            setIsStep3_5(false);
          } else {
            if (aspect === "양상") {
              selectInput.current.focus();
              return;
            }
            setIsStep4(true);
            setIsStep3_5(false);
          }
        }}
      />
    </div>
  );
}
