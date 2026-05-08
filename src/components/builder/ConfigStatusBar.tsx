import { type BuilderConfig } from '@/lib/builder'
import { LAYOUT_STYLES, DOCK_STYLES, PANEL_CHROMES, BORDER_STYLES, SURFACE_MATERIALS, EXPERIENCE_STYLES } from '@/lib/builder'
import { cn } from '@/lib/utils'

interface ConfigStatusBarProps {
  config: BuilderConfig
}

export function ConfigStatusBar({ config }: ConfigStatusBarProps) {
  const getLabel = <T extends { value: string; label: string }>(arr: T[], value: string) => 
    arr.find(x => x.value === value)?.label || value

  const themeLabel = config.themePreset.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

  return (
    <div className={cn(
      'flex items-center gap-2 px-4 py-1.5 text-xs border-b border-border/50 bg-card/30 backdrop-blur-sm',
      'overflow-x-auto whitespace-nowrap'
    )}>
      <span className="font-medium text-primary shrink-0">{themeLabel}</span>
      <span className="text-muted-foreground shrink-0">·</span>
      <span className="text-foreground/80 shrink-0">{getLabel(LAYOUT_STYLES, config.layoutStyle)}</span>
      <span className="text-muted-foreground shrink-0">·</span>
      <span className="text-foreground/80 shrink-0">{getLabel(DOCK_STYLES, config.dockStyle)}</span>
      <span className="text-muted-foreground shrink-0">·</span>
      <span className="text-foreground/80 shrink-0">{getLabel(PANEL_CHROMES, config.panelChrome)}</span>
      <span className="text-muted-foreground shrink-0">·</span>
      <span className="text-foreground/80 shrink-0">{getLabel(BORDER_STYLES, config.borderStyle)}</span>
      <span className="text-muted-foreground shrink-0">·</span>
      <span className="text-foreground/80 shrink-0">{getLabel(SURFACE_MATERIALS, config.surfaceMaterial)}</span>
      <span className="text-muted-foreground shrink-0">·</span>
      <span className="text-foreground/80 shrink-0">{config.radius.charAt(0).toUpperCase() + config.radius.slice(1)}</span>
      <span className="text-muted-foreground shrink-0">·</span>
      <span className="text-foreground/80 shrink-0">{config.shadow.charAt(0).toUpperCase() + config.shadow.slice(1)}</span>
      <span className="text-muted-foreground shrink-0">·</span>
      <span className="text-foreground/80 shrink-0">{config.density.charAt(0).toUpperCase() + config.density.slice(1)}</span>
      <span className="text-muted-foreground shrink-0">·</span>
      <span className="text-foreground/80 shrink-0">{config.fontScale.charAt(0).toUpperCase() + config.fontScale.slice(1)}</span>
      <span className="text-muted-foreground shrink-0">·</span>
      <span className="text-foreground/80 shrink-0">{config.motionLevel.charAt(0).toUpperCase() + config.motionLevel.slice(1)}</span>
      <span className="text-muted-foreground shrink-0">·</span>
      <span className="text-foreground/80 shrink-0">{getLabel(EXPERIENCE_STYLES, config.experienceStyle || 'fluent-glass')}</span>
    </div>
  )
}