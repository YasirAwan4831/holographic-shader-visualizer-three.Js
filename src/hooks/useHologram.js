// ============================================================
//  useHologram — Custom React Hook
//  Encapsulates all Three.js scene logic, animation loop,
//  and cleanup. Returns a ref to attach to a container div.
// ============================================================

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import gsap from "gsap";
import GUI from "lil-gui";

import vertexShader   from "../shaders/vertexShader.glsl.js";
import fragmentShader from "../shaders/fragmentShader.glsl.js";
import {
  DEFAULT_PARAMS,
  ANIMATION_CONFIG,
  GUI_LABELS,
  GEOMETRY_CONFIG,
} from "../constants/params";
import {
  createRenderer,
  createCamera,
  createLights,
  createStage,
  createGeometries,
  computeYBounds,
  disposeObject,
  disposeRenderer,
} from "../utils/threeHelpers";

const useHologram = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ── Size Tracking ───────────────────────────────────────
    const size = {
      width:  container.clientWidth  || window.innerWidth,
      height: container.clientHeight || window.innerHeight,
      dpr:    window.devicePixelRatio,
    };

    // ── Scene ───────────────────────────────────────────────
    const scene    = new THREE.Scene();
    const camera   = createCamera(size.width, size.height);
    const renderer = createRenderer(size.width, size.height, size.dpr);
    
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.zIndex = '0';

    scene.add(camera);
    // Append as first child so it sits behind the absolute HUD overlays
    container.insertBefore(renderer.domElement, container.firstChild);

    // ── Controls ────────────────────────────────────────────
    const controls              = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping       = true;
    controls.dampingFactor       = 0.05;
    controls.minDistance         = 5;
    controls.maxDistance         = 20;

    // ── Lights ──────────────────────────────────────────────
    const { ambientLight, dLight, pLight } = createLights(scene);

    // ── Stage ───────────────────────────────────────────────
    const cylinder = createStage(scene);

    // ── Shared Uniforms ─────────────────────────────────────
    const uniforms = {
      uColor:        new THREE.Uniform(new THREE.Color(DEFAULT_PARAMS.color)),
      uTime:         new THREE.Uniform(0),
      uProgress:     new THREE.Uniform(0),
      uIndex:        new THREE.Uniform(0),
      uCurrentIndex: new THREE.Uniform(DEFAULT_PARAMS.currentIndex),
      uNextIndex:    new THREE.Uniform(DEFAULT_PARAMS.nextIndex),
      uMinY:         new THREE.Uniform(0),
      uMaxY:         new THREE.Uniform(0),
    };

    // ── Base Shader Material ─────────────────────────────────
    const baseMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent:  true,
      blending:     THREE.AdditiveBlending,
      depthWrite:   false,
    });

    // ── Geometries ───────────────────────────────────────────
    const geometries = createGeometries();
    const { torusKnotGeometry, icosahedronGeometry, torusGeometry } = geometries;
    const { minY, maxY } = computeYBounds(geometries);

    uniforms.uMinY.value = minY;
    uniforms.uMaxY.value = maxY;

    const posY = GEOMETRY_CONFIG.positionY;

    // Torus Knot
    const torusKnotMaterial = baseMaterial.clone();
    torusKnotMaterial.uniforms.uIndex.value = 0;
    const torusKnot = new THREE.Mesh(torusKnotGeometry, torusKnotMaterial);
    torusKnot.position.y = posY;
    scene.add(torusKnot);

    // Icosahedron
    const icosahedronMaterial = baseMaterial.clone();
    icosahedronMaterial.uniforms.uIndex.value = 1;
    const icosahedron = new THREE.Mesh(icosahedronGeometry, icosahedronMaterial);
    icosahedron.position.y = posY;
    scene.add(icosahedron);

    // Torus
    const torusMaterial = baseMaterial.clone();
    torusMaterial.uniforms.uIndex.value = 2;
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.y = posY;
    scene.add(torus);

    const materials = [torusKnotMaterial, icosahedronMaterial, torusMaterial];

    // ── State ─────────────────────────────────────────────────
    const state = {
      currentIndex: DEFAULT_PARAMS.currentIndex,
      nextIndex:    DEFAULT_PARAMS.nextIndex,
    };

    // ── Transition helper ─────────────────────────────────────
    const triggerTransition = () => {
      materials.forEach((mat) => {
        mat.uniforms.uCurrentIndex.value = state.currentIndex;
        mat.uniforms.uNextIndex.value    = state.nextIndex;
        gsap.fromTo(
          mat.uniforms.uProgress,
          { value: 0 },
          {
            value:    1,
            duration: ANIMATION_CONFIG.transitionDuration,
            ease:     ANIMATION_CONFIG.transitionEase,
          }
        );
      });
    };

    // Kick off first transition on mount
    triggerTransition();

    // ── Animation Loop ────────────────────────────────────────
    const clock = new THREE.Clock();
    let animationId;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const delta       = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Cycle through shapes
      const newIndex = Math.floor(
        (elapsedTime * ANIMATION_CONFIG.cycleSpeed) % ANIMATION_CONFIG.totalShapes
      );

      if (newIndex !== state.currentIndex) {
        state.currentIndex = newIndex;
        state.nextIndex    = newIndex === ANIMATION_CONFIG.totalShapes - 1 ? 0 : newIndex + 1;
        triggerTransition();
      }

      // Rotate objects
      const speed = ANIMATION_CONFIG.rotationSpeed;
      torusKnot.rotation.y += delta * speed;
      torusKnot.rotation.x += delta * speed;
      torus.rotation.y     += delta * speed;
      torus.rotation.x     += delta * speed;

      // Update time uniforms
      materials.forEach((mat) => {
        mat.uniforms.uTime.value = elapsedTime;
      });

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // ── GUI ───────────────────────────────────────────────────
    const guiParams = {
      [GUI_LABELS.color]:            DEFAULT_PARAMS.color,
      [GUI_LABELS.stageColor]:       DEFAULT_PARAMS.stageColor,
      [GUI_LABELS.ambientLight]:     DEFAULT_PARAMS.ambientLight,
      [GUI_LABELS.directionalLight]: DEFAULT_PARAMS.directionalLight,
    };

    const gui = new GUI({ title: GUI_LABELS.title, width: 260 });

    gui.addColor(guiParams, GUI_LABELS.color).onChange((val) => {
      materials.forEach((mat) => {
        mat.uniforms.uColor.value = new THREE.Color(val);
      });
      pLight.color = new THREE.Color(val);
    });

    gui.addColor(guiParams, GUI_LABELS.stageColor).onChange((val) => {
      cylinder.material.color = new THREE.Color(val);
    });

    gui.addColor(guiParams, GUI_LABELS.ambientLight).onChange((val) => {
      ambientLight.color = new THREE.Color(val);
    });

    gui.addColor(guiParams, GUI_LABELS.directionalLight).onChange((val) => {
      dLight.color = new THREE.Color(val);
    });

    // ── Resize Handler ─────────────────────────────────────────
    const handleResize = () => {
      size.width  = container.clientWidth  || window.innerWidth;
      size.height = container.clientHeight || window.innerHeight;
      size.dpr    = window.devicePixelRatio;

      camera.aspect = size.width / size.height;
      camera.updateProjectionMatrix();

      renderer.setSize(size.width, size.height);
      renderer.setPixelRatio(Math.min(size.dpr, 2));
    };

    window.addEventListener("resize", handleResize);

    // ── Cleanup ────────────────────────────────────────────────
    return () => {
      // Stop loop
      cancelAnimationFrame(animationId);

      // Remove event listeners
      window.removeEventListener("resize", handleResize);

      // Destroy GUI
      gui.destroy();

      // Kill GSAP tweens
      gsap.killTweensOf(materials.map((m) => m.uniforms.uProgress));

      // Dispose geometries
      disposeObject(torusKnot);
      disposeObject(icosahedron);
      disposeObject(torus);
      disposeObject(cylinder);
      baseMaterial.dispose();

      // Dispose controls
      controls.dispose();

      // Dispose renderer
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      disposeRenderer(renderer);
    };
  }, []);

  return containerRef;
};

export default useHologram;
