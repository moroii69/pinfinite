# pinfinite

infinite background patterns and gradients for saas projects. mathematically generated, infinitely scrollable collection with live preview and one-click copy.

## features

- infinite patterns: mathematically generated unique backgrounds
- live preview: real-time pattern visualization
- one-click copy: export as css, tailwind, or svg
- favorites: save and manage your favorite patterns
- random generation: fresh patterns on every refresh

the app is fully client-side.

## how it works

pinfinite generates unique background patterns using mathematical algorithms and seeded pseudo-random functions. every pattern is created deterministically from a seed value, ensuring reproducibility while maintaining infinite variety.

### mathematical foundation

**seeded random generation:**
```javascript
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898 + seed * 78.233) * 43758.5453
  return x - Math.floor(x)
}
```
uses trigonometric functions to create deterministic pseudo-random values from any seed.

**color generation:**
```javascript
// hsl color with seeded variations
hue = floor(random(seed × 1.23) × 360)
saturation = base + (random(seed × 1.45) - 0.5) × 20
lightness = base + (random(seed × 1.67) - 0.5) × 15
```

### pattern types

the system generates 21 different pattern types using various mathematical approaches:

- geometric patterns: dots, grids, hexagons, triangles using coordinate-based positioning
- wave patterns: sine waves for organic curves: `y = sin(x × frequency + seed) × amplitude`
- gradient patterns: radial and linear gradients with multiple color stops
- svg patterns: vector graphics for precise shapes and complex geometries
- noise patterns: perlin-like noise using seeded random positioning

### pattern generation flow

1. seed calculation: `seed = index × π + randomOffset`
2. color generation: hsl colors with seeded variations
3. pattern selection: 21 types cycled through deterministically
4. parameter calculation: size, spacing, opacity using seeded random values
5. output generation: css gradients or svg markup

### performance optimizations

- client-side only: no server computation required
- lazy generation: patterns created on-demand
- efficient algorithms: pure mathematical functions, no external libraries
- memory management: virtual scrolling for infinite collections

this mathematical approach ensures every pattern is unique yet reproducible, creating an infinite design space perfect for saas applications.
