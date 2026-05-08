import { STYLE_PRESETS, getSystemPresetIds, getStylePresetIds, type BuilderConfig } from '@/lib/builder'
import { getThemeTokens } from '@/lib/themes'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

interface PresetsPickerProps {
  config: BuilderConfig
  onApply: (config: BuilderConfig) => void
}

interface PresetSwatchProps {
  themePreset: string
  mode: string
}

function PresetSwatch({ themePreset, mode }: PresetSwatchProps) {
  try {
    const tokens = getThemeTokens(themePreset as any, mode as any)
    return (
      <div className="flex gap-0.5">
        <div
          className="h-3 w-3 rounded-sm"
          style={{ backgroundColor: `hsl(${tokens.background})` }}
          title={`bg: ${tokens.background}`}
        />
        <div
          className="h-3 w-3 rounded-sm"
          style={{ backgroundColor: `hsl(${tokens.card})` }}
          title={`card: ${tokens.card}`}
        />
        <div
          className="h-3 w-3 rounded-sm"
          style={{ backgroundColor: `hsl(${tokens.primary})` }}
          title={`primary: ${tokens.primary}`}
        />
        <div
          className="h-3 w-3 rounded-sm"
          style={{ backgroundColor: `hsl(${tokens.accent})` }}
          title={`accent: ${tokens.accent}`}
        />
        <div
          className="h-3 w-3 rounded-sm"
          style={{ backgroundColor: `hsl(${tokens.border})` }}
          title={`border: ${tokens.border}`}
        />
      </div>
    )
  } catch {
    return (
      <div className="flex gap-0.5">
        <div className="h-3 w-3 rounded-sm bg-muted" />
        <div className="h-3 w-3 rounded-sm bg-muted" />
        <div className="h-3 w-3 rounded-sm bg-muted" />
        <div className="h-3 w-3 rounded-sm bg-muted" />
        <div className="h-3 w-3 rounded-sm bg-muted" />
      </div>
    )
  }
}

export function PresetsPicker({ config, onApply }: PresetsPickerProps) {
  const systemIds = getSystemPresetIds()
  const styleIds = getStylePresetIds()

  const systemPresets = STYLE_PRESETS.filter(p => systemIds.includes(p.id))
  const stylePresets = STYLE_PRESETS.filter(p => styleIds.includes(p.id))

  const currentPresetId = STYLE_PRESETS.find(p => 
    p.config.themePreset === config.themePreset &&
    p.config.mode === config.mode &&
    p.config.backgroundStyle === config.backgroundStyle &&
    p.config.dockStyle === config.dockStyle &&
    p.config.panelChrome === config.panelChrome
  )?.id

  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-xs font-medium text-muted-foreground mb-2">System Themes</h4>
        <div className="grid grid-cols-2 gap-2">
          {systemPresets.map((preset) => {
            const isSelected = currentPresetId === preset.id
            return (
              <motion.button
                key={preset.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onApply(preset.config)}
                className={cn(
                  'relative flex flex-col gap-1 rounded-lg border px-3 py-2 text-left transition-colors',
                  isSelected
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50 hover:bg-muted/50'
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium truncate">{preset.label}</span>
                  {isSelected && (
                    <Check className="h-3 w-3 text-primary shrink-0" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <PresetSwatch
                    themePreset={preset.config.themePreset}
                    mode={preset.config.mode}
                  />
                  <span className="text-[10px] text-muted-foreground truncate max-w-[80px]">
                    {preset.tags[0]}
                  </span>
                </div>
              </motion.button>
            )
          })}
        </div>
      </div>

      <div>
        <h4 className="text-xs font-medium text-muted-foreground mb-2">Style Presets</h4>
        <div className="grid grid-cols-2 gap-2">
          {stylePresets.map((preset) => {
            const isSelected = currentPresetId === preset.id
            return (
              <motion.button
                key={preset.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onApply(preset.config)}
                className={cn(
                  'relative flex flex-col gap-1 rounded-lg border px-3 py-2 text-left transition-colors',
                  isSelected
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50 hover:bg-muted/50'
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium truncate">{preset.label}</span>
                  {isSelected && (
                    <Check className="h-3 w-3 text-primary shrink-0" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <PresetSwatch
                    themePreset={preset.config.themePreset}
                    mode={preset.config.mode}
                  />
                  <span className="text-[10px] text-muted-foreground truncate max-w-[80px]">
                    {preset.tags[0]}
                  </span>
                </div>
              </motion.button>
            )
          })}
        </div>
      </div>
    </div>
  )
}