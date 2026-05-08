import { type BuilderConfig } from '@/lib/builder'
import { getPreviewBackgroundClass } from '@/lib/previewStyles'
import { PreviewApp } from './PreviewApp'
import { ConfigStatusBar } from './ConfigStatusBar'
import { motion, AnimatePresence } from 'framer-motion'

interface LivePreviewProps {
  config: BuilderConfig
}

export function LivePreview({ config }: LivePreviewProps) {
  const backgroundClass = getPreviewBackgroundClass(config.backgroundStyle)

  return (
    <div className="flex-1 overflow-hidden flex flex-col">
      <ConfigStatusBar config={config} />
      <AnimatePresence mode="wait">
        <motion.div
          key={config.backgroundStyle}
          className={`flex-1 overflow-hidden ${backgroundClass}`}
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.8 }}
          transition={{ duration: 0.2 }}
        >
          <PreviewApp config={config} />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
