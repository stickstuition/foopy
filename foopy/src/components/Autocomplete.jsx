export default function Autocomplete({ suggestions, onSelect }) {
  return (
    <div style={{
      background: "#eee",
      borderRadius: "8px",
      marginTop: "8px",
      maxHeight: "160px",
      overflowY: "auto"
    }}>
      {suggestions.map(p => (
        <div
          key={p.name}
          onClick={() => onSelect(p.name)}
          style={{
            padding: "10px",
            cursor: "pointer"
          }}
        >
          {p.name}
        </div>
      ))}
    </div>
  );
}
