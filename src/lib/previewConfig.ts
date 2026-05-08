import { 
  type Shadow, 
  type Density, 
  type FontScale, 
  type BorderStyle, 
  type SurfaceMaterial,
  type DockStyle,
  type PanelChrome,
  type LayoutStyle 
} from './builder'

// ============================================
// SHADOW MAPPING - Enhanced for cross-theme visibility
// ============================================
export const SHADOW_CLASSES: Record<Shadow, string> = {
  flat: 'shadow-none',
  soft: 'shadow-[0_2px_8px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.06)]',
  floating: 'shadow-[0_8px_24px_rgba(0,0,0,0.12),0_16px_48px_rgba(0,0,0,0.08)]',
  elevated: 'shadow-[0_12px_32px_rgba(0,0,0,0.16),0_24px_64px_rgba(0,0,0,0.12)]',
  glow: 'shadow-[0_0_20px_hsl(var(--primary)_/_0.3),0_0_40px_hsl(var(--primary)_/_0.2),0_0_60px_hsl(var(--primary)_/_0.1)]',
}

// Light mode compensation for shadow visibility
export const SHADOW_LIGHT_COMPENSATION: Record<Shadow, string> = {
  flat: '',
  soft: 'dark:shadow-[0_2px_8px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.06)]',
  floating: 'dark:shadow-[0_8px_24px_rgba(0,0,0,0.12),0_16px_48px_rgba(0,0,0,0.08)]',
  elevated: 'dark:shadow-[0_12px_32px_rgba(0,0,0,0.16),0_24px_64px_rgba(0,0,0,0.12)]',
  glow: 'shadow-[0_0_16px_hsl(var(--primary)_/_0.4)]',
}

// ============================================
// DENSITY MAPPING - Must be dramatically different
// ============================================
export const DENSITY_STYLES: Record<Density, Record<string, string>> = {
  compact: {
    '--spacing-xs': '4px',
    '--spacing-sm': '6px',
    '--spacing-md': '8px',
    '--spacing-lg': '12px',
    '--padding-card': '8px',
    '--padding-button-y': '4px',
    '--padding-button-x': '8px',
    '--gap': '6px',
    '--height-button': '28px',
    '--height-input': '28px',
    '--height-sidebar': '40px',
    '--font-size-scale': '0.85',
  },
  normal: {
    '--spacing-xs': '6px',
    '--spacing-sm': '10px',
    '--spacing-md': '14px',
    '--spacing-lg': '20px',
    '--padding-card': '14px',
    '--padding-button-y': '8px',
    '--padding-button-x': '14px',
    '--gap': '10px',
    '--height-button': '36px',
    '--height-input': '36px',
    '--height-sidebar': '48px',
    '--font-size-scale': '1',
  },
  spacious: {
    '--spacing-xs': '10px',
    '--spacing-sm': '16px',
    '--spacing-md': '24px',
    '--spacing-lg': '32px',
    '--padding-card': '20px',
    '--padding-button-y': '12px',
    '--padding-button-x': '20px',
    '--gap': '16px',
    '--height-button': '44px',
    '--height-input': '44px',
    '--height-sidebar': '56px',
    '--font-size-scale': '1.1',
  },
  presentation: {
    '--spacing-xs': '16px',
    '--spacing-sm': '24px',
    '--spacing-md': '32px',
    '--spacing-lg': '48px',
    '--padding-card': '28px',
    '--padding-button-y': '16px',
    '--padding-button-x': '28px',
    '--gap': '24px',
    '--height-button': '52px',
    '--height-input': '52px',
    '--height-sidebar': '64px',
    '--font-size-scale': '1.25',
  },
}

// ============================================
// FONT SCALE MAPPING - Must be dramatically different
// ============================================
export const FONT_SCALE_STYLES: Record<FontScale, Record<string, string>> = {
  compact: {
    '--font-size-xs': '10px',
    '--font-size-sm': '12px',
    '--font-size-base': '14px',
    '--font-size-lg': '16px',
    '--font-size-xl': '18px',
    '--font-size-2xl': '22px',
    '--font-size-3xl': '26px',
  },
  normal: {
    '--font-size-xs': '11px',
    '--font-size-sm': '13px',
    '--font-size-base': '15px',
    '--font-size-lg': '17px',
    '--font-size-xl': '20px',
    '--font-size-2xl': '24px',
    '--font-size-3xl': '30px',
  },
  large: {
    '--font-size-xs': '12px',
    '--font-size-sm': '14px',
    '--font-size-base': '16px',
    '--font-size-lg': '19px',
    '--font-size-xl': '22px',
    '--font-size-2xl': '28px',
    '--font-size-3xl': '36px',
  },
  display: {
    '--font-size-xs': '13px',
    '--font-size-sm': '15px',
    '--font-size-base': '18px',
    '--font-size-lg': '22px',
    '--font-size-xl': '26px',
    '--font-size-2xl': '34px',
    '--font-size-3xl': '44px',
  },
}

