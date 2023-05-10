import { useEffect, useRef, useState } from "react";
import Button from "./Button";

export default function Add({ setIsAdd, onCreate, data }) {
  const machinInput = useRef();
  const [inputs, setInputs] = useState({
    machine: "",
    phmin: 7.31,
    phmax: 7.46,
    pvco2min: 27,
    pvco2max: 50,
    namin: 144,
    namax: 152,
    kmin: 3.9,
    kmax: 5.1,
    clmin: 110,
    clmax: 119,
    hco3min: 21,
    hco3max: 28,
    agmin: 10,
    agmax: 20,
    bemin: -2,
    bemax: 3,
  });
  const handleOnChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };
  const handleOnSubmit = () => {
    if (inputs.machine.length < 1) {
      machinInput.current.focus();
      return;
    }
    if (Object.keys(data).length > 0) {
      alert("기계는 한대만 추가 가능");
      return;
    }
    onCreate(
      inputs.machine,
      inputs.phmin,
      inputs.phmax,
      inputs.pvco2min,
      inputs.pvco2max,
      inputs.namin,
      inputs.namax,
      inputs.kmin,
      inputs.kmax,
      inputs.clmin,
      inputs.clmax,
      inputs.hco3min,
      inputs.hco3max,
      inputs.agmin,
      inputs.agmax,
      inputs.bemin,
      inputs.bemax
    );
    setIsAdd(false);
  };

  return (
    <div className="Add">
      <div className="machineName">
        <span>
          <b>기계이름 : </b>
        </span>
        <input
          ref={machinInput}
          name="machine"
          value={inputs.machine}
          onChange={handleOnChange}
          placeholder={"1대만 추가 가능"}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>검사항목</th>
            <th>최솟값</th>
            <th>최댓값</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>pH</td>
            <td>
              <input
                name="phmin"
                value={inputs.phmin}
                onChange={handleOnChange}
              />
            </td>
            <td>
              <input
                name="phmax"
                value={inputs.phmax}
                onChange={handleOnChange}
              />
            </td>
          </tr>
          <tr>
            <td>PvCO2</td>
            <td>
              <input
                name="pvco2min"
                value={inputs.pvco2min}
                onChange={handleOnChange}
              />
            </td>
            <td>
              <input
                name="pvco2max"
                value={inputs.pvco2max}
                onChange={handleOnChange}
              />
            </td>
          </tr>
          <tr>
            <td>Na</td>
            <td>
              <input
                name="namin"
                value={inputs.namin}
                onChange={handleOnChange}
              />
            </td>
            <td>
              <input
                name="namax"
                value={inputs.namax}
                onChange={handleOnChange}
              />
            </td>
          </tr>
          <tr>
            <td>K</td>
            <td>
              <input
                name="kmin"
                value={inputs.kmin}
                onChange={handleOnChange}
              />
            </td>
            <td>
              <input
                name="kmax"
                value={inputs.kmax}
                onChange={handleOnChange}
              />
            </td>
          </tr>
          <tr>
            <td>Cl</td>
            <td>
              <input
                name="clmin"
                value={inputs.clmin}
                onChange={handleOnChange}
              />
            </td>
            <td>
              <input
                name="clmax"
                value={inputs.clmax}
                onChange={handleOnChange}
              />
            </td>
          </tr>
          <tr>
            <td>HCO3</td>
            <td>
              <input
                name="hco3min"
                value={inputs.hco3min}
                onChange={handleOnChange}
              />
            </td>
            <td>
              <input
                name="hco3max"
                value={inputs.hco3max}
                onChange={handleOnChange}
              />
            </td>
          </tr>
          <tr>
            <td>AG</td>
            <td>
              <input
                name="agmin"
                value={inputs.agmin}
                onChange={handleOnChange}
              />
            </td>
            <td>
              <input
                name="agmax"
                value={inputs.agmax}
                onChange={handleOnChange}
              />
            </td>
          </tr>
          <tr>
            <td>BE</td>
            <td>
              <input
                name="bemin"
                value={inputs.bemin}
                onChange={handleOnChange}
              />
            </td>
            <td>
              <input
                name="bemax"
                value={inputs.bemax}
                onChange={handleOnChange}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div className="buttons">
        <Button text={"생성"} type={"main"} onClick={handleOnSubmit} />
        <Button text={"취소"} type={"sub"} onClick={() => setIsAdd(false)} />
      </div>
    </div>
  );
}
