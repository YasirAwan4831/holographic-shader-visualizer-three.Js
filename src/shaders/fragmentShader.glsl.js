// ============================================================
//  HOLOGRAPHIC FRAGMENT SHADER
//  Handles scan lines, fresnel glow, and transition masking
// ============================================================

const fragmentShader = /* glsl */ `
uniform float uTime;
uniform float uIndex;
uniform float uCurrentIndex;
uniform float uNextIndex;
uniform float uProgress;
uniform vec3  uColor;
uniform float uMinY;
uniform float uMaxY;

varying vec3 vPosition;
varying vec3 vNormal;

void main() {

  // ── Discard meshes not involved in current transition ───
  if (uIndex != uCurrentIndex && uIndex != uNextIndex) {
    discard;
  }

  // ── Scan Line Effect ────────────────────────────────────
  float lines  = 20.0;
  float offset = vPosition.y - uTime * 0.2;
  float density = mod(offset * lines, 1.0);
  density = pow(density, 3.0);

  // ── Fresnel Rim Glow ────────────────────────────────────
  vec3  viewDirection = normalize(vPosition - cameraPosition);
  float fresnel       = 1.0 - abs(dot(normalize(vNormal), viewDirection));
  fresnel             = pow(fresnel, 2.0);

  // ── Fresnel Falloff ─────────────────────────────────────
  float falloff = smoothstep(0.8, 0.0, fresnel);

  // ── Combine Effects ─────────────────────────────────────
  float holographic  = density * fresnel;
  holographic       += fresnel * 1.25;
  holographic       *= falloff;

  // ── Transition Masking ──────────────────────────────────
  float normalizedY = (vPosition.y - uMinY) / (uMaxY - uMinY);

  // Hide bottom of current mesh as progress sweeps up
  if (uIndex == uCurrentIndex && normalizedY < uProgress) {
    discard;
  }

  // Hide top of next mesh until progress sweeps through
  if (uIndex == uNextIndex && normalizedY > uProgress) {
    discard;
  }

  // ── Final Color Output ──────────────────────────────────
  gl_FragColor = vec4(uColor, holographic);

  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

export default fragmentShader;
