export default function Button({ text, type, onClick }) {
  const btnType = [
    "main",
    "sub",
    "circle",
    "none",
    "main_center",
    "sub_center",
  ].includes(type)
    ? type
    : "default";
  return (
    <button className={["btn", `btn_${btnType}`].join(" ")} onClick={onClick}>
      {text}
    </button>
  );
}
