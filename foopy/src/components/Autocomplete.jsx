export default function Autocomplete({ suggestions, onSelect, maxHeight = 140 }) {
  return (
<div
  style={{
    background: "#eee",
    borderRadius: "10px",
    maxHeight: "180px",
    overflowY: "auto",
    WebkitOverflowScrolling: "touch"
  }}
>
      {suggestions.map((p) => (
        <div
          key={p.name}
          onPointerDown={(e) => {
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