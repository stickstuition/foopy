export default function BattleFeed({ items }) {
  return (
    <div style={feedWrap}>
      {items.map(item => (
        <div
          key={item.id}
          style={{
            ...feedItem,
            ...(item.type === "correct" && correct),
            ...(item.type === "wrong" && wrong),
            ...(item.type === "system" && system)
          }}
        >
          {item.text}
        </div>
      ))}
    </div>
  );
}

const feedWrap = {
  position: "absolute",
  bottom: 24,
  right: 24,
  display: "flex",
  flexDirection: "column",
  gap: 6,
  pointerEvents: "none"
};

const feedItem = {
  padding: "6px 10px",
  borderRadius: 6,
  fontSize: 14,
  fontWeight: 600,
  background: "#222",
  color: "#fff",
  opacity: 0.9
};

const correct = { background: "#2e7d32" };
const wrong = { background: "#c62828" };
const system = { background: "#1565c0" };
