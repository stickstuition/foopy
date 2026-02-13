import { useEffect, useState } from "react";

export default function TimerCircle({ time = 0 }) {
  const [displayTime, setDisplayTime] = useState(time);

  useEffect(() => {
    setDisplayTime(time);
  }, [time]);

  return (
    <div
      style={{
        position: "absolute",
        right: 24,
        bottom: 24,
        width: 64,
        height: 64,
        borderRadius: "50%",
        background: "#111",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 22,
        fontWeight: 800,
        boxShadow: "0 6px 18px rgba(0,0,0,0.25)"
      }}
    >
      {displayTime}
    </div>
  );
}
