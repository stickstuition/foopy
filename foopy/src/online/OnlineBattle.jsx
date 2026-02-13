import { socket } from "./socket";
import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import TeamSelect from "./TeamSelect";
import BattleQuestion from "./BattleQuestion";
import { BADGES } from "../engine/badges";
import FoopyError from "../components/FoopyError";
import BallUpAnimation from "../components/BallUpAnimation";
import CoinTossAnimation from "../components/CoinTossAnimation";
import { useAuth } from "../auth/AuthContext";
import { API_URL } from "../config/api";




// IMPORTANT: adjust this import if your teams live elsewhere
// This should be the same object you use in ModsScreen: Object.keys(teams)
import teams from "../engine/playersmedium";

const WIN_SCORE = 5;

const TEAM_PICK_SECONDS = 10;

/* ---------- STYLES ---------- */

const wrap = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
};

const actions = {
  display: "flex",
  gap: 14,
  marginTop: 24,
  flexWrap: "wrap",
  justifyContent: "center",
};

const codeStyle = {
  fontSize: 42,
  fontWeight: 800,
  letterSpacing: 8,
  margin: "18px 0",
};

const codeInput = {
  fontSize: 20,
  padding: "10px 14px",
  textAlign: "center",
  borderRadius: 8,
  border: "1px solid #aaa",
  marginTop: 12,
};

const coinStyle = {
  width: 120,
  height: 120,
  borderRadius: "50%",
  background: "#222",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 800,
  fontSize: 18,
  margin: "20px 0",
  transition: "transform 1.2s ease",
};

const resultText = {
  marginTop: 16,
  fontWeight: 700,
};

const muted = {
  opacity: 0.7,
};

const btn = {
  height: 52,
  minWidth: 160,
  borderRadius: 14,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 18,
  fontWeight: 800,
  cursor: "pointer",
  userSelect: "none",
  background: "#5a5a5a",
  color: "white",
  boxShadow: "0 6px 0 #3e3e3e, 0 10px 20px rgba(0,0,0,0.25)",
  transition: "transform 0.08s ease, box-shadow 0.08s ease",
};

const btnPrimary = {
  background: "#1e88e5",
  boxShadow: "0 6px 0 #1565c0, 0 10px 20px rgba(0,0,0,0.25)",
};

const btnDisabled = {
  background: "#9a9a9a",
  boxShadow: "0 6px 0 #7a7a7a",
  opacity: 0.6,
  cursor: "not-allowed",
};


function FoopyButton({ label, onClick, primary, disabled }) {
  return (
    <div
      onClick={disabled ? undefined : onClick}
      style={{
        ...btn,
        ...(primary ? btnPrimary : null),
        ...(disabled ? btnDisabled : null),
      }}
    >
      {label}
    </div>
  );
}

