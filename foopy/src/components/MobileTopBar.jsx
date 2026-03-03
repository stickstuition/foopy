import { BADGES } from "../engine/badges";

/**
 * Mobile-only top bar.
 * - Timed: pass singlePlayer=true (shows just "You" score)
 * - Online: pass both scores + names
 */
export default function MobileTopBar({
  singlePlayer = false,
  meLabel = "You",
  oppLabel = "Opponent",
  myScore = 0,
  oppScore = 0,
  myBadgeId = null,
  oppBadgeId = null,
  time = 0,
  delta = null
}) {
  const myBadge = myBadgeId ? BADGES[String(myBadgeId).toLowerCase()] : null;
  const oppBadge = oppBadgeId ? BADGES[String(oppBadgeId).toLowerCase()] : null;

  return (
    <div style={bar}>
      <div style={left}>
        <div style={pill}>
          <div style={who}>
            <div style={badge}>
              {myBadge?.icon ? (
                <img src={myBadge.icon} alt="" style={badgeImg} />
              ) : null}
            </div>

            <div style={name}>{meLabel}</div>
          </div>

          <div style={scoreWrap}>
            <div style={score}>{myScore}</div>
            {delta != null && <div style={deltaStyle}>+{delta}</div>}
          </div>
        </div>

        {!singlePlayer && (
          <div style={{ ...pill, opacity: 0.92 }}>
            <div style={who}>
              <div style={badge}>
                {oppBadge?.icon ? (
                  <img src={oppBadge.icon} alt="" style={badgeImg} />
                ) : null}
              </div>
              <div style={name}>{oppLabel}</div>
            </div>
            <div style={score}>{oppScore}</div>
          </div>
        )}
      </div>

      <div style={timerPill}>{time}</div>
    </div>
  );
}

/* styles */
const bar = {
  position: "absolute",
  top: 10,
  left: 10,
  right: 10,
  zIndex: 30,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 10,
  pointerEvents: "none" // never steals taps
};

const left = {
  display: "flex",
  gap: 10,
  alignItems: "center",
  pointerEvents: "none"
};

const pill = {
  height: 44,
  padding: "0 12px",
  borderRadius: 999,
  background: "rgba(255,255,255,0.92)",
  boxShadow: "0 10px 24px rgba(0,0,0,0.12)",
  display: "flex",
  alignItems: "center",
  gap: 10,
  pointerEvents: "none"
};

const who = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  minWidth: 0
};

const badge = {
  width: 26,
  height: 26,
  borderRadius: 999,
  background: "rgba(0,0,0,0.08)",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0
};

const badgeImg = {
  width: "100%",
  height: "100%",
  objectFit: "cover"
};

const name = {
  fontWeight: 900,
  fontSize: 13,
  color: "#111",
  maxWidth: 120,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap"
};

const scoreWrap = {
  display: "flex",
  alignItems: "center",
  gap: 6
};

const score = {
  minWidth: 34,
  height: 28,
  padding: "0 10px",
  borderRadius: 999,
  background: "#111",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 900,
  fontSize: 14
};

const deltaStyle = {
  fontWeight: 900,
  color: "#2ecc71",
  fontSize: 16
};

const timerPill = {
  width: 54,
  height: 54,
  borderRadius: 999,
  background: "#111",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 18,
  fontWeight: 900,
  boxShadow: "0 10px 24px rgba(0,0,0,0.18)",
  pointerEvents: "none"
};