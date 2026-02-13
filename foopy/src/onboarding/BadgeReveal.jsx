export default function BadgeReveal({ team, onContinue }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h2>Welcome to Foopy!</h2>
        <p>This is your first badge.</p>

        <img
          src={`/assets/logos/${team}.webp`}
          alt={team}
          style={{
            width: 120,
            height: 120,
            margin: "24px 0"
          }}
        />

        <button
          onClick={onContinue}
          style={{
            padding: "12px 24px",
            borderRadius: 8,
            background: "#000",
            color: "#fff",
            border: "none",
            cursor: "pointer"
          }}
        >
          Let’s play
        </button>
      </div>
    </div>
  );
}
