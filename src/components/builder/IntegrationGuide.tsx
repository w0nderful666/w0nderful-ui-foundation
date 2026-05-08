import { useState, useCallback } from 'react'
import { type BuilderConfig } from '@/lib/builder'
import { generateThemeCSS, generateTailwindConfig, generateUIKitJSON, generateDemoHTML, generateDemoCSS, downloadStarterKitZip } from '@/lib/export'
import { copyText, downloadTextFile } from '@/lib/utils'
import { Copy, Check, FileCode, FileJson, Zap, Layers, Download, CheckCircle, Circle, AlertCircle, Archive } from 'lucide-react'

interface IntegrationGuideProps {
  config: BuilderConfig
}

const TABS = [
  { id: 'starter', label: 'Starter Files', icon: Download },
  { id: 'html', label: 'HTML / CSS', icon: FileCode },
  { id: 'react', label: 'React + Tailwind', icon: FileCode },
  { id: 'astro', label: 'Astro / Static', icon: FileCode },
  { id: 'runtime', label: 'Dynamic Runtime', icon: Zap },
  { id: 'deep', label: 'Deep Integration', icon: Layers },
]

function CodeBlock({ code, label, actions }: { code: string; label: string; actions?: React.ReactNode }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    const success = await copyText(code)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [code])

  return (
    <div className="relative group">
      <pre className="bg-zinc-900 text-zinc-100 p-4 rounded-lg text-xs overflow-x-auto font-mono">
        {code}
      </pre>
      <div className="absolute top-2 right-2 flex gap-1">
        {actions}
        <button
          onClick={handleCopy}
          className="p-1.5 rounded bg-zinc-800 hover:bg-zinc-700 transition-colors opacity-0 group-hover:opacity-100"
          title="Copy code"
        >
          {copied ? <Check className="h-3 w-3 text-green-400" /> : <Copy className="h-3 w-3 text-zinc-400" />}
        </button>
      </div>
    </div>
  )
}

function ChecklistItem({ checked, label }: { checked: boolean; label: string }) {
  return (
    <div className="flex items-center gap-2 text-xs">
      {checked ? (
        <CheckCircle className="h-3.5 w-3.5 text-green-500 shrink-0" />
      ) : (
        <Circle className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
      )}
      <span className={checked ? 'text-foreground' : 'text-muted-foreground'}>{label}</span>
    </div>
  )
}

