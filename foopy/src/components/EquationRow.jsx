import { useEffect } from "react";
import PlayerCard from "./PlayerCard";
import UnknownPlayerCard from "./UnknownPlayerCard";

const isMobile = window.innerWidth <= 768;


export default function EquationRow({
  players,
  operator,
  showNumbers,
  showNames,
  teamKey,
  answerPlayer
}) {
  const safePlayers = Array.isArray(players) ? players : [];

  useEffect(() => {
    const id = "equationrow-answer-fade";
    if (document.getElementById(id)) return;

    const style = document.createElement("style");
    style.id = id;
    style.textContent = `
      @keyframes answerFade {
        from {
          opacity: 0;
          transform: scale(0.96);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
<div
  style={{
    display: "flex",
    flexWrap: "wrap",                 // 👈 key
    justifyContent: "center",
    alignItems: "center",
    gap: isMobile ? 8 : 16,
    paddingTop: isMobile ? 20 : 60,
    marginBottom: "20px"
  }}
>

      {safePlayers.map((p, index) => (
<div
  key={`${p.name}-${index}`}
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: isMobile ? 6 : 10,
    transform: isMobile ? "scale(0.85)" : "scale(1)"
  }}
>

          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <PlayerCard image={p.image} />

            {index < safePlayers.length - 1 && (
              <span
                style={{
                  fontSize: isMobile ? 28 : 44,
                  fontWeight: 900,
                  lineHeight: 1
                }}
              >
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

      <div
        style={{
          height: 220,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 8px"
        }}
      >
        <span style={{ fontSize: isMobile ? 28 : 44, fontWeight: 900 }}>=</span>
      </div>

<div
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: isMobile ? 6 : 10,
    transform: isMobile ? "scale(0.9)" : "scale(1)"
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
  );
}