export default function OnlineBattle({
  startMode,
  onExit,
  requestConfirm,
  setLeaveGuard
}) {
  const [stage, setStage] = useState(
  startMode === "host" ? "host" : "join"
);
const [error, setError] = useState(null);
const [teamPickTimeLeft, setTeamPickTimeLeft] = useState(null);

  const [roomCode, setRoomCode] = useState("");
  const [playerCount, setPlayerCount] = useState(1);
// 👤 Lobby profiles
const [profiles, setProfiles] = useState({ host: null, guest: null });

// 💰 Wager state
const [wager, setWager] = useState({ host: null, guest: null, agreed: null });

  const [scores, setScores] = useState({ host: 0, guest: 0 });

  const [guestChoice, setGuestChoice] = useState(null);
  const [coinResult, setCoinResult] = useState(null);
  const [selector, setSelector] = useState(null);
  const [flipping, setFlipping] = useState(false);
const ballUpPlayedRef = useRef(false);

  const [teamsPicked, setTeamsPicked] = useState({ host: null, guest: null });
  const [currentTeam, setCurrentTeam] = useState(null);

  const [activeQuestion, setActiveQuestion] = useState(null);
const [roundDuration, setRoundDuration] = useState(null);


  // NEW: server-synced 3 options for TeamSelect
  const [teamOptions, setTeamOptions] = useState(null);

  const me = useMemo(() => (startMode === "host" ? "host" : "guest"), [startMode]);
  const { updateCoins } = useAuth();
  const isHost = me === "host";

  /* ---------- HELPERS ---------- */

  const generateRoomCode = useCallback(() => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "";
    for (let i = 0; i < 5; i++) code += chars[Math.floor(Math.random() * chars.length)];
    return code;
  }, []);

  const resetLocalMirrors = useCallback(() => {
    setScores({ host: 0, guest: 0 });
    setGuestChoice(null);
    setCoinResult(null);
    setSelector(null);
    setFlipping(false);
    setTeamsPicked({ host: null, guest: null });
    setCurrentTeam(null);
    setTeamOptions(null);
  }, []);

  const getEligibleTeamCodes = useCallback(() => {
    const allCodes = Object.keys(teams || {});
    // keep teams with 3+ players
    return allCodes.filter((code) => {
      const roster = teams?.[code];
      return Array.isArray(roster) && roster.length >= 3;
    });
  }, []);

  const pickRandom3Teams = useCallback(() => {
    const eligible = getEligibleTeamCodes();
    if (eligible.length < 3) return eligible.slice(0, 3);

    const copy = [...eligible];
    const chosen = [];
    while (chosen.length < 3 && copy.length) {
      const idx = Math.floor(Math.random() * copy.length);
      chosen.push(copy[idx]);
      copy.splice(idx, 1);
    }
    return chosen;
  }, [getEligibleTeamCodes]);

  const myTeam = useMemo(() => {
    return me === "host" ? teamsPicked.host : teamsPicked.guest;
  }, [teamsPicked, me]);

  const renderStage =
  stage === "host"
    ? "lobby"
    : stage;
  /* ---------- SOCKET INIT + LISTENERS ---------- */


  useEffect(() => {
    if (!socket.connected) socket.connect();

    const onConnect = () => console.log("🟢 Connected:", socket.id);
    const onDisconnect = () => console.log("🔴 Disconnected");

    const onRoomHosted = (code) => {
      console.log("🏠 Room hosted:", code);
      setRoomCode(code);
    };

    const onRoomReady = () => {
      console.log("✅ Room ready");
    };

    const onJoinFailed = () => {
      alert("Could not join. Code invalid or room already full.");
      setPlayerCount(1);
      setStage("join");
    };
const onWagerDenied = ({ coins }) => {
  setError({
    title: "Not enough coins",
    message: `You only have ${coins} coins. Win games or lower the wager.`
  });
};



const onMatchDenied = ({ hostCoins, guestCoins, wager }) => {
  alert(
    `Match cannot start.\nWager: ${wager}\nHost coins: ${hostCoins}\nGuest coins: ${guestCoins}`
  );
};

const onRoomClosed = () => {
  requestConfirm({
    title: "Match ended",
    message: "Your opponent has left the match.",
    confirmLabel: "Back to menu",
    hideCancel: true,          // 👈 THIS IS THE KEY
    onConfirm: () => {
      onExit();
    }
  });
};


    const onCoinFlip = ({ guestChoice }) => {
  console.log("🪙 Coin flip start");

  setGuestChoice(guestChoice ?? null);
  setCoinResult(null);
  setFlipping(true);         // animation starts here ONLY
};

const onCoinResult = ({ guestChoice, coinResult, selector }) => {
  console.log("🪙 Coin result:", coinResult);

  setGuestChoice(guestChoice ?? null);
  setCoinResult(coinResult ?? null);
  setSelector(selector ?? null);
  setFlipping(false);

};



    const onTeamPicked = ({ role, team, teams: picked }) => {
      console.log("🧢 Team picked:", role, team);

      setTeamsPicked((prev) => {
        const next = { ...prev, [role]: team };
        return picked ? { ...picked } : next;
      });

      // keep currentTeam mirrored for me
      if (role === me) setCurrentTeam(team);
    };

    const onNewQuestion = ({ question, duration }) => {
  console.log("🧠 New question received", question);

  setActiveQuestion(question);
  setRoundDuration(duration);
};

const onStateSync = (state) => {
  if (typeof state.stage === "string") {
  setStage((prev) => {
    // ✅ During client-controlled animations and selection, ignore server stage pushes
    if (prev === "coin") return prev;
    if (prev === "team") return prev;
    if (prev === "ballup") return prev;

    if (state.stage === "host") return "lobby";
    return state.stage;
  });
}



  if (typeof state.playerCount === "number") setPlayerCount(state.playerCount);

if (state.profiles) {

const strip = (p) =>
  p
    ? {
        userId: p.userId,
        username: p.username,
        badgeEquipped: p.badgeEquipped ?? null,
        coins: p.coins ?? 0,
        wins: p.wins ?? 0,
        losses: p.losses ?? 0
      }
    : null;

  const nextProfiles = {
    host: strip(state.profiles.host),
    guest: strip(state.profiles.guest)
  };

  setProfiles(nextProfiles);

  // 🔥 THIS IS THE IMPORTANT PART
  const myProfile = me === "host"
    ? nextProfiles.host
    : nextProfiles.guest;

  if (myProfile && typeof myProfile.coins === "number") {
    updateCoins(myProfile.coins);
  }
}



  if (state.wager) {
    setWager(state.wager);
  }

  if (state.scores) setScores(state.scores);
  if (state.selector) setSelector(state.selector);

  if (state.coin) {
    setGuestChoice(state.coin.guestChoice ?? null);
    setCoinResult(state.coin.coinResult ?? null);
  }

  if (state.teams) {
    setTeamsPicked(state.teams);
    const myTeam = me === "host" ? state.teams.host : state.teams.guest;
    setCurrentTeam(myTeam ?? null);
  }

  if (state.teamOptions) setTeamOptions(state.teamOptions);
};


    const onRoundEnded = ({ scores, selector, stage }) => {
      console.log("🏁 Round ended:", { scores, selector, stage });

      if (scores) setScores(scores);
      if (selector) setSelector(selector);
      if (stage) setStage(stage);

      setTeamsPicked({ host: null, guest: null });
      setCurrentTeam(null);
      setGuestChoice(null);
      setCoinResult(null);

      if (stage === "team") setTeamOptions(null);
    };

    // NEW: server broadcasts the 3 team options
    const onTeamOptions = ({ options }) => {
      console.log("🗂️ Team options:", options);
      setTeamOptions(options);
    };

    // NEW: server asks host to generate the 3 team options
    const onRequestTeamOptions = ({ roomCode }) => {
      if (me !== "host") return;

      const options = pickRandom3Teams();
      console.log("🧩 Providing team options:", options);

      setTeamOptions(options);
      socket.emit("provide-team-options", { roomCode, options });
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    socket.on("room-hosted", onRoomHosted);
    socket.on("room-ready", onRoomReady);
    socket.on("join-failed", onJoinFailed);
    socket.on("room-closed", onRoomClosed);
socket.on("wager-denied", onWagerDenied);
socket.on("match-denied", onMatchDenied);

    socket.on("coin-flip", onCoinFlip);
    socket.on("coin-result", onCoinResult);
    socket.on("team-picked", onTeamPicked);
    socket.on("state-sync", onStateSync);
    socket.on("new-question", onNewQuestion);
    socket.on("round-ended", onRoundEnded);

    socket.on("team-options", onTeamOptions);
    socket.on("request-team-options", onRequestTeamOptions);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);

      socket.off("room-hosted", onRoomHosted);
      socket.off("room-ready", onRoomReady);
      socket.off("join-failed", onJoinFailed);
      socket.off("room-closed", onRoomClosed);
socket.off("wager-denied", onWagerDenied);
socket.off("match-denied", onMatchDenied);

      socket.off("coin-flip", onCoinFlip);
      socket.off("coin-result", onCoinResult);
      socket.off("team-picked", onTeamPicked);
      socket.off("state-sync", onStateSync);
      socket.off("new-question", onNewQuestion);
      socket.off("round-ended", onRoundEnded);

      socket.off("team-options", onTeamOptions);
      socket.off("request-team-options", onRequestTeamOptions);

    };
  }, [onExit, me, pickRandom3Teams]);


  /* ---------- INIT ---------- */

  useEffect(() => {
    resetLocalMirrors();
    setPlayerCount(1);

    if (startMode === "host") {
      const code = generateRoomCode();
      setRoomCode(code);
      socket.emit("host-room", code);
    } else {
      setRoomCode("");
      setStage("join");
    }
  }, [startMode, generateRoomCode, resetLocalMirrors]);

  useEffect(() => {
  if (renderStage !== "gameover") return;

// Record completed online game
fetch(`${API_URL}/stats/game-complete`, {
  method: "POST",
  credentials: "include"
}).catch(err => {
  console.error("Failed to record online game completion", err);
});

}, [stage]);

