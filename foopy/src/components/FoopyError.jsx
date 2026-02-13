export default function FoopyError({ title, message, onClose }) {
  return (
    <div style={overlay}>
      <div style={card}>
        <div style={icon}>🪙</div>

        <div style={titleStyle}>{title}</div>
        <div style={messageStyle}>{message}</div>

        <div style={button} onClick={onClose}>
          Got it
        </div>
      </div>
    </div>
  );
}

/* ---------- styles ---------- */

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.55)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999
};

const card = {
  width: 320,
  borderRadius: 18,
  background: "#ffffff",
  padding: "22px 20px 24px",
  textAlign: "center",
  boxShadow: "0 14px 30px rgba(0,0,0,0.35)",
  animation: "pop 0.2s ease-out"
};

const icon = {
  fontSize: 38,
  marginBottom: 8
};

const titleStyle = {
  fontSize: 20,
  fontWeight: 900,
  marginBottom: 6
};

const messageStyle = {
  fontSize: 14,
  opacity: 0.75,
  marginBottom: 18
};

const button = {
  height: 44,
  borderRadius: 12,
  background: "#1e88e5",
  color: "#fff",
  fontWeight: 800,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  userSelect: "none"
};
