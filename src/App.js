// ============================================================
//  App.js — Root React Component
//  Injects global styles and renders the HologramScene
// ============================================================

import React, { useEffect } from "react";
import HologramScene from "./components/HologramScene";
import globalStyles  from "./styles/globalStyles";

const App = () => {
  // ── Inject global CSS once on mount ────────────────────────
  useEffect(() => {
    const styleEl = document.createElement("style");
    styleEl.id        = "holo-global-styles";
    styleEl.innerHTML = globalStyles;
    document.head.appendChild(styleEl);

    return () => {
      const el = document.getElementById("holo-global-styles");
      if (el) el.remove();
    };
  }, []);

  return (
    <div
      style={{
        width:    "100vw",
        height:   "100vh",
        overflow: "hidden",
        background: "#000",
      }}
    >
      <HologramScene />
    </div>
  );
};

export default App;
