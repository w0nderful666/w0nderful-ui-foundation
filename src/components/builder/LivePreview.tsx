import { type BuilderConfig } from '@/lib/builder'
import { PreviewApp } from './PreviewApp'

interface LivePreviewProps {
  config: BuilderConfig
}

export function LivePreview({ config }: LivePreviewProps) {
  return (
    <div className="flex-1 overflow-hidden">
      <PreviewApp config={config} />
    </div>
  )
}
