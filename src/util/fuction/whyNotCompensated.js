import { pHCause } from "./pHCause";

export const whyNotCompensated = (
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
    "Metabolic Acidosis"
  ) {
    if (
      Number(PvCO2Med) -
        Number(PvCO2Input) -
        0.7 * (Number(HCO3Med) - Number(HCO3Input)) >
      2
    ) {
      return "mixed Metabolic Alkalosis or Respiratory Alkalosis";
    } else if (
      Number(PvCO2Med) -
        Number(PvCO2Input) -
        0.7 * (Number(HCO3Med) - Number(HCO3Input)) <
      -2
    ) {
      return "mixed Respiratory Acidosis or another Metabolic Acidosis";
    }
  } else if (
    pHCause(pHinput, pHRRMin, pHRRMax, PvCO2Input, PvCO2Med) ===
    "Metabolic Alkalosis"
  ) {
    if (
      Number(PvCO2Input) -
        Number(PvCO2Med) -
        0.7 * (Number(HCO3Input) - Number(HCO3Med)) >
      2
    ) {
      return "mixed Metabolic Acidosis or Respiratory Acidosis";
    } else if (
      Number(PvCO2Input) -
        Number(PvCO2Med) -
        0.7 * (Number(HCO3Input) - Number(HCO3Med)) <
      -2
    ) {
      return "mixed Respiratory Alkalosis or another Metabolic Alkalosis";
    }
  } else if (
    pHCause(pHinput, pHRRMin, pHRRMax, PvCO2Input, PvCO2Med) ===
    "Respiratory Acidosis"
  ) {
    if (aspect === "Acute") {
      if (
        Number(HCO3Input) -
          Number(HCO3Med) +
          0.25 * (Number(PvCO2Med) - Number(PvCO2Input)) >
        2
      ) {
        return "mixed Metabolic Alkalosis";
      } else if (
        Number(HCO3Input) -
          Number(HCO3Med) +
          0.25 * (Number(PvCO2Med) - Number(PvCO2Input)) <
        -2
      ) {
        return "mixed Metabolic Acidosis";
      }
    } else if (aspect === "Chronic") {
      if (
        Number(HCO3Input) -
          Number(HCO3Med) -
          0.35 * (Number(PvCO2Input) - Number(PvCO2Med)) >
        2
      ) {
        return "mixed Metabolic Alkalosis";
      } else if (
        Number(HCO3Input) -
          Number(HCO3Med) -
          0.35 * (Number(PvCO2Input) - Number(PvCO2Med)) <
        -2
      ) {
        return "mixed Metabolic Acidosis";
      }
    }
  } else if (
    pHCause(pHinput, pHRRMin, pHRRMax, PvCO2Input, PvCO2Med) ===
    "Respiratory Alkalosis"
  ) {
    if (aspect === "Acute") {
      if (
        Number(HCO3Input) -
          Number(HCO3Med) +
          0.25 * (Number(PvCO2Med) - Number(PvCO2Input)) <
        -2
      ) {
        return "mixed Metabolic Acidosis";
      } else if (
        Number(HCO3Input) -
          Number(HCO3Med) +
          0.25 * (Number(PvCO2Med) - Number(PvCO2Input)) >
        2
      ) {
        return "mixed Metabolic Alkalosis";
      }
    } else if (aspect === "Chronic") {
      if (
        Number(HCO3Input) -
          Number(HCO3Med) +
          0.55 * (Number(PvCO2Input) - Number(PvCO2Med)) >
        2
      ) {
        return "mixed Metabolic Alkalosis";
      } else if (
        Number(HCO3Input) -
          Number(HCO3Med) +
          0.55 * (Number(PvCO2Input) - Number(PvCO2Med)) <
        -2
      ) {
        return "mixed Metabolic Acidosis";
      }
    }
  }
};
