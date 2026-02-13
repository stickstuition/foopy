import { useState } from "react";
import { useAuth } from "./auth/AuthContext";
import LoginGate from "./auth/LoginGate";
import OnboardingScreen from "./onboarding/OnboardingScreen";
import SettingsModal from "./ui/SettingsModal";

import {
  setSoundEnabled,
  isSoundEnabled,
  playUpClick
} from "./utils/uiSounds";

import GameShell from "./components/GameShell";
import GamePanel from "./components/GamePanel";
import FoopyGame from "./FoopyGame";
import MainMenu from "./components/MainMenu";
import OnlineBattle from "./online/OnlineBattle";
import ConfirmModal from "./components/ConfirmModal";

function App() {
  const { user, loading, logout } = useAuth();

  /* ---------- Global sound state ---------- */
  const [soundOn, setSoundOn] = useState(isSoundEnabled());

  function toggleSound() {
    const next = !soundOn;
    if (next) playUpClick();
    setSoundEnabled(next);
    setSoundOn(next);
  }

  /* ---------- Settings modal ---------- */
  const [settingsOpen, setSettingsOpen] = useState(false);

  /* ---------- Game mode ---------- */
  const [mode, setMode] = useState("menu");

  /*
    Leave guard:
    true  = user is mid-game / mid-match, show confirm modal on Home
    false = setup screens, lobby, menu, no confirm on Home
  */
  const [leaveGuard, setLeaveGuard] = useState(false);

  /* ---------- Confirm modal ---------- */
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmData, setConfirmData] = useState({
    title: "",
    message: "",
    confirmLabel: "Leave",
    hideCancel: false,
    onConfirm: null
  });

  function requestConfirm({
    title,
    message,
    confirmLabel = "Leave",
    onConfirm,
    hideCancel = false
  }) {
    setConfirmData({
      title,
      message,
      confirmLabel,
      hideCancel,
      onConfirm: () => {
        setConfirmOpen(false);
        onConfirm();
      }
    });
    setConfirmOpen(true);
  }

  function handleHomeRequest() {
    if (mode === "menu") return;

    const isOnlineBattle =
      mode === "battle-host" || mode === "battle-join";

    // If not actively playing, just leave immediately, no confirm modal
    if (!leaveGuard) {
      if (isOnlineBattle) {
        const { socket } = require("./online/socket");
        socket.emit("leave-room");
      }

      setMode("menu");
      return;
    }

    // Actively playing, confirm required
    requestConfirm({
      title: "Leave current mode?",
      message: isOnlineBattle
        ? "If you leave, you will forfeit any wagered coins."
        : "Your current progress will be lost.",
      confirmLabel: "Leave",
      onConfirm: () => {
        if (isOnlineBattle) {
          const { socket } = require("./online/socket");
          socket.emit("leave-room");
        }

        setLeaveGuard(false);
        setMode("menu");
      }
    });
  }

  /* ---------- Content ---------- */

  let content = null;
  const hideHud = !user || !user.onboarded;

  if (loading) {
    content = <div>Loading...</div>;
  } else if (!user) {
    content = <LoginGate />;
  } else {
    if (!user.onboarded) {
      content = <OnboardingScreen />;
    } else if (mode === "timed") {
      content = (
        <FoopyGame
          onExit={() => {
            setLeaveGuard(false);
            setMode("menu");
          }}
          onHome={handleHomeRequest}
          requestConfirm={requestConfirm}
          setLeaveGuard={setLeaveGuard}
        />
      );
    } else if (mode === "battle-host") {
      content = (
        <OnlineBattle
          startMode="host"
          onExit={() => {
            setLeaveGuard(false);
            setMode("menu");
          }}
          onHome={handleHomeRequest}
          requestConfirm={requestConfirm}
          setLeaveGuard={setLeaveGuard}
        />
      );
    } else if (mode === "battle-join") {
      content = (
        <OnlineBattle
          startMode="join"
          onExit={() => {
            setLeaveGuard(false);
            setMode("menu");
          }}
          onHome={handleHomeRequest}
          requestConfirm={requestConfirm}
          setLeaveGuard={setLeaveGuard}
        />
      );
    } else {
      content = (
        <MainMenu
          onTimedMode={() => {
            setLeaveGuard(false);
            setMode("timed");
          }}
          onBattleHost={() => {
            setLeaveGuard(false);
            setMode("battle-host");
          }}
          onBattleJoin={() => {
            setLeaveGuard(false);
            setMode("battle-join");
          }}
        />
      );
    }
  }

  /* ---------- Render ---------- */

  return (
    <GameShell>
      <GamePanel
        mode={mode}
        variant={!user ? "auth" : "default"}
        hideHud={hideHud}
        soundOn={soundOn}
        onHome={handleHomeRequest}
        onLogout={logout}
        onToggleSound={toggleSound}
        onOpenSettings={() => setSettingsOpen(true)}
      >
        {content}
      </GamePanel>

      {settingsOpen && user && (
        <SettingsModal
          user={user}
          onClose={() => setSettingsOpen(false)}
          onLogout={logout}
        />
      )}

      <ConfirmModal
        open={confirmOpen}
        title={confirmData.title}
        message={confirmData.message}
        confirmLabel={confirmData.confirmLabel}
        onConfirm={confirmData.onConfirm}
        onCancel={() => setConfirmOpen(false)}
        hideCancel={confirmData.hideCancel}
      />
    </GameShell>
  );
}

export default App;
