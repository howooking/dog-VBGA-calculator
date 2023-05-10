import { pHCause } from "./pHCause";

export const compensate = (
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
) => {
  if (
    pHCause(pHinput, pHRRMin, pHRRMax, PvCO2Input, PvCO2Med) ===
    "Metabolic Acidosis"
  ) {
    if (
      Number(PvCO2Med) -
        Number(PvCO2Input) -
        0.7 * (Number(HCO3Med) - Number(HCO3Input)) <=
        2 &&
      Number(PvCO2Med) -
        Number(PvCO2Input) -
        0.7 * (Number(HCO3Med) - Number(HCO3Input)) >=
        -2
    ) {
      return "Being Compensated";
    } else {
      return "Not Being Compensated";
    }
  } else if (
    pHCause(pHinput, pHRRMin, pHRRMax, PvCO2Input, PvCO2Med) ===
    "Metabolic Alkalosis"
  ) {
    if (
      Number(PvCO2Input) -
        Number(PvCO2Med) -
        0.7 * (Number(HCO3Input) - Number(HCO3Med)) <=
        2 &&
      Number(PvCO2Input) -
        Number(PvCO2Med) -
        0.7 * (Number(HCO3Input) - Number(HCO3Med)) >=
        -2
    ) {
      return "Being Compensated";
    } else {
      return "Not Being Compensated";
    }
  } else {
    return (
      <select
        ref={selectInput}
        className="aspect_select"
        onChange={(e) => setAspect(e.target.value)}
        value={aspect}
      >
        <option value="양상">양상</option>
        <option value="Acute">Acute</option>
        <option value="Chronic">Chronic</option>
      </select>
    );
  }
};
