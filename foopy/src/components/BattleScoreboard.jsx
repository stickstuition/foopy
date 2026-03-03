// foopy/src/components/BattleScoreboard.jsx
import { BADGES } from "../engine/badges";
import useIsMobile from "../hooks/useIsMobile";

export default function BattleScoreboard({
  me,
  scores,
  profiles,
  singlePlayer,
  delta,

  // ✅ NEW (Option B)
  inline = false,
  compact = false
}) {
  const isMobile = useIsMobile(768);
  const opponentRole = me === "host" ? "guest" : "host";

  const myProfile = profiles?.[me] ?? null;
  const oppProfile = profiles?.[opponentRole] ?? null;

  const myName = myProfile?.username ?? "You";
  const oppName = oppProfile?.username ?? "Opponent";

  const myBadgeIcon = getBadgeIcon(myProfile);
  const oppBadgeIcon = getBadgeIcon(oppProfile);

  const showOpponentRow = !singlePlayer && !!oppProfile;

  // ✅ Desktop behaviour remains default unless inline=true is passed
  const useInline = inline || (compact && isMobile);

  return (
    <div style={useInline ? wrapInline : wrapAbs(isMobile)}>
      <Row
        label={myName}
        score={scores?.[me] ?? 0}
        badgeIcon={myBadgeIcon}
        emphasis
        delta={delta}
        compact={compact}
      />

      {showOpponentRow && !compact && (
        <Row
          label={oppName}
          score={scores?.[opponentRole] ?? 0}
          badgeIcon={oppBadgeIcon}
          compact={compact}
        />
      )}

      {/* ✅ Compact mode shows opponent on same line */}
      {showOpponentRow && compact && (
        <div style={compactVsRow}>
          <span style={compactVs}>vs</span>
          <Row
            label={oppName}
            score={scores?.[opponentRole] ?? 0}
            badgeIcon={oppBadgeIcon}
            compact={compact}
          />
        </div>
      )}
    </div>
  );
}

function getBadgeIcon(profile) {
  const raw = profile?.badgeEquipped;
  if (!raw) return null;

  const id = String(raw).toLowerCase().trim();
  const badge = BADGES[id] ?? null;

  return badge?.icon ?? null;
}

function Row({ label, score, badgeIcon, emphasis, delta = null, compact }) {
  return (
    <div style={{ ...rowBase, ...(compact ? rowCompact : rowNormal), ...(emphasis ? rowTop : null) }}>
      {badgeIcon ? (
        <img src={badgeIcon} alt="" style={compact ? badgeImgCompact : badgeImg} />
      ) : (
        <div style={compact ? badgeFallbackCompact : badgeFallback} />
      )}

      <div style={compact ? nameCompact : name}>{label}</div>

      <div style={scoreWrap}>
        <div style={compact ? scorePillCompact : scorePill}>{score}</div>

        {delta != null && !compact && (
          <div style={scoreDelta}>
            +{delta}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- styles ---------- */

// ✅ ORIGINAL absolute wrapper (unchanged behaviour)
const wrapAbs = (isMobile) => ({
  position: "absolute",
  left: isMobile ? "50%" : 24,
  bottom: isMobile ? "auto" : 24,
  top: isMobile ? 14 : "auto",
  transform: isMobile ? "translateX(-50%)" : "none",
  width: isMobile ? "calc(100% - 24px)" : 220,
  maxWidth: 360,
  zIndex: 20,

  // Mobile-only: display-only; never eat taps
  pointerEvents: isMobile ? "none" : "auto"
});

// ✅ NEW inline wrapper (for top bars, etc.)
const wrapInline = {
  position: "static",
  transform: "none",
  width: "auto",
  maxWidth: "none",
  zIndex: 1,
  pointerEvents: "none", // never block input taps
  display: "flex",
  alignItems: "center",
  gap: 8
};

const rowBase = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  background: "rgba(255,255,255,0.92)",
  borderRadius: 14,
  boxShadow: "0 10px 24px rgba(0,0,0,0.12)"
};

const rowNormal = {
  padding: "10px 12px",
  marginBottom: 10
};

const rowCompact = {
  padding: "8px 10px",
  marginBottom: 0
};

const rowTop = {
  border: "2px solid #111"
};

const badgeImg = {
  width: 28,
  height: 28,
  borderRadius: 999,
  objectFit: "cover"
};

const badgeFallback = {
  width: 28,
  height: 28,
  borderRadius: 999,
  background: "#bbb"
};

const badgeImgCompact = {
  width: 22,
  height: 22,
  borderRadius: 999,
  objectFit: "cover"
};

const badgeFallbackCompact = {
  width: 22,
  height: 22,
  borderRadius: 999,
  background: "#bbb"
};

const name = {
  flex: 1,
  fontWeight: 800,
  fontSize: 13,
  color: "#111",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis"
};

const nameCompact = {
  ...name,
  fontSize: 12,
  maxWidth: 120
};

const scoreWrap = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  position: "relative"
};

const scorePill = {
  minWidth: 34,
  height: 28,
  borderRadius: 999,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#111",
  color: "#fff",
  fontWeight: 900
};

const scorePillCompact = {
  ...scorePill,
  height: 24,
  minWidth: 30,
  fontSize: 12
};

const scoreDelta = {
  fontSize: 20,
  fontWeight: 900,
  color: "#2ecc71",
  animation: "scorePop 0.7s ease forwards"
};

const compactVsRow = {
  display: "flex",
  alignItems: "center",
  gap: 8
};

const compactVs = {
  fontWeight: 900,
  fontSize: 12,
  opacity: 0.6
};