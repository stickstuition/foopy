import teams from "../engine/players";
import useIsMobile from "../hooks/useIsMobile";

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
    const isMobile = useIsMobile(768);
  const isMyTurn = selector === me;

  // Safety: no options yet
  if (!Array.isArray(options) || options.length !== 3) {
    return (
          <div style={wrap(isMobile)}>
        <h1 style={{ marginBottom: 24 }}>Loading teams…</h1>
        <p style={{ opacity: 0.6 }}>Waiting for server</p>
      </div>
    );
  }

    return (
    <div style={wrap(isMobile)}>
            <h1 style={{ marginBottom: "clamp(10px, 2.5vh, 24px)" }}>
        {isMyTurn ? "Choose a Team" : "Opponent is choosing..."}
      </h1>

            <div style={cardRow(isMobile)}>
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
                ...card(isMobile),
                ...(isMyTurn ? {} : cardDisabled),
              }}
              onClick={() => {
                if (!isMyTurn) return;
                onSelect(code);
              }}
            >
                             <img
                src={logo}
                alt={code}
                style={{ width: isMobile ? 68 : "clamp(64px, 8vw, 90px)" }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- STYLES ---------- */

const wrap = (mobile) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  padding: mobile ? "0 12px" : 0,
  boxSizing: "border-box"
});

const cardRow = (mobile) => ({
  display: "flex",
  gap: mobile ? 12 : 28,
  width: "100%",
  justifyContent: "center"
});

const card = (mobile) => ({
  width: mobile ? 104 : "clamp(110px, 16vw, 140px)",
  height: mobile ? 140 : "clamp(130px, 22vh, 180px)",
  borderRadius: 18,
  background: "#f1f1f1",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
  boxShadow: "0 10px 25px rgba(0,0,0,0.15)"
});

const cardDisabled = {
  cursor: "not-allowed",
  filter: "grayscale(100%)",
  opacity: 0.6,
  boxShadow: "none",
};
