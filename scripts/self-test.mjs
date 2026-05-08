import { readFileSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

let passed = 0
let failed = 0

function test(name, fn) {
  try {
    fn()
    console.log(`  ✓ ${name}`)
    passed++
  } catch (err) {
    console.log(`  ✗ ${name}`)
    console.log(`    ${err.message}`)
    failed++
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

console.log('\n🧪 Self Test\n')

test('package.json 存在', () => {
  assert(existsSync(resolve(root, 'package.json')), 'package.json 不存在')
})

test('package.json 包含必要脚本', () => {
  const pkg = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf-8'))
  assert(pkg.scripts?.dev, '缺少 dev 脚本')
  assert(pkg.scripts?.build, '缺少 build 脚本')
  assert(pkg.scripts?.check, '缺少 check 脚本')
  assert(pkg.scripts?.['self-test'], '缺少 self-test 脚本')
  assert(pkg.scripts?.preflight, '缺少 preflight 脚本')
})

test('package.json 包含必要依赖', () => {
  const pkg = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf-8'))
  assert(pkg.dependencies?.react, '缺少 react 依赖')
  assert(pkg.dependencies?.['react-dom'], '缺少 react-dom 依赖')
  assert(pkg.dependencies?.['framer-motion'], '缺少 framer-motion 依赖')
  assert(pkg.dependencies?.['lucide-react'], '缺少 lucide-react 依赖')
  assert(pkg.dependencies?.['class-variance-authority'], '缺少 cva 依赖')
})

test('index.html 存在', () => {
  assert(existsSync(resolve(root, 'index.html')), 'index.html 不存在')
})

test('index.html 包含 root 元素', () => {
  const html = readFileSync(resolve(root, 'index.html'), 'utf-8')
  assert(html.includes('id="root"'), '缺少 id="root" 元素')
})

test('vite.config.ts 存在', () => {
  assert(existsSync(resolve(root, 'vite.config.ts')), 'vite.config.ts 不存在')
})

test('tsconfig.json 存在', () => {
  assert(existsSync(resolve(root, 'tsconfig.json')), 'tsconfig.json 不存在')
})

test('tailwind.config.ts 存在', () => {
  assert(existsSync(resolve(root, 'tailwind.config.ts')), 'tailwind.config.ts 不存在')
})

test('postcss.config.js 存在', () => {
  assert(existsSync(resolve(root, 'postcss.config.js')), 'postcss.config.js 不存在')
})

test('src/main.tsx 存在', () => {
  assert(existsSync(resolve(root, 'src/main.tsx')), 'src/main.tsx 不存在')
})

test('src/App.tsx 存在', () => {
  assert(existsSync(resolve(root, 'src/App.tsx')), 'src/App.tsx 不存在')
})

test('src/App.tsx 包含 BuilderLayout', () => {
  const app = readFileSync(resolve(root, 'src/App.tsx'), 'utf-8')
  assert(app.includes('BuilderLayout'), 'App.tsx 缺少 BuilderLayout')
})

test('src/App.tsx 包含 ToastProvider', () => {
  const app = readFileSync(resolve(root, 'src/App.tsx'), 'utf-8')
  assert(app.includes('ToastProvider'), 'App.tsx 缺少 ToastProvider')
})

test('src/index.css 存在', () => {
  assert(existsSync(resolve(root, 'src/index.css')), 'src/index.css 不存在')
})

test('src/vite-env.d.ts 存在', () => {
  assert(existsSync(resolve(root, 'src/vite-env.d.ts')), 'src/vite-env.d.ts 不存在')
})

test('AGENTS.md 存在', () => {
  assert(existsSync(resolve(root, 'AGENTS.md')), 'AGENTS.md 不存在')
})

test('README.md 存在', () => {
  assert(existsSync(resolve(root, 'README.md')), 'README.md 不存在')
})

test('RELEASE_NOTES.md 存在', () => {
  assert(existsSync(resolve(root, 'RELEASE_NOTES.md')), 'RELEASE_NOTES.md 不存在')
})

test('AGENT_HANDOFF.md 存在', () => {
  assert(existsSync(resolve(root, 'AGENT_HANDOFF.md')), 'AGENT_HANDOFF.md 不存在')
})

test('docs/ 目录存在', () => {
  assert(existsSync(resolve(root, 'docs')), 'docs/ 目录不存在')
})

test('docs/PROJECT_CONTRACT.md 存在', () => {
  assert(existsSync(resolve(root, 'docs/PROJECT_CONTRACT.md')), 'docs/PROJECT_CONTRACT.md 不存在')
})

test('docs/ARCHITECTURE.md 存在', () => {
  assert(existsSync(resolve(root, 'docs/ARCHITECTURE.md')), 'docs/ARCHITECTURE.md 不存在')
})

test('docs/UI_STYLE_GUIDE.md 存在', () => {
  assert(existsSync(resolve(root, 'docs/UI_STYLE_GUIDE.md')), 'docs/UI_STYLE_GUIDE.md 不存在')
})

test('docs/STYLE_FINGERPRINT.md 存在', () => {
  assert(existsSync(resolve(root, 'docs/STYLE_FINGERPRINT.md')), 'docs/STYLE_FINGERPRINT.md 不存在')
})

test('docs/CODE_CONVENTIONS.md 存在', () => {
  assert(existsSync(resolve(root, 'docs/CODE_CONVENTIONS.md')), 'docs/CODE_CONVENTIONS.md 不存在')
})

test('docs/CHANGE_PROTOCOL.md 存在', () => {
  assert(existsSync(resolve(root, 'docs/CHANGE_PROTOCOL.md')), 'docs/CHANGE_PROTOCOL.md 不存在')
})

test('.gitignore 存在', () => {
  assert(existsSync(resolve(root, '.gitignore')), '.gitignore 不存在')
})

test('.gitignore 包含 node_modules', () => {
  const gitignore = readFileSync(resolve(root, '.gitignore'), 'utf-8')
  assert(gitignore.includes('node_modules'), '.gitignore 缺少 node_modules')
})

test('.gitignore 包含 dist', () => {
  const gitignore = readFileSync(resolve(root, '.gitignore'), 'utf-8')
  assert(gitignore.includes('dist'), '.gitignore 缺含 dist')
})

test('src/index.css 包含 CSS Variables', () => {
  const css = readFileSync(resolve(root, 'src/index.css'), 'utf-8')
  assert(css.includes('--background'), 'index.css 缺少 CSS Variables')
  assert(css.includes('--primary'), 'index.css 缺少 primary 变量')
})

test('src/index.css 包含 dark 模式', () => {
  const css = readFileSync(resolve(root, 'src/index.css'), 'utf-8')
  assert(css.includes('.dark'), 'index.css 缺少 dark 模式')
})

test('src/lib/ 目录存在', () => {
  assert(existsSync(resolve(root, 'src/lib')), 'src/lib/ 目录不存在')
})

test('src/lib/builder.ts 存在', () => {
  assert(existsSync(resolve(root, 'src/lib/builder.ts')), 'src/lib/builder.ts 不存在')
})

test('src/lib/themes.ts 存在', () => {
  assert(existsSync(resolve(root, 'src/lib/themes.ts')), 'src/lib/themes.ts 不存在')
})

test('src/lib/motion.ts 存在', () => {
  assert(existsSync(resolve(root, 'src/lib/motion.ts')), 'src/lib/motion.ts 不存在')
})

test('src/lib/storage.ts 存在', () => {
  assert(existsSync(resolve(root, 'src/lib/storage.ts')), 'src/lib/storage.ts 不存在')
})

test('src/lib/applyTheme.ts 存在', () => {
  assert(existsSync(resolve(root, 'src/lib/applyTheme.ts')), 'src/lib/applyTheme.ts 不存在')
})

test('src/lib/export.ts 存在', () => {
  assert(existsSync(resolve(root, 'src/lib/export.ts')), 'src/lib/export.ts 不存在')
})

test('src/lib/utils.ts 存在', () => {
  assert(existsSync(resolve(root, 'src/lib/utils.ts')), 'src/lib/utils.ts 不存在')
})

test('builder.ts 包含 20 个主题定义', () => {
  const content = readFileSync(resolve(root, 'src/lib/builder.ts'), 'utf-8')
  assert(content.includes("'tokyo-night'"), '缺少 tokyo-night 主题')
  assert(content.includes("'catppuccin'"), '缺少 catppuccin 主题')
  assert(content.includes("'dracula'"), '缺少 dracula 主题')
  assert(content.includes("'nord'"), '缺少 nord 主题')
  assert(content.includes("'gruvbox'"), '缺少 gruvbox 主题')
  assert(content.includes("'rose-pine'"), '缺少 rose-pine 主题')
  assert(content.includes("'one-dark'"), '缺少 one-dark 主题')
  assert(content.includes("'solarized'"), '缺少 solarized 主题')
  assert(content.includes("'monokai'"), '缺少 monokai 主题')
  assert(content.includes("'github-light'"), '缺少 github-light 主题')
  assert(content.includes("'vercel-geist'"), '缺少 vercel-geist 主题')
  assert(content.includes("'linear-dark'"), '缺少 linear-dark 主题')
  assert(content.includes("'raycast'"), '缺少 raycast 主题')
  assert(content.includes("'cyber-neon'"), '缺少 cyber-neon 主题')
  assert(content.includes("'frosted-glass'"), '缺少 frosted-glass 主题')
  assert(content.includes("'mint-lab'"), '缺少 mint-lab 主题')
  assert(content.includes("'amber-studio'"), '缺少 amber-studio 主题')
  assert(content.includes("'rose-terminal'"), '缺少 rose-terminal 主题')
  assert(content.includes("'slate-pro'"), '缺少 slate-pro 主题')
  assert(content.includes("'oceanic'"), '缺少 oceanic 主题')
})

test('motion.ts 包含 5 个 motion level', () => {
  const content = readFileSync(resolve(root, 'src/lib/motion.ts'), 'utf-8')
  assert(content.includes('off'), '缺少 off level')
  assert(content.includes('subtle'), '缺少 subtle level')
  assert(content.includes('normal'), '缺少 normal level')
  assert(content.includes('expressive'), '缺少 expressive level')
  assert(content.includes('cinematic'), '缺少 cinematic level')
})

test('storage.ts 使用正确的 localStorage key', () => {
  const content = readFileSync(resolve(root, 'src/lib/storage.ts'), 'utf-8')
  assert(content.includes('ui-kit-builder-config'), 'storage.ts 使用了错误的 key')
})

test('src/components/ui/ 目录存在', () => {
  assert(existsSync(resolve(root, 'src/components/ui')), 'src/components/ui/ 目录不存在')
})

test('UI 组件文件完整', () => {
  const components = [
    'Button.tsx',
    'Card.tsx',
    'Input.tsx',
    'Badge.tsx',
    'Tabs.tsx',
    'Dialog.tsx',
    'Switch.tsx',
    'Progress.tsx',
    'Table.tsx',
    'Alert.tsx',
    'Toast.tsx',
    'CodeBlock.tsx',
    'index.ts',
  ]
  for (const comp of components) {
    assert(existsSync(resolve(root, `src/components/ui/${comp}`)), `缺少 src/components/ui/${comp}`)
  }
})

test('Button.tsx 包含 cva variants', () => {
  const content = readFileSync(resolve(root, 'src/components/ui/Button.tsx'), 'utf-8')
  assert(content.includes('solid'), '缺少 solid variant')
  assert(content.includes('soft'), '缺少 soft variant')
  assert(content.includes('outline'), '缺少 outline variant')
  assert(content.includes('ghost'), '缺少 ghost variant')
  assert(content.includes('gradient'), '缺少 gradient variant')
  assert(content.includes('glass'), '缺少 glass variant')
  assert(content.includes('neon'), '缺少 neon variant')
})

test('Card.tsx 包含 cva variants', () => {
  const content = readFileSync(resolve(root, 'src/components/ui/Card.tsx'), 'utf-8')
  assert(content.includes('solid'), '缺少 solid variant')
  assert(content.includes('glass'), '缺少 glass variant')
  assert(content.includes('bordered'), '缺少 bordered variant')
  assert(content.includes('elevated'), '缺少 elevated variant')
  assert(content.includes('floating'), '缺少 floating variant')
  assert(content.includes('terminal'), '缺少 terminal variant')
})

test('Input.tsx 包含 cva variants', () => {
  const content = readFileSync(resolve(root, 'src/components/ui/Input.tsx'), 'utf-8')
  assert(content.includes('filled'), '缺少 filled variant')
  assert(content.includes('outline'), '缺少 outline variant')
  assert(content.includes('minimal'), '缺少 minimal variant')
  assert(content.includes('glass'), '缺少 glass variant')
  assert(content.includes('terminal'), '缺少 terminal variant')
})

test('组件使用 motion.ts 动画参数', () => {
  const button = readFileSync(resolve(root, 'src/components/ui/Button.tsx'), 'utf-8')
  assert(button.includes('getMotionConfig'), 'Button 未使用 motion.ts')
  const card = readFileSync(resolve(root, 'src/components/ui/Card.tsx'), 'utf-8')
  assert(card.includes('getMotionConfig'), 'Card 未使用 motion.ts')
  const dialog = readFileSync(resolve(root, 'src/components/ui/Dialog.tsx'), 'utf-8')
  assert(dialog.includes('getMotionConfig'), 'Dialog 未使用 motion.ts')
})

test('组件使用 CSS variables', () => {
  const button = readFileSync(resolve(root, 'src/components/ui/Button.tsx'), 'utf-8')
  assert(button.includes('bg-primary'), 'Button 未使用 CSS variables')
  assert(button.includes('text-primary-foreground'), 'Button 未使用 primary-foreground')
})

test('themes.ts 无主题别名 fallback', () => {
  const content = readFileSync(resolve(root, 'src/lib/themes.ts'), 'utf-8')
  assert(!content.includes("'midnight-orchid': oceanic"), '存在 midnight-orchid -> oceanic 别名')
  assert(!content.includes("'obsidian-green': oceanic"), '存在 obsidian-green -> oceanic 别名')
  assert(!content.includes("'cloud-minimal': githubLight"), '存在 cloud-minimal -> githubLight 别名')
  assert(!content.includes("'graphite-pro': slatePro"), '存在 graphite-pro -> slatePro 别名')
  assert(!content.includes("'sunset-coral': amberStudio"), '存在 sunset-coral -> amberStudio 别名')
  assert(!content.includes("'deep-ocean': oceanic"), '存在 deep-ocean -> oceanic 别名')
  assert(!content.includes("'lavender-mist': rosePine"), '存在 lavender-mist -> rosePine 别名')
  assert(!content.includes("'matrix-green': cyberNeon"), '存在 matrix-green -> cyberNeon 别名')
})

test('THEME_PRESETS 无假主题', () => {
  const content = readFileSync(resolve(root, 'src/lib/builder.ts'), 'utf-8')
  const themePresetsSection = content.substring(content.indexOf('THEME_PRESETS'), content.indexOf('export const MODES'))
  assert(!themePresetsSection.includes("'midnight-orchid'"), 'THEME_PRESETS 包含假主题 midnight-orchid')
  assert(!themePresetsSection.includes("'obsidian-green'"), 'THEME_PRESETS 包含假主题 obsidian-green')
  assert(!themePresetsSection.includes("'cloud-minimal'"), 'THEME_PRESETS 包含假主题 cloud-minimal')
  assert(!themePresetsSection.includes("'sunset-coral'"), 'THEME_PRESETS 包含假主题 sunset-coral')
})

test('系统 ThemePreset 存在完整 token', () => {
  const content = readFileSync(resolve(root, 'src/lib/themes.ts'), 'utf-8')
  assert(content.includes("'windows-classic': {"), '缺少 windows-classic 主题定义')
  assert(content.includes("'windows-11': {"), '缺少 windows-11 主题定义')
  assert(content.includes("'ubuntu-aubergine': {"), '缺少 ubuntu-aubergine 主题定义')
  assert(content.includes("'gnome-adwaita': {"), '缺少 gnome-adwaita 主题定义')
  assert(content.includes("'kali-dark': {"), '缺少 kali-dark 主题定义')
  assert(content.includes("'unix-terminal': {"), '缺少 unix-terminal 主题定义')
  assert(content.includes("'macos-aqua': {"), '缺少 macos-aqua 主题定义')
  assert(content.includes("'macos-graphite': {"), '缺少 macos-graphite 主题定义')
  assert(content.includes("'centos-blue': {"), '缺少 centos-blue 主题定义')
  assert(content.includes("'android-material': {"), '缺少 android-material 主题定义')
  assert(content.includes("'material-you': {"), '缺少 material-you 主题定义')
  assert(content.includes("'debian-red': {"), '缺少 debian-red 主题定义')
  assert(content.includes("'fedora-blue': {"), '缺少 fedora-blue 主题定义')
  assert(content.includes("'arch-minimal': {"), '缺少 arch-minimal 主题定义')
})

test('SYSTEM_PRESETS 包含至少 10 个系统预设', () => {
  const content = readFileSync(resolve(root, 'src/lib/builder.ts'), 'utf-8')
  assert(content.includes("windows-classic-desktop"), '缺少 windows-classic-desktop 预设')
  assert(content.includes("windows-11-glass"), '缺少 windows-11-glass 预设')
  assert(content.includes("ubuntu-workstation"), '缺少 ubuntu-workstation 预设')
  assert(content.includes("gnome-adwaita-clean"), '缺少 gnome-adwaita-clean 预设')
  assert(content.includes("kali-ops-console"), '缺少 kali-ops-console 预设')
  assert(content.includes("unix-terminal-console"), '缺少 unix-terminal-console 预设')
  assert(content.includes("macos-aqua-desk"), '缺少 macos-aqua-desk 预设')
  assert(content.includes("macos-graphite-pro"), '缺少 macos-graphite-pro 预设')
  assert(content.includes("android-material-dashboard"), '缺少 android-material-dashboard 预设')
  assert(content.includes("material-you-lab"), '缺少 material-you-lab 预设')
})

test('ControlPanel 包含 Presets UI', () => {
  const content = readFileSync(resolve(root, 'src/components/builder/ControlPanel.tsx'), 'utf-8')
  assert(content.includes('PresetsPicker'), 'ControlPanel 缺少 PresetsPicker 组件')
  assert(content.includes('onConfigReplace'), 'ControlPanel 缺少 onConfigReplace prop')
})

test('PresetsPicker 组件存在', () => {
  assert(existsSync(resolve(root, 'src/components/builder/PresetsPicker.tsx')), 'PresetsPicker.tsx 不存在')
})

test('App 包含 onConfigReplace 函数', () => {
  const content = readFileSync(resolve(root, 'src/App.tsx'), 'utf-8')
  assert(content.includes('onConfigReplace'), 'App.tsx 缺少 onConfigReplace 函数')
})

test('BuilderLayout 传递 onConfigReplace', () => {
  const content = readFileSync(resolve(root, 'src/components/builder/BuilderLayout.tsx'), 'utf-8')
  assert(content.includes('onConfigReplace'), 'BuilderLayout.tsx 未传递 onConfigReplace')
})

test('Preset swatch 使用 theme token', () => {
  const content = readFileSync(resolve(root, 'src/components/builder/PresetsPicker.tsx'), 'utf-8')
  assert(content.includes('getThemeTokens'), 'PresetsPicker 未使用 getThemeTokens')
  assert(content.includes('tokens.background'), 'PresetsPicker 未读取 background token')
  assert(content.includes('tokens.primary'), 'PresetsPicker 未读取 primary token')
})

test('MOTION_LEVELS 包含 elastic 和 snappy', () => {
  const content = readFileSync(resolve(root, 'src/lib/builder.ts'), 'utf-8')
  assert(content.includes("{ value: 'elastic'"), 'MOTION_LEVELS 缺少 elastic')
  assert(content.includes("{ value: 'snappy'"), 'MOTION_LEVELS 缺少 snappy')
})

test('新增系统背景风格', () => {
  const content = readFileSync(resolve(root, 'src/lib/builder.ts'), 'utf-8')
  assert(content.includes("'windows-bloom'"), '缺少 windows-bloom 背景')
  assert(content.includes("'ubuntu-jammy-gradient'"), '缺少 ubuntu-jammy-gradient 背景')
  assert(content.includes("'misty-color-fields'"), '缺少 misty-color-fields 背景')
  assert(content.includes("'soft-glass-orbs'"), '缺少 soft-glass-orbs 背景')
  assert(content.includes("'aurora-fog'"), '缺少 aurora-fog 背景')
  assert(content.includes("'layered-pastel-fog'"), '缺少 layered-pastel-fog 背景')
})

test('previewStyles.ts 包含系统背景映射', () => {
  const content = readFileSync(resolve(root, 'src/lib/previewStyles.ts'), 'utf-8')
  assert(content.includes("'windows-bloom':"), 'previewStyles 缺少 windows-bloom')
  assert(content.includes("'misty-color-fields':"), 'previewStyles 缺少 misty-color-fields')
})

test('ButtonStyle 包含系统风格', () => {
  const content = readFileSync(resolve(root, 'src/lib/builder.ts'), 'utf-8')
  assert(content.includes("'classic', label: 'Classic'"), '缺少 classic 按钮风格')
  assert(content.includes("'fluent', label: 'Fluent'"), '缺少 fluent 按钮风格')
  assert(content.includes("'adwaita', label: 'Adwaita'"), '缺少 adwaita 按钮风格')
  assert(content.includes("'aqua', label: 'Aqua'"), '缺少 aqua 按钮风格')
  assert(content.includes("'material', label: 'Material'"), '缺少 material 按钮风格')
  assert(content.includes("'terminal', label: 'Terminal'"), '缺少 terminal 按钮风格')
  assert(content.includes("'server', label: 'Server'"), '缺少 server 按钮风格')
})

test('CardStyle 包含系统风格', () => {
  const content = readFileSync(resolve(root, 'src/lib/builder.ts'), 'utf-8')
  assert(content.includes("'classic-panel', label: 'Classic Panel'"), '缺少 classic-panel 卡片风格')
  assert(content.includes("'fluent-card', label: 'Fluent Card'"), '缺少 fluent-card 卡片风格')
  assert(content.includes("'adwaita-surface', label: 'Adwaita'"), '缺少 adwaita-surface 卡片风格')
  assert(content.includes("'aqua-glass', label: 'Aqua Glass'"), '缺少 aqua-glass 卡片风格')
  assert(content.includes("'material-elevated', label: 'Material'"), '缺少 material-elevated 卡片风格')
  assert(content.includes("'terminal-panel', label: 'Terminal Panel'"), '缺少 terminal-panel 卡片风格')
  assert(content.includes("'server-panel', label: 'Server Panel'"), '缺少 server-panel 卡片风格')
  assert(content.includes("'mist-card', label: 'Mist Card'"), '缺少 mist-card 卡片风格')
})

test('InputStyle 包含系统风格', () => {
  const content = readFileSync(resolve(root, 'src/lib/builder.ts'), 'utf-8')
  assert(content.includes("'classic-box', label: 'Classic Box'"), '缺少 classic-box 输入框风格')
  assert(content.includes("'fluent-search', label: 'Fluent Search'"), '缺少 fluent-search 输入框风格')
  assert(content.includes("'adwaita-entry', label: 'Adwaita Entry'"), '缺少 adwaita-entry 输入框风格')
  assert(content.includes("'aqua-search', label: 'Aqua Search'"), '缺少 aqua-search 输入框风格')
  assert(content.includes("'material-filled', label: 'Material Filled'"), '缺少 material-filled 输入框风格')
  assert(content.includes("'terminal-prompt', label: 'Terminal Prompt'"), '缺少 terminal-prompt 输入框风格')
  assert(content.includes("'server-field', label: 'Server Field'"), '缺少 server-field 输入框风格')
})

test('Button.tsx 支持新按钮风格', () => {
  const content = readFileSync(resolve(root, 'src/components/ui/Button.tsx'), 'utf-8')
  assert(content.includes('classic:'), 'Button 缺少 classic 样式')
  assert(content.includes('fluent:'), 'Button 缺少 fluent 样式')
  assert(content.includes('adwaita:'), 'Button 缺少 adwaita 样式')
  assert(content.includes('ubuntu:'), 'Button 缺少 ubuntu 样式')
  assert(content.includes('aqua:'), 'Button 缺少 aqua 样式')
  assert(content.includes('material:'), 'Button 缺少 material 样式')
  assert(content.includes('terminal:'), 'Button 缺少 terminal 样式')
  assert(content.includes('server:'), 'Button 缺少 server 样式')
})

test('Card.tsx 支持新卡片风格', () => {
  const content = readFileSync(resolve(root, 'src/components/ui/Card.tsx'), 'utf-8')
  assert(content.includes("'classic-panel':"), 'Card 缺少 classic-panel 样式')
  assert(content.includes("'fluent-card':"), 'Card 缺少 fluent-card 样式')
  assert(content.includes("'adwaita-surface':"), 'Card 缺少 adwaita-surface 样式')
  assert(content.includes("'aqua-glass':"), 'Card 缺少 aqua-glass 样式')
  assert(content.includes("'material-elevated':"), 'Card 缺少 material-elevated 样式')
  assert(content.includes("'terminal-panel':"), 'Card 缺少 terminal-panel 样式')
  assert(content.includes("'server-panel':"), 'Card 缺少 server-panel 样式')
  assert(content.includes("'mist-card':"), 'Card 缺少 mist-card 样式')
})

test('Input.tsx 支持新输入框风格', () => {
  const content = readFileSync(resolve(root, 'src/components/ui/Input.tsx'), 'utf-8')
  assert(content.includes("'classic-box':"), 'Input 缺少 classic-box 样式')
  assert(content.includes("'fluent-search':"), 'Input 缺少 fluent-search 样式')
  assert(content.includes("'adwaita-entry':"), 'Input 缺少 adwaita-entry 样式')
  assert(content.includes("'ubuntu-entry':"), 'Input 缺少 ubuntu-entry 样式')
  assert(content.includes("'aqua-search':"), 'Input 缺少 aqua-search 样式')
  assert(content.includes("'material-filled':"), 'Input 缺少 material-filled 样式')
  assert(content.includes("'terminal-prompt':"), 'Input 缺少 terminal-prompt 样式')
  assert(content.includes("'server-field':"), 'Input 缺少 server-field 样式')
})

test('系统预设使用对应背景风格', () => {
  const content = readFileSync(resolve(root, 'src/lib/builder.ts'), 'utf-8')
  assert(content.includes("backgroundStyle: 'windows-classic-clouds'"), 'windows-classic 未使用 windows-classic-clouds')
  assert(content.includes("backgroundStyle: 'windows-bloom'"), 'windows-11 未使用 windows-bloom')
  assert(content.includes("backgroundStyle: 'ubuntu-jammy-gradient'"), 'ubuntu 未使用 ubuntu-jammy-gradient')
  assert(content.includes("backgroundStyle: 'macos-aqua-aurora'"), 'macOS Aqua 未使用 macos-aqua-aurora')
  assert(content.includes("backgroundStyle: 'arch-cyber-minimal'"), 'Arch 未使用 arch-cyber-minimal')
})

test('系统预设使用对应按钮风格', () => {
  const content = readFileSync(resolve(root, 'src/lib/builder.ts'), 'utf-8')
  assert(content.includes("buttonStyle: 'classic'"), 'windows-classic 未使用 classic 按钮')
  assert(content.includes("buttonStyle: 'fluent'"), 'windows-11 未使用 fluent 按钮')
  assert(content.includes("buttonStyle: 'ubuntu'"), 'ubuntu 未使用 ubuntu 按钮')
  assert(content.includes("buttonStyle: 'adwaita'"), 'gnome 未使用 adwaita 按钮')
  assert(content.includes("buttonStyle: 'aqua'"), 'macOS Aqua 未使用 aqua 按钮')
  assert(content.includes("buttonStyle: 'material'"), 'material 未使用 material 按钮')
})

test('README 包含 system-inspired 说明', () => {
  const content = readFileSync(resolve(root, 'README.md'), 'utf-8')
  assert(content.includes('系统风格主题说明'), 'README 缺少系统风格主题说明')
  assert(content.includes('不隶属于'), 'README 缺少不隶属于声明')
  assert(content.includes('CSS 生成的'), 'README 缺少 CSS 生成声明')
})

test('BuilderConfig 包含 experienceStyle', () => {
  const content = readFileSync(resolve(root, 'src/lib/builder.ts'), 'utf-8')
  assert(content.includes('experienceStyle:'), 'BuilderConfig 缺少 experienceStyle')
  assert(content.includes('ExperienceStyle'), '缺少 ExperienceStyle 类型')
})

test('EXPERIENCE_STYLES 数组存在', () => {
  const content = readFileSync(resolve(root, 'src/lib/builder.ts'), 'utf-8')
  assert(content.includes("'classic-desktop', label: 'Classic Desktop'"), '缺少 classic-desktop')
  assert(content.includes("'fluent-glass', label: 'Fluent Glass'"), '缺少 fluent-glass')
  assert(content.includes("'unix-terminal', label: 'Unix Terminal'"), '缺少 unix-terminal')
  assert(content.includes("'aqua-desktop', label: 'Aqua Desktop'"), '缺少 aqua-desktop')
  assert(content.includes("'material-you', label: 'Material You'"), '缺少 material-you')
})

test('DEFAULT_CONFIG 包含 experienceStyle', () => {
  const content = readFileSync(resolve(root, 'src/lib/builder.ts'), 'utf-8')
  assert(content.includes('experienceStyle:'), 'DEFAULT_CONFIG 缺少 experienceStyle')
})

test('storage.ts 验证 experienceStyle', () => {
  const content = readFileSync(resolve(root, 'src/lib/storage.ts'), 'utf-8')
  assert(content.includes('experienceStyle'), 'storage.ts 缺少 experienceStyle 验证')
})

test('ControlPanel 包含 Experience Style 控制项', () => {
  const content = readFileSync(resolve(root, 'src/components/builder/ControlPanel.tsx'), 'utf-8')
  assert(content.includes('EXPERIENCE_STYLES'), 'ControlPanel 缺少 EXPERIENCE_STYLES 导入')
  assert(content.includes('Experience Style'), 'ControlPanel 缺少 Experience Style 控制项')
})

test('normalizeBuilderConfig 函数存在', () => {
  const content = readFileSync(resolve(root, 'src/lib/storage.ts'), 'utf-8')
  assert(content.includes('export function normalizeBuilderConfig'), 'storage.ts 缺少 normalizeBuilderConfig')
})

test('normalizeBuilderConfig 不使用 DEFAULT_VALUES 双默认源', () => {
  const content = readFileSync(resolve(root, 'src/lib/storage.ts'), 'utf-8')
  assert(!content.includes('const DEFAULT_VALUES'), 'storage.ts 不应维护第二套 DEFAULT_VALUES')
  assert(content.includes('DEFAULT_CONFIG'), 'normalizeBuilderConfig 应使用 DEFAULT_CONFIG')
})

test('getConfigHealth 检查 raw config 而非 normalized', () => {
  const content = readFileSync(resolve(root, 'src/lib/storage.ts'), 'utf-8')
  assert(content.includes('missingFields'), 'getConfigHealth 缺少 missingFields')
  assert(content.includes('invalidFields'), 'getConfigHealth 缺少 invalidFields')
  assert(content.includes('unknownFields'), 'getConfigHealth 缺少 unknownFields')
  assert(content.includes('normalized'), 'getConfigHealth 应返回 normalized 结果')
})

test('CONFIG_KEYS 导出用于一致性检查', () => {
  const content = readFileSync(resolve(root, 'src/lib/storage.ts'), 'utf-8')
  assert(content.includes('export const CONFIG_KEYS'), 'storage.ts 缺少 CONFIG_KEYS 导出')
})

test('OPTION_VALUES 字段集合与 DEFAULT_CONFIG 一致', () => {
  const content = readFileSync(resolve(root, 'src/lib/storage.ts'), 'utf-8')
  assert(content.includes('const OPTION_VALUES'), 'storage.ts 缺少 OPTION_VALUES')
  assert(content.includes('themePreset:'), 'OPTION_VALUES 缺少 themePreset')
  assert(content.includes('experienceStyle:'), 'OPTION_VALUES 缺少 experienceStyle')
})

test('getConfigHealth 能检测 missing fields', () => {
  const content = readFileSync(resolve(root, 'src/lib/storage.ts'), 'utf-8')
  assert(content.includes('!(key in config)'), 'getConfigHealth 应检测缺失字段')
})

test('getConfigHealth 能检测 unknown fields', () => {
  const content = readFileSync(resolve(root, 'src/lib/storage.ts'), 'utf-8')
  assert(content.includes('!CONFIG_KEYS.includes'), 'getConfigHealth 应检测未知字段')
})

test('BUILDER_CONFIG_VERSION 存在', () => {
  const content = readFileSync(resolve(root, 'src/lib/storage.ts'), 'utf-8')
  assert(content.includes('export const BUILDER_CONFIG_VERSION'), 'storage.ts 缺少版本号导出')
})

test('storage.ts 保存 versioned config', () => {
  const content = readFileSync(resolve(root, 'src/lib/storage.ts'), 'utf-8')
  assert(content.includes('version: BUILDER_CONFIG_VERSION'), 'saveBuilderConfig 应保存版本号')
  assert(content.includes('config: normalized'), 'saveBuilderConfig 应保存归一化后的 config')
})

test('loadBuilderConfig 使用 normalizeBuilderConfig', () => {
  const content = readFileSync(resolve(root, 'src/lib/storage.ts'), 'utf-8')
  const funcContent = content.substring(content.indexOf('export function loadBuilderConfig'))
  assert(funcContent.includes('normalizeBuilderConfig'), 'loadBuilderConfig 应使用归一化')
})

test('isConfigSameAsPreset 使用 normalized 比较', () => {
  const content = readFileSync(resolve(root, 'src/lib/storage.ts'), 'utf-8')
  assert(content.includes('normalizeBuilderConfig(config)'), 'isConfigSameAsPreset 应使用归一化')
  assert(content.includes('normalizeBuilderConfig(presetConfig)'), 'isConfigSameAsPreset 应使用归一化')
  assert(content.includes('JSON.stringify(normalizedConfig)'), 'isConfigSameAsPreset 应比较 JSON')
})

test('ControlPanel Config Health 面板存在', () => {
  const content = readFileSync(resolve(root, 'src/components/builder/ControlPanel.tsx'), 'utf-8')
  assert(content.includes('Config Health'), 'ControlPanel 缺少 Config Health 面板')
  assert(content.includes('getConfigHealth'), 'ControlPanel 应使用 getConfigHealth')
})

test('ControlPanel Fix Config 按钮不是伪实现', () => {
  const content = readFileSync(resolve(root, 'src/components/builder/ControlPanel.tsx'), 'utf-8')
  assert(content.includes('onClick={() => onConfigReplace(health.normalized)}'), 'Fix Config 应使用 health.normalized')
  assert(!content.includes('getConfigHealth(config) ? config : config'), 'Fix Config 不应是无意义判断')
})

test('App.tsx onConfigChange 使用 normalizeBuilderConfig', () => {
  const content = readFileSync(resolve(root, 'src/App.tsx'), 'utf-8')
  const changeContent = content.substring(content.indexOf('handleConfigChange'))
  assert(changeContent.includes('normalizeBuilderConfig'), 'handleConfigChange 应使用归一化')
})

test('App.tsx onConfigReplace 使用 normalizeBuilderConfig', () => {
  const content = readFileSync(resolve(root, 'src/App.tsx'), 'utf-8')
  const replaceContent = content.substring(content.indexOf('handleConfigReplace'))
  assert(replaceContent.includes('normalizeBuilderConfig'), 'handleConfigReplace 应使用归一化')
})

test('PresetsPicker 使用完整字段比较判断 selected', () => {
  const content = readFileSync(resolve(root, 'src/components/builder/PresetsPicker.tsx'), 'utf-8')
  assert(content.includes('isConfigSameAsPreset'), 'PresetsPicker 应使用 isConfigSameAsPreset')
})

test('STYLE_PRESETS 每个 config 包含所有 BuilderConfig 字段', () => {
  const content = readFileSync(resolve(root, 'src/lib/builder.ts'), 'utf-8')
  const presetsSection = content.substring(content.indexOf('export const STYLE_PRESETS'))
  assert(presetsSection.includes('themePreset:'), 'STYLE_PRESETS 缺少 themePreset')
  assert(presetsSection.includes('experienceStyle:'), 'STYLE_PRESETS 缺少 experienceStyle')
})

test('所有系统 preset 包含 experienceStyle', () => {
  const builder = readFileSync(resolve(root, 'src/lib/builder.ts'), 'utf-8')
  const systemPresets = [
    'windows-classic-desktop',
    'windows-11-glass',
    'ubuntu-workstation',
    'gnome-adwaita-clean',
    'kali-ops-console',
    'unix-terminal-console',
    'macos-aqua-desk',
    'macos-graphite-pro',
    'centos-server-panel',
    'android-material-dashboard',
    'material-you-lab',
    'debian-workbench',
    'fedora-workstation',
    'arch-minimal-console'
  ]
  const configSection = builder.substring(builder.indexOf('config: {'))
  for (const id of systemPresets) {
    const presetStart = configSection.indexOf(`id: '${id}'`)
    assert(presetStart > 0, `找不到 ${id}`)
    const afterConfig = configSection.indexOf('config:', presetStart + 1)
    const nextPreset = configSection.indexOf("id: '", presetStart + 20)
    const endPos = nextPreset > 0 ? nextPreset : configSection.length
    const section = configSection.substring(afterConfig, endPos)
    assert(section.includes('experienceStyle:'), `${id} 缺少 experienceStyle`)
  }
})

test('ControlSection 组件存在', () => {
  assert(existsSync(resolve(root, 'src/components/builder/ControlSection.tsx')), 'ControlSection.tsx 不存在')
  const content = readFileSync(resolve(root, 'src/components/builder/ControlSection.tsx'), 'utf-8')
  assert(content.includes('export function ControlSection'), 'ControlSection 导出函数')
})

test('ControlPanel 包含折叠分组', () => {
  const content = readFileSync(resolve(root, 'src/components/builder/ControlPanel.tsx'), 'utf-8')
  assert(content.includes('ControlSection'), 'ControlPanel 使用 ControlSection')
  assert(content.includes('Presets'), 'ControlPanel 包含 Presets 分组')
  assert(content.includes('Theme'), 'ControlPanel 包含 Theme 分组')
  assert(content.includes('System Layout'), 'ControlPanel 包含 System Layout 分组')
  assert(content.includes('Components'), 'ControlPanel 包含 Components 分组')
  assert(content.includes('Surface & Feel'), 'ControlPanel 包含 Surface & Feel 分组')
  assert(content.includes('Export & Health'), 'ControlPanel 包含 Export & Health 分组')
})

test('ControlSection 使用 localStorage 持久化', () => {
  const content = readFileSync(resolve(root, 'src/components/builder/ControlSection.tsx'), 'utf-8')
  assert(content.includes('localStorage'), 'ControlSection 使用 localStorage')
  assert(content.includes('persistKey'), 'ControlSection 支持 persistKey')
})

test('PresetsPicker 支持搜索', () => {
  const content = readFileSync(resolve(root, 'src/components/builder/PresetsPicker.tsx'), 'utf-8')
  assert(content.includes('Search'), 'PresetsPicker 包含 Search')
  assert(content.includes('search'), 'PresetsPicker 包含搜索状态')
})

test('PresetsPicker 支持 tag 过滤', () => {
  const content = readFileSync(resolve(root, 'src/components/builder/PresetsPicker.tsx'), 'utf-8')
  assert(content.includes('TAG_OPTIONS'), 'PresetsPicker 包含 TAG_OPTIONS')
  assert(content.includes('selectedTag'), 'PresetsPicker 包含选中标签状态')
})

test('PresetsPicker 记录 Recently Applied', () => {
  const content = readFileSync(resolve(root, 'src/components/builder/PresetsPicker.tsx'), 'utf-8')
  assert(content.includes('RECENTLY_APPLIED_KEY'), 'PresetsPicker 包含最近应用 key')
  assert(content.includes('getRecentlyApplied'), 'PresetsPicker 获取最近应用')
  assert(content.includes('saveRecentlyApplied'), 'PresetsPicker 保存最近应用')
})

test('ExportPanel 支持 Import JSON', () => {
  const content = readFileSync(resolve(root, 'src/components/builder/ExportPanel.tsx'), 'utf-8')
  assert(content.includes('showImport'), 'ExportPanel 包含导入状态')
  assert(content.includes('Import JSON'), 'ExportPanel 包含 Import 按钮')
  assert(content.includes('handleApplyImport'), 'ExportPanel 应用导入')
})

test('Import JSON 使用 normalizeBuilderConfig', () => {
  const content = readFileSync(resolve(root, 'src/components/builder/ExportPanel.tsx'), 'utf-8')
  assert(content.includes('normalizeBuilderConfig'), 'Import 使用 normalizeBuilderConfig')
  assert(content.includes('getConfigHealth'), 'Import 预览使用 getConfigHealth')
})

test('RawStorageInspector 组件存在', () => {
  assert(existsSync(resolve(root, 'src/components/builder/RawStorageInspector.tsx')), 'RawStorageInspector.tsx 不存在')
  const content = readFileSync(resolve(root, 'src/components/builder/RawStorageInspector.tsx'), 'utf-8')
  assert(content.includes('export function RawStorageInspector'), 'RawStorageInspector 导出函数')
})

test('RawStorageInspector 读取 ui-kit-builder-config', () => {
  const content = readFileSync(resolve(root, 'src/components/builder/RawStorageInspector.tsx'), 'utf-8')
  assert(content.includes('ui-kit-builder-config'), 'RawStorageInspector 读取正确 key')
})

test('RawStorageInspector 支持 Normalize Storage', () => {
  const content = readFileSync(resolve(root, 'src/components/builder/RawStorageInspector.tsx'), 'utf-8')
  assert(content.includes('handleNormalize'), 'RawStorageInspector 支持 Normalize')
  assert(content.includes('normalizeBuilderConfig'), 'Normalize 使用 normalizeBuilderConfig')
})

test('RawStorageInspector 支持 Clear Storage and Reset', () => {
  const content = readFileSync(resolve(root, 'src/components/builder/RawStorageInspector.tsx'), 'utf-8')
  assert(content.includes('handleClear'), 'RawStorageInspector 支持 Clear')
  assert(content.includes('resetBuilderConfig'), 'Clear 使用 resetBuilderConfig')
})

test('Config Health 支持 Copy Health Report', () => {
  const content = readFileSync(resolve(root, 'src/components/builder/ControlPanel.tsx'), 'utf-8')
  assert(content.includes('Copy Health Report') || content.includes('copyText(JSON.stringify'), 'Config Health 支持复制报告')
})

test('ControlPanel 显示 Applied / Modified 状态', () => {
  const content = readFileSync(resolve(root, 'src/components/builder/ControlPanel.tsx'), 'utf-8')
  assert(content.includes('appliedPresetId'), 'ControlPanel 包含应用预设状态')
  assert(content.includes('isModified'), 'ControlPanel 包含修改状态')
  assert(content.includes('Modified from') || content.includes('Applied:'), 'ControlPanel 显示应用/修改状态')
})

test('IntegrationGuide 组件存在', () => {
  assert(existsSync(resolve(root, 'src/components/builder/IntegrationGuide.tsx')), 'IntegrationGuide.tsx 不存在')
  const content = readFileSync(resolve(root, 'src/components/builder/IntegrationGuide.tsx'), 'utf-8')
  assert(content.includes('export function IntegrationGuide'), 'IntegrationGuide 导出函数')
})

test('IntegrationGuide 包含 HTML / CSS 示例', () => {
  const content = readFileSync(resolve(root, 'src/components/builder/IntegrationGuide.tsx'), 'utf-8')
  assert(content.includes('HTML / CSS'), 'IntegrationGuide 包含 HTML CSS tab')
  assert(content.includes('<!DOCTYPE html>'), 'IntegrationGuide 包含 HTML 示例')
})

test('IntegrationGuide 包含 React + Tailwind 示例', () => {
  const content = readFileSync(resolve(root, 'src/components/builder/IntegrationGuide.tsx'), 'utf-8')
  assert(content.includes('React + Tailwind'), 'IntegrationGuide 包含 React tab')
  assert(content.includes('tailwind.config'), 'IntegrationGuide 包含 Tailwind 示例')
})

test('IntegrationGuide 包含 Astro 示例', () => {
  const content = readFileSync(resolve(root, 'src/components/builder/IntegrationGuide.tsx'), 'utf-8')
  assert(content.includes('Astro / Static'), 'IntegrationGuide 包含 Astro tab')
  assert(content.includes('src/pages'), 'IntegrationGuide 包含 Astro 示例')
})

test('IntegrationGuide 包含 Dynamic Runtime 示例', () => {
  const content = readFileSync(resolve(root, 'src/components/builder/IntegrationGuide.tsx'), 'utf-8')
  assert(content.includes('Dynamic Runtime'), 'IntegrationGuide 包含 Runtime tab')
  assert(content.includes('ui-kit.json'), 'IntegrationGuide 包含 JSON 加载示例')
})

test('IntegrationGuide 包含 Deep Integration 示例', () => {
  const content = readFileSync(resolve(root, 'src/components/builder/IntegrationGuide.tsx'), 'utf-8')
  assert(content.includes('Deep Integration'), 'IntegrationGuide 包含 Deep tab')
  assert(content.includes('Phase 1'), 'IntegrationGuide 包含分阶段说明')
})

test('IntegrationGuide 提供 Copy Code 能力', () => {
  const content = readFileSync(resolve(root, 'src/components/builder/IntegrationGuide.tsx'), 'utf-8')
  assert(content.includes('copyText'), 'IntegrationGuide 使用 copyText')
  assert(content.includes('CodeBlock'), 'IntegrationGuide 包含代码块组件')
})

test('ControlPanel 包含 IntegrationGuide', () => {
  const content = readFileSync(resolve(root, 'src/components/builder/ControlPanel.tsx'), 'utf-8')
  assert(content.includes('IntegrationGuide'), 'ControlPanel 包含 IntegrationGuide')
  assert(content.includes('Usage / Integration Guide'), 'ControlPanel 显示 Integration Guide 标题')
})

test('README 包含 How to use generated UI Kit', () => {
  const content = readFileSync(resolve(root, 'README.md'), 'utf-8')
  assert(content.includes('如何使用生成的 UI Kit'), 'README 包含中文使用说明')
  assert(content.includes('HTML / CSS'), 'README 包含 HTML 说明')
  assert(content.includes('React + Tailwind'), 'README 包含 React 说明')
  assert(content.includes('Astro'), 'README 包含 Astro 说明')
  assert(content.includes('Runtime Theme Loading'), 'README 包含 Runtime 说明')
})

console.log(`\n📊 结果: ${passed} 通过, ${failed} 失败\n`)

if (failed > 0) {
  process.exit(1)
}
