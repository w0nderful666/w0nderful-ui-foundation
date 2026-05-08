import { useState } from 'react'
import { type BuilderConfig } from '@/lib/builder'
import { getThemeTokens, type ThemeTokens } from '@/lib/themes'
import { getMotionCSSVariables } from '@/lib/motion'
import { getPreviewPanelClass, getPreviewCardClass, getPreviewToolbarClass, getPreviewInputClass, getPreviewCodeClass, getPreviewContainerClass } from '@/lib/previewSurfaces'
import { cn } from '@/lib/utils'
import { Copy, Check, Palette, Layers, Circle, Zap, Type, Layout, Download } from 'lucide-react'

interface TokenInspectorProps {
  config: BuilderConfig
}

type TabId = 'colors' | 'surfaces' | 'shape' | 'motion' | 'typography' | 'layout' | 'export'

const TABS: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: 'colors', label: 'Colors', icon: Palette },
  { id: 'surfaces', label: 'Surfaces', icon: Layers },
  { id: 'shape', label: 'Shape', icon: Circle },
  { id: 'motion', label: 'Motion', icon: Zap },
  { id: 'typography', label: 'Typography', icon: Type },
  { id: 'layout', label: 'Layout', icon: Layout },
  { id: 'export', label: 'Export', icon: Download },
]

function ColorSwatch({ name, cssVar, value }: { name: string; cssVar: string; value: string }) {
  const [copied, setCopied] = useState(false)
  
  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {}
  }

  const bgColor = `hsl(${value})`
  const isLight = parseInt(value.split(' ')[2] || '50') > 60
  
  return (
    <div className="flex items-center gap-2 py-1.5 px-2 rounded-md hover:bg-muted/30 transition-colors group">
      <div 
        className="w-6 h-6 rounded-md border border-border/40 shadow-sm shrink-0"
        style={{ backgroundColor: bgColor }}
      />
      <div className="flex-1 min-w-0">
        <div className="text-xs font-medium text-foreground truncate">{name}</div>
        <div className="text-[10px] text-muted-foreground font-mono">{cssVar}</div>
      </div>
      <div className="text-[10px] text-muted-foreground font-mono shrink-0">{value}</div>
      <button
        onClick={handleCopy}
        className={cn(
          "p-1 rounded transition-all shrink-0",
          copied ? "text-green-500" : "text-muted-foreground/50 hover:text-foreground"
        )}
      >
        {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
      </button>
    </div>
  )
}

function ColorsTab({ config }: { config: BuilderConfig }) {
  const tokens: ThemeTokens = getThemeTokens(config.themePreset, config.mode)
  
  const colorItems = [
    { name: 'Background', cssVar: '--background', value: tokens.background },
    { name: 'Foreground', cssVar: '--foreground', value: tokens.foreground },
    { name: 'Card', cssVar: '--card', value: tokens.card },
    { name: 'Card Foreground', cssVar: '--card-foreground', value: tokens.cardForeground },
    { name: 'Primary', cssVar: '--primary', value: tokens.primary },
    { name: 'Primary Foreground', cssVar: '--primary-foreground', value: tokens.primaryForeground },
    { name: 'Secondary', cssVar: '--secondary', value: tokens.secondary },
    { name: 'Secondary Foreground', cssVar: '--secondary-foreground', value: tokens.secondaryForeground },
    { name: 'Muted', cssVar: '--muted', value: tokens.muted },
    { name: 'Muted Foreground', cssVar: '--muted-foreground', value: tokens.mutedForeground },
    { name: 'Accent', cssVar: '--accent', value: tokens.accent },
    { name: 'Accent Foreground', cssVar: '--accent-foreground', value: tokens.accentForeground },
    { name: 'Border', cssVar: '--border', value: tokens.border },
    { name: 'Input', cssVar: '--input', value: tokens.input },
    { name: 'Ring', cssVar: '--ring', value: tokens.ring },
    { name: 'Destructive', cssVar: '--destructive', value: tokens.destructive },
    { name: 'Success', cssVar: '--success', value: tokens.success },
    { name: 'Warning', cssVar: '--warning', value: tokens.warning },
    { name: 'Info', cssVar: '--info', value: tokens.info },
  ]
  
  return (
    <div className="space-y-1">
      {colorItems.map(item => (
        <ColorSwatch key={item.cssVar} {...item} />
      ))}
    </div>
  )
}

