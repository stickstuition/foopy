let soundEnabled = true;

const downClick = new Audio("/sounds/downclick.mp3");
const upClick = new Audio("/sounds/upclick.mp3");

downClick.preload = "auto";
upClick.preload = "auto";

export function setSoundEnabled(enabled) {
  soundEnabled = enabled;

  // HARD mute/unmute the audio elements
  downClick.muted = !enabled;
  upClick.muted = !enabled;
}

export function isSoundEnabled() {
  return soundEnabled;
}

export function playDownClick() {
  if (!soundEnabled) return;

  downClick.currentTime = 0;
  const p = downClick.play();
  if (p && typeof p.catch === "function") p.catch(() => {});
}

export function playUpClick() {
  if (!soundEnabled) return;

  upClick.currentTime = 0;
  const p = upClick.play();
  if (p && typeof p.catch === "function") p.catch(() => {});
}
