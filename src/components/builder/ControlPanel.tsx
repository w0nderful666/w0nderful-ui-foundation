import { type BuilderConfig, type BuilderConfigKey, type BuilderConfigValue } from '@/lib/builder'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { ThemePicker } from './ThemePicker'
import { BackgroundPicker } from './BackgroundPicker'
import { StyleOptionGroup } from './StyleOptionGroup'
import { ExportPanel } from './ExportPanel'
import { MotionPreview } from './MotionPreview'
import { TokenPreview } from './TokenPreview'
import { PresetsPicker } from './PresetsPicker'
import { Button } from '@/components/ui/Button'
import { RotateCcw, AlertTriangle, CheckCircle2 } from 'lucide-react'
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
  DEFAULT_CONFIG,
} from '@/lib/builder'
import { getConfigHealth, BUILDER_CONFIG_VERSION } from '@/lib/storage'
import { motion } from 'framer-motion'

interface ControlPanelProps {
  config: BuilderConfig
  onConfigChange: <K extends BuilderConfigKey>(key: K, value: BuilderConfigValue<K>) => void
  onConfigReplace: (config: BuilderConfig) => void
  onReset: () => void
}

export function ControlPanel({ config, onConfigChange, onConfigReplace, onReset }: ControlPanelProps) {
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
      </div>

      <div className="p-6 space-y-6">
        <Card variant="glass" padding="sm">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Presets</CardTitle>
          </CardHeader>
          <CardContent>
            <PresetsPicker config={config} onApply={onConfigReplace} />
          </CardContent>
        </Card>

        <Card variant="glass" padding="sm">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Global Theme</CardTitle>
          </CardHeader>
          <CardContent>
            <ThemePicker
              value={config.themePreset}
              onChange={(v) => onConfigChange('themePreset', v)}
            />
          </CardContent>
        </Card>

        <Card variant="glass" padding="sm">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Background Style</CardTitle>
          </CardHeader>
          <CardContent>
            <BackgroundPicker
              value={config.backgroundStyle}
              onChange={(v) => onConfigChange('backgroundStyle', v)}
            />
          </CardContent>
        </Card>

        <Card variant="glass" padding="sm">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Layout Style</CardTitle>
          </CardHeader>
          <CardContent>
            <StyleOptionGroup
              options={LAYOUT_STYLES}
              value={config.layoutStyle}
              onChange={(v) => onConfigChange('layoutStyle', v as any)}
            />
          </CardContent>
        </Card>

        <Card variant="glass" padding="sm">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Dock Style</CardTitle>
          </CardHeader>
          <CardContent>
            <StyleOptionGroup
              options={DOCK_STYLES}
              value={config.dockStyle}
              onChange={(v) => onConfigChange('dockStyle', v as any)}
            />
          </CardContent>
        </Card>

        <Card variant="glass" padding="sm">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Panel Chrome</CardTitle>
          </CardHeader>
          <CardContent>
            <StyleOptionGroup
              options={PANEL_CHROMES}
              value={config.panelChrome}
              onChange={(v) => onConfigChange('panelChrome', v as any)}
            />
          </CardContent>
        </Card>

        <Card variant="glass" padding="sm">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Border Style</CardTitle>
          </CardHeader>
          <CardContent>
            <StyleOptionGroup
              options={BORDER_STYLES}
              value={config.borderStyle}
              onChange={(v) => onConfigChange('borderStyle', v as any)}
            />
          </CardContent>
        </Card>

        <Card variant="glass" padding="sm">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Surface Material</CardTitle>
          </CardHeader>
          <CardContent>
            <StyleOptionGroup
              options={SURFACE_MATERIALS}
              value={config.surfaceMaterial}
              onChange={(v) => onConfigChange('surfaceMaterial', v as any)}
            />
          </CardContent>
        </Card>

        <Card variant="glass" padding="sm">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Mode</CardTitle>
          </CardHeader>
          <CardContent>
            <StyleOptionGroup
              options={MODES}
              value={config.mode}
              onChange={(v) => onConfigChange('mode', v as any)}
            />
          </CardContent>
        </Card>

        <Card variant="glass" padding="sm">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Radius</CardTitle>
          </CardHeader>
          <CardContent>
            <StyleOptionGroup
              options={RADII}
              value={config.radius}
              onChange={(v) => onConfigChange('radius', v as any)}
            />
          </CardContent>
        </Card>

        <Card variant="glass" padding="sm">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Shadow</CardTitle>
          </CardHeader>
          <CardContent>
            <StyleOptionGroup
              options={SHADOWS}
              value={config.shadow}
              onChange={(v) => onConfigChange('shadow', v as any)}
            />
          </CardContent>
        </Card>

        <Card variant="glass" padding="sm">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Density</CardTitle>
          </CardHeader>
          <CardContent>
            <StyleOptionGroup
              options={DENSITIES}
              value={config.density}
              onChange={(v) => onConfigChange('density', v as any)}
            />
          </CardContent>
        </Card>

        <Card variant="glass" padding="sm">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Button Style</CardTitle>
          </CardHeader>
          <CardContent>
            <StyleOptionGroup
              options={BUTTON_STYLES}
              value={config.buttonStyle}
              onChange={(v) => onConfigChange('buttonStyle', v as any)}
            />
          </CardContent>
        </Card>

        <Card variant="glass" padding="sm">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Card Style</CardTitle>
          </CardHeader>
          <CardContent>
            <StyleOptionGroup
              options={CARD_STYLES}
              value={config.cardStyle}
              onChange={(v) => onConfigChange('cardStyle', v as any)}
            />
          </CardContent>
        </Card>

        <Card variant="glass" padding="sm">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Input Style</CardTitle>
          </CardHeader>
          <CardContent>
            <StyleOptionGroup
              options={INPUT_STYLES}
              value={config.inputStyle}
              onChange={(v) => onConfigChange('inputStyle', v as any)}
            />
          </CardContent>
        </Card>

        <Card variant="glass" padding="sm">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Motion Level</CardTitle>
          </CardHeader>
          <CardContent>
            <StyleOptionGroup
              options={MOTION_LEVELS}
              value={config.motionLevel}
              onChange={(v) => onConfigChange('motionLevel', v as any)}
            />
            <div className="mt-4">
              <MotionPreview level={config.motionLevel} />
            </div>
          </CardContent>
        </Card>

        <Card variant="glass" padding="sm">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Font Scale</CardTitle>
          </CardHeader>
          <CardContent>
            <StyleOptionGroup
              options={FONT_SCALES}
              value={config.fontScale}
              onChange={(v) => onConfigChange('fontScale', v as any)}
            />
          </CardContent>
        </Card>

        <Card variant="glass" padding="sm">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Experience Style</CardTitle>
          </CardHeader>
          <CardContent>
            <StyleOptionGroup
              options={EXPERIENCE_STYLES}
              value={config.experienceStyle ?? 'fluent-glass'}
              onChange={(v) => onConfigChange('experienceStyle', v as any)}
            />
          </CardContent>
        </Card>

        <Card variant="glass" padding="sm">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Token Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <TokenPreview config={config} />
          </CardContent>
        </Card>

        <ExportPanel config={config} />

        <Card variant="glass" padding="sm">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Config Health</CardTitle>
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
                  {!health.isComplete && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-2"
                      onClick={() => onConfigReplace(health.normalized)}
                    >
                      <RotateCcw className="h-3 w-3 mr-1" />
                      Fix Config
                    </Button>
                  )}
                </>
              )
            })()}
          </CardContent>
        </Card>
      </div>
    </motion.aside>
  )
}
