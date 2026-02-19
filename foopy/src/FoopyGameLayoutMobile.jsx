import BattleScoreboard from "./components/BattleScoreboard";
import EquationRow from "./components/EquationRow";
import InputBox from "./components/InputBox";
import TimerCircle from "./components/TimerCircle";

/*
  Mobile-only layout for Timed Mode (FoopyGame)

  Responsibilities:
  - Arrange existing components in a mobile-safe vertical flow
  - Keep scoreboard visible
  - Preserve horizontal EquationRow
  - Prioritise keyboard-first input
  - No game logic, no state mutations
*/

export default function FoopyGameLayoutMobile({
  // core game data
  user,
  score,
  lastPoints,
  profiles,

  // question + rendering
  question,
  answerTeam,
  mods,
  status,

  // input
  input,
  setInput,
  suggestions,
  submitGuess,
  skipQuestion,
  skipLocked,

  // timer
  time
}) {
  if (!question) return null;

  return (
    <div style={wrap}>
      {/* Scoreboard stays visible */}
      <BattleScoreboard
        me="host"
        scores={{ host: score, guest: 0 }}
        profiles={profiles}
        singlePlayer
        delta={lastPoints}
      />

      {/* Equation */}
      <div style={equationWrap}>
        <EquationRow
          players={question.players}
          operator={question.operator}
          showNumbers={mods?.showNumbers ?? true}
          showNames={mods?.showNames ?? true}
          teamKey={answerTeam}
        />
      </div>

      {/* Input zone */}
      <div style={inputWrap}>
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
          resultFlash={status}
        />
      </div>

      {/* Timer */}
      <TimerCircle time={time} />
    </div>
  );
}

/* ---------- styles ---------- */

const wrap = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingTop: 72, // clears HUD + timer
  boxSizing: "border-box"
};

const equationWrap = {
  width: "100%",
  display: "flex",
  justifyContent: "center",
  marginTop: 12,
  marginBottom: 8
};

const inputWrap = {
  width: "100%",
  display: "flex",
  justifyContent: "center",
  marginTop: "auto",
  paddingBottom: 16
};
