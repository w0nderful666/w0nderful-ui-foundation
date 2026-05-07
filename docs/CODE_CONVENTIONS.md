# CODE_CONVENTIONS.md - 代码规范

## TypeScript 规范

- 启用严格模式
- 使用 `interface` 定义对象类型
- 使用 `type` 定义联合类型、别名
- 避免使用 `any`
- 导出类型优先于导出实现

## React 规范

- 使用函数组件 + Hooks
- 组件文件以 `.tsx` 结尾
- 组件名使用 PascalCase
- Props 使用 interface 定义
- 使用 `useCallback`、`useMemo` 优化性能

## 样式规范

- 使用 Tailwind CSS
- 自定义样式使用 `cn()` 合并 class
- 避免内联样式
- 使用 design token 定义变量

## 文件命名

- 组件：`ComponentName.tsx`
- 工具函数：`functionName.ts`
- 类型：`types.ts`
- 常量：`constants.ts`
- 样式：`*.css`

## 导入顺序

1. React / 库
2. 组件
3. 工具函数
4. 类型/常量
5. 样式

```tsx
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

import { Button } from './components/ui/Button'
import { cn } from './lib/cn'
import type { Theme } from './lib/theme'
import './styles/globals.css'
```

## 组件结构

```tsx
import { useState } from 'react'
import { cn } from '@/lib/cn'

interface ComponentProps {
  className?: string
  children?: React.ReactNode
}

export function Component({ className, children }: ComponentProps) {
  const [state, setState] = useState(false)

  return (
    <div className={cn('base-class', state && 'active-class', className)}>
      {children}
    </div>
  )
}
```

## 禁止事项

- 不使用 var
- 不使用未定义变量
- 不在循环中直接修改 state
- 不在 JSX 中直接使用索引作为 key