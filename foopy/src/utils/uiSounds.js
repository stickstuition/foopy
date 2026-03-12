let soundEnabled = true;

const SOUNDTRACK_FILES = [
  "/sounds/1966.mp3",
  "/sounds/Jolimont.mp3",
  "/sounds/The Draft.mp3",
  "/sounds/The Messiah.mp3",
  "/sounds/Thursday Night Dinners.mp3"
];

const SOUNDTRACK_FADE_MS = 1200;
const SOUNDTRACK_FADE_STEP_MS = 50;
const SOUNDTRACK_TARGET_VOLUME = 0.35;

let soundtrackAudio = null;
let soundtrackIndex = 0;
let soundtrackStarted = false;
let soundtrackHasStartedOnce = false;
let fadeInterval = null;
let transitionTimeout = null;

const downClick = new Audio("/sounds/downclick.mp3");
const upClick = new Audio("/sounds/upclick.mp3");

downClick.preload = "auto";
upClick.preload = "auto";

function clearSoundtrackTimers() {
  if (fadeInterval) {
    clearInterval(fadeInterval);
    fadeInterval = null;
  }

  if (transitionTimeout) {
    clearTimeout(transitionTimeout);
    transitionTimeout = null;
  }
}

function ensureSoundtrackAudio() {
    if (!soundtrackHasStartedOnce) {
    soundtrackIndex = Math.floor(Math.random() * SOUNDTRACK_FILES.length);
    soundtrackHasStartedOnce = true;
  }
  if (soundtrackAudio) return soundtrackAudio;

  soundtrackAudio = new Audio(SOUNDTRACK_FILES[soundtrackIndex]);
  soundtrackAudio.preload = "auto";
  soundtrackAudio.loop = false;
  soundtrackAudio.volume = 0;
  soundtrackAudio.muted = !soundEnabled;

  soundtrackAudio.addEventListener("ended", () => {
    playNextSoundtrackTrack();
  });

  return soundtrackAudio;
}

function fadeAudioTo(audio, targetVolume, durationMs, onComplete) {
  clearSoundtrackTimers();

  const startVolume = audio.volume;
  const steps = Math.max(1, Math.round(durationMs / SOUNDTRACK_FADE_STEP_MS));
  const delta = (targetVolume - startVolume) / steps;

  let currentStep = 0;

  fadeInterval = setInterval(() => {
    currentStep += 1;

    const nextVolume =
      currentStep >= steps ? targetVolume : startVolume + delta * currentStep;

    audio.volume = Math.max(0, Math.min(SOUNDTRACK_TARGET_VOLUME, nextVolume));

    if (currentStep >= steps) {
      clearInterval(fadeInterval);
      fadeInterval = null;
      if (onComplete) onComplete();
    }
  }, SOUNDTRACK_FADE_STEP_MS);
}

function playCurrentSoundtrackTrack() {
  if (!soundEnabled) return;

  const audio = ensureSoundtrackAudio();
  audio.src = SOUNDTRACK_FILES[soundtrackIndex];
  audio.currentTime = 0;
  audio.volume = 0;
  audio.muted = false;

  const p = audio.play();
  if (p && typeof p.catch === "function") {
    p.then(() => {
      fadeAudioTo(audio, SOUNDTRACK_TARGET_VOLUME, SOUNDTRACK_FADE_MS);
    }).catch(() => {});
    return;
  }

  fadeAudioTo(audio, SOUNDTRACK_TARGET_VOLUME, SOUNDTRACK_FADE_MS);
}

function playNextSoundtrackTrack() {
  const audio = ensureSoundtrackAudio();

  fadeAudioTo(audio, 0, SOUNDTRACK_FADE_MS, () => {
    soundtrackIndex = (soundtrackIndex + 1) % SOUNDTRACK_FILES.length;
    playCurrentSoundtrackTrack();
  });
}

export function startSoundtrack() {
  soundtrackStarted = true;

  if (!soundtrackAudio) {
    soundtrackIndex = Math.floor(Math.random() * SOUNDTRACK_FILES.length);
    soundtrackHasStartedOnce = true;
  }

  playCurrentSoundtrackTrack();
}

export function stopSoundtrack() {
  soundtrackStarted = false;

  if (!soundtrackAudio) return;

  const audio = soundtrackAudio;

  fadeAudioTo(audio, 0, SOUNDTRACK_FADE_MS, () => {
    audio.pause();
    audio.currentTime = 0;
    soundtrackAudio = null;
  });
}

export function setSoundEnabled(enabled) {
  soundEnabled = enabled;

  // HARD mute/unmute the audio elements
  downClick.muted = !enabled;
  upClick.muted = !enabled;

  if (soundtrackAudio) {
    soundtrackAudio.muted = !enabled;
  }

  if (!enabled) {
    stopSoundtrack();
  } else if (soundtrackStarted) {
    startSoundtrack();
  }
}

export function isSoundEnabled() {
  return soundEnabled;
}

export function playDownClick() {
    console.log("playDownClick called");
  if (!soundEnabled) return;

  downClick.currentTime = 0;
  const p = downClick.play();
  if (p && typeof p.catch === "function") p.catch(() => {});
}

export function playUpClick() {
    console.log("playUpClick called");
  if (!soundEnabled) return;

  upClick.currentTime = 0;
  const p = upClick.play();
  if (p && typeof p.catch === "function") p.catch(() => {});
}
