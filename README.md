<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=0,2,2,5,30&height=220&section=header&text=HOLO.SYS&fontSize=90&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=Holographic+Visualization+System&descAlignY=60&descSize=20&descColor=00d5ff" width="100%" alt="Header Banner" />
</div>

<div align="center">
  <a href="https://git.io/typing-svg">
    <img src="https://readme-typing-svg.herokuapp.com?font=Orbitron&weight=700&size=28&pause=1000&color=00D5FF&center=true&vCenter=true&width=700&lines=Futuristic+Cyberpunk+Holographic+System;Real-time+GLSL+Vertex+%26+Fragment+Shaders;Glitch+Effects+%2B+Fresnel+Rim+Glow;Built+with+React+18+%2B+Three.js+%2B+GSAP;WebGL+Powered+3D+Visualization" alt="Animated Typing" />
  </a>
</div>

<br />

<div align="center">

  <!-- Tech Badges -->
  <img src="https://img.shields.io/badge/React-18.2-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Three.js-r160-000000?style=for-the-badge&logo=threedotjs&logoColor=white" alt="Three.js" />
  <img src="https://img.shields.io/badge/GSAP-3.12-88CE02?style=for-the-badge&logo=greensock&logoColor=white" alt="GSAP" />
  <img src="https://img.shields.io/badge/WebGL-2.0-990000?style=for-the-badge&logo=webgl&logoColor=white" alt="WebGL" />
  <img src="https://img.shields.io/badge/GLSL-Shader-FF6F00?style=for-the-badge&logo=opengl&logoColor=white" alt="GLSL" />

  <br /><br />

  <!-- Status Badges -->
  <img src="https://img.shields.io/badge/Status-Active-00d5ff?style=flat-square&logo=statuspage&logoColor=white" alt="Status" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License" />
  <img src="https://img.shields.io/badge/Version-1.0.0-blueviolet?style=flat-square" alt="Version" />
  <img src="https://img.shields.io/badge/PRs-Welcome-brightgreen?style=flat-square" alt="PRs Welcome" />
  <img src="https://img.shields.io/badge/Maintained-Yes-cyan?style=flat-square" alt="Maintained" />
  <img src="https://img.shields.io/badge/Node.js-%3E%3D16-339933?style=flat-square&logo=nodedotjs&logoColor=white" alt="Node.js" />

</div>

<br />

---

## 🌌 Overview

<img align="right" width="380" src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=0,2,2,5,30&height=200&text=3D+Hologram&fontSize=40&fontColor=00d5ff&animation=twinkling" alt="Side Banner" />

**HOLO.SYS** is a premium, high-performance interactive **3D holographic rendering engine** built for the modern web. It merges cutting-edge **React architecture** with the raw power of **Three.js WebGL**, crafted with handwritten **GLSL shaders** to deliver a cinematic, cyberpunk-inspired visual experience directly in the browser.

This project is not just a demo — it is a **production-ready visualization framework** with a clean, modular, and scalable React codebase. Every visual element has been engineered with precision: from the glitch-displacement vertex shader to the fresnel rim glow in the fragment shader.

> *"The future is holographic. Build it in the browser."*

<br clear="right"/>

---

