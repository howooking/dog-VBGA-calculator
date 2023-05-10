import Button from "./Button";

export default function DDx({ setIsDDx }) {
  return (
    <div className="DDx">
      <div>
        <h3>Metabolic Acidosis</h3>
        <p>
          High AG : Ketones, Lactate, Uremia, Toxicity(Ethylene glycol,
          Alcohol...)
        </p>
        <p>Normal AG : HCO3 loss by kidney or stool</p>
      </div>
      <div>
        <h3>Respiratory Acidosis </h3>
        <p>
          Depressed respiratory center, Cervical spinal cord disease,
          Neuromuscular disease, Pleural space disease, Airway obstruction,
          Respiratory muscle fatigue
        </p>
      </div>
      <div>
        <h3>Metabolic Alkalosis</h3>
        <p>Vomiting-inducing disease, Loop diuretics, NaHCO3 administration</p>
      </div>
      <div>
        <h3>Respiratory Alkalosis</h3>
        <p>
          Hypoxemia, Pulmonary disease, CNS disease causing respiratory center
          stimulation, Exercise, Pain, Stress
        </p>
      </div>
      <Button
        text={"Close"}
        type={"sub_center"}
        onClick={() => setIsDDx(false)}
      />
    </div>
  );
}
