import { bloodAcid } from "./bloodAcid";

export const pHCause = (pHinput, pHRRMin, pHRRMax, PvCO2Input, PvCO2Med) => {
  if (bloodAcid(pHinput, pHRRMin, pHRRMax) === "Acidemia") {
    if (Number(PvCO2Input) < Number(PvCO2Med)) {
      return "Metabolic Acidosis";
    } else {
      return "Respiratory Acidosis";
    }
  } else if (bloodAcid(pHinput, pHRRMin, pHRRMax) === "Alkalemia") {
    if (Number(PvCO2Input) > Number(PvCO2Med)) {
      return "Metabolic Alkalosis";
    } else {
      return "Respiratory Alkalosis";
    }
  }
};
