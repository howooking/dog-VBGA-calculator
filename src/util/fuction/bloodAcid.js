export const bloodAcid = (pHinput, pHRRMin, pHRRMax) => {
  if (Number(pHinput) < Number(pHRRMin)) {
    return "Acidemia";
  } else if (Number(pHinput) > Number(pHRRMax)) {
    return "Alkalemia";
  } else {
    return "Normal pH";
  }
};
