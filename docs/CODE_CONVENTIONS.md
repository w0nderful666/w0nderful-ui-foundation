# CODE_CONVENTIONS.md

## TypeScript

- 严格模式
- 优先使用 `interface` 定义对象类型
- 组件 Props 使用 `interface`
- 事件处理使用 `React.EventHandler`

## 命名规范

### 文件名

- 组件：PascalCase（`Button.tsx`、`ThemePicker.tsx`）
- 工具：camelCase（`utils.ts`、`storage.ts`）
- 样式：kebab-case（`index.css`）

### 变量

- 组件：PascalCase
- 函数：camelCase
- 常量：UPPER_SNAKE_CASE
- CSS 变量：kebab-case

## 组件规范

### 单一职责

每个组件只做一件事，避免巨型组件。

### Props 接口

```typescript
interface ButtonProps {
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}
```

### 导出

默认导出组件，命名导出工具函数。

## 样式规范

### Tailwind 优先

优先使用 Tailwind 类名，避免自定义 CSS。

### CSS Variables

颜色必须使用 CSS Variables，便于主题切换。

### 响应式

使用 `sm:`、`md:`、`lg:` 前缀。

## 导入顺序

```typescript
// 1. 第三方库
import { useState } from 'react'
import { motion } from 'framer-motion'

// 2. 内部工具
import { cn } from '@/lib/utils'

// 3. 组件
import { Button } from '@/components/ui/Button'
```

## 禁止事项

- `any` 类型
- `// @ts-ignore`
- 删除已有测试
- 引入第二套实现
- 临时 hack
