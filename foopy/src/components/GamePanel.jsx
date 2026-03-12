import { useEffect, useState } from "react";
import { playDownClick, playUpClick } from "../utils/uiSounds";

export default function GamePanel({
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

  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth <= 480
  );

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 480);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    const html = document.documentElement;
    const body = document.body;
    const root = document.getElementById("root");
    const vv = window.visualViewport;

    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevRootOverflow = root?.style.overflow ?? "";
    const prevHtmlHeight = html.style.height;
    const prevBodyHeight = body.style.height;
    const prevRootHeight = root?.style.height ?? "";

    const setViewportVars = () => {
      const height = vv?.height ?? window.innerHeight;
      html.style.setProperty("--app-vh", `${height * 0.01}px`);
    };

    const applyLock = () => {
      if (mode !== "timed") return;
      html.style.height = "100%";
      body.style.height = "100%";
      if (root) root.style.height = "100%";
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
      if (root) root.style.overflow = "hidden";
    };

    setViewportVars();
    applyLock();

    vv?.addEventListener("resize", setViewportVars);
    vv?.addEventListener("scroll", setViewportVars);
    window.addEventListener("resize", setViewportVars);
    window.addEventListener("orientationchange", setViewportVars);

    return () => {
      vv?.removeEventListener("resize", setViewportVars);
      vv?.removeEventListener("scroll", setViewportVars);
      window.removeEventListener("resize", setViewportVars);
      window.removeEventListener("orientationchange", setViewportVars);

      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      if (root) root.style.overflow = prevRootOverflow;

      html.style.height = prevHtmlHeight;
      body.style.height = prevBodyHeight;
      if (root) root.style.height = prevRootHeight;
    };
  }, [isMobile, mode]);

  return (
    <div
      id="game-panel-root"
      style={{
        ...panelWrap,
        ...(isMobile ? mobilePanelOverride : {}),
        background: isAuth ? "#0b5fa3" : "#ffffff",
      }}
    >
      {/* HUD */}
      {!hideHud && (
        <div style={hudLayer}>
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

      <div style={contentLayer(isMobile, mode)}>{children}</div>
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

/* ---------- Styles ---------- */

const panelWrap = {
  width: 980,
  maxWidth: "92vw",
  height: 560,
  maxHeight: "86vh",
  background: "#ffffff",
  borderRadius: 22,
  boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
  position: "relative",
  overflow: "hidden"
};

const mobilePanelOverride = {
  position: "fixed",
  inset: 0,
  width: "100vw",
  height: "calc(var(--app-vh, 1vh) * 100)",
  maxWidth: "100vw",
  maxHeight: "calc(var(--app-vh, 1vh) * 100)",
  borderRadius: 0,
  boxShadow: "none",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden"
};

const hudLayer = {
  position: "absolute",
  top: 16,
  left: 16,
  display: "flex",
  gap: 12,
  zIndex: 20
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

const contentLayer = (isMobile, mode) => ({
  width: "100%",
  height: "100%",
  position: "relative",
  zIndex: 1,

  // ✅ Mobile: outer panel must NOT be the scroller (iOS keyboard bug source)
  overflow: "hidden"
});
