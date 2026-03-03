import EquationRow from "./components/EquationRow";
import InputBox from "./components/InputBox";
import MobileTopBar from "./components/MobileTopBar";
import useIsMobile from "./hooks/useIsMobile";
import useKeyboardOffset from "./hooks/useKeyboardOffset";

export default function FoopyGameLayoutMobile({
  user,
  score,
  lastPoints,
  profiles,
  question,
  answerTeam,
  mods,
  status,
  input,
  setInput,
  suggestions,
  submitGuess,
  skipQuestion,
  skipLocked,
  time
}) {
  const isMobile = useIsMobile(480);
  const kb = useKeyboardOffset(isMobile);

  if (!question) return null;

  const meProfile = profiles?.host;
  const meLabel = meProfile?.username ?? "You";

  return (
    <div style={wrap}>
      {/* TOP BAR (mobile-only) */}
      <MobileTopBar
        singlePlayer
        meLabel={meLabel}
        myScore={score}
        myBadgeId={meProfile?.badgeEquipped ?? null}
        time={time}
        delta={lastPoints}
      />

      {/* STAGE */}
      <div style={stage}>
        <EquationRow
          players={question.players}
          operator={question.operator}
          showNumbers={mods?.showNumbers ?? true}
          showNames={mods?.showNames ?? true}
          teamKey={answerTeam}
        />
      </div>

      {/* BOTTOM DOCK */}
      <div
        style={{
          ...dock,
          transform: kb ? `translateY(-${kb}px)` : "translateY(0)"
        }}
      >
        <InputBox
          value={input}
          onChange={setInput}
          onSubmit={() => {
            if (skipLocked) return;
            const guess = suggestions.length > 0 ? suggestions[0].name : input;
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
    </div>
  );
}

const wrap = {
  width: "100%",
  height: "100%",
  position: "relative",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  paddingTop: 78, // clears HUD + our top bar
  boxSizing: "border-box"
};

const stage = {
  flex: 1,
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  overflow: "hidden",
  paddingTop: 10
};

const dock = {
  width: "100%",
  padding: "10px 0 max(14px, env(safe-area-inset-bottom))",
  background: "rgba(255,255,255,0.92)",
  borderTop: "1px solid rgba(0,0,0,0.08)",
  boxShadow: "0 -12px 30px rgba(0,0,0,0.10)",
  zIndex: 40
};