## 🌐 Live Demo
[https://holographic-threejs.vercel.app/](https://holographic-threejs.vercel.app/)

---

## ✨ Key Features
<table>
  <tr>
    <td width="50%">

### 🔵 Custom GLSL Shaders
Handwritten **vertex and fragment shaders** that produce:
- Dynamic glitch displacement waves
- Animated scanline density effect
- Fresnel rim glow based on view angle
- Smooth falloff for holographic transparency

### ⚡ Glitch Effects
Multi-layered glitch engine with:
- Time-based sine wave displacement
- Progress-driven transition glitch band
- Randomized X/Z axis displacement
- Smooth step blending for natural look

    </td>
    <td width="50%">

### 🔄 Seamless Object Transitions
GSAP-powered sweep transitions:
- Bottom-to-top progress masking
- Simultaneous current/next mesh rendering
- Auto-cycling through 3 geometry shapes
- Configurable transition duration & easing

### 🎛️ Interactive HUD Overlay
Cyberpunk UI built into the React component:
- Real-time system status indicators
- Animated blinking status dots
- Corner bracket decorations
- Scanline screen overlay effect

    </td>
  </tr>
</table>

<table>
  <tr>
    <td width="33%">

### 💡 Dynamic Lighting System
- Ambient light (scene fill)
- Directional light (shape definition)
- Point light (colored glow under object)
- All colors editable via GUI in real-time

    </td>
    <td width="33%">

### 🎨 Live GUI Controls
Using **lil-gui** panel:
- Hologram color picker
- Stage platform color
- Ambient light color
- Directional light color

    </td>
    <td width="33%">

### 🚀 Performance Optimized
- `requestAnimationFrame` loop
- DPR capped at 2x for GPU efficiency
- Proper geometry/material disposal
- Memory leak prevention on unmount

    </td>
  </tr>
</table>

---

## 🗂️ Project Architecture

```
holographic-shader-react/
│
├── 📁 public/
│   └── index.html                    ← HTML entry point
│
├── 📁 src/
│   │
│   ├── 📁 components/
│   │   └── 📁 HologramScene/
│   │       ├── HologramScene.jsx     ← 3D Canvas + Cyberpunk HUD Overlay
│   │       └── index.js              ← Barrel export
│   │
│   ├── 📁 shaders/
│   │   ├── vertexShader.glsl.js      ← Glitch + Displacement Shader
│   │   └── fragmentShader.glsl.js   ← Scanlines + Fresnel + Masking
│   │
│   ├── 📁 hooks/
│   │   └── useHologram.js            ← All Three.js scene logic
│   │
│   ├── 📁 utils/
│   │   └── threeHelpers.js           ← Factory functions (renderer, lights, etc.)
│   │
│   ├── 📁 constants/
│   │   └── params.js                 ← Centralized config & defaults
│   │
│   ├── 📁 styles/
│   │   └── globalStyles.js           ← CSS-in-JS global styles
│   │
│   ├── App.js                        ← Root component
│   └── index.js                      ← React DOM entry point
│
├── .gitignore
├── package.json
└── README.md
```

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
| :--- | :---: | :--- |
| **[React](https://react.dev/)** | 18.2 | UI framework, component lifecycle, hooks |
| **[Three.js](https://threejs.org/)** | r160 | WebGL abstraction, 3D scene & meshes |
| **[GLSL ES](https://www.khronos.org/opengl/wiki/Core_Language_(GLSL))** | 3.0 | Custom vertex & fragment shader programs |
| **[GSAP](https://gsap.com/)** | 3.12 | High-performance animation & transitions |
| **[lil-gui](https://lil-gui.georgealways.com/)** | 0.19 | Floating control panel for live tweaking |
| **[OrbitControls](https://threejs.org/docs/#examples/en/controls/OrbitControls)** | r160 | Interactive camera rotation, zoom, pan |
| **[WebGL](https://www.khronos.org/webgl/)** | 2.0 | GPU-accelerated 3D rendering in browser |

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- ✅ **[Node.js](https://nodejs.org/)** v16 or higher
- ✅ **[npm](https://www.npmjs.com/)** v8+ or **[yarn](https://yarnpkg.com/)** v1.22+
- ✅ A modern browser with **WebGL 2.0** support (Chrome, Firefox, Edge)

---

### Installation

**1. Clone the repository:**
```bash
git clone https://github.com/YasirAwan4831/holographic-shader-react.git
cd holographic-shader-react
```

**2. Install all dependencies:**
```bash
npm install
# or
yarn install
```

**3. Start the development server:**
```bash
npm start
# or
yarn start
```

**4. Open in your browser:**
```
http://localhost:3000
```

> The app will automatically reload whenever you save a file.

---

### Build for Production

```bash
npm run build
# or
yarn build
```

The optimized production build will be generated in the `/build` folder, ready to deploy on **Vercel**, **Netlify**, or **GitHub Pages**.

---

## 🎮 Controls

| Action | Input |
| :--- | :--- |
| 🔄 **Rotate Camera** | Left click + Drag |
| 🔍 **Zoom In / Out** | Scroll wheel |
| ✋ **Pan Camera** | Right click + Drag |
| 🎨 **Change Colors** | Top-right GUI Panel |
| 💡 **Adjust Lighting** | Top-right GUI Panel |

---

## ⚙️ GUI Panel Controls

Open the **top-right control panel** in the app to adjust in real-time:

| Control | Description |
| :--- | :--- |
| 🎨 **Hologram Color** | Change the hologram shader tint (default: `#00d5ff`) |
| 🏟️ **Stage Color** | Change the platform / pedestal color |
| ☀️ **Ambient Light** | Adjust the ambient scene light color |
| 💡 **Directional Light** | Adjust the key directional light color |

---

## 🔬 Shader Details

### Vertex Shader — `vertexShader.glsl.js`

The vertex shader controls **glitch displacement** in 3D space:

```glsl
// Base glitch using time-based sine wave
float glitchStrength = sin(glitchTime) * sin(glitchTime * 3.45) + sin(glitchTime * 8.76);
glitchStrength = smoothstep(0.5, 1.0, glitchStrength) * 2.0;

// Random X/Z axis displacement
modelPosition.x += (random(modelPosition.xz + uTime) - 0.5) * glitchStrength;
modelPosition.z += (random(modelPosition.xz + uTime) - 0.5) * glitchStrength;
```

### Fragment Shader — `fragmentShader.glsl.js`

The fragment shader renders the **holographic visual effect**:

```glsl
// Scanline pattern
float density = pow(mod(offset * 20.0, 1.0), 3.0);

// Fresnel rim glow based on view angle
float fresnel = pow(1.0 - abs(dot(normalize(vNormal), viewDirection)), 2.0);

// Combined holographic output
float holographic = density * fresnel + fresnel * 1.25;
gl_FragColor = vec4(uColor, holographic * falloff);
```

---

## 📦 Dependencies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "three": "^0.160.0",
  "gsap": "^3.12.4",
  "lil-gui": "^0.19.2"
}
```

---

## 🔮 Roadmap & Future Enhancements

- [ ] 🌸 Add post-processing **bloom** effect for intense neon glow
- [ ] 🎵 Audio-reactive glitch effects using Web Audio API
- [ ] 🧬 Support for custom **GLTF / GLB 3D model** loading
- [ ] 📱 Optimize touch controls for mobile devices
- [ ] 🌐 Add WebXR support for **VR/AR** hologram viewing
- [ ] 🎭 Add more geometric shapes (Klein Bottle, Mobius Strip, etc.)
- [ ] 💾 Save & share color presets via URL parameters
- [ ] ⚡ Add Suspense-based lazy loading for 3D assets

---

## 👨‍💻 Author

<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=0,2,2,5,30&height=3&width=100%" width="100%" />
</div>

<br />

<div align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Orbitron&weight=600&size=18&pause=2000&color=00D5FF&center=true&vCenter=true&width=500&lines=Muhammad+Yasir+Awan;Full+Stack+Developer;Creative+Designer;WebGL+%7C+JavaScript+%7C+Three.js+%7C+GLSL;React+%7C+NodeJs+%7C+Express+%7C+MangoDB" alt="Author" />
</div>

<br />

<div align="center">

  <a href="https://yasirawan4831.github.io/futuristic-links-dashboard/" target="_blank">
    <img src="https://img.shields.io/badge/🌐_Portfolio-Visit_Now-00d5ff?style=for-the-badge&logoColor=white" alt="Portfolio" />
  </a>
  &nbsp;
  <a href="https://github.com/YasirAwan4831" target="_blank">
    <img src="https://img.shields.io/badge/GitHub-YasirAwan4831-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
  </a>

</div>

<br />

---

## 📄 License

```
MIT License — Copyright (c) 2026 Muhammad Yasir Awan 

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files, to deal in the Software
without restriction, including without limitation the rights to use, copy,
modify, merge, publish, distribute, sublicense and/or sell copies of the
Software.
```

---

<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=0,2,2,5,30&height=120&section=footer&text=HOLO.SYS+%C2%A9+2026&fontSize=24&fontColor=00d5ff&animation=fadeIn&fontAlignY=65" width="100%" alt="Footer" />
</div>

<div align="center">
  <sub>
    Development  By ❤️ 
    <a href="https://yasirawan4831.github.io/futuristic-links-dashboard/"><strong>Muhammad Yasir Awan</strong></a>
  </sub>
</div>