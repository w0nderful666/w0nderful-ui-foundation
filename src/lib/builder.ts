export type ThemePreset =
  | 'tokyo-night'
  | 'catppuccin'
  | 'dracula'
  | 'nord'
  | 'gruvbox'
  | 'rose-pine'
  | 'one-dark'
  | 'solarized'
  | 'monokai'
  | 'github-light'
  | 'vercel-geist'
  | 'linear-dark'
  | 'raycast'
  | 'cyber-neon'
  | 'frosted-glass'
  | 'mint-lab'
  | 'amber-studio'
  | 'rose-terminal'
  | 'slate-pro'
  | 'oceanic'

export type Mode = 'light' | 'dark'

export type BackgroundStyle =
  | 'solid'
  | 'soft-gradient'
  | 'radial-glow'
  | 'grid-surface'
  | 'noise-glass'
  | 'aurora'
  | 'terminal-matrix'
  | 'mesh-gradient'
  | 'frosted-panel'
  | 'starfield'
  | 'blueprint-grid'
  | 'minimal-paper'

export type Radius = 'sharp' | 'soft' | 'rounded' | 'pill'

export type Shadow = 'flat' | 'soft' | 'floating' | 'elevated' | 'glow'

export type Density = 'compact' | 'normal' | 'spacious' | 'presentation'

export type ButtonStyle = 'solid' | 'soft' | 'outline' | 'ghost' | 'gradient' | 'glass' | 'neon'

export type CardStyle = 'solid' | 'glass' | 'bordered' | 'elevated' | 'floating' | 'terminal'

export type InputStyle = 'filled' | 'outline' | 'minimal' | 'glass' | 'terminal'

export type MotionLevel = 'off' | 'subtle' | 'normal' | 'expressive' | 'cinematic'

export type FontScale = 'compact' | 'normal' | 'large' | 'display'

export interface BuilderConfig {
  themePreset: ThemePreset
  mode: Mode
  backgroundStyle: BackgroundStyle
  radius: Radius
  shadow: Shadow
  density: Density
  buttonStyle: ButtonStyle
  cardStyle: CardStyle
  inputStyle: InputStyle
  motionLevel: MotionLevel
  fontScale: FontScale
}

export type BuilderConfigKey = keyof BuilderConfig
export type BuilderConfigValue<K extends BuilderConfigKey> = BuilderConfig[K]

export const THEME_PRESETS: { value: ThemePreset; label: string }[] = [
  { value: 'tokyo-night', label: 'Tokyo Night' },
  { value: 'catppuccin', label: 'Catppuccin' },
  { value: 'dracula', label: 'Dracula' },
  { value: 'nord', label: 'Nord' },
  { value: 'gruvbox', label: 'Gruvbox' },
  { value: 'rose-pine', label: 'Rosé Pine' },
  { value: 'one-dark', label: 'One Dark' },
  { value: 'solarized', label: 'Solarized' },
  { value: 'monokai', label: 'Monokai' },
  { value: 'github-light', label: 'GitHub Light' },
  { value: 'vercel-geist', label: 'Vercel Geist' },
  { value: 'linear-dark', label: 'Linear Dark' },
  { value: 'raycast', label: 'Raycast' },
  { value: 'cyber-neon', label: 'Cyber Neon' },
  { value: 'frosted-glass', label: 'Frosted Glass' },
  { value: 'mint-lab', label: 'Mint Lab' },
  { value: 'amber-studio', label: 'Amber Studio' },
  { value: 'rose-terminal', label: 'Rose Terminal' },
  { value: 'slate-pro', label: 'Slate Pro' },
  { value: 'oceanic', label: 'Oceanic' },
]

export const MODES: { value: Mode; label: string }[] = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
]

export const BACKGROUND_STYLES: { value: BackgroundStyle; label: string }[] = [
  { value: 'solid', label: 'Solid' },
  { value: 'soft-gradient', label: 'Soft Gradient' },
  { value: 'radial-glow', label: 'Radial Glow' },
  { value: 'grid-surface', label: 'Grid Surface' },
  { value: 'noise-glass', label: 'Noise Glass' },
  { value: 'aurora', label: 'Aurora' },
  { value: 'terminal-matrix', label: 'Terminal Matrix' },
  { value: 'mesh-gradient', label: 'Mesh Gradient' },
  { value: 'frosted-panel', label: 'Frosted Panel' },
  { value: 'starfield', label: 'Starfield' },
  { value: 'blueprint-grid', label: 'Blueprint Grid' },
  { value: 'minimal-paper', label: 'Minimal Paper' },
]

export const RADII: { value: Radius; label: string }[] = [
  { value: 'sharp', label: 'Sharp' },
  { value: 'soft', label: 'Soft' },
  { value: 'rounded', label: 'Rounded' },
  { value: 'pill', label: 'Pill' },
]

export const SHADOWS: { value: Shadow; label: string }[] = [
  { value: 'flat', label: 'Flat' },
  { value: 'soft', label: 'Soft' },
  { value: 'floating', label: 'Floating' },
  { value: 'elevated', label: 'Elevated' },
  { value: 'glow', label: 'Glow' },
]

export const DENSITIES: { value: Density; label: string }[] = [
  { value: 'compact', label: 'Compact' },
  { value: 'normal', label: 'Normal' },
  { value: 'spacious', label: 'Spacious' },
  { value: 'presentation', label: 'Presentation' },
]

export const BUTTON_STYLES: { value: ButtonStyle; label: string }[] = [
  { value: 'solid', label: 'Solid' },
  { value: 'soft', label: 'Soft' },
  { value: 'outline', label: 'Outline' },
  { value: 'ghost', label: 'Ghost' },
  { value: 'gradient', label: 'Gradient' },
  { value: 'glass', label: 'Glass' },
  { value: 'neon', label: 'Neon' },
]

export const CARD_STYLES: { value: CardStyle; label: string }[] = [
  { value: 'solid', label: 'Solid' },
  { value: 'glass', label: 'Glass' },
  { value: 'bordered', label: 'Bordered' },
  { value: 'elevated', label: 'Elevated' },
  { value: 'floating', label: 'Floating' },
  { value: 'terminal', label: 'Terminal' },
]

export const INPUT_STYLES: { value: InputStyle; label: string }[] = [
  { value: 'filled', label: 'Filled' },
  { value: 'outline', label: 'Outline' },
  { value: 'minimal', label: 'Minimal' },
  { value: 'glass', label: 'Glass' },
  { value: 'terminal', label: 'Terminal' },
]

export const MOTION_LEVELS: { value: MotionLevel; label: string }[] = [
  { value: 'off', label: 'Off' },
  { value: 'subtle', label: 'Subtle' },
  { value: 'normal', label: 'Normal' },
  { value: 'expressive', label: 'Expressive' },
  { value: 'cinematic', label: 'Cinematic' },
]

export const FONT_SCALES: { value: FontScale; label: string }[] = [
  { value: 'compact', label: 'Compact' },
  { value: 'normal', label: 'Normal' },
  { value: 'large', label: 'Large' },
  { value: 'display', label: 'Display' },
]

export const DEFAULT_CONFIG: BuilderConfig = {
  themePreset: 'tokyo-night',
  mode: 'dark',
  backgroundStyle: 'soft-gradient',
  radius: 'rounded',
  shadow: 'soft',
  density: 'normal',
  buttonStyle: 'solid',
  cardStyle: 'solid',
  inputStyle: 'outline',
  motionLevel: 'normal',
  fontScale: 'normal',
}
