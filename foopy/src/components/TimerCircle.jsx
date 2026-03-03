import { useEffect, useState } from "react";
import useIsMobile from "../hooks/useIsMobile";

export default function TimerCircle({ time = 0 }) {
  const isMobile = useIsMobile(768);
  const [displayTime, setDisplayTime] = useState(time);

  useEffect(() => setDisplayTime(time), [time]);

  return (
    <div
      style={{
        position: isMobile ? "static" : "absolute",
right: isMobile ? "auto" : 24,
top: isMobile ? "auto" : "auto",
bottom: isMobile ? "auto" : 24,
marginLeft: isMobile ? 8 : 0,
flexShrink: 0,
        width: isMobile ? 52 : 64,
        height: isMobile ? 52 : 64,
        borderRadius: "50%",
        background: "#111",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: isMobile ? 18 : 22,
        fontWeight: 800,
        boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
        zIndex: 20
      }}
    >
      {displayTime}
    </div>
  );
}