import { useState } from "react";
import { useAuth } from "./AuthContext";
import ForgotPasswordModal from "./ForgotPasswordModal";
import loginVideo from "../assets/loginpagevideo.mp4";

export default function LoginGate() {
  const { login, register } = useAuth();

  const [mode, setMode] = useState("login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [forgotOpen, setForgotOpen] = useState(false);

  async function handleSubmit() {
    setError("");

    try {
      if (mode === "login") {
        await login(username, password);
      } else {
        if (!email) {
          setError("Email is required");
          return;
        }
        if (password.length < 8) {
          setError("Password must be at least 8 characters");
          return;
        }
        await register(username, password, email);
      }
    } catch {
      setError("Invalid details. Please try again.");
    }
  }

  return (
    <>
      {/* Auth background video – fills GamePanel */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={authVideo}
      >
        <source src={loginVideo} type="video/mp4" />
      </video>

      {/* Centered auth content */}
      <div style={wrap}>
        <div style={form}>
          <img src="/assets/foopy-logo.png" alt="Foopy" style={logo} />

          <h2 style={title}>
            {mode === "login" ? "Log in" : "Create Account"}
          </h2>

          <input
            style={input}
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          {mode === "register" && (
            <input
              style={input}
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          )}

          <input
            style={input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <div style={errorStyle}>{error}</div>}

          <button style={primaryButton} onClick={handleSubmit}>
            {mode === "login" ? "Log In" : "Create Account"}
          </button>

          <button
            style={secondaryButton}
            onClick={() => {
              setMode(mode === "login" ? "register" : "login");
              setError("");
            }}
          >
            {mode === "login"
              ? "Create account"
              : "Already have an account?"}
          </button>

          {mode === "login" && (
            <button
              onClick={() => setForgotOpen(true)}
              style={forgotButton}
            >
              Forgot password?
            </button>
          )}
        </div>
      </div>

      {forgotOpen && (
        <ForgotPasswordModal onClose={() => setForgotOpen(false)} />
      )}
    </>
  );
}

/* ---------- Styles ---------- */

const authVideo = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  opacity: 0.22,
  zIndex: 0,
  pointerEvents: "none",
  filter: "blur(1.5px)"
};

const wrap = {
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  zIndex: 1
};

const form = {
  width: 420,
  display: "flex",
  flexDirection: "column",
  gap: 18,
  textAlign: "center"
};

const logo = {
  width: 280,
  margin: "0 auto 0px"
};

const title = {
  color: "#ffffff",
  fontSize: 22,
  marginBottom: 6
};

const input = {
  height: 58,
  borderRadius: 16,
  border: "none",
  padding: "0 18px",
  fontSize: 18,
  outline: "none",
  background: "#eaf4ff"
};

const primaryButton = {
  marginTop: 6,
  height: 58,
  borderRadius: 18,
  border: "none",
  fontSize: 18,
  fontWeight: 600,
  cursor: "pointer",
  background: "linear-gradient(to bottom, #5ad0ff, #1e88e5)",
  color: "#ffffff",
  boxShadow: "0 4px 0 rgba(0,0,0,0.35)"
};

const secondaryButton = {
  background: "transparent",
  border: "none",
  color: "#cfe9ff",
  cursor: "pointer",
  fontSize: 14,
  textDecoration: "underline"
};

const forgotButton = {
  marginTop: 8,
  fontSize: 13,
  opacity: 0.7,
  background: "none",
  border: "none",
  color: "#cfe9ff",
  cursor: "pointer",
  textDecoration: "underline"
};

const errorStyle = {
  color: "#ffd6d6",
  fontSize: 14
};
