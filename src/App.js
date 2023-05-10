import { useEffect, useState } from "react";
import "./App.css";
import Button from "./components/Button";
import DDx from "./components/DDx";
import Table from "./components/Table";

function App() {
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("rr")) || {}
  );
  useEffect(() => {
    localStorage.setItem("rr", JSON.stringify(data));
  }, [data]);

  const onCreate = (
    machine,
    phmin,
    phmax,
    pvco2min,
    pvco2max,
    namin,
    namax,
    kmin,
    kmax,
    clmin,
    clmax,
    hco3min,
    hco3max,
    agmin,
    agmax,
    bemin,
    bemax
  ) => {
    const arr = [
      {
        id: 0,
        title: "pH",
        min: phmin,
        max: phmax,
      },
      {
        id: 1,
        title: "PvCO2",
        min: pvco2min,
        max: pvco2max,
      },
      {
        id: 2,
        title: "Na",
        min: namin,
        max: namax,
      },
      {
        id: 3,
        title: "K",
        min: kmin,
        max: kmax,
      },
      {
        id: 4,
        title: "Cl",
        min: clmin,
        max: clmax,
      },
      {
        id: 5,
        title: "HCO3",
        min: hco3min,
        max: hco3max,
      },
      {
        id: 6,
        title: "AG",
        min: agmin,
        max: agmax,
      },
      {
        id: 7,
        title: "BE",
        min: bemin,
        max: bemax,
      },
    ];
    setData({ ...data, [machine]: arr });
  };

  //steps
  const [isStep1, setIsStep1] = useState(false);
  const [isOneStep, setIsOneStep] = useState(false);

  const [isFull, setIsFull] = useState(false);

  const [isNormalPh, setIsNormalPh] = useState(false);

  const handleOnStep1 = () => {
    if (isFull) {
      setIsStep1(true);
    } else {
      alert("값을 모두 입력해주세요.");
    }
  };
  const handleOnOneStep = () => {
    if (isFull) {
      if (isNormalPh === true) {
        alert("정상 pH입니다.");
        return;
      }
      setIsOneStep(true);
    } else {
      alert("값을 모두 입력해주세요.");
    }
  };

  //DDx
  const [isDDx, setIsDDx] = useState(false);

  return (
    <div className="App">
      <header>
        <h2>Dog VBGA Calculator</h2>
        <div>
          <Button text={"StepByStep"} onClick={() => handleOnStep1()} />
          <Button
            text={"OneStep"}
            type={"main"}
            onClick={() => handleOnOneStep()}
          />
          <Button
            text={"Reset"}
            type={"sub"}
            onClick={() => window.location.reload()}
          />
        </div>
      </header>
      <Table
        data={data}
        onCreate={onCreate}
        isStep1={isStep1}
        setIsStep1={setIsStep1}
        isOneStep={isOneStep}
        setIsOneStep={setIsOneStep}
        isFull={isFull}
        setIsFull={setIsFull}
        setIsDDx={setIsDDx}
        setIsNormalPh={setIsNormalPh}
      />

      {isDDx ? <DDx setIsDDx={setIsDDx} /> : null}
    </div>
  );
}

export default App;
