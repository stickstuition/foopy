import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import PlayerCard from "./PlayerCard";
import UnknownPlayerCard from "./UnknownPlayerCard";
import useIsMobile from "../hooks/useIsMobile";

export default function EquationRow({
  players,
  operator,
  showNumbers,
  showNames,
  teamKey,
  answerPlayer
}) {
  const isMobile = useIsMobile();
  const safePlayers = useMemo(() => (Array.isArray(players) ? players : []), [players]);

  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const [scale, setScale] = useState(1);

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

  useLayoutEffect(() => {
    function recalc() {
      if (!outerRef.current || !innerRef.current) return;

      const outerW = outerRef.current.getBoundingClientRect().width;
      const innerW = innerRef.current.scrollWidth;

      if (!innerW) return;

      const next = Math.min(1, outerW / innerW);
      setScale(next);
    }

    recalc();

    const ro = new ResizeObserver(() => recalc());
    if (outerRef.current) ro.observe(outerRef.current);
    if (innerRef.current) ro.observe(innerRef.current);

    window.addEventListener("resize", recalc);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", recalc);
    };
  }, []);

  const cardSize = isMobile ? "small" : "large";
  const opSize = isMobile ? 28 : 44;
  const gap = isMobile ? 10 : 16;

  return (
    <div
      ref={outerRef}
      style={{
        width: "100%",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        paddingTop: isMobile ? 14 : 60,
        marginBottom: 20
      }}
    >
      <div
        ref={innerRef}
        style={{
          display: "flex",
          alignItems: "center",
          gap,
          transform: `scale(${scale})`,
          transformOrigin: "center top"
        }}
      >
        {safePlayers.map((p, index) => (
          <div
            key={`${p.name}-${index}`}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: isMobile ? 6 : 10
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 10 : 14 }}>
              <PlayerCard image={p.image} size={cardSize} />

              {index < safePlayers.length - 1 && (
                <span style={{ fontSize: opSize, fontWeight: 900, lineHeight: 1 }}>
                  {operator}
                </span>
              )}
            </div>

            {showNames && <div style={{ fontWeight: 800, fontSize: isMobile ? 14 : 18 }}>{p.name}</div>}
            {showNumbers && <div style={{ fontSize: 12, opacity: 0.7 }}>#{p.number}</div>}
          </div>
        ))}

        <div
          style={{
            height: isMobile ? 120 : 160,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 6px"
          }}
        >
          <span style={{ fontSize: opSize, fontWeight: 900 }}>=</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: isMobile ? 6 : 10
          }}
        >
          {!answerPlayer && <UnknownPlayerCard teamKey={teamKey} />}

          {answerPlayer && (
            <div style={{ animation: "answerFade 0.6s ease forwards" }}>
              <PlayerCard image={answerPlayer.image} size={cardSize} />
            </div>
          )}

          {showNames && (
            <div style={{ fontWeight: 800, fontSize: isMobile ? 14 : 18 }}>
              {answerPlayer ? answerPlayer.name : ""}
            </div>
          )}

          {showNumbers && (
            <div style={{ fontSize: 12, opacity: 0.7 }}>
              {answerPlayer ? `#${answerPlayer.number}` : ""}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
