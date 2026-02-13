import { useEffect, useState } from "react";

export default function ScoreDisplay({ score, flash }) {
  const [showFlash, setShowFlash] = useState(false);

  useEffect(() => {
    if (flash) {
      setShowFlash(true);
      setTimeout(() => setShowFlash(false), 800);
    }
  }, [flash]);

  return (
    <div style={{ textAlign: "center", marginBottom: "20px" }}>
      <div style={{ fontSize: "24px", fontWeight: "bold" }}>{score} points</div>

      {showFlash && (
        <div style={{
          color: "green",
          fontSize: "28px",
          fontWeight: "bold",
          animation: "pop 0.8s ease"
        }}>
          +3
        </div>
      )}
    </div>
  );
}
