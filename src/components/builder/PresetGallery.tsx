import { useState } from 'react'
import { type BuilderConfig } from '@/lib/builder'
import { STYLE_PRESETS, type StylePreset } from '@/lib/builder'
import { cn } from '@/lib/utils'
import { Sparkles, Check, ArrowRight } from 'lucide-react'

interface PresetGalleryProps {
  config: BuilderConfig
  onApply: (config: BuilderConfig) => void
}

const HIGH_END_PRESET_IDS = [
  'aurora-glass',
  'deep-space',
  'linux-frost',
  'terminal-pro',
  'cyber-neon',
  'paper-minimal',
  'ocean-panel',
  'warm-studio',
]

export function PresetGallery({ config, onApply }: PresetGalleryProps) {
  const [hoveredPreset, setHoveredPreset] = useState<string | null>(null)
  
  const highEndPresets = STYLE_PRESETS.filter(p => HIGH_END_PRESET_IDS.includes(p.id))
  
  const currentPresetId = HIGH_END_PRESET_IDS.find(id => {
    const preset = STYLE_PRESETS.find(p => p.id === id)
    if (!preset) return false
    return Object.keys(preset.config).every(key => {
      const configKey = key as keyof BuilderConfig
      return config[configKey] === preset.config[configKey]
    })
  })

  const handleApply = (preset: StylePreset) => {
    onApply(preset.config as BuilderConfig)
  }

  const getPreviewColors = (preset: StylePreset) => {
    const colors: string[] = []
    if (preset.config.themePreset) {
      colors.push('primary')
    }
    if (preset.config.backgroundStyle) {
      colors.push('secondary')
    }
    if (preset.config.surfaceMaterial === 'glass') {
      colors.push('accent')
    }
    return colors.slice(0, 4)
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Sparkles className="h-3.5 w-3.5" />
        <span>Premium style collections</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {highEndPresets.map((preset) => {
          const isSelected = currentPresetId === preset.id
          const isHovered = hoveredPreset === preset.id
          
          return (
            <button
              key={preset.id}
              onClick={() => handleApply(preset)}
              onMouseEnter={() => setHoveredPreset(preset.id)}
              onMouseLeave={() => setHoveredPreset(null)}
              className={cn(
                'relative group text-left p-3 rounded-lg border transition-all duration-200',
                isSelected 
                  ? 'border-primary/50 bg-primary/5 shadow-md shadow-primary/10' 
                  : 'border-border/60 bg-card/40 hover:border-border hover:bg-card/60'
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className={cn(
                      "text-xs font-semibold truncate",
                      isSelected ? "text-primary" : "text-foreground"
                    )}>
                      {preset.label}
                    </span>
                    {isSelected && (
                      <Check className="h-3 w-3 text-primary shrink-0" />
                    )}
                  </div>
                  <p className="text-[10px] text-muted-foreground line-clamp-1 mt-0.5">
                    {preset.description}
                  </p>
                </div>
                <div className={cn(
                  "shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-all",
                  isHovered && !isSelected && "bg-primary/20"
                )}>
                  {isSelected ? (
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  ) : (
                    <ArrowRight className={cn(
                      "h-3 w-3 text-muted-foreground transition-transform",
                      isHovered && "translate-x-0.5"
                    )} />
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-1 mt-2">
                {preset.tags.slice(0, 3).map(tag => (
                  <span 
                    key={tag}
                    className="text-[9px] px-1.5 py-0.5 rounded-full bg-muted/50 text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}