function SurfacesTab({ config }: { config: BuilderConfig }) {
  const surfaces = [
    { name: 'Panel', className: getPreviewPanelClass(config) },
    { name: 'Card', className: getPreviewCardClass(config) },
    { name: 'Toolbar', className: getPreviewToolbarClass(config) },
    { name: 'Input', className: getPreviewInputClass(config) },
    { name: 'Code', className: getPreviewCodeClass(config) },
    { name: 'Container', className: getPreviewContainerClass(config) },
  ]
  
  return (
    <div className="space-y-2">
      {surfaces.map(surface => (
        <div key={surface.name} className="p-2 rounded-md bg-muted/30">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-foreground">{surface.name}</span>
            <CopyButton text={surface.className} />
          </div>
          <code className="text-[10px] text-muted-foreground break-all font-mono">{surface.className}</code>
        </div>
      ))}
    </div>
  )
}

function ShapeTab({ config }: { config: BuilderConfig }) {
  const shapeItems = [
    { label: 'Radius', value: config.radius, cssVar: '--radius' },
    { label: 'Shadow', value: config.shadow, cssVar: '--shadow' },
    { label: 'Border Style', value: config.borderStyle, cssVar: '--border-style' },
    { label: 'Blur Strength', value: config.blurStrength, cssVar: '--blur-strength' },
    { label: 'Surface Material', value: config.surfaceMaterial, cssVar: '--surface-material' },
    { label: 'Card Style', value: config.cardStyle, cssVar: '--card-style' },
    { label: 'Button Style', value: config.buttonStyle, cssVar: '--button-style' },
    { label: 'Input Style', value: config.inputStyle, cssVar: '--input-style' },
  ]
  
  return (
    <div className="space-y-1">
      {shapeItems.map(item => (
        <div key={item.cssVar} className="flex items-center justify-between py-1.5 px-2 rounded-md hover:bg-muted/30">
          <div>
            <span className="text-xs font-medium text-foreground">{item.label}</span>
            <div className="text-[10px] text-muted-foreground font-mono">{item.cssVar}</div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground font-mono">{item.value}</span>
            <CopyButton text={item.value} />
          </div>
        </div>
      ))}
    </div>
  )
}

function MotionTab({ config }: { config: BuilderConfig }) {
  const motionVars = getMotionCSSVariables(config.motionLevel)
  
  const items = Object.entries(motionVars).map(([cssVar, value]) => ({
    cssVar,
    value,
    label: cssVar.replace('--motion-', '').replace(/-/g, ' ')
  }))
  
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between py-1.5 px-2 rounded-md">
        <div>
          <span className="text-xs font-medium text-foreground">Motion Level</span>
          <div className="text-[10px] text-muted-foreground font-mono">--motion-level</div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground font-mono">{config.motionLevel}</span>
          <CopyButton text={config.motionLevel} />
        </div>
      </div>
      {items.map(item => (
        <div key={item.cssVar} className="flex items-center justify-between py-1.5 px-2 rounded-md hover:bg-muted/30">
          <div>
            <span className="text-xs font-medium text-foreground capitalize">{item.label}</span>
            <div className="text-[10px] text-muted-foreground font-mono">{item.cssVar}</div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground font-mono">{item.value}</span>
            <CopyButton text={item.value} />
          </div>
        </div>
      ))}
    </div>
  )
}