useEffect(() => {
  if (!activeQuestion) return;

  // Play ball-up ONCE, ever
  if (!ballUpPlayedRef.current) {
    ballUpPlayedRef.current = true;
    setStage("ballup");
  } else {
    setStage("question");
  }
}, [activeQuestion]);

useEffect(() => {
  if (renderStage !== "team") {
    setTeamPickTimeLeft(null);
    return;
  }

  // Only the selector should be forced to pick
  const isMyTurnToPick = me === selector;
  const iAlreadyPicked = !!teamsPicked?.[me];

  // Wait until options exist
  if (!teamOptions || teamOptions.length !== 3) {
    setTeamPickTimeLeft(null);
    return;
  }

  // If it's not your turn, do not run your timer
  if (!isMyTurnToPick || iAlreadyPicked) {
    setTeamPickTimeLeft(null);
    return;
  }

  setTeamPickTimeLeft(TEAM_PICK_SECONDS);

  const id = setInterval(() => {
    setTeamPickTimeLeft((t) => {
      if (t === null) return null;
      if (t <= 1) return 0;
      return t - 1;
    });
  }, 1000);

  return () => clearInterval(id);
}, [renderStage, me, selector, teamOptions, teamsPicked]);

useEffect(() => {
  if (renderStage !== "team") return;
  if (teamPickTimeLeft !== 0) return;

  const isMyTurnToPick = me === selector;
  const iAlreadyPicked = !!teamsPicked?.[me];

  if (!isMyTurnToPick || iAlreadyPicked) return;
  if (!teamOptions || teamOptions.length !== 3) return;

  const randomTeam = teamOptions[Math.floor(Math.random() * teamOptions.length)];
  socket.emit("pick-team", { roomCode, team: randomTeam });

  setTeamsPicked((prev) => ({ ...prev, [me]: randomTeam }));
  setCurrentTeam(randomTeam);
}, [teamPickTimeLeft, renderStage, me, selector, teamsPicked, teamOptions, roomCode]);


  /* ---------- CLIENT INTENTS ---------- */

  const emitStartMatch = useCallback(() => {
    if (!roomCode) return;
    resetLocalMirrors();
    socket.emit("start-match", { roomCode });
  }, [roomCode, resetLocalMirrors]);

