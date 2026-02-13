// src/components/profile/ProfileModal.jsx
import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { BADGES } from "../../engine/badges";
import { playDownClick, playUpClick } from "../../utils/uiSounds";

import StatsTab from "./tabs/StatsTab";
import BadgeShopTab from "./tabs/BadgeShopTab";
import RecentGamesTab from "./tabs/RecentGamesTab";

import { useAuth } from "../../auth/AuthContext";

export default function ProfileModal({ onClose }) {
  const { user } = useAuth();
  const [tab, setTab] = useState("stats");

  const equipped = useMemo(() => {
    const id = user?.badgeEquipped;
    return BADGES[id] ?? BADGES.stk;
  }, [user]);

  if (!user) return null;

  const isFullArt = equipped.fullArt === true;

  return createPortal(
    <div style={overlay} onMouseDown={onClose}>
      <div style={modal} onMouseDown={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={header}>
          <div style={headerLeft}>
            <div style={avatarCircle}>
              <img
                src={equipped.icon}
                alt={equipped.name}
                style={{
                  maxWidth: isFullArt ? "100%" : "85%",
                  maxHeight: isFullArt ? "100%" : "85%",
                  width: "auto",
                  height: "auto",
                  objectFit: "contain"
                }}
              />
            </div>

            <div>
              <div style={username}>{user.username}</div>
              <div style={coinsLine}>🪙 {user.coins ?? 0} coins</div>
            </div>
          </div>

          <button style={closeBtn} onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div style={tabsRow}>
          <TabButton active={tab === "stats"} onClick={() => setTab("stats")}>
            Stats
          </TabButton>
          <TabButton active={tab === "badges"} onClick={() => setTab("badges")}>
            Badges
          </TabButton>
          <TabButton active={tab === "recent"} onClick={() => setTab("recent")}>
            Recent Matches
          </TabButton>
        </div>

        {/* Content */}
        <div style={content} key={tab}>
          {tab === "stats" && <StatsTab user={user} />}
          {tab === "badges" && <BadgeShopTab />}
          {tab === "recent" && <RecentGamesTab />}
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}

function TabButton({ active, onClick, children }) {
  let pressed = false;

  return (
    <button
      onClick={onClick}
      onMouseDown={() => {
        pressed = true;
        playDownClick(true);
      }}
      onMouseUp={() => {
        if (pressed) {
          playUpClick(true);
          pressed = false;
        }
      }}
      onMouseLeave={() => {
        if (pressed) {
          playUpClick(true);
          pressed = false;
        }
      }}
      style={{
        ...tabBtn,
        ...(active ? tabBtnActive : null)
      }}
    >
      {children}
    </button>
  );
}

/* ---------------- Styles ---------------- */

const overlay = {
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
  width: "min(860px, 96vw)",
  maxHeight: "62vh",
  background: "linear-gradient(180deg, #262626 0%, #151515 100%)",
  borderRadius: 18,
  boxShadow: "0 18px 60px rgba(0,0,0,0.6)",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  border: "1px solid rgba(255,255,255,0.06)"
};

const header = {
  padding: "16px 18px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderBottom: "1px solid rgba(255,255,255,0.08)"
};

const headerLeft = {
  display: "flex",
  alignItems: "center",
  gap: 16
};

const avatarCircle = {
  width: 84,
  height: 84,
  borderRadius: "50%",
  background: "linear-gradient(to bottom, #666, #2f2f2f)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 3px 0 rgba(0,0,0,0.45), 0 10px 22px rgba(0,0,0,0.4)",
  overflow: "hidden"
};

const username = {
  fontSize: 20,
  fontWeight: 800,
  color: "#f1f1f1"
};

const coinsLine = {
  fontSize: 14,
  opacity: 0.85,
  color: "#ddd",
  marginTop: 4
};

const closeBtn = {
  border: "none",
  background: "transparent",
  color: "#e8e8e8",
  fontSize: 18,
  cursor: "pointer",
  padding: 8,
  borderRadius: 10
};

const tabsRow = {
  display: "flex",
  background: "rgba(0,0,0,0.25)",
  gap: 10,
  padding: "12px 14px",
  borderBottom: "1px solid rgba(255,255,255,0.08)"
};

const tabBtn = {
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.04)",
  color: "#eaeaea",
  padding: "10px 12px",
  borderRadius: 12,
  cursor: "pointer",
  fontWeight: 700
};

const tabBtnActive = {
  background: "rgba(255,255,255,0.12)",
  borderColor: "rgba(255,255,255,0.22)"
};

const content = {
  flex: 1,
  overflow: "auto",
  padding: 16
};
