// ============================================================
//  GLOBAL PARAMETERS & DEFAULTS
//  Centralized config for colors, lights, and scene settings
// ============================================================

export const DEFAULT_PARAMS = {
  // Hologram color (cyan-blue)
  color: "#00d5ff",

  // Stage / platform color
  stageColor: "#d4d4d4",

  // Lighting colors
  ambientLight: "#ffffff",
  directionalLight: "#a4d5f4",

  // Initial object indices
  currentIndex: 0,
  nextIndex: 1,
};

// ── Camera Settings ──────────────────────────────────────────
export const CAMERA_CONFIG = {
  fov: 35,
  near: 0.1,
  far: 100,
  position: { x: 0, y: 4, z: -10 },
};

// ── Light Settings ────────────────────────────────────────────
export const LIGHT_CONFIG = {
  ambient: {
    color: DEFAULT_PARAMS.ambientLight,
    intensity: 0.5,
  },
  directional: {
    color: DEFAULT_PARAMS.directionalLight,
    intensity: 1.0,
    position: { x: 0, y: 3, z: 1 },
  },
  point: {
    color: DEFAULT_PARAMS.color,
    intensity: 1,
    distance: 10,
    position: { x: 0, y: -1.3, z: 0 },
  },
};

// ── Stage Settings ────────────────────────────────────────────
export const STAGE_CONFIG = {
  radiusTop: 2,
  radiusBottom: 2,
  height: 0.5,
  radialSegments: 128,
  positionY: -2,
};

// ── Geometry Settings ─────────────────────────────────────────
export const GEOMETRY_CONFIG = {
  torusKnot: {
    radius: 1,
    tube: 0.5,
    tubularSegments: 128,
    radialSegments: 32,
  },
  icosahedron: {
    radius: 2,
    detail: 24,
  },
  torus: {
    radius: 1.4,
    tube: 0.5,
    radialSegments: 128,
    tubularSegments: 32,
  },
  positionY: 0.5,
  boundingMargin: 0.1,
};

// ── Animation Settings ────────────────────────────────────────
export const ANIMATION_CONFIG = {
  // How fast we cycle through shapes (shapes per second)
  cycleSpeed: 0.25,
  totalShapes: 3,

  // GSAP transition
  transitionDuration: 1.5,
  transitionEase: "linear",

  // Rotation speeds
  rotationSpeed: 0.5,
};

// ── GUI Panel Labels ──────────────────────────────────────────
export const GUI_LABELS = {
  color: "Hologram Color",
  stageColor: "Stage Color",
  ambientLight: "Ambient Light",
  directionalLight: "Directional Light",
  title: "HOLO.SYS Controls",
};
