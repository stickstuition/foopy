import { useEffect } from "react";
import { playDownClick, playUpClick } from "../utils/uiSounds";

export default function GamePanelMobile({
  children,
  mode,
  soundOn,
  onHome,
  onLogout,
  onToggleSound,
  onOpenSettings,
  hideHud = false,
  variant = "default"
}) {
  const isAuth = variant === "auth";

  console.log("🔥 GamePanelMobile ACTIVE", window.innerWidth);


useEffect(() => {
  const html = document.documentElement;
  const body = document.body;

  const prevHtmlOverflow = html.style.overflow;
  const prevBodyOverflow = body.style.overflow;
  const prevBodyHeight = body.style.height;

  html.style.overflow = "hidden";
  body.style.overflow = "hidden";
  body.style.height = "100%";

  return () => {
    html.style.overflow = prevHtmlOverflow;
    body.style.overflow = prevBodyOverflow;
    body.style.height = prevBodyHeight;
  };
}, []);


  return (
    <div
      id="game-panel-mobile"
      style={{
        ...mobileWrap,
        background: isAuth ? "#0b5fa3" : "#ffffff"
      }}
    >
      {!hideHud && (
        <div style={mobileHud}>
          {mode === "menu" ? (
            <HudButton icon="🚪" title="Log out" onClick={onLogout} />
          ) : (
            <HudButton icon="🏠" title="Home" onClick={onHome} />
          )}

          <HudButton
            icon={soundOn ? "🔊" : "🔇"}
            title="Sound"
            onClick={onToggleSound}
            silent
          />

          <HudButton icon="⚙️" title="Settings" onClick={onOpenSettings} />
        </div>
      )}

      <div style={mobileContent}>{children}</div>
    </div>
  );
}

/* ---------- HUD BUTTON ---------- */

function HudButton({ icon, onClick, title, silent = false }) {
  let isPressed = false;

  return (
    <div
      title={title}
      onClick={onClick}
      onMouseDown={() => {
        isPressed = true;
        if (!silent) playDownClick(true);
      }}
      onMouseUp={() => {
        if (isPressed) {
          if (!silent) playUpClick(true);
          isPressed = false;
        }
      }}
      onMouseLeave={() => {
        if (isPressed) {
          if (!silent) playUpClick(true);
          isPressed = false;
        }
      }}
      style={hudButton}
    >
      {icon}
    </div>
  );
}

/* ---------- MOBILE STYLES ---------- */

const mobileWrap = {
  width: "100vw",
  height: "100svh",
  position: "relative",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  background: "lime" // 🔴 ADD THIS
};


const mobileHud = {
  position: "absolute",
  top: 12,
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex",
  gap: 12,
  zIndex: 30
};

const mobileContent = {
  flex: 1,
  paddingTop: 64, // space for HUD + notch
  overflow: "hidden"
};

const hudButton = {
  width: 42,
  height: 42,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  userSelect: "none",
  background: "linear-gradient(to bottom, #555, #2f2f2f)",
  color: "#eee",
  fontSize: 18,
  boxShadow: `
    0 2px 0 rgba(0,0,0,0.5),
    0 4px 10px rgba(0,0,0,0.35)
  `
};
