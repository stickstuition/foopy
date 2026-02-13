import { useState } from "react";
import { createPortal } from "react-dom";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import ChangePasswordModal from "./ChangePasswordModal";
import { updates } from "../config/updates";
import { playDownClick, playUpClick } from "../utils/uiSounds";


export default function SettingsModal({ user, onClose, onLogout }) {
  const [tab, setTab] = useState("account");
  const [showDelete, setShowDelete] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  if (!user) return null;

  return createPortal(
    <div
  style={overlay}
  onMouseDown={(e) => {
    if (e.target === e.currentTarget) onClose();
  }}
>
      <div style={modal} onMouseDown={e => e.stopPropagation()}>
        {/* Header */}
        <div style={header}>
          <div style={title}>Settings</div>
          <button style={closeBtn} onClick={onClose}>✕</button>
        </div>

        {/* Tabs */}
        <div style={tabsRow}>
          <Tab active={tab === "account"} onClick={() => setTab("account")}>
            Account
          </Tab>
          <Tab active={tab === "about"} onClick={() => setTab("about")}>
            About
          </Tab>
          <Tab active={tab === "updates"} onClick={() => setTab("updates")}>
            Updates
          </Tab>
          <Tab active={tab === "legal"} onClick={() => setTab("legal")}>
            Terms
          </Tab>
          <Tab active={tab === "support"} onClick={() => setTab("support")}>
            Support
          </Tab>
        </div>

        {/* Content */}
        <div style={content}>
          {tab === "account" && (
            <>
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>

              <div style={actionsRow}>
                <button style={btn} onClick={() => setShowPassword(true)}>
                  Change password
                </button>
                <button style={dangerBtn} onClick={() => setShowDelete(true)}>
                  Delete account
                </button>
              </div>
            </>
          )}

          {tab === "about" && (
  <>
    <p>
      Foopy is an unlicensed, independently developed
      game. It does not represent or claim affiliation with the Australian Football League (AFL) or its affliated clubs. Sporting references are used purely
      as inspiration to create a learning environment that feels relevant
      and motivating.
    </p>

    <p>
      It was designed by a former mathematics teacher who saw first-hand
      how strongly students respond when learning connects to their
      interests. The goal is not to replace classroom learning, but to
      support it by making maths feel familiar. This game is dedicated to those students who made games like this so fun.
    </p>

    <p>
      <strong>Version:</strong> v0.1.0<br />
      © Foopy
    </p>
  </>
)}


          {tab === "updates" && (
  <div style={updatesWrap}>
    <div style={updatesCol}>
      <h4 style={updatesTitle}>Latest</h4>
      <ul>
        {updates.latest.map((u, i) => (
          <li key={i}>{u}</li>
        ))}
      </ul>
    </div>

    <div style={updatesCol}>
      <h4 style={updatesTitle}>Coming soon</h4>
      <ul>
        {updates.coming.map((u, i) => (
          <li key={i}>{u}</li>
        ))}
      </ul>
    </div>
  </div>
)}


{tab === "legal" && (
  <div style={{ lineHeight: 1.6 }}>
    <h3>Privacy Policy & Terms of Use</h3>

    <p><strong>Last updated:</strong> 12/02/2026</p>

    <h4>1. Overview</h4>
    <p>
      Foopy is an independently developed educational mathematics game.
      It is not affiliated with, endorsed by, or connected to the Australian
      Football League (AFL) or any AFL clubs, players, or organisations.
      Sporting references, names, and visual themes are used strictly for
      educational and motivational purposes.
    </p>

    <p>
      By using Foopy, you agree to the terms outlined below.
    </p>

    <h4>2. Educational Purpose</h4>
    <p>
      Foopy is designed to support mathematics learning through gamified
      interaction. All AFL-related assets, themes, or references are used
      as contextual learning tools to increase student engagement.
      Foopy does not claim ownership of third-party trademarks.
    </p>

    <h4>3. Data We Collect</h4>
    <p>Foopy stores limited data necessary to operate the game, including:</p>
    <ul>
      <li>Username</li>
      <li>Email address</li>
      <li>Encrypted password</li>
      <li>Gameplay statistics and progress</li>
      <li>Badge selections and preferences</li>
    </ul>

    <p>
      Passwords are securely hashed and never stored in plain text.
    </p>

    <h4>4. How We Use Data</h4>
    <p>Your data is used only to:</p>
    <ul>
      <li>Authenticate your account</li>
      <li>Save progress and statistics</li>
      <li>Display leaderboards and badges</li>
      <li>Improve gameplay experience</li>
    </ul>

    <p>
      Foopy does not sell personal data to third parties.
    </p>

    <h4>5. Advertising</h4>
    <p>
      Foopy may display advertisements to help keep the platform free.
      Advertisements are managed by third-party providers who may use
      cookies or similar technologies in accordance with their own policies.
    </p>

    <h4>6. Account Responsibility</h4>
    <p>
      Users are responsible for maintaining the confidentiality of their
      account credentials. Foopy is not liable for unauthorised access
      resulting from shared login details.
    </p>

    <h4>7. Acceptable Use</h4>
    <p>You agree not to:</p>
    <ul>
      <li>Use the platform for unlawful purposes</li>
      <li>Attempt to exploit bugs or manipulate gameplay systems</li>
      <li>Create offensive or inappropriate usernames</li>
      <li>Interfere with servers or other users</li>
    </ul>

    <h4>8. Intellectual Property</h4>
    <p>
      The Foopy game design, codebase, scoring systems, and original artwork
      are the intellectual property of Foopy.
    </p>

    <p>
      AFL team names, player names, and related marks remain the property
      of their respective owners. Their use within Foopy is contextual and
      educational only.
    </p>

    <h4>9. Account Deletion</h4>
    <p>
      Users may request deletion of their account at any time via the
      Settings panel. Upon deletion, account-related data will be removed
      from active systems.
    </p>

    <h4>10. Limitation of Liability</h4>
    <p>
      Foopy is provided on an "as is" basis without warranties of any kind.
      We are not liable for any loss of data, interruption of service,
      or indirect damages arising from use of the platform.
    </p>

    <h4>11. Updates to These Terms</h4>
    <p>
      These terms may be updated periodically. Continued use of Foopy
      after updates constitutes acceptance of the revised terms.
    </p>

    <h4>12. Contact</h4>
    <p>
      If you have concerns regarding privacy, data usage, or intellectual
      property, please contact:
    </p>

    <p><strong>foopygame@gmail.com</strong></p>

    <p style={{ opacity: 0.6, marginTop: 20 }}>
      © {new Date().getFullYear()} Foopy. All rights reserved.
    </p>
  </div>
)}


          {tab === "support" && (
            <>
              <p>Need help or want to report an issue?</p>
              <p><strong>foopygame@gmail.com</strong></p>
              <p style={{ opacity: 0.7 }}>
                Include your username if reporting a bug.
              </p>
            </>
          )}
        </div>
      </div>

      {showDelete && (
        <ConfirmDeleteModal
          onCancel={() => setShowDelete(false)}
          onConfirm={() => {
            setShowDelete(false);
            onLogout();
          }}
        />
      )}

      {showPassword && (
        <ChangePasswordModal onClose={() => setShowPassword(false)} />
      )}
    </div>,
    document.getElementById("modal-root")
  );
}

