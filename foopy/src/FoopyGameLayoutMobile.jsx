import { useEffect, useMemo, useState } from "react";
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
  const [focusTick, setFocusTick] = useState(0);
  const [viewportBox, setViewportBox] = useState(() => ({
    top: 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0
  }));

  useEffect(() => {
    const vv = window.visualViewport;

    function updateViewportBox() {
      if (!vv) {
        setViewportBox({
          top: 0,
          height: window.innerHeight
        });
        return;
      }

      setViewportBox({
        top: Math.max(0, Math.round(vv.offsetTop || 0)),
        height: Math.max(0, Math.round(vv.height || window.innerHeight))
      });
    }

    updateViewportBox();

    vv?.addEventListener("resize", updateViewportBox);
    vv?.addEventListener("scroll", updateViewportBox);
    window.addEventListener("resize", updateViewportBox);
    window.addEventListener("orientationchange", updateViewportBox);

    return () => {
      vv?.removeEventListener("resize", updateViewportBox);
      vv?.removeEventListener("scroll", updateViewportBox);
      window.removeEventListener("resize", updateViewportBox);
      window.removeEventListener("orientationchange", updateViewportBox);
    };
  }, []);

  useEffect(() => {
    if (!typingOpen) return;

    const t = window.setTimeout(() => {
      setFocusTick((n) => n + 1);
    }, 80);

    return () => window.clearTimeout(t);
  }, [typingOpen]);

  if (!question) return null;

  const meProfile = profiles?.host;
  const meLabel = meProfile?.username ?? "You";

  const typedValue = (input ?? "").trim();

  const overlaySuggestionsMaxHeight = useMemo(() => {
    const raw = viewportBox.height - 270;
    return Math.max(96, Math.min(220, raw));
  }, [viewportBox.height]);

  function openTyping() {
    if (skipLocked) return;
    setTypingOpen(true);
  }

  function closeTyping() {
    setTypingOpen(false);
  }

  function handleSubmit() {
    if (skipLocked) return;
    const guess = suggestions.length > 0 ? suggestions[0].name : input;
    closeTyping();
    submitGuess(guess);
  }

  function handleSelectSuggestion(name) {
    if (skipLocked) return;
    setInput(name);
    closeTyping();
    submitGuess(name);
  }

  function handleSkip() {
    if (skipLocked) return;
    closeTyping();
    skipQuestion();
  }

  return (
    <>
      {!typingOpen && (
        <div
          style={{
            ...gameShell,
            height: "100%"
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

          <div style={gameStage}>
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
              onClick={openTyping}
              style={launcherButton}
            >
              <span
                style={{
                  ...launcherText,
                  color: typedValue ? "#111" : "#666"
                }}
              >
                {typedValue || "Tap to answer"}
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
      )}

      {typingOpen && (
        <div
          style={{
            ...typingSheet,
            top: viewportBox.top,
            height: viewportBox.height
          }}
        >
          <div style={typingInner}>
            <MobileTopBar
              singlePlayer
              meLabel={meLabel}
              myScore={score}
              myBadgeId={meProfile?.badgeEquipped ?? null}
              time={time}
              delta={lastPoints}
            />

            <div style={typingEquationWrap}>
              <EquationRow
                players={question.players}
                operator={question.operator}
                showNumbers={false}
                showNames={false}
                teamKey={answerTeam}
                compactMobile
              />
            </div>

            <div style={typingComposer}>
              <InputBox
                key={focusTick}
                value={input}
                onChange={setInput}
                onSubmit={handleSubmit}
                suggestions={suggestions}
                onSelectSuggestion={handleSelectSuggestion}
                onSkip={handleSkip}
                resultFlash={status}
                autoFocusInput
                compactMobile
                suggestionsMaxHeight={overlaySuggestionsMaxHeight}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const gameShell = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  boxSizing: "border-box",
  background: "#fff",
  position: "relative"
};

const gameStage = {
  flex: 1,
  minHeight: 0,
  overflow: "hidden",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  paddingTop: 118,
  paddingLeft: 8,
  paddingRight: 8,
  paddingBottom: 132,
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
  border: "1px solid #c9c9c9",
  background: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  padding: "0 14px",
  fontSize: 16,
  boxSizing: "border-box"
};

const launcherText = {
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
  fontSize: 14,
  color: "#2f7df6"
};

const typingSheet = {
  position: "fixed",
  left: 0,
  right: 0,
  width: "100%",
  background: "#fff",
  zIndex: 200,
  overflow: "hidden"
};

const typingInner = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  background: "#fff"
};

const typingEquationWrap = {
  flexShrink: 0,
  paddingTop: 116,
  paddingLeft: 8,
  paddingRight: 8,
  paddingBottom: 8,
  boxSizing: "border-box"
};

const typingComposer = {
  marginTop: "auto",
  flexShrink: 0,
  paddingTop: 8,
  paddingBottom: "calc(10px + env(safe-area-inset-bottom))",
  background: "rgba(255,255,255,0.98)",
  borderTop: "1px solid rgba(0,0,0,0.08)",
  boxShadow: "0 -12px 30px rgba(0,0,0,0.10)"
};