import { type BuilderConfig } from './builder'
import { getThemeTokens, type ThemeTokens } from './themes'
import { getMotionCSSVariables } from './motion'
import { downloadTextFile } from './utils'
import JSZip from 'jszip'

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

export function generateDemoHTML(config: BuilderConfig): string {
  const lightTokens = getThemeTokens(config.themePreset, 'light')
  const themeName = config.themePreset.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${themeName} Demo - UI Foundation</title>
  <style>
    /* CSS Variables from UI Foundation */
    :root {
      --background: ${lightTokens.background};
      --foreground: ${lightTokens.foreground};
      --card: ${lightTokens.card};
      --card-foreground: ${lightTokens.cardForeground};
      --primary: ${lightTokens.primary};
      --primary-foreground: ${lightTokens.primaryForeground};
      --secondary: ${lightTokens.secondary};
      --secondary-foreground: ${lightTokens.secondaryForeground};
      --muted: ${lightTokens.muted};
      --muted-foreground: ${lightTokens.mutedForeground};
      --accent: ${lightTokens.accent};
      --accent-foreground: ${lightTokens.accentForeground};
      --destructive: ${lightTokens.destructive};
      --destructive-foreground: ${lightTokens.destructiveForeground};
      --success: ${lightTokens.success};
      --warning: ${lightTokens.warning};
      --info: ${lightTokens.info};
      --border: ${lightTokens.border};
      --input: ${lightTokens.input};
      --ring: ${lightTokens.ring};
      --radius: ${config.radius === 'sharp' ? '0' : config.radius === 'pill' ? '9999px' : config.radius === 'square' ? '0' : config.radius === 'soft' ? '4px' : config.radius === 'rounded' ? '8px' : config.radius === 'xl' ? '12px' : config.radius === 'organic' ? '16px' : '6px'};
    }

    /* Reset & Base */
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: system-ui, -apple-system, sans-serif;
      background: hsl(var(--background));
      color: hsl(var(--foreground));
      line-height: 1.6;
      min-height: 100vh;
      padding: 2rem;
    }

    /* Layout */
    .container {
      max-width: 800px;
      margin: 0 auto;
    }

    .header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .header h1 {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
    }

    /* Components */
    .card {
      background: hsl(var(--card));
      color: hsl(var(--card-foreground));
      border: 1px solid hsl(var(--border));
      border-radius: var(--radius);
      padding: 1.5rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }

    .card h2 {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    .card p {
      color: hsl(var(--muted-foreground));
      font-size: 0.875rem;
      margin-bottom: 1rem;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
      font-weight: 500;
      border-radius: var(--radius);
      cursor: pointer;
      transition: opacity 0.2s, transform 0.1s;
    }

    .btn:hover {
      opacity: 0.9;
    }

    .btn:active {
      transform: scale(0.98);
    }

    .btn-primary {
      background: hsl(var(--primary));
      color: hsl(var(--primary-foreground));
      border: none;
    }

    .btn-secondary {
      background: hsl(var(--secondary));
      color: hsl(var(--secondary-foreground));
      border: none;
    }

    .btn-outline {
      background: transparent;
      color: hsl(var(--foreground));
      border: 1px solid hsl(var(--border));
    }

    .btn-ghost {
      background: transparent;
      color: hsl(var(--foreground));
      border: none;
    }

    .btn-ghost:hover {
      background: hsl(var(--muted));
    }

    /* Badge */
    .badge {
      display: inline-block;
      padding: 0.25rem 0.5rem;
      font-size: 0.75rem;
      font-weight: 500;
      border-radius: 9999px;
      background: hsl(var(--accent));
      color: hsl(var(--accent-foreground));
    }

    /* Input */
    .input {
      width: 100%;
      padding: 0.5rem 0.75rem;
      font-size: 0.875rem;
      background: hsl(var(--background));
      color: hsl(var(--foreground));
      border: 1px solid hsl(var(--border));
      border-radius: var(--radius);
      transition: border-color 0.2s, box-shadow 0.2s;
    }

    .input:focus {
      outline: none;
      border-color: hsl(var(--ring));
      box-shadow: 0 0 0 2px hsl(var(--ring)/0.2);
    }

    /* Toggle */
    .toggle-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.75rem 0;
      border-bottom: 1px solid hsl(var(--border));
    }

    .toggle-row:last-child {
      border-bottom: none;
    }

    /* Footer */
    .footer {
      margin-top: 3rem;
      text-align: center;
      color: hsl(var(--muted-foreground));
      font-size: 0.875rem;
    }

    .footer a {
      color: hsl(var(--primary));
      text-decoration: none;
    }

    .footer a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="container">
    <header class="header">
      <h1>UI Foundation Demo</h1>
      <p>Theme: ${themeName}</p>
    </header>

    <section class="grid">
      <div class="card">
        <h2>Welcome Card</h2>
        <p>This is a basic card component using UI Foundation tokens.</p>
        <button class="btn btn-primary">Primary Action</button>
      </div>

      <div class="card">
        <h2>Secondary Card</h2>
        <p>You can use different button variants.</p>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <button class="btn btn-secondary">Secondary</button>
          <button class="btn btn-outline">Outline</button>
          <button class="btn btn-ghost">Ghost</button>
        </div>
      </div>

      <div class="card">
        <h2>Form Elements</h2>
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          <input type="text" class="input" placeholder="Text input" />
          <input type="email" class="input" placeholder="Email input" />
        </div>
      </div>

      <div class="card">
        <h2>Badges & Status</h2>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1rem;">
          <span class="badge">Badge</span>
          <span class="badge" style="background: hsl(var(--success)); color: hsl(var(--success-foreground));">Success</span>
          <span class="badge" style="background: hsl(var(--warning)); color: hsl(var(--warning-foreground));">Warning</span>
        </div>
        <div class="toggle-row">
          <span>Toggle Option</span>
          <button class="btn btn-ghost" style="padding: 0.25rem 0.5rem;">Off</button>
        </div>
        <div class="toggle-row">
          <span>Another Option</span>
          <button class="btn btn-ghost" style="padding: 0.25rem 0.5rem; background: hsl(var(--primary)); color: hsl(var(--primary-foreground));">On</button>
        </div>
      </div>
    </section>

    <footer class="footer">
      <p>Generated with <a href="#">UI Foundation</a> - Theme: ${themeName}</p>
    </footer>
  </div>
