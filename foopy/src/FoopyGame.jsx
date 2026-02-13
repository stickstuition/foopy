import { useEffect, useState, useRef } from "react";
import GamePanel from "./components/GamePanel";
import { API_URL } from "./config/api";

import ModsScreen from "./components/ModsScreen";
import EquationRow from "./components/EquationRow";
import InputBox from "./components/InputBox";
import TimerCircle from "./components/TimerCircle";
import BattleScoreboard from "./components/BattleScoreboard";
import GameOverReviewScreen from "./components/GameOverReviewScreen";
import BallUpAnimation from "./components/BallUpAnimation";
import playersHard from "./engine/players";
import playersMedium from "./engine/playersmedium";
import playersEasy from "./engine/playerseasy";

import { generateQuestion, validateAnswer } from "./engine/engine";

import { useAuth } from "./auth/AuthContext";

export default function FoopyGame({ onExit, onHome, setLeaveGuard }) {
  const { user, updateCoins, setUser } = useAuth();


  // Prevent double-awarding coins
const committedRunRef = useRef(false);
  const [gameState, setGameState] = useState("mods");
const coinsBeforeRef = useRef(null);
  const [question, setQuestion] = useState(null);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(30);
  const [suggestions, setSuggestions] = useState([]);
  const [status, setStatus] = useState(null);
  const [scoreFlash, setScoreFlash] = useState(false);
  const [timeFlash, setTimeFlash] = useState(false);
  const [answerTeam, setAnswerTeam] = useState(null);
  const [skipLocked, setSkipLocked] = useState(false);
  const [lastPoints, setLastPoints] = useState(null);
  const [committing, setCommitting] = useState(false);

  // mods → ballup → playing → gameover

  const [mods, setMods] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
  setLeaveGuard(gameState === "playing");
}, [gameState, setLeaveGuard]);


  function randomTeam() {
    if (!mods?.selectedTeams?.length) return null;
    return mods.selectedTeams[Math.floor(Math.random() * mods.selectedTeams.length)];
  }

  function getPlayerPool() {
  if (!mods?.playerDifficulty) return playersMedium;

  switch (mods.playerDifficulty) {
    case "Easy":
      return playersEasy;
    case "Medium":
      return playersMedium;
    case "Hard":
    default:
      return playersHard;
  }
}

  /* ---------- TIMER ---------- */

useEffect(() => {
  if (gameState !== "playing") return;

  const timer = setInterval(() => {
    setTime(t => {
      if (t <= 1) {
        clearInterval(timer);

        // 👇 capture coins BEFORE commit
        if (coinsBeforeRef.current === null) {
          coinsBeforeRef.current = user?.coins ?? 0;
        }

        setGameState("gameover");
        return 0;
      }

      return t - 1;
    });
  }, 1000);

  return () => clearInterval(timer);
}, [gameState, user]);

/* ---------- QUESTION GENERATION ---------- */

useEffect(() => {
  if (gameState !== "playing") return;
  if (!mods?.selectedTeams?.length) return;

  const team = randomTeam();
  if (!team) return;

  const pool = getPlayerPool();
  const teamPlayers = pool[team];
  if (!Array.isArray(teamPlayers)) return;

  const q = generateQuestion(teamPlayers, mods.questionDifficulty);

  setQuestion({ ...q, team });
  setAnswerTeam(team);
}, [gameState, mods]);


  /* ---------- AUTOCOMPLETE ---------- */

  useEffect(() => {
    if (!question) return;

    const q = input.trim().toLowerCase();
    if (!q) {
      setSuggestions([]);
      return;
    }

    const pool = getPlayerPool();
const teamPlayers = pool[question.team];

    if (!Array.isArray(teamPlayers)) return;

    setSuggestions(
      teamPlayers
        .filter(p => p.name.toLowerCase().includes(q))
        .slice(0, 6)
    );
  }, [input, question]);

  /* ---------- GAME LOGIC ---------- */

function submitGuess(rawValue) {
  if (!question || gameState !== "playing" || skipLocked) return;

  setSkipLocked(true); // 🔒 hard lock immediately

  const guess = rawValue?.trim();
  const correct = validateAnswer(guess, question.answerPlayer.name);

  setHistory(h => [
    ...h,
    {
  players: question.players,
  answer: question.answerPlayer,
  operator: question.operator,
  result: correct ? "correct" : "wrong",
  userGuess: guess
}

  ]);

  if (correct) {
  const mult = mods?.multiplier ?? 1;
  const gained = Math.round(10 * mult);

  setScore(s => s + gained);
  setLastPoints(gained);

  setTime(t => t + 4);
  setStatus("correct");
  setScoreFlash(true);
  setTimeFlash(true);

  setTimeout(() => {
    setLastPoints(null);
  }, 700);


    setTimeout(() => {
      setScoreFlash(false);
      setTimeFlash(false);
    }, 800);
  } else {
    setStatus("wrong");
  }

  setTimeout(() => {
    setStatus(null);
    setInput("");
    setSuggestions([]);
    setSkipLocked(false);

    const team = randomTeam();
    if (!team) return;

    const pool = getPlayerPool();
const teamPlayers = pool[team];
if (!Array.isArray(teamPlayers)) return;

const q = generateQuestion(teamPlayers, mods.questionDifficulty);

    setQuestion({ ...q, team });
    setAnswerTeam(team);
  }, 700);
}


  function skipQuestion() {
    if (!question || skipLocked) return;

    setSkipLocked(true);

    setHistory(h => [
      ...h,
      {
        players: question.players,
        answer: question.answerPlayer,
        operator: question.operator,
        result: "skipped",
        userGuess: null
      }
    ]);

    setStatus("wrong");

    setTimeout(() => {
      setStatus(null);
      setInput("");
      setSuggestions([]);

      const team = randomTeam();
      if (!team) return;

      const pool = getPlayerPool();
const teamPlayers = pool[team];

      if (!Array.isArray(teamPlayers)) return;

      const q = generateQuestion(teamPlayers, mods.questionDifficulty);
      setQuestion({ ...q, team });
      setAnswerTeam(team);
      setSkipLocked(false);
    }, 500);
  }

