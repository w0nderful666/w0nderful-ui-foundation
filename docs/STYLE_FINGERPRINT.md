# STYLE_FINGERPRINT.md

## 项目风格指纹

本文件用于快速识别项目的视觉风格，防止引入第二套风格。

## 色彩指纹

- 主色调：蓝色系（可随主题变化）
- 背景：深色优先（#0a0a0f 类深色）
- 前景：浅灰白（#e4e4e7 类）
- 强调：高饱和度主色

## 布局指纹

- 左右双栏：左侧预览 + 右侧控制台
- 卡片式布局
- 圆角：8px 为主
- 间距：16-24px 为主

## 字体指纹

- 正文：Inter
- 代码：JetBrains Mono
- 标题：600-700 weight
- 正文：400 weight

## 动画指纹

- 进入：fade + slide up
- Hover：轻微 scale
- Active：scale down
- 面板：slide from right
- Dialog：scale + fade

## 组件指纹

- 按钮：圆角、有 hover/active 状态
- 卡片：有边框、hover 变化
- 输入框：有 focus 边框高亮
- Badge：小圆角、彩色背景

## 不可散写规则

### 动画参数

所有动画必须通过 `src/lib/motion.ts` 的 `getMotionConfig()` 获取参数。

禁止：
- 直接写 `transition={{ duration: 0.3 }}`
- 直接写 `whileHover={{ scale: 1.02 }}`
- 直接写 `initial={{ opacity: 0 }}`

必须：
- 从 motion config 解构或引用
- 使用统一的 duration token
- 使用统一的 easing token

### 主题颜色

所有颜色必须通过 CSS Variables 引用，变量值来自 `src/lib/themes.ts`。

禁止：
- 硬编码 `#3b82f6`
- 硬编码 `rgb(59, 130, 246)`
- 硬编码 `hsl(220, 83%, 53%)`

## 禁止引入的风格

- 大白板风格
- 纯黑背景（#000）
- 无动画的静态 UI
- 扁平无层次的布局
- 非 Web OS 风格的组件
- 散写的动画参数
- 硬编码的颜色值
