# UI_STYLE_GUIDE.md

## 视觉风格

**关键词**：高级、专业、优雅、Web OS、设计系统、开发者工具

## 色彩系统

### 使用 CSS Variables

所有颜色必须使用 CSS Variables，不允许硬编码色值。

```css
/* 正确 */
color: hsl(var(--primary));

/* 错误 */
color: #3b82f6;
```

### 主题色板

- primary：主色调，用于按钮、链接、选中态
- secondary：次级色，用于背景、标签
- muted：弱化色，用于描述文字、禁用态
- accent：强调色，用于 hover、focus
- destructive：危险色，用于删除、错误
- success：成功色
- warning：警告色
- info：信息色

## 布局系统

### 间距

使用 Tailwind 间距系统：`p-1` 到 `p-12`，`gap-1` 到 `gap-8`

### 圆角

通过 CSS Variable `--radius` 控制：
- sharp：0px
- soft：4px
- rounded：8px
- pill：9999px

### 阴影

- flat：无阴影
- soft：轻微阴影
- floating：悬浮感
- elevated：强阴影
- glow：发光效果

## 组件规范

### 按钮

- 必须有 hover 状态
- 必须有 active 状态（缩放）
- 必须有 disabled 状态
- 必须有 loading 状态（如适用）

### 卡片

- 必须有边框或背景区分
- hover 时有轻微变化
- 内容层级清晰

### 输入框

- 必须有 focus 状态
- 必须有 error 状态
- placeholder 颜色使用 muted-foreground

## 动画规范

### 时长

- 微交互：150-200ms
- 状态切换：200-300ms
- 面板展开：300-400ms
- 页面转场：400-500ms

### 缓动

- 默认：ease-out
- 强调：spring
- 进入：ease-in-out

## 响应式

- 移动端：单栏布局
- 平板：可选双栏
- 桌面：完整双栏

## Token 来源规则

### 颜色

所有颜色必须从 `src/lib/themes.ts` 获取，通过 CSS Variables 应用。

```css
/* 正确 */
color: hsl(var(--primary));

/* 错误 */
color: #3b82f6;
```

### 动画

所有动画参数必须从 `src/lib/motion.ts` 获取，不允许散写。

```tsx
// 正确
import { getMotionConfig } from '@/lib/motion'
const motion = getMotionConfig(config.motionLevel)

// 错误
<motion.div animate={{ opacity: 1 }} transition={{ duration: 0.3 }} />
```

### 配置项

所有配置项定义必须从 `src/lib/builder.ts` 获取。

## 禁止事项

- 大白板（无背景、无边框）
- 毛坯 demo（未完成的 UI）
- 空按钮（无实际功能）
- 硬编码色值
- 散写动画参数
- 动画看不出来
- 移动端爆版
