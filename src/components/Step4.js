import { useEffect, useState, useRef } from "react";
import { compensate } from "../util/fuction/compensate";
import { compensate_res } from "../util/fuction/compensate_res";
import { pHCause } from "../util/fuction/pHCause";
import { whyNotCompensated } from "../util/fuction/whyNotCompensated";
import Button from "./Button";

export default function Step4({
  setIsStep3,
  states,
  selectedRR,
  setIsStep4,
  setIsStep3_5,
  setAspect,
  aspect,
  setIsDDx,
}) {
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

  const selectInput = useRef();
  const pHinput = states.pH;
  const pHRRMin = selectedRR[0].min;
  const pHRRMax = selectedRR[0].min;
  const PvCO2Input = states.PvCO2;
  const PvCO2Med = (Number(selectedRR[1].min) + Number(selectedRR[1].max)) / 2;
  const HCO3Input = states.HCO3;
  const HCO3Med = (Number(selectedRR[5].min) + Number(selectedRR[5].max)) / 2;
  const AGInput = states.AG;
  const AGMax = selectedRR[6].max;

  const handleOnClick = () => {
    if (isCompen) {
      setIsStep3(true);
      setIsStep4(false);
    } else {
      setIsStep4(false);
      setIsStep3_5(true);
    }
  };

  const highAG = () => {
    if (Number(AGInput) > AGMax) {
      return "High AG";
    } else {
      return "Normal AG";
    }
  };

  return (
    <div className="Step">
      <Button text={"<"} type={"circle"} onClick={handleOnClick} />
      <div className="center">
        <div className="page">
          <h2>Step4 : AG분석</h2>
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
            </div>
            <div>
              <span style={{ color: "red" }}>{highAG()}</span>
            </div>
          </h4>
          <p> AG가 20보다 높으면 High AG</p>

          <div className="tip">
            <div>💡TIP </div>
            <div> ● AG는 Metabolic Acidosis가 있는 경우에만 의미가 있어요.</div>
            <div> ● 저알부민혈증인 경우 AG값을 보정해주세요.</div>
            <div> ● AG(보정) = AG(측정값) + 2.5*(4 - ALB)</div>
            <div>● 고혈당이면 Na을 보정해주지만 AG는 보정 하지 않아요.</div>
          </div>
          <Button
            text={"DDx보러가기"}
            type={"main"}
            onClick={() => setIsDDx(true)}
          />
        </div>
        <button
          className="close"
          onClick={() => {
            setIsStep4(false);
            setAspect("양상");
          }}
        >
          Close
        </button>
      </div>
      <Button type={"none"} />
    </div>
  );
}
