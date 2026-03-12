import { useEffect, useState } from "react";
import EquationRow from "./components/EquationRow";
import InputBox from "./components/InputBox";
import MobileTopBar from "./components/MobileTopBar";
import useIsMobile from "./hooks/useIsMobile";

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

    const [keyboardOpen, setKeyboardOpen] = useState(false);

  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;

    function update() {
      const keyboard = window.innerHeight - vv.height;
      setKeyboardOpen(keyboard > 120);
    }

    update();
    vv.addEventListener("resize", update);
    vv.addEventListener("scroll", update);

    return () => {
      vv.removeEventListener("resize", update);
      vv.removeEventListener("scroll", update);
    };
  }, []);

  if (!question) return null;

  const meProfile = profiles?.host;
  const meLabel = meProfile?.username ?? "You";

return (
  <div style={shell}>
    <MobileTopBar
      singlePlayer
      meLabel={meLabel}
      myScore={score}
      myBadgeId={meProfile?.badgeEquipped ?? null}
      time={time}
      delta={lastPoints}
    />

    <div
      style={{
        ...playArea,
        justifyContent: keyboardOpen ? "flex-start" : "center"
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

    <div style={dock}>
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

const shell = {
  width: "100%",
  height: "100dvh",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  boxSizing: "border-box"
};

const playArea = {
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  paddingTop: 110
};

const dock = {
  width: "100%",
  padding: "10px 0 max(12px, env(safe-area-inset-bottom))",
  background: "rgba(255,255,255,0.96)",
  borderTop: "1px solid rgba(0,0,0,0.08)",
  boxShadow: "0 -12px 30px rgba(0,0,0,0.10)"
};