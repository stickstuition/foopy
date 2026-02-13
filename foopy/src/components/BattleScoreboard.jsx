// foopy/src/components/BattleScoreboard.jsx
import { BADGES } from "../engine/badges";

export default function BattleScoreboard({ me, scores, profiles, singlePlayer, delta }) {
  const opponentRole = me === "host" ? "guest" : "host";

  const myProfile = profiles?.[me] ?? null;
  const oppProfile = profiles?.[opponentRole] ?? null;

  const myName = myProfile?.username ?? "You";
  const oppName = oppProfile?.username ?? "Opponent";

  const myBadgeIcon = getBadgeIcon(myProfile);
  const oppBadgeIcon = getBadgeIcon(oppProfile);

  const showOpponentRow = !singlePlayer && !!oppProfile;

  return (
    <div style={wrap}>
      <Row
        label={myName}
        score={scores?.[me] ?? 0}
        badgeIcon={myBadgeIcon}
        emphasis
        delta={delta}
      />

      {showOpponentRow && (
        <Row
          label={oppName}
          score={scores?.[opponentRole] ?? 0}
          badgeIcon={oppBadgeIcon}
        />
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

function Row({ label, score, badgeIcon, emphasis, delta = null }) {
  return (
    <div style={{ ...row, ...(emphasis ? rowTop : null) }}>
      {badgeIcon ? (
        <img src={badgeIcon} alt="" style={badgeImg} />
      ) : (
        <div style={badgeFallback} />
      )}

      <div style={name}>{label}</div>
      <div style={scoreWrap}>
  <div style={scorePill}>{score}</div>

  {delta != null && (
    <div style={scoreDelta}>
      +{delta}
    </div>
  )}
</div>

    </div>
  );
}

/* ---------- styles ---------- */

const wrap = {
  position: "absolute",
  left: 24,
  bottom: 24,
  width: 220
};

const row = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  background: "rgba(255,255,255,0.92)",
  borderRadius: 14,
  padding: "10px 12px",
  boxShadow: "0 10px 24px rgba(0,0,0,0.12)",
  marginBottom: 10
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

const name = {
  flex: 1,
  fontWeight: 800,
  fontSize: 13,
  color: "#111",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis"
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
const scoreWrap = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  position: "relative"
};

const scoreDelta = {
  fontSize: 20,
  fontWeight: 900,
  color: "#2ecc71",
  animation: "scorePop 0.7s ease forwards"
};