</body>
</html>`
}

export function generateDemoCSS(config: BuilderConfig): string {
  const lightTokens = getThemeTokens(config.themePreset, config.mode)
  
  const radius = config.radius === 'sharp' ? '0' : config.radius === 'pill' ? '9999px' : config.radius === 'square' ? '0' : config.radius === 'soft' ? '4px' : config.radius === 'rounded' ? '8px' : config.radius === 'xl' ? '12px' : config.radius === 'organic' ? '16px' : '6px'

  return `/* UI Foundation Demo CSS */
/* Add these to your project or import this file */

:root {
  /* Color tokens from UI Foundation */
  --background: ${lightTokens.background};
  --foreground: ${lightTokens.foreground};
  --card: ${lightTokens.card};
  --card-foreground: ${lightTokens.cardForeground};
  --primary: ${lightTokens.primary};
  --primary-foreground: ${lightTokens.primaryForeground};
  --secondary: ${lightTokens.secondary};
  --secondary-foreground: ${lightTokens.secondaryForeground};
  --muted: ${lightTokens.muted};
  --muted-foreground: ${lightTokens.mutedForeground};
  --accent: ${lightTokens.accent};
  --accent-foreground: ${lightTokens.accentForeground};
  --destructive: ${lightTokens.destructive};
  --destructive-foreground: ${lightTokens.destructiveForeground};
  --success: ${lightTokens.success};
  --warning: ${lightTokens.warning};
  --info: ${lightTokens.info};
  --border: ${lightTokens.border};
  --input: ${lightTokens.input};
  --ring: ${lightTokens.ring};
  
  /* Config tokens */
  --radius: ${radius};
}

/* Base styles */
body {
  background: hsl(var(--background));
  color: hsl(var(--foreground));
  font-family: system-ui, -apple-system, sans-serif;
}

/* Card */
.ui-card {
  background: hsl(var(--card));
  color: hsl(var(--card-foreground));
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius);
  padding: 1.5rem;
}

/* Button variants */
.ui-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: var(--radius);
  cursor: pointer;
  border: none;
  transition: opacity 0.2s;
}

.ui-btn:hover {
  opacity: 0.9;
}

.ui-btn-primary {
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}

