import { type BuilderConfig } from './builder'
import { getThemeTokens, type ThemeTokens } from './themes'
import { getMotionCSSVariables } from './motion'
import { downloadTextFile } from './utils'

function tokensToCSSVariables(tokens: ThemeTokens): string {
  const entries = Object.entries(tokens) as [keyof ThemeTokens, string][]
  return entries.map(([key, value]) => {
    const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase()
    return `  --${cssKey}: ${value};`
  }).join('\n')
}

export function generateCSSVariables(config: BuilderConfig): string {
  const tokens = getThemeTokens(config.themePreset, config.mode)
  const motionVars = getMotionCSSVariables(config.motionLevel)
  
  const lines = [
    `:root {`,
    tokensToCSSVariables(tokens),
  ]

  Object.entries(motionVars).forEach(([key, value]) => {
    lines.push(`  ${key}: ${value};`)
  })

  lines.push(`}`)
  return lines.join('\n')
}

export function generateThemeCSS(config: BuilderConfig): string {
  const lightTokens = getThemeTokens(config.themePreset, 'light')
  const darkTokens = getThemeTokens(config.themePreset, 'dark')
  const motionVars = getMotionCSSVariables(config.motionLevel)

  const lightVars = Object.entries(lightTokens)
    .map(([key, value]) => {
      const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase()
      return `  --${cssKey}: ${value};`
    })
    .join('\n')

  const darkVars = Object.entries(darkTokens)
    .map(([key, value]) => {
      const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase()
      return `  --${cssKey}: ${value};`
    })
    .join('\n')

  const motionCSS = Object.entries(motionVars)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n')

  return `/* Web OS UI Kit Builder - ${config.themePreset} */

:root {
${lightVars}
${motionCSS}
}

.dark {
${darkVars}
}
`
}

export function generateTailwindConfig(_config: BuilderConfig): string {
  return `// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        success: 'hsl(var(--success))',
        warning: 'hsl(var(--warning))',
        info: 'hsl(var(--info))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
}

export default config
`
}

export function generateUIKitJSON(config: BuilderConfig): string {
  const tokens = getThemeTokens(config.themePreset, config.mode)
  
  return JSON.stringify({
    name: 'web-os-ui-kit',
    version: '1.0.0',
    theme: {
      preset: config.themePreset,
      mode: config.mode,
      tokens,
    },
    style: {
      radius: config.radius,
      shadow: config.shadow,
      density: config.density,
      buttonStyle: config.buttonStyle,
      cardStyle: config.cardStyle,
      inputStyle: config.inputStyle,
      fontScale: config.fontScale,
    },
    motion: {
      level: config.motionLevel,
      variables: getMotionCSSVariables(config.motionLevel),
    },
  }, null, 2)
}

export function generateReactTokenObject(config: BuilderConfig): string {
  const tokens = getThemeTokens(config.themePreset, config.mode)

  return `// React Token Object
export const theme = {
  colors: {
    background: 'hsl(${tokens.background})',
    foreground: 'hsl(${tokens.foreground})',
    card: 'hsl(${tokens.card})',
    cardForeground: 'hsl(${tokens.cardForeground})',
    primary: 'hsl(${tokens.primary})',
    primaryForeground: 'hsl(${tokens.primaryForeground})',
    secondary: 'hsl(${tokens.secondary})',
    secondaryForeground: 'hsl(${tokens.secondaryForeground})',
    muted: 'hsl(${tokens.muted})',
    mutedForeground: 'hsl(${tokens.mutedForeground})',
    accent: 'hsl(${tokens.accent})',
    accentForeground: 'hsl(${tokens.accentForeground})',
    destructive: 'hsl(${tokens.destructive})',
    destructiveForeground: 'hsl(${tokens.destructiveForeground})',
    success: 'hsl(${tokens.success})',
    warning: 'hsl(${tokens.warning})',
    info: 'hsl(${tokens.info})',
    border: 'hsl(${tokens.border})',
    input: 'hsl(${tokens.input})',
    ring: 'hsl(${tokens.ring})',
  },
  config: {
    radius: '${config.radius}',
    shadow: '${config.shadow}',
    density: '${config.density}',
    motionLevel: '${config.motionLevel}',
    fontScale: '${config.fontScale}',
  },
} as const

export type Theme = typeof theme
`
}

export function downloadThemeCSS(config: BuilderConfig): void {
  const content = generateThemeCSS(config)
  downloadTextFile(`${config.themePreset}-theme.css`, content)
}

export function downloadUIKitJSON(config: BuilderConfig): void {
  const content = generateUIKitJSON(config)
  downloadTextFile('ui-kit.json', content)
}