const emitCoinChoice = useCallback(
  (choice) => {
    if (!roomCode) return;
    if (guestChoice || coinResult || flipping) return;

    // do NOT update UI here
    socket.emit("coin-choice", { roomCode, choice });
  },
  [roomCode, guestChoice, coinResult, flipping]
);


  const emitPickTeam = useCallback(
  (team) => {
    if (!roomCode) return;

    // block clicks until options arrive
    if (!teamOptions || teamOptions.length !== 3) return;

    // ✅ ONLY the selector is allowed to pick
    if (me !== selector) return;

    socket.emit("pick-team", { roomCode, team });

    // Optional: you can keep this optimistic update,
    // but it's now safe because only selector can click.
    setTeamsPicked((prev) => ({ ...prev, [me]: team }));
    setCurrentTeam(team);
  },
  [roomCode, me, teamOptions, selector]
);


  /* ---------- DERIVED ---------- */
const questionKey = useMemo(() => {
  if (!activeQuestion) return "no-question";

  const playersKey = (activeQuestion.players || [])
    .map((p) => (typeof p === "string" ? p : p?.name ?? ""))
    .join("|");

  return `${activeQuestion.team}::${activeQuestion.operator}::${playersKey}`;
}, [activeQuestion]);


  

  const canStart = isHost && playerCount === 2;
  const coinButtonsDisabled = !roomCode || me !== "guest" || !!coinResult || flipping;

  const lobbyHint = isHost ? "Start when both players are here." : "Waiting for host to start...";

