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
  const keyboardOpen = kb > 0;

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
      <div
        style={{
          ...stageBase,
          bottom: keyboardOpen ? kb + 92 : 112
        }}
      >
        <EquationRow
          players={question.players}
          operator={question.operator}
          showNumbers={keyboardOpen ? false : (mods?.showNumbers ?? true)}
          showNames={keyboardOpen ? false : (mods?.showNames ?? true)}
          teamKey={answerTeam}
          compactMobile={keyboardOpen}
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
  boxSizing: "border-box"
};

const stageBase = {
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

const dock = {
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