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

console.log(`\n📊 结果: ${passed} 通过, ${failed} 失败\n`)

if (failed > 0) {
  process.exit(1)
}