// 👇 NORMALISE SERVER STAGES TO CLIENT STAGES

useEffect(() => {
  setLeaveGuard(renderStage === "question");
}, [renderStage, setLeaveGuard]);


  /* ---------- STAGES ---------- */

if (renderStage === "join") {
  return (
    <div style={wrap}>
      {error && (
        <FoopyError
          title={error.title}
          message={error.message}
          onClose={() => setError(null)}
        />
      )}

      <h1>Join Game</h1>
      <input
        placeholder="Enter 5-letter code"
        value={roomCode}
        onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
        maxLength={5}
        style={codeInput}
      />
      <div style={actions}>
        <FoopyButton
          label="Join"
          primary
          disabled={roomCode.length !== 5}
          onClick={() => socket.emit("join-room", roomCode)}
        />
        <FoopyButton label="Back" onClick={onExit} />
      </div>
    </div>
  );
}

if (renderStage === "lobby") {
  const myRole = me;
  const opponentRole = me === "host" ? "guest" : "host";

  const myProfile = profiles[myRole];
  const opponentProfile = profiles[opponentRole];

  const hasOpponent = !!profiles.guest;

  const canStart =
    isHost &&
    hasOpponent &&
    wager?.agreed;

  return (
    <div style={wrap}>
      {/* 🔔 Foopy error modal */}
      {error && (
        <FoopyError
          title={error.title}
          message={error.message}
          onClose={() => setError(null)}
        />
      )}

      <p style={{ marginBottom: 24, opacity: 0.7 }}>
        Room Code
      </p>

      {/* Room code */}
      <div style={{ fontSize: 36, fontWeight: 800, letterSpacing: 6 }}>
        {roomCode}
      </div>

      <p style={{ marginBottom: 24, opacity: 0.7 }} />

      {/* Players */}
      <div style={{ display: "flex", gap: 40, marginBottom: 28 }}>
        <LobbyPlayerCard
          label="Host"
          profile={profiles.host}
        />
        <LobbyPlayerCard
          label="Guest"
          profile={profiles.guest}
        />
      </div>

      {/* Wager */}
      <div>
  <p style={{ fontWeight: 700 }}>Wager</p>

  <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
    {[10, 50, 100, 500].map((amt) => {
      const opponentRole = me === "host" ? "guest" : "host";
      const opponentPicked = wager?.[opponentRole] === amt;

      const opponentBadgeId = profiles?.[opponentRole]?.badgeEquipped;
      const opponentBadge =
  opponentBadgeId && BADGES[opponentBadgeId];

      return (
        <div key={amt} style={{ position: "relative" }}>
          {opponentPicked && opponentBadge && (
            <img
              src={opponentBadge.icon}
              alt={opponentBadge.name}
              style={{
                position: "absolute",
                top: -10,
                right: -10,
                width: 26,
                height: 26,
                borderRadius: "50%",
                background: "#fff",
                boxShadow: "0 4px 8px rgba(0,0,0,0.25)",
                zIndex: 2
              }}
            />
          )}

          <FoopyButton
            label={`🪙 ${amt}`}
            primary={wager?.[me] === amt}
            onClick={() =>
              socket.emit("set-wager", { roomCode, amount: amt })
            }
          />
        </div>
      );
    })}
  </div>
</div>


      {/* Actions */}
      <div style={{ marginTop: 28, display: "flex", gap: 14 }}>
        <FoopyButton
          label="Start Match"
          primary
          disabled={!canStart}
          onClick={emitStartMatch}
        />
      </div>
    </div>
  );
}



if (renderStage === "coin") {
  return (
    <CoinTossAnimation
      me={me}
      guestName={profiles.guest?.username}
      coinResult={coinResult}
      onChoose={(choice) => emitCoinChoice(choice)}
      onComplete={() => {
        setStage("team");
      }}
    />
  );
}


