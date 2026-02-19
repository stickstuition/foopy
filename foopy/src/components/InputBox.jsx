import { useEffect, useState, useRef } from "react";
import Autocomplete from "./Autocomplete";
import useIsMobile from "../hooks/useIsMobile";

export default function InputBox({
  value,
  onChange,
  onSubmit,
  suggestions,
  onSelectSuggestion,
  onSkip,
  resultFlash
}) {
  const isMobile = useIsMobile();
  const [skipFlash, setSkipFlash] = useState(false);
  const [errorFlash, setErrorFlash] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // keep keyboard open on mobile
  useEffect(() => {
    if (!isMobile) return;
    const id = setInterval(() => {
      if (document.activeElement !== inputRef.current) {
        inputRef.current?.focus();
      }
    }, 350);
    return () => clearInterval(id);
  }, [isMobile]);

  useEffect(() => {
    if (resultFlash !== "wrong") return;
    setErrorFlash(true);
    const t = setTimeout(() => setErrorFlash(false), 200);
    return () => clearTimeout(t);
  }, [resultFlash]);

  // keyboard controls (desktop only)
  useEffect(() => {
    if (isMobile) return;

    function handleKey(e) {
      if (e.key === "Control" && onSkip) {
        setSkipFlash(true);
        onSkip();
        setTimeout(() => setSkipFlash(false), 150);
        return;
      }

      if (e.key === "Enter") {
        if (!value.trim()) {
          setErrorFlash(true);
          setTimeout(() => setErrorFlash(false), 200);
          return;
        }

        if (suggestions.length > 0) {
          onSelectSuggestion(suggestions[0].name);
        } else {
          onSubmit(value);
        }
      }
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isMobile, value, suggestions, onSubmit, onSelectSuggestion, onSkip]);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 360,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        paddingLeft: isMobile ? 12 : 0,
        paddingRight: isMobile ? 12 : 0
      }}
    >
<input
  ref={inputRef}
  value={value}
  placeholder="Enter player name"
  onChange={(e) => onChange(e.target.value)}
  onBlur={() => {
    if (!isMobile) return;
    setTimeout(() => inputRef.current?.focus(), 0);
  }}
  autoComplete="off"
  autoCorrect="off"
  autoCapitalize="off"
  spellCheck={false}
  inputMode="text"
  name="not-a-name"
  aria-autocomplete="none"
  style={{
    width: "100%",
    height: 46,
    padding: "0 14px",
    fontSize: 16,
    borderRadius: 10,
    border: errorFlash ? "2px solid #ff6b6b" : "1px solid #ccc",
    outline: "none",
    boxSizing: "border-box",
    transition: "border 0.15s"
  }}
/>


      {suggestions.length > 0 && (
        <div
          style={{
            position: "absolute",
            top: 52,
            left: 0,
            width: "100%",
            zIndex: 20
          }}
        >
          <Autocomplete suggestions={suggestions} onSelect={onSelectSuggestion} />
        </div>
      )}

      {/* Desktop only ENTER */}
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

      {/* Skip: remove (CTRL) on mobile */}
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
  height: 42,
  fontSize: 14,
  borderRadius: 10,
  cursor: "pointer",
  border: "none",
  transition: "background 0.15s"
};