// ============================================
// BORDER STYLE MAPPING - Must be visible across themes
// ============================================
export const BORDER_CLASSES: Record<BorderStyle, string> = {
  none: 'border-0',
  subtle: 'border border-[hsl(var(--border)/_0.5)]',
  strong: 'border-2 border-[hsl(var(--border)_/_0.9)]',
  glow: 'border border-[hsl(var(--primary)_/_0.6)] shadow-[0_0_8px_hsl(var(--primary)_/_0.3)]',
  dashed: 'border border-dashed border-[hsl(var(--border)_/_0.7)]',
  double: 'border-4 border-double border-[hsl(var(--border)_/_0.8)]',
}

// ============================================
// SURFACE MATERIAL MAPPING
// ============================================
export const SURFACE_CLASSES: Record<SurfaceMaterial, string> = {
  solid: 'bg-card',
  glass: 'bg-card/70 backdrop-blur-md',
  matte: 'bg-[hsl(var(--muted)_/_0.6)]',
  acrylic: 'bg-card/50 backdrop-blur-xl border border-[hsl(var(--primary)_/_0.1)]',
  paper: 'bg-[#fafaf7] dark:bg-[#1a1814] text-zinc-900 dark:text-zinc-100',
  terminal: 'bg-[#0d1117] text-green-400 font-mono',
}

// ============================================
// DOCK STYLE MAPPING
// ============================================
export const DOCK_CLASSES: Record<DockStyle, string> = {
  'minimal': 'bg-transparent border-t border-[hsl(var(--border)/_0.3)] py-2',
  'glass-dock': 'bg-card/60 backdrop-blur-lg border-t border-[hsl(var(--primary)/_0.1)] shadow-[0_-4px_20px_rgba(0,0,0,0.1)] py-3',
  'pill-dock': 'bg-[hsl(var(--background)/_0.9)] border-t-0 rounded-full shadow-[0_-4px_24px_rgba(0,0,0,0.15)] py-4 mx-4 rounded-xl',
  'floating-shelf': 'bg-card shadow-[0_8px_32px_rgba(0,0,0,0.2)] border-t border-[hsl(var(--border)/_0.5)] py-3',
  'neon-dock': 'bg-[hsl(var(--background)/_0.8)] border-t-2 border-[hsl(var(--primary)/_0.5)] shadow-[0_-4px_20px_hsl(var(--primary)/_0.3),0_-8px_40px_hsl(var(--primary)/_0.1)] py-3',
}

// ============================================
// PANEL CHROME MAPPING
// ============================================
export const CHROME_STYLES: Record<PanelChrome, { header: string; controls: string }> = {
  macos: {
    header: 'bg-muted/50 flex items-center gap-2',
    controls: 'flex items-center gap-1.5',
  },
  linux: {
    header: 'bg-muted/30 flex items-center justify-between border-b border-[hsl(var(--border)/_0.4)]',
    controls: 'flex items-center gap-0',
  },
  terminal: {
    header: 'bg-[#0d1117] text-green-400 font-mono text-xs flex items-center px-3 py-1.5',
    controls: 'flex items-center gap-2 text-[10px]',
  },
  minimal: {
    header: 'bg-transparent border-b border-transparent',
    controls: 'hidden',
  },
  studio: {
    header: 'bg-gradient-to-r from-primary/10 to-accent/10 border-b border-[hsl(var(--border)/_0.3)] flex items-center justify-between',
    controls: 'flex items-center gap-2',
  },
}

// ============================================
// LAYOUT STYLE MAPPING
// ============================================
export const LAYOUT_STRUCTURES: Record<LayoutStyle, { main: string; nav: string }> = {
  sidebar: {
    main: 'flex-1 overflow-y-auto',
    nav: 'w-52 border-r border-border bg-card/50 shrink-0',
  },
  topbar: {
    main: 'flex-1 overflow-y-auto',
    nav: 'h-12 border-b border-border bg-card/50 shrink-0',
  },
  split: {
    main: 'grid grid-cols-2 gap-4 flex-1 overflow-y-auto p-4',
    nav: 'hidden',
  },
  'floating-panels': {
    main: 'flex-1 overflow-y-auto p-8',
    nav: 'hidden',
  },
  'dashboard-grid': {
    main: 'flex-1 overflow-y-auto p-6',
    nav: 'hidden',
  },
}