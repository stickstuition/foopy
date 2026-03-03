export default function Autocomplete({ suggestions, onSelect }) {
  return (
    <div style={{
      background: "#eee",
      borderRadius: "8px",
      marginTop: "8px",
      maxHeight: "160px",
      overflowY: "auto"
    }}>
            {suggestions.map((p) => (
        <div
          key={p.name}
          onPointerDown={(e) => {
            // Mobile: prevent input blur / keyboard dismissal
            e.preventDefault();
            onSelect(p.name);
          }}
          style={{
            padding: "10px",
            cursor: "pointer",
            userSelect: "none"
          }}
        >
          {p.name}
        </div>
      ))}
    </div>
  );
}
