# STYLE_FINGERPRINT.md - 风格指纹

本文件定义项目的视觉和交互一致性标准。

## 视觉指纹

### 颜色体系

```
主色：indigo-500 (#6366f1)
强调：violet-500 (#8b5cf6)
成功：green-500 (#22c55e)
警告：amber-500 (#f59e0b)
错误：red-500 (#ef4444)
信息：blue-500 (#3b82f6)
```

### 字体

- 主字体：系统默认 sans-serif
- 等宽字体：monospace
- 字号层级：12px / 14px / 16px / 18px / 24px

### 间距体系

- 基准：4px
- 间距：4 / 8 / 12 / 16 / 24 / 32 / 48 / 64

### 圆角体系

- 小：4px
- 中：8px
- 大：12px
- 全圆：9999px

### 阴影体系

- sm: 0 1px 2px rgba(0,0,0,0.05)
- md: 0 4px 6px -1px rgba(0,0,0,0.1)
- lg: 0 10px 15px -3px rgba(0,0,0,0.1)
- xl: 0 20px 25px -5px rgba(0,0,0,0.1)

## 交互指纹

### 动画时长

- 快：150ms
- 标准：300ms
- 慢：500ms

### 动画曲线

- 退出：ease-out
- 进入：ease-in
- 移动：ease-in-out

### 过渡效果

- 背景过渡：150ms
- 位置过渡：300ms
- 缩放过渡：200ms
- 淡入淡出：200ms

## 组件指纹

### Button

- 高度：32px / 28px / 40px
- 圆角：6px
- 过渡：150ms background, color

### Card

- 圆角：8px
- 背景：白/深灰
- 阴影：md

### Dialog

- 圆角：12px
- 遮罩：rgba(0,0,0,0.5)
- 动画：scale + fade

### Toast

- 圆角：8px
- 位置：右下角
- 动画：slide + fade

## 一致性检查清单

- [ ] 所有颜色使用 token 而非硬编码
- [ ] 所有间距使用 token 而非硬编码
- [ ] 所有动画使用 motion config 而非硬编码
- [ ] 组件风格与本文件一致
- [ ] 不存在第二套颜色/间距/动画体系