function TypographyTab({ config }: { config: BuilderConfig }) {
  const items = [
    { label: 'Font Scale', value: config.fontScale, cssVar: '--font-scale' },
    { label: 'Density', value: config.density, cssVar: '--density' },
  ]
  
  return (
    <div className="space-y-1">
      {items.map(item => (
        <div key={item.cssVar} className="flex items-center justify-between py-1.5 px-2 rounded-md hover:bg-muted/30">
          <div>
            <span className="text-xs font-medium text-foreground">{item.label}</span>
            <div className="text-[10px] text-muted-foreground font-mono">{item.cssVar}</div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground font-mono">{item.value}</span>
            <CopyButton text={item.value} />
          </div>
        </div>
      ))}
    </div>
  )
}

function LayoutTab({ config }: { config: BuilderConfig }) {
  const items = [
    { label: 'Layout Style', value: config.layoutStyle, cssVar: '--layout-style' },
    { label: 'Dock Style', value: config.dockStyle, cssVar: '--dock-style' },
    { label: 'Panel Chrome', value: config.panelChrome, cssVar: '--panel-chrome' },
    { label: 'Header Height', value: config.headerHeight, cssVar: '--header-height' },
    { label: 'Content Shape', value: config.contentShape, cssVar: '--content-shape' },
    { label: 'Icon Style', value: config.iconStyle, cssVar: '--icon-style' },
    { label: 'Experience', value: config.experienceStyle || 'default', cssVar: '--experience-style' },
  ]
  
  return (
    <div className="space-y-1">
      {items.map(item => (
        <div key={item.cssVar} className="flex items-center justify-between py-1.5 px-2 rounded-md hover:bg-muted/30">
          <div>
            <span className="text-xs font-medium text-foreground">{item.label}</span>
            <div className="text-[10px] text-muted-foreground font-mono">{item.cssVar}</div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground font-mono">{item.value}</span>
            <CopyButton text={item.value} />
          </div>
        </div>
      ))}
    </div>
  )
}

function ExportTab({ config }: { config: BuilderConfig }) {
  const exportItems = [
    { name: 'Theme CSS', desc: 'theme.css' },
    { name: 'UI Kit JSON', desc: 'ui-kit.json' },
    { name: 'Tailwind Config', desc: 'tailwind.config.ts' },
    { name: 'React Tokens', desc: 'tokens.ts' },
    { name: 'Starter Kit ZIP', desc: 'web-os-starter-kit.zip' },
  ]
  
  return (
    <div className="space-y-2">
      <p className="text-[10px] text-muted-foreground px-2">Use Export Panel above to download</p>
      {exportItems.map(item => (
        <div key={item.name} className="flex items-center justify-between py-1.5 px-2 rounded-md hover:bg-muted/30">
          <div>
            <span className="text-xs font-medium text-foreground">{item.name}</span>
            <div className="text-[10px] text-muted-foreground">{item.desc}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  
  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {}
  }
  
  return (
    <button
      onClick={handleCopy}
      className={cn(
        "p-1 rounded transition-all",
        copied ? "text-green-500" : "text-muted-foreground/50 hover:text-foreground"
      )}
    >
      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
    </button>
  )
}

export function TokenInspector({ config }: TokenInspectorProps) {
  const [activeTab, setActiveTab] = useState<TabId>('colors')
  
  const activeTabContent = {
    colors: <ColorsTab config={config} />,
    surfaces: <SurfacesTab config={config} />,
    shape: <ShapeTab config={config} />,
    motion: <MotionTab config={config} />,
    typography: <TypographyTab config={config} />,
    layout: <LayoutTab config={config} />,
    export: <ExportTab config={config} />,
  }
  
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-thin">
        {TABS.map(tab => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all whitespace-nowrap",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>
      <div className="bg-muted/20 rounded-lg border border-border/40 p-2 max-h-64 overflow-y-auto">
        {activeTabContent[activeTab]}
      </div>
    </div>
  )
}