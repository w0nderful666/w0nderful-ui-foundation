import { type BuilderConfig } from '@/lib/builder'
import { cn } from '@/lib/utils'

interface ConfigStatusBarProps {
  config: BuilderConfig
}

export function ConfigStatusBar({ config }: ConfigStatusBarProps) {
  const themeLabel = config.themePreset.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  const bgLabel = config.backgroundStyle.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  const cardLabel = config.cardStyle.charAt(0).toUpperCase() + config.cardStyle.slice(1)
  const motionLabel = config.motionLevel.charAt(0).toUpperCase() + config.motionLevel.slice(1)
  const radiusLabel = config.radius.charAt(0).toUpperCase() + config.radius.slice(1)

  return (
    <div className={cn(
      'flex items-center gap-3 px-4 py-2 text-xs border-b border-border/50 bg-card/30 backdrop-blur-sm',
      'overflow-x-auto whitespace-nowrap'
    )}>
      <span className="font-medium text-primary">{themeLabel}</span>
      <span className="text-muted-foreground">·</span>
      <span className="text-foreground/80">{bgLabel}</span>
      <span className="text-muted-foreground">·</span>
      <span className="text-foreground/80">{cardLabel}</span>
      <span className="text-muted-foreground">·</span>
      <span className="text-foreground/80">{radiusLabel}</span>
      <span className="text-muted-foreground">·</span>
      <span className="text-foreground/80">{motionLabel}</span>
    </div>
  )
}