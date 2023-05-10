import { useRef } from "react";
import { compensate } from "../util/fuction/compensate";
import { compensate_res } from "../util/fuction/compensate_res";
import { pHCause } from "../util/fuction/pHCause";
import { whyNotCompensated } from "../util/fuction/whyNotCompensated";
import Button from "./Button";

export default function OneStep({
  states,
  selectedRR,
  setAspect,
  aspect,
  setIsOneStep,
  setIsDDx,
}) {
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

  const highAG = () => {
    if (Number(AGInput) > Number(AGMax)) {
      return "High AG";
    } else {
      return "Normal AG";
    }
  };

  return (
    <div className="Step">
      <Button type={"none"} />
      <div className="center">
        <div className="page">
          <h2>OneStep</h2>
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
            <div>{highAG()}</div>
          </h4>
          <Button
            text={"DDx보러가기"}
            type={"main"}
            onClick={() => setIsDDx(true)}
          />
        </div>
        <button
          className="close"
          onClick={() => {
            setIsOneStep(false);
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
