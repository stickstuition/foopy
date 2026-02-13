// src/components/profile/tabs/StatsTab.jsx

import { useEffect, useState } from "react";
import { API_URL } from "../../../config/api";


export default function StatsTab() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  fetch(`${API_URL}/stats/summary`, {
    credentials: "include"
  })
    .then(r => r.json())
    .then(data => {
      setStats(data.stats);
      setLoading(false);
    })
    .catch(() => setLoading(false));
}, []);



if (loading) {
  return <div style={note}>Loading stats…</div>;
}

if (!stats) {
  return <div style={note}>No stats available</div>;
}

return (
  <div style={wrap}>
    <Card title="Games Played" value={stats.games_played} />
    <Card title="Wins" value={stats.wins} />
    <Card title="Losses" value={stats.losses} />
    <Card
      title="Accuracy"
      value={
        stats.accuracy == null
          ? "N/A"
          : `${Math.round(stats.accuracy * 100)}%`
      }
    />
    <Card title="High Score" value={stats.high_score} />
    <Card title="Longest Streak" value={stats.longest_streak} />
  </div>
);

}

function Card({ title, value }) {
  return (
    <div style={card}>
      <div style={cardTitle}>{title}</div>
      <div style={cardValue}>{value}</div>
    </div>
  );
}

const wrap = {
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: 12
};

const card = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.10)",
  borderRadius: 14,
  padding: 14,
  color: "#eee",
  boxShadow: "0 10px 26px rgba(0,0,0,0.25)"
};

const cardTitle = {
  fontSize: 12,
  opacity: 0.75,
  marginBottom: 6,
  fontWeight: 700
};

const cardValue = {
  fontSize: 24,
  fontWeight: 900
};

const note = {
  gridColumn: "1 / -1",
  marginTop: 8,
  fontSize: 12,
  opacity: 0.65,
  color: "#ddd"
};
