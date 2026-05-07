// ============================================================
//  THREE.JS HELPER UTILITIES
//  Factory functions for scene objects
// ============================================================

import * as THREE from "three";
import {
  CAMERA_CONFIG,
  LIGHT_CONFIG,
  STAGE_CONFIG,
  GEOMETRY_CONFIG,
  DEFAULT_PARAMS,
} from "../constants/params";

// ── Renderer ─────────────────────────────────────────────────
export const createRenderer = (width, height, dpr) => {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: false,
  });
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(dpr, 2)); // cap at 2x for performance
  return renderer;
};

// ── Camera ───────────────────────────────────────────────────
export const createCamera = (width, height) => {
  const camera = new THREE.PerspectiveCamera(
    CAMERA_CONFIG.fov,
    width / height,
    CAMERA_CONFIG.near,
    CAMERA_CONFIG.far
  );
  camera.position.set(
    CAMERA_CONFIG.position.x,
    CAMERA_CONFIG.position.y,
    CAMERA_CONFIG.position.z
  );
  return camera;
};

// ── Lights ───────────────────────────────────────────────────
export const createLights = (scene) => {
  // Ambient
  const ambientLight = new THREE.AmbientLight(
    new THREE.Color(LIGHT_CONFIG.ambient.color),
    LIGHT_CONFIG.ambient.intensity
  );
  scene.add(ambientLight);

  // Directional
  const dLight = new THREE.DirectionalLight(
    new THREE.Color(LIGHT_CONFIG.directional.color),
    LIGHT_CONFIG.directional.intensity
  );
  dLight.position.set(
    LIGHT_CONFIG.directional.position.x,
    LIGHT_CONFIG.directional.position.y,
    LIGHT_CONFIG.directional.position.z
  );
  scene.add(dLight);

  // Point (colored glow under object)
  const pLight = new THREE.PointLight(
    new THREE.Color(LIGHT_CONFIG.point.color),
    LIGHT_CONFIG.point.intensity,
    LIGHT_CONFIG.point.distance
  );
  pLight.position.set(
    LIGHT_CONFIG.point.position.x,
    LIGHT_CONFIG.point.position.y,
    LIGHT_CONFIG.point.position.z
  );
  scene.add(pLight);

  return { ambientLight, dLight, pLight };
};

// ── Stage Platform ───────────────────────────────────────────
export const createStage = (scene) => {
  const cylinder = new THREE.Mesh(
    new THREE.CylinderGeometry(
      STAGE_CONFIG.radiusTop,
      STAGE_CONFIG.radiusBottom,
      STAGE_CONFIG.height,
      STAGE_CONFIG.radialSegments
    ),
    new THREE.MeshStandardMaterial({
      color: new THREE.Color(DEFAULT_PARAMS.stageColor),
      roughness: 0.3,
      metalness: 0.6,
    })
  );
  cylinder.position.set(0, STAGE_CONFIG.positionY, 0);
  scene.add(cylinder);
  return cylinder;
};

// ── Hologram Geometries ──────────────────────────────────────
export const createGeometries = () => {
  const torusKnotGeometry = new THREE.TorusKnotGeometry(
    GEOMETRY_CONFIG.torusKnot.radius,
    GEOMETRY_CONFIG.torusKnot.tube,
    GEOMETRY_CONFIG.torusKnot.tubularSegments,
    GEOMETRY_CONFIG.torusKnot.radialSegments
  );
  torusKnotGeometry.computeBoundingBox();

  const icosahedronGeometry = new THREE.IcosahedronGeometry(
    GEOMETRY_CONFIG.icosahedron.radius,
    GEOMETRY_CONFIG.icosahedron.detail
  );
  icosahedronGeometry.computeBoundingBox();

  const torusGeometry = new THREE.TorusGeometry(
    GEOMETRY_CONFIG.torus.radius,
    GEOMETRY_CONFIG.torus.tube,
    GEOMETRY_CONFIG.torus.radialSegments,
    GEOMETRY_CONFIG.torus.tubularSegments
  );
  torusGeometry.computeBoundingBox();

  return { torusKnotGeometry, icosahedronGeometry, torusGeometry };
};

// ── Compute Y Bounds across all geometries ───────────────────
export const computeYBounds = (geometries) => {
  const { torusKnotGeometry, icosahedronGeometry, torusGeometry } = geometries;
  const margin = GEOMETRY_CONFIG.boundingMargin;
  const posY   = GEOMETRY_CONFIG.positionY;

  const minY = Math.min(
    torusKnotGeometry.boundingBox.min.y,
    icosahedronGeometry.boundingBox.min.y,
    torusGeometry.boundingBox.min.y
  );
  const maxY = Math.max(
    torusKnotGeometry.boundingBox.max.y,
    icosahedronGeometry.boundingBox.max.y,
    torusGeometry.boundingBox.max.y
  );

  return {
    minY: minY + posY - margin,
    maxY: maxY + posY + margin,
  };
};

// ── Dispose helpers (memory cleanup) ─────────────────────────
export const disposeObject = (obj) => {
  if (!obj) return;
  if (obj.geometry) obj.geometry.dispose();
  if (obj.material) {
    if (Array.isArray(obj.material)) {
      obj.material.forEach((m) => m.dispose());
    } else {
      obj.material.dispose();
    }
  }
};

export const disposeRenderer = (renderer) => {
  if (renderer) {
    renderer.dispose();
    renderer.forceContextLoss();
  }
};
