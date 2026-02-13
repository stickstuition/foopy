import { useEffect, useMemo, useRef, useState } from "react";
import { socket } from "../online/socket";

import EquationRow from "../components/EquationRow";
import InputBox from "../components/InputBox";
import TimerCircle from "../components/TimerCircle";
import BattleScoreboard from "../components/BattleScoreboard";

import teams from "../engine/players";

export default function BattleQuestion({
  question,
  duration,
  selector,
  me,
  scores,
  isOnline,
  profiles      // 👈 ADD THIS
}) {

  const [time, setTime] = useState(duration ?? 20);
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [feed, setFeed] = useState([]);
const [phase, setPhase] = useState("ballup");
// "ballup" | "playing"

  const [roundWinner, setRoundWinner] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [answerPlayer, setAnswerPlayer] = useState(null);

  const timerRef = useRef(null);
  const lastGuessRef = useRef({ value: null, time: 0 });
const roundEndedRef = useRef(false);

  const opponent = useMemo(
    () => (me === "host" ? "guest" : "host"),
    [me]
  );

  const iWon = roundWinner === me;
  const iLost = roundWinner && roundWinner !== me;
  const inputLocked = !!roundWinner;

  /* ---------- Keyframes ---------- */
  useEffect(() => {
    const id = "foopy-battlequestion-keyframes";
    if (document.getElementById(id)) return;

    const style = document.createElement("style");
    style.id = id;
    style.textContent = `
      @keyframes glowGreen {
        from { box-shadow: 0 0 0 rgba(46,204,113,0); }
        to { box-shadow: 0 0 32px rgba(46,204,113,0.6); }
      }
      @keyframes glowRed {
        from { box-shadow: 0 0 0 rgba(231,76,60,0); }
        to { box-shadow: 0 0 32px rgba(231,76,60,0.6); }
      }
        @keyframes fadeOutFeed {
  from { opacity: 1; transform: translateX(0); }
  to { opacity: 0; transform: translateX(8px); }
}

    `;
    document.head.appendChild(style);
  }, []);

  /* ---------- Timer ---------- */
useEffect(() => {
  if (!question) return;

  setTime(duration ?? 20);
  setInput("");
  setSuggestions([]);
  setFeed([]);
  setRoundWinner(null);
  setCorrectAnswer(null);
  setAnswerPlayer(null);
  lastGuessRef.current = { value: null, time: 0 };
  roundEndedRef.current = false;



  if (timerRef.current) clearInterval(timerRef.current);

  timerRef.current = setInterval(() => {
  setTime((t) => {
    if (t <= 1) {
  clearInterval(timerRef.current);

  if (!roundEndedRef.current) {
    roundEndedRef.current = true;
    socket.emit("time-expired");
  }

  return 0;
}

    return t - 1;
  });
}, 1000);


  return () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };
}, [question, duration]);


  /* ---------- Socket events ---------- */
  useEffect(() => {
    const onGuessFeed = ({ player, guess, correct }) => {
  const id = Date.now();

  setFeed((f) => [
    { id, player, guess, correct, fading: false },
    ...f
  ]);

  // Start fading at 2.5s
  setTimeout(() => {
    setFeed((f) =>
      f.map((item) =>
        item.id === id ? { ...item, fading: true } : item
      )
    );
  }, 2500);

  // Remove at 3s
  setTimeout(() => {
    setFeed((f) => f.filter((item) => item.id !== id));
  }, 3000);
};


    const onRoundCorrect = ({ winner, answer }) => {
  setRoundWinner(winner);
  setCorrectAnswer(answer);

  const roster = teams?.[question.team] ?? [];
  const found = roster.find(
    (p) => p.name.toLowerCase() === answer.toLowerCase()
  );

  setAnswerPlayer(found ?? null);

  if (timerRef.current) {
    clearInterval(timerRef.current);
    timerRef.current = null;
  }

  // ✅ NEW: tell server round is done (once)
  if (!roundEndedRef.current) {
    roundEndedRef.current = true;
  }
};


    socket.on("guess-feed", onGuessFeed);
    socket.on("round-correct", onRoundCorrect);

    return () => {
      socket.off("guess-feed", onGuessFeed);
      socket.off("round-correct", onRoundCorrect);
    };
  }, [question]);


  /* ---------- Autocomplete ---------- */
  useEffect(() => {
    if (!question || !input) {
      setSuggestions([]);
      return;
    }

    const roster = teams?.[question.team];
    if (!Array.isArray(roster)) return setSuggestions([]);

    const q = input.toLowerCase();
    setSuggestions(
      roster.filter((p) =>
        p?.name?.toLowerCase().includes(q)
      ).slice(0, 6)
    );
  }, [input, question]);

  /* ---------- Submit ---------- */
  function submitGuess(value) {
  if (!question || inputLocked) return;


    const guess = (value ?? input).trim();
    if (!guess) return;

    const now = Date.now();
    if (
      lastGuessRef.current.value === guess &&
      now - lastGuessRef.current.time < 300
    ) return;

    lastGuessRef.current = { value: guess, time: now };
    socket.emit("submit-guess", { guess });
    setInput("");
  }

  if (!question) return null;

  return (
    <div style={wrap}>
      {/* BOTTOM-LEFT SCOREBOARD */}
<BattleScoreboard
  me={me}
  scores={scores}
  profiles={profiles}
/>


      {/* MAIN GAME AREA */}
      <div
        style={{
          ...gameArea,
          animation: iWon
            ? "glowGreen 1.1s ease forwards"
            : iLost
            ? "glowRed 1.1s ease forwards"
            : "none"
        }}
      >
        <EquationRow
          players={question.players}
          operator={question.operator}
          showNumbers
          showNames
          teamKey={question.team}
          answerPlayer={answerPlayer}
        />

        <InputBox
  value={input}
  onChange={setInput}
  onSubmit={submitGuess}
  suggestions={suggestions}
  disabled={inputLocked}
  onSelectSuggestion={(p) => {
    const name = typeof p === "string" ? p : p?.name;
    if (name) submitGuess(name);
  }}
/>


        <TimerCircle time={time} />
      </div>

      {/* FEED */}
      <div style={feedWrap}>
        {feed.map((f) => (
          <div
            key={f.id}
            style={{
              ...feedItem,
              color: f.correct ? "#2ecc71" : "#e74c3c",
              animation: f.fading
                ? "fadeOutFeed 0.5s ease forwards"
                : "none"
            }}
          >
            <strong>{f.player === me ? "You" : "Opponent"}</strong>{" "}
            guessed {f.guess} {f.correct ? "✓" : "✕"}
          </div>
        ))}
      </div>
    </div>
  );
}


/* ---------- Styles ---------- */

const wrap = {
  width: "100%",
  height: "100%",
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column"
};

const gameArea = {
  width: "100%",
  maxWidth: 900,
  borderRadius: 18,
  padding: 24,
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
};

const feedWrap = {
  position: "absolute",
  right: 2,
  bottom: 100,
  width: 260,
  display: "flex",
  flexDirection: "column-reverse",
  gap: 6
};


const feedItem = {
  fontSize: 14,
  marginBottom: 8,
  fontWeight: 700
};
