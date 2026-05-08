import { type BuilderConfig, type CardStyle, type ExperienceStyle } from './builder'

export function getPreviewPanelClass(config: BuilderConfig): string {
  if (shouldUseGlassSurface(config)) {
    return 'bg-card/60 backdrop-blur-md border border-border/40'
  }
  return 'bg-card/80 border border-border'
}

export function getPreviewCardClass(config: BuilderConfig): string {
  if (shouldUseGlassSurface(config)) {
    return 'bg-card/50 backdrop-blur-sm border border-border/30'
  }
  return 'bg-card border border-border'
}

export function getPreviewSurfaceClass(config: BuilderConfig): string {
  if (shouldUseGlassSurface(config)) {
    return 'bg-card/70 backdrop-blur-lg border border-white/10'
  }
  return 'bg-card/90 border border-border'
}

export function getPreviewSectionClass(config: BuilderConfig): string {
  if (shouldUseGlassSurface(config)) {
    return 'bg-card/40 backdrop-blur-sm'
  }
  return 'bg-card/60'
}

function shouldUseGlassSurface(config: BuilderConfig): boolean {
  const glassCardStyles: CardStyle[] = ['glass', 'acrylic', 'fluent-card', 'aqua-glass', 'mist-card']
  const glassExperienceStyles: ExperienceStyle[] = ['fluent-glass', 'aqua-desktop']
  
  return (
    glassCardStyles.includes(config.cardStyle as CardStyle) ||
    glassExperienceStyles.includes(config.experienceStyle as ExperienceStyle)
  )
}

export function getPreviewContainerClass(config: BuilderConfig): string {
  if (shouldUseGlassSurface(config)) {
    return 'bg-transparent'
  }
  return 'bg-background/50'
}