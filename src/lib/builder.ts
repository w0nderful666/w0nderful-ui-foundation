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
  | 'warm-paper'
  | 'windows-classic'
  | 'windows-11'
  | 'ubuntu-aubergine'
  | 'gnome-adwaita'
  | 'kali-dark'
  | 'unix-terminal'
  | 'macos-aqua'
  | 'macos-graphite'
  | 'centos-blue'
  | 'android-material'
  | 'material-you'
  | 'debian-red'
  | 'fedora-blue'
  | 'arch-minimal'

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
  | 'spotlight-stage'
  | 'carbon-grid'
  | 'layered-glass'
  | 'sunset-mesh'
  | 'deep-space'
  | 'circuit-board'
  | 'soft-noise'
  | 'diagonal-lines'
  | 'liquid-blobs'

export type Radius = 'square' | 'sharp' | 'soft' | 'smooth' | 'rounded' | 'pill' | 'xl' | 'organic'

export type Shadow = 'flat' | 'soft' | 'ambient' | 'hard' | 'floating' | 'layered' | 'elevated' | 'spotlight' | 'glow'

export type Density = 'compact' | 'normal' | 'spacious' | 'presentation'

export type ButtonStyle = 'solid' | 'soft' | 'outline' | 'ghost' | 'gradient' | 'glass' | 'neon' | 'command' | 'dock' | 'brutal' | 'link' | 'inverse' | 'shine'

export type CardStyle = 'solid' | 'glass' | 'bordered' | 'elevated' | 'floating' | 'terminal' | 'neumorphic' | 'spotlight' | 'acrylic' | 'paper' | 'outline-glow'

export type InputStyle = 'filled' | 'outline' | 'minimal' | 'glass' | 'terminal' | 'searchbar' | 'underline' | 'command-line' | 'pill' | 'filled-glow'

export type MotionLevel = 'off' | 'subtle' | 'normal' | 'expressive' | 'cinematic' | 'elastic' | 'snappy'

export type FontScale = 'compact' | 'normal' | 'large' | 'display'

export type LayoutStyle = 'sidebar' | 'topbar' | 'split' | 'floating-panels' | 'dashboard-grid'

export type DockStyle = 'minimal' | 'glass-dock' | 'pill-dock' | 'floating-shelf' | 'neon-dock'

export type PanelChrome = 'macos' | 'linux' | 'terminal' | 'minimal' | 'studio'

export type BorderStyle = 'none' | 'subtle' | 'strong' | 'glow' | 'dashed' | 'double'

export type SurfaceMaterial = 'solid' | 'glass' | 'matte' | 'acrylic' | 'paper' | 'terminal'

export type AccentIntensity = 'low' | 'medium' | 'high' | 'neon'

export type BlurStrength = 'none' | 'soft' | 'medium' | 'strong' | 'frosted'

export type IconStyle = 'line' | 'filled' | 'duotone' | 'badge' | 'mono'

export type ContentShape = 'cards' | 'list' | 'tiles' | 'kanban' | 'metrics'

export type HeaderHeight = 'compact' | 'normal' | 'large' | 'hero'

export interface BuilderConfig {
  themePreset: ThemePreset
  mode: Mode
  backgroundStyle: BackgroundStyle
  layoutStyle: LayoutStyle
  dockStyle: DockStyle
  panelChrome: PanelChrome
  borderStyle: BorderStyle
  surfaceMaterial: SurfaceMaterial
  accentIntensity: AccentIntensity
  blurStrength: BlurStrength
  iconStyle: IconStyle
  contentShape: ContentShape
  headerHeight: HeaderHeight
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
  { value: 'windows-classic', label: 'Windows Classic' },
  { value: 'windows-11', label: 'Windows 11' },
  { value: 'ubuntu-aubergine', label: 'Ubuntu' },
  { value: 'gnome-adwaita', label: 'GNOME Adwaita' },
  { value: 'kali-dark', label: 'Kali Linux' },
  { value: 'unix-terminal', label: 'Unix Terminal' },
  { value: 'macos-aqua', label: 'macOS Aqua' },
  { value: 'macos-graphite', label: 'macOS Graphite' },
  { value: 'centos-blue', label: 'CentOS' },
  { value: 'android-material', label: 'Android Material' },
  { value: 'material-you', label: 'Material You' },
  { value: 'debian-red', label: 'Debian' },
  { value: 'fedora-blue', label: 'Fedora' },
  { value: 'arch-minimal', label: 'Arch Linux' },
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
  { value: 'spotlight-stage', label: 'Spotlight Stage' },
  { value: 'carbon-grid', label: 'Carbon Grid' },
  { value: 'layered-glass', label: 'Layered Glass' },
  { value: 'sunset-mesh', label: 'Sunset Mesh' },
  { value: 'deep-space', label: 'Deep Space' },
  { value: 'circuit-board', label: 'Circuit Board' },
  { value: 'soft-noise', label: 'Soft Noise' },
  { value: 'diagonal-lines', label: 'Diagonal Lines' },
  { value: 'liquid-blobs', label: 'Liquid Blobs' },
]

