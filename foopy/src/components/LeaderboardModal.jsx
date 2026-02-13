import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { API_URL } from "../config/api";

/* ---------- PERIOD TABS ---------- */
const PERIODS = [
  { key: "all", label: "ALL TIME" },
  { key: "week", label: "WEEK" },
  { key: "today", label: "TODAY" }
];

/* ---------- METRICS ---------- */
const METRICS = [
  {
    key: "high_score",
    label: "Highest Score",
    header: "SCORE",
    showGames: true,
    showAccuracy: true
  },
  {
    key: "coins",
    label: "Most Coins",
    header: "COINS",
    showGames: false,
    showAccuracy: false
  },
  {
    key: "games_played",
    label: "Most Games",
    header: "GAMES",
    showGames: false,
    showAccuracy: false
  },
  {
    key: "wins",
    label: "Most Wins",
    header: "WINS",
    showGames: false,
    showAccuracy: false
  }
];

export default function LeaderboardModal({ open, onClose }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [metric, setMetric] = useState("high_score");
  const [period, setPeriod] = useState("all");

  const metricMeta = useMemo(
    () => METRICS.find(m => m.key === metric) ?? METRICS[0],
    [metric]
  );

  /* ---------- FETCH ---------- */
useEffect(() => {
  if (!open) return;

  setLoading(true);
  fetch(`${API_URL}/leaderboard?metric=${metric}&period=${period}`)
    .then(r => r.json())
    .then(d => {
      setRows(Array.isArray(d.leaderboard) ? d.leaderboard : []);
      setLoading(false);
    })
    .catch(() => setLoading(false));
}, [open, metric, period]);


  if (!open) return null;

  const gridCols = [
    "60px",
    "1fr",
    "140px",
    metricMeta.showGames ? "120px" : null,
    metricMeta.showAccuracy ? "100px" : null
  ]
    .filter(Boolean)
    .join(" ");

  return createPortal(
    <div style={backdrop} onMouseDown={onClose}>
      <div style={modal} onMouseDown={e => e.stopPropagation()}>
        {/* ---------- HEADER ---------- */}
        <div style={header}>
          <div style={title}>LEADERBOARD</div>
          <button style={closeBtn} onClick={onClose}>✕</button>
        </div>

        {/* ---------- FILTER ROW ---------- */}
        <div style={filterRow}>
          <div style={metricGroup}>
            {METRICS.map(m => (
              <Pill
                key={m.key}
                variant="metric"
                active={metric === m.key}
                onClick={() => setMetric(m.key)}
              >
                {m.label}
              </Pill>
            ))}
          </div>

          <div style={periodGroup}>
            {PERIODS.map(p => (
              <Pill
                key={p.key}
                variant="period"
                active={period === p.key}
                onClick={() => setPeriod(p.key)}
              >
                {p.label}
              </Pill>
            ))}
          </div>
        </div>

        {/* ---------- BODY ---------- */}
        <div style={body}>
          {loading && <div style={note}>Loading leaderboard…</div>}

          {!loading && rows.length === 0 && (
            <div style={note}>No games played yet</div>
          )}

          {!loading && rows.length > 0 && (
            <div style={list}>
              {/* HEADER */}
              <div style={{ ...listHeader, gridTemplateColumns: gridCols }}>
                <div>#</div>
                <div>PLAYER</div>
                <div>{metricMeta.header}</div>
                {metricMeta.showGames && <div>GAMES</div>}
                {metricMeta.showAccuracy && <div>ACC</div>}
              </div>

              {/* ROWS */}
              {rows.map((r, i) => (
                <div
                  key={`${metric}-${period}-${r.username}-${i}`}
                  style={{ ...row, gridTemplateColumns: gridCols }}
                >
                  <div style={rank(i)}>{i + 1}</div>
                  <div style={player}>{r.username}</div>
                  <div style={valueCell}>{r.value ?? "—"}</div>

                  {metricMeta.showGames && (
                    <div style={gamesCell}>{r.games_played ?? "—"}</div>
                  )}

                  {metricMeta.showAccuracy && (
                    <div style={accCell}>
                      {r.accuracy == null
                        ? "—"
                        : `${Math.round(r.accuracy * 100)}%`}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

/* ---------- PILL ---------- */
function Pill({ variant, active, children, onClick }) {
  const base = variant === "period" ? periodTab : metricTab;
  const activeStyle =
    variant === "period" ? periodTabActive : metricTabActive;

  return (
    <button
      type="button"
      onClick={onClick}
      style={{ ...base, ...(active ? activeStyle : {}) }}
    >
      {children}
    </button>
  );
}

/* ---------- STYLES ---------- */

const backdrop = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.38)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999
};

const modal = {
  width: "min(900px, 96vw)",
  height: 520,
  background: "#f7f8fa",
  borderRadius: 18,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  color: "#111",
  boxShadow: "0 20px 60px rgba(0,0,0,0.35)"
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "18px 22px",
  borderBottom: "1px solid rgba(0,0,0,0.1)"
};

const title = { fontSize: 26, fontWeight: 900, letterSpacing: 1 };
const closeBtn = { background: "transparent", border: "none", fontSize: 24 };

const filterRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "12px 18px",
  borderBottom: "1px solid rgba(0,0,0,0.08)"
};

const metricGroup = { display: "flex", gap: 8 };
const periodGroup = { display: "flex", gap: 10 };

const metricTab = {
  padding: "8px 16px",
  borderRadius: 999,
  border: "none",
  fontWeight: 800,
  fontSize: 13,
  background: "#e9ecef",
  cursor: "pointer"
};

const metricTabActive = {
  background: "#212529",
  color: "#fff",
  boxShadow: "0 3px 0 rgba(0,0,0,0.35)"
};

const periodTab = {
  padding: "8px 18px",
  borderRadius: 999,
  border: "none",
  fontWeight: 800,
  fontSize: 13,
  background: "#dee2e6",
  cursor: "pointer"
};

const periodTabActive = {
  background: "linear-gradient(to bottom, #4dabf7, #1c7ed6)",
  color: "#fff",
  boxShadow: "0 3px 0 rgba(0,0,0,0.25)"
};

const body = { padding: 18, overflowY: "auto" };
const note = { opacity: 0.6 };

const list = { display: "flex", flexDirection: "column", gap: 6 };

const listHeader = {
  display: "grid",
  fontWeight: 800,
  fontSize: 13,
  opacity: 0.65,
  padding: "6px 10px"
};

const row = {
  display: "grid",
  alignItems: "center",
  background: "#fff",
  borderRadius: 14,
  padding: "10px",
  boxShadow: "0 3px 10px rgba(0,0,0,0.12)"
};

const rank = i => ({
  fontWeight: 900,
  color:
    i === 0 ? "#d4af37" :
    i === 1 ? "#adb5bd" :
    i === 2 ? "#cd7f32" :
    "#333"
});

const player = { fontWeight: 700 };
const valueCell = { fontWeight: 900 };
const gamesCell = { opacity: 0.8 };
const accCell = { fontWeight: 700 };
