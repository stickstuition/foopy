import teams from "../engine/players";

/* ---------- LOGO MAP ---------- */

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
  WB: "/logos/Western_Bulldogs.webp",
};

/* ---------- MAIN ---------- */

export default function TeamSelect({ selector, me, options, onSelect }) {
  const isMyTurn = selector === me;

  // Safety: no options yet
  if (!Array.isArray(options) || options.length !== 3) {
    return (
      <div style={wrap}>
        <h1 style={{ marginBottom: 24 }}>Loading teams…</h1>
        <p style={{ opacity: 0.6 }}>Waiting for server</p>
      </div>
    );
  }

  return (
    <div style={wrap}>
      <h1 style={{ marginBottom: 24 }}>
        {isMyTurn ? "Choose a Team" : "Opponent is choosing..."}
      </h1>

      <div style={cardRow}>
        {options.map((code) => {
          const logo = teamLogos[code];

          // Extra safety in case a bad code slips through
          if (!logo || !Array.isArray(teams[code]) || teams[code].length < 3) {
            return null;
          }

          return (
            <div
              key={code}
              style={{
                ...card,
                ...(isMyTurn ? {} : cardDisabled),
              }}
              onClick={() => {
                if (!isMyTurn) return;
                onSelect(code);
              }}
            >
              <img src={logo} alt={code} style={{ width: 90 }} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- STYLES ---------- */

const wrap = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
};

const cardRow = {
  display: "flex",
  gap: 28,
};

const card = {
  width: 140,
  height: 180,
  borderRadius: 18,
  background: "#f1f1f1",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
  boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
};

const cardDisabled = {
  cursor: "not-allowed",
  filter: "grayscale(100%)",
  opacity: 0.6,
  boxShadow: "none",
};