export const RADII: { value: Radius; label: string }[] = [
  { value: 'square', label: 'Square' },
  { value: 'sharp', label: 'Sharp' },
  { value: 'soft', label: 'Soft' },
  { value: 'smooth', label: 'Smooth' },
  { value: 'rounded', label: 'Rounded' },
  { value: 'pill', label: 'Pill' },
  { value: 'xl', label: 'XL' },
  { value: 'organic', label: 'Organic' },
]

export const SHADOWS: { value: Shadow; label: string }[] = [
  { value: 'flat', label: 'Flat' },
  { value: 'soft', label: 'Soft' },
  { value: 'ambient', label: 'Ambient' },
  { value: 'hard', label: 'Hard' },
  { value: 'floating', label: 'Floating' },
  { value: 'layered', label: 'Layered' },
  { value: 'elevated', label: 'Elevated' },
  { value: 'spotlight', label: 'Spotlight' },
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
  { value: 'command', label: 'Command' },
  { value: 'dock', label: 'Dock' },
  { value: 'brutal', label: 'Brutal' },
  { value: 'link', label: 'Link' },
  { value: 'inverse', label: 'Inverse' },
  { value: 'shine', label: 'Shine' },
]

export const CARD_STYLES: { value: CardStyle; label: string }[] = [
  { value: 'solid', label: 'Solid' },
  { value: 'glass', label: 'Glass' },
  { value: 'bordered', label: 'Bordered' },
  { value: 'elevated', label: 'Elevated' },
  { value: 'floating', label: 'Floating' },
  { value: 'terminal', label: 'Terminal' },
  { value: 'neumorphic', label: 'Neumorphic' },
  { value: 'spotlight', label: 'Spotlight' },
  { value: 'acrylic', label: 'Acrylic' },
  { value: 'paper', label: 'Paper' },
  { value: 'outline-glow', label: 'Outline Glow' },
]

export const INPUT_STYLES: { value: InputStyle; label: string }[] = [
  { value: 'filled', label: 'Filled' },
  { value: 'outline', label: 'Outline' },
  { value: 'minimal', label: 'Minimal' },
  { value: 'glass', label: 'Glass' },
  { value: 'terminal', label: 'Terminal' },
  { value: 'searchbar', label: 'Searchbar' },
  { value: 'underline', label: 'Underline' },
  { value: 'command-line', label: 'Command Line' },
  { value: 'pill', label: 'Pill' },
  { value: 'filled-glow', label: 'Filled Glow' },
]

export const MOTION_LEVELS: { value: MotionLevel; label: string }[] = [
  { value: 'off', label: 'Off' },
  { value: 'subtle', label: 'Subtle' },
  { value: 'normal', label: 'Normal' },
  { value: 'expressive', label: 'Expressive' },
  { value: 'cinematic', label: 'Cinematic' },
  { value: 'elastic', label: 'Elastic' },
  { value: 'snappy', label: 'Snappy' },
]

export const FONT_SCALES: { value: FontScale; label: string }[] = [
  { value: 'compact', label: 'Compact' },
  { value: 'normal', label: 'Normal' },
  { value: 'large', label: 'Large' },
  { value: 'display', label: 'Display' },
]

export const LAYOUT_STYLES: { value: LayoutStyle; label: string }[] = [
  { value: 'sidebar', label: 'Sidebar' },
  { value: 'topbar', label: 'Topbar' },
  { value: 'split', label: 'Split View' },
  { value: 'floating-panels', label: 'Floating Panels' },
  { value: 'dashboard-grid', label: 'Dashboard Grid' },
]

export const DOCK_STYLES: { value: DockStyle; label: string }[] = [
  { value: 'minimal', label: 'Minimal' },
  { value: 'glass-dock', label: 'Glass Dock' },
  { value: 'pill-dock', label: 'Pill Dock' },
  { value: 'floating-shelf', label: 'Floating Shelf' },
  { value: 'neon-dock', label: 'Neon Dock' },
]

