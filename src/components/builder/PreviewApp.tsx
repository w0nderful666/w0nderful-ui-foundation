import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { type BuilderConfig } from '@/lib/builder'
import { getMotionConfig } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Progress } from '@/components/ui/Progress'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/Alert'
import { CodeBlock } from '@/components/ui/CodeBlock'
import { Switch } from '@/components/ui/Switch'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/Dialog'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table'
import { useToast } from '@/components/ui/Toast'
import { PreviewShell, SidebarItem, StatusBar } from './PreviewShell'
import { CommandPalettePreview } from './CommandPalettePreview'
import { FloatingWindowPreview } from './FloatingWindowPreview'
import { SettingsPanelPreview } from './SettingsPanelPreview'
import { EmptyStatePreview } from './EmptyStatePreview'
import { ActivityPanelPreview } from './ActivityPanelPreview'
import {
  Home,
  FileText,
  BarChart3,
  MessageSquare,
  Settings,
  Users,
  Bell,
  Search,
  Plus,
  Trash2,
  Edit,
  Eye,
  Copy,
  Download,
  RefreshCw,
  ChevronRight,
  Star,
  Heart,
  Zap,
  Shield,
  Globe,
  Database,
} from 'lucide-react'

interface PreviewAppProps {
  config: BuilderConfig
}

