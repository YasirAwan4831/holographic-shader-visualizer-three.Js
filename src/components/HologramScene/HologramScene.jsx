// ============================================================
//  HologramScene — Main 3D Canvas Component
//  Mounts the Three.js renderer and overlays UI elements
// ============================================================

import React from "react";
import useHologram from "../../hooks/useHologram";

// ── Inline Styles ─────────────────────────────────────────────
const styles = {
  wrapper: {
    position:   "fixed",
    inset:       0,
    width:       "100%",
    height:      "100vh",
    background:  "#000",
    overflow:    "hidden",
  },

  canvas: {
    position: "absolute",
    inset:     0,
    width:     "100%",
    height:    "100%",
    zIndex:    0,
  },

  // ── HUD Overlay ──────────────────────────────────────────
  hud: {
    position:       "absolute",
    inset:           0,
    pointerEvents:  "none",
    zIndex:          10,
  },

  // Top-left title block
  titleBlock: {
    position:   "absolute",
    top:         "24px",
    left:        "24px",
    display:     "flex",
    flexDirection: "column",
    gap:          "4px",
  },

  systemTag: {
    fontFamily:  "'Share Tech Mono', monospace",
    fontSize:    "10px",
    letterSpacing: "0.3em",
    color:       "rgba(0, 213, 255, 0.5)",
    textTransform: "uppercase",
  },

  title: {
    fontFamily:  "'Orbitron', monospace",
    fontSize:    "clamp(18px, 2.5vw, 28px)",
    fontWeight:  900,
    color:       "#00d5ff",
    letterSpacing: "0.1em",
    textShadow:  "0 0 20px rgba(0, 213, 255, 0.8), 0 0 40px rgba(0, 213, 255, 0.4)",
    lineHeight:  1,
  },

  subtitle: {
    fontFamily:  "'Share Tech Mono', monospace",
    fontSize:    "11px",
    color:       "rgba(0, 213, 255, 0.6)",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
  },

  // Bottom-left status bar
  statusBar: {
    position:    "absolute",
    bottom:       "24px",
    left:         "24px",
    display:      "flex",
    flexDirection: "column",
    gap:           "6px",
  },

  statusRow: {
    display:     "flex",
    alignItems:  "center",
    gap:          "10px",
    fontFamily:  "'Share Tech Mono', monospace",
    fontSize:    "10px",
    color:       "rgba(0, 213, 255, 0.5)",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
  },

  dot: {
    width:        "6px",
    height:       "6px",
    borderRadius: "50%",
    background:   "#00d5ff",
    boxShadow:    "0 0 6px #00d5ff",
    animation:    "blink 1.4s ease-in-out infinite",
  },

  // Bottom-right hint
  hintBlock: {
    position:    "absolute",
    bottom:       "24px",
    right:        "24px",
    textAlign:   "right",
    fontFamily:  "'Share Tech Mono', monospace",
    fontSize:    "10px",
    color:       "rgba(0, 213, 255, 0.35)",
    letterSpacing: "0.12em",
    lineHeight:  1.8,
    textTransform: "uppercase",
  },

  // Corner brackets decoration
  cornerTL: {
    position:    "absolute",
    top:          "14px",
    left:         "14px",
    width:        "24px",
    height:       "24px",
    borderTop:   "1px solid rgba(0,213,255,0.4)",
    borderLeft:  "1px solid rgba(0,213,255,0.4)",
  },
  cornerTR: {
    position:    "absolute",
    top:          "14px",
    right:        "14px",
    width:        "24px",
    height:       "24px",
    borderTop:   "1px solid rgba(0,213,255,0.4)",
    borderRight: "1px solid rgba(0,213,255,0.4)",
  },
  cornerBL: {
    position:    "absolute",
    bottom:       "14px",
    left:         "14px",
    width:        "24px",
    height:       "24px",
    borderBottom: "1px solid rgba(0,213,255,0.4)",
    borderLeft:   "1px solid rgba(0,213,255,0.4)",
  },
  cornerBR: {
    position:    "absolute",
    bottom:       "14px",
    right:        "14px",
    width:        "24px",
    height:       "24px",
    borderBottom: "1px solid rgba(0,213,255,0.4)",
    borderRight:  "1px solid rgba(0,213,255,0.4)",
  },

  // Scan line overlay on entire screen
  scanlines: {
    position:    "absolute",
    inset:        0,
    background:  "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)",
    pointerEvents: "none",
    zIndex:       5,
  },

  // Vignette
  vignette: {
    position:    "absolute",
    inset:        0,
    background:  "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)",
    pointerEvents: "none",
    zIndex:       6,
  },
};

// ── Keyframe injection ─────────────────────────────────────────
const keyframes = `
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.2; }
  }
`;

// ── Component ──────────────────────────────────────────────────
const HologramScene = () => {
  const containerRef = useHologram();

  return (
    <>
      {/* Keyframe styles */}
      <style>{keyframes}</style>
      {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
      <div style={styles.wrapper} ref={containerRef}>
        {/* Canvas renders inside this div via useHologram */}
        {/* Screen-wide scan lines */}
        <div style={styles.scanlines} />
        {/* Vignette */}
        <div style={styles.vignette} />

        {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
        {/* ── HUD Overlay ─────────────────────────────── */}
        <div style={styles.hud}>

          {/* Corner brackets */}
          <div style={styles.cornerTL} />
          <div style={styles.cornerTR} />
          <div style={styles.cornerBL} />
          <div style={styles.cornerBR} />

          {/* Top-left: Title */}
          <div style={styles.titleBlock}>
            <span style={styles.systemTag}> {/* comment */} </span>
            <h1 style={styles.title}>HOLO.SYS</h1>
            <span style={styles.subtitle}>Holographic Interface</span>
          </div>

          {/* Bottom-left: Status */}
          <div style={styles.statusBar}>
            <div style={styles.statusRow}>
              <div style={styles.dot} />
              <span>Render Engine: WebGL 2.0</span>
            </div>
            <div style={styles.statusRow}>
              <div style={styles.dot} />
              <span>Shader: GLSL ES 3.0</span>
            </div>
            <div style={styles.statusRow}>
              <div style={styles.dot} />
              <span>Status: Active</span>
            </div>
          </div>

          {/* Bottom-right: Controls hint */}
          <div style={styles.hintBlock}>
            <div>Drag to rotate</div>
            <div>Scroll to zoom</div>
            <div>Right-click to pan</div>
          </div>

        </div>
      </div>
    </>
  );
};

export default HologramScene;
