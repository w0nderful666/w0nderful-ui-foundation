# ARCHITECTURE.md - 架构设计

## 目录结构

```
w0nderful-ui-foundation/
  src/
    components/
      ui/               # 基础 UI 组件
        Button.tsx
        Card.tsx
        Dialog.tsx
        Toast.tsx
        Tabs.tsx
        Badge.tsx
        Switch.tsx
        Dock.tsx
        Window.tsx
        Toolbar.tsx
      examples/         # 示例展示
        FoundationShowcase.tsx
        ThemePlayground.tsx
        MotionPlayground.tsx
        ComponentGallery.tsx
    styles/             # 样式系统
      tokens.css        # 设计 token
      themes.css        # 主题系统
      motion.css        # 动画定义
      effects.css       # 视觉效果
      layout.css        # 布局样式
      globals.css       # 全局样式
    lib/                # 工具函数
      cn.ts             # className 合并
      theme.ts          # 主题管理
      motion.ts         # 动画工具
    App.tsx             # 主应用
    main.tsx            # 入口文件
  docs/                 # 项目文档
  scripts/              # 脚本
  package.json
```

## 设计原则

### 1. 样式系统分层

- **tokens.css**：颜色、间距、字体等基础 token
- **themes.css**：亮色/暗色主题定义
- **effects.css**：阴影、边框、模糊等效果
- **layout.css**：布局相关的样式
- **globals.css**：全局样式和重置

### 2. 组件分层

- **UI 组件**：基础原子组件（Button, Card 等）
- **复合组件**：基于 UI 组件组合（Dock, Window 等）
- **展示组件**：示例页面用的展示组件

### 3. 工具函数

- **cn**：className 合并工具
- **theme**：主题切换管理
- **motion**：动画配置工具

## 数据流

- 组件使用本地 state
- 主题使用 CSS variables
- 不需要复杂状态管理

## 扩展方式

新增组件时：
1. 在 `src/components/ui/` 创建组件
2. 使用 `cn()` 合并 class
3. 使用现有 token 样式
4. 添加到示例展示