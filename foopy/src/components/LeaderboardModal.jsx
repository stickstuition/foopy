import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { API_URL } from "../config/api";
import useIsMobile from "../hooks/useIsMobile";

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
    showGames: false,
    showAccuracy: false
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

const PAGE_SIZE_MOBILE = 8;
const PAGE_SIZE_DESKTOP = 12;

export default function LeaderboardModal({ open, onClose }) {
    const isMobile = useIsMobile(480);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [metric, setMetric] = useState("high_score");
  const [period, setPeriod] = useState("all");
    const [page, setPage] = useState(1);
    

  const metricMeta = useMemo(
    () => METRICS.find(m => m.key === metric) ?? METRICS[0],
    [metric]
  );
    const pageSize = isMobile ? PAGE_SIZE_MOBILE : PAGE_SIZE_DESKTOP;
  const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
  const pageStart = (page - 1) * pageSize;
  const visibleRows = rows.slice(pageStart, pageStart + pageSize);

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

useEffect(() => {
  if (!open) return;
  setPage(1);
}, [open, metric, period]);

useEffect(() => {
  if (page > totalPages) {
    setPage(totalPages);
  }
}, [page, totalPages]);

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
  <div style={backdrop(isMobile)} onMouseDown={onClose}>
    <div style={modal(isMobile)} onMouseDown={e => e.stopPropagation()}>
        {/* ---------- HEADER ---------- */}
        <div style={header}>
          <div style={title}>LEADERBOARD</div>
          <button style={closeBtn} onClick={onClose}>✕</button>
        </div>

        {/* ---------- FILTER ROW ---------- */}
                <div style={filterRow(isMobile)}>
                    <div style={metricGroup(isMobile)}>
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

                    <div style={periodGroup(isMobile)}>
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
                <div style={body(isMobile)}>
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
              <div style={listScroll}>
                {visibleRows.map((r, i) => {
                  const absoluteIndex = pageStart + i;

                  return (
                    <div
                      key={`${metric}-${period}-${r.username}-${absoluteIndex}`}
                      style={{ ...row, gridTemplateColumns: gridCols }}
                    >
                      <div style={rank(absoluteIndex)}>{absoluteIndex + 1}</div>
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
                  );
                })}
              </div>

              {totalPages > 1 && (
                <div style={pagerWrap}>
                  <button
                    type="button"
                    style={{
                      ...pageBtn,
                      ...(page === 1 ? pageBtnDisabled : {})
                    }}
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                  >
                    Prev
                  </button>

                  <div style={pageTabs}>
                    {Array.from({ length: totalPages }, (_, idx) => {
                      const pageNumber = idx + 1;
                      return (
                        <button
                          key={pageNumber}
                          type="button"
                          style={{
                            ...pageTab,
                            ...(page === pageNumber ? pageTabActive : {})
                          }}
                          onClick={() => setPage(pageNumber)}
                        >
                          {pageNumber}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    style={{
                      ...pageBtn,
                      ...(page === totalPages ? pageBtnDisabled : {})
                    }}
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                  >
                    Next
                  </button>
                </div>
              )}
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
      style={{
        ...base,
        ...(active ? activeStyle : {}),
        flex: "0 0 auto",
        flexShrink: 0,
        whiteSpace: "nowrap"
      }}
    >
      {children}
    </button>
  );
}

/* ---------- STYLES ---------- */

const backdrop = (mobile) => ({
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.38)",
  display: "flex",

  // ✅ Mobile: full-screen modal must start at top; no vertical centering
  alignItems: mobile ? "stretch" : "center",
  justifyContent: mobile ? "stretch" : "center",

  zIndex: 9999
});

const modal = (mobile) => ({
  width: mobile ? "min(980px, 100vw)" : "min(900px, 96vw)",
  height: mobile ? "100svh" : 520,
  background: "#f7f8fa",
  borderRadius: mobile ? 0 : 18,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  color: "#111",
  boxShadow: mobile ? "none" : "0 20px 60px rgba(0,0,0,0.35)"
});

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "18px 22px",
  borderBottom: "1px solid rgba(0,0,0,0.1)"
};

const title = { fontSize: 26, fontWeight: 900, letterSpacing: 1 };
const closeBtn = { background: "transparent", border: "none", fontSize: 24 };

const filterRow = (mobile) => ({
  display: "flex",
  flexDirection: mobile ? "column" : "row",
  justifyContent: "space-between",
  alignItems: mobile ? "stretch" : "center",
  gap: mobile ? 10 : 12,
  padding: mobile ? "10px 12px" : "12px 18px",
  borderBottom: "1px solid rgba(0,0,0,0.08)",

  // ✅ Desktop: avoid accidental horizontal scroll
  overflowX: "hidden"
});

const metricGroup = (mobile) => ({
  display: "flex",
  gap: 8,

  // ✅ Desktop: take only needed width so it can sit left
  width: mobile ? "100%" : "auto",

  // ✅ Desktop: do not create horizontal scrolling row
  overflowX: mobile ? "auto" : "visible",
  overflowY: "hidden",

  WebkitOverflowScrolling: "touch",
  touchAction: mobile ? "pan-x" : undefined,

  paddingBottom: mobile ? 4 : 0
});

const periodGroup = (mobile) => ({
  display: "flex",
  gap: 10,

  // ✅ Desktop: take only needed width so it can sit right
  width: mobile ? "100%" : "auto",

  overflowX: mobile ? "auto" : "visible",
  overflowY: "hidden",

  WebkitOverflowScrolling: "touch",
  touchAction: mobile ? "pan-x" : undefined,

  // ✅ Desktop: push to the right
  marginLeft: mobile ? 0 : "auto",

  paddingBottom: mobile ? 4 : 0
});

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

const body = (mobile) => ({
  padding: mobile ? 12 : 18,
  display: "flex",
  flexDirection: "column",
  gap: 10,
  flex: 1,
  minHeight: 0,
  overflow: "hidden"
});
const note = { opacity: 0.6 };

const list = {
  display: "flex",
  flexDirection: "column",
  gap: 6,
  flex: 1,
  minHeight: 0,
  overflow: "hidden"
};

const listScroll = {
  display: "flex",
  flexDirection: "column",
  gap: 6,
  flex: 1,
  overflowY: "auto",
  minHeight: 0,
  paddingRight: 2
};
const listHeader = {
  display: "grid",
  fontWeight: 800,
  fontSize: 13,
  opacity: 0.65,
  padding: "6px 10px",
  flexShrink: 0
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

const pagerWrap = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 10,
  paddingTop: 4,
  flexShrink: 0
};

const pageTabs = {
  display: "flex",
  gap: 8,
  overflowX: "auto",
  overflowY: "hidden",
  flex: 1,
  justifyContent: "center",
  WebkitOverflowScrolling: "touch"
};

const pageBtn = {
  border: "none",
  borderRadius: 10,
  padding: "10px 14px",
  fontWeight: 800,
  background: "#212529",
  color: "#fff",
  cursor: "pointer",
  flexShrink: 0
};

const pageBtnDisabled = {
  opacity: 0.45,
  cursor: "default"
};

const pageTab = {
  border: "none",
  borderRadius: 10,
  minWidth: 40,
  height: 40,
  padding: "0 12px",
  fontWeight: 800,
  background: "#dee2e6",
  color: "#111",
  cursor: "pointer",
  flex: "0 0 auto"
};

const pageTabActive = {
  background: "linear-gradient(to bottom, #4dabf7, #1c7ed6)",
  color: "#fff",
  boxShadow: "0 3px 0 rgba(0,0,0,0.25)"
};
