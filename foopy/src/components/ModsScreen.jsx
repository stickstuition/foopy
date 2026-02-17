import { useMemo, useState, useEffect } from "react";
import teams from "../engine/players";
import { useAuth } from "../auth/AuthContext";
import { playDownClick, playUpClick } from "../utils/uiSounds";

import { useMemo, useState, useEffect } from "react";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 720);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 720);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return isMobile;
}


/* ---------- TEAM LOGOS ---------- */

const teamLogos = {
  ADE: "/logos/AdelaideCrows.webp",
  BRI: "/logos/BrisbaneLions.webp",
  CAR: "/logos/Carlton.webp",
  COL: "/logos/Collingwood.webp",
  ESS: "/logos/Essendon.webp",
  FRE: "/logos/Fremantle.webp",
  GEE: "/logos/Geelong.webp",
  GCS: "/logos/GCSuns.webp",
  GWS: "/logos/GWS.webp",
  HAW: "/logos/Hawthorn.webp",
  MEL: "/logos/Melbourne.webp",
  NM: "/logos/North_Melbourne.webp",
  PA: "/logos/PortAdelaide.webp",
  RIC: "/logos/Richmond.webp",
  STK: "/logos/StKildaFC.webp",
  SYD: "/logos/SydneySwans.webp",
  WCE: "/logos/West_Coast.webp",
  WB: "/logos/Western_Bulldogs.webp"
};

/* ---------- CONSTANTS ---------- */

const TEAM_MAX = 2.5;
const Q_MED = 1.0;
const Q_HARD = 2.0;
const P_MED = 0.5;
const P_HARD = 1.0;
const NO_NAMES = 0.4;
const NO_NUMBERS = 0.8;

function withClickSound(onClick, disabled = false) {
  let pressed = false;

  return disabled
    ? {}
    : {
        onMouseDown: () => {
          pressed = true;
          playDownClick(true);
        },
        onMouseUp: () => {
          if (pressed) {
            playUpClick(true);
            pressed = false;
          }
        },
        onMouseLeave: () => {
          if (pressed) {
            playUpClick(true);
            pressed = false;
          }
        },
        onClick
      };
}


/* ---------- MAIN ---------- */

