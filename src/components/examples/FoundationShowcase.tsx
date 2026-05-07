import { motion } from 'framer-motion'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs'
import { useTheme } from '@/lib/theme'
import { ComponentGallery } from './ComponentGallery'
import { ThemePlayground } from './ThemePlayground'
import { MotionPlayground } from './MotionPlayground'
import { Dock } from '@/components/ui/Dock'
import { Window } from '@/components/ui/Window'
import { Toolbar } from '@/components/ui/Toolbar'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Home, Palette, Sparkles, Grid, Code, Sun, Moon, Layers, MousePointer2 } from 'lucide-react'
import { Switch } from '@/components/ui/Switch'

const dockItems = [
  { id: 'home', icon: <Home className="h-5 w-5" />, label: 'Home' },
  { id: 'grid', icon: <Grid className="h-5 w-5" />, label: 'Components' },
  { id: 'palette', icon: <Palette className="h-5 w-5" />, label: 'Theme' },
  { id: 'sparkles', icon: <Sparkles className="h-5 w-5" />, label: 'Motion' },
  { id: 'layers', icon: <Layers className="h-5 w-5" />, label: 'Layout' },
  { id: 'code', icon: <Code className="h-5 w-5" />, label: 'API' },
]

const toolbarItems = [
  { id: 'pointer', icon: <MousePointer2 className="h-4 w-4" />, label: 'Select' },
  { id: 'code', icon: <Code className="h-4 w-4" />, label: 'Code' },
  { id: 'palette', icon: <Palette className="h-4 w-4" />, label: 'Color' },
  { id: 'layers', icon: <Layers className="h-4 w-4" />, label: 'Layers' },
]

export function FoundationShowcase() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen bg-background text-foreground">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50"
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">W</span>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">w0nderful-ui-foundation</h1>
              <p className="text-xs text-muted-foreground">UI Foundation for Local First Tools</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground px-2 py-1 rounded bg-muted">v0.1.0</span>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className="gap-2"
            >
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              {theme === 'light' ? 'Dark' : 'Light'}
            </Button>
          </div>
        </div>
      </motion.header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10"
        >
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="md:col-span-2 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-2">Design System Foundation</h2>
                <p className="text-muted-foreground mb-4">
                  沉淀可复用的页面风格、配色方案、动画系统、基础组件。
                  为 Local First / GitHub Pages / Web OS 风格小工具提供 UI 地基。
                </p>
                <div className="flex gap-2">
                  <Badge>🎨 Theme System</Badge>
                  <Badge>✨ Motion</Badge>
                  <Badge>📦 Components</Badge>
                  <Badge>🔧 Tooling</Badge>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card/80 backdrop-blur">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Components</span>
                    <span className="font-medium">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Themes</span>
                    <span className="font-medium">2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Motion Presets</span>
                    <span className="font-medium">10+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Token Colors</span>
                    <span className="font-medium">20+</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        <Tabs defaultValue="components" className="space-y-6">
          <TabsList className="bg-muted/50 p-1">
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="theme">Theme</TabsTrigger>
            <TabsTrigger value="motion">Motion</TabsTrigger>
            <TabsTrigger value="special">Special UI</TabsTrigger>
          </TabsList>

          <TabsContent value="components">
            <ComponentGallery />
          </TabsContent>

          <TabsContent value="theme">
            <ThemePlayground />
          </TabsContent>

          <TabsContent value="motion">
            <MotionPlayground />
          </TabsContent>

          <TabsContent value="special">
            <div className="space-y-8">
              <section className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  Dock Component
                </h3>
                <p className="text-sm text-muted-foreground">
                  macOS 风格的停靠栏组件，支持悬停放大和提示
                </p>
                <div className="flex justify-center py-8">
                  <Dock items={dockItems} />
                </div>
              </section>

              <section className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent"></span>
                  Window Component
                </h3>
                <p className="text-sm text-muted-foreground">
                  类 macOS 窗口组件，带有标题栏和控制按钮
                </p>
                <div className="flex gap-4 flex-wrap">
                  <Window title="w0nderful-ui-foundation" isOpen={true}>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        This is a window component with title bar and control buttons.
                      </p>
                      <div className="flex gap-2">
                        <Button size="sm">Confirm</Button>
                        <Button size="sm" variant="outline">Cancel</Button>
                      </div>
                    </div>
                  </Window>
                  <Window title="Settings" isOpen={true} className="w-80">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Dark Mode</span>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Notifications</span>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </Window>
                </div>
              </section>

              <section className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  Toolbar Component
                </h3>
                <p className="text-sm text-muted-foreground">
                  工具栏组件，支持活跃状态指示器
                </p>
                <div className="flex justify-center py-4">
                  <Toolbar items={toolbarItems} />
                </div>
              </section>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="mt-16 py-8 border-t border-border text-center">
        <p className="text-sm text-muted-foreground">
          w0nderful-ui-foundation v0.1.0 — UI Foundation for Local First Tools
        </p>
      </footer>
    </div>
  )
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium">
      {children}
    </span>
  )
}