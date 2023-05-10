import { pHCause } from "./pHCause";

export const compensate_res = (
  pHinput,
  pHRRMin,
  pHRRMax,
  PvCO2Input,
  PvCO2Med,
  HCO3Input,
  HCO3Med,
  aspect
) => {
  if (
    pHCause(pHinput, pHRRMin, pHRRMax, PvCO2Input, PvCO2Med) ===
    "Respiratory Acidosis"
  ) {
    if (aspect === "Acute") {
      if (
        Number(HCO3Input) -
          Number(HCO3Med) -
          0.15 * (Number(PvCO2Input) - PvCO2Med) <=
          2 &&
        Number(HCO3Input) -
          Number(HCO3Med) -
          0.15 * (Number(PvCO2Input) - PvCO2Med) >=
          -2
      ) {
        return "Being Compensated";
      } else {
        return "Not Being Compensated";
      }
    }
    if (aspect === "Chronic") {
      if (
        Number(HCO3Input) -
          Number(HCO3Med) -
          0.35 * (Number(PvCO2Input) - PvCO2Med) <=
          2 &&
        Number(HCO3Input) -
          Number(HCO3Med) -
          0.35 * (Number(PvCO2Input) - PvCO2Med) >=
          -2
      ) {
        return "Being Compensated";
      } else {
        return "Not Being Compensated";
      }
    }
    if (aspect === "양상") {
      return <div className="dummy">긁지마</div>;
    }
  }
  if (
    pHCause(pHinput, pHRRMin, pHRRMax, PvCO2Input, PvCO2Med) ===
    "Respiratory Alkalosis"
  ) {
    if (aspect === "Acute") {
      if (
        Number(HCO3Input) -
          Number(HCO3Med) +
          0.25 * (PvCO2Med - Number(PvCO2Input)) <=
          2 &&
        Number(HCO3Input) -
          Number(HCO3Med) +
          0.25 * (PvCO2Med - Number(PvCO2Input)) >=
          -2
      ) {
        return "Being Compensated";
      } else {
        return "Not Being Compensated";
      }
    }
    if (aspect === "Chronic") {
      if (
        Number(HCO3Input) -
          Number(HCO3Med) +
          0.55 * (Number(PvCO2Input) - PvCO2Med) <=
          2 &&
        Number(HCO3Input) -
          Number(HCO3Med) +
          0.55 * (Number(PvCO2Input) - PvCO2Med) >=
          -2
      ) {
        return "Being Compensated";
      } else {
        return "Not Being Compensated";
      }
    }
    if (aspect === "양상") {
      return <div className="dummy">긁지마</div>;
    }
  }
};
