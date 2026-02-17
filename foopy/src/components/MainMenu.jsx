import { useState } from "react";
import { playDownClick, playUpClick } from "../utils/uiSounds";
import { useAuth } from "../auth/AuthContext";
import { BADGES } from "../engine/badges";
import ProfileModal from "../components/profile/ProfileModal";
import LeaderboardModal from "./LeaderboardModal";

/* =========================================================
   AFL LOGO CLOUD (background)
   Files live in /public/logos
   ========================================================= */

const clubLogos = [
  "/logos/AdelaideCrows.webp",
  "/logos/BrisbaneLions.webp",
  "/logos/Carlton.webp",
  "/logos/Collingwood.webp",
  "/logos/Essendon.webp",
  "/logos/Fremantle.webp",
  "/logos/GCSuns.webp",
  "/logos/Geelong.webp",
  "/logos/GWS.webp",
  "/logos/Hawthorn.webp",
  "/logos/Melbourne.webp",
  "/logos/North_Melbourne.webp",
  "/logos/PortAdelaide.webp",
  "/logos/Richmond.webp",
  "/logos/StKildaFC.webp",
  "/logos/SydneySwans.webp",
  "/logos/West_Coast.webp",
  "/logos/Western_Bulldogs.webp"
];

/* ========================================================= */

