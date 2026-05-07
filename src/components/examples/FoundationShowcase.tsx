import { motion } from 'framer-motion'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs'
import { ComponentGallery } from './ComponentGallery'
import { ThemePlayground } from './ThemePlayground'
import { MotionPlayground } from './MotionPlayground'
import { Dock } from '@/components/ui/Dock'
import { Window } from '@/components/ui/Window'
import { Toolbar } from '@/components/ui/Toolbar'
import { Home, Palette, Sparkles, Grid, Code, Settings } from 'lucide-react'

const dockItems = [
  { id: 'home', icon: <Home className="h-5 w-5" />, label: 'Home' },
  { id: 'grid', icon: <Grid className="h-5 w-5" />, label: 'Grid' },
  { id: 'palette', icon: <Palette className="h-5 w-5" />, label: 'Theme' },
  { id: 'sparkles', icon: <Sparkles className="h-5 w-5" />, label: 'Motion' },
  { id: 'code', icon: <Code className="h-5 w-5" />, label: 'Components' },
  { id: 'settings', icon: <Settings className="h-5 w-5" />, label: 'Settings' },
]

const toolbarItems = [
  { id: 'bold', icon: <span className="text-sm font-bold">B</span>, label: 'Bold' },
  { id: 'italic', icon: <span className="text-sm italic">I</span>, label: 'Italic' },
  { id: 'underline', icon: <span className="text-sm underline">U</span>, label: 'Underline' },
  { id: 'code', icon: <Code className="h-4 w-4" />, label: 'Code' },
]

export function FoundationShowcase() {
  return (
    <div className="min-h-screen bg-background p-8">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold mb-2">w0nderful-ui-foundation</h1>
        <p className="text-muted-foreground text-lg">
          UI 地基项目 - 沉淀可复用的页面风格、配色方案、动画系统、基础组件
        </p>
      </motion.header>

      <Tabs defaultValue="components" className="space-y-6">
        <TabsList>
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
              <h3 className="text-lg font-semibold">Dock Component</h3>
              <p className="text-sm text-muted-foreground">
                macOS 风格的停靠栏组件，支持悬停放大和提示
              </p>
              <div className="flex justify-center py-8">
                <Dock items={dockItems} />
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-lg font-semibold">Window Component</h3>
              <p className="text-sm text-muted-foreground">
                类 macOS 窗口组件，带有标题栏和控制按钮
              </p>
              <div className="flex gap-4 flex-wrap">
                <Window title="Hello World" isOpen={true}>
                  <p className="text-sm text-muted-foreground">
                    This is a window component with title bar and control buttons.
                  </p>
                </Window>
                <Window title="Settings" isOpen={true} className="w-80">
                  <p className="text-sm text-muted-foreground">
                    Window can contain any content.
                  </p>
                </Window>
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-lg font-semibold">Toolbar Component</h3>
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

      <footer className="mt-16 pt-8 border-t text-center text-sm text-muted-foreground">
        <p>w0nderful-ui-foundation v0.1.0 - UI Foundation for Local First Tools</p>
      </footer>
    </div>
  )
}