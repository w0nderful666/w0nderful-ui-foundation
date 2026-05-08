import { type BuilderConfig, type Radius, type Shadow, type Density, type FontScale } from './builder'
import { getThemeTokens } from './themes'
import { getMotionCSSVariables } from './motion'
import { DENSITY_STYLES, FONT_SCALE_STYLES } from './previewConfig'

const RADIUS_VALUES: Record<Radius, string> = {
  sharp: '0px',
  soft: '4px',
  rounded: '8px',
  pill: '9999px',
}

const SHADOW_VALUES: Record<Shadow, Record<string, string>> = {
  flat: {
    '--shadow-sm': 'none',
    '--shadow-md': 'none',
    '--shadow-lg': 'none',
  },
  soft: {
    '--shadow-sm': '0 2px 4px rgba(0,0,0,0.06)',
    '--shadow-md': '0 4px 12px rgba(0,0,0,0.08)',
    '--shadow-lg': '0 8px 24px rgba(0,0,0,0.1)',
  },
  floating: {
    '--shadow-sm': '0 4px 8px rgba(0,0,0,0.08)',
    '--shadow-md': '0 12px 24px rgba(0,0,0,0.12)',
    '--shadow-lg': '0 24px 48px rgba(0,0,0,0.16)',
  },
  elevated: {
    '--shadow-sm': '0 8px 16px rgba(0,0,0,0.12)',
    '--shadow-md': '0 16px 32px rgba(0,0,0,0.18)',
    '--shadow-lg': '0 32px 64px rgba(0,0,0,0.24)',
  },
  glow: {
    '--shadow-sm': '0 0 12px hsl(var(--primary) / 0.25)',
    '--shadow-md': '0 0 24px hsl(var(--primary) / 0.4)',
    '--shadow-lg': '0 0 48px hsl(var(--primary) / 0.5)',
  },
}

const FONT_SCALE_VALUES: Record<FontScale, string> = {
  compact: '13px',
  normal: '15px',
  large: '17px',
  display: '20px',
}

export function applyBuilderTheme(config: BuilderConfig): void {
  const root = document.documentElement
  const tokens = getThemeTokens(config.themePreset, config.mode)

  // 写入主题色 token
  root.style.setProperty('--background', tokens.background)
  root.style.setProperty('--foreground', tokens.foreground)
  root.style.setProperty('--card', tokens.card)
  root.style.setProperty('--card-foreground', tokens.cardForeground)
  root.style.setProperty('--primary', tokens.primary)
  root.style.setProperty('--primary-foreground', tokens.primaryForeground)
  root.style.setProperty('--secondary', tokens.secondary)
  root.style.setProperty('--secondary-foreground', tokens.secondaryForeground)
  root.style.setProperty('--muted', tokens.muted)
  root.style.setProperty('--muted-foreground', tokens.mutedForeground)
  root.style.setProperty('--accent', tokens.accent)
  root.style.setProperty('--accent-foreground', tokens.accentForeground)
  root.style.setProperty('--border', tokens.border)
  root.style.setProperty('--input', tokens.input)
  root.style.setProperty('--ring', tokens.ring)
  root.style.setProperty('--destructive', tokens.destructive)
  root.style.setProperty('--destructive-foreground', tokens.destructiveForeground)
  root.style.setProperty('--success', tokens.success)
  root.style.setProperty('--warning', tokens.warning)
  root.style.setProperty('--info', tokens.info)

  // 写入 radius
  root.style.setProperty('--radius', RADIUS_VALUES[config.radius])

  // 写入 shadow
  const shadows = SHADOW_VALUES[config.shadow]
  Object.entries(shadows).forEach(([key, value]) => {
    root.style.setProperty(key, value)
  })

  // 写入 font scale
  const fontScale = FONT_SCALE_VALUES[config.fontScale]
  root.style.setProperty('--font-size-base', fontScale)
  Object.entries(FONT_SCALE_STYLES[config.fontScale]).forEach(([key, value]) => {
    root.style.setProperty(key, value)
  })

  // 写入 density - dramatically different values
  const densityValues = DENSITY_STYLES[config.density]
  Object.entries(densityValues).forEach(([key, value]) => {
    root.style.setProperty(key, value)
  })

  // 写入 motion
  const motionVars = getMotionCSSVariables(config.motionLevel)
  Object.entries(motionVars).forEach(([key, value]) => {
    root.style.setProperty(key, value)
  })

  // 切换 dark mode class
  if (config.mode === 'dark') {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }
}
