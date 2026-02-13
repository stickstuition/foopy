import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import coinSpinning from "../assets/coinspinning.mp4";
import headsLanded from "../assets/headscoinlanded.mp4";
import tailsLanded from "../assets/tailscoinlanded.mp4";

/* ---------- styles ---------- */

const overlay = {
  position: "absolute",
  inset: 0,
  background: "#000",
  borderRadius: 22,
  zIndex: 15,
  transition: "opacity 0.3s ease"
};

const videoWrap = {
  position: "absolute",
  inset: 0
};

const videoStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: 22
};

const buttonsWrap = {
  display: "flex",
  gap: 20,
  transition: "opacity 0.25s ease"
};

const btn = {
  padding: "14px 28px",
  fontSize: 18,
  fontWeight: 800,
  borderRadius: 14,
  border: "none",
  cursor: "pointer",
  background: "#ffffff",
  color: "#111",
  boxShadow: "0 6px 0 #bbb, 0 10px 20px rgba(0,0,0,0.25)"
};

const hostText = {
  fontSize: 16,
  fontWeight: 700,
  color: "white",
  opacity: 0.85
};

/* ---------- component ---------- */

export default function CoinTossAnimation({
  me,
  guestName,
  coinResult,          // "heads" | "tails" | null
  onChoose,            // (choice) => void
  onComplete           // () => void
}) {
  const videoRef = useRef(null);

  const [phase, setPhase] = useState("spinning");
  const [buttonsHidden, setButtonsHidden] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);

  // Switch to landing animation when server result arrives
  useEffect(() => {
    if (!coinResult) return;
    setPhase("landing");
  }, [coinResult]);

  // Handle landing animation end
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      if (phase === "landing") {
        setFadingOut(true);
        setTimeout(() => {
          onComplete?.();
        }, 300);
      }
    };

    video.addEventListener("ended", handleEnded);
    return () => video.removeEventListener("ended", handleEnded);
  }, [phase, onComplete]);

  const handleChoice = (choice) => {
    if (buttonsHidden) return;
    setButtonsHidden(true);
    onChoose?.(choice);
  };

  const videoSrc =
    phase === "spinning"
      ? coinSpinning
      : coinResult === "heads"
      ? headsLanded
      : tailsLanded;

  const panelRoot = document.getElementById("game-panel-root");
  if (!panelRoot) return null;

  return createPortal(
    <div
      style={{
        ...overlay,
        opacity: fadingOut ? 0 : 1
      }}
    >
      {/* VIDEO */}
      <div style={videoWrap}>
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          muted
          loop={phase === "spinning"}
          playsInline
          style={videoStyle}
        />
      </div>

      {/* GUEST BUTTONS */}
      {me === "guest" && phase === "spinning" && (
        <div
          style={{
            ...buttonsWrap,
            position: "absolute",
            bottom: 36,
            left: "50%",
            transform: "translateX(-50%)",
            opacity: buttonsHidden ? 0 : 1,
            pointerEvents: buttonsHidden ? "none" : "auto"
          }}
        >
          <button style={btn} onClick={() => handleChoice("heads")}>
            Heads
          </button>
          <button style={btn} onClick={() => handleChoice("tails")}>
            Tails
          </button>
        </div>
      )}

      {/* HOST TEXT */}
      {me === "host" && phase === "spinning" && (
        <div
          style={{
            ...hostText,
            position: "absolute",
            bottom: 40,
            left: "50%",
            transform: "translateX(-50%)"
          }}
        >
          Waiting for {guestName ?? "guest"} to choose…
        </div>
      )}
    </div>,
    panelRoot
  );
}
