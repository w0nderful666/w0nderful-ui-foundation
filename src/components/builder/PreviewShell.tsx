import { useState } from 'react'
import { motion } from 'framer-motion'
import { type BuilderConfig } from '@/lib/builder'
import { getMotionConfig } from '@/lib/motion'
import { SHADOW_CLASSES, BORDER_CLASSES, SURFACE_CLASSES, DOCK_CLASSES, CHROME_STYLES } from '@/lib/previewConfig'
import { cn } from '@/lib/utils'
import {
  ChevronLeft,
  ChevronRight,
  Wifi,
  Battery,
  Clock,
  Circle,
  Square,
  X,
  Zap,
  Folder,
  Users,
  Settings,
  Terminal,
} from 'lucide-react'

interface PreviewShellProps {
  config: BuilderConfig
  topNav: React.ReactNode
  sidebar: React.ReactNode
  content: React.ReactNode
  rightPanel?: React.ReactNode
  footer?: React.ReactNode
}

export function PreviewShell({ config, topNav, sidebar, content, rightPanel, footer }: PreviewShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const motionConfig = getMotionConfig(config.motionLevel as any)

  // Apply styles based on config
  const shadowClass = SHADOW_CLASSES[config.shadow]
  const borderClass = BORDER_CLASSES[config.borderStyle]
  const surfaceClass = SURFACE_CLASSES[config.surfaceMaterial]
  const dockClass = DOCK_CLASSES[config.dockStyle]
  const chromeStyle = CHROME_STYLES[config.panelChrome]

  // Density styles from CSS variables
  const densityStyle = {
    padding: 'var(--spacing-md)',
    gap: 'var(--gap)',
  }

  // Font scale styles
  const fontStyle = {
    fontSize: 'var(--font-size-base)',
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header with Panel Chrome */}
      <motion.header
        className={cn(
          'flex items-center h-12 px-4 border-b shrink-0',
          borderClass,
          surfaceClass,
          chromeStyle.header
        )}
        style={{ boxShadow: 'var(--shadow-sm)' }}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: motionConfig.duration.normal }}
      >
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden mr-2 h-8 w-8 rounded hover:bg-muted flex items-center justify-center"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
        
        {/* Panel Chrome Controls */}
        {config.panelChrome === 'macos' && (
          <div className="flex items-center gap-1.5 mr-4">
            <Circle className="h-3 w-3 fill-red-500 text-red-500" />
            <Circle className="h-3 w-3 fill-yellow-500 text-yellow-500" />
            <Circle className="h-3 w-3 fill-green-500 text-green-500" />
          </div>
        )}
        
        {topNav}
        
        {config.panelChrome === 'linux' && (
          <div className={cn('ml-auto', chromeStyle.controls)}>
            <button className="p-1.5 hover:bg-muted rounded"><Square className="h-3 w-3" /></button>
            <button className="p-1.5 hover:bg-muted rounded"><X className="h-3 w-3" /></button>
          </div>
        )}
        
        {config.panelChrome === 'terminal' && (
          <div className="ml-2 text-xs opacity-70">~/web-os-ui-foundation</div>
        )}
        
        {config.panelChrome === 'studio' && (
          <div className={cn('ml-auto', chromeStyle.controls)}>
            <button className="px-2 py-1 text-xs bg-primary/10 rounded">Run</button>
            <button className="px-2 py-1 text-xs bg-muted rounded">Build</button>
          </div>
        )}
      </motion.header>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar with Layout Style */}
        <motion.aside
          className={cn(
            'bg-card/50 shrink-0 overflow-y-auto transition-all z-50',
            borderClass,
            'fixed lg:relative inset-y-0 left-0',
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
            sidebarCollapsed ? 'w-14' : 'w-52'
          )}
          style={{ 
            boxShadow: config.layoutStyle === 'floating-panels' ? 'var(--shadow-md)' : 'none',
          }}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: motionConfig.duration.normal, delay: motionConfig.listStagger }}
        >
          {config.layoutStyle === 'sidebar' && (
            <>
              <div className="flex items-center justify-end p-2">
                <button
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className="h-6 w-6 rounded hover:bg-muted flex items-center justify-center hidden lg:flex"
                >
                  {sidebarCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
                </button>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="h-6 w-6 rounded hover:bg-muted flex items-center justify-center lg:hidden"
                >
                  <ChevronLeft className="h-3 w-3" />
                </button>
              </div>
              {sidebar}
            </>
          )}
          {config.layoutStyle === 'topbar' && (
            <div className="flex items-center gap-4 p-4 border-b border-border/50">
              <Zap className="h-5 w-5 text-primary" />
              <span className="font-medium">WebOS</span>
            </div>
          )}
        </motion.aside>

        {/* Main Content with Density and Font Scale */}
        <main 
          className={cn('flex-1 overflow-y-auto', surfaceClass)}
          style={{ 
            ...densityStyle,
            ...fontStyle,
          }}
        >
          {content}
        </main>

        {rightPanel && (
          <motion.aside
            className={cn('w-72 shrink-0 overflow-y-auto hidden xl:block', borderClass, surfaceClass)}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: motionConfig.duration.normal, delay: motionConfig.listStagger * 2 }}
          >
            {rightPanel}
          </motion.aside>
        )}
      </div>

      {/* Dock with Dock Style */}
      {footer && (
        <motion.footer
          className={cn(
            'flex items-center px-4 border-t shrink-0',
            borderClass,
            dockClass
          )}
          style={{ 
            minHeight: 'var(--height-sidebar, 48px)',
            boxShadow: config.dockStyle !== 'minimal' ? 'var(--shadow-md)' : 'none',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: motionConfig.duration.normal, delay: motionConfig.listStagger * 3 }}
        >
          <div className={cn('flex items-center gap-2', config.dockStyle === 'pill-dock' ? 'mx-auto' : '')}>
            {[
              { icon: Folder, active: true },
              { icon: Users, active: false },
              { icon: Settings, active: false },
              { icon: Terminal, active: false },
            ].map((item, i) => (
              <button
                key={i}
                className={cn(
                  'p-2 rounded-lg transition-all',
                  item.active 
                    ? 'bg-primary/20 text-primary' 
                    : 'hover:bg-muted/50 text-muted-foreground',
                  config.dockStyle === 'pill-dock' && 'rounded-full',
                  config.dockStyle === 'neon-dock' && item.active && 'shadow-[0_0_10px_hsl(var(--primary)_/_0.5)]'
                )}
              >
                <item.icon className="h-5 w-5" />
              </button>
            ))}
          </div>
        </motion.footer>
      )}
    </div>
  )
}

interface SidebarItemProps {
  icon: React.ElementType
  label: string
  active?: boolean
  collapsed?: boolean
  onClick?: () => void
}

export function SidebarItem({ icon: Icon, label, active, collapsed, onClick }: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-3 w-full px-3 py-2 text-sm transition-colors',
        active
          ? 'bg-primary/10 text-primary font-medium'
          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
      )}
    >
      <Icon className="h-4 w-4 shrink-0" />
      {!collapsed && <span className="truncate">{label}</span>}
    </button>
  )
}

export function StatusBar({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Wifi className="h-3 w-3" />
          <Battery className="h-3 w-3" />
        </span>
        <span className="flex-1" />
        <span>w0nderful-ui-foundation</span>
        <span className="flex-1" />
        <span>
          <Clock className="h-3 w-3 inline" />
        </span>
      </div>
    )
  }
  return (
    <>
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1">
          <Wifi className="h-3 w-3" />
          Connected
        </span>
        <span className="flex items-center gap-1">
          <Battery className="h-3 w-3" />
          100%
        </span>
      </div>
      <div className="flex-1 text-center">w0nderful-ui-foundation</div>
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </>
  )
}
