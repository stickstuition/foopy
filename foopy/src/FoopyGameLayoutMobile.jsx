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
  const [typingOpen, setTypingOpen] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(
    typeof window !== "undefined" ? window.innerHeight : 0
  );

  useEffect(() => {
    const vv = window.visualViewport;

    function update() {
      const nextHeight =
        typingOpen && vv ? Math.round(vv.height) : window.innerHeight;

      setViewportHeight(nextHeight);
    }

    update();

    vv?.addEventListener("resize", update);
    vv?.addEventListener("scroll", update);
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);

    return () => {
      vv?.removeEventListener("resize", update);
      vv?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, [typingOpen]);

  if (!question) return null;

  const meProfile = profiles?.host;
  const meLabel = meProfile?.username ?? "You";

  const handleSubmit = () => {
    if (skipLocked) return;
    const guess = suggestions.length > 0 ? suggestions[0].name : input;
    setTypingOpen(false);
    submitGuess(guess);
  };

  const handleSelectSuggestion = (name) => {
    if (skipLocked) return;
    setInput(name);
    setTypingOpen(false);
    submitGuess(name);
  };

  const handleSkip = () => {
    setTypingOpen(false);
    skipQuestion();
  };

  return (
    <>
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

        <div style={mainStage}>
          <EquationRow
            players={question.players}
            operator={question.operator}
            showNumbers={mods?.showNumbers ?? true}
            showNames={mods?.showNames ?? true}
            teamKey={answerTeam}
            compactMobile={false}
          />
        </div>

        <div style={launcherDock}>
          <button
            type="button"
            onClick={() => setTypingOpen(true)}
            style={launcherButton}
          >
            <span style={launcherText}>
              {input?.trim() ? input : "Tap to answer"}
            </span>
          </button>

          <button
            type="button"
            onClick={handleSkip}
            style={launcherSkipButton}
          >
            SKIP
          </button>
        </div>
      </div>

      {typingOpen && (
        <div
          style={{
            ...typingOverlay,
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

          <div style={typingTopSection}>
            <EquationRow
              players={question.players}
              operator={question.operator}
              showNumbers={false}
              showNames={false}
              teamKey={answerTeam}
              compactMobile
            />
          </div>

          <div style={typingBottomSection}>
            <InputBox
              value={input}
              onChange={setInput}
              onSubmit={handleSubmit}
              suggestions={suggestions}
              onSelectSuggestion={handleSelectSuggestion}
              onSkip={handleSkip}
              resultFlash={status}
              autoFocusInput
              compactMobile
              suggestionsMaxHeight={160}
            />
          </div>
        </div>
      )}
    </>
  );
}

const shell = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  boxSizing: "border-box",
  background: "#fff",
  position: "relative"
};

const mainStage = {
  flex: 1,
  minHeight: 0,
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  paddingTop: 108,
  paddingBottom: 126,
  boxSizing: "border-box"
};

const launcherDock = {
  position: "fixed",
  left: 0,
  right: 0,
  bottom: 0,
  width: "100%",
  padding: "10px 12px calc(12px + env(safe-area-inset-bottom))",
  background: "rgba(255,255,255,0.98)",
  borderTop: "1px solid rgba(0,0,0,0.08)",
  boxShadow: "0 -12px 30px rgba(0,0,0,0.10)",
  display: "flex",
  flexDirection: "column",
  gap: 8,
  boxSizing: "border-box",
  zIndex: 40
};

const launcherButton = {
  width: "100%",
  maxWidth: 420,
  margin: "0 auto",
  height: 46,
  borderRadius: 12,
  border: "1px solid #ccc",
  background: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  padding: "0 14px",
  fontSize: 16,
  boxSizing: "border-box"
};

const launcherText = {
  color: "#666",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap"
};

const launcherSkipButton = {
  width: "100%",
  maxWidth: 420,
  margin: "0 auto",
  height: 40,
  borderRadius: 10,
  border: "none",
  background: "#d9d9d9",
  fontSize: 14
};

const typingOverlay = {
  position: "fixed",
  inset: 0,
  width: "100%",
  background: "#fff",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  zIndex: 120
};

const typingTopSection = {
  flexShrink: 0,
  paddingTop: 104,
  paddingLeft: 12,
  paddingRight: 12,
  boxSizing: "border-box"
};

const typingBottomSection = {
  marginTop: "auto",
  paddingBottom: "calc(10px + env(safe-area-inset-bottom))",
  background: "rgba(255,255,255,0.98)",
  borderTop: "1px solid rgba(0,0,0,0.08)",
  boxShadow: "0 -12px 30px rgba(0,0,0,0.10)"
};