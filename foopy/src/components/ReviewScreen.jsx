import PlayerCard from "./PlayerCard";
import React from "react";

export default function ReviewScreen({ history = [], onBack, onHome }) {
  return (
    <div style={screenStyle}>
      <h1 style={titleStyle}>Answer Review</h1>

      <div style={listStyle}>
        {history.map((item, index) => {
          const players = Array.isArray(item.players) ? item.players : [];
          const answer = item.answer || null;

          const colour =
            item.result === "correct"
              ? "#2ecc71"
              : item.result === "wrong"
              ? "#e74c3c"
              : "#aaa";

          return (
            <div
              key={index}
              style={{
                ...rowStyle,
                borderColor: colour
              }}
            >
              <div style={equationRow}>
                {players.map((player, i) => (
                  <React.Fragment key={i}>
                    <div style={cardCol}>
                      <div style={cardSlot}>
                        <div style={cardScaled}>
                          <PlayerCard image={player.image} />
                        </div>
                      </div>
                      <div style={nameStyle}>{player.name}</div>
                      <div style={numStyle}>#{player.number}</div>
                    </div>

                    {i < players.length - 1 && (
                      <div style={operatorStyle}>{item.operator}</div>
                    )}
                  </React.Fragment>
                ))}

                <div style={operatorStyle}>=</div>

                {answer && (
                  <div style={cardCol}>
                    <div style={cardSlot}>
                      <div style={cardScaled}>
                        <PlayerCard image={answer.image} />
                      </div>
                    </div>
                    <div style={nameStyle}>{answer.name}</div>
                    <div style={numStyle}>#{answer.number}</div>
                  </div>
                )}
              </div>

              <div style={{ ...resultStyle, color: colour }}>
                {item.result === "correct" && "✔ Correct"}
                {item.result === "wrong" && "✘ Wrong"}
                {item.result === "skipped" && "➖ Skipped"}
              </div>
            </div>
          );
        })}
      </div>

      <div style={buttonRowStyle}>
        <button onClick={onBack} style={secondaryButton}>
          Back
        </button>

        <button onClick={onHome} style={primaryButton}>
          Home
        </button>
      </div>
    </div>
  );
}


/* ---------- Styles ---------- */

const screenStyle = {
  display: "flex",
  flexDirection: "column",
  height: "100%",
  width: "100%",
  padding: "30px",
  boxSizing: "border-box"
};

const titleStyle = {
  fontSize: "32px",
  fontWeight: 800,
  marginBottom: "20px"
};

const listStyle = {
  flex: 1,
  overflowY: "auto",
  paddingRight: "10px"
};

const rowStyle = {
  background: "#111",
  border: "3px solid",
  borderRadius: "18px",
  padding: "18px",
  marginBottom: "18px",
  color: "#fff"
};

const equationRow = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  gap: "28px",
  width: "100%"
};

const cardCol = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
};

/* Fixed layout box so flex alignment stays perfect */
const cardSlot = {
  width: 150,
  height: 180,
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start"
};

/* Scale the big PlayerCard visually only */
const cardScaled = {
  transform: "scale(0.62)",
  transformOrigin: "top center"
};

const operatorStyle = {
  fontSize: "36px",
  fontWeight: 900,
  marginTop: "42px"
};

const nameStyle = {
  marginTop: "6px",
  fontWeight: 700,
  fontSize: "16px",
  textAlign: "center"
};

const numStyle = {
  fontSize: "13px",
  opacity: 0.7,
  textAlign: "center"
};

const resultStyle = {
  marginTop: "12px",
  fontWeight: 800,
  textAlign: "center"
};

const answerStyle = {
  marginTop: "6px",
  fontSize: "14px",
  opacity: 0.85,
  textAlign: "center"
};

const buttonRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "20px"
};

const primaryButton = {
  padding: "12px 30px",
  fontSize: "16px",
  borderRadius: "10px",
  border: "none",
  background: "#111",
  color: "#fff",
  fontWeight: 700,
  cursor: "pointer"
};

const secondaryButton = {
  padding: "12px 30px",
  fontSize: "16px",
  borderRadius: "10px",
  border: "2px solid #111",
  background: "transparent",
  color: "#111",
  fontWeight: 600,
  cursor: "pointer"
};
