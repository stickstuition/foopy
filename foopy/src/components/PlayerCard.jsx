export default function PlayerCard({ image, size = "large" }) {
  const sizes = {
    large: { width: 160, height: 220 },
    small: { width: 96, height: 132 }
  };

  const { width, height } = sizes[size] || sizes.large;

  return (
    <div
      style={{
        width,
        height,
        borderRadius: 14,
        overflow: "hidden",
        background: "#fff",
        boxShadow: "0 6px 14px rgba(0,0,0,0.25)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <img
        src={image}
        alt=""
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover"
        }}
      />
    </div>
  );
}
