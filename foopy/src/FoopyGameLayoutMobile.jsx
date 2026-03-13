import EquationRow from "./components/EquationRow";
import InputBox from "./components/InputBox";
import MobileTopBar from "./components/MobileTopBar";
import { useEffect, useState } from "react";

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
  const [keyboard, setKeyboard] = useState(0);

  useEffect(() => {
    function update() {
      const vv = window.visualViewport;

      if (!vv) return;

      const kb =
        window.innerHeight - vv.height - vv.offsetTop;

      setKeyboard(kb > 0 ? kb : 0);
    }

    update();

    window.visualViewport?.addEventListener("resize", update);
    window.visualViewport?.addEventListener("scroll", update);

    return () => {
      window.visualViewport?.removeEventListener("resize", update);
      window.visualViewport?.removeEventListener("scroll", update);
    };
  }, []);

  if (!question) return null;

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
    <div style={wrap}>

      <MobileTopBar
        singlePlayer
        meLabel={meLabel}
        myScore={score}
        myBadgeId={meProfile?.badgeEquipped ?? null}
        time={time}
        delta={lastPoints}
      />

      {/* EQUATION STAGE */}
      <div
        style={{
          ...stage,
          transform: keyboard
            ? `translateY(-${Math.min(keyboard, 220)}px)`
            : "translateY(0)"
        }}
      >
        <EquationRow
          players={question.players}
          operator={question.operator}
          showNumbers={false}
          showNames={false}
          teamKey={answerTeam}
          compactMobile={keyboard > 0}
        />
      </div>

      {/* INPUT DOCK */}
      <div
        style={{
          ...dock,
          transform: keyboard
            ? `translateY(-${keyboard}px)`
            : "translateY(0)"
        }}
      >
        <InputBox
          value={input}
          onChange={setInput}
          onSubmit={handleSubmit}
          suggestions={suggestions}
          onSelectSuggestion={handleSelectSuggestion}
          onSkip={skipQuestion}
          resultFlash={status}
          compactMobile
          suggestionsMaxHeight={56}
        />
      </div>

    </div>
  );
}

/* ---------- Styles ---------- */

const wrap = {
  width: "100%",
  height: "100%",
  position: "relative",
  overflow: "hidden",
  background: "#fff"
};

const stage = {
  position: "absolute",
  top: 110,
  left: 0,
  right: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  paddingTop: 0
};

const dock = {
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  width: "100%",
  padding: "8px 10px max(10px, env(safe-area-inset-bottom))",
  background: "rgba(255,255,255,0.96)",
  borderTop: "1px solid rgba(0,0,0,0.08)",
  boxShadow: "0 -12px 30px rgba(0,0,0,0.10)",
  zIndex: 60
};