export default function GameShell({ children }) {
  return (
    <div
      style={{
        minHeight: "100svh",
        width: "100%",
        overflowX: "hidden",
        backgroundImage: "url('/assets/foopy-backdrop.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      {children}
    </div>
  );
}
