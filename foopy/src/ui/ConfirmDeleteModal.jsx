import { useState } from "react";

export default function ConfirmDeleteModal({ onCancel, onConfirm }) {
  const [text, setText] = useState("");

  return (
    <>
      <div style={overlay} />
      <div style={confirm}>
        <h3>Delete Account</h3>
        <p>
          This will permanently delete your Foopy account and progress.
          This action cannot be undone.
        </p>

        <p>Type <strong>DELETE</strong> to confirm.</p>

        <input
          value={text}
          onChange={e => setText(e.target.value)}
          style={input}
        />

        <div style={actions}>
          <button onClick={onCancel}>Cancel</button>
          <button
            disabled={text !== "DELETE"}
            style={danger}
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
}
const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.6)",
  zIndex: 1000
};

const modal = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 520,
  maxHeight: "85vh",
  overflowY: "auto",
  background: "#fff",
  borderRadius: 18,
  padding: 20,
  zIndex: 1001
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
};

const close = {
  background: "none",
  border: "none",
  fontSize: 18,
  cursor: "pointer"
};

const section = {
  borderTop: "1px solid #eee",
  marginTop: 8
};

const sectionHeader = {
  width: "100%",
  background: "none",
  border: "none",
  padding: "12px 0",
  display: "flex",
  justifyContent: "space-between",
  fontSize: 16,
  fontWeight: 600,
  cursor: "pointer"
};

const body = {
  fontSize: 14,
  paddingBottom: 12
};

const columns = {
  display: "flex",
  gap: 24,
  flexWrap: "wrap"
};

const button = {
  marginTop: 8,
  padding: "8px 12px",
  borderRadius: 8,
  border: "1px solid #ccc",
  cursor: "pointer"
};

const danger = {
  ...button,
  color: "#c62828",
  borderColor: "#c62828"
};

const muted = {
  opacity: 0.7,
  marginTop: 8
};

const confirm = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: "#fff",
  padding: 20,
  borderRadius: 16,
  width: 360,
  zIndex: 1002
};

const input = {
  width: "100%",
  padding: 8,
  marginTop: 8
};

const actions = {
  display: "flex",
  justifyContent: "flex-end",
  gap: 12,
  marginTop: 16
};
