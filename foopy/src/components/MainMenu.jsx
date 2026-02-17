import { useState } from "react";
import { playDownClick, playUpClick } from "../utils/uiSounds";
import { useAuth } from "../auth/AuthContext";
import { BADGES } from "../engine/badges";
import ProfileModal from "../components/profile/ProfileModal";
import LeaderboardModal from "./LeaderboardModal";

import useIsMobile from "../hooks/useIsMobile";

const isMobile = useIsMobile();


/* ========================================================= */

export default function MainMenu({ onTimedMode, onBattleHost, onBattleJoin }) {
  const { user } = useAuth();
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  if (!user) return null;

  return (
    <div style={isMobile ? mobileWrap : desktopWrap}>
      {profileOpen && <ProfileModal onClose={() => setProfileOpen(false)} />}

      <LeaderboardModal
        open={leaderboardOpen}
        onClose={() => setLeaderboardOpen(false)}
      />

      {/* HUD */}
      <div style={hud(isMobile, profileOpen)}>
        <LeaderboardButton onClick={() => setLeaderboardOpen(true)} />
        <ProfileButton user={user} onOpen={() => setProfileOpen(true)} />
      </div>

      {/* CONTENT */}
      <div style={content(isMobile)}>
        <img
          src="/assets/foopy-logo.png"
          alt="Foopy"
          style={isMobile ? mobileLogo : desktopLogo}
        />

        <div style={buttonStack}>
          <MenuButton label="Timed Mode" onClick={onTimedMode} primary />
          <MenuButton label="Host Game" onClick={onBattleHost} red />
          <MenuButton label="Join Game" onClick={onBattleJoin} red />
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   BUTTONS
   ========================================================= */

function MenuButton({ label, onClick, red, primary }) {
  let pressed = false;

  return (
    <div
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
      onMouseLeave={() => (pressed = false)}
      style={{
        ...buttonBase,
        ...(primary && primaryStyle),
        ...(red && redStyle)
      }}
    >
      {label}
    </div>
  );
}

function LeaderboardButton({ onClick }) {
  return (
    <div title="Leaderboards" onClick={onClick} style={hudButton}>
      🏆
    </div>
  );
}

/* =========================================================
   PROFILE BADGE
   ========================================================= */

function ProfileButton({ user, onOpen }) {
  const badge = BADGES[user.badgeEquipped] ?? BADGES.stk;

  return (
    <div style={profileButton} onClick={onOpen}>
      <img
        src={badge.icon}
        alt=""
        style={{ width: "70%", height: "70%", objectFit: "contain" }}
      />
    </div>
  );
}

/* =========================================================
   STYLES
   ========================================================= */

/* ---------- Layout ---------- */

const desktopWrap = {
  width: "100%",
  height: "100%",
  position: "relative",
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const mobileWrap = {
  width: "100vw",
  minHeight: "100svh",
  overflowX: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  paddingTop: 40
};

const content = (mobile) => ({
  width: mobile ? "100%" : "auto",
  maxWidth: mobile ? 360 : "none",
  padding: mobile ? "0 16px" : 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: mobile ? 22 : 28
});

/* ---------- Logo ---------- */

const desktopLogo = {
  width: 420,
  marginBottom: 20
};

const mobileLogo = {
  width: 260
};

/* ---------- Buttons ---------- */

const buttonStack = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: 16
};

const buttonBase = {
  width: "100%",
  height: 64,
  borderRadius: 18,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 20,
  fontWeight: 800,
  color: "#fff",
  cursor: "pointer",
  userSelect: "none",
  boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
  background: "linear-gradient(to bottom, #5c8fc6, #3b5f87)"
};

const primaryStyle = {
  background: "linear-gradient(to bottom, #4dabf7, #1c7ed6)"
};

const redStyle = {
  background: "linear-gradient(to bottom, #ff6b6b, #c92a2a)"
};

/* ---------- HUD ---------- */

const hud = (mobile, profileOpen) => ({
  position: "absolute",
  top: mobile ? 12 : 16,
  left: mobile ? 12 : "auto",
  right: mobile ? "auto" : 20,
  display: "flex",
  gap: 10,
  zIndex: 10,
  opacity: profileOpen ? 0 : 1
});

const hudButton = {
  width: 40,
  height: 40,
  borderRadius: "50%",
  background: "linear-gradient(to bottom, #555, #2f2f2f)",
  color: "#eee",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  boxShadow: "0 3px 10px rgba(0,0,0,0.35)"
};

const profileButton = {
  width: 42,
  height: 42,
  borderRadius: "50%",
  background: "linear-gradient(to bottom, #666, #2f2f2f)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  cursor: "pointer"
};
