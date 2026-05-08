import { useState, useEffect, useCallback } from 'react'
import { STYLE_PRESETS, getSystemPresetIds, getStylePresetIds, type BuilderConfig } from '@/lib/builder'
import { getThemeTokens } from '@/lib/themes'
import { isConfigSameAsPreset, getConfigHealth } from '@/lib/storage'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { Check, Search, Clock, Tag } from 'lucide-react'

const RECENTLY_APPLIED_KEY = 'ui-kit-recent-presets'
const MAX_RECENT = 5

interface PresetsPickerProps {
  config: BuilderConfig
  onApply: (config: BuilderConfig) => void
  onAppliedPresetChange?: (presetId: string | null, isModified: boolean) => void
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

function getRecentlyApplied(): string[] {
  try {
    const stored = localStorage.getItem(RECENTLY_APPLIED_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function saveRecentlyApplied(presetId: string) {
  try {
    const recent = getRecentlyApplied()
    const filtered = recent.filter(id => id !== presetId)
    const updated = [presetId, ...filtered].slice(0, MAX_RECENT)
    localStorage.setItem(RECENTLY_APPLIED_KEY, JSON.stringify(updated))
  } catch {
    // ignore
  }
}

const TAG_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'system', label: 'System' },
  { value: 'desktop', label: 'Desktop' },
  { value: 'linux', label: 'Linux' },
  { value: 'terminal', label: 'Terminal' },
  { value: 'material', label: 'Material' },
  { value: 'glass', label: 'Glass' },
  { value: 'dark', label: 'Dark' },
  { value: 'light', label: 'Light' },
]

export function PresetsPicker({ config, onApply, onAppliedPresetChange }: PresetsPickerProps) {
  const systemIds = getSystemPresetIds()
  const styleIds = getStylePresetIds()

  const systemPresets = STYLE_PRESETS.filter(p => systemIds.includes(p.id))
  const stylePresets = STYLE_PRESETS.filter(p => styleIds.includes(p.id))

  const [search, setSearch] = useState('')
  const [selectedTag, setSelectedTag] = useState('all')
  const [recentIds, setRecentIds] = useState<string[]>([])

  useEffect(() => {
    setRecentIds(getRecentlyApplied())
  }, [])

  const currentPresetId = STYLE_PRESETS.find(p => 
    isConfigSameAsPreset(config, p.config)
  )?.id

  const handleApply = useCallback((preset: typeof STYLE_PRESETS[0]) => {
    const health = getConfigHealth(preset.config)
    onApply(health.normalized)
    saveRecentlyApplied(preset.id)
    setRecentIds(getRecentlyApplied())
    
    if (onAppliedPresetChange) {
      onAppliedPresetChange(preset.id, false)
    }
  }, [onApply, onAppliedPresetChange])

  useEffect(() => {
    if (onAppliedPresetChange && currentPresetId) {
      const currentPreset = STYLE_PRESETS.find(p => p.id === currentPresetId)
      if (currentPreset) {
        const isModified = !isConfigSameAsPreset(config, currentPreset.config)
        onAppliedPresetChange(currentPresetId, isModified)
      }
    }
  }, [config, currentPresetId, onAppliedPresetChange])

  const filterPresets = (presets: typeof STYLE_PRESETS) => {
    return presets.filter(p => {
      const matchesSearch = p.label.toLowerCase().includes(search.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
      
      if (!matchesSearch) return false
      
      if (selectedTag === 'all') return true
      if (selectedTag === 'system') return systemIds.includes(p.id)
      
      return p.tags.includes(selectedTag)
    })
  }

  const recentPresets = STYLE_PRESETS.filter(p => recentIds.includes(p.id))
  const filteredSystem = filterPresets(systemPresets)
  const filteredStyle = filterPresets(stylePresets)

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search presets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-7 pr-2 py-1.5 text-xs border border-border rounded-md bg-background focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-1">
        {TAG_OPTIONS.map(tag => (
          <button
            key={tag.value}
            onClick={() => setSelectedTag(tag.value)}
            className={cn(
              'px-2 py-0.5 text-[10px] rounded-full transition-colors',
              selectedTag === tag.value
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/70'
            )}
          >
            {tag.label}
          </button>
        ))}
      </div>

      {recentPresets.length > 0 && (
        <div>
          <h4 className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Recently Applied
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {recentPresets.map(preset => {
              const isSelected = currentPresetId === preset.id
              return (
                <motion.button
                  key={preset.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleApply(preset)}
                  className={cn(
                    'relative flex flex-col gap-1 rounded-lg border px-3 py-2 text-left transition-colors',
                    isSelected
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50 hover:bg-muted/50'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium truncate">{preset.label}</span>
                  </div>
                  <PresetSwatch themePreset={preset.config.themePreset} mode={preset.config.mode} />
                </motion.button>
              )
            })}
          </div>
        </div>
      )}

      <div>
        <h4 className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
          <Tag className="h-3 w-3" />
          System Themes
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {filteredSystem.map((preset) => {
            const isSelected = currentPresetId === preset.id
            return (
              <motion.button
                key={preset.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleApply(preset)}
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
                  <PresetSwatch themePreset={preset.config.themePreset} mode={preset.config.mode} />
                  <div className="flex flex-col items-end gap-0.5">
                    {preset.config.experienceStyle && (
                      <span className="text-[9px] text-primary/70 font-medium">
                        {preset.config.experienceStyle.replace('-', ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                      </span>
                    )}
                    <span className="text-[10px] text-muted-foreground truncate max-w-[80px]">
                      {preset.tags[0]}
                    </span>
                  </div>
                </div>
              </motion.button>
            )
          })}
        </div>
      </div>

      <div>
        <h4 className="text-xs font-medium text-muted-foreground mb-2">Style Presets</h4>
        <div className="grid grid-cols-2 gap-2">
          {filteredStyle.map((preset) => {
            const isSelected = currentPresetId === preset.id
            return (
              <motion.button
                key={preset.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleApply(preset)}
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
                  <PresetSwatch themePreset={preset.config.themePreset} mode={preset.config.mode} />
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