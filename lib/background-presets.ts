export interface PresetConfig {
  saturation: number
  lightness: number
  name: string
}

export const presetConfigs: PresetConfig[] = [
  { saturation: 70, lightness: 55, name: "Vibrant" },
  { saturation: 50, lightness: 60, name: "Soft" },
  { saturation: 80, lightness: 45, name: "Bold" },
  { saturation: 40, lightness: 65, name: "Muted" },
  { saturation: 60, lightness: 50, name: "Balanced" },
  { saturation: 75, lightness: 48, name: "Saturated" },
  { saturation: 45, lightness: 70, name: "Pastel" },
  { saturation: 85, lightness: 42, name: "Deep" },
]
