import { useEffect, useState } from "react";
import EquationRow from "./components/EquationRow";
import InputBox from "./components/InputBox";
import MobileTopBar from "./components/MobileTopBar";

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

  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(
    typeof window !== "undefined" ? window.innerHeight : 0
  );

      const [dockOffset, setDockOffset] = useState(0);
  useEffect(() => {
    const vv = window.visualViewport;

    function update() {
      if (!vv) {
        setViewportHeight(window.innerHeight);
        setKeyboardOpen(false);
        setDockOffset(0);
        return;
      }

      const keyboard = Math.max(
        0,
        window.innerHeight - vv.height - vv.offsetTop
      );

      const open = keyboard > 120;

      setViewportHeight(window.innerHeight);
      setKeyboardOpen(open);
      setDockOffset(open ? Math.round(keyboard) : 0);
    }

    update();

    if (vv) {
      vv.addEventListener("resize", update);
      vv.addEventListener("scroll", update);
    }

    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);

    return () => {
      if (vv) {
        vv.removeEventListener("resize", update);
        vv.removeEventListener("scroll", update);
      }
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, []);

  if (!question) return null;

  const meProfile = profiles?.host;
  const meLabel = meProfile?.username ?? "You";

  return (
    <div
      style={{
        ...shell,
        height: viewportHeight || window.innerHeight
      }}
    >
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
          justifyContent: keyboardOpen ? "flex-start" : "center",
          paddingTop: keyboardOpen ? 112 : 110
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

      <div style={dockSpacer} />

      <div
        style={{
          ...dock,
          transform: `translateY(-${dockOffset}px)`
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

const shell = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  boxSizing: "border-box",
  background: "#fff"
};

const playArea = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  minHeight: 0,
  overflow: "hidden"
};

const dockSpacer = {
  height: 116,
  flexShrink: 0
};

const dock = {
  position: "fixed",
  left: 0,
  right: 0,
  bottom: 0,
  width: "100%",
  padding: "10px 0 max(12px, env(safe-area-inset-bottom))",
  background: "rgba(255,255,255,0.98)",
  borderTop: "1px solid rgba(0,0,0,0.08)",
  boxShadow: "0 -12px 30px rgba(0,0,0,0.10)",
  zIndex: 80,
  willChange: "transform"
};