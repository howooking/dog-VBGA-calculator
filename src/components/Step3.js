import { useEffect, useRef, useState } from "react";
import { compensate } from "../util/fuction/compensate";
import { compensate_res } from "../util/fuction/compensate_res";
import { pHCause } from "../util/fuction/pHCause";
import Button from "./Button";

export default function Step3({
  setIsStep3,
  states,
  selectedRR,
  setIsStep2,
  setIsStep4,
  setIsStep3_5,
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

  const [isCompen, setIsCompen] = useState(false);
  const isCompenSetting = () => {
    if (
      compensate(
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
      ) === "Being Compensated" ||
      compensate_res(
        pHinput,
        pHRRMin,
        pHRRMax,
        PvCO2Input,
        PvCO2Med,
        HCO3Input,
        HCO3Med,
        aspect
      ) === "Being Compensated"
    ) {
      setIsCompen(true);
    } else {
      setIsCompen(false);
    }
  };
  useEffect(() => {
    isCompenSetting();
  });

  const handleOnClick = () => {
    if (isMetabolic) {
      if (isCompen) {
        setIsStep3(false);
        setIsStep4(true);
      } else {
        setIsStep3(false);
        setIsStep3_5(true);
      }
    } else {
      if (aspect === "양상") {
        selectInput.current.focus();
        return;
      }
      if (isCompen) {
        setIsStep3(false);
        setIsStep4(true);
      } else {
        setIsStep3(false);
        setIsStep3_5(true);
      }
    }
  };

  return (
    <div className="Step">
      <Button
        text={"<"}
        type={"circle"}
        onClick={() => {
          setIsStep2(true);
          setIsStep3(false);
          setAspect("양상");
        }}
      />
      <div className="center">
        <div className="page">
          <h2>Step3 : 보상분석</h2>
          <h4>
            <div>
              {pHCause(pHinput, pHRRMin, pHRRMax, PvCO2Input, PvCO2Med)}
            </div>
            <div>
              <span style={{ color: "red" }}>
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
              </span>
            </div>
            <div>
              <span style={{ color: "red" }}>
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
              </span>
            </div>
          </h4>
          <p>
            "Fluid, Electrolyte, and Acid-Base Disorders in Small Animal
            Practice"
            <br />에 있는 공식입니다.
          </p>
          <div className="tip">
            <div>💡TIP </div>
            <div>● 호흡성 원인에 대한 보상반응은 느려요.</div>
            <div>● 급성, 만성 기준은 약 24시간입니다.</div>
            <div>● 고양이에 대한 보상공식은 불완전합니다.</div>
            <div>
              ● 예상되는 보상값과 실제 보상값의 오차는 ±2mmol/L로 설정했어요.
            </div>
            <div>
              ● 대사성 장애의 경우 오차범위를 ±3~5mmol/L까지 <br />
              늘려도 된다는 권위자의 의견이 있습니다.
            </div>
          </div>
        </div>
        <button
          className="close"
          onClick={() => {
            setIsStep3(false);
            setAspect("양상");
          }}
        >
          Close
        </button>
      </div>
      <Button text={">"} type={"circle"} onClick={handleOnClick} />
    </div>
  );
}
