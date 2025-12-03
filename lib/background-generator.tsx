import type { PresetConfig } from "./background-presets"

export interface Background {
  id: string
  type: string
  css: string
  svg?: string
  tailwind: string
  preset: string
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898 + seed * 78.233) * 43758.5453
  return x - Math.floor(x)
}

function generateHslColor(seed: number, saturation: number, lightness: number): string {
  const hue = Math.floor(seededRandom(seed * 1.23) * 360)
  const s = saturation + (seededRandom(seed * 1.45) - 0.5) * 20
  const l = lightness + (seededRandom(seed * 1.67) - 0.5) * 15
  return `hsl(${Math.max(0, Math.min(360, hue))}, ${Math.max(0, Math.min(100, s))}%, ${Math.max(0, Math.min(100, l))}%)`
}

function noise(x: number, y: number, seed: number): number {
  const n = Math.sin(x * 12.9898 + y * 78.233 + seed * 43.141) * 43758.5453
  return n - Math.floor(n)
}

export function generateBackground(index: number, preset: PresetConfig): Background {
  const id = `bg-${index}`
  const seed = index * Math.PI
  const types = [
    "gradient",
    "mesh",
    "dots",
    "grid",
    "waves",
    "noise",
    "lines",
    "burst",
    "blob",
    "liquid",
    "hexagon",
    "triangles",
    "circles",
    "organic",
    "circuit",
    "marble",
    "perlin",
    "gradient-mesh",
  ]
  const type = types[index % types.length]

  let css = ""
  let svg = ""

  const color1 = generateHslColor(seed, preset.saturation, preset.lightness)
  const color2 = generateHslColor(seed + 100, preset.saturation - 15, preset.lightness + 10)
  const color3 = generateHslColor(seed + 200, preset.saturation - 25, preset.lightness - 15)
  const color4 = generateHslColor(seed + 300, preset.saturation + 10, preset.lightness + 5)

  if (type === "gradient") {
    const angle = Math.floor(seededRandom(seed) * 360)
    const stops = [color1, color2, color3]
    css = `linear-gradient(${angle}deg, ${stops.join(", ")})`
  } else if (type === "mesh") {
    const gradients = [
      `radial-gradient(circle at ${20 + seededRandom(seed) * 30}% ${30 + seededRandom(seed + 1) * 40}%, ${color1} 0%, transparent 50%)`,
      `radial-gradient(circle at ${60 + seededRandom(seed + 2) * 30}% ${50 + seededRandom(seed + 3) * 40}%, ${color2} 0%, transparent 50%)`,
      `radial-gradient(circle at ${40 + seededRandom(seed + 4) * 30}% ${70 + seededRandom(seed + 5) * 25}%, ${color3} 0%, transparent 50%)`,
      `radial-gradient(circle at ${10 + seededRandom(seed + 6) * 20}% ${20 + seededRandom(seed + 7) * 30}%, ${color4} 0%, transparent 40%)`,
    ]
    css = `${gradients.join(", ")}, ${color1}`
  } else if (type === "dots") {
    const size = 15 + Math.floor(seededRandom(seed) * 50)
    const spacing = 25 + Math.floor(seededRandom(seed + 1) * 35)
    svg = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><defs><pattern id="dots-${index}" x="${spacing}" y="${spacing}" width="${spacing}" height="${spacing}" patternUnits="userSpaceOnUse"><circle cx="${spacing / 2}" cy="${spacing / 2}" r="${size / 2}" fill="${color1}" opacity="${0.6 + seededRandom(seed + 2) * 0.4}"/></pattern></defs><rect width="100%" height="100%" fill="${color3}"/><rect width="100%" height="100%" fill="url(#dots-${index})"/></svg>`
    css = color3
  } else if (type === "grid") {
    const gridSize = 30 + Math.floor(seededRandom(seed) * 80)
    const strokeWidth = 0.5 + seededRandom(seed + 1) * 2
    svg = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><defs><pattern id="grid-${index}" width="${gridSize}" height="${gridSize}" patternUnits="userSpaceOnUse"><path d="M ${gridSize} 0 L 0 0 0 ${gridSize}" fill="none" stroke="${color1}" strokeWidth="${strokeWidth}" opacity="${0.15 + seededRandom(seed + 2) * 0.3}"/></pattern></defs><rect width="100%" height="100%" fill="${color2}"/><rect width="100%" height="100%" fill="url(#grid-${index})"/></svg>`
    css = color2
  } else if (type === "waves") {
    const waveCount = 3 + Math.floor(seededRandom(seed) * 4)
    const waveHeight = 30 + Math.floor(seededRandom(seed + 1) * 80)
    let waves = ""
    for (let i = 0; i < waveCount; i++) {
      const yOffset = 100 - (i * waveHeight) / waveCount
      const opacity = 0.2 + i * 0.25
      waves += `<path d="M0,${yOffset} Q25,${yOffset - waveHeight / 2} 50,${yOffset} T100,${yOffset}" stroke="${[color1, color2, color3, color4][i % 4]}" strokeWidth="3" fill="none" opacity="${opacity}"/>`
    }
    svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none" width="100%" height="100%"><rect width="100" height="100" fill="${color4}"/>${waves}</svg>`
    css = color4
  } else if (type === "noise") {
    css = `linear-gradient(${Math.floor(seededRandom(seed) * 360)}deg, ${color1}, ${color2}, ${color3}, ${color4})`
  } else if (type === "lines") {
    const lineWidth = 1 + Math.floor(seededRandom(seed) * 5)
    const spacing = 20 + Math.floor(seededRandom(seed + 1) * 40)
    const angle = Math.floor(seededRandom(seed + 2) * 90)
    svg = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><defs><pattern id="lines-${index}" x="${spacing}" y="${spacing}" width="${spacing}" height="${spacing}" patternUnits="userSpaceOnUse" patternTransform="rotate(${angle})"><line x1="0" y1="0" x2="${spacing}" y2="0" stroke="${color1}" strokeWidth="${lineWidth}" opacity="${0.4 + seededRandom(seed + 3) * 0.3}"/></pattern></defs><rect width="100%" height="100%" fill="${color2}"/><rect width="100%" height="100%" fill="url(#lines-${index})"/></svg>`
    css = color2
  } else if (type === "burst") {
    const rays = 6 + Math.floor(seededRandom(seed) * 12)
    const raySize = 50 + Math.floor(seededRandom(seed + 1) * 100)
    const centerX = 50 + seededRandom(seed + 2) * 100
    const centerY = 50 + seededRandom(seed + 3) * 100
    let burstSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%"><rect width="200" height="200" fill="${color4}"/>`
    for (let i = 0; i < rays; i++) {
      const angle = (i / rays) * Math.PI * 2
      const x2 = centerX + Math.cos(angle) * raySize
      const y2 = centerY + Math.sin(angle) * raySize
      burstSvg += `<line x1="${centerX}" y1="${centerY}" x2="${x2}" y2="${y2}" stroke="${[color1, color2, color3][i % 3]}" strokeWidth="2" opacity="${0.3 + seededRandom(seed + i) * 0.4}"/>`
    }
    burstSvg += `</svg>`
    svg = burstSvg
    css = color4
  } else if (type === "blob") {
    const blobCount = 2 + Math.floor(seededRandom(seed) * 5)
    let blobSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%"><defs><radialGradient id="grad-${index}"><stop offset="0%" stopColor="${color1}"/><stop offset="100%" stopColor="${color2}"/></radialGradient></defs><rect width="400" height="400" fill="${color4}"/>`
    for (let i = 0; i < blobCount; i++) {
      const cx = 50 + seededRandom(seed + i * 2) * 300
      const cy = 50 + seededRandom(seed + i * 2 + 0.5) * 300
      const r = 30 + seededRandom(seed + i * 2 + 1) * 120
      blobSvg += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#grad-${index})" opacity="${0.3 + seededRandom(seed + i * 2 + 2) * 0.4}"/>`
    }
    blobSvg += `</svg>`
    svg = blobSvg
    css = color4
  } else if (type === "liquid") {
    const amplitude = 40 + seededRandom(seed) * 60
    const frequency = 1.5 + seededRandom(seed + 1) * 5
    let liquidSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" preserveAspectRatio="none" width="100%" height="100%"><defs><linearGradient id="liquidGrad-${index}" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="${color1}"/><stop offset="50%" stopColor="${color2}"/><stop offset="100%" stopColor="${color3}"/></linearGradient></defs><rect width="400" height="400" fill="${color4}"/>`
    let pathData = "M0,200"
    for (let x = 0; x <= 400; x += 15) {
      const y = 200 + Math.sin((x / 400) * frequency * Math.PI * 2 + seed) * amplitude
      pathData += ` L${x},${y}`
    }
    pathData += ` L400,400 L0,400 Z`
    liquidSvg += `<path d="${pathData}" fill="url(#liquidGrad-${index})"/></svg>`
    svg = liquidSvg
    css = color4
  } else if (type === "hexagon") {
    const hexSize = 30 + Math.floor(seededRandom(seed) * 50)
    const hexSpacing = hexSize + 10 + Math.floor(seededRandom(seed + 1) * 20)
    svg = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><defs><pattern id="hex-${index}" x="${hexSpacing}" y="${hexSpacing}" width="${hexSpacing}" height="${hexSpacing}" patternUnits="userSpaceOnUse"><polygon points="${hexSize / 2},0 ${hexSize},${hexSize / 2} ${hexSize},${(hexSize * 3) / 2} ${hexSize / 2},${hexSize * 2} 0,${(hexSize * 3) / 2} 0,${hexSize / 2}" fill="none" stroke="${color1}" strokeWidth="1.5" opacity="${0.3 + seededRandom(seed + 2) * 0.4}"/></pattern></defs><rect width="100%" height="100%" fill="${color3}"/><rect width="100%" height="100%" fill="url(#hex-${index})"/></svg>`
    css = color3
  } else if (type === "triangles") {
    const triSize = 40 + Math.floor(seededRandom(seed) * 60)
    let triSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%"><rect width="200" height="200" fill="${color4}"/>`
    for (let y = 0; y < 200; y += triSize) {
      for (let x = 0; x < 200; x += triSize) {
        const colors = [color1, color2, color3]
        const c = colors[Math.floor((x + y) / triSize) % 3]
        triSvg += `<polygon points="${x},${y} ${x + triSize},${y} ${x + triSize / 2},${y + triSize}" fill="${c}" opacity="${0.5 + seededRandom(seed + x + y) * 0.3}"/>`
      }
    }
    triSvg += `</svg>`
    svg = triSvg
    css = color4
  } else if (type === "circles") {
    const circleCount = 5 + Math.floor(seededRandom(seed) * 15)
    let circleSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="100%" height="100%"><rect width="300" height="300" fill="${color4}"/>`
    for (let i = 0; i < circleCount; i++) {
      const cx = seededRandom(seed + i * 1.5) * 300
      const cy = seededRandom(seed + i * 1.5 + 0.5) * 300
      const r = 20 + seededRandom(seed + i * 1.5 + 1) * 80
      circleSvg += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${[color1, color2, color3][i % 3]}" opacity="${0.2 + seededRandom(seed + i * 1.5 + 2) * 0.4}"/>`
    }
    circleSvg += `</svg>`
    svg = circleSvg
    css = color4
  } else if (type === "organic") {
    css = `radial-gradient(ellipse at ${30 + seededRandom(seed) * 40}% ${20 + seededRandom(seed + 1) * 60}%, ${color1} 0%, ${color2} 30%, ${color3} 70%, ${color4} 100%)`
  } else if (type === "circuit") {
    const lineCount = 8 + Math.floor(seededRandom(seed) * 10)
    let circuitSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><rect width="100%" height="100%" fill="${color4}"/>`
    for (let i = 0; i < lineCount; i++) {
      const x1 = seededRandom(seed + i * 2) * 100
      const y1 = seededRandom(seed + i * 2 + 0.3) * 100
      const x2 = seededRandom(seed + i * 2 + 0.6) * 100
      const y2 = seededRandom(seed + i * 2 + 0.9) * 100
      circuitSvg += `<line x1="${x1}%" y1="${y1}%" x2="${x2}%" y2="${y2}%" stroke="${[color1, color2, color3][i % 3]}" strokeWidth="1" opacity="${0.3 + seededRandom(seed + i) * 0.3}"/>`
    }
    circuitSvg += `</svg>`
    svg = circuitSvg
    css = color4
  } else if (type === "marble") {
    css = `linear-gradient(${Math.floor(seededRandom(seed) * 360)}deg, ${color1} 0%, ${color2} 25%, ${color3} 50%, ${color4} 75%, ${color1} 100%)`
  } else {
    // gradient-mesh
    const gradients = [
      `radial-gradient(circle at ${seededRandom(seed) * 100}% ${seededRandom(seed + 1) * 100}%, ${color1} 0%, transparent 40%)`,
      `radial-gradient(circle at ${seededRandom(seed + 2) * 100}% ${seededRandom(seed + 3) * 100}%, ${color2} 0%, transparent 40%)`,
      `radial-gradient(circle at ${seededRandom(seed + 4) * 100}% ${seededRandom(seed + 5) * 100}%, ${color3} 0%, transparent 40%)`,
      `radial-gradient(circle at ${seededRandom(seed + 6) * 100}% ${seededRandom(seed + 7) * 100}%, ${color4} 0%, transparent 40%)`,
    ]
    css = `${gradients.join(", ")}, ${color3}`
  }

  return {
    id,
    type,
    css,
    svg,
    tailwind: "bg-cover",
    preset: preset.name,
  }
}
