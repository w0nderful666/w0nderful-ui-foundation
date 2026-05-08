import { useState, useCallback } from 'react'
import { type BuilderConfig } from '@/lib/builder'
import { generateThemeCSS, generateTailwindConfig, generateUIKitJSON } from '@/lib/export'
import { copyText } from '@/lib/utils'
import { Copy, Check, FileCode, FileJson, Palette, Zap, Layers, Code2 } from 'lucide-react'

interface IntegrationGuideProps {
  config: BuilderConfig
}

const TABS = [
  { id: 'html', label: 'HTML / CSS', icon: FileCode },
  { id: 'react', label: 'React + Tailwind', icon: Code2 },
  { id: 'astro', label: 'Astro / Static', icon: FileCode },
  { id: 'runtime', label: 'Dynamic Runtime', icon: Zap },
  { id: 'deep', label: 'Deep Integration', icon: Layers },
]

function CodeBlock({ code, label }: { code: string; label: string }) {
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
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-1.5 rounded bg-zinc-800 hover:bg-zinc-700 transition-colors opacity-0 group-hover:opacity-100"
        title="Copy code"
      >
        {copied ? <Check className="h-3 w-3 text-green-400" /> : <Copy className="h-3 w-3 text-zinc-400" />}
      </button>
    </div>
  )
}

