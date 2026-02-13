export default function SettingsSection({ title, open, onToggle, children }) {
  return (
    <div style={section}>
      <button style={sectionHeader} onClick={onToggle}>
        <span>{title}</span>
        <span>{open ? "−" : "+"}</span>
      </button>

      {open && <div style={body}>{children}</div>}
    </div>
  );
}


/* ---------- styles ---------- */

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
