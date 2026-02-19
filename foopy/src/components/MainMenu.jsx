import { useState } from "react";
import { playDownClick, playUpClick } from "../utils/uiSounds";
import { useAuth } from "../auth/AuthContext";
import { BADGES } from "../engine/badges";
import ProfileModal from "../components/profile/ProfileModal";
import LeaderboardModal from "./LeaderboardModal";
import useIsMobile from "../hooks/useIsMobile";

export default function MainMenu({ onTimedMode, onBattleHost, onBattleJoin }) {
  const { user } = useAuth();
  const isMobile = useIsMobile();

  const [leaderboardOpen, setLeaderboardOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  if (!user) return null;

  return (
    <div style={isMobile ? mobileWrap : desktopWrap}>
      {/* AFL LOGO CLOUD */}
      {!isMobile && <AFLLogoCloud />}

      {/* MODALS */}
      {profileOpen && <ProfileModal onClose={() => setProfileOpen(false)} />}

      <LeaderboardModal
        open={leaderboardOpen}
        onClose={() => setLeaderboardOpen(false)}
      />

      {/* HUD (DESKTOP + MOBILE) */}
      <div style={hud(isMobile, profileOpen)}>
        <LeaderboardButton
          onClick={() => setLeaderboardOpen(true)}
          mobile={isMobile}
        />
        <ProfileButton
          user={user}
          onOpen={() => setProfileOpen(true)}
          mobile={isMobile}
        />
      </div>

      {/* MAIN CONTENT */}
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
   COMPONENTS
   ========================================================= */

function MenuButton({ label, onClick, red, primary }) {
  const [pressed, setPressed] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onPointerDown={() => {
        setPressed(true);
        playDownClick(true);
      }}
      onPointerUp={() => {
        setPressed(false);
        playUpClick(true);
      }}
      onPointerLeave={() => {
        setPressed(false);
        setHovered(false);
      }}
      onPointerEnter={() => setHovered(true)}
      style={{
        ...buttonBase,
        ...(primary && primaryStyle),
        ...(red && redStyle),
        transform: pressed
          ? "translateY(2px)"
          : hovered
          ? "translateY(1px)"
          : "translateY(0)",
        boxShadow: pressed
          ? "0 4px 10px rgba(0,0,0,0.35)"
          : "0 8px 20px rgba(0,0,0,0.35)",
        transition: "transform 120ms ease, box-shadow 120ms ease"
      }}
    >
      {label}
    </div>
  );
}



function LeaderboardButton({ onClick, mobile }) {
  return (
    <div title="Leaderboards" onClick={onClick} style={hudButton(mobile)}>
      🏆
    </div>
  );
}

function ProfileButton({ user, onOpen, mobile }) {
  const badge = BADGES[user.badgeEquipped] ?? BADGES.stk;

  return (
    <div
      onClick={onOpen}
      style={profileButton(mobile)}
      title={
        !mobile
          ? `${user.username}\n${user.coins ?? 0} coins`
          : undefined
      }
    >
      <img
        src={badge.icon}
        alt=""
        style={{ width: "70%", height: "70%", objectFit: "contain" }}
      />
    </div>
  );
}

/* =========================================================
   AFL LOGO CLOUD (REAL, FROM /public/logos)
   ========================================================= */

function AFLLogoCloud() {
  const clubs = [
    "AdelaideCrows",
    "BrisbaneLions",
    "Carlton",
    "Collingwood",
    "Essendon",
    "Fremantle",
    "GCSuns",
    "Geelong",
    "GWS",
    "Hawthorn",
    "Melbourne",
    "North_Melbourne",
    "PortAdelaide",
    "Richmond",
    "StKildaFC",
    "SydneySwans",
    "West_Coast",
    "Western_Bulldogs"
  ];

  return (
    <div style={logoCloudWrap}>
      {clubs.map((club) => (
        <img
          key={club}
          src={`/logos/${club}.webp`}
          alt=""
          style={logoCloudImg}
        />
      ))}
    </div>
  );
}

/* =========================================================
   STYLES
   ========================================================= */

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
  height: "100svh",
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  paddingTop: 56
};

const content = (mobile) => ({
  width: mobile ? "100%" : "auto",
  maxWidth: mobile ? 360 : "none",
  padding: mobile ? "0 16px" : 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: mobile ? 22 : 28,
  position: "relative",
  zIndex: 1
});

const desktopLogo = {
  width: 420,
  marginBottom: 20
};

const mobileLogo = {
  width: 260
};

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
  fontWeight: 900,
  color: "#fff",
  cursor: "pointer",
  userSelect: "none",
  border: "2px solid rgba(255,255,255,0.35)",
  background: "linear-gradient(to bottom, #6fa8dc, #3b5f87)",
  textShadow: "0 1px 1px rgba(0,0,0,0.35)"
};


const primaryStyle = {
  background: "linear-gradient(to bottom, #4dabf7, #1c7ed6)"
};

const redStyle = {
  background: "linear-gradient(to bottom, #ff6b6b, #c92a2a)"
};

const hud = (mobile, profileOpen) => ({
  position: "absolute",
  top: mobile ? 12 : 20,
  right: mobile ? "auto" : 24,
  left: mobile ? 12 : "auto",
  display: "flex",
  gap: 12,
  zIndex: 10,
  opacity: profileOpen ? 0 : 1
});

const hudButton = (mobile) => ({
  width: mobile ? 40 : 56,
  height: mobile ? 40 : 56,
  borderRadius: "50%",
  background: "linear-gradient(to bottom, #555, #2f2f2f)",
  color: "#eee",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  boxShadow: "0 3px 10px rgba(0,0,0,0.35)",
  fontSize: mobile ? 18 : 22
});

const profileButton = (mobile) => ({
  width: mobile ? 42 : 60,
  height: mobile ? 42 : 60,
  borderRadius: "50%",
  background: "linear-gradient(to bottom, #666, #2f2f2f)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  cursor: "pointer"
});

const logoCloudWrap = {
  position: "absolute",
  inset: 0,
  padding: 80,
  display: "grid",
  gridTemplateColumns: "repeat(6, 1fr)",
  gap: 32,
  opacity: 0.06,
  pointerEvents: "none",
  zIndex: 0
};

const logoCloudImg = {
  width: "100%",
  objectFit: "contain",
  filter: "grayscale(100%)"
};
