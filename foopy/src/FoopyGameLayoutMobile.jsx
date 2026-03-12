import EquationRow from "./components/EquationRow";
import InputBox from "./components/InputBox";
import MobileTopBar from "./components/MobileTopBar";
import { useEffect } from "react";

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

  if (!question) return null;
  useEffect(() => {
  function updateVH() {
    const vh = window.visualViewport
      ? window.visualViewport.height
      : window.innerHeight;

    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }

  updateVH();

  window.visualViewport?.addEventListener("resize", updateVH);
  window.addEventListener("resize", updateVH);

  return () => {
    window.visualViewport?.removeEventListener("resize", updateVH);
    window.removeEventListener("resize", updateVH);
  };
}, []);
  const meProfile = profiles?.host;
  const meLabel = meProfile?.username ?? "You";

  function handleSubmit() {
    if (skipLocked) return;

    const guess =
      suggestions.length > 0
        ? suggestions[0].name
        : input;

    submitGuess(guess);
  }

  function handleSelectSuggestion(name) {
    if (skipLocked) return;

    setInput(name);
    submitGuess(name);
  }

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

      <div style={equationArea}>
        <EquationRow
          players={question.players}
          operator={question.operator}
          showNumbers={false}
          showNames={false}
          teamKey={answerTeam}
          compactMobile
        />
      </div>

      <div style={inputArea}>

        <InputBox
          value={input}
          onChange={setInput}
          onSubmit={handleSubmit}
          suggestions={suggestions}
          onSelectSuggestion={handleSelectSuggestion}
          onSkip={skipQuestion}
          resultFlash={status}
          compactMobile
        />

      </div>

    </div>
  );
}

const shell = {
  width: "100%",
  height: "var(--vh)",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  background: "#fff"
};

const equationArea = {
  flex: 1,
  minHeight: 0,
  maxHeight: 180,
  display: "flex",
  alignItems: "flex-start",
paddingTop: 12,
  justifyContent: "center",
  paddingLeft: 10,
  paddingRight: 10
};

const inputArea = {
  flexShrink: 0,
  paddingLeft: 10,
  paddingRight: 10,
  paddingTop: 10,
  paddingBottom: "calc(12px + env(safe-area-inset-bottom))",
  background: "rgba(255,255,255,0.98)",
  borderTop: "1px solid rgba(0,0,0,0.08)"
};