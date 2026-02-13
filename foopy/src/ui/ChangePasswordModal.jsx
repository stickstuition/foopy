import { useState } from "react";
import { API_URL } from "../config/api";

export default function ChangePasswordModal({ onClose }) {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit() {
    if (!current || !next || next.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    setError("");

    try {
  const res = await fetch(`${API_URL}/auth/change-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      currentPassword: current,
      newPassword: next
    })
  });


      const data = await res.json();

      if (!data.ok) {
        setError(data.error || "Password change failed");
        setLoading(false);
        return;
      }

      onClose();
      alert("Password updated successfully.");
    } catch {
      setError("Something went wrong. Try again.");
    }

    setLoading(false);
  }

  return (
    <div style={overlay} onClick={onClose}>
      <div
        style={modal}
        onClick={e => e.stopPropagation()} // ⭐ THIS IS THE FIX
      >
        <h3 style={title}>Change password</h3>

        <input
          type="password"
          placeholder="Current password"
          value={current}
          onChange={e => setCurrent(e.target.value)}
          style={input}
        />

        <input
          type="password"
          placeholder="New password (min 8 chars)"
          value={next}
          onChange={e => setNext(e.target.value)}
          style={input}
        />

        {error && <div style={errorStyle}>{error}</div>}

        <div style={actions}>
          <button style={cancel} onClick={onClose}>
            Cancel
          </button>
          <button style={primary} onClick={submit} disabled={loading}>
            {loading ? "Updating…" : "Update password"}
          </button>
        </div>
      </div>
    </div>
  );
}

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1002
};

const modal = {
  background: "#1b1f26",
  color: "#eee",
  padding: 22,
  borderRadius: 16,
  width: 360,
  boxShadow: "0 20px 60px rgba(0,0,0,0.45)"
};

const title = {
  marginBottom: 12
};

const input = {
  width: "100%",
  padding: 10,
  marginTop: 10,
  borderRadius: 10,
  border: "none",
  background: "#111",
  color: "#eee"
};

const actions = {
  display: "flex",
  justifyContent: "flex-end",
  gap: 12,
  marginTop: 18
};

const primary = {
  padding: "10px 16px",
  borderRadius: 10,
  border: "none",
  background: "linear-gradient(180deg, #4a90ff, #2563eb)",
  color: "#fff",
  cursor: "pointer"
};

const cancel = {
  padding: "10px 16px",
  borderRadius: 10,
  border: "none",
  background: "#2a2f38",
  color: "#ddd",
  cursor: "pointer"
};

const errorStyle = {
  color: "#ffb3b3",
  fontSize: 13,
  marginTop: 8
};
