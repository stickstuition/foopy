import { useState } from "react";

export default function GameOverScreen({ score, onSubmit, onPlayAgain, onReview }) {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function submit() {
    if (!name.trim()) return;
    onSubmit(name);
    setSubmitted(true);
  }

  return (
    <div style={screenStyle}>
      <h1 style={titleStyle}>Game Over</h1>
      <h2 style={scoreStyle}>{score} points</h2>

      {!submitted ? (
        <>
          <input
            placeholder="Enter nickname"
            value={name}
            onChange={e => setName(e.target.value)}
            style={inputStyle}
          />

          <button onClick={submit} style={primaryButton}>
            Submit to Leaderboard
          </button>

          <button onClick={onReview} style={secondaryButton}>
            Review Run
          </button>
        </>
      ) : (
        <>
          <h3 style={successStyle}>Added to leaderboard</h3>

          <button onClick={onReview} style={secondaryButton}>
            Review Run
          </button>

          <button onClick={onPlayAgain} style={primaryButton}>
            Play Again
          </button>
        </>
      )}
    </div>
  );
}


const screenStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  width: "100%",
  gap: "20px",
  color: "#111"
};

const titleStyle = {
  fontSize: "42px",
  fontWeight: 800,
  marginBottom: "6px"
};

const scoreStyle = {
  fontSize: "28px",
  fontWeight: 700,
  marginBottom: "20px"
};

const successStyle = {
  fontSize: "20px",
  fontWeight: 700,
  color: "#2ecc71"
};

const inputStyle = {
  padding: "14px",
  fontSize: "18px",
  borderRadius: "10px",
  border: "1px solid #ccc",
  width: "320px",
  outline: "none"
};

const primaryButton = {
  padding: "14px 36px",
  fontSize: "18px",
  borderRadius: "12px",
  border: "none",
  background: "#111",
  color: "white",
  fontWeight: 700,
  cursor: "pointer"
};

const secondaryButton = {
  padding: "12px 32px",
  fontSize: "16px",
  borderRadius: "12px",
  border: "2px solid #111",
  background: "transparent",
  color: "#111",
  fontWeight: 600,
  cursor: "pointer"
};