useEffect(() => {
  if (gameState !== "gameover") return;
  if (!user) return;
  if (committedRunRef.current) return;

  committedRunRef.current = true;
  setCommitting(true);

  const correct = history.filter(h => h.result === "correct").length;
  const attempted = history.filter(h => h.result !== "skipped").length;

  let longestStreak = 0;
  let currentStreak = 0;

  for (const h of history) {
    if (h.result === "correct") {
      currentStreak += 1;
      longestStreak = Math.max(longestStreak, currentStreak);
    } else {
      currentStreak = 0;
    }
  }

  const coinsEarned = Math.max(0, Math.floor(score));

fetch(`${API_URL}/stats/commit-game`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  credentials: "include",
  body: JSON.stringify({
    mode: "timed",
    score,
    correct,
    attempted,
    longestStreak,
    duration: 30,
    coinsEarned,
    didWin: null
  })
})

    .then(async r => {
      // If your backend returns JSON with coins, use it.
      // If not, we refetch /auth/me to get the DB truth.
      let payload = null;
      try {
        payload = await r.json();
      } catch {
        payload = null;
      }

      if (payload && Number.isFinite(payload.coins)) {
  updateCoins(payload.coins);
} else {
  const meRes = await fetch(`${API_URL}/auth/me`, {
    credentials: "include"
  });
  if (meRes.ok) {
    const meData = await meRes.json();
    updateCoins(meData.user?.coins);
  }
}


      // Keep your other user fields in sync, without touching coins.
      setUser(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          games_played: (prev.games_played ?? 0) + 1
        };
      });

      setCommitting(false);
    })
    .catch(err => {
      console.error("Commit failed", err);
      setCommitting(false);
    });
}, [gameState, user, history, score, updateCoins, setUser]);



  /* ---------- GAME OVER EFFECT (COINS + STATS) ---------- */
if (gameState === "gameover") {
  return (
    <GamePanel hideHud>
      <GameOverReviewScreen
        score={score}
        history={history}
        coinsBefore={coinsBeforeRef.current ?? 0}
        committing={committing}
        onPlayAgain={() => {
          committedRunRef.current = false;
          coinsBeforeRef.current = null;
          setQuestion(null);
          setScore(0);
          setTime(30);
          setHistory([]);
          setInput("");
          setSuggestions([]);
          setGameState("countdown");
        }}
        onChangeOptions={() => {
          committedRunRef.current = false;
          coinsBeforeRef.current = null;
          setQuestion(null);
          setGameState("mods");
        }}
      />
    </GamePanel>
  );
}


  /* ---------- SCREEN ROUTER ---------- */

  if (gameState === "mods") {
    return (
      <ModsScreen
        onBack={onExit}
        onStart={(config) => {
  committedRunRef.current = false;
  coinsBeforeRef.current = null;
  setMods(config);
          setQuestion(null);
          setScore(0);
          setTime(30);
          setHistory([]);
          setInput("");
          setSuggestions([]);
          setGameState("countdown");
        }}
      />
    );
  }

if (gameState === "countdown") {
  return <BallUpAnimation onComplete={() => setGameState("playing")} />;
}



  if (!question) return null;

  /* ---------- MAIN GAME ---------- */

    // ---------- LOCAL PROFILES (Timed Mode) ----------

// ---- Timed Mode profile (matches OnlineBattle shape) ----
const profiles = {
  host: user
    ? {
        userId: user.id,
        username: user.username,
        badgeEquipped: user.badgeEquipped ?? null
      }
    : null,
  guest: null
};



  return (
    <>
<BattleScoreboard
  me="host"
  scores={{ host: score, guest: 0 }}
  profiles={profiles}
  singlePlayer
  delta={lastPoints}
/>



      <EquationRow
        players={question.players}
        operator={question.operator}
        status={status}
        showNumbers={mods?.showNumbers ?? true}
        showNames={mods?.showNames ?? true}
        teamKey={answerTeam}
      />
      
<InputBox
  value={input}
  onChange={setInput}
  onSubmit={() => {
    if (skipLocked) return;

    const guess =
      suggestions.length > 0
        ? suggestions[0].name
        : input;

    submitGuess(guess);
  }}
  suggestions={suggestions}
  onSelectSuggestion={(name) => {
    if (skipLocked) return;
    setInput(name);
    submitGuess(name);
  }}
  onSkip={skipQuestion}
  resultFlash={status}   // 👈 ADD THIS
/>


      <TimerCircle time={time} flash={timeFlash} />
    </>
  );
}
