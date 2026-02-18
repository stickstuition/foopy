import { useEffect, useLayoutEffect, useRef, useState } from "react";
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
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);

  /* ---------- Fade animation ---------- */
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

  /* ---------- HARD WIDTH CLAMP ---------- */
  useLayoutEffect(() => {
    function recalc() {
      if (!containerRef.current) return;

      const viewportWidth = window.innerWidth;
      const nextScale = Math.min(1, viewportWidth / MAX_WIDTH);

      setScale(nextScale);
    }

    recalc();
    window.addEventListener("resize", recalc);
    return () => window.removeEventListener("resize", recalc);
  }, []);

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
        ref={containerRef}
        style={{
          width: MAX_WIDTH,
          transform: `scale(${scale})`,
          transformOrigin: "center top",
          display: "flex",
          alignItems: "center",
          gap: 16,
          paddingTop: 16,
          marginBottom: 20
        }}
      >
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
