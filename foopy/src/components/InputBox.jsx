import { useEffect, useState, useRef } from "react";
import Autocomplete from "./Autocomplete";

export default function InputBox({
  value,
  onChange,
  onSubmit,
  suggestions,
  onSelectSuggestion,
  onSkip,
  resultFlash
}) {
  const [skipFlash, setSkipFlash] = useState(false);
  const [errorFlash, setErrorFlash] = useState(false);

  const inputRef = useRef(null);

  // Auto-focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // React to game result (wrong answer only)
  useEffect(() => {
    if (resultFlash !== "wrong") return;

    setErrorFlash(true);
    const t = setTimeout(() => setErrorFlash(false), 200);
    return () => clearTimeout(t);
  }, [resultFlash]);

  // Keyboard controls
  useEffect(() => {
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
  }, [value, suggestions, onSubmit, onSelectSuggestion, onSkip]);

  return (
    <div
      style={{
        width: 360,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        position: "relative"
      }}
    >
      <input
        ref={inputRef}
        value={value}
        placeholder="Enter player name"
        onChange={e => onChange(e.target.value)}
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

      {/* Floating autocomplete */}
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
          <Autocomplete
            suggestions={suggestions}
            onSelect={onSelectSuggestion}
          />
        </div>
      )}

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

      {onSkip && (
        <button
          onClick={onSkip}
          style={{
            ...skipStyle,
            background: skipFlash ? "#b6f5c9" : "#d9d9d9"
          }}
        >
          SKIP (CTRL)
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
