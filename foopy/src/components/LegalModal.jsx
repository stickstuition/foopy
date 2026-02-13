import { createPortal } from "react-dom";

export default function LegalModal({ type, onClose }) {
  return createPortal(
    <div
      style={overlay}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div style={modal} onMouseDown={(e) => e.stopPropagation()}>
        <div style={header}>
          <div style={title}>
            {type === "privacy" ? "Privacy Policy" : "Terms of Service"}
          </div>
          <button style={closeBtn} onClick={onClose}>✕</button>
        </div>

        <div style={content}>
          {type === "privacy" ? <PrivacyText /> : <TermsText />}
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}

/* ================= PRIVACY ================= */

function PrivacyText() {
  return (
    <>
      <p>
        Foopy collects basic account information including username,
        email address, and encrypted password.
      </p>

      <p>
        Gameplay data such as scores, coins, badges, and match history
        is stored to provide game functionality and leaderboards.
      </p>

      <p>
        Foopy does not sell user data. Data is used solely to operate
        and improve the game experience.
      </p>

      <p>
        Cookies are used to maintain login sessions securely.
      </p>

      <p>
        Users may request account deletion at any time via the Settings page.
      </p>

      <p style={{ opacity: 0.7 }}>
        Contact: foopygame@gmail.com
      </p>
    </>
  );
}

/* ================= TERMS ================= */

function TermsText() {
  return (
    <>
      <p>
        Foopy is an independently developed educational game.
        It is not affiliated with the AFL or its clubs.
      </p>

      <p>
        By using Foopy, you agree not to exploit, abuse, or attempt
        to manipulate gameplay systems including scoring or coins.
      </p>

      <p>
        Accounts engaging in cheating, offensive usernames,
        or abusive behaviour may be suspended.
      </p>

      <p>
        Foopy is provided "as is" without warranties of any kind.
      </p>

      <p>
        Continued use of the platform constitutes agreement
        to these terms.
      </p>
    </>
  );
}

/* ================= STYLES ================= */

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 10000
};

const modal = {
  width: "min(800px, 94vw)",
  height: "70vh",
  background: "linear-gradient(180deg, #262626 0%, #151515 100%)",
  borderRadius: 18,
  boxShadow: "0 20px 70px rgba(0,0,0,0.7)",
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

const content = {
  flex: 1,
  overflow: "auto",
  padding: 20,
  color: "#eaeaea",
  lineHeight: 1.6
};
