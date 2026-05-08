import { type BackgroundStyle } from './builder'

export const PREVIEW_BACKGROUND_CLASSES: Record<BackgroundStyle, string> = {
  solid: 'bg-background',
  'soft-gradient': 'bg-gradient-to-br from-background via-muted/40 to-background',
  'radial-glow': 'bg-background [background-image:radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.24),transparent_35%),radial-gradient(circle_at_80%_70%,hsl(var(--accent)/0.18),transparent_35%)]',
  'grid-surface': 'bg-background [background-image:linear-gradient(hsl(var(--border)/0.5)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border)/0.5)_1px,transparent_1px)] [background-size:24px_24px]',
  'noise-glass': 'bg-background/80 backdrop-blur-xl [background-image:radial-gradient(hsl(var(--foreground)/0.08)_1px,transparent_1px)] [background-size:4px_4px]',
  aurora: 'bg-background [background-image:radial-gradient(circle_at_20%_20%,hsl(var(--primary)/0.32),transparent_32%),radial-gradient(circle_at_85%_25%,hsl(var(--info)/0.22),transparent_28%),radial-gradient(circle_at_50%_90%,hsl(var(--success)/0.16),transparent_35%)]',
  'terminal-matrix': 'bg-[#07080d] text-green-100 [background-image:linear-gradient(rgba(34,197,94,0.08)_1px,transparent_1px)] [background-size:12px_12px]',
  'mesh-gradient': 'bg-background [background-image:linear-gradient(135deg,hsl(var(--primary)/0.2),transparent_30%),linear-gradient(45deg,hsl(var(--warning)/0.14),transparent_35%),linear-gradient(225deg,hsl(var(--info)/0.16),transparent_40%)]',
  'frosted-panel': 'bg-background/60 backdrop-blur-2xl [background-image:linear-gradient(135deg,hsl(var(--card)/0.5),hsl(var(--primary)/0.08))]',
  starfield: 'bg-[#080812] text-white [background-image:radial-gradient(white_1px,transparent_1px),radial-gradient(hsl(var(--primary))_1px,transparent_1px)] [background-size:48px_48px,72px_72px] [background-position:0_0,24px_36px]',
  'blueprint-grid': 'bg-[#101827] text-blue-50 [background-image:linear-gradient(rgba(96,165,250,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(96,165,250,0.16)_1px,transparent_1px)] [background-size:24px_24px]',
  'minimal-paper': 'bg-[#fafaf7] text-zinc-900 [background-image:linear-gradient(rgba(0,0,0,0.035)_1px,transparent_1px)] [background-size:100%_28px]',
}

export function getPreviewBackgroundClass(style: BackgroundStyle): string {
  return PREVIEW_BACKGROUND_CLASSES[style] || PREVIEW_BACKGROUND_CLASSES.solid
}