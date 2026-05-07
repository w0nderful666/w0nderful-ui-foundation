import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { type BuilderConfig } from '@/lib/builder'
import { getMotionConfig } from '@/lib/motion'
import { cn } from '@/lib/utils'
import {
  Home,
  FileText,
  BarChart3,
  MessageSquare,
  Settings,
  Users,
  Bell,
  Search,
  ChevronLeft,
  ChevronRight,
  Wifi,
  Battery,
  Clock,
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
  const motionConfig = getMotionConfig(config.motionLevel as any)

  return (
    <div className="flex flex-col h-full">
      <motion.header
        className="flex items-center h-12 px-4 border-b border-border bg-card/80 backdrop-blur-sm shrink-0"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: motionConfig.duration.normal }}
      >
        {topNav}
      </motion.header>

      <div className="flex flex-1 overflow-hidden">
        <motion.aside
          className={cn(
            'border-r border-border bg-card/50 shrink-0 overflow-y-auto transition-all',
            sidebarCollapsed ? 'w-14' : 'w-52'
          )}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: motionConfig.duration.normal, delay: motionConfig.listStagger }}
        >
          <div className="flex items-center justify-end p-2">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="h-6 w-6 rounded hover:bg-muted flex items-center justify-center"
            >
              {sidebarCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
            </button>
          </div>
          {sidebar}
        </motion.aside>

        <main className="flex-1 overflow-y-auto">
          {content}
        </main>

        {rightPanel && (
          <motion.aside
            className="w-72 border-l border-border bg-card/30 shrink-0 overflow-y-auto hidden xl:block"
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: motionConfig.duration.normal, delay: motionConfig.listStagger * 2 }}
          >
            {rightPanel}
          </motion.aside>
        )}
      </div>

      {footer && (
        <motion.footer
          className="flex items-center h-7 px-4 border-t border-border bg-card/50 text-xs text-muted-foreground shrink-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: motionConfig.duration.normal, delay: motionConfig.listStagger * 3 }}
        >
          {footer}
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

export function StatusBar() {
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
      <div className="flex-1 text-center">Web OS UI Kit Builder</div>
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </>
  )
}