export const PANEL_CHROMES: { value: PanelChrome; label: string }[] = [
  { value: 'macos', label: 'macOS' },
  { value: 'linux', label: 'Linux' },
  { value: 'terminal', label: 'Terminal' },
  { value: 'minimal', label: 'Minimal' },
  { value: 'studio', label: 'Studio' },
]

export const BORDER_STYLES: { value: BorderStyle; label: string }[] = [
  { value: 'none', label: 'None' },
  { value: 'subtle', label: 'Subtle' },
  { value: 'strong', label: 'Strong' },
  { value: 'glow', label: 'Glow' },
  { value: 'dashed', label: 'Dashed' },
  { value: 'double', label: 'Double' },
]

export const SURFACE_MATERIALS: { value: SurfaceMaterial; label: string }[] = [
  { value: 'solid', label: 'Solid' },
  { value: 'glass', label: 'Glass' },
  { value: 'matte', label: 'Matte' },
  { value: 'acrylic', label: 'Acrylic' },
  { value: 'paper', label: 'Paper' },
  { value: 'terminal', label: 'Terminal' },
]

export const ACCENT_INTENSITIES: { value: AccentIntensity; label: string }[] = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'neon', label: 'Neon' },
]

export const BLUR_STRENGTHS: { value: BlurStrength; label: string }[] = [
  { value: 'none', label: 'None' },
  { value: 'soft', label: 'Soft' },
  { value: 'medium', label: 'Medium' },
  { value: 'strong', label: 'Strong' },
  { value: 'frosted', label: 'Frosted' },
]

export const ICON_STYLES: { value: IconStyle; label: string }[] = [
  { value: 'line', label: 'Line' },
  { value: 'filled', label: 'Filled' },
  { value: 'duotone', label: 'Duotone' },
  { value: 'badge', label: 'Badge' },
  { value: 'mono', label: 'Mono' },
]

export const CONTENT_SHAPES: { value: ContentShape; label: string }[] = [
  { value: 'cards', label: 'Cards' },
  { value: 'list', label: 'List' },
  { value: 'tiles', label: 'Tiles' },
  { value: 'kanban', label: 'Kanban' },
  { value: 'metrics', label: 'Metrics' },
]

export const HEADER_HEIGHTS: { value: HeaderHeight; label: string }[] = [
  { value: 'compact', label: 'Compact' },
  { value: 'normal', label: 'Normal' },
  { value: 'large', label: 'Large' },
  { value: 'hero', label: 'Hero' },
]

export type StylePresetId =
  | 'web-os-pro'
  | 'glass-lab'
  | 'terminal-pro'
  | 'github-clean'
  | 'cyber-deck'
  | 'paper-desk'
  | 'studio-console'
  | 'aurora-dashboard'
  | 'minimal-saas'
  | 'neon-command'
  | 'windows-classic-desktop'
  | 'windows-11-glass'
  | 'ubuntu-workstation'
  | 'gnome-adwaita-clean'
  | 'kali-ops-console'
  | 'unix-terminal-console'
  | 'macos-aqua-desk'
  | 'macos-graphite-pro'
  | 'centos-server-panel'
  | 'android-material-dashboard'
  | 'material-you-lab'
  | 'debian-workbench'
  | 'fedora-workstation'
  | 'arch-minimal-console'

export interface StylePreset {
  id: StylePresetId
  label: string
  description: string
  tags: string[]
  config: BuilderConfig
}

