import { motion } from 'framer-motion'
import { type BuilderConfig } from '@/lib/builder'
import { getMotionConfig } from '@/lib/motion'
import { Button } from '@/components/ui/Button'
import { Inbox, Plus, Search } from 'lucide-react'

interface EmptyStatePreviewProps {
  config: BuilderConfig
}

export function EmptyStatePreview({ config }: EmptyStatePreviewProps) {
  const motionConfig = getMotionConfig(config.motionLevel as any)

  return (
    <motion.div
      className="flex flex-col items-center justify-center py-12 text-center"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: motionConfig.duration.normal }}
    >
      <motion.div
        className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center mb-4"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', ...motionConfig.spring.medium }}
      >
        <Inbox className="h-8 w-8 text-muted-foreground" />
      </motion.div>
      <h3 className="text-lg font-semibold mb-1">No items yet</h3>
      <p className="text-sm text-muted-foreground mb-4 max-w-xs">
        Get started by creating your first item. It will appear here.
      </p>
      <div className="flex gap-2">
        <Button variant="solid" size="sm" motionLevel={config.motionLevel as any}>
          <Plus className="h-4 w-4 mr-1" />
          Create Item
        </Button>
        <Button variant="outline" size="sm" motionLevel={config.motionLevel as any}>
          <Search className="h-4 w-4 mr-1" />
          Browse
        </Button>
      </div>
    </motion.div>
  )
}
