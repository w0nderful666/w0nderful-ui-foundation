import { motion } from 'framer-motion'
import { type BuilderConfig } from '@/lib/builder'
import { getMotionConfig } from '@/lib/motion'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { GitCommit, GitBranch, GitMerge, MessageSquare, FileText, Settings } from 'lucide-react'

interface ActivityPanelPreviewProps {
  config: BuilderConfig
}

const ACTIVITIES = [
  { icon: GitCommit, text: 'Committed changes to main', time: '2m ago', variant: 'success' as const },
  { icon: GitBranch, text: 'Created branch feature/ui', time: '5m ago', variant: 'info' as const },
  { icon: GitMerge, text: 'Merged PR #42', time: '10m ago', variant: 'secondary' as const },
  { icon: MessageSquare, text: 'Commented on issue #38', time: '15m ago', variant: 'secondary' as const },
  { icon: FileText, text: 'Updated README.md', time: '20m ago', variant: 'secondary' as const },
  { icon: Settings, text: 'Changed project settings', time: '30m ago', variant: 'secondary' as const },
]

export function ActivityPanelPreview({ config }: ActivityPanelPreviewProps) {
  const motionConfig = getMotionConfig(config.motionLevel as any)

  return (
    <div className="p-4">
      <h3 className="text-sm font-semibold mb-4">Activity</h3>
      <div className="space-y-3">
        {ACTIVITIES.map((activity, i) => (
          <motion.div
            key={activity.text}
            className="flex items-start gap-3"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * motionConfig.listStagger, duration: motionConfig.duration.normal }}
          >
            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center shrink-0">
              <activity.icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm truncate">{activity.text}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <Badge variant={activity.variant} className="text-xs">{activity.time}</Badge>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