export const STYLE_PRESETS: StylePreset[] = [
  {
    id: 'web-os-pro',
    label: 'Web OS Pro',
    description: 'Modern Web OS default style for desktop apps',
    tags: ['desktop', 'glass', 'modern'],
    config: {
      themePreset: 'tokyo-night',
      mode: 'dark',
      backgroundStyle: 'soft-gradient',
      layoutStyle: 'sidebar',
      dockStyle: 'glass-dock',
      panelChrome: 'macos',
      borderStyle: 'subtle',
      surfaceMaterial: 'glass',
      accentIntensity: 'medium',
      blurStrength: 'medium',
      iconStyle: 'line',
      contentShape: 'cards',
      headerHeight: 'normal',
      radius: 'rounded',
      shadow: 'soft',
      density: 'normal',
      buttonStyle: 'solid',
      cardStyle: 'glass',
      inputStyle: 'outline',
      motionLevel: 'normal',
      fontScale: 'normal',
    },
  },
  {
    id: 'glass-lab',
    label: 'Glass Lab',
    description: 'Glassmorphism for premium showcase pages',
    tags: ['glass', 'premium', 'modern'],
    config: {
      themePreset: 'frosted-glass',
      mode: 'dark',
      backgroundStyle: 'layered-glass',
      layoutStyle: 'dashboard-grid',
      dockStyle: 'floating-shelf',
      panelChrome: 'minimal',
      borderStyle: 'none',
      surfaceMaterial: 'glass',
      accentIntensity: 'high',
      blurStrength: 'strong',
      iconStyle: 'filled',
      contentShape: 'cards',
      headerHeight: 'compact',
      radius: 'pill',
      shadow: 'floating',
      density: 'spacious',
      buttonStyle: 'glass',
      cardStyle: 'glass',
      inputStyle: 'glass',
      motionLevel: 'expressive',
      fontScale: 'large',
    },
  },
  {
    id: 'terminal-pro',
    label: 'Terminal Pro',
    description: 'Developer-focused terminal and command style',
    tags: ['terminal', 'developer', 'dark'],
    config: {
      themePreset: 'rose-terminal',
      mode: 'dark',
      backgroundStyle: 'terminal-matrix',
      layoutStyle: 'topbar',
      dockStyle: 'minimal',
      panelChrome: 'terminal',
      borderStyle: 'none',
      surfaceMaterial: 'terminal',
      accentIntensity: 'low',
      blurStrength: 'none',
      iconStyle: 'mono',
      contentShape: 'list',
      headerHeight: 'compact',
      radius: 'sharp',
      shadow: 'flat',
      density: 'compact',
      buttonStyle: 'ghost',
      cardStyle: 'terminal',
      inputStyle: 'terminal',
      motionLevel: 'off',
      fontScale: 'compact',
    },
  },
  {
    id: 'github-clean',
    label: 'GitHub Clean',
    description: 'Clean open source project style',
    tags: ['clean', 'light', 'open-source'],
    config: {
      themePreset: 'github-light',
      mode: 'light',
      backgroundStyle: 'solid',
      layoutStyle: 'sidebar',
      dockStyle: 'minimal',
      panelChrome: 'minimal',
      borderStyle: 'subtle',
      surfaceMaterial: 'solid',
      accentIntensity: 'medium',
      blurStrength: 'none',
      iconStyle: 'line',
      contentShape: 'list',
      headerHeight: 'normal',
      radius: 'rounded',
      shadow: 'soft',
      density: 'normal',
      buttonStyle: 'solid',
      cardStyle: 'solid',
      inputStyle: 'outline',
      motionLevel: 'subtle',
      fontScale: 'normal',
    },
  },
  {
    id: 'cyber-deck',
    label: 'Cyber Deck',
    description: 'Futuristic cyberpunk aesthetic',
    tags: ['cyber', 'neon', 'futuristic'],
    config: {
      themePreset: 'cyber-neon',
      mode: 'dark',
      backgroundStyle: 'starfield',
      layoutStyle: 'dashboard-grid',
      dockStyle: 'neon-dock',
      panelChrome: 'terminal',
      borderStyle: 'glow',
      surfaceMaterial: 'terminal',
      accentIntensity: 'neon',
      blurStrength: 'none',
      iconStyle: 'badge',
      contentShape: 'metrics',
      headerHeight: 'large',
      radius: 'sharp',
      shadow: 'glow',
      density: 'compact',
      buttonStyle: 'neon',
      cardStyle: 'floating',
      inputStyle: 'command-line',
      motionLevel: 'expressive',
      fontScale: 'display',
    },
  },
  {
    id: 'paper-desk',
    label: 'Paper Desk',
    description: 'Warm paper and notebook aesthetic',
    tags: ['paper', 'warm', 'notebook'],
    config: {
      themePreset: 'warm-paper',
      mode: 'light',
      backgroundStyle: 'minimal-paper',
      layoutStyle: 'split',
      dockStyle: 'minimal',
      panelChrome: 'minimal',
      borderStyle: 'subtle',
      surfaceMaterial: 'paper',
      accentIntensity: 'low',
      blurStrength: 'none',
      iconStyle: 'filled',
      contentShape: 'tiles',
      headerHeight: 'normal',
      radius: 'soft',
      shadow: 'ambient',
      density: 'normal',
      buttonStyle: 'soft',
      cardStyle: 'paper',
      inputStyle: 'underline',
      motionLevel: 'subtle',
      fontScale: 'normal',
    },
  },
  {
    id: 'studio-console',
    label: 'Studio Console',
    description: 'Design tool console aesthetic',
    tags: ['studio', 'design', 'tool'],
    config: {
      themePreset: 'amber-studio',
      mode: 'dark',
      backgroundStyle: 'mesh-gradient',
      layoutStyle: 'split',
      dockStyle: 'pill-dock',
      panelChrome: 'studio',
      borderStyle: 'strong',
      surfaceMaterial: 'matte',
      accentIntensity: 'high',
      blurStrength: 'soft',
      iconStyle: 'filled',
      contentShape: 'kanban',
      headerHeight: 'large',
      radius: 'rounded',
      shadow: 'layered',
      density: 'spacious',
      buttonStyle: 'solid',
      cardStyle: 'elevated',
      inputStyle: 'filled',
      motionLevel: 'cinematic',
      fontScale: 'large',
    },
  },
  {
    id: 'aurora-dashboard',
    label: 'Aurora Dashboard',
    description: 'Gradient aurora for data dashboards',
    tags: ['aurora', 'dashboard', 'data'],
    config: {
      themePreset: 'mint-lab',
      mode: 'dark',
      backgroundStyle: 'aurora',
      layoutStyle: 'dashboard-grid',
      dockStyle: 'glass-dock',
      panelChrome: 'macos',
      borderStyle: 'subtle',
      surfaceMaterial: 'glass',
      accentIntensity: 'high',
      blurStrength: 'frosted',
      iconStyle: 'duotone',
      contentShape: 'metrics',
      headerHeight: 'normal',
      radius: 'pill',
      shadow: 'floating',
      density: 'presentation',
      buttonStyle: 'gradient',
      cardStyle: 'glass',
      inputStyle: 'glass',
      motionLevel: 'cinematic',
      fontScale: 'display',
    },
  },
  {
    id: 'minimal-saas',
    label: 'Minimal SaaS',
    description: 'Clean SaaS product style',
    tags: ['saas', 'clean', 'minimal'],
    config: {
      themePreset: 'vercel-geist',
      mode: 'light',
      backgroundStyle: 'solid',
      layoutStyle: 'topbar',
      dockStyle: 'minimal',
      panelChrome: 'minimal',
      borderStyle: 'subtle',
      surfaceMaterial: 'solid',
      accentIntensity: 'medium',
      blurStrength: 'none',
      iconStyle: 'line',
      contentShape: 'cards',
      headerHeight: 'compact',
      radius: 'rounded',
      shadow: 'soft',
      density: 'compact',
      buttonStyle: 'solid',
      cardStyle: 'bordered',
      inputStyle: 'outline',
      motionLevel: 'normal',
      fontScale: 'normal',
    },
  },
  {
    id: 'neon-command',
    label: 'Neon Command',
    description: 'High contrast command center',
    tags: ['neon', 'command', 'high-contrast'],
    config: {
      themePreset: 'cyber-neon',
      mode: 'dark',
      backgroundStyle: 'circuit-board',
      layoutStyle: 'floating-panels',
      dockStyle: 'neon-dock',
      panelChrome: 'terminal',
      borderStyle: 'glow',
      surfaceMaterial: 'terminal',
      accentIntensity: 'neon',
      blurStrength: 'soft',
      iconStyle: 'badge',
      contentShape: 'list',
      headerHeight: 'compact',
      radius: 'sharp',
      shadow: 'spotlight',
      density: 'compact',
      buttonStyle: 'neon',
      cardStyle: 'floating',
      inputStyle: 'command-line',
      motionLevel: 'elastic',
      fontScale: 'large',
    },
  },
  {
    id: 'windows-classic-desktop',
    label: 'Windows Classic',
    description: 'Classic Windows desktop style with blue-gray tones',
    tags: ['windows', 'classic', 'desktop'],
    config: {
      themePreset: 'windows-classic',
      mode: 'light',
      backgroundStyle: 'blueprint-grid',
      layoutStyle: 'sidebar',
      dockStyle: 'minimal',
      panelChrome: 'linux',
      borderStyle: 'strong',
      surfaceMaterial: 'solid',
      accentIntensity: 'medium',
      blurStrength: 'none',
      iconStyle: 'line',
      contentShape: 'cards',
      headerHeight: 'normal',
      radius: 'sharp',
      shadow: 'hard',
      density: 'compact',
      buttonStyle: 'solid',
      cardStyle: 'bordered',
      inputStyle: 'outline',
      motionLevel: 'subtle',
      fontScale: 'normal',
    },
  },
  {
    id: 'windows-11-glass',
    label: 'Windows 11',
    description: 'Modern Windows 11 with acrylic glass effects',
    tags: ['windows', 'modern', 'glass'],
    config: {
      themePreset: 'windows-11',
      mode: 'light',
      backgroundStyle: 'layered-glass',
      layoutStyle: 'dashboard-grid',
      dockStyle: 'glass-dock',
      panelChrome: 'minimal',
      borderStyle: 'subtle',
      surfaceMaterial: 'acrylic',
      accentIntensity: 'medium',
      blurStrength: 'medium',
      iconStyle: 'line',
      contentShape: 'cards',
      headerHeight: 'normal',
      radius: 'xl',
      shadow: 'floating',
      density: 'normal',
      buttonStyle: 'solid',
      cardStyle: 'acrylic',
      inputStyle: 'pill',
      motionLevel: 'cinematic',
      fontScale: 'normal',
    },
  },
  {
    id: 'ubuntu-workstation',
    label: 'Ubuntu',
    description: 'Ubuntu workstation with aubergine purple tones',
    tags: ['linux', 'ubuntu', 'workstation'],
    config: {
      themePreset: 'ubuntu-aubergine',
      mode: 'dark',
      backgroundStyle: 'soft-gradient',
      layoutStyle: 'sidebar',
      dockStyle: 'pill-dock',
      panelChrome: 'linux',
      borderStyle: 'subtle',
      surfaceMaterial: 'matte',
      accentIntensity: 'medium',
      blurStrength: 'soft',
      iconStyle: 'line',
      contentShape: 'cards',
      headerHeight: 'normal',
      radius: 'rounded',
      shadow: 'floating',
      density: 'normal',
      buttonStyle: 'solid',
      cardStyle: 'elevated',
      inputStyle: 'filled',
      motionLevel: 'normal',
      fontScale: 'normal',
    },
  },
  {
    id: 'gnome-adwaita-clean',
    label: 'GNOME Adwaita',
    description: 'Clean GNOME Adwaita with subtle blue accents',
    tags: ['linux', 'gnome', 'clean'],
    config: {
      themePreset: 'gnome-adwaita',
      mode: 'light',
      backgroundStyle: 'solid',
      layoutStyle: 'topbar',
      dockStyle: 'minimal',
      panelChrome: 'minimal',
      borderStyle: 'subtle',
      surfaceMaterial: 'solid',
      accentIntensity: 'low',
      blurStrength: 'none',
      iconStyle: 'line',
      contentShape: 'cards',
      headerHeight: 'compact',
      radius: 'rounded',
      shadow: 'soft',
      density: 'normal',
      buttonStyle: 'solid',
      cardStyle: 'solid',
      inputStyle: 'outline',
      motionLevel: 'normal',
      fontScale: 'normal',
    },
  },
  {
    id: 'kali-ops-console',
    label: 'Kali Linux',
    description: 'Kali Linux ops console with cyber blue highlights',
    tags: ['linux', 'kali', 'security'],
    config: {
      themePreset: 'kali-dark',
      mode: 'dark',
      backgroundStyle: 'carbon-grid',
      layoutStyle: 'split',
      dockStyle: 'neon-dock',
      panelChrome: 'terminal',
      borderStyle: 'glow',
      surfaceMaterial: 'terminal',
      accentIntensity: 'high',
      blurStrength: 'none',
      iconStyle: 'mono',
      contentShape: 'list',
      headerHeight: 'compact',
      radius: 'sharp',
      shadow: 'glow',
      density: 'compact',
      buttonStyle: 'neon',
      cardStyle: 'terminal',
      inputStyle: 'command-line',
      motionLevel: 'snappy',
      fontScale: 'compact',
    },
  },
  {
    id: 'unix-terminal-console',
    label: 'Unix Terminal',
    description: 'Classic Unix terminal with green/amber monochrome',
    tags: ['terminal', 'unix', 'console'],
    config: {
      themePreset: 'unix-terminal',
      mode: 'dark',
      backgroundStyle: 'terminal-matrix',
      layoutStyle: 'topbar',
      dockStyle: 'minimal',
      panelChrome: 'terminal',
      borderStyle: 'none',
      surfaceMaterial: 'terminal',
      accentIntensity: 'low',
      blurStrength: 'none',
      iconStyle: 'mono',
      contentShape: 'list',
      headerHeight: 'compact',
      radius: 'square',
      shadow: 'flat',
      density: 'compact',
      buttonStyle: 'ghost',
      cardStyle: 'terminal',
      inputStyle: 'command-line',
      motionLevel: 'off',
      fontScale: 'compact',
    },
  },
  {
    id: 'macos-aqua-desk',
    label: 'macOS Aqua',
    description: 'Classic macOS Aqua with blue glass and soft gradients',
    tags: ['macos', 'aqua', 'glass'],
    config: {
      themePreset: 'macos-aqua',
      mode: 'light',
      backgroundStyle: 'layered-glass',
      layoutStyle: 'floating-panels',
      dockStyle: 'glass-dock',
      panelChrome: 'macos',
      borderStyle: 'subtle',
      surfaceMaterial: 'acrylic',
      accentIntensity: 'medium',
      blurStrength: 'medium',
      iconStyle: 'filled',
      contentShape: 'cards',
      headerHeight: 'normal',
      radius: 'xl',
      shadow: 'floating',
      density: 'normal',
      buttonStyle: 'glass',
      cardStyle: 'glass',
      inputStyle: 'pill',
      motionLevel: 'cinematic',
      fontScale: 'normal',
    },
  },
  {
    id: 'macos-graphite-pro',
    label: 'macOS Graphite',
    description: 'Professional macOS Graphite with subtle gray tones',
    tags: ['macos', 'pro', 'graphite'],
    config: {
      themePreset: 'macos-graphite',
      mode: 'dark',
      backgroundStyle: 'soft-noise',
      layoutStyle: 'split',
      dockStyle: 'glass-dock',
      panelChrome: 'macos',
      borderStyle: 'subtle',
      surfaceMaterial: 'matte',
      accentIntensity: 'medium',
      blurStrength: 'soft',
      iconStyle: 'line',
      contentShape: 'cards',
      headerHeight: 'normal',
      radius: 'xl',
      shadow: 'layered',
      density: 'normal',
      buttonStyle: 'soft',
      cardStyle: 'glass',
      inputStyle: 'searchbar',
      motionLevel: 'normal',
      fontScale: 'normal',
    },
  },
  {
    id: 'centos-server-panel',
    label: 'CentOS',
    description: 'CentOS server panel with enterprise blue',
    tags: ['linux', 'centos', 'server'],
    config: {
      themePreset: 'centos-blue',
      mode: 'dark',
      backgroundStyle: 'blueprint-grid',
      layoutStyle: 'sidebar',
      dockStyle: 'minimal',
      panelChrome: 'linux',
      borderStyle: 'strong',
      surfaceMaterial: 'matte',
      accentIntensity: 'medium',
      blurStrength: 'none',
      iconStyle: 'line',
      contentShape: 'list',
      headerHeight: 'normal',
      radius: 'sharp',
      shadow: 'ambient',
      density: 'compact',
      buttonStyle: 'solid',
      cardStyle: 'bordered',
      inputStyle: 'outline',
      motionLevel: 'subtle',
      fontScale: 'normal',
    },
  },
  {
    id: 'android-material-dashboard',
    label: 'Android Material',
    description: 'Android Material dashboard with green accent',
    tags: ['android', 'material', 'mobile'],
    config: {
      themePreset: 'android-material',
      mode: 'light',
      backgroundStyle: 'soft-gradient',
      layoutStyle: 'dashboard-grid',
      dockStyle: 'pill-dock',
      panelChrome: 'minimal',
      borderStyle: 'subtle',
      surfaceMaterial: 'solid',
      accentIntensity: 'medium',
      blurStrength: 'none',
      iconStyle: 'filled',
      contentShape: 'cards',
      headerHeight: 'normal',
      radius: 'xl',
      shadow: 'soft',
      density: 'normal',
      buttonStyle: 'solid',
      cardStyle: 'elevated',
      inputStyle: 'filled',
      motionLevel: 'normal',
      fontScale: 'large',
    },
  },
  {
    id: 'material-you-lab',
    label: 'Material You',
    description: 'Google Material You with dynamic purple tones',
    tags: ['material', 'google', 'dynamic'],
    config: {
      themePreset: 'material-you',
      mode: 'light',
      backgroundStyle: 'liquid-blobs',
      layoutStyle: 'dashboard-grid',
      dockStyle: 'pill-dock',
      panelChrome: 'minimal',
      borderStyle: 'none',
      surfaceMaterial: 'matte',
      accentIntensity: 'medium',
      blurStrength: 'soft',
      iconStyle: 'filled',
      contentShape: 'cards',
      headerHeight: 'normal',
      radius: 'organic',
      shadow: 'soft',
      density: 'normal',
      buttonStyle: 'soft',
      cardStyle: 'paper',
      inputStyle: 'pill',
      motionLevel: 'elastic',
      fontScale: 'normal',
    },
  },
  {
    id: 'debian-workbench',
    label: 'Debian',
    description: 'Debian workbench with red accent',
    tags: ['linux', 'debian', 'workbench'],
    config: {
      themePreset: 'debian-red',
      mode: 'light',
      backgroundStyle: 'solid',
      layoutStyle: 'sidebar',
      dockStyle: 'minimal',
      panelChrome: 'linux',
      borderStyle: 'subtle',
      surfaceMaterial: 'solid',
      accentIntensity: 'medium',
      blurStrength: 'none',
      iconStyle: 'line',
      contentShape: 'cards',
      headerHeight: 'normal',
      radius: 'rounded',
      shadow: 'soft',
      density: 'normal',
      buttonStyle: 'solid',
      cardStyle: 'bordered',
      inputStyle: 'outline',
      motionLevel: 'normal',
      fontScale: 'normal',
    },
  },
  {
    id: 'fedora-workstation',
    label: 'Fedora',
    description: 'Fedora workstation with blue tones',
    tags: ['linux', 'fedora', 'workstation'],
    config: {
      themePreset: 'fedora-blue',
      mode: 'dark',
      backgroundStyle: 'soft-gradient',
      layoutStyle: 'sidebar',
      dockStyle: 'pill-dock',
      panelChrome: 'linux',
      borderStyle: 'subtle',
      surfaceMaterial: 'matte',
      accentIntensity: 'medium',
      blurStrength: 'soft',
      iconStyle: 'line',
      contentShape: 'cards',
      headerHeight: 'normal',
      radius: 'rounded',
      shadow: 'soft',
      density: 'normal',
      buttonStyle: 'solid',
      cardStyle: 'elevated',
      inputStyle: 'filled',
      motionLevel: 'normal',
      fontScale: 'normal',
    },
  },
  {
    id: 'arch-minimal-console',
    label: 'Arch Linux',
    description: 'Arch Linux minimal console with cyan accent',
    tags: ['linux', 'arch', 'minimal'],
    config: {
      themePreset: 'arch-minimal',
      mode: 'dark',
      backgroundStyle: 'terminal-matrix',
      layoutStyle: 'topbar',
      dockStyle: 'minimal',
      panelChrome: 'terminal',
      borderStyle: 'none',
      surfaceMaterial: 'terminal',
      accentIntensity: 'low',
      blurStrength: 'none',
      iconStyle: 'mono',
      contentShape: 'list',
      headerHeight: 'compact',
      radius: 'sharp',
      shadow: 'flat',
      density: 'compact',
      buttonStyle: 'ghost',
      cardStyle: 'terminal',
      inputStyle: 'command-line',
      motionLevel: 'off',
      fontScale: 'compact',
    },
  },
]

