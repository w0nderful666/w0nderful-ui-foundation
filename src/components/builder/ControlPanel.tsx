import { useState, useCallback, useEffect } from 'react'
import { type BuilderConfig, type BuilderConfigKey, type BuilderConfigValue } from '@/lib/builder'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { ThemePicker } from './ThemePicker'
import { BackgroundPicker } from './BackgroundPicker'
import { StyleOptionGroup } from './StyleOptionGroup'
import { ExportPanel } from './ExportPanel'
import { MotionPreview } from './MotionPreview'
import { TokenPreview } from './TokenPreview'
import { PresetsPicker } from './PresetsPicker'
import { PresetGallery } from './PresetGallery'
import { ControlSection } from './ControlSection'
import { RawStorageInspector } from './RawStorageInspector'
import { IntegrationGuide } from './IntegrationGuide'
import { Button } from '@/components/ui/Button'
import { RotateCcw, AlertTriangle, CheckCircle2, Copy } from 'lucide-react'
import {
  MODES,
  RADII,
  SHADOWS,
  DENSITIES,
  BUTTON_STYLES,
  CARD_STYLES,
  INPUT_STYLES,
  MOTION_LEVELS,
  FONT_SCALES,
  EXPERIENCE_STYLES,
  LAYOUT_STYLES,
  DOCK_STYLES,
  PANEL_CHROMES,
  BORDER_STYLES,
  SURFACE_MATERIALS,
  ICON_STYLES,
  CONTENT_SHAPES,
  HEADER_HEIGHTS,
  DEFAULT_CONFIG,
} from '@/lib/builder'
import { getConfigHealth, BUILDER_CONFIG_VERSION, isConfigSameAsPreset } from '@/lib/storage'
import { STYLE_PRESETS, type StylePreset } from '@/lib/builder'
import { motion } from 'framer-motion'
import { copyText } from '@/lib/utils'

interface ControlPanelProps {
  config: BuilderConfig
  onConfigChange: <K extends BuilderConfigKey>(key: K, value: BuilderConfigValue<K>) => void
  onConfigReplace: (config: BuilderConfig) => void
  onReset: () => void
}

