import { useState } from "react";
import { playDownClick, playUpClick } from "../utils/uiSounds";
import { useAuth } from "../auth/AuthContext";
import { BADGES } from "../engine/badges";
import ProfileModal from "../components/profile/ProfileModal";
import LeaderboardModal from "./LeaderboardModal";
import useIsMobile from "../hooks/useIsMobile";

/* ========================================================= */

export default function MainMenu({ onTimedMode, onBattleHost, onBattleJoin }) {
  const { user } = useAuth();
  const isMobile = useIsMobile();

  const [leaderboardOpen, setLeaderboardOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  if (!user) return null;

  return (
    <div style={isMobile ? mobileWrap : desktopWrap}>
      {/* DESKTOP AFL LOGO CLOUD */}
      {!isMobile && <AFLLogoCloud />}

      {profileOpen && <ProfileModal onClose={() => setProfileOpen(false)} />}

      <LeaderboardModal
        open={leaderboardOpen}
        onClose={() => setLeaderboardOpen(false)}
      />

      {/* DESKTOP HUD ONLY */}
      {!isMobile && (
        <div style={hud(false, profileOpen)}>
          <LeaderboardButton
            onClick={() => setLeaderboardOpen(true)}
            mobile={false}
          />
          <ProfileButton
            user={user}
            onOpen={() => setProfileOpen(true)}
            mobile={false}
          />
        </div>
      )}

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
   COMPONENTS
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

function LeaderboardButton({ onClick, mobile }) {
  return (
    <div
      title="Leaderboards"
      onClick={onClick}
      style={hudButton(mobile)}
    >
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

function AFLLogoCloud() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: 'url("/assets/afl-logo-cloud.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 0.08,
        pointerEvents: "none",
        zIndex: 0
      }}
    />
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
