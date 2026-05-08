import { useState } from 'react'
import { type BuilderConfig } from '@/lib/builder'
import { STYLE_PRESETS, type StylePreset } from '@/lib/builder'
import { cn } from '@/lib/utils'
import { Sparkles, Check, Zap } from 'lucide-react'

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

const PRESET_COLOR_MAP: Record<string, string[]> = {
  'aurora-glass': ['from-cyan-400 via-purple-400 to-pink-400', 'from-purple-500 to-cyan-500', 'from-pink-400 to-rose-400'],
  'deep-space': ['from-blue-600 to-purple-900', 'from-cyan-500 to-blue-900', 'from-purple-600 to-indigo-900'],
  'linux-frost': ['from-slate-600 to-slate-800', 'from-emerald-500 to-teal-700', 'from-cyan-500 to-blue-600'],
  'terminal-pro': ['from-green-500 to-emerald-800', 'from-yellow-500 to-amber-800', 'from-red-500 to-orange-900'],
  'cyber-neon': ['from-pink-500 via-purple-500 to-cyan-500', 'from-fuchsia-500 to-rose-500', 'from-cyan-400 to-blue-600'],
  'paper-minimal': ['from-amber-100 to-orange-100', 'from-stone-200 to-stone-300', 'from-yellow-100 to-amber-50'],
  'ocean-panel': ['from-teal-500 to-cyan-600', 'from-blue-500 to-indigo-600', 'from-emerald-500 to-teal-600'],
  'warm-studio': ['from-orange-400 to-amber-500', 'from-yellow-400 to-orange-400', 'from-amber-300 to-yellow-200'],
}

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
          const colors = PRESET_COLOR_MAP[preset.id] || ['from-gray-500 to-gray-600', 'from-gray-400 to-gray-500', 'from-gray-300 to-gray-400']
          
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
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className={cn(
                      "text-xs font-semibold truncate",
                      isSelected ? "text-primary" : "text-foreground"
                    )}>
                      {preset.label}
                    </span>
                    {isSelected && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-primary/20 text-primary">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-muted-foreground line-clamp-1 mt-0.5">
                    {preset.description}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-1 mb-2">
                {colors.map((gradient, i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "flex-1 h-1.5 rounded-full bg-gradient-to-r",
                      gradient
                    )}
                  />
                ))}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {preset.tags.slice(0, 2).map(tag => (
                    <span 
                      key={tag}
                      className="text-[9px] px-1.5 py-0.5 rounded-full bg-muted/50 text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className={cn(
                  "flex items-center gap-1 text-[10px] font-medium transition-colors",
                  isSelected ? "text-primary" : isHovered ? "text-primary/80" : "text-muted-foreground/60"
                )}>
                  {isSelected ? (
                    <>
                      <Check className="h-3 w-3" />
                      <span>Applied</span>
                    </>
                  ) : (
                    <>
                      <Zap className="h-3 w-3" />
                      <span>Apply</span>
                    </>
                  )}
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}