export default function ModsScreen({ onStart }) {
  const isMobile = useIsMobile();
  const { user } = useAuth();
  const favouriteTeam = user?.favouriteTeam;
  const allTeams = Object.keys(teams);

  const [selectedTeams, setSelectedTeams] = useState([]);
const [questionDifficulty, setQuestionDifficulty] = useState("Medium");
const [playerDifficulty, setPlayerDifficulty] = useState("Medium");
  const [showNumbers, setShowNumbers] = useState(true);
  const [showNames, setShowNames] = useState(true);
  const [pulse, setPulse] = useState(false);
  const canUseEasyPlayers = selectedTeams.length >= 9;


  /* ---------- DEFAULT TEAM LOGIC (FINAL) ---------- */

  useEffect(() => {
    // Apply favourite team once it exists
    if (favouriteTeam && teams[favouriteTeam]) {
      setSelectedTeams((prev) =>
        prev.length === 0 ? [favouriteTeam] : prev
      );
      return;
    }

    // Safe fallback ONLY if nothing is selected
    if (allTeams.length > 0) {
      setSelectedTeams((prev) =>
        prev.length === 0 ? [allTeams[0]] : prev
      );
    }
  }, [favouriteTeam, allTeams]);

  function toggleTeam(team) {
    setSelectedTeams((prev) => {
      if (prev.includes(team)) {
        const next = prev.filter((t) => t !== team);
        return next.length === 0 ? prev : next;
      }
      return [...prev, team];
    });
  }
/* ---------- PLAYER DIFFICULTY GUARD ---------- */

useEffect(() => {
  if (playerDifficulty === "Easy" && !canUseEasyPlayers) {
    setPlayerDifficulty("Medium");
  }
}, [canUseEasyPlayers, playerDifficulty]);

  /* ---------- MULTIPLIER ---------- */

  const multiplierNumber = useMemo(() => {
    const teamCount = selectedTeams.length || 1;
    const teamBase = 1 + ((teamCount - 1) / 17) * TEAM_MAX;

    let skillBonus = 0;
    if (questionDifficulty === "Medium") skillBonus += Q_MED;
    if (questionDifficulty === "Hard") skillBonus += Q_HARD;
    if (playerDifficulty === "Medium") skillBonus += P_MED;
    if (playerDifficulty === "Hard") skillBonus += P_HARD;

    const skillScaled = skillBonus * (teamBase / 3);

    let riskBonus = 0;
    if (!showNames) riskBonus += NO_NAMES;
    if (!showNumbers) riskBonus += NO_NUMBERS;

    return Math.min(8, Number((teamBase + skillScaled + riskBonus).toFixed(2)));
  }, [
    selectedTeams,
    questionDifficulty,
    playerDifficulty,
    showNames,
    showNumbers
  ]);

  const multiplierLabel = multiplierNumber.toFixed(1);

  useEffect(() => {
    setPulse(true);
    const t = setTimeout(() => setPulse(false), 160);
    return () => clearTimeout(t);
  }, [multiplierNumber]);

  function getMultiplierColor(mult) {
    if (mult < 1.5) return "#4CAF50";
    if (mult < 2.2) return "#9CCC65";
    if (mult < 3.0) return "#FFEB3B";
    if (mult < 4.0) return "#FF9800";
    return "#F44336";
  }

  function handleStart() {
    onStart({
      selectedTeams,
      questionDifficulty,
      playerDifficulty,
      showNumbers,
      showNames,
      multiplier: multiplierNumber
    });
  }

return (
  <div
    style={{
      ...styles.page,
      height: isMobile ? "auto" : "100%",
      overflowY: isMobile ? "auto" : "hidden",
      paddingBottom: isMobile ? 24 : 20
    }}
  >
    <h1 style={styles.title}>Game Options</h1>


      {/* ---------- TEAMS ---------- */}
      <div style={styles.panel}>
        <div style={styles.panelHeader}>
          <div style={styles.panelHeaderTitle}>Teams</div>
          <div style={styles.panelHeaderActions}>
            <button
  style={styles.smallButton}
  {...withClickSound(() => setSelectedTeams(allTeams))}
>
  Select All
</button>

<button
  style={styles.smallButton}
  {...withClickSound(() => setSelectedTeams([]))}
>
  Unselect All
</button>

          </div>
        </div>

<div
  style={{
    ...styles.teamGrid,
    gridTemplateColumns: isMobile ? "repeat(4, 1fr)" : "repeat(9, 1fr)",
    maxHeight: isMobile ? "none" : 122,
    overflow: isMobile ? "visible" : "hidden"
  }}
>
  {allTeams.map((team) => {

            const active = selectedTeams.includes(team);
            return (
              <div
  key={team}
  {...withClickSound(() => toggleTeam(team))}
  style={{
    ...styles.teamButton,
    ...(active ? styles.teamButtonActive : {})
  }}
>

                <img
                  src={teamLogos[team]}
                  alt={team}
                  style={{
                    ...styles.teamLogo,
                    ...(active ? styles.teamLogoActive : {})
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* ---------- MODIFICATIONS ---------- */}
      <div style={styles.panel}>
        <div style={styles.panelHeader}>
          <div style={styles.panelHeaderTitle}>Modifications</div>
        </div>

<div
  style={{
    ...styles.modsRow,
    gridTemplateColumns: isMobile
      ? "1fr"
      : "1.3fr 1.3fr 1fr 1fr 1.2fr",
    gap: isMobile ? 14 : 18
  }}
>

          <ModColumn
            title="Question Difficulty"
            value={questionDifficulty}
            onChange={setQuestionDifficulty}
          />
          <PlayerDifficultyColumn
  value={playerDifficulty}
  onChange={setPlayerDifficulty}
  canUseEasy={canUseEasyPlayers}
/>
          <ToggleColumn
            title="Show Numbers"
            value={showNumbers}
            onToggle={() => setShowNumbers((v) => !v)}
          />
          <ToggleColumn
            title="Show Names"
            value={showNames}
            onToggle={() => setShowNames((v) => !v)}
          />

<div
  style={{
    ...styles.actionCol,
    flexDirection: isMobile ? "row" : "column",
    alignItems: "center"
  }}
>

<div
  style={{
    ...styles.multiplierBox,
    background: getMultiplierColor(multiplierNumber),
    transform: pulse ? "scale(1.05)" : "scale(1)",
    width: isMobile ? "60%" : "100%"
  }}
>

              <div style={styles.multiplierInner}>
                <div style={styles.coinIcon}>🪙</div>
                <div>
                  <div style={styles.multiplierLabel}>COIN MULTIPLIER</div>
                  <div style={styles.multiplierValue}>×{multiplierLabel}</div>
                </div>
              </div>
            </div>

            <button
  style={styles.startButton}
  {...withClickSound(handleStart)}
>
  START
</button>

          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- SUB COMPONENTS ---------- */

function ModColumn({ title, value, onChange }) {
  return (
    <div style={styles.modCol}>
      <div style={styles.modTitle}>{title}</div>
      {["Easy", "Medium", "Hard"].map((opt) => (
        <button
  key={opt}
  {...withClickSound(() => onChange(opt))}
  style={{
    ...styles.modButton,
    ...(value === opt ? styles.modButtonActive : {})
  }}
>
  {opt}
</button>

      ))}
    </div>
  );
}

function PlayerDifficultyColumn({ value, onChange, canUseEasy }) {
  return (
    <div style={styles.modCol}>
      <div style={styles.modTitle}>Player Difficulty</div>

      {["Easy", "Medium", "Hard"].map((opt) => {
        const disabled = opt === "Easy" && !canUseEasy;

        return (
          <button
  key={opt}
  disabled={disabled}
  {...withClickSound(
    () => !disabled && onChange(opt),
    disabled
  )}
  style={{
    ...styles.modButton,
    ...(value === opt ? styles.modButtonActive : {}),
    ...(disabled ? { opacity: 0.4, cursor: "not-allowed" } : {})
  }}
>
  {opt}
</button>

        );
      })}
    </div>
  );
}


function ToggleColumn({ title, value, onToggle }) {
  return (
    <div style={styles.modCol}>
      <div style={styles.modTitle}>{title}</div>
      <button
  {...withClickSound(onToggle)}
  style={{
    ...styles.modButton,
    ...(value ? styles.onButton : styles.offButton)
  }}
>
  {value ? "On" : "Off"}
</button>

    </div>
  );
}

/* ---------- STYLES ---------- */

const styles = {
  page: {
    width: "100%",
    height: "100vh",
    padding: 20,
    boxSizing: "border-box",
    overflow: "hidden"
  },
  title: {
    margin: "4px 0 10px",
    textAlign: "center",
    fontSize: 38,
    color: "#d81b24"
  },
  panel: {
    border: "2px solid #c7c7c7",
    borderRadius: 12,
    background: "#dedede",
    padding: 14,
    marginBottom: 14
  },
  panelHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 8
  },
  panelHeaderTitle: {
    color: "#d81b24",
    fontSize: 20,
    fontWeight: 700
  },
  panelHeaderActions: {
    display: "flex",
    gap: 8
  },
  smallButton: {
    padding: "6px 10px",
    borderRadius: 8,
    border: "1px solid #999",
    background: "#fff",
    cursor: "pointer"
  },
  teamGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(9, 1fr)",
    gridAutoRows: 56,
    gap: 10,
    maxHeight: 122,
    overflow: "hidden"
  },
teamButton: {
  width: "100%",
  height: "100%",
  borderRadius: 10,
  border: "2px solid #999",
  background: "#f7f7f7",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  boxSizing: "border-box"
},
  teamButtonActive: {
    border: "2px solid #d81b24",
    background: "#fff"
  },
teamLogo: {
  maxWidth: "70%",
  maxHeight: "70%",
  width: "auto",
  height: "auto",
  objectFit: "contain",
  filter: "grayscale(100%)",
  opacity: 0.8
},
  teamLogoActive: {
    filter: "none",
    opacity: 1
  },
  modsRow: {
    display: "grid",
    gridTemplateColumns: "1.3fr 1.3fr 1fr 1fr 1.2fr",
    gap: 18
  },
  modCol: {
    display: "flex",
    flexDirection: "column",
    gap: 8
  },
  modTitle: {
    fontSize: 12,
    fontWeight: 700,
    textAlign: "center"
  },
  modButton: {
    height: 40,
    borderRadius: 10,
    border: "2px solid #999",
    background: "#f7f7f7",
    cursor: "pointer",
    fontWeight: 700
  },
  modButtonActive: {
    border: "4px solid #222"
  },
  onButton: {
    background: "#7CB342"
  },
  offButton: {
    background: "#c62828",
    color: "#fff"
  },
  actionCol: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    justifyContent: "center"
  },
  multiplierBox: {
    height: 60,
    borderRadius: 18,
    border: "5px solid #111",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "transform 0.15s ease"
  },
  multiplierInner: {
    display: "flex",
    alignItems: "center",
    gap: 12
  },
  coinIcon: {
    fontSize: 30,
    filter: "drop-shadow(0 2px 0 rgba(0,0,0,0.35))"
  },
  multiplierLabel: {
    fontSize: 11,
    fontWeight: 900
  },
  multiplierValue: {
    fontSize: 30,
    fontWeight: 900
  },
  startButton: {
    height: 44,
    borderRadius: 10,
    border: "2px solid #222",
    background: "#d81b24",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 800,
    fontSize: 16
  }
};
