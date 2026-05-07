import { type BuilderConfig } from '@/lib/builder'
import { motion } from 'framer-motion'
import { ControlPanel } from './ControlPanel'
import { LivePreview } from './LivePreview'

interface BuilderLayoutProps {
  config: BuilderConfig
  onConfigChange: <K extends keyof BuilderConfig>(key: K, value: BuilderConfig[K]) => void
  onReset: () => void
}

export function BuilderLayout({ config, onConfigChange, onReset }: BuilderLayoutProps) {
  return (
    <motion.div
      className="flex flex-col lg:flex-row h-screen overflow-hidden bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <LivePreview config={config} />
      <ControlPanel config={config} onConfigChange={onConfigChange} onReset={onReset} />
    </motion.div>
  )
}
