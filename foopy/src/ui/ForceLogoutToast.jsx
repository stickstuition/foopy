export default function ForceLogoutToast({ message }) {
  if (!message) return null;

  return (
    <div style={overlay}>
      <div style={toast}>
        <h3>Logged out</h3>
        <p>{message}</p>
      </div>
    </div>
  );
}

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.45)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999
};

const toast = {
  background: "#fff",
  padding: "24px 28px",
  borderRadius: 12,
  width: 320,
  textAlign: "center",
  boxShadow: "0 10px 30px rgba(0,0,0,0.25)"
};
