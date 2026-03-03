import useIsMobile from "../hooks/useIsMobile";

export default function GameShell({ children }) {
    const isMobile = useIsMobile(480);
  return (
    <div
      style={{
  // ✅ Mobile: match GamePanel visualViewport sizing; prevents keyboard jump / blank space
  minHeight: isMobile
    ? "calc(var(--app-vh, 1vh) * 100)"
    : "100svh",

  width: "100%",
  overflowX: "hidden",
  backgroundImage: "url('/assets/foopy-backdrop.png')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  justifyContent: "center",

  // ✅ Desktop stays centered. Mobile becomes top-aligned so keyboard shrink doesn’t recenter everything.
  alignItems: isMobile ? "flex-start" : "center",

  // ✅ Small mobile breathing room (does not affect desktop)
  paddingTop: isMobile ? 0 : 0
}}
    >
      {children}
    </div>
  );
}
