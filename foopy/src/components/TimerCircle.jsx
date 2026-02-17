import { useEffect, useState } from "react";

const isMobile = window.innerWidth <= 768;


export default function TimerCircle({ time = 0 }) {
  const [displayTime, setDisplayTime] = useState(time);

  useEffect(() => {
    setDisplayTime(time);
  }, [time]);

  return (
<div
  style={{
    position: "absolute",
    right: isMobile ? 12 : 24,
    top: isMobile ? 14 : "auto",
    bottom: isMobile ? "auto" : 24,

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
