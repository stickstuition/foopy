import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import PlayerCard from "./PlayerCard";

export default function GameOverReviewScreen({
  score,
  history = [],
  coinsBefore = 0,
  onPlayAgain,
  onChangeOptions
}) {
  /* ---------- DERIVED STATS ---------- */

  const coinsEarned = Math.max(0, Math.floor(score));
  const coinsAfter = coinsBefore + coinsEarned;

  const correctCount = useMemo(
    () => history.filter(h => h.result === "correct").length,
    [history]
  );

  const attemptedCount = useMemo(
    () => history.filter(h => h.result !== "skipped").length,
    [history]
  );

  const accuracy =
    attemptedCount === 0 ? null : correctCount / attemptedCount;

  /* ---------- COIN ANIMATION ---------- */

  const [displayCoins, setDisplayCoins] = useState(coinsBefore);
  const [depositing, setDepositing] = useState(coinsEarned > 0);

  useEffect(() => {
    setDisplayCoins(coinsBefore);
    setDepositing(coinsEarned > 0);

    if (coinsEarned <= 0) return;

    let startTime = null;
    const duration = 1400;

    function tick(ts) {
      if (!startTime) startTime = ts;
      const p = Math.min(1, (ts - startTime) / duration);
      const eased = 1 - Math.pow(1 - p, 3);

      const current = Math.round(
        coinsBefore + (coinsAfter - coinsBefore) * eased
      );

      setDisplayCoins(current);

      if (p < 1) {
        requestAnimationFrame(tick);
      } else {
        setDepositing(false);
      }
    }

    requestAnimationFrame(tick);
  }, [coinsBefore, coinsAfter, coinsEarned]);

  /* ---------- MODAL STATE ---------- */

  const [reviewOpen, setReviewOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = reviewOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [reviewOpen]);

  /* ---------- MINI CARD WRAPPER ---------- */

  function MiniCard({ children }) {
    return (
      <div style={miniCard}>
        {children}
      </div>
    );
  }

  /* ---------- RENDER ---------- */

  return (
    <>
      <div style={wrap}>
        <h1 style={title}>Round Complete</h1>

        {/* ---------- COINS ---------- */}
        <div style={coinWrap}>
          <div style={coinLabel}>Coins</div>
          <div style={coinValue}>🪙 {displayCoins}</div>

          {depositing && coinsEarned > 0 && (
            <div style={depositText}>+{coinsEarned} deposited</div>
          )}
        </div>

        {/* ---------- STATS ---------- */}
        <div style={statsRow}>
          <Stat label="Score" value={score} />
          <Stat label="Correct" value={correctCount} />
          <Stat label="Attempted" value={attemptedCount} />
          <Stat
            label="Accuracy"
            value={accuracy == null ? "N/A" : `${Math.round(accuracy * 100)}%`}
          />
        </div>

        {/* ---------- ACTIONS ---------- */}
        <div style={actions}>
          <button style={primaryBtn} onClick={onPlayAgain}>
            Play Again
          </button>
          <button style={secondaryBtn} onClick={onChangeOptions}>
            Change Options
          </button>
          <button style={reviewBtn} onClick={() => setReviewOpen(true)}>
            Review Answers
          </button>
        </div>
      </div>

      {/* ---------- ANSWER REVIEW MODAL ---------- */}
      {reviewOpen &&
        createPortal(
          <div style={modalBackdrop} onMouseDown={() => setReviewOpen(false)}>
            <div style={modal} onMouseDown={e => e.stopPropagation()}>
              <div style={modalHeader}>
                <div style={modalTitle}>Answer Review</div>
                <button style={closeBtn} onClick={() => setReviewOpen(false)}>
                  ✕
                </button>
              </div>

              <div style={modalBody}>
                {history.map((item, i) => {
                  const colour =
                    item.result === "correct"
                      ? "#2ecc71"
                      : item.result === "wrong"
                      ? "#e74c3c"
                      : "#aaa";

                  return (
                    <div key={i} style={{ ...reviewRow, borderColor: colour }}>
                      <div style={equationRow}>
                        {/* Player 1 */}
                        <div style={cardCol}>
                          <MiniCard>
                            <PlayerCard image={item.players[0].image} />
                          </MiniCard>
                          <div style={name}>{item.players[0].name}</div>
                          <div style={num}>#{item.players[0].number}</div>
                        </div>

                        {/* Operator */}
                        <div style={operatorText}>{item.operator}</div>

                        {/* Player 2 */}
                        <div style={cardCol}>
                          <MiniCard>
                            <PlayerCard image={item.players[1].image} />
                          </MiniCard>
                          <div style={name}>{item.players[1].name}</div>
                          <div style={num}>#{item.players[1].number}</div>
                        </div>

                        {/* Equals */}
                        <div style={equalsText}>=</div>

                        {/* Answer */}
                        <div style={cardCol}>
                          <MiniCard>
                            <PlayerCard image={item.answer.image} />
                          </MiniCard>
                          <div style={name}>{item.answer.name}</div>
                          <div style={num}>#{item.answer.number}</div>
                        </div>
                      </div>

                      <div style={{ ...result, color: colour }}>
                        {item.result.toUpperCase()}
                      </div>

                      {item.userGuess && (
                        <div style={guess}>
                          Your guess: <strong>{item.userGuess}</strong>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>,
          document.getElementById("modal-root")
        )}
    </>
  );
}

/* ---------- SUB ---------- */

function Stat({ label, value }) {
  return (
    <div style={stat}>
      <div style={statLabel}>{label}</div>
      <div style={statValue}>{value}</div>
    </div>
  );
}

/* ---------- STYLES ---------- */

const wrap = {
  width: "100%",
  height: "100%",
  padding: 28,
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
};

const title = {
  fontSize: 36,
  fontWeight: 900,
  marginBottom: 18
};

const coinWrap = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: 22
};

const coinLabel = {
  fontSize: 14,
  opacity: 0.7
};

const coinValue = {
  fontSize: 42,
  fontWeight: 900
};

const depositText = {
  marginTop: 6,
  fontWeight: 700,
  color: "#2ecc71"
};

const statsRow = {
  display: "grid",
  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
  gap: 12,
  width: "100%",
  maxWidth: 680,
  marginBottom: 24
};

const stat = {
  background: "#111",
  borderRadius: 14,
  padding: 14,
  color: "#fff",
  textAlign: "center"
};

const statLabel = {
  fontSize: 12,
  opacity: 0.7,
  marginBottom: 6
};

const statValue = {
  fontSize: 22,
  fontWeight: 900
};

const actions = {
  display: "flex",
  gap: 14,
  marginBottom: 20
};

const primaryBtn = {
  padding: "14px 34px",
  borderRadius: 14,
  border: "none",
  background: "#111",
  color: "#fff",
  fontSize: 18,
  fontWeight: 800,
  cursor: "pointer"
};

const secondaryBtn = {
  padding: "14px 30px",
  borderRadius: 14,
  border: "2px solid #111",
  background: "transparent",
  fontSize: 16,
  fontWeight: 700,
  cursor: "pointer"
};

const reviewBtn = {
  padding: "14px 26px",
  borderRadius: 14,
  border: "2px dashed #111",
  background: "transparent",
  fontSize: 16,
  fontWeight: 800,
  cursor: "pointer"
};

/* ---------- MODAL ---------- */

const modalBackdrop = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.55)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
  padding: 18
};

const modal = {
  width: "min(960px, 96vw)",
  maxHeight: "68vh",
  background: "linear-gradient(180deg, #262626 0%, #151515 100%)",
  borderRadius: 18,
  boxShadow: "0 18px 60px rgba(0,0,0,0.6)",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  border: "1px solid rgba(255,255,255,0.06)"
};

const modalHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 12,
  padding: "12px 16px",   // 👈 ADD THIS
  color: "#fff"
};


const modalTitle = {
  fontSize: 22,
  fontWeight: 900
};

const closeBtn = {
  border: "none",
  background: "transparent",
  color: "#fff",
  fontSize: 22,
  cursor: "pointer"
};

const modalBody = {
  overflowY: "auto",
  paddingRight: 6
};

/* ---------- REVIEW ---------- */

const reviewRow = {
  background: "#000",
  border: "3px solid",
  borderRadius: 18,
  padding: 16,
  marginBottom: 14,
  color: "#fff"
};

const equationRow = {
  display: "flex",
  gap: 16,
  justifyContent: "center",
  alignItems: "flex-start"
};

const cardCol = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  minWidth: 100
};

const miniCard = {
  transform: "scale(0.6)",
  transformOrigin: "top center",
  width: 150,
  height: 180,
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start"
};

const operatorText = {
  fontSize: 28,
  fontWeight: 900,
  marginTop: 40,
  opacity: 0.85
};

const equalsText = {
  fontSize: 28,
  fontWeight: 900,
  marginTop: 40
};

const name = {
  fontWeight: 700,
  fontSize: 14
};

const num = {
  fontSize: 12,
  opacity: 0.6
};

const result = {
  marginTop: 8,
  fontWeight: 900,
  textAlign: "center"
};

const guess = {
  marginTop: 6,
  fontSize: 14,
  opacity: 0.85,
  textAlign: "center"
};