function ComparisonTable() {
  const light = [
    { feature: 'Effort', light: 'Low', deep: 'High' },
    { feature: 'Best for', light: 'Simple sites', deep: 'Design systems' },
    { feature: 'Risk', light: 'Low', deep: 'Medium' },
    { feature: 'Maintenance', light: 'None', deep: 'Ongoing' },
    { feature: 'Theme switching', light: 'Manual', deep: 'Dynamic' },
  ]

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-2 px-3 font-medium text-muted-foreground">Feature</th>
            <th className="text-center py-2 px-3 font-medium text-green-500">Lightweight</th>
            <th className="text-center py-2 px-3 font-medium text-blue-500">Deep Integration</th>
          </tr>
        </thead>
        <tbody>
          {light.map((row, i) => (
            <tr key={i} className="border-b border-border/50">
              <td className="py-2 px-3 text-muted-foreground">{row.feature}</td>
              <td className="py-2 px-3 text-center text-green-500">{row.light}</td>
              <td className="py-2 px-3 text-center text-blue-500">{row.deep}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function IntegrationGuide({ config }: IntegrationGuideProps) {
  const [activeTab, setActiveTab] = useState('starter')
  const themeFileName = `${config.themePreset}-theme.css`

  const htmlCSSCode = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>UI Foundation Demo</title>
  <link rel="stylesheet" href="./theme.css">
  <link rel="stylesheet" href="./demo.css">
</head>
<body>
  <div class="ui-card">
    <h2>Welcome Card</h2>
    <p>This card uses CSS variables from theme.css.</p>
    <button class="ui-btn ui-btn-primary">Action</button>
  </div>
</body>
</html>`

  const demoCSSCode = `/* demo.css - Add to your project */
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --card: 0 0% 98%;
  --card-foreground: 240 5.9% 10%;
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 0 0% 100%;
  --muted: 240 4.8% 95.9%;
  --muted-foreground: 240 3.8% 46.1%;
  --border: 240 5.9% 90%;
  --radius: 0.5rem;
}

body {
  background: hsl(var(--background));
  color: hsl(var(--foreground));
}

.ui-card {
  background: hsl(var(--card));
  color: hsl(var(--card-foreground));
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius);
  padding: 1.5rem;
}

.ui-btn {
  display: inline-flex;
  padding: 0.5rem 1rem;
  border-radius: var(--radius);
  font-weight: 500;
  cursor: pointer;
  border: none;
}

.ui-btn-primary {
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}`

  const reactCode = `// 1. Download theme.css, save as src/styles/theme.css
// 2. In your main entry (main.tsx or App.tsx):
import './styles/theme.css'
import './index.css'

// 3. In tailwind.config.js, add:
module.exports = {
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: 'hsl(var(--card))',
        'card-foreground': 'hsl(var(--card-foreground))',
        primary: 'hsl(var(--primary))',
        'primary-foreground': 'hsl(var(--primary-foreground))',
        muted: 'hsl(var(--muted))',
        'muted-foreground': 'hsl(var(--muted-foreground))',
        border: 'hsl(var(--border))',
      }
    }
  }
}

// 4. Use in components:
export function Card({ children }) {
  return (
    <div className="bg-card text-card-foreground border border-border rounded-lg p-6">
      {children}
    </div>
  )
}

