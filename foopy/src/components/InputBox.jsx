import { useEffect, useRef, useState } from "react";
import Autocomplete from "./Autocomplete";
import useIsMobile from "../hooks/useIsMobile";

export default function InputBox({
  value,
  onChange,
  onSubmit,
  suggestions,
  onSelectSuggestion,
  onSkip,
  resultFlash,
  disabled = false,
  autoFocusInput = false,
  suggestionsMaxHeight = 140,
  compactMobile = false,
  onInputFocus,
  onInputBlur
}) {
  const isMobile = useIsMobile(480);
  const [skipFlash, setSkipFlash] = useState(false);
  const [errorFlash, setErrorFlash] = useState(false);
  const inputRef = useRef(null);

  function submitFromInput(raw = value) {
    const trimmed = (raw ?? "").trim();
    if (disabled) return;

    if (!trimmed) {
      setErrorFlash(true);
      setTimeout(() => setErrorFlash(false), 200);
      return;
    }

    if (suggestions.length > 0) {
      onSelectSuggestion(suggestions[0].name);
    } else {
      onSubmit(trimmed);
    }
  }

  useEffect(() => {
    if (!autoFocusInput) return;

    const t = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 120);

    return () => window.clearTimeout(t);
  }, [autoFocusInput]);

  useEffect(() => {
    if (resultFlash !== "wrong") return;
    setErrorFlash(true);
    const t = setTimeout(() => setErrorFlash(false), 200);
    return () => clearTimeout(t);
  }, [resultFlash]);

  useEffect(() => {
    if (isMobile) return;

    function handleKey(e) {
      if (disabled) return;

      if (e.key === "Control" && onSkip) {
        setSkipFlash(true);
        onSkip();
        setTimeout(() => setSkipFlash(false), 150);
        return;
      }

      if (e.key === "Enter") {
        submitFromInput();
      }
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isMobile, disabled, value, suggestions, onSubmit, onSelectSuggestion, onSkip]);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: compactMobile ? 420 : 360,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        zIndex: isMobile ? 50 : "auto",
        pointerEvents: "auto",
        touchAction: "manipulation",
        paddingLeft: isMobile ? 12 : 0,
        paddingRight: isMobile ? 12 : 0,
        boxSizing: "border-box"
      }}
    >
      <input
        ref={inputRef}
        value={value}
        placeholder="Enter player"
        onChange={(e) => {
          if (disabled) return;
          onChange(e.target.value);
        }}
        onFocus={onInputFocus}
        onBlur={onInputBlur}
        onKeyDown={(e) => {
          if (!isMobile) return;
          if (e.key !== "Enter") return;
          e.preventDefault();
          submitFromInput();
        }}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        inputMode="text"
        enterKeyHint="done"
        aria-autocomplete="none"
        disabled={disabled}
        style={{
          width: "100%",
          height: compactMobile ? 48 : 42,
          padding: "0 14px",
          fontSize: 16,
          borderRadius: 12,
          border: errorFlash ? "2px solid #ff6b6b" : "1px solid #ccc",
          outline: "none",
          boxSizing: "border-box",
          transition: "border 0.15s",
          opacity: disabled ? 0.7 : 1,
          background: "#fff"
        }}
      />

      {suggestions.length > 0 && (
        <div
          style={{
            marginTop: 8,
            width: "100%"
          }}
        >
          <Autocomplete
            suggestions={suggestions}
            onSelect={onSelectSuggestion}
            maxHeight={suggestionsMaxHeight}
          />
        </div>
      )}

      {!isMobile && (
        <button
          onClick={() => {
            if (!value.trim()) {
              setErrorFlash(true);
              setTimeout(() => setErrorFlash(false), 200);
              return;
            }
            onSubmit(value);
          }}
          style={{
            ...buttonStyle,
            background: errorFlash ? "#ffd6d6" : "#111",
            color: errorFlash ? "#000" : "#fff"
          }}
        >
          ENTER
        </button>
      )}

      {onSkip && (
        <button
          onClick={() => {
            setSkipFlash(true);
            onSkip();
            setTimeout(() => setSkipFlash(false), 150);
          }}
          style={{
            ...skipStyle,
            background: skipFlash ? "#b6f5c9" : "#d9d9d9"
          }}
        >
          {isMobile ? "SKIP" : "SKIP (CTRL)"}
        </button>
      )}
    </div>
  );
}

const buttonStyle = {
  marginTop: 14,
  width: "100%",
  height: 48,
  fontSize: 16,
  borderRadius: 10,
  fontWeight: 700,
  cursor: "pointer",
  border: "none",
  transition: "background 0.15s"
};

const skipStyle = {
  marginTop: 8,
  width: "100%",
  height: 40,
  fontSize: 14,
  borderRadius: 10,
  cursor: "pointer",
  border: "none",
  transition: "background 0.15s",
  color: "#2f7df6"
};