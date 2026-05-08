import { type BuilderConfig, DEFAULT_CONFIG } from './builder'

const STORAGE_KEY = 'ui-kit-builder-config'

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
    if (!stored) return { ...DEFAULT_CONFIG }

    const parsed = JSON.parse(stored)
    if (!isValidConfig(parsed)) {
      return { ...DEFAULT_CONFIG }
    }

    return mergeWithDefaultConfig(parsed)
  } catch {
    return { ...DEFAULT_CONFIG }
  }
}

export function saveBuilderConfig(config: BuilderConfig): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config))
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
  return { ...DEFAULT_CONFIG }
}

export function mergeWithDefaultConfig(partial: Partial<BuilderConfig>): BuilderConfig {
  return {
    themePreset: partial.themePreset ?? DEFAULT_CONFIG.themePreset,
    mode: partial.mode ?? DEFAULT_CONFIG.mode,
    backgroundStyle: partial.backgroundStyle ?? DEFAULT_CONFIG.backgroundStyle,
    layoutStyle: partial.layoutStyle ?? DEFAULT_CONFIG.layoutStyle,
    dockStyle: partial.dockStyle ?? DEFAULT_CONFIG.dockStyle,
    panelChrome: partial.panelChrome ?? DEFAULT_CONFIG.panelChrome,
    borderStyle: partial.borderStyle ?? DEFAULT_CONFIG.borderStyle,
    surfaceMaterial: partial.surfaceMaterial ?? DEFAULT_CONFIG.surfaceMaterial,
    accentIntensity: partial.accentIntensity ?? DEFAULT_CONFIG.accentIntensity,
    blurStrength: partial.blurStrength ?? DEFAULT_CONFIG.blurStrength,
    iconStyle: partial.iconStyle ?? DEFAULT_CONFIG.iconStyle,
    contentShape: partial.contentShape ?? DEFAULT_CONFIG.contentShape,
    headerHeight: partial.headerHeight ?? DEFAULT_CONFIG.headerHeight,
    radius: partial.radius ?? DEFAULT_CONFIG.radius,
    shadow: partial.shadow ?? DEFAULT_CONFIG.shadow,
    density: partial.density ?? DEFAULT_CONFIG.density,
    buttonStyle: partial.buttonStyle ?? DEFAULT_CONFIG.buttonStyle,
    cardStyle: partial.cardStyle ?? DEFAULT_CONFIG.cardStyle,
    inputStyle: partial.inputStyle ?? DEFAULT_CONFIG.inputStyle,
    motionLevel: partial.motionLevel ?? DEFAULT_CONFIG.motionLevel,
    fontScale: partial.fontScale ?? DEFAULT_CONFIG.fontScale,
    experienceStyle: partial.experienceStyle ?? DEFAULT_CONFIG.experienceStyle,
  }
}
