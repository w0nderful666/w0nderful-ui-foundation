# docs/UI_STYLE_GUIDE.md

> 本文件定义 UI 风格体系，所有新增组件必须符合本指南。

---

## 1. 色彩体系

### 主题 tokens（src/lib/theme.ts）

| Token | Light | Dark | 用途 |
|-------|-------|------|------|
| background | #fafafa | #18181b | 页面背景 |
| foreground | #18181b | #fafafa | 主文字 |
| primary | #6366f1 | #6366f1 | 主按钮/链接 |
| secondary | #f4f4f5 | #27272a | 次级背景 |
| muted | #f4f4f5 | #27272a | 弱化内容 |
| accent | #f4f4f5 | #27272a | 悬停态 |
| destructive | #ef4444 | #ef4444 | 危险操作 |
| border | #e4e4e7 | #3f3f46 | 边框 |
| ring | #6366f1 | #6366f1 | focus 环 |

### 配色原则

- primary 固定为 #6366f1（indigo-500），不要改动
- destructive 只在危险操作使用（删除、退出等）
- 语义色从 secondary/ muted 派生，不要新增硬编码颜色

---

## 2. 圆角规则

### 现有组件圆角

| 组件 | 圆角 | class |
|------|------|-------|
| Button | sm | `rounded-sm`（约 2px） |
| Card | sm | `rounded-md` |
| Badge | full | `rounded-full` |
| Input | sm | `rounded-sm` |

### 圆角规范

- 小组件（Button, Input, Badge）：`rounded-sm`
- 容器组件（Card, Dialog）：`rounded-md`
- 标签/徽章：`rounded-full`
- **禁止**：`rounded-lg`、`rounded-xl`、`rounded-2xl`

---

## 3. 阴影规则

### 现有阴影

- Card：`shadow-sm`
- Dialog：无额外阴影（依赖 Radix Native）

### 阴影规范

- 基础卡片：`shadow-sm`
- 浮层/弹出：`shadow-lg` 或更高
- **禁止**：自定义复杂阴影或多重阴影

---

## 4. 卡片层级

- Card 默认 `shadow-sm`
- 浮层组件（Dropdown, Popover）使用更高层级
- 使用 Radix UI 对话框时，保持原生行为

---

## 5. 间距体系

### Tailwind 间距标准

- 组件内边距：`p-4`（16px）
- 组件间隙：`space-y-1.5` 或 `gap-2`
- 文字间距：`tracking-tight`

### 间距规范

- 优先使用 Tailwind 已有间距（p-1 ~ p-6, gap-1 ~ gap-4）
- **禁止**：硬编码 px 值

---

## 6. Typography

### 现有文本规范

- CardTitle：`text-base font-semibold leading-none tracking-tight`
- CardDescription：`text-sm text-muted-foreground`
- Button：`text-sm font-medium`
- Badge：`text-xs font-semibold`

### Typography 规范

- 标题：`text-base font-semibold tracking-tight`
- 正文：`text-sm`
- 辅助文字：`text-sm text-muted-foreground`
- 按钮：`text-sm font-medium`
- **禁止**：使用非标准字号（除非设计明确要求）

---

## 7. 深色模式原则

### 实现方式

- 通过 `document.documentElement.classList.add/remove('dark')` 切换
- CSS 使用 `dark:` 前缀
- 组件内部使用 `cn()` 合并 dark 变体

### 深色模式规范

- 必须覆盖所有颜色 tokens
- background 切换为深灰（#18181b）
- foreground 切换为浅色（#fafafa）
- border 使用 #3f3f46
- **禁止**：深色模式下出现刺眼白色（#ffffff 作背景）

---

## 8. OS 风格原则

### 项目定位

- Web OS 风格小工具的基础 UI
- 参考现代 Web App（Linear, Raycast, Arc）设计语言

### OS 风格特征

- 简洁、无过度装饰
- 清晰的层级关系
- 适度的圆角和阴影
- focus-visible 可见
- 键盘导航支持

### OS 风格禁止

- 禁止拟物化设计（无纹理背景、无渐变按钮）
- 禁止过度动画（动画服务于交互，非装饰）
- 禁止花哨字体

---

## 9. 禁止事项

### UI 禁止

- 禁止改动 primary 颜色（#6366f1）
- 禁止新增第二套配色
- 禁止使用非标准圆角（rounded-lg+）
- 禁止硬编码颜色（必须引用 themeTokens���
- 禁止自定义复杂阴影

### 实现禁止

- 禁止引入第二套组件库（已有 Radix UI）
- 禁止用 CSS-in-JS 替代现有方案
- 禁止新增 Tailwind 配置（扩展 theme）

---

## 10. 新组件设计规范

### API 设计原则

- 使用 `cva` 定义 variant
- 使用 `forwardRef` 暴露 DOM ref
- Props 继承 HTML 原生属性
- 组件名：`ComponentName.tsx`

### 代码结构

```tsx
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'

const componentVariants = cva('base classes...', {
  variants: {
    variant: { default: '', secondary: '' },
    size: { default: '', sm: '', lg: '' },
  },
  defaultVariants: { variant: 'default', size: 'default' },
})

export interface ComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof componentVariants> {}

const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(componentVariants({ variant, size, className }))}
        {...props}
      />
    )
  }
)
Component.displayName = 'Component'

export { Component, componentVariants }
```

### 必须包含

- 基础变体（default, secondary, destructive, outline）
- 尺寸变体（default, sm, lg）
- dark 模式支持
- forwardRef
- displayName
- type export（如 BadgeProps）

---

## 更新日志

- 2026-05-07：初始化，基于现有实现提取