.ui-btn-secondary {
  background: hsl(var(--secondary));
  color: hsl(var(--secondary-foreground));
}

.ui-btn-outline {
  background: transparent;
  border: 1px solid hsl(var(--border));
  color: hsl(var(--foreground));
}

.ui-btn-ghost {
  background: transparent;
  color: hsl(var(--foreground));
}

.ui-btn-ghost:hover {
  background: hsl(var(--muted));
}

/* Input */
.ui-input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  background: hsl(var(--background));
  color: hsl(var(--foreground));
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius);
}

.ui-input:focus {
  outline: none;
  border-color: hsl(var(--ring));
  box-shadow: 0 0 0 2px hsl(var(--ring)/0.2);
}

/* Badge */
.ui-badge {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 9999px;
  background: hsl(var(--accent));
  color: hsl(var(--accent-foreground));
}
`
}

export function downloadDemoHTML(config: BuilderConfig): void {
  const content = generateDemoHTML(config)
  downloadTextFile('demo.html', content)
}

export function downloadDemoCSS(config: BuilderConfig): void {
  const content = generateDemoCSS(config)
  downloadTextFile('demo.css', content)
}

export function generateStarterKitReadme(config: BuilderConfig): string {
  const themeName = config.themePreset.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  const radiusLabel = config.radius === 'sharp' ? 'Sharp (0px)' 
    : config.radius === 'pill' ? 'Pill (9999px)' 
    : config.radius === 'rounded' ? 'Rounded (8px)' 
    : config.radius === 'xl' ? 'XL (12px)' 
    : config.radius === 'organic' ? 'Organic (16px)' 
    : config.radius === 'soft' ? 'Soft (4px)' 
    : config.radius === 'square' ? 'Square (0px)' 
    : 'Default (6px)'

  return `# UI Foundation Starter Kit

## Theme: ${themeName}

### What's Included

- **demo.html** - Standalone demo page, open directly in browser (no build required)
- **demo.css** - CSS component classes with your theme tokens
- **ui-kit.json** - Full configuration backup (importable in UI Foundation)

### Quick Start

1. Extract this ZIP to your project folder
2. Open demo.html in browser to preview
3. Copy demo.css to your project

### Configuration

- **Theme Preset**: ${config.themePreset}
- **Mode**: ${config.mode}
- **Radius**: ${radiusLabel}
- **Motion Level**: ${config.motionLevel}
- **Font Scale**: ${config.fontScale}

### Integration Options

#### Option 1: Pure HTML/CSS
Simply link demo.css in your HTML:
\`\`\`html
<link rel="stylesheet" href="demo.css">
<div class="ui-card">
  <h2>Card Title</h2>
  <button class="ui-btn ui-btn-primary">Action</button>
</div>
\`\`\`

#### Option 2: Tailwind CSS
Add to tailwind.config.js:
\`\`\`js
colors: {
  background: 'hsl(var(--background))',
  primary: 'hsl(var(--primary))',
  // ... other tokens
}
\`\`\`

#### Option 3: Dynamic Runtime
Load ui-kit.json and apply tokens at runtime:
\`\`\`js
const uiKit = await fetch('/ui-kit.json').then(r => r.json())
document.documentElement.style.setProperty('--primary', uiKit.theme.tokens.primary)
\`\`\`

### CSS Variables

Your theme includes these CSS variables:
\`\`\`css
--background, --foreground, --card, --card-foreground
--primary, --primary-foreground, --secondary, --secondary-foreground
--muted, --muted-foreground, --accent, --accent-foreground
--destructive, --success, --warning, --info, --border, --input, --ring
\`\`\`

### Republishing

This starter kit was generated by **UI Foundation**
https://github.com/your-repo/web-os-ui-kit-builder

---
Generated: ${new Date().toISOString().split('T')[0]}
`
}

export async function downloadStarterKitZip(config: BuilderConfig): Promise<void> {
  const zip = new JSZip()

  zip.file('demo.html', generateDemoHTML(config))
  zip.file('demo.css', generateDemoCSS(config))
  zip.file('ui-kit.json', generateUIKitJSON(config))
  zip.file('README.md', generateStarterKitReadme(config))

  const blob = await zip.generateAsync({ type: 'blob' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `ui-kit-starter-${config.themePreset}.zip`
  a.click()
  URL.revokeObjectURL(url)
}