export function Button({ children, variant = 'primary' }) {
  const variants = {
    primary: 'bg-primary text-primary-foreground',
    outline: 'border border-border bg-transparent',
    ghost: 'bg-transparent hover:bg-muted',
  }
  return (
    <button className={\`px-4 py-2 rounded-md \${variants[variant]}\`}>
      {children}
    </button>
  )
}`

  const astroCode = `<!-- 1. Download theme.css, save as src/styles/theme.css -->
<!-- 2. In your layout (src/layouts/Layout.astro): -->
---
import '../styles/theme.css'
---

<html>
  <body>
    <slot />
  </body>
</html>

<!-- 3. Use in pages (src/pages/index.astro): -->
<section class="card">
  <h1>My Web OS</h1>
  <p>Powered by UI Foundation</p>
  <button class="btn-primary">Get Started</button>
</section>

<style>
  .card {
    background: hsl(var(--card));
    color: hsl(var(--card-foreground));
    border: 1px solid hsl(var(--border));
    border-radius: var(--radius);
    padding: 2rem;
  }
  
  .btn-primary {
    background: hsl(var(--primary));
    color: hsl(var(--primary-foreground));
    padding: 0.5rem 1rem;
    border-radius: var(--radius);
    border: none;
    cursor: pointer;
  }
</style>`

  const runtimeCode = `// Complete token map for runtime application
const TOKEN_MAP = {
  background: '--background',
  foreground: '--foreground',
  card: '--card',
  cardForeground: '--card-foreground',
  primary: '--primary',
  primaryForeground: '--primary-foreground',
  secondary: '--secondary',
  secondaryForeground: '--secondary-foreground',
  muted: '--muted',
  mutedForeground: '--muted-foreground',
  accent: '--accent',
  accentForeground: '--accent-foreground',
  destructive: '--destructive',
  destructiveForeground: '--destructive-foreground',
  success: '--success',
  warning: '--warning',
  info: '--info',
  border: '--border',
  input: '--input',
  ring: '--ring',
}

function applyUIKitTokens(uiKit) {
  const root = document.documentElement
  
  // Apply all tokens
  for (const [key, cssVar] of Object.entries(TOKEN_MAP)) {
    const value = uiKit.theme.tokens[key]
    if (value) {
      root.style.setProperty(cssVar, value)
    }
  }
  
  // Apply config (radius)
  root.style.setProperty('--radius', uiKit.config.radius || '0.5rem')
}

// Load and apply theme
async function loadTheme() {
  const response = await fetch('/ui-kit.json')
  const uiKit = await response.json()
  applyUIKitTokens(uiKit)
}

// Toggle dark mode
function toggleDarkMode(isDark) {
  const root = document.documentElement
  const tokens = isDark 
    ? uiKit.theme.tokensDark 
    : uiKit.theme.tokens
  
  for (const [key, cssVar] of Object.entries(TOKEN_MAP)) {
    if (tokens[key]) {
      root.style.setProperty(cssVar, tokens[key])
    }
  }
  localStorage.setItem('theme-mode', isDark ? 'dark' : 'light')
}

loadTheme()`

  const deepCode = `// Deep Integration - 4 Phase Approach

// Phase 1: CSS Only (Low Risk)
// - Download theme.css
// - Add to HTML: <link rel="stylesheet" href="theme.css">
// - Use: <div class="card">...</div>

// Phase 2: Tailwind Tokens (Medium Effort)  
// - Configure tailwind.config.js with tokens
// - Replace hardcoded colors: bg-blue-500 → bg-primary
// - Replace text colors: text-gray-900 → text-foreground

// Phase 3: Component Variants (Higher Effort)
// - Create Button, Card, Input components
// - Define variants matching UI Foundation styles
// - Use in your app

// Phase 4: Full Runtime (Advanced)
// - Load ui-kit.json dynamically
// - Allow runtime theme switching
// - Save user preferences to localStorage`

  const checklistItems = [
    { label: 'I downloaded theme.css' },
    { label: 'I added CSS variables to my project' },
    { label: 'I replaced hardcoded colors with tokens' },
    { label: 'I configured Tailwind tokens (if using Tailwind)' },
    { label: 'I tested light/dark mode switching' },
    { label: 'I saved ui-kit.json as backup' },
  ]

  const handleDownloadDemoHTML = () => {
    const html = generateDemoHTML(config)
    downloadTextFile('demo.html', html)
  }

  const handleDownloadDemoCSS = () => {
    const css = generateDemoCSS(config)
    downloadTextFile('demo.css', css)
  }

  const handleDownloadThemeCSS = () => {
    const css = generateThemeCSS(config)
    downloadTextFile(themeFileName, css)
  }

  const handleDownloadUIKitJSON = () => {
    const json = generateUIKitJSON(config)
    downloadTextFile('ui-kit.json', json)
  }

  const handleDownloadStarterKitZip = async () => {
    await downloadStarterKitZip(config)
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-1 overflow-x-auto pb-2">
        {TABS.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs whitespace-nowrap
                transition-colors
                ${activeTab === tab.id 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground hover:bg-muted/70'}
              `}
            >
              <Icon className="h-3 w-3" />
              {tab.label}
            </button>
          )
        })}
      </div>

      <div className="space-y-3">
        {activeTab === 'starter' && (
          <>
            <p className="text-xs text-muted-foreground">
              Download ready-to-use starter files. Open demo.html directly in browser - no build required.
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={handleDownloadDemoHTML}
                className="flex items-center justify-center gap-2 px-3 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-md text-xs font-medium transition-colors"
              >
                <Download className="h-3 w-3" />
                demo.html
              </button>
              <button 
                onClick={handleDownloadDemoCSS}
                className="flex items-center justify-center gap-2 px-3 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-md text-xs font-medium transition-colors"
              >
                <Download className="h-3 w-3" />
                demo.css
              </button>
              <button 
                onClick={handleDownloadThemeCSS}
                className="flex items-center justify-center gap-2 px-3 py-2 bg-secondary/10 hover:bg-secondary/20 text-secondary rounded-md text-xs font-medium transition-colors"
              >
                <Download className="h-3 w-3" />
                theme.css
              </button>
              <button 
                onClick={handleDownloadUIKitJSON}
                className="flex items-center justify-center gap-2 px-3 py-2 bg-secondary/10 hover:bg-secondary/20 text-secondary rounded-md text-xs font-medium transition-colors"
              >
                <Download className="h-3 w-3" />
                ui-kit.json
              </button>
            </div>
            <div className="mt-3 pt-3 border-t border-border">
              <button 
                onClick={handleDownloadStarterKitZip}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 text-primary-foreground rounded-md text-sm font-medium transition-colors shadow-sm"
              >
                <Archive className="h-4 w-4" />
                Download Starter Kit ZIP
              </button>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Contains: demo.html, demo.css, ui-kit.json, README.md
              </p>
            </div>
            <p className="text-xs text-muted-foreground">
              demo.html uses pure CSS (no Tailwind required). Open it directly in browser to preview.
            </p>
          </>
        )}

        {activeTab === 'html' && (
          <>
            <p className="text-xs text-muted-foreground">
              Pure HTML/CSS approach - no build tools or Tailwind required. Best for simple websites.
            </p>
            <CodeBlock code={htmlCSSCode} label="HTML" />
            <CodeBlock code={demoCSSCode} label="demo.css" />
            <div className="text-xs text-muted-foreground">
              <span className="font-medium">Use case:</span> Simple static sites, landing pages, demos
            </div>
          </>
        )}

        {activeTab === 'react' && (
          <>
            <p className="text-xs text-muted-foreground">
              Full React + Tailwind integration. Best for React/Vite/Next.js projects.
            </p>
            <CodeBlock code={reactCode} label="React + Tailwind Setup" />
            <div className="text-xs text-muted-foreground">
              <span className="font-medium">Use case:</span> React apps, Vite projects, Next.js, design systems
            </div>
          </>
        )}

        {activeTab === 'astro' && (
          <>
            <p className="text-xs text-muted-foreground">
              Astro / static site approach - works with or without Tailwind. Perfect for GitHub Pages.
            </p>
            <CodeBlock code={astroCode} label="Astro Integration" />
            <div className="text-xs text-muted-foreground">
              <span className="font-medium">Use case:</span> Astro, GitHub Pages, static blogs, JAMstack
            </div>
          </>
        )}

        {activeTab === 'runtime' && (
          <>
            <p className="text-xs text-muted-foreground">
              Dynamic runtime theme loading with full token map. Best for theme switching.
            </p>
            <CodeBlock code={runtimeCode} label="Runtime Theme Loading" />
            <div className="text-xs text-muted-foreground">
              <span className="font-medium">Use case:</span> Theme switcher, user preferences, A/B testing
            </div>
          </>
        )}

        {activeTab === 'deep' && (
          <>
            <p className="text-xs text-muted-foreground">
              Gradual component migration strategy. Choose your integration level based on project needs.
            </p>
            <CodeBlock code={deepCode} label="Deep Integration Guide" />
            <div className="mt-4">
              <h4 className="text-xs font-medium mb-2">Quick Comparison</h4>
              <ComparisonTable />
            </div>
            <div className="text-xs text-muted-foreground">
              <span className="font-medium">Recommendation:</span> Start with Phase 1, upgrade as needed
            </div>
          </>
        )}
      </div>

      <div className="pt-4 border-t border-border">
        <h4 className="text-xs font-medium mb-3">Integration Checklist</h4>
        <div className="grid grid-cols-2 gap-2">
          {checklistItems.map((item, i) => (
            <ChecklistItem key={i} checked={false} label={item.label} />
          ))}
        </div>
      </div>

      <div className="pt-2 text-xs text-muted-foreground">
        <span className="font-medium">Quick start:</span> Download demo.html to see a working example, 
        or download theme.css for minimal integration.
      </div>
    </div>
  )
}