export function PreviewApp({ config }: PreviewAppProps) {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedRows, setSelectedRows] = useState<number[]>([])
  const [sidebarItem, setSidebarItem] = useState('home')
  const { addToast } = useToast()
  const motionConfig = getMotionConfig(config.motionLevel as any)

  const handleRowClick = useCallback((index: number) => {
    setSelectedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    )
  }, [])

  const handleToast = useCallback(() => {
    addToast({
      title: 'Success',
      description: 'Action completed successfully.',
      variant: 'success',
    })
  }, [addToast])

  const topNav = (
    <>
      <div className="flex items-center gap-2">
        <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center">
          <Zap className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="font-semibold text-sm">WebOS</span>
      </div>
      <div className="flex-1 mx-4 max-w-xs">
        <Input variant={config.inputStyle as any} placeholder="Search..." className="h-8 text-sm" />
      </div>
      <div className="flex items-center gap-1">
        <CommandPalettePreview config={config} />
        <FloatingWindowPreview config={config} />
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleToast}>
          <Bell className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Settings className="h-4 w-4" />
        </Button>
        <div className="h-7 w-7 rounded-full bg-primary/20 flex items-center justify-center text-xs font-medium text-primary">
          U
        </div>
      </div>
    </>
  )

  const sidebar = (
    <nav className="space-y-0.5 px-2">
      {[
        { icon: Home, label: 'Home', id: 'home' },
        { icon: BarChart3, label: 'Dashboard', id: 'dashboard' },
        { icon: FileText, label: 'Documents', id: 'documents' },
        { icon: Users, label: 'Team', id: 'team' },
        { icon: MessageSquare, label: 'Messages', id: 'messages' },
        { icon: Database, label: 'Database', id: 'database' },
        { icon: Globe, label: 'API', id: 'api' },
        { icon: Settings, label: 'Settings', id: 'settings' },
      ].map((item) => (
        <SidebarItem
          key={item.id}
          icon={item.icon}
          label={item.label}
          active={sidebarItem === item.id}
          onClick={() => setSidebarItem(item.id)}
        />
      ))}
    </nav>
  )

  const content = (
    <div className="p-6 space-y-6">
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: motionConfig.duration.normal }}
      >
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Welcome back, User</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" motionLevel={config.motionLevel as any}>
            <Download className="h-4 w-4 mr-1" />
            Export
          </Button>
          <Button variant={config.buttonStyle as any} size="sm" motionLevel={config.motionLevel as any}>
            <Plus className="h-4 w-4 mr-1" />
            New Project
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Users', value: '12,345', change: '+12%', icon: Users },
          { label: 'Revenue', value: '$45,678', change: '+8%', icon: BarChart3 },
          { label: 'Active Now', value: '1,234', change: '+15%', icon: Zap },
          { label: 'Uptime', value: '99.9%', change: '+0.1%', icon: Shield },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * motionConfig.listStagger, duration: motionConfig.duration.normal }}
          >
            <Card variant={config.cardStyle as any} motionLevel={config.motionLevel as any}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardDescription>{stat.label}</CardDescription>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <CardTitle className="text-2xl">{stat.value}</CardTitle>
              </CardHeader>
              <CardContent>
                <span className="text-sm text-success">{stat.change}</span>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card variant={config.cardStyle as any} motionLevel={config.motionLevel as any}>
          <CardHeader>
            <CardTitle>Button Variants</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Button variant="solid" motionLevel={config.motionLevel as any}>Solid</Button>
            <Button variant="soft" motionLevel={config.motionLevel as any}>Soft</Button>
            <Button variant="outline" motionLevel={config.motionLevel as any}>Outline</Button>
            <Button variant="ghost" motionLevel={config.motionLevel as any}>Ghost</Button>
            <Button variant="gradient" motionLevel={config.motionLevel as any}>Gradient</Button>
            <Button variant="glass" motionLevel={config.motionLevel as any}>Glass</Button>
            <Button variant="neon" motionLevel={config.motionLevel as any}>Neon</Button>
          </CardContent>
        </Card>

        <Card variant={config.cardStyle as any} motionLevel={config.motionLevel as any}>
          <CardHeader>
            <CardTitle>Input & Badges</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-2">
              <Input variant={config.inputStyle as any} placeholder="Search..." className="flex-1" />
              <Button variant={config.buttonStyle as any} size="icon" motionLevel={config.motionLevel as any}>
                <Search className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="info">Info</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card variant={config.cardStyle as any} motionLevel={config.motionLevel as any}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Projects</CardTitle>
            <Button variant="outline" size="sm" motionLevel={config.motionLevel as any}>
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { name: 'Web OS UI Kit', status: 'Active', progress: 85 },
                { name: 'Design System', status: 'Active', progress: 62 },
                { name: 'Component Library', status: 'Draft', progress: 34 },
                { name: 'Theme Engine', status: 'Active', progress: 91 },
              ].map((project, i) => (
                <TableRow
                  key={project.name}
                  className={cn(
                    'cursor-pointer',
                    selectedRows.includes(i) && 'bg-muted/50'
                  )}
                  onClick={() => handleRowClick(i)}
                >
                  <TableCell className="font-medium">{project.name}</TableCell>
                  <TableCell>
                    <Badge variant={project.status === 'Active' ? 'success' : 'secondary'}>
                      {project.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={project.progress} className="w-24" />
                      <span className="text-xs text-muted-foreground">{project.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Card variant={config.cardStyle as any} motionLevel={config.motionLevel as any}>
          <CardHeader>
            <CardTitle>Alerts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Alert variant="default">
              <AlertTitle>Info</AlertTitle>
              <AlertDescription>System update available.</AlertDescription>
            </Alert>
            <Alert variant="success">
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>Deployment completed.</AlertDescription>
            </Alert>
            <Alert variant="warning">
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>Storage almost full.</AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>Connection failed.</AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card variant={config.cardStyle as any} motionLevel={config.motionLevel as any}>
          <CardHeader>
            <CardTitle>Code & Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <CodeBlock language="json" copyable>
{`{
  "theme": "${config.themePreset}",
  "mode": "${config.mode}",
  "radius": "${config.radius}"
}`}
            </CodeBlock>
            <div className="flex items-center justify-between">
              <span className="text-sm">Enable notifications</span>
              <Switch motionLevel={config.motionLevel as any} defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Auto-save</span>
              <Switch motionLevel={config.motionLevel as any} defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card variant={config.cardStyle as any} motionLevel={config.motionLevel as any}>
          <CardHeader>
            <CardTitle>Dialog Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              variant={config.buttonStyle as any}
              onClick={() => setDialogOpen(true)}
              motionLevel={config.motionLevel as any}
            >
              Open Dialog
            </Button>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen} motionLevel={config.motionLevel as any}>
              <DialogContent onClose={() => setDialogOpen(false)}>
                <DialogHeader>
                  <DialogTitle>Confirm Action</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to proceed? This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setDialogOpen(false)} motionLevel={config.motionLevel as any}>
                    Cancel
                  </Button>
                  <Button variant="solid" onClick={() => setDialogOpen(false)} motionLevel={config.motionLevel as any}>
                    Confirm
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        <Card variant={config.cardStyle as any} motionLevel={config.motionLevel as any}>
          <CardHeader>
            <CardTitle>Empty State</CardTitle>
          </CardHeader>
          <CardContent>
            <EmptyStatePreview config={config} />
          </CardContent>
        </Card>
      </div>

      <Card variant={config.cardStyle as any} motionLevel={config.motionLevel as any}>
        <CardHeader>
          <CardTitle>Motion Preview</CardTitle>
          <CardDescription>Current: {config.motionLevel}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                className="h-12 w-12 rounded-lg bg-primary/80"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * motionConfig.listStagger, duration: motionConfig.duration.normal }}
                whileHover={(motionConfig.cardTransition as any).whileHover}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const rightPanel = (
    <div className="space-y-4">
      <ActivityPanelPreview config={config} />
      <div className="border-t border-border pt-4">
        <SettingsPanelPreview config={config} />
      </div>
    </div>
  )

  return (
    <PreviewShell
      config={config}
      topNav={topNav}
      sidebar={sidebar}
      content={content}
      rightPanel={rightPanel}
      footer={<StatusBar />}
    />
  )
}
