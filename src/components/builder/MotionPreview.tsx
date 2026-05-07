import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { getMotionConfig } from '@/lib/motion'
import { Button } from '@/components/ui/Button'
import { Play } from 'lucide-react'

interface MotionPreviewProps {
  level: string
}

export function MotionPreview({ level }: MotionPreviewProps) {
  const [key, setKey] = useState(0)
  const motionConfig = getMotionConfig(level as any)

  const handleReplay = useCallback(() => {
    setKey((k) => k + 1)
  }, [])

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">Preview</span>
        <Button variant="ghost" size="sm" onClick={handleReplay}>
          <Play className="h-3 w-3 mr-1" />
          Replay
        </Button>
      </div>
      <div className="flex items-center gap-3" key={key}>
        <motion.div
          className="h-10 w-10 rounded-lg bg-primary"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: motionConfig.duration.normal }}
        />
        <motion.div
          className="h-10 w-10 rounded-lg bg-secondary"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: motionConfig.duration.normal, delay: motionConfig.listStagger }}
        />
        <motion.div
          className="h-10 w-10 rounded-lg bg-accent"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: motionConfig.duration.normal, delay: motionConfig.listStagger * 2 }}
        />
        <motion.div
          className="h-10 w-10 rounded-lg bg-destructive"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: motionConfig.duration.normal, delay: motionConfig.listStagger * 3 }}
        />
      </div>
    </div>
  )
}
