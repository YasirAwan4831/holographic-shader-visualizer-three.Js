// ============================================================
//  GLOBAL STYLES (CSS-in-JS)
//  Injected via <style> tag in App.js
// ============================================================

const globalStyles = `
  /* ── Reset ─────────────────────────────────────────────── */
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* ── Root ──────────────────────────────────────────────── */
  html, body, #root {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #000;
  }

  /* ── Cyberpunk Font ─────────────────────────────────────── */
  @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@400;700;900&display=swap');

  body {
    font-family: 'Share Tech Mono', monospace;
    color: #00d5ff;
  }

  /* ── lil-gui panel overrides ─────────────────────────────── */
  .lil-gui {
    --background-color:    rgba(0, 0, 0, 0.85) !important;
    --text-color:          #00d5ff !important;
    --title-background-color: rgba(0, 213, 255, 0.15) !important;
    --title-text-color:    #00d5ff !important;
    --widget-color:        rgba(0, 213, 255, 0.1) !important;
    --hover-color:         rgba(0, 213, 255, 0.2) !important;
    --focus-color:         rgba(0, 213, 255, 0.3) !important;
    --number-color:        #a0ffff !important;
    --string-color:        #00d5ff !important;
    font-family: 'Share Tech Mono', monospace !important;
    font-size: 11px !important;
    border: 1px solid rgba(0, 213, 255, 0.3) !important;
    border-radius: 4px !important;
    backdrop-filter: blur(10px) !important;
    top: 16px !important;
    right: 16px !important;
  }

  /* ── Scrollbar ───────────────────────────────────────────── */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #000; }
  ::-webkit-scrollbar-thumb { background: #00d5ff44; border-radius: 2px; }

  /* ── Canvas cursor ───────────────────────────────────────── */
  canvas { cursor: grab; }
  canvas:active { cursor: grabbing; }
`;

export default globalStyles;
