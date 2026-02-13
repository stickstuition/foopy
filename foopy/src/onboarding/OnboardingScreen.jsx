import { useState } from "react";
import { API_URL } from "../config/api";

/* ---------- Options ---------- */

const AGE_OPTIONS = [
  { value: "u13", label: "Under 13" },
  { value: "13-17", label: "13–17" },
  { value: "18+", label: "18+" }
];

const STATE_OPTIONS = [
  "VIC",
  "NSW",
  "QLD",
  "SA",
  "WA",
  "TAS",
  "ACT",
  "NT"
];

/*
  Team codes must match:
  - engine teams object
  - backend onboarding payload
  - logo filenames in /public/logos
*/
const TEAM_OPTIONS = [
  { code: "ADE", logo: "AdelaideCrows.webp" },
  { code: "BRI", logo: "BrisbaneLions.webp" },
  { code: "CAR", logo: "Carlton.webp" },
  { code: "COL", logo: "Collingwood.webp" },
  { code: "ESS", logo: "Essendon.webp" },
  { code: "FRE", logo: "Fremantle.webp" },
  { code: "GEE", logo: "Geelong.webp" },
  { code: "GCS", logo: "GCSuns.webp" },
  { code: "GWS", logo: "GWS.webp" },
  { code: "HAW", logo: "Hawthorn.webp" },
  { code: "MEL", logo: "Melbourne.webp" },
  { code: "NTH", logo: "North_Melbourne.webp" },
  { code: "PTA", logo: "PortAdelaide.webp" },
  { code: "RIC", logo: "Richmond.webp" },
  { code: "STK", logo: "StKildaFC.webp" },
  { code: "SYD", logo: "SydneySwans.webp" },
  { code: "WBD", logo: "Western_Bulldogs.webp" },
  { code: "WCE", logo: "West_Coast.webp" }
];

export default function OnboardingScreen() {
  const [ageRange, setAgeRange] = useState("");
  const [state, setState] = useState("");
  const [favouriteTeam, setFavouriteTeam] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = ageRange && state && favouriteTeam && !submitting;

  async function handleSubmit() {
    if (!canSubmit) return;

    setSubmitting(true);

   try {
  const res = await fetch(`${API_URL}/auth/onboarding`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      ageRange,
      state,
      favouriteTeam
    })
  });


      if (!res.ok) throw new Error("Onboarding failed");

      // Re-run AuthContext → /auth/me
      window.location.reload();
    } catch (err) {
      console.error(err);
      setSubmitting(false);
    }
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div
        style={{
          width: 880,
          maxWidth: "95%",
          background: "#fff",
          borderRadius: 20,
          padding: 36,
          boxShadow: "0 14px 44px rgba(0,0,0,0.18)"
        }}
      >
        {/* ---------- Two-column layout ---------- */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.4fr",
            gap: 36,
            alignItems: "center"
          }}
        >
          {/* ---------- LEFT COLUMN ---------- */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <h2 style={{ marginBottom: 6 }}>Welcome to Foopy</h2>
            <p style={{ marginBottom: 28, opacity: 0.65 }}>
              Let’s set up your profile and claim your first badge.
            </p>

            {/* ---------- Age Range ---------- */}
            <label style={{ marginBottom: 10 }}>Age range</label>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 10,
                marginBottom: 24
              }}
            >
              {AGE_OPTIONS.map((opt) => {
                const selected = ageRange === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => setAgeRange(opt.value)}
                    style={{
                      padding: "12px 0",
                      borderRadius: 12,
                      border: selected
                        ? "3px solid #000"
                        : "2px solid transparent",
                      background: selected ? "#eaeaea" : "#f5f5f5",
                      cursor: "pointer",
                      fontWeight: 600,
                      transition: "all 0.15s ease"
                    }}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>

            {/* ---------- State ---------- */}
            <label style={{ marginBottom: 10 }}>State</label>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 10
              }}
            >
              {STATE_OPTIONS.map((s) => {
                const selected = state === s;
                return (
                  <button
                    key={s}
                    onClick={() => setState(s)}
                    style={{
                      padding: "12px 0",
                      borderRadius: 12,
                      border: selected
                        ? "3px solid #000"
                        : "2px solid transparent",
                      background: selected ? "#eaeaea" : "#f5f5f5",
                      cursor: "pointer",
                      fontWeight: 600,
                      transition: "all 0.15s ease"
                    }}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ---------- RIGHT COLUMN ---------- */}
          <div>
            <label style={{ display: "block", marginBottom: 14 }}>
              Favourite team
            </label>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 14
              }}
            >
              {TEAM_OPTIONS.map((team) => {
                const selected = favouriteTeam === team.code;

                return (
                  <button
                    key={team.code}
                    onClick={() => setFavouriteTeam(team.code)}
                    style={{
                      borderRadius: 8,
                      border: selected
                        ? "3px solid #000"
                        : "2px solid transparent",
                      background: "#f5f5f5",
                      padding: 6,
                      cursor: "pointer",
                      transition: "all 0.15s ease"
                    }}
                  >
                    <img
                      src={`/logos/${team.logo}`}
                      alt={team.code}
                      style={{
                        width: "100%",
                        height: 40,
                        objectFit: "contain",
                        filter: selected ? "none" : "grayscale(100%)",
                        opacity: selected ? 1 : 0.6
                      }}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ---------- SUBMIT ---------- */}
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          style={{
            width: "100%",
            marginTop: 36,
            padding: 18,
            borderRadius: 14,
            border: "none",
            background: canSubmit ? "#000" : "#aaa",
            color: "#fff",
            fontSize: 16,
            fontWeight: 600,
            cursor: canSubmit ? "pointer" : "not-allowed"
          }}
        >
          {submitting ? "Claiming badge…" : "Claim your badge"}
        </button>
      </div>
    </div>
  );
}