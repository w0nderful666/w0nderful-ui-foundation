import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { type BuilderConfig } from '@/lib/builder'
import { getMotionConfig } from '@/lib/motion'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { X, Minus, Maximize2 } from 'lucide-react'

interface FloatingWindowPreviewProps {
  config: BuilderConfig
}

export function FloatingWindowPreview({ config }: FloatingWindowPreviewProps) {
  const [open, setOpen] = useState(false)
  const motionConfig = getMotionConfig(config.motionLevel as any)

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
        motionLevel={config.motionLevel as any}
      >
        Floating Window
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute top-20 right-80 w-80 bg-card border border-border rounded-xl shadow-2xl overflow-hidden z-40"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', ...motionConfig.spring.medium }}
            drag
            dragMomentum={false}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/50">
              <span className="text-sm font-medium">Properties</span>
              <div className="flex items-center gap-1">
                <button className="h-6 w-6 rounded hover:bg-muted flex items-center justify-center">
                  <Minus className="h-3 w-3" />
                </button>
                <button className="h-6 w-6 rounded hover:bg-muted flex items-center justify-center">
                  <Maximize2 className="h-3 w-3" />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="h-6 w-6 rounded hover:bg-destructive/10 hover:text-destructive flex items-center justify-center"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            </div>
            <div className="p-4 space-y-3">
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Name</label>
                <div className="text-sm">Dashboard Component</div>
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Type</label>
                <div className="text-sm">Container</div>
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Status</label>
                <div className="text-sm text-success">Active</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
