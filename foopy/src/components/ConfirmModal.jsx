export default function ConfirmModal({
  open,
  title,
  message,
  confirmLabel = "Leave",
  onConfirm,
  onCancel,
  hideCancel = false
}) {

  if (!open) return null;

  return (
    <div style={overlay}>
      <div style={card}>
        <div style={titleStyle}>{title}</div>
        <div style={messageStyle}>{message}</div>

        <div style={actions}>
  {!hideCancel && (
    <div
      style={cancelButton}
      onClick={onCancel}
    >
      Cancel
    </div>
  )}

  <div
    style={confirmButton}
    onClick={onConfirm}
  >
    {confirmLabel}
  </div>
</div>

      </div>
    </div>
  );
}

/* ---------- Styles ---------- */

const overlay = {
  position: "fixed",
  inset: 0,

  background: "rgba(0,0,0,0.6)",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  zIndex: 1000
};

const card = {
  width: 360,
  padding: 22,
  borderRadius: 16,

  background: "linear-gradient(to bottom, #2f2f2f, #1f1f1f)",
  color: "#eee",

  boxShadow: `
    0 12px 36px rgba(0,0,0,0.55)
  `,

  textAlign: "center"
};

const titleStyle = {
  fontSize: 20,
  fontWeight: 700,
  marginBottom: 8
};

const messageStyle = {
  fontSize: 14,
  opacity: 0.8,
  marginBottom: 22
};

const actions = {
  display: "flex",
  gap: 12
};

const cancelButton = {
  flex: 1,
  padding: "10px 0",

  borderRadius: 10,
  cursor: "pointer",

  background: "linear-gradient(to bottom, #555, #444)",

  boxShadow: `
    0 3px 0 rgba(0,0,0,0.4)
  `
};

const confirmButton = {
  flex: 1,
  padding: "10px 0",

  borderRadius: 10,
  cursor: "pointer",

  background: "linear-gradient(to bottom, #ff6b6b, #c92a2a)",

  boxShadow: `
    0 3px 0 rgba(0,0,0,0.4)
  `
};
