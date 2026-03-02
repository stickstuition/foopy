import { clubThemes, fallbackTheme } from "../ui/clubThemes";

export default function UnknownPlayerCard({ teamKey, size = "large" }) {
  const theme = clubThemes[teamKey] || fallbackTheme;

    const sizes = {
    large: { width: 160, height: 220 },
    medium: { width: 140, height: 192 },
    small: { width: 96, height: 132 }
  };

  const { width, height } = sizes[size] || sizes.large;

  return (
    <div
      style={{
                width,
        height,
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
                        width: size === "small" ? "64px" : size === "medium" ? "92px" : "110px",
            opacity: 0.9
          }}
        />
      )}
    </div>
  );
}
