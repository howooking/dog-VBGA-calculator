import { pHCause } from "../util/fuction/pHCause";
import Button from "./Button";

export default function Step2({
  setIsStep1,
  states,
  selectedRR,
  setIsStep2,
  setIsStep3,
}) {
  const pHinput = states.pH;
  const pHRRMin = selectedRR[0].min;
  const pHRRMax = selectedRR[0].min;
  const PvCO2Input = states.PvCO2;
  const PvCO2Med = (Number(selectedRR[1].min) + Number(selectedRR[1].max)) / 2;

  return (
    <div className="Step">
      <Button
        text={"<"}
        type={"circle"}
        onClick={() => {
          setIsStep1(true);
          setIsStep2(false);
        }}
      />
      <div className="center">
        <div className="page">
          <h2>Step2 : 혈액 pH 원인분석</h2>
          <h4>
            <span style={{ color: "red" }}>
              {
                pHCause(pHinput, pHRRMin, pHRRMax, PvCO2Input, PvCO2Med).split(
                  " "
                )[0]
              }
            </span>{" "}
            {
              pHCause(pHinput, pHRRMin, pHRRMax, PvCO2Input, PvCO2Med).split(
                " "
              )[1]
            }
          </h4>
          <p> 정맥 이산화탄소 분압과 참고범위 중간값을 비교 </p>
          <div className="tip">
            <div>💡TIP </div>
            <div>
              ● 정맥혈이 동맥혈보다 이산화탄소 분압이 평균적으로 5mmHg 높아요.
            </div>
            <div>● 호흡양상으로 환기를 평가해서는 안됩니다.</div>
          </div>
        </div>
        <button className="close" onClick={() => setIsStep2(false)}>
          Close
        </button>
      </div>
      <Button
        text={">"}
        type={"circle"}
        onClick={() => {
          setIsStep3(true);
          setIsStep2(false);
        }}
      />
    </div>
  );
}