function Tab({ active, onClick, children }) {
  let pressed = false;

  return (
    <button
      onClick={onClick}
      onMouseDown={() => {
        pressed = true;
        playDownClick(true);
      }}
      onMouseUp={() => {
        if (pressed) {
          playUpClick(true);
          pressed = false;
        }
      }}
      onMouseLeave={() => {
        if (pressed) {
          playUpClick(true);
          pressed = false;
        }
      }}
      style={{
        ...tabBtn,
        ...(active ? tabBtnActive : null)
      }}
    >
      {children}
    </button>
  );
}


const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.55)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
  padding: 18
};

const modal = {
  width: "min(760px, 96vw)",
  height: "54vh",              // 👈 LOCK IT
  maxHeight: "54vh",
  minHeight: "54vh",
  background: "linear-gradient(180deg, #262626 0%, #151515 100%)",
  borderRadius: 18,
  boxShadow: "0 18px 60px rgba(0,0,0,0.6)",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  border: "1px solid rgba(255,255,255,0.06)"
};


const header = {
  padding: "16px 18px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "1px solid rgba(255,255,255,0.08)"
};

const title = {
  fontSize: 20,
  fontWeight: 800,
  color: "#f1f1f1"
};

const closeBtn = {
  border: "none",
  background: "transparent",
  color: "#e8e8e8",
  fontSize: 18,
  cursor: "pointer",
  padding: 8
};

const tabsRow = {
  display: "flex",
  gap: 10,
  padding: "12px 14px",
  borderBottom: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(0,0,0,0.25)"
};

const tabBtn = {
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.04)",
  color: "#eaeaea",
  padding: "10px 12px",
  borderRadius: 12,
  cursor: "pointer",
  fontWeight: 700
};

const tabBtnActive = {
  background: "rgba(255,255,255,0.12)",
  borderColor: "rgba(255,255,255,0.22)"
};

const content = {
  flex: 1,
  overflow: "auto",
  padding: 16,
  color: "#eaeaea"
};

const actionsRow = {
  display: "flex",
  gap: 12,
  marginTop: 16
};

const btn = {
  padding: "8px 12px",
  borderRadius: 10,
  border: "1px solid rgba(255,255,255,0.2)",
  background: "rgba(255,255,255,0.05)",
  color: "#eee",
  cursor: "pointer"
};

const dangerBtn = {
  ...btn,
  borderColor: "#c62828",
  color: "#ffb3b3"
};

const twoCol = {
  display: "flex",
  gap: 24,
  flexWrap: "wrap"
};

const updatesWrap = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  width: "100%",
  gap: 32
};

const updatesCol = {
  width: "45%"
};

const updatesTitle = {
  marginBottom: 8,
  fontSize: 14,
  fontWeight: 800,
  opacity: 0.9
};
