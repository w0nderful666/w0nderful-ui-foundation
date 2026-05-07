import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { type BuilderConfig } from '@/lib/builder'
import { getMotionConfig } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Command, Search, X } from 'lucide-react'

interface CommandPalettePreviewProps {
  config: BuilderConfig
}

const COMMANDS = [
  { id: 'theme', label: 'Change Theme', shortcut: '⌘T' },
  { id: 'mode', label: 'Toggle Dark Mode', shortcut: '⌘D' },
  { id: 'export', label: 'Export Configuration', shortcut: '⌘E' },
  { id: 'reset', label: 'Reset to Defaults', shortcut: '⌘R' },
  { id: 'copy', label: 'Copy CSS Variables', shortcut: '⌘C' },
  { id: 'download', label: 'Download Theme', shortcut: '⌘S' },
]

export function CommandPalettePreview({ config }: CommandPalettePreviewProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const motionConfig = getMotionConfig(config.motionLevel as any)

  const filtered = COMMANDS.filter((cmd) =>
    cmd.label.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
        motionLevel={config.motionLevel as any}
      >
        <Command className="h-3 w-3 mr-2" />
        Command Palette
      </Button>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50">
            <motion.div
              className="fixed inset-0 bg-background/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <div className="fixed inset-0 flex items-start justify-center pt-[20vh]">
              <motion.div
                className="w-full max-w-md bg-card border border-border rounded-xl shadow-2xl overflow-hidden"
                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ type: 'spring', ...motionConfig.spring.medium }}
              >
                <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    variant="minimal"
                    placeholder="Type a command..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 border-0 focus-visible:ring-0 px-0"
                  />
                  <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="max-h-64 overflow-y-auto p-2">
                  {filtered.map((cmd, i) => (
                    <motion.button
                      key={cmd.id}
                      className="flex items-center justify-between w-full px-3 py-2 text-sm rounded-lg hover:bg-muted text-left"
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * motionConfig.listStagger }}
                      onClick={() => setOpen(false)}
                    >
                      <span>{cmd.label}</span>
                      <kbd className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                        {cmd.shortcut}
                      </kbd>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