export function IntegrationGuide({ config }: IntegrationGuideProps) {
  const [activeTab, setActiveTab] = useState('html')
  const themeFileName = `${config.themePreset}-theme.css`

  const htmlCSSCode = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>UI Foundation Demo</title>
  <link rel="stylesheet" href="./${themeFileName}">
</head>
<body style="background: hsl(var(--background)); color: hsl(var(--foreground));">
  
  <div class="card" style="
    background: hsl(var(--card));
    color: hsl(var(--card-foreground));
    border: 1px solid hsl(var(--border));
    border-radius: var(--radius);
    padding: 1.5rem;
    margin: 2rem auto;
    max-width: 400px;
  ">
    <h1 style="font-size: var(--font-size-lg); font-weight: 600; margin-bottom: 0.5rem;">
      Hello UI Foundation
    </h1>
    <p style="color: hsl(var(--muted-foreground)); margin-bottom: 1rem;">
      This card uses exported theme tokens.
    </p>
    <button style="
      background: hsl(var(--primary));
      color: hsl(var(--primary-foreground));
      border: none;
      border-radius: var(--radius);
      padding: 0.5rem 1rem;
      cursor: pointer;
    ">
      Action
    </button>
  </div>

</body>
</html>`

  const reactTailwindCode = `// 1. Download theme.css and add to your project
// 2. Use Tailwind classes with UI Foundation tokens

export function DemoCard() {
  return (
    <div className="
      rounded-lg 
      border border-border 
      bg-card 
      p-6 
      text-card-foreground 
      shadow-lg
      max-w-md
      mx-auto
    ">
      <h2 className="text-xl font-semibold text-foreground mb-2">
        Web OS Card
      </h2>
      <p className="text-muted-foreground mb-4">
        This card uses exported UI Foundation tokens.
      </p>
      <button className="
        bg-primary 
        text-primary-foreground 
        px-4 py-2 
        rounded-md 
        hover:opacity-90
        transition-opacity
      ">
        Action
      </button>
    </div>
  )
}

// Tailwind config example:
// Add to tailwind.config.js:
// colors: {
//   background: 'hsl(var(--background))',
//   foreground: 'hsl(var(--foreground))',
//   card: 'hsl(var(--card))',
//   'card-foreground': 'hsl(var(--card-foreground))',
//   primary: 'hsl(var(--primary))',
//   'primary-foreground': 'hsl(var(--primary-foreground))',
//   border: 'hsl(var(--border))',
//   muted: 'hsl(var(--muted))',
//   'muted-foreground': 'hsl(var(--muted-foreground))',
// }`

  const astroCode = `---
// src/pages/index.astro
import '../styles/${themeFileName}'
---

<section class="
  rounded-lg 
  border border-border 
  bg-card 
  p-8 
  text-card-foreground
  max-w-md
  mx-auto
  mt-8
">
  <h1 class="text-2xl font-bold text-foreground mb-3">
    My Web OS
  </h1>
  <p class="text-muted-foreground mb-4">
    Powered by UI Foundation tokens.
  </p>
  <button class="
    bg-primary 
    text-primary-foreground 
    px-4 py-2 
    rounded-md
  ">
    Get Started
  </button>
</section>

<!-- CSS custom properties are automatically available -->
<style>
  :root {
    --radius: ${config.radius};
  }
</style>

<!-- For Astro + Tailwind, also add tokens to tailwind.config.js -->

<!-- Perfect for: GitHub Pages, Astro, static blogs, no-backend projects -->`

  const runtimeCode = `// Dynamic theme loading - apply tokens at runtime
// Perfect for: theme switching, user preferences, A/B testing

interface ThemeTokens {
  background: string
  foreground: string
  card: string
  cardForeground: string
  primary: string
  primaryForeground: string
  border: string
  // ... more tokens
}

function applyTokens(tokens: ThemeTokens) {
  const root = document.documentElement
  
  // Convert camelCase to kebab-case for CSS custom properties
  const tokenMap: Record<string, string> = {
    background: '--background',
    foreground: '--foreground',
    card: '--card',
    cardForeground: '--card-foreground',
    primary: '--primary',
    primaryForeground: '--primary-foreground',
    border: '--border',
  }
  
  for (const [key, cssVar] of Object.entries(tokenMap)) {
    if (tokens[key as keyof ThemeTokens]) {
      root.style.setProperty(cssVar, tokens[key as keyof ThemeTokens])
    }
  }
}

// Usage example:
async function loadDynamicTheme() {
  const response = await fetch('/ui-kit.json')
  const uiKit = await response.json()
  
  // Apply the theme tokens
  applyTokens(uiKit.theme.tokens)
  
  // Optionally apply other config
  document.documentElement.style.setProperty(
    '--radius', 
    uiKit.config.radius || '0.5rem'
  )
}

// Call on page load or when user wants to switch themes
loadDynamicTheme()`

  const deepIntegrationCode = `// Deep Component Integration - 4 Phase Approach

// Phase 1: Just use theme.css + Tailwind tokens
// Already done - download theme.css

// Phase 2: Update existing components to use tokens
// Before:
function OldButton({ children, onClick }) {
  return (
    <button 
      onClick={onClick}
      className="bg-blue-600 text-white px-4 py-2 rounded-md"
    >
      {children}
    </button>
  )
}

// After:
function NewButton({ children, variant = 'solid', onClick }) {
  const variants = {
    solid: 'bg-primary text-primary-foreground',
    outline: 'border border-border bg-transparent text-foreground hover:bg-muted',
    ghost: 'bg-transparent text-foreground hover:bg-muted',
  }
  
  return (
    <button 
      onClick={onClick}
      className={\`
        px-4 py-2 rounded-md transition-colors
        \${variants[variant]}
      \`}
    >
      {children}
    </button>
  )
}

// Phase 3: Use Button/Card/Input variants from this kit
// import { Button } from 'w0nderful-ui-foundation'
// <Button variant="fluent" />

// Phase 4: Full preset integration (optional)
// Use Import JSON + Config Health for advanced users`

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
        {activeTab === 'html' && (
          <>
            <p className="text-xs text-muted-foreground">
              Download theme.css and include it in your HTML. Perfect for vanilla HTML/JS projects.
            </p>
            <CodeBlock code={htmlCSSCode} label="HTML Template" />
            <div className="text-xs text-muted-foreground">
              <span className="font-medium">Use case:</span> Simple static sites, landing pages, demos
            </div>
          </>
        )}

        {activeTab === 'react' && (
          <>
            <p className="text-xs text-muted-foreground">
              Use Tailwind with UI Foundation tokens. Best for React/Vite/Next.js projects.
            </p>
            <CodeBlock code={reactTailwindCode} label="React + Tailwind" />
            <div className="text-xs text-muted-foreground">
              <span className="font-medium">Use case:</span> React apps, Vite projects, Next.js
            </div>
          </>
        )}

        {activeTab === 'astro' && (
          <>
            <p className="text-xs text-muted-foreground">
              Add theme.css to Astro project. Ideal for static sites and GitHub Pages.
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
              Load ui-kit.json at runtime for dynamic theme switching without page reload.
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
              Gradual component migration strategy - don't do everything at once.
            </p>
            <CodeBlock code={deepIntegrationCode} label="Deep Integration Guide" />
            <div className="text-xs text-muted-foreground">
              <span className="font-medium">Use case:</span> Existing projects, production apps, teams
            </div>
          </>
        )}
      </div>

      <div className="pt-2 border-t border-border">
        <p className="text-xs text-muted-foreground">
          <span className="font-medium">Quick start:</span> Download {themeFileName} from Export panel, 
          or use Export JSON for runtime loading.
        </p>
      </div>
    </div>
  )
}