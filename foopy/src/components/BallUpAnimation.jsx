import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import ballUpVideo from "../assets/ballup.mp4";

/* ---------- styles ---------- */

const overlay = {
  position: "absolute",
  inset: 0,
  background: "#000",
  borderRadius: 22,
  zIndex: 15,
  transition: "opacity 0.35s ease"
};

const videoStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: 22
};

/* ---------- component ---------- */

export default function BallUpAnimation({ onComplete }) {
  const videoRef = useRef(null);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      // start fade
      setFadingOut(true);

      // allow fade to complete before switching stage
      setTimeout(() => {
        onComplete?.();
      }, 350);
    };

    video.addEventListener("ended", handleEnded);
    video.play().catch(() => {});

    return () => {
      video.removeEventListener("ended", handleEnded);
    };
  }, [onComplete]);

  const panelRoot = document.getElementById("game-panel-root");
  if (!panelRoot) return null;

  return createPortal(
    <div
      style={{
        ...overlay,
        opacity: fadingOut ? 0 : 1
      }}
    >
      <video
        ref={videoRef}
        src={ballUpVideo}
        muted
        playsInline
        autoPlay
        style={videoStyle}
      />
    </div>,
    panelRoot
  );
}
