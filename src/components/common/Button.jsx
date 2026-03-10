export default function Button(props) {
  return (
    <button
      onClick={props.onClick}
      style={{ padding: "10px 20px", fontSize: "16px" }}
    >
      {props.text}
    </button>
  );
}
