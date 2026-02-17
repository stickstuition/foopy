export default function GameShell({ children }) {
  return (
    <div style={{
      minHeight: "100vh",
      width: "100vw",
      backgroundImage: "url('/assets/foopy-backdrop.png')",   // your backdrop
      backgroundSize: "cover",
      backgroundPosition: "center",
      display: "flex",
      justifyContent: "center",
      alignItems: "stretch"
    }}>
      {children}
    </div>
  );
}