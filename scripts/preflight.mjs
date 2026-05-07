import { readFileSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

let passed = 0
let failed = 0
const warnings = []

function check(name, fn) {
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

function warn(name, message) {
  warnings.push(`${name}: ${message}`)
}

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

console.log('\n🔍 Preflight Check\n')

console.log('📁 文件完整性')
check('package.json 存在', () => {
  assert(existsSync(resolve(root, 'package.json')), '文件不存在')
})

check('vite.config.ts 存在', () => {
  assert(existsSync(resolve(root, 'vite.config.ts')), '文件不存在')
})

check('tsconfig.json 存在', () => {
  assert(existsSync(resolve(root, 'tsconfig.json')), '文件不存在')
})

check('src/main.tsx 存在', () => {
  assert(existsSync(resolve(root, 'src/main.tsx')), '文件不存在')
})

check('src/App.tsx 存在', () => {
  assert(existsSync(resolve(root, 'src/App.tsx')), '文件不存在')
})

check('src/index.css 存在', () => {
  assert(existsSync(resolve(root, 'src/index.css')), '文件不存在')
})

console.log('\n📦 依赖配置')
check('package.json 格式正确', () => {
  const pkg = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf-8'))
  assert(pkg.name === 'web-os-ui-kit-builder', '项目名不正确')
  assert(pkg.version, '缺少版本号')
})

check('必要依赖存在', () => {
  const pkg = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf-8'))
  assert(pkg.dependencies?.react, '缺少 react')
  assert(pkg.dependencies?.['react-dom'], '缺少 react-dom')
  assert(pkg.dependencies?.['framer-motion'], '缺少 framer-motion')
  assert(pkg.dependencies?.['class-variance-authority'], '缺少 cva')
  assert(pkg.dependencies?.['lucide-react'], '缺少 lucide-react')
})

console.log('\n⚙️ 构建配置')
check('Vite 配置正确', () => {
  const config = readFileSync(resolve(root, 'vite.config.ts'), 'utf-8')
  assert(config.includes('defineConfig'), '缺少 defineConfig')
  assert(config.includes('react()'), '缺少 React 插件')
})

check('TypeScript 配置正确', () => {
  const config = JSON.parse(readFileSync(resolve(root, 'tsconfig.json'), 'utf-8'))
  assert(config.compilerOptions?.strict, '未启用严格模式')
  assert(config.compilerOptions?.jsx === 'react-jsx', 'JSX 配置不正确')
})

check('Tailwind 配置正确', () => {
  const config = readFileSync(resolve(root, 'tailwind.config.ts'), 'utf-8')
  assert(config.includes('content'), '缺少 content 配置')
})

console.log('\n📄 文档完整性')
check('AGENTS.md 存在', () => {
  assert(existsSync(resolve(root, 'AGENTS.md')), '文件不存在')
})

check('README.md 存在', () => {
  assert(existsSync(resolve(root, 'README.md')), '文件不存在')
})

check('RELEASE_NOTES.md 存在', () => {
  assert(existsSync(resolve(root, 'RELEASE_NOTES.md')), '文件不存在')
})

check('AGENT_HANDOFF.md 存在', () => {
  assert(existsSync(resolve(root, 'AGENT_HANDOFF.md')), '文件不存在')
})

check('docs/ 目录存在', () => {
  assert(existsSync(resolve(root, 'docs')), '目录不存在')
})

check('docs/ 标准文档完整', () => {
  const docs = [
    'PROJECT_CONTRACT.md',
    'ARCHITECTURE.md',
    'UI_STYLE_GUIDE.md',
    'STYLE_FINGERPRINT.md',
    'CODE_CONVENTIONS.md',
    'CHANGE_PROTOCOL.md',
  ]
  for (const doc of docs) {
    assert(existsSync(resolve(root, 'docs', doc)), `缺少 docs/${doc}`)
  }
})

console.log('\n🧪 测试脚本')
check('scripts/self-test.mjs 存在', () => {
  assert(existsSync(resolve(root, 'scripts/self-test.mjs')), '文件不存在')
})

check('scripts/preflight.mjs 存在', () => {
  assert(existsSync(resolve(root, 'scripts/preflight.mjs')), '文件不存在')
})

console.log('\n🔒 安全检查')
check('无硬编码密钥', () => {
  const files = ['src/App.tsx', 'src/main.tsx']
  for (const file of files) {
    if (existsSync(resolve(root, file))) {
      const content = readFileSync(resolve(root, file), 'utf-8')
      assert(!content.includes('API_KEY'), `${file} 可能包含硬编码密钥`)
      assert(!content.includes('SECRET'), `${file} 可能包含硬编码密钥`)
    }
  }
})

check('.gitignore 包含必要条目', () => {
  const gitignore = readFileSync(resolve(root, '.gitignore'), 'utf-8')
  assert(gitignore.includes('node_modules'), '缺少 node_modules')
  assert(gitignore.includes('dist'), '缺少 dist')
})

console.log('\n' + '='.repeat(50))
console.log(`\n📊 结果: ${passed} 通过, ${failed} 失败`)

if (warnings.length > 0) {
  console.log(`\n⚠️ 警告: ${warnings.length}`)
  warnings.forEach(w => console.log(`  - ${w}`))
}

console.log('')

if (failed > 0) {
  process.exit(1)
}
