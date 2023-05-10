import { useEffect, useState } from "react";
import { ismart300 } from "../util/ismart300";
import Add from "./Add";
import OneStep from "./OneStep";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step3_5 from "./Step3_5";
import Step4 from "./Step4";

export default function Table({
  data,
  onCreate,
  isStep1,
  setIsStep1,
  setIsOneStep,
  isOneStep,
  setIsFull,
  setIsDDx,
  setIsNormalPh,
}) {
  //Add 컴포넌트 모달창
  const [isAdd, setIsAdd] = useState(false);

  //select태그
  const [selectOption, setSelectOption] = useState([
    { value: "i-Smart300", name: "i-Smart300" },
  ]);
  const [selectedOption, setSelectedOption] = useState("i-Smart300");
  const [selectedRR, setSelectedRR] = useState([]);

  useEffect(() => {
    const copySelectOption = [...selectOption];
    if (Object.keys(data).length > 0) {
      copySelectOption.push({
        value: Object.keys(data)[0],
        name: Object.keys(data)[0],
      });
      setSelectOption(copySelectOption);
    }
  }, [data]);

  useEffect(() => {
    switch (selectedOption) {
      case "i-Smart300":
        return setSelectedRR(ismart300);
      case selectOption[1].value:
        return setSelectedRR(data[selectOption[1].value]);
      default:
        return setSelectedRR(ismart300);
    }
  }, [selectOption, selectedOption]);

  //입력값 state
  const [states, setStates] = useState({
    pH: "",
    PvCO2: "",
    Na: "",
    K: "",
    Cl: "",
    HCO3: "",
    AG: "",
    BE: "",
  });

  const upDown = (it) => {
    if (selectedRR) {
      if (states[it.title]) {
        if (Number(states[it.title]) < Number(it.min)) {
          return "⬇️";
        }
        if (Number(it.max) < Number(states[it.title])) {
          return "⬆️";
        }
        return "👌";
      }
    }
  };

  // Steps 모달states
  const [isStep2, setIsStep2] = useState(false);
  const [isStep3, setIsStep3] = useState(false);
  const [isStep3_5, setIsStep3_5] = useState(false);
  const [isStep4, setIsStep4] = useState(false);
  const [aspect, setAspect] = useState("양상");

  //필수 정보 입력시 버튼 활성화
  const fillInput = () => {
    if (
      states.pH.length > 0 &&
      states.PvCO2.length > 0 &&
      states.HCO3.length > 0 &&
      states.pH.length > 0 &&
      states.AG.length > 0
    ) {
      setIsFull(true);
    } else {
      setIsFull(false);
    }
  };
  useEffect(() => {
    fillInput();
  }, [states]);

  //정상 pH인 경우 경고창
  const normalPH = () => {
    if (states.pH.length) {
      if (
        Number(states.pH) >= Number(selectedRR[0].min) &&
        Number(states.pH) <= Number(selectedRR[0].max)
      ) {
        setIsNormalPh(true);
      } else {
        setIsNormalPh(false);
      }
    }
  };
  useEffect(() => {
    normalPH();
  }, [states.pH]);

  return (
    <div className="Table">
      <table>
        <thead>
          <tr>
            <th>검사항목</th>
            <th>
              <div className="범위랑버튼">
                <span>참고범위</span>
                <button
                  className="addRR"
                  onClick={() => {
                    if (Object.keys(data).length !== 0) {
                      alert("기기참고범위 추가는 하나만 가능합니다.");
                    } else {
                      setIsAdd(true);
                    }
                  }}
                >
                  +
                </button>
                <button
                  className="resetRR"
                  onClick={() => {
                    if (Object.keys(data).length > 0) {
                      if (
                        window.confirm(
                          `${Object.keys(data)[0]} 참고범위를 삭제하시겠습니까?`
                        )
                      ) {
                        localStorage.removeItem("rr");
                        window.location.reload();
                      }
                    }
                  }}
                >
                  -
                </button>
              </div>
              <select
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
              >
                {selectOption.map((it, i) => (
                  <option key={i} value={it.value}>
                    {it.name}
                  </option>
                ))}
              </select>
            </th>
            <th>입력</th>
            <th>증가/감소</th>
          </tr>
        </thead>
        <tbody>
          {selectedRR.map((it) => (
            <tr key={it.id}>
              <td>{it.title}</td>
              <td>
                {it.min} ~ {it.max}
              </td>
              <td>
                <input
                  name={it.title}
                  value={states[it.title]}
                  onChange={(e) =>
                    setStates({ ...states, [e.target.name]: e.target.value })
                  }
                />
              </td>
              <td>{upDown(it)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {isAdd ? (
        <Add
          setIsAdd={setIsAdd}
          onCreate={onCreate}
          data={data}
          setSelectedOption={setSelectedOption}
        />
      ) : null}
      {isStep1 ? (
        <Step1
          setIsStep1={setIsStep1}
          states={states}
          selectedRR={selectedRR}
          setIsStep2={setIsStep2}
        />
      ) : null}
      {isStep2 ? (
        <Step2
          states={states}
          selectedRR={selectedRR}
          setIsStep2={setIsStep2}
          setIsStep1={setIsStep1}
          setIsStep3={setIsStep3}
        />
      ) : null}
      {isStep3 ? (
        <Step3
          states={states}
          selectedRR={selectedRR}
          setIsStep3={setIsStep3}
          setIsStep3_5={setIsStep3_5}
          setIsStep4={setIsStep4}
          setIsStep2={setIsStep2}
          aspect={aspect}
          setAspect={setAspect}
        />
      ) : null}
      {isStep3_5 ? (
        <Step3_5
          states={states}
          selectedRR={selectedRR}
          setIsStep3={setIsStep3}
          setIsStep3_5={setIsStep3_5}
          setIsStep4={setIsStep4}
          aspect={aspect}
          setAspect={setAspect}
        />
      ) : null}
      {isStep4 ? (
        <Step4
          states={states}
          selectedRR={selectedRR}
          setIsStep3={setIsStep3}
          setIsStep3_5={setIsStep3_5}
          setIsStep4={setIsStep4}
          aspect={aspect}
          setAspect={setAspect}
          setIsDDx={setIsDDx}
        />
      ) : null}
      {isOneStep ? (
        <OneStep
          states={states}
          selectedRR={selectedRR}
          setIsStep3={setIsStep3}
          setIsStep3_5={setIsStep3_5}
          setIsStep4={setIsStep4}
          aspect={aspect}
          setAspect={setAspect}
          setIsOneStep={setIsOneStep}
          setIsDDx={setIsDDx}
        />
      ) : null}
    </div>
  );
}
