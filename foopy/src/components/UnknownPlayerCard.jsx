import { clubThemes, fallbackTheme } from "../ui/clubThemes";

export default function UnknownPlayerCard({ teamKey }) {
  const theme = clubThemes[teamKey] || fallbackTheme;

  return (
    <div
      style={{
        width: 160,
        height: 220,
        borderRadius: 16,
        overflow: "hidden",
        background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
        boxShadow: "0 8px 20px rgba(0,0,0,0.18)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative"
      }}
    >
      {theme.logo && (
        <img
          src={theme.logo}
          alt=""
          style={{
            width: "110px",
            opacity: 0.9
          }}
        />
      )}
    </div>
  );
}