if (renderStage === "ballup") {
  return (
    <BallUpAnimation
      onComplete={() => setStage("question")}
    />
  );
}





if (renderStage === "team") {
  const isMyTurnToPick = me === selector;
  const iAlreadyPicked = !!teamsPicked?.[me];

  const footerText = !teamOptions
    ? "Loading teams..."
    : iAlreadyPicked
      ? "Waiting for opponent to choose..."
      : isMyTurnToPick
        ? "Choose your team"
        : "Opponent is choosing...";

return (
  <div style={wrap}>
    <TeamSelect
      selector={selector}
      me={me}
      options={teamOptions}
      onSelect={emitPickTeam}
    />

    <p style={muted}>{footerText}</p>

    {me === selector &&
      !teamsPicked?.[me] &&
      teamPickTimeLeft !== null &&
      teamOptions && (
        <p style={{ ...muted, marginTop: 6 }}>
          Auto-picking in {teamPickTimeLeft}s
        </p>
      )}
  </div>
);

}




if (renderStage === "question") {
  if (!activeQuestion) {
    return (
      <div style={wrap}>
        <p>Waiting for question...</p>
      </div>
    );
  }

  return (
    <BattleQuestion
  key={questionKey}
  question={activeQuestion}
  duration={roundDuration}
  selector={selector}
  me={me}
  scores={scores}
  profiles={profiles}
  isOnline
/>

  );
}






if (renderStage === "gameover") {
  const winnerRole = scores.host >= WIN_SCORE ? "host" : "guest";
  const loserRole = winnerRole === "host" ? "guest" : "host";

  const winnerName = profiles?.[winnerRole]?.username || "Winner";
  const loserName = profiles?.[loserRole]?.username || "Loser";

  const wagerAmount = wager?.agreed ?? 0;

  const winnerBadgeId = profiles?.[winnerRole]?.badgeEquipped;
  const loserBadgeId = profiles?.[loserRole]?.badgeEquipped;

  const winnerBadge = winnerBadgeId ? BADGES?.[winnerBadgeId] : null;
  const loserBadge = loserBadgeId ? BADGES?.[loserBadgeId] : null;

  return (
    <div style={wrap}>
      <div style={gameOverWrap}>
        <div style={gameOverTitle}>{winnerName} wins!</div>

        <div style={gameOverRow}>
          <div style={endPlayerCard(true)}>
            <div style={endAvatar}>
              {winnerBadge ? (
                <img
                  src={winnerBadge.icon}
                  alt={winnerBadge.name}
                  style={{ width: 52, height: 52, objectFit: "contain" }}
                />
              ) : null}
            </div>
            <div>
  <div style={endName}>{winnerName}</div>
  <div style={endRole}>Winner</div>

  {wagerAmount > 0 && (
    <div style={coinGain(true)}>
      🪙 +{wagerAmount}
    </div>
  )}
</div>

          </div>

          <div style={endScorePill}>
            {scores.host} - {scores.guest}
          </div>

          <div style={endPlayerCard(false)}>
            <div style={endAvatar}>
              {loserBadge ? (
                <img
                  src={loserBadge.icon}
                  alt={loserBadge.name}
                  style={{ width: 46, height: 34, objectFit: "contain" }}
                />
              ) : null}
            </div>
            <div>
  <div style={endName}>{loserName}</div>
  <div style={endRole}>Loser</div>

  {wagerAmount > 0 && (
    <div style={coinGain(false)}>
      🪙 −{wagerAmount}
    </div>
  )}
</div>

          </div>
        </div>

        <div style={{ marginTop: 22 }}>
          <FoopyButton label="Back to Menu" primary onClick={onExit} />
        </div>
      </div>
    </div>
  );
}


  return null;
}

