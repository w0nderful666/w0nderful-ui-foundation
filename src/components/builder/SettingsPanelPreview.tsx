import { type BuilderConfig } from '@/lib/builder'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Switch } from '@/components/ui/Switch'
import { Badge } from '@/components/ui/Badge'
import { motion } from 'framer-motion'
import { getMotionConfig } from '@/lib/motion'

interface SettingsPanelPreviewProps {
  config: BuilderConfig
}

export function SettingsPanelPreview({ config }: SettingsPanelPreviewProps) {
  const motionConfig = getMotionConfig(config.motionLevel as any)

  return (
    <div className="p-4 space-y-4">
      <h3 className="text-sm font-semibold text-foreground">Settings</h3>

      <motion.div
        className="space-y-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: motionConfig.listStagger }}
      >
        <div className="flex items-center justify-between">
          <span className="text-sm">Notifications</span>
          <Switch motionLevel={config.motionLevel as any} defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">Auto-save</span>
          <Switch motionLevel={config.motionLevel as any} defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">Dark mode</span>
          <Switch motionLevel={config.motionLevel as any} checked={config.mode === 'dark'} />
        </div>
      </motion.div>

      <div className="border-t border-border pt-4">
        <h4 className="text-xs font-medium text-muted-foreground mb-3">Recent Activity</h4>
        <div className="space-y-2">
          {[
            { action: 'Theme changed', time: '2m ago', variant: 'info' as const },
            { action: 'Config exported', time: '5m ago', variant: 'success' as const },
            { action: 'Settings updated', time: '10m ago', variant: 'secondary' as const },
          ].map((item, i) => (
            <motion.div
              key={item.action}
              className="flex items-center justify-between text-sm"
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: (i + 1) * motionConfig.listStagger }}
            >
              <span className="text-muted-foreground">{item.action}</span>
              <div className="flex items-center gap-2">
                <Badge variant={item.variant} className="text-xs">{item.time}</Badge>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
