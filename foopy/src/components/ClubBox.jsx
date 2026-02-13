export default function ClubBox({ status }) {
  let bg = "#c8102e"; // default red

  if (status === "correct") bg = "#00c853";
  if (status === "wrong") bg = "#ff9100";

  return (
    <div style={{
      width: "120px",
      height: "160px",
      background: bg,
      borderRadius: "12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      fontSize: "24px",
      fontWeight: "bold",
      transition: "background 0.3s"
    }}>
      ?
    </div>
  );
}