function LobbyPlayerCard({ label, profile }) {
  // 🔒 Guard first – profile can be null
  console.log("PROFILE IN LOBBY:", profile);
  if (!profile) {
    console.log("LOBBY PROFILE: null");
    return (
      <div style={lobbyCardEmpty}>
        <div style={waitingText}>Waiting for player…</div>
      </div>
    );
  }

  // 🧪 Safe debug logs
  console.log("LOBBY PROFILE:", profile);
  console.log("BADGE VALUE:", profile.badgeEquipped);
  console.log("BADGE LOOKUP:", BADGES?.[profile.badgeEquipped]);

  const wins = profile.wins ?? 0;
  const losses = profile.losses ?? 0;

  return (
    <div style={lobbyCard}>
      {profile.badgeEquipped && BADGES[profile.badgeEquipped] && (
        <img
          src={BADGES[profile.badgeEquipped].icon}
          alt={BADGES[profile.badgeEquipped].name}
          style={{
            width: 80,
            height: 60,
            borderRadius: "10%",
            objectFit: "contain"
          }}
        />
      )}

      <div style={username}>{profile.username}</div>

      {/* ✅ Dynamic record */}
      <div style={record}>
        {wins}W – {losses}L
      </div>
    </div>
  );
}



/* ---------- LOBBY CARD STYLES ---------- */

const lobbyCard = {
  width: 190,
  height: 160,
  borderRadius: 16,
  background: "#ffffff",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 8px 18px rgba(0,0,0,0.12)"
};

const lobbyCardEmpty = {
  ...lobbyCard,
  opacity: 0.5
};

const roleLabel = {
  fontSize: 13,
  fontWeight: 800,
  opacity: 0.6,
  marginBottom: 6
};

const waitingText = {
  fontSize: 13,
  opacity: 0.6
};

const badgeBubble = {
  width: 44,
  height: 44,
  borderRadius: "50%",
  background: "#eee",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 12,
  fontWeight: 700,
  marginBottom: 6
};

const username = {
  fontWeight: 800,
  fontSize: 16,
  marginTop: 4
};

const record = {
  fontSize: 12,
  opacity: 0.6,
  marginTop: 2
};

const wagerBadgeBubble = {
  position: "absolute",
  top: -8,
  right: -8,
  width: 28,
  height: 28,
  borderRadius: "50%",
  background: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 4px 8px rgba(0,0,0,0.25)",
  zIndex: 2
};

const wagerBadgeImage = {
  width: 20,
  height: 20,
  objectFit: "contain"
};

const gameOverWrap = {
  width: "100%",
  maxWidth: 820,
  padding: "40px 30px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
};


const gameOverTitle = {
  fontSize: 44,
  fontWeight: 900,
  margin: "6px 0 8px"
};

const gameOverSubtitle = {
  fontSize: 14,
  opacity: 0.7,
  marginBottom: 18
};

const gameOverRow = {
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 14,
  marginTop: 8
};

const endPlayerCard = (isWinner) => ({
  width: 300,
  borderRadius: 22,
  padding: "22px 20px",
  display: "flex",
  alignItems: "center",
  gap: 18,
  background: isWinner
    ? "linear-gradient(135deg, #1e88e5, #1565c0)"
    : "#f4f4f4",
  color: isWinner ? "#fff" : "#111",
  boxShadow: isWinner
    ? "0 18px 40px rgba(30,136,229,0.35)"
    : "0 12px 26px rgba(0,0,0,0.10)",
  transition: "transform 200ms ease"
});


const endAvatar = {
  width: 72,
  height: 72,
  borderRadius: "50%", // full circle
  background: "#ffffff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
  overflow: "hidden"
};


const endName = {
  fontWeight: 900,
  fontSize: 16,
  lineHeight: 1.1
};

const endRole = {
  fontSize: 12,
  opacity: 0.7,
  marginTop: 2
};

const endScorePill = {
  minWidth: 160,
  height: 70,
  borderRadius: 24,
  background: "#111",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 28,
  fontWeight: 900,
  boxShadow: "0 18px 36px rgba(0,0,0,0.30)"
};

const coinGain = (isWinner) => ({
  marginTop: 10,
  fontSize: 16,
  fontWeight: 800,
  color: isWinner ? "#ffd54f" : "#e74c3c",
  opacity: isWinner ? 1 : 0.8
});
