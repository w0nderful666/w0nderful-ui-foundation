import { 
  type BuilderConfig, 
  DEFAULT_CONFIG,
  THEME_PRESETS,
  MODES,
  BACKGROUND_STYLES,
  LAYOUT_STYLES,
  DOCK_STYLES,
  PANEL_CHROMES,
  BORDER_STYLES,
  SURFACE_MATERIALS,
  ACCENT_INTENSITIES,
  BLUR_STRENGTHS,
  ICON_STYLES,
  CONTENT_SHAPES,
  HEADER_HEIGHTS,
  RADII,
  SHADOWS,
  DENSITIES,
  BUTTON_STYLES,
  CARD_STYLES,
  INPUT_STYLES,
  MOTION_LEVELS,
  FONT_SCALES,
  EXPERIENCE_STYLES
} from './builder'

const STORAGE_KEY = 'ui-kit-builder-config'
export const BUILDER_CONFIG_VERSION = 2

const OPTION_VALUES: Record<keyof BuilderConfig, string[]> = {
  themePreset: THEME_PRESETS.map(o => o.value),
  mode: MODES.map(o => o.value),
  backgroundStyle: BACKGROUND_STYLES.map(o => o.value),
  layoutStyle: LAYOUT_STYLES.map(o => o.value),
  dockStyle: DOCK_STYLES.map(o => o.value),
  panelChrome: PANEL_CHROMES.map(o => o.value),
  borderStyle: BORDER_STYLES.map(o => o.value),
  surfaceMaterial: SURFACE_MATERIALS.map(o => o.value),
  accentIntensity: ACCENT_INTENSITIES.map(o => o.value),
  blurStrength: BLUR_STRENGTHS.map(o => o.value),
  iconStyle: ICON_STYLES.map(o => o.value),
  contentShape: CONTENT_SHAPES.map(o => o.value),
  headerHeight: HEADER_HEIGHTS.map(o => o.value),
  radius: RADII.map(o => o.value),
  shadow: SHADOWS.map(o => o.value),
  density: DENSITIES.map(o => o.value),
  buttonStyle: BUTTON_STYLES.map(o => o.value),
  cardStyle: CARD_STYLES.map(o => o.value),
  inputStyle: INPUT_STYLES.map(o => o.value),
  motionLevel: MOTION_LEVELS.map(o => o.value),
  fontScale: FONT_SCALES.map(o => o.value),
  experienceStyle: EXPERIENCE_STYLES.map(o => o.value),
}

const DEFAULT_VALUES: Record<string, string> = {
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
  experienceStyle: 'fluent-glass',
}

function isValidOptionValue<K extends keyof BuilderConfig>(key: K, value: unknown): value is BuilderConfig[K] {
  const validValues = OPTION_VALUES[key]
  if (!validValues) return false
  return typeof value === 'string' && validValues.includes(value)
}

function getDefaultValue<K extends keyof BuilderConfig>(key: K): string {
  return DEFAULT_VALUES[key] || 'normal'
}

export function normalizeBuilderConfig(input: unknown): BuilderConfig {
  if (!input || typeof input !== 'object') {
    return { ...DEFAULT_CONFIG }
  }

  const config = input as Record<string, unknown>
  const result: Record<string, string> = {}

  for (const key of Object.keys(DEFAULT_VALUES)) {
    const value = config[key]
    if (isValidOptionValue(key as keyof BuilderConfig, value)) {
      result[key] = value as string
    } else {
      result[key] = getDefaultValue(key as keyof BuilderConfig)
    }
  }

  return result as unknown as BuilderConfig
}

function isValidConfig(data: unknown): data is BuilderConfig {
  if (!data || typeof data !== 'object') return false
  const config = data as Record<string, unknown>
  return (
    typeof config.themePreset === 'string' &&
    typeof config.mode === 'string' &&
    typeof config.backgroundStyle === 'string' &&
    typeof config.layoutStyle === 'string' &&
    typeof config.dockStyle === 'string' &&
    typeof config.panelChrome === 'string' &&
    typeof config.borderStyle === 'string' &&
    typeof config.surfaceMaterial === 'string' &&
    typeof config.accentIntensity === 'string' &&
    typeof config.blurStrength === 'string' &&
    typeof config.iconStyle === 'string' &&
    typeof config.contentShape === 'string' &&
    typeof config.headerHeight === 'string' &&
    typeof config.radius === 'string' &&
    typeof config.shadow === 'string' &&
    typeof config.density === 'string' &&
    typeof config.buttonStyle === 'string' &&
    typeof config.cardStyle === 'string' &&
    typeof config.inputStyle === 'string' &&
    typeof config.motionLevel === 'string' &&
    typeof config.fontScale === 'string' &&
    (typeof config.experienceStyle === 'string' || config.experienceStyle === undefined)
  )
}

export function loadBuilderConfig(): BuilderConfig {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return normalizeBuilderConfig(DEFAULT_CONFIG)

    const parsed = JSON.parse(stored)

    if (!parsed) {
      return normalizeBuilderConfig(DEFAULT_CONFIG)
    }

    if (parsed.version !== undefined && parsed.config !== undefined) {
      if (parsed.version === BUILDER_CONFIG_VERSION && isValidConfig(parsed.config)) {
        return normalizeBuilderConfig(parsed.config)
      }
      if (typeof parsed.config === 'object') {
        return normalizeBuilderConfig(parsed.config)
      }
      return normalizeBuilderConfig(DEFAULT_CONFIG)
    }

    if (isValidConfig(parsed)) {
      return normalizeBuilderConfig(parsed)
    }

    return normalizeBuilderConfig(parsed)
  } catch {
    return normalizeBuilderConfig(DEFAULT_CONFIG)
  }
}

export function saveBuilderConfig(config: BuilderConfig): void {
  try {
    const normalized = normalizeBuilderConfig(config)
    const data = {
      version: BUILDER_CONFIG_VERSION,
      config: normalized,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // localStorage 可能已满或不可用，静默失败
  }
}

export function resetBuilderConfig(): BuilderConfig {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // 静默失败
  }
  return normalizeBuilderConfig(DEFAULT_CONFIG)
}

export function mergeWithDefaultConfig(partial: Partial<BuilderConfig>): BuilderConfig {
  return normalizeBuilderConfig(partial)
}

export function isConfigSameAsPreset(config: BuilderConfig, presetConfig: BuilderConfig): boolean {
  const normalizedConfig = normalizeBuilderConfig(config)
  const normalizedPreset = normalizeBuilderConfig(presetConfig)
  return JSON.stringify(normalizedConfig) === JSON.stringify(normalizedPreset)
}

export function getConfigHealth(config: BuilderConfig): {
  version: number
  fieldsTotal: number
  fieldsValid: number
  invalidFields: string[]
  isComplete: boolean
} {
  const normalized = normalizeBuilderConfig(config)
  const invalidFields: string[] = []

  for (const key of Object.keys(DEFAULT_VALUES) as (keyof BuilderConfig)[]) {
    if (!isValidOptionValue(key, normalized[key])) {
      invalidFields.push(key)
    }
  }

  const fieldsTotal = Object.keys(DEFAULT_VALUES).length
  const fieldsValid = fieldsTotal - invalidFields.length

  return {
    version: BUILDER_CONFIG_VERSION,
    fieldsTotal,
    fieldsValid,
    invalidFields,
    isComplete: invalidFields.length === 0,
  }
}