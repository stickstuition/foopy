import { useEffect } from "react";
import PlayerCard from "./PlayerCard";
import UnknownPlayerCard from "./UnknownPlayerCard";

const MAX_WIDTH = 1206;

export default function EquationRow({
  players,
  operator,
  showNumbers,
  showNames,
  teamKey,
  answerPlayer
}) {
  const safePlayers = Array.isArray(players) ? players : [];

  /* ---------- Answer fade animation ---------- */
  useEffect(() => {
    const id = "equationrow-answer-fade";
    if (document.getElementById(id)) return;

    const style = document.createElement("style");
    style.id = id;
    style.textContent = `
      @keyframes answerFade {
        from { opacity: 0; transform: scale(0.96); }
        to { opacity: 1; transform: scale(1); }
      }
    `;
    document.head.appendChild(style);
  }, []);

  // 🔥 SAFARI-SAFE HARD SCALE
  const zoom =
    typeof window !== "undefined" && window.innerWidth < MAX_WIDTH
      ? window.innerWidth / MAX_WIDTH
      : 1;

  return (
    <div
      style={{
        width: "100%",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center"
      }}
    >
      <div
        style={{
          width: MAX_WIDTH,
          display: "flex",
          alignItems: "center",
          gap: 16,
          paddingTop: 16,
          marginBottom: 20,
          zoom // ✅ THIS is the fix
        }}
      >
        {/* LEFT PLAYERS */}
        {safePlayers.map((p, index) => (
          <div
            key={`${p.name}-${index}`}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <PlayerCard image={p.image} />

              {index < safePlayers.length - 1 && (
                <span style={{ fontSize: 44, fontWeight: 900 }}>
                  {operator}
                </span>
              )}
            </div>

            {showNames && (
              <div style={{ fontWeight: 800, fontSize: 18 }}>{p.name}</div>
            )}

            {showNumbers && (
              <div style={{ fontSize: 14, opacity: 0.7 }}>#{p.number}</div>
            )}
          </div>
        ))}

        {/* EQUALS */}
        <div
          style={{
            height: 160,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 8px"
          }}
        >
          <span style={{ fontSize: 44, fontWeight: 900 }}>=</span>
        </div>

        {/* ANSWER */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10
          }}
        >
          {!answerPlayer && <UnknownPlayerCard teamKey={teamKey} />}

          {answerPlayer && (
            <div style={{ animation: "answerFade 0.6s ease forwards" }}>
              <PlayerCard image={answerPlayer.image} />
            </div>
          )}

          {showNames && (
            <div style={{ fontWeight: 800, fontSize: 18 }}>
              {answerPlayer ? answerPlayer.name : ""}
            </div>
          )}

          {showNumbers && (
            <div style={{ fontSize: 14, opacity: 0.7 }}>
              {answerPlayer ? `#${answerPlayer.number}` : ""}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
