// src/components/profile/tabs/RecentGamesTab.jsx
import { useEffect, useState } from "react";
import { API_URL } from "../../../config/api";

export default function RecentGamesTab() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  fetch(`${API_URL}/stats/recent-games`, {
    credentials: "include"
  })
    .then(res => res.json())
    .then(data => {
      setGames(Array.isArray(data.games) ? data.games : []);
      setLoading(false);
    })
    .catch(() => setLoading(false));
}, []);


  return (
    <div style={wrap}>
      <div style={title}>Recent Games</div>

      {loading && <div style={empty}>Loading…</div>}

      {!loading && games.length === 0 && (
        <div style={empty}>No recent games yet.</div>
      )}

      {!loading && games.length > 0 && (
        <div style={list}>
          {games.map((g, idx) => {
            const isOnline = g.mode === "online";
            const resultColor =
              g.result === "WIN"
                ? "#4dabf7"
                : g.result === "LOSS"
                ? "#ff6b6b"
                : "#fff";

            return (
              <div key={idx} style={row}>
                <div style={left}>
                  {isOnline ? (
                    <>
                      <div style={mode}>
                        Online vs {g.opponent || "Unknown"}
                        {g.result && (
                          <span
                            style={{
                              marginLeft: 8,
                              color: resultColor,
                              fontWeight: 900
                            }}
                          >
                            {g.result}
                          </span>
                        )}
                      </div>

                      <div style={date}>{g.date}</div>
                    </>
                  ) : (
                    <>
                      <div style={mode}>Timed Mode</div>
                      <div style={date}>{g.date}</div>
                    </>
                  )}
                </div>

                <div
                  style={{
                    ...score,
                    color: isOnline ? resultColor : "#fff"
                  }}
                >
                  {isOnline
                    ? `${g.score} - ${g.opponentScore ?? 0}`
                    : g.score}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ---------- STYLES ---------- */

const wrap = { color: "#eee" };

const title = {
  fontSize: 16,
  fontWeight: 900,
  marginBottom: 10
};

const empty = {
  opacity: 0.7,
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.10)",
  borderRadius: 14,
  padding: 14
};

const list = {
  display: "flex",
  flexDirection: "column",
  gap: 10
};

const row = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.10)",
  borderRadius: 14,
  padding: "12px 14px"
};

const left = {
  display: "flex",
  flexDirection: "column",
  gap: 2
};

const mode = {
  fontWeight: 900
};

const date = {
  fontSize: 12,
  opacity: 0.65
};

const score = {
  fontSize: 18,
  fontWeight: 900,
  letterSpacing: 1
};