export default function MainMenu({ onTimedMode, onBattleHost, onBattleJoin }) {
  const { user } = useAuth();
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  if (!user) return null;

const isMobile = window.innerWidth <= 768;

  return (
    <div style={menuWrap}>
      {profileOpen && <ProfileModal onClose={() => setProfileOpen(false)} />}

      <LeaderboardModal
        open={leaderboardOpen}
        onClose={() => setLeaderboardOpen(false)}
      />

      <div style={topRightProfile(profileOpen)}>
        <LeaderboardButton onClick={() => setLeaderboardOpen(true)} />
        <ProfileButton user={user} onOpen={() => setProfileOpen(true)} />
      </div>

      <div style={logoCloud}>
        {clubLogos.map((logo, i) => (
          <img key={i} src={logo} alt="" style={floatingLogo} />
        ))}
      </div>

      <div style={menuContent}>
        <img src="/assets/foopy-logo.png" alt="Foopy" style={logoStyle} />

        <div style={grid(isMobile)}>
          {/* Timed Mode spans the full top row */}
          <MenuButton label="Timed Mode" onClick={onTimedMode} primary full />

          {/* Host + Join sit on the second row */}
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

function MenuButton({ label, onClick, comingSoon, red, primary, full }) {
  const disabled = comingSoon;
  let pressed = false;

  return (
    <div
      onClick={disabled ? undefined : onClick}
      onMouseDown={() => {
        if (!disabled) {
          pressed = true;
          playDownClick(true);
        }
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
      title={comingSoon ? "Coming Soon!" : ""}
      style={{
        ...buttonBase,
        ...(primary && primaryStyle),
        ...(red && redStyle),
        ...(comingSoon && comingSoonStyle),

        // ✅ THIS is the missing bit: makes Timed Mode a long bar across both columns
        ...(full ? { gridColumn: "1 / -1" } : {})
      }}
    >
      {label}
    </div>
  );
}

function LeaderboardButton({ onClick }) {
  let pressed = false;

  return (
    <div
      title="Leaderboards"
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
      style={leaderboardButton}
    >
      🏆
    </div>
  );
}

/* =========================================================
   PROFILE BADGE
   ========================================================= */

function ProfileButton({ user, onOpen }) {
  const [hover, setHover] = useState(false);

  if (!user) return null;

  const badge = BADGES[user.badgeEquipped] ?? BADGES.stk;
  const isFullArt = badge.fullArt === true;

  return (
    <div
      style={profileWrapper}
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onOpen();
        }
      }}
    >
      {/* Hover card */}
      <div
        style={{
          ...profileHoverCard,
          opacity: hover ? 1 : 0
        }}
      >
        <div style={profileName}>{user.username}</div>
        <div style={profileMeta}>🪙 {user.coins ?? 0} coins</div>
      </div>

      {/* Badge */}
      <div style={profileButton}>
        <img
          src={badge.icon}
          alt={badge.name}
          style={{
            width: isFullArt ? "100%" : "70%",
            height: isFullArt ? "100%" : "70%",
            objectFit: isFullArt ? "cover" : "contain"
          }}
        />
      </div>
    </div>
  );
}


/* =========================================================
   STYLES (UNCHANGED DESIGN)
   ========================================================= */

const menuWrap = {
  width: "100%",
  height: "100%",
  padding: 40,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  boxSizing: "border-box"
};

const menuContent = {
  position: "relative",
  zIndex: 2,
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
};

const logoStyle = {
  width: "min(420px, 86vw)",
  marginBottom: 20
};


const grid = (isMobile) => ({
  display: "grid",
  gridTemplateColumns: isMobile ? "minmax(0, 1fr)" : "repeat(2, 300px)",
  gap: isMobile ? 18 : 26,
  justifyContent: "center",
  width: isMobile ? "100%" : "auto",
  maxWidth: isMobile ? 520 : "none",
  paddingLeft: isMobile ? 12 : 0,
  paddingRight: isMobile ? 12 : 0
});

/* ---------- Logo cloud ---------- */

const logoCloud = {
  position: "absolute",
  top: "6%",
  bottom: "6%",
  left: "3%",
  right: "3%",
  display: "grid",
  gridTemplateColumns: "repeat(6, 1fr)",
  gridTemplateRows: "repeat(3, 1fr)",
  placeItems: "center",
  opacity: 0.22,
  pointerEvents: "none"
};

const floatingLogo = {
  width: 96,
  filter: "grayscale(100%) opacity(0.75)"
};

/* ---------- Buttons ---------- */

const buttonBase = {
  height: 90,
  borderRadius: 16,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 24,
  fontWeight: 700,
  color: "white",
  cursor: "pointer",
  userSelect: "none",
  background: "linear-gradient(to bottom, #5c8fc6, #3b5f87)",
  boxShadow: "0 7px 0 rgba(0,0,0,0.25), 0 14px 28px rgba(0,0,0,0.25)"
};

const primaryStyle = {
  background: "linear-gradient(to bottom, #4dabf7, #1c7ed6)"
};

const redStyle = {
  background: "linear-gradient(to bottom, #ff6b6b, #c92a2a)"
};

const comingSoonStyle = {
  background: "linear-gradient(to bottom, #4dabf7, #1c7ed6)"
};

/* ---------- Profile ---------- */

const topRightProfile = (profileOpen) => ({
  position: "absolute",
  top: 16,
  right: 20,
  zIndex: profileOpen ? 0 : 3,
  pointerEvents: profileOpen ? "none" : "auto",
  display: "flex",
  alignItems: "center",
  gap: 14,
  transition: "opacity 0.15s ease",
  opacity: profileOpen ? 0 : 1
});

const profileWrapper = {
  position: "relative",
  cursor: "pointer",
  outline: "none"
};

const profileButton = {
  width: 100,
  height: 100,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(to bottom, #666, #2f2f2f)",
  boxShadow: "0 4px 0 rgba(0,0,0,0.45), 0 10px 24px rgba(0,0,0,0.4)",
  overflow: "hidden" // add this
};


const profileBadge = {
  width: "70%",
  height: "70%",
  objectFit: "contain"
};

const profileHoverCard = {
  position: "absolute",
  right: 112,
  top: "50%",
  transform: "translateY(-50%)",
  background: "linear-gradient(to bottom, #2b2b2b, #1c1c1c)",
  padding: "10px 14px",
  borderRadius: 12,
  boxShadow: "0 6px 18px rgba(0,0,0,0.4)",
  whiteSpace: "nowrap",
  opacity: 0,
  pointerEvents: "none",
  transition: "opacity 0.15s ease",
  color: "#ddd"
};

const profileName = {
  fontStyle: "italic",
  fontWeight: 600,
  marginBottom: 2
};

const profileMeta = {
  fontSize: 12,
  opacity: 0.7
};

const leaderboardButton = {
  width: 56,
  height: 56,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  background: "linear-gradient(to bottom, #555, #2f2f2f)",
  color: "#eee",
  fontSize: 24,
  boxShadow: "0 3px 0 rgba(0,0,0,0.45), 0 8px 18px rgba(0,0,0,0.4)"
};
