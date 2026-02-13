import { useState } from "react";
import { API_URL } from "../config/api";

export default function ForgotPasswordModal({ onClose }) {
  const [step, setStep] = useState("request"); // request | reset
  const [identifier, setIdentifier] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [serverToken, setServerToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function requestReset() {
  if (!identifier || loading) return;

  setLoading(true);
  setError("");

  try {
    const res = await fetch(`${API_URL}/auth/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier })
    });

    await res.json(); // response is intentionally generic
    setStep("reset");
  } catch {
    setError("Something went wrong. Try again.");
  }

  setLoading(false);
}

async function resetPassword() {
  if (!resetToken || !newPassword || loading) return;

  setLoading(true);
  setError("");

  try {
    const res = await fetch(`${API_URL}/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: resetToken,
        newPassword
      })
    });

    const data = await res.json();

    if (!data.ok) {
      setError(data.error || "Invalid or expired token");
      setLoading(false);
      return;
    }

    onClose();
    alert("Password reset successful. Please log in again.");
  } catch {
    setError("Reset failed. Try again.");
  }

  setLoading(false);
}

  return (
    <div style={overlay} onClick={onClose}>
      <div style={modal} onClick={e => e.stopPropagation()}>
        <h3 style={title}>Reset password</h3>

        {step === "request" && (
          <>
            <p style={subtext}>Enter your username or email.</p>

            <input
              style={input}
              value={identifier}
              onChange={e => setIdentifier(e.target.value)}
              placeholder="Username or email"
            />

            {error && <div style={errorStyle}>{error}</div>}

            <button style={button} onClick={requestReset} disabled={loading}>
              {loading ? "Sending…" : "Send reset email"}
            </button>
          </>
        )}

        {step === "reset" && (
          <>
            <p style={subtext}>
              Enter the reset token from your email and choose a new password.
            </p>

            {serverToken && (
              <div style={tokenBox}>
                <div style={tokenLabel}>Reset token</div>
                <div style={token}>{serverToken}</div>
              </div>
            )}

            <input
              style={input}
              value={resetToken}
              onChange={e => setResetToken(e.target.value)}
              placeholder="Reset token"
            />

            <input
              style={input}
              type="password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              placeholder="New password (min 8 chars)"
            />

            {error && <div style={errorStyle}>{error}</div>}

            <button style={button} onClick={resetPassword} disabled={loading}>
              {loading ? "Resetting…" : "Reset password"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/* ---------- Styles ---------- */

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.65)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999
};

const modal = {
  width: 360,
  padding: 22,
  background: "linear-gradient(180deg, #1b1f24, #14181d)",
  borderRadius: 18,
  boxShadow:
    "0 20px 50px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)",
  color: "#fff",
  boxSizing: "border-box"
};

const title = {
  margin: 0,
  textAlign: "center"
};

const subtext = {
  fontSize: 13,
  color: "#a0a7b3",
  margin: "10px 0 12px"
};

const input = {
  width: "100%",
  padding: "12px 14px",
  marginBottom: 12,
  borderRadius: 12,
  border: "none",
  background: "#0f1318",
  color: "#fff",
  fontSize: 14,
  boxSizing: "border-box",
  boxShadow:
    "inset 0 2px 6px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.05)"
};

const button = {
  width: "100%",
  padding: 12,
  marginTop: 6,
  borderRadius: 14,
  border: "none",
  background: "linear-gradient(180deg, #3b82ff, #1f5fff)",
  color: "#fff",
  fontWeight: 700,
  fontSize: 14,
  cursor: "pointer",
  boxShadow:
    "0 6px 0 #163fbf, 0 12px 20px rgba(0,0,0,0.4)"
};

const tokenBox = {
  background: "#0f1318",
  borderRadius: 12,
  padding: 12,
  marginBottom: 12,
  boxShadow:
    "inset 0 2px 6px rgba(0,0,0,0.6)"
};

const tokenLabel = {
  fontSize: 12,
  color: "#7d8794",
  marginBottom: 6
};

const token = {
  fontFamily: "monospace",
  fontSize: 13,
  wordBreak: "break-all",
  color: "#e5e7eb"
};

const errorStyle = {
  color: "#ffb3b3",
  fontSize: 13,
  marginBottom: 10
};
