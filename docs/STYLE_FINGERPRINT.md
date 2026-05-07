# docs/STYLE_FINGERPRINT.md

> 项目视觉 DNA。本文件定义"什么是这个项目"，任何违反这些特征的改动都是不被允许的。

---

## 1. 当前项目最核心的视觉特征

### Web OS 简洁风格

- 无装饰主义：线条即功能
- 色彩作为功能区分，不是装饰
- 留白作为层级区分
- 参考：Linear / Raycast / Arc 浏览器

### 核心气质

- 克制：不为了"好看"加特效
- 精准：像素对齐，间距一致
- 快速：动画服务于反馈，非装饰
- 低打扰：hover/focus 状态不刺眼

---

## 2. 什么改动会破坏项目气质

### 绝对禁止

- ❌ 改 primary 颜色（#6366f1 是项目标记）
- ❌ 加渐变背景（linear-gradient, radial-gradient）
- ❌ 加纹理背景（noise, dot pattern）
- ❌ 圆角超过 rounded-md
- ❌ 强行加 icon 装饰（功能优先）
- ❌ 动画时长超过 500ms（slow）
- ❌ 刺眼的 focus 颜色（保持 #6366f1 ring）

### 高危警告

- ⚠️ 新增自定义颜色（必须复用 themeTokens）
- ⚠️ 新增组件样式偏离现有组件
- ⚠️ 使用 CSS 动画替代 Framer Motion
- ⚠️ 修改 button/pill 的高度（h-7/h-8/h-10 是标准）

---

## 3. 动画节奏

### motionConfig（src/lib/theme.ts）

```typescript
motionConfig.fast: 150ms   // 微交互：tap, hover
motionConfig.normal: 300ms   // 标准过渡
motionConfig.slow: 500ms     // 大场景：页面切换
```

### ease 曲线

- easeOut: [0.22, 1, 0.36, 1] → 缓出（大多数动画）
- easeIn: [0, 0, 0.58, 1] → 缓入（淡入）
- easeInOut: [0.42, 0, 0.58, 1] → 缓入缓出

### 动画原则

- hover/tap：使用 fast (150ms)
- 元素出现：使用 normal (300ms)
- 对话框/页面：使用 slow (500ms) 或 spring
- **禁止**：没有动画、动画过快（<100ms）、动画过慢（>700ms）

---

## 4. 组件统一性规则

### 使用 cva

所有可复用组件必须使用 `class-variance-authority` 定义变体。

### 变体命名规范

- variant: default, secondary, destructive, outline, ghost, link
- size: default, sm, lg, icon

### 示例（Badge）

```typescript
const badgeVariants = cva(
  'inline-flex items-center rounded-full ...',
  {
    variants: {
      variant: {
        default: 'bg-primary ...',
        secondary: 'bg-secondary ...',
        destructive: 'bg-destructive ...',
        outline: '...',
        success: 'bg-green-500/10 ...',
        warning: 'bg-amber-500/10 ...',
        info: 'bg-blue-500/10 ...',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)
```

### 禁止

- ❌ 硬编码 className 组合
- ❌ 在组件外部写 tailwind 类
- ❌ 多个组件使用不同变体命名

---

## 5. 禁止新增第二套风格

### 风格锁定

- 圆角：只有 rounded-sm / rounded-md / rounded-full
- 颜色：只有 themeTokens 定义的颜色
- 间距：只有 Tailwind 标准间距
- 阴影：只有 shadow-sm / shadow-lg

### 禁止新增

- ❌ rounded-lg / rounded-xl / rounded-2xl
- ❌ 自定义 blue/green/red/yellow
- ❌ gap-6+（除非卡片内）
- ❌ 自定义 shadow（shadow-2xl+）

---

## 6. 禁止浏览器味道

### 什么是"浏览器味道"

- 默认的 button 蓝色背景
- 默认的 a 标签蓝色下划线
- 默认的 input 黑色边框
- 默认的 focus outline

### 必须覆盖

- ✅ 所有按钮有自定义样式
- ✅ 所有链接有样式（包括 hover）
- ✅ 所有 input 有 border 样式
- ✅ focus-visible 有 ring

---

## 7. OS 感来源

### 来源 1：克制

- 没有装饰性 icon
- 没有装饰性背景
- 颜色用作功能区分

### 来源 2：响应

- hover 有状态变化（不是颜色变化，而是背景变化）
- 点击有反馈（scale）
- 切换有过渡

### 来源 3：层级

- 背景区分内容层级
- 边框区分边界
- 阴影区分层级

### 来源 4：键盘友好

- Tab 可导航
- Enter/Space 可触发
- focus-visible 可见

---

## 8. motion 使用原则

### 必须导入

```typescript
import { fadeIn, slideUp, scaleIn } from '@/lib/motion'
```

### 使用场景

| 动画 | 场景 |
|------|------|
| fadeIn | 元素出现/消失 |
| slideUp | 列表项出现 |
| slideDown | 下拉菜单 |
| scaleIn | 弹窗出现 |
| buttonTap | 按钮点击 |
| hoverScale | 悬停放大 |

### 禁止

- ❌ 手动写 transition 时长
- ❌ 手动写 ease 曲线
- ❌ 定义新动画曲线

---

## 9. transition 原则

### CSS transition

对于非 Framer Motion 场景，使用 Tailwind 标准过渡：

```html
<button className="transition-colors hover:bg-primary/90 ...">
```

### 过渡时长

- 快速交互：duration-150（150ms）
- 标准过渡：duration-200 / duration-300
- **禁止**：duration-500+（会卡）

### 禁止

- ❌ 手动写 `transition: all`
- ❌ 手动写复杂 timing-function

---

## 10. 未来新增页面必须保持的特征

### 必须保持

1. ✅ 使用 themeTokens 颜色
2. ✅ 使用 cva 定义变体
3. ✅ 使用 rounded-sm/md/full
4. ✅ 使用 standard spacing
5. ✅ 使用 motionConfig 时长
6. ✅ 支持 dark mode
7. ✅ 支持 keyboard navigation
8. ✅ focus-visible ring

### 必须避免

1. ❌ 渐变背景
2. ❌ 纹理背景
3. ❌ 超过 rounded-md
4. ❌ 自定义动画曲线
5. ❌ 硬编码颜色

---

## 验证方式

### 自查清单

- [ ] 颜色是否来自 themeTokens
- [ ] 圆角是否标准
- [ ] 是否有 cva 变体
- [ ] 是否支持 dark mode
- [ ] 动画时长是否在 150-500ms
- [ ] focus ring 是否可见
- [ ] 是否有浏览器味道

---

## 更新日志

- 2026-05-07：初始化，基于现有实现和 UI_STYLE_GUIDE 提取