#!/usr/bin/env node

/**
 * self-test.mjs - 项目自测脚本
 * 
 * 运行基本检查确保项目可用
 */

import { existsSync } from 'fs'
import { join } from 'path'

const projectRoot = join(process.cwd())

const checks = [
  {
    name: 'package.json exists',
    check: () => existsSync(join(projectRoot, 'package.json'))
  },
  {
    name: 'src directory exists',
    check: () => existsSync(join(projectRoot, 'src'))
  },
  {
    name: 'App.tsx exists',
    check: () => existsSync(join(projectRoot, 'src', 'App.tsx'))
  },
  {
    name: 'main.tsx exists',
    check: () => existsSync(join(projectRoot, 'src', 'main.tsx'))
  },
  {
    name: 'components directory exists',
    check: () => existsSync(join(projectRoot, 'src', 'components'))
  },
  {
    name: 'lib directory exists',
    check: () => existsSync(join(projectRoot, 'src', 'lib'))
  },
  {
    name: 'docs directory exists',
    check: () => existsSync(join(projectRoot, 'docs'))
  }
]

console.log('Running self-test...\n')

let passed = 0
let failed = 0

for (const { name, check } of checks) {
  try {
    const result = check()
    if (result) {
      console.log(`✓ ${name}`)
      passed++
    } else {
      console.log(`✗ ${name}`)
      failed++
    }
  } catch (error) {
    console.log(`✗ ${name}: ${error.message}`)
    failed++
  }
}

console.log(`\n${passed} passed, ${failed} failed`)

if (failed > 0) {
  console.log('\nSelf-test FAILED')
  process.exit(1)
} else {
  console.log('\nSelf-test PASSED')
  process.exit(0)
}