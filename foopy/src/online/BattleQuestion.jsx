import { useEffect, useMemo, useRef, useState } from "react";
import { socket } from "../online/socket";
import useIsMobile from "../hooks/useIsMobile";
import useKeyboardOffset from "../hooks/useKeyboardOffset";
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
  const isMobile = useIsMobile(768);
  const kb = useKeyboardOffset(isMobile);
  const keyboardOpen = kb > 0;

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
    <div
      style={wrap(isMobile)}
    >
      {/* TOP BAR */}
      {isMobile ? (
        <div style={topBarMobile}>
          <BattleScoreboard
            me={me}
            scores={scores}
            profiles={profiles}
            inline
            compact
          />
          <TimerCircle time={time} />
        </div>
      ) : (
        <BattleScoreboard me={me} scores={scores} profiles={profiles} />
      )}

      {/* MAIN GAME AREA */}
      {isMobile ? (
        <>
          <div
            style={{
              ...mobileStage,
              bottom: keyboardOpen ? kb + 92 : 112,
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
              showNumbers={!keyboardOpen}
              showNames={!keyboardOpen}
              teamKey={question.team}
              answerPlayer={answerPlayer}
              compactMobile={keyboardOpen}
            />
          </div>

          <div
            style={{
              ...mobileDock,
              transform: kb ? `translateY(-${kb}px)` : "translateY(0)"
            }}
          >
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
          </div>
        </>
      ) : (
        <div
          style={{
            ...gameArea(false),
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

          <div style={{ marginTop: "auto", width: "100%" }}>
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
          </div>

          <TimerCircle time={time} />
        </div>
      )}

      {/* FEED (DESKTOP ONLY) */}
{!isMobile && (
  <div style={feedWrap(isMobile)}>
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
)}
    </div>
  );
}


/* ---------- Styles ---------- */

const wrap = (mobile) => ({
  width: "100%",
  height: "100%",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: mobile ? "flex-start" : "center",
  overflow: "hidden",
  paddingTop: 0,
  boxSizing: "border-box"
});

const gameArea = (mobile) => ({
  width: "100%",
  maxWidth: 900,
  borderRadius: 18,
  padding: mobile ? 14 : 24,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: mobile ? 10 : 0,
  justifyContent: mobile ? "flex-start" : undefined,
  paddingBottom: mobile
    ? "max(16px, env(safe-area-inset-bottom))"
    : undefined
});

const feedWrap = (mobile) => ({
  position: "absolute",
  right: mobile ? 12 : 2,
  top: mobile ? 96 : "auto",
  bottom: mobile ? "auto" : 100,
  width: mobile ? "calc(100% - 24px)" : 260,
  maxWidth: mobile ? 420 : undefined,
  display: "flex",
  flexDirection: "column-reverse",
  gap: 6,
  pointerEvents: "none"
});


const feedItem = {
  fontSize: 14,
  marginBottom: 8,
  fontWeight: 700
};

const topBarMobile = {
  position: "absolute",
  top: 64,
  left: 10,
  right: 10,
  zIndex: 30,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 12,
  boxSizing: "border-box"
};

const mobileStage = {
  position: "absolute",
  top: 104,
  left: 0,
  right: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
  paddingTop: 0
};

const mobileDock = {
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  width: "100%",
  padding: "8px 0 max(10px, env(safe-area-inset-bottom))",
  background: "rgba(255,255,255,0.96)",
  borderTop: "1px solid rgba(0,0,0,0.08)",
  boxShadow: "0 -12px 30px rgba(0,0,0,0.10)",
  zIndex: 60
};

const topScoreBar = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  minWidth: 0,
  flex: 1,
};

const topPill = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 10,
  background: "rgba(255,255,255,0.92)",
  borderRadius: 999,
  padding: "8px 10px",
  boxShadow: "0 8px 18px rgba(0,0,0,0.12)",
  minWidth: 0,
  flex: 1,
};

const topName = {
  fontWeight: 900,
  fontSize: 12,
  color: "#111",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  minWidth: 0,
};

const topScore = {
  fontWeight: 900,
  fontSize: 14,
  background: "#111",
  color: "#fff",
  borderRadius: 999,
  padding: "4px 10px",
  flexShrink: 0,
};

const topVs = {
  fontWeight: 900,
  fontSize: 12,
  opacity: 0.6,
  flexShrink: 0,
};