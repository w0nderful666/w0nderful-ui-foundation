# Release Notes

## v0.8.0 (2026-05-08)

### Showcase Scene Switcher

将 Live Preview 区域升级为多场景 UI Kit 展示台，支持 7 种真实应用场景预览：

#### 场景
1. **Overview** - 当前 UI Kit 总览，展示颜色、按钮、卡片、输入框、徽章等基础组件
2. **Dashboard** - 仪表盘场景，包含侧边栏、顶部导航、统计卡片、活动列表
3. **Settings** - 设置面板场景，包含设置分组、开关、 segmented controls、保存按钮
4. **Article** - 文章阅读场景，包含标题、摘要、标签、正文、引用块、代码块
5. **Landing** - 产品首页场景，包含 hero、feature cards、CTA、trust badges
6. **Window** - OS 风格窗口场景，包含 window chrome、traffic lights、terminal 内容
7. **Form** - 表单场景，包含 input、select、textarea、checkbox/switch、error text

#### 技术实现
- 新增 ShowcaseSceneSwitcher 组件
- 使用 framer-motion 实现场景切换动画
- 支持 prefers-reduced-motion
- 场景内容使用项目已有 CSS variables

#### 测试
- self-test: 125/125

---

## v0.7.0 (2026-05-08)

### Starter Kit ZIP Export

新增一键下载完整可运行 Starter Kit 的功能：

#### 导出功能
- **downloadStarterKitZip(config)** - 一键生成 ZIP 包
- **generateStarterKitReadme(config)** - 生成 README 说明文档
- 使用 JSZip (轻量级 ~3KB gzipped)

#### ZIP 内容
- `demo.html` - 可直接浏览器打开的完整演示页面
- `demo.css` - 基于主题 Token 的 CSS 组件类
- `ui-kit.json` - 完整配置备份
- `README.md` - 使用说明文档

#### IntegrationGuide 更新
- Starter Files tab 增加 "Download Starter Kit ZIP" 按钮
- 显示 ZIP 包内容说明：包含 demo.html, demo.css, ui-kit.json, README.md

#### 测试更新
- 新增 4 个测试用例验证 ZIP 功能
- self-test: 120/120

---

## v0.6.0 (2026-05-07)

### 阶段 1-5 完成摘要

#### 阶段 1：项目骨架 + 标准文档层
- Vite + React + TypeScript + Tailwind CSS + Framer Motion 技术栈
- 项目标准层文档（PROJECT_CONTRACT、ARCHITECTURE、UI_STYLE_GUIDE 等）
- 自测脚本 (self-test.mjs) + 预检脚本 (preflight.mjs)

#### 阶段 2：核心 lib 层
- **themes.ts**：20 个主题 × 2 模式 (light/dark)，完整 20 个 token
- **motion.ts**：5 级 Motion System (off/subtle/normal/expressive/cinematic)
- **storage.ts**：localStorage 持久化，key: `ui-kit-builder-config`
- **export.ts**：5 种导出格式
- **applyTheme.ts**：主题应用到 CSS Variables
- **builder.ts**：配置类型定义 + 可选项数组

#### 阶段 3：UI 组件层
- Button (7 variants: solid/soft/outline/ghost/gradient/glass/neon)
- Card (6 variants: solid/glass/bordered/elevated/floating/terminal)
- Input (5 variants: filled/outline/minimal/glass/terminal)
- Badge (6 variants: default/secondary/success/warning/info/destructive)
- Tabs、Dialog、Switch、Progress、Table、Alert、Toast、CodeBlock

#### 阶段 4：Builder 布局层
- 左右双栏布局（LivePreview + ControlPanel）
- ThemePicker (20 主题选择器)
- BackgroundPicker (12 种背景选择器)
- StyleOptionGroup (通用样式选项组)
- ExportPanel (5 种导出功能)
- MotionPreview + TokenPreview

#### 阶段 5：完整 Preview App
- PreviewShell (App Shell 布局)
- PreviewApp (完整 Web App 预览)
- CommandPalettePreview (命令面板)
- FloatingWindowPreview (浮动窗口)
- SettingsPanelPreview (设置面板)
- EmptyStatePreview (空状态)
- ActivityPanelPreview (活动面板)

### 核心数据

- **20 个主题**：Tokyo Night、Catppuccin、Dracula、Nord、Gruvbox、Rosé Pine、One Dark、Solarized、Monokai、GitHub Light、Vercel Geist、Linear Dark、Raycast、Cyber Neon、Frosted Glass、Mint Lab、Amber Studio、Rose Terminal、Slate Pro、Oceanic
- **12 种背景**：Solid、Soft Gradient、Radial Glow、Grid Surface、Noise Glass、Aurora、Terminal Matrix、Mesh Gradient、Frosted Panel、Starfield、Blueprint Grid、Minimal Paper
- **11 项配置**：Theme、Background、Mode、Radius、Shadow、Density、Button Style、Card Style、Input Style、Motion Level、Font Scale
- **5 种导出**：CSS Variables、theme.css、Tailwind Config、ui-kit.json、React Token Object

### 测试结果

- `npm run build`：PASS
- `npm run check`：PASS
- `npm run self-test`：49/49
- `npm run preflight`：21/21

---

## v0.1.0 (2026-05-07)

### 初始化

- 项目骨架搭建
- 技术栈：Vite + React + TypeScript + Tailwind CSS + Framer Motion
- 项目标准层文档初始化
- 自测脚本初始化
