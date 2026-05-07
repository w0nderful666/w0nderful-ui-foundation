#!/usr/bin/env node

/**
 * preflight.mjs - 预检脚本
 * 
 * 运行前确保项目环境正常
 */

import { existsSync } from 'fs'
import { readFileSync } from 'fs'
import { join } from 'path'

const projectRoot = process.cwd()

console.log('Running preflight checks...\n')

let warnings = []
let errors = []

// 检查 package.json
try {
  const packageJsonPath = join(projectRoot, 'package.json')
  if (!existsSync(packageJsonPath)) {
    errors.push('package.json not found')
  } else {
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'))
    
    // 检查必要的 scripts
    if (!packageJson.scripts?.build) {
      warnings.push('package.json: missing build script')
    }
    if (!packageJson.scripts?.dev) {
      warnings.push('package.json: missing dev script')
    }
    if (!packageJson.scripts?.check) {
      warnings.push('package.json: missing check script')
    }
  }
} catch (error) {
  errors.push(`package.json: ${error.message}`)
}

// 检查 AGENTS.md
if (!existsSync(join(projectRoot, 'AGENTS.md'))) {
  warnings.push('AGENTS.md not found - consider adding project rules')
}

// 检查 docs/
if (!existsSync(join(projectRoot, 'docs'))) {
  warnings.push('docs/ directory not found')
}

// 检查 src/
if (!existsSync(join(projectRoot, 'src'))) {
  errors.push('src/ directory not found')
}

// 检查 index.html
if (!existsSync(join(projectRoot, 'index.html'))) {
  warnings.push('index.html not found')
}

console.log('--- Warnings ---')
if (warnings.length === 0) {
  console.log('No warnings')
} else {
  warnings.forEach(w => console.log(`⚠ ${w}`))
}

console.log('\n--- Errors ---')
if (errors.length === 0) {
  console.log('No errors')
} else {
  errors.forEach(e => console.log(`✗ ${e}`))
}

console.log('\n--- Summary ---')
console.log(`Warnings: ${warnings.length}`)
console.log(`Errors: ${errors.length}`)

if (errors.length > 0) {
  console.log('\nPreflight FAILED')
  process.exit(1)
} else if (warnings.length > 0) {
  console.log('\nPreflight PASSED with warnings')
  process.exit(0)
} else {
  console.log('\nPreflight PASSED')
  process.exit(0)
}