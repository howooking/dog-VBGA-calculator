import { bloodAcid } from "../util/fuction/bloodAcid";
import Button from "./Button";

export default function Step1({ setIsStep1, states, selectedRR, setIsStep2 }) {
  const pHinput = states.pH;
  const pHRRMin = selectedRR[0].min;
  const pHRRMax = selectedRR[0].min;

  return (
    <div className="Step">
      <Button type={"none"} />
      <div className="center">
        <div className="page">
          <h2>Step1 : pH분석</h2>
          <h4>
            <span style={{ color: "red" }}>
              {bloodAcid(pHinput, pHRRMin, pHRRMax)}
            </span>
          </h4>
          <p>참고 범위보다 낮으면 Acidemia, 높으면 Alkalemia</p>
          <div className="tip">
            <div>💡TIP</div>
            <div>
              ● pH가 정상이라면 참고범위+를 눌러 참고범위 간격을 줄여보세요
            </div>
            <div>● pH가 정상이라도 정상이 아닐 수 있어요</div>
            <div>● 산증과 살혈증은 달라요.</div>
          </div>
        </div>
        <button className="close" onClick={() => setIsStep1(false)}>
          Close
        </button>
      </div>
      <Button
        text={">"}
        type={"circle"}
        onClick={() => {
          if (bloodAcid(pHinput, pHRRMin, pHRRMax) === "Normal pH") {
            alert("정상 pH입니다.");
            return;
          }
          setIsStep1(false);
          setIsStep2(true);
        }}
      />
    </div>
  );
}
