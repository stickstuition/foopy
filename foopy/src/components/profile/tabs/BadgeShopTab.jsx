// src/components/profile/tabs/BadgeShopTab.jsx
import { useState } from "react";
import { BADGE_LIST } from "../../../engine/badges";
import { useAuth } from "../../../auth/AuthContext";
import { API_URL } from "../../../config/api";

export default function BadgeShopTab() {
  const { user, refreshUser } = useAuth();

  const [errorFlashId, setErrorFlashId] = useState(null);
  const [purchaseFlashId, setPurchaseFlashId] = useState(null);

  if (!user) return null;

  return (
    <div style={wrap}>
      <div style={topLine}>
        <div style={heading}>Badges</div>
        <div style={coins}>🪙 {user.coins ?? 0} coins</div>
      </div>

      <div style={grid}>
        {BADGE_LIST.map((badge) => {
          const owned = user.badgesOwned?.includes(badge.id);
          const equipped = user.badgeEquipped === badge.id;

          const isChallenge = badge.unlock.method === "challenge";
          const isCoins = badge.unlock.method === "coins";

          const canBuy = isCoins && !owned;
          const canEquip = owned && !equipped;

          const isFullArt = badge.fullArt === true;

          return (
            <div
              key={badge.id}
              style={{
                ...card,
                ...(purchaseFlashId === badge.id ? purchaseFlash : null)
              }}
            >
              <div style={iconWrap}>
  <img
    src={badge.icon}
    alt={badge.name}
    style={{
      width: isFullArt ? "100%" : "70%",
      height: isFullArt ? "100%" : "70%",
      objectFit: isFullArt ? "cover" : "contain",
      opacity: isChallenge && !owned ? 0.35 : 1,
      transition: "all 0.15s ease"
    }}
  />
</div>

<div style={name}>{badge.name}</div>


              {equipped && <div style={pillEquipped}>Equipped</div>}

              {isChallenge && !owned && (
                <div style={pillLocked}>Locked, challenge</div>
              )}

              {canBuy && (
                <button
                  style={{
                    ...btn,
                    ...(errorFlashId === badge.id ? buyFlash : null)
                  }}
                  onClick={async () => {
                    try {
                      const res = await fetch(
  `${API_URL}/badges/buy`,
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ badgeId: badge.id })
  }
);


                      if (!res.ok) {
                        setErrorFlashId(badge.id);
                        setTimeout(() => setErrorFlashId(null), 250);
                        return;
                      }

                      await refreshUser();

                      setPurchaseFlashId(badge.id);
                      setTimeout(() => setPurchaseFlashId(null), 400);
                    } catch {
                      setErrorFlashId(badge.id);
                      setTimeout(() => setErrorFlashId(null), 250);
                    }
                  }}
                >
                  {badge.unlock.cost} 🪙
                </button>
              )}

              {canEquip && (
                <button
                  style={btn}
                  onClick={async () => {
                    try {
                      await fetch(
  `${API_URL}/badges/equip`,
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ badgeId: badge.id })
  }
);


                      await refreshUser();
                    } catch {
                      // optional: toast or error UI
                    }
                  }}
                >
                  Equip
                </button>
              )}

              {!canBuy && !canEquip && !equipped && !isChallenge && (
                <button style={btnDisabled} disabled>
                  Purchased
                </button>
              )}
            </div>
          );
        })}
      </div>

      <div style={footnote}>
        Favourite team is granted free at account creation.
        All other team badges cost coins.
      </div>
    </div>
  );
}

/* ---------------- Styles ---------------- */

const wrap = { color: "#eee" };

const topLine = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 10
};

const heading = { fontSize: 16, fontWeight: 900 };
const coins = { fontSize: 13, opacity: 0.75 };

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
  gap: 12
};

const card = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.10)",
  borderRadius: 14,
  padding: 12,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 8
};

const iconWrap = {
  width: 64,
  height: 64,
  borderRadius: "50%",
  background: "linear-gradient(to bottom, #666, #2f2f2f)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  transition: "all 0.15s ease"
};

const name = { fontSize: 12, fontWeight: 900, textAlign: "center" };

const pillEquipped = {
  fontSize: 11,
  fontWeight: 900,
  padding: "5px 8px",
  borderRadius: 999,
  background: "rgba(255,255,255,0.06)"
};

const pillLocked = { ...pillEquipped, opacity: 0.55 };

const btn = {
  width: "100%",
  border: "none",
  borderRadius: 12,
  padding: "10px",
  cursor: "pointer",
  fontWeight: 900,
  background: "rgba(255,255,255,0.88)"
};

const btnDisabled = {
  ...btn,
  opacity: 0.5,
  cursor: "not-allowed"
};

const footnote = {
  marginTop: 12,
  fontSize: 12,
  opacity: 0.65
};

const buyFlash = {
  background: "linear-gradient(to bottom, #ff6b6b, #c92a2a)"
};

const purchaseFlash = {
  background:
    "linear-gradient(120deg, rgba(255,215,0,0.35), rgba(255,255,255,0.08))"
};