export function ControlPanel({ config, onConfigChange, onConfigReplace, onReset }: ControlPanelProps) {
  const [appliedPresetId, setAppliedPresetId] = useState<string | null>(null)
  const [isModified, setIsModified] = useState(false)

  useEffect(() => {
    const currentPresetId = STYLE_PRESETS.find((p: StylePreset) => 
      isConfigSameAsPreset(config, p.config)
    )?.id

    if (currentPresetId) {
      setAppliedPresetId(currentPresetId)
      const preset = STYLE_PRESETS.find((p: StylePreset) => p.id === currentPresetId)
      setIsModified(preset ? !isConfigSameAsPreset(config, preset.config) : false)
    }
  }, [config])

  const handlePresetApply = useCallback((appliedConfig: BuilderConfig) => {
    onConfigReplace(appliedConfig)
    const presetId = STYLE_PRESETS.find((p: StylePreset) => 
      isConfigSameAsPreset(appliedConfig, p.config)
    )?.id
    if (presetId) {
      setAppliedPresetId(presetId)
      setIsModified(false)
    }
  }, [onConfigReplace])

  const handleConfigChangeWithPresetTracking = useCallback(<K extends BuilderConfigKey>(key: K, value: BuilderConfigValue<K>) => {
    onConfigChange(key, value)
    if (appliedPresetId) {
      const preset = STYLE_PRESETS.find((p: StylePreset) => p.id === appliedPresetId)
      if (preset) {
        const newConfig = { ...config, [key]: value }
        setIsModified(!isConfigSameAsPreset(newConfig, preset.config))
      }
    }
  }, [onConfigChange, appliedPresetId, config])

  const appliedPresetLabel = appliedPresetId 
    ? STYLE_PRESETS.find((p: StylePreset) => p.id === appliedPresetId)?.label 
    : null

  return (
    <motion.aside
      className="w-full lg:w-[380px] xl:w-[420px] shrink-0 border-l border-border bg-card/50 backdrop-blur-sm overflow-y-auto"
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="sticky top-0 z-10 border-b border-border bg-card/80 backdrop-blur-md px-6 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Style Control Panel</h2>
          <Button variant="ghost" size="icon" onClick={onReset} title="Reset to defaults">
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
        {appliedPresetLabel && (
          <div className="mt-1 text-xs text-muted-foreground">
            <span className={isModified ? 'text-yellow-500' : 'text-green-500'}>
              {isModified ? 'Modified from ' : 'Applied: '}
            </span>
            {appliedPresetLabel}
          </div>
        )}
      </div>

      <div className="p-4 space-y-3">
        <ControlSection 
          title="Presets" 
          description="Apply pre-configured themes"
          defaultOpen={true}
          persistKey="presets"
        >
          <PresetsPicker 
            config={config} 
            onApply={handlePresetApply}
          />
        </ControlSection>

        <ControlSection 
          title="Preset Gallery" 
          description="Premium style collections"
          defaultOpen={false}
          persistKey="preset-gallery"
        >
          <PresetGallery 
            config={config} 
            onApply={onConfigReplace}
          />
        </ControlSection>

        <ControlSection 
          title="Theme" 
          description="Global theme and colors"
          defaultOpen={true}
          persistKey="theme"
        >
          <Card variant="glass" padding="sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium">Global Theme</CardTitle>
            </CardHeader>
            <CardContent>
              <ThemePicker
                value={config.themePreset}
                onChange={(v) => handleConfigChangeWithPresetTracking('themePreset', v)}
              />
            </CardContent>
          </Card>

          <Card variant="glass" padding="sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium">Mode</CardTitle>
            </CardHeader>
            <CardContent>
              <StyleOptionGroup
                options={MODES}
                value={config.mode}
                onChange={(v) => handleConfigChangeWithPresetTracking('mode', v as any)}
              />
            </CardContent>
          </Card>

          <Card variant="glass" padding="sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium">Background</CardTitle>
            </CardHeader>
            <CardContent>
              <BackgroundPicker
                value={config.backgroundStyle}
                onChange={(v) => handleConfigChangeWithPresetTracking('backgroundStyle', v)}
              />
            </CardContent>
          </Card>
        </ControlSection>

        <ControlSection 
          title="System Layout" 
          description="Layout, dock, chrome and experience"
          defaultOpen={false}
          persistKey="system-layout"
        >
          <Card variant="glass" padding="sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium">Layout Style</CardTitle>
            </CardHeader>
            <CardContent>
              <StyleOptionGroup
                options={LAYOUT_STYLES}
                value={config.layoutStyle}
                onChange={(v) => handleConfigChangeWithPresetTracking('layoutStyle', v as any)}
              />
            </CardContent>
          </Card>

          <Card variant="glass" padding="sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium">Dock Style</CardTitle>
            </CardHeader>
            <CardContent>
              <StyleOptionGroup
                options={DOCK_STYLES}
                value={config.dockStyle}
                onChange={(v) => handleConfigChangeWithPresetTracking('dockStyle', v as any)}
              />
            </CardContent>
          </Card>

          <Card variant="glass" padding="sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium">Panel Chrome</CardTitle>
            </CardHeader>
            <CardContent>
              <StyleOptionGroup
                options={PANEL_CHROMES}
                value={config.panelChrome}
                onChange={(v) => handleConfigChangeWithPresetTracking('panelChrome', v as any)}
              />
            </CardContent>
          </Card>

          <Card variant="glass" padding="sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium">Header Height</CardTitle>
            </CardHeader>
            <CardContent>
              <StyleOptionGroup
                options={HEADER_HEIGHTS}
                value={config.headerHeight}
                onChange={(v) => handleConfigChangeWithPresetTracking('headerHeight', v as any)}
              />
            </CardContent>
          </Card>

          <Card variant="glass" padding="sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium">Content Shape</CardTitle>
            </CardHeader>
            <CardContent>
              <StyleOptionGroup
                options={CONTENT_SHAPES}
                value={config.contentShape}
                onChange={(v) => handleConfigChangeWithPresetTracking('contentShape', v as any)}
              />
            </CardContent>
          </Card>

          <Card variant="glass" padding="sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium">Experience Style</CardTitle>
            </CardHeader>
            <CardContent>
              <StyleOptionGroup
                options={EXPERIENCE_STYLES}
                value={config.experienceStyle ?? 'fluent-glass'}
                onChange={(v) => handleConfigChangeWithPresetTracking('experienceStyle', v as any)}
              />
            </CardContent>
          </Card>
        </ControlSection>

        <ControlSection 
          title="Components" 
          description="Button, card, input styles"
          defaultOpen={false}
          persistKey="components"
        >
          <Card variant="glass" padding="sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium">Button Style</CardTitle>
            </CardHeader>
            <CardContent>
              <StyleOptionGroup
                options={BUTTON_STYLES}
                value={config.buttonStyle}
                onChange={(v) => handleConfigChangeWithPresetTracking('buttonStyle', v as any)}
              />
            </CardContent>
          </Card>

          <Card variant="glass" padding="sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium">Card Style</CardTitle>
            </CardHeader>
            <CardContent>
              <StyleOptionGroup
                options={CARD_STYLES}
                value={config.cardStyle}
                onChange={(v) => handleConfigChangeWithPresetTracking('cardStyle', v as any)}
              />
            </CardContent>
          </Card>

          <Card variant="glass" padding="sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium">Input Style</CardTitle>
            </CardHeader>
            <CardContent>
              <StyleOptionGroup
                options={INPUT_STYLES}
                value={config.inputStyle}
                onChange={(v) => handleConfigChangeWithPresetTracking('inputStyle', v as any)}
              />
            </CardContent>
          </Card>

          <Card variant="glass" padding="sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium">Icon Style</CardTitle>
            </CardHeader>
            <CardContent>
              <StyleOptionGroup
                options={ICON_STYLES}
                value={config.iconStyle}
                onChange={(v) => handleConfigChangeWithPresetTracking('iconStyle', v as any)}
              />
            </CardContent>
          </Card>
        </ControlSection>

        <ControlSection 
          title="Surface & Feel" 
          description="Surface, borders, radius, shadow and typography"
          defaultOpen={false}
          persistKey="surface-feel"
        >
          <Card variant="glass" padding="sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium">Surface Material</CardTitle>
            </CardHeader>
            <CardContent>
              <StyleOptionGroup
                options={SURFACE_MATERIALS}
                value={config.surfaceMaterial}
                onChange={(v) => handleConfigChangeWithPresetTracking('surfaceMaterial', v as any)}
              />
            </CardContent>
          </Card>

          <Card variant="glass" padding="sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium">Border Style</CardTitle>
            </CardHeader>
            <CardContent>
              <StyleOptionGroup
                options={BORDER_STYLES}
                value={config.borderStyle}
                onChange={(v) => handleConfigChangeWithPresetTracking('borderStyle', v as any)}
              />
            </CardContent>
          </Card>

          <Card variant="glass" padding="sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium">Radius</CardTitle>
            </CardHeader>
            <CardContent>
              <StyleOptionGroup
                options={RADII}
                value={config.radius}
                onChange={(v) => handleConfigChangeWithPresetTracking('radius', v as any)}
              />
            </CardContent>
          </Card>

          <Card variant="glass" padding="sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium">Shadow</CardTitle>
            </CardHeader>
            <CardContent>
              <StyleOptionGroup
                options={SHADOWS}
                value={config.shadow}
                onChange={(v) => handleConfigChangeWithPresetTracking('shadow', v as any)}
              />
            </CardContent>
          </Card>

          <Card variant="glass" padding="sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium">Density</CardTitle>
            </CardHeader>
            <CardContent>
              <StyleOptionGroup
                options={DENSITIES}
                value={config.density}
                onChange={(v) => handleConfigChangeWithPresetTracking('density', v as any)}
              />
            </CardContent>
          </Card>

          <Card variant="glass" padding="sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium">Font Scale</CardTitle>
            </CardHeader>
            <CardContent>
              <StyleOptionGroup
                options={FONT_SCALES}
                value={config.fontScale}
                onChange={(v) => handleConfigChangeWithPresetTracking('fontScale', v as any)}
              />
            </CardContent>
          </Card>

          <Card variant="glass" padding="sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium">Blur Strength</CardTitle>
            </CardHeader>
            <CardContent>
              <StyleOptionGroup
                options={[
                  { value: 'none', label: 'None' },
                  { value: 'soft', label: 'Soft' },
                  { value: 'medium', label: 'Medium' },
                  { value: 'strong', label: 'Strong' },
                  { value: 'frosted', label: 'Frosted' },
                ]}
                value={config.blurStrength}
                onChange={(v) => handleConfigChangeWithPresetTracking('blurStrength', v as any)}
              />
            </CardContent>
          </Card>

          <Card variant="glass" padding="sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium">Accent Intensity</CardTitle>
            </CardHeader>
            <CardContent>
              <StyleOptionGroup
                options={[
                  { value: 'low', label: 'Low' },
                  { value: 'medium', label: 'Medium' },
                  { value: 'high', label: 'High' },
                  { value: 'neon', label: 'Neon' },
                ]}
                value={config.accentIntensity}
                onChange={(v) => handleConfigChangeWithPresetTracking('accentIntensity', v as any)}
              />
            </CardContent>
          </Card>

          <Card variant="glass" padding="sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium">Motion Level</CardTitle>
            </CardHeader>
            <CardContent>
              <StyleOptionGroup
                options={MOTION_LEVELS}
                value={config.motionLevel}
                onChange={(v) => handleConfigChangeWithPresetTracking('motionLevel', v as any)}
              />
            </CardContent>
          </Card>
        </ControlSection>

        <ControlSection 
          title="Export & Health" 
          description="Token preview, config health and raw storage"
          defaultOpen={true}
          persistKey="export-health"
        >
          <Card variant="glass" padding="sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium">Token Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <TokenPreview config={config} />
            </CardContent>
          </Card>

          <ExportPanel config={config} onConfigReplace={onConfigReplace} />

          <Card variant="glass" padding="sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium">Usage / Integration Guide</CardTitle>
            </CardHeader>
            <CardContent>
              <IntegrationGuide config={config} />
            </CardContent>
          </Card>

          <Card variant="glass" padding="sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium">Config Health</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {(() => {
                const health = getConfigHealth(config)
                return (
                  <>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Schema:</span>
                      <span className="font-mono">v{health.version}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Fields:</span>
                      <span className={health.isComplete ? 'text-green-500' : 'text-yellow-500'}>
                        {health.fieldsValid}/{health.fieldsTotal} valid
                      </span>
                    </div>
                    {health.missingFields.length > 0 && (
                      <div className="flex items-center gap-1 text-xs text-yellow-500">
                        <AlertTriangle className="h-3 w-3" />
                        <span>{health.missingFields.length} missing fields</span>
                      </div>
                    )}
                    {health.invalidFields.length > 0 && (
                      <div className="flex items-center gap-1 text-xs text-yellow-500">
                        <AlertTriangle className="h-3 w-3" />
                        <span>{health.invalidFields.length} invalid fields</span>
                      </div>
                    )}
                    {health.unknownFields.length > 0 && (
                      <div className="flex items-center gap-1 text-xs text-yellow-500">
                        <AlertTriangle className="h-3 w-3" />
                        <span>{health.unknownFields.length} unknown fields</span>
                      </div>
                    )}
                    {health.isComplete && (
                      <div className="flex items-center gap-1 text-xs text-green-500">
                        <CheckCircle2 className="h-3 w-3" />
                        <span>All fields valid</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      {health.isNormalizedEqual ? (
                        <span>Runtime config is normalized</span>
                      ) : (
                        <span>Config differs from normalized version</span>
                      )}
                    </div>
                    <div className="flex gap-2 mt-2">
                      {!health.isComplete && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => onConfigReplace(health.normalized)}
                        >
                          <RotateCcw className="h-3 w-3 mr-1" />
                          Fix Config
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={async () => {
                          await copyText(JSON.stringify({
                            version: health.version,
                            fieldsTotal: health.fieldsTotal,
                            fieldsValid: health.fieldsValid,
                            missingFields: health.missingFields,
                            invalidFields: health.invalidFields,
                            unknownFields: health.unknownFields,
                            isComplete: health.isComplete,
                            isNormalizedEqual: health.isNormalizedEqual,
                          }, null, 2))
                        }}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </>
                )
              })()}
            </CardContent>
          </Card>

          <Card variant="glass" padding="sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium">Raw Storage Inspector</CardTitle>
            </CardHeader>
            <CardContent>
              <RawStorageInspector />
            </CardContent>
          </Card>
        </ControlSection>
      </div>
    </motion.aside>
  )
}