export const DEFAULT_CONFIG: BuilderConfig = {
  themePreset: 'tokyo-night',
  mode: 'dark',
  backgroundStyle: 'soft-gradient',
  layoutStyle: 'sidebar',
  dockStyle: 'glass-dock',
  panelChrome: 'macos',
  borderStyle: 'subtle',
  surfaceMaterial: 'solid',
  accentIntensity: 'medium',
  blurStrength: 'soft',
  iconStyle: 'line',
  contentShape: 'cards',
  headerHeight: 'normal',
  radius: 'rounded',
  shadow: 'soft',
  density: 'normal',
  buttonStyle: 'solid',
  cardStyle: 'solid',
  inputStyle: 'outline',
  motionLevel: 'normal',
  fontScale: 'normal',
}

export function getStylePresetById(id: string): StylePreset | undefined {
  return STYLE_PRESETS.find(p => p.id === id)
}

export function getSystemPresetById(id: string): StylePreset | undefined {
  const systemIds = [
    'windows-classic-desktop', 'windows-11-glass', 'ubuntu-workstation',
    'gnome-adwaita-clean', 'kali-ops-console', 'unix-terminal-console',
    'macos-aqua-desk', 'macos-graphite-pro', 'centos-server-panel',
    'android-material-dashboard', 'material-you-lab', 'debian-workbench',
    'fedora-workstation', 'arch-minimal-console'
  ]
  const preset = STYLE_PRESETS.find(p => p.id === id)
  if (preset && systemIds.includes(preset.id)) {
    return preset
  }
  return undefined
}

export function getStylePresetIds(): string[] {
  return [
    'web-os-pro', 'glass-lab', 'terminal-pro', 'github-clean',
    'cyber-deck', 'paper-desk', 'studio-console', 'aurora-dashboard',
    'minimal-saas', 'neon-command'
  ]
}

export function getSystemPresetIds(): string[] {
  return [
    'windows-classic-desktop', 'windows-11-glass', 'ubuntu-workstation',
    'gnome-adwaita-clean', 'kali-ops-console', 'unix-terminal-console',
    'macos-aqua-desk', 'macos-graphite-pro', 'centos-server-panel',
    'android-material-dashboard', 'material-you-lab', 'debian-workbench',
    'fedora-workstation', 'arch-minimal-console'
  ]
}

export function getPresetById(id: string): StylePreset | undefined {
  return STYLE_PRESETS.find(p => p.id === id)
}
