# w0nderful-ui-foundation

高级、优雅、现代的 Web OS 风格 UI Kit 主题搭配生成器。

## 项目定位

为 Local First / GitHub Pages / Web OS 风格小工具提供可复用的 UI 基础设施。用户可自由搭配整套网页 UI 风格，包括主题、背景、圆角、阴影、密度、按钮、卡片、输入框、字体、动画强度等。左侧实时预览最终效果，右侧调整配置。所有配置实时生效，并支持一键导出。

## 核心功能

- **20 个开发者主题**：Tokyo Night、Catppuccin、Dracula、Nord、Gruvbox、Rosé Pine、One Dark、Solarized、Monokai、GitHub Light、Vercel Geist、Linear Dark、Raycast、Cyber Neon、Frosted Glass、Mint Lab、Amber Studio、Rose Terminal、Slate Pro、Oceanic
- **12 种背景风格**：Solid、Soft Gradient、Radial Glow、Grid Surface、Noise Glass、Aurora、Terminal Matrix、Mesh Gradient、Frosted Panel、Starfield、Blueprint Grid、Minimal Paper
- **11 项可配置项**：Theme、Background、Mode (light/dark)、Radius、Shadow、Density、Button Style、Card Style、Input Style、Motion Level、Font Scale
- **5 种导出格式**：CSS Variables、theme.css、Tailwind Config、ui-kit.json、React Token Object
- **全局动画系统**：5 级 Motion Level (off/subtle/normal/expressive/cinematic)
- **多场景 Showcase**：7 种真实应用场景预览 (Overview / Dashboard / Settings / Article / Landing / Window / Form)
- **高级预设库 (Preset Gallery)**：8 套一键应用的高级风格 (Aurora Glass / Deep Space / Linux Frost / Terminal Pro / Cyber Neon / Paper Minimal / Ocean Panel / Warm Studio)
- **Token Inspector**：查看并复制设计系统 token (Colors / Surfaces / Shape / Motion / Typography / Layout / Export)
- **完整 Preview App**：模拟真实 Web OS 应用，包含导航栏、侧边栏、表格、对话框、命令面板等

## 技术栈

- **构建工具**：Vite 5
- **前端框架**：React 18 + TypeScript
- **样式系统**：Tailwind CSS 3
- **动画引擎**：Framer Motion 11
- **组件变体**：class-variance-authority (cva)
- **图标库**：lucide-react

## 本地运行

```bash
# 克隆仓库
git clone https://github.com/w0nderful666/w0nderful-ui-foundation.git
cd w0nderful-ui-foundation

# 安装依赖
npm install

# 开发模式
npm run dev

# 构建
npm run build

# 预览构建产物
npm run preview
```

## 构建命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | TypeScript 检查 + 生产构建 |
| `npm run check` | TypeScript 类型检查 |
| `npm run self-test` | 自测脚本 (49 项) |
| `npm run preflight` | 预检脚本 (21 项) |
| `npm run preview` | 预览构建产物 |

## GitHub Pages 部署

项目已配置 GitHub Pages 兼容。`vite.config.ts` 中设置 `base: '/w0nderful-ui-foundation/'`。

```bash
# 构建
npm run build

# dist/ 目录即为部署产物
# GitHub Actions 会自动构建并部署
```

### GitHub Actions 自动部署

项目已配置 `.github/workflows/deploy.yml`，push 到 `master` 分支会自动触发构建和部署。

部署地址：https://w0nderful666.github.io/w0nderful-ui-foundation/

## 用户可配置项

| 配置项 | 可选值 |
|--------|--------|
| Theme | 20 个主题 |
| Background | 12 种背景 |
| Mode | Light / Dark |
| Radius | Sharp / Soft / Rounded / Pill |
| Shadow | Flat / Soft / Floating / Elevated / Glow |
| Density | Compact / Normal / Spacious / Presentation |
| Button Style | Solid / Soft / Outline / Ghost / Gradient / Glass / Neon |
| Card Style | Solid / Glass / Bordered / Elevated / Floating / Terminal |
| Input Style | Filled / Outline / Minimal / Glass / Terminal |
| Motion Level | Off / Subtle / Normal / Expressive / Cinematic |
| Font Scale | Compact / Normal / Large / Display |

## 导出能力

- **Copy CSS Variables**：复制当前主题的 CSS 变量
- **Download theme.css**：下载完整的主题 CSS 文件（含 light/dark）
- **Copy Tailwind Config**：复制 Tailwind CSS 配置
- **Download ui-kit.json**：下载 JSON 格式的完整配置
- **Copy React Token Object**：复制 React 可用的 Token Object

## 如何使用生成的 UI Kit

### 快速开始：下载 Starter Kit ZIP

最简单的方式是下载 **Starter Kit ZIP**，包含：

- `demo.html` - 可直接浏览器打开的演示页面
- `demo.css` - 基于主题 Token 的 CSS 组件类
- `ui-kit.json` - 完整配置备份（可导入 UI Foundation）
- `README.md` - 使用说明

使用方式：
1. 在 UI Foundation 页面点击 "Download Starter Kit ZIP"
2. 解压 ZIP 到项目目录
3. 打开 `demo.html` 预览主题效果
4. 将 `demo.css` 复制到你的项目

适合：快速预览、无需构建工具、备份配置

### 1. HTML / CSS

下载 `theme.css` 后在 HTML 中引入：

```html
<link rel="stylesheet" href="./theme.css">
<div class="card bg-card text-card-foreground border-border p-6 rounded-lg">
  <h1 class="text-lg font-semibold">Hello UI Foundation</h1>
  <button class="bg-primary text-primary-foreground px-4 py-2 rounded-md">
    Action
  </button>
</div>
```

适合：纯静态页面、简单演示

### 2. React + Tailwind

下载 `theme.css` 并配置 Tailwind 颜色：

```js
// tailwind.config.js
colors: {
  background: 'hsl(var(--background))',
  foreground: 'hsl(var(--foreground))',
  card: 'hsl(var(--card))',
  'card-foreground': 'hsl(var(--card-foreground))',
  primary: 'hsl(var(--primary))',
  'primary-foreground': 'hsl(var(--primary-foreground))',
  border: 'hsl(var(--border))',
}
```

```jsx
<div className="bg-card text-card-foreground border border-border rounded-lg p-6">
  <h2 className="text-xl font-semibold">Web OS Card</h2>
  <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md">
    Action
  </button>
</div>
```

适合：React / Vite / Next.js 项目

### 3. Astro / GitHub Pages

```astro
---
// src/pages/index.astro
import '../styles/theme.css'
---

<section class="bg-card text-card-foreground border border-border rounded-lg p-8">
  <h1 class="text-2xl font-bold">My Web OS</h1>
  <button class="bg-primary text-primary-foreground px-4 py-2 rounded-md">
    Get Started
  </button>
</section>
```

适合：Astro、GitHub Pages、静态博客

### 4. Runtime Theme Loading

加载 `ui-kit.json` 实现运行时换肤：

```js
async function loadDynamicTheme() {
  const uiKit = await fetch('/ui-kit.json').then(r => r.json())
  const root = document.documentElement
  
  // Apply tokens
  root.style.setProperty('--background', uiKit.theme.tokens.background)
  root.style.setProperty('--foreground', uiKit.theme.tokens.foreground)
  // ... more tokens
}
loadDynamicTheme()
```

适合：主题切换、用户偏好、A/B Testing

### 5. 推荐集成路径

1. **Phase 1**: 只接 `theme.css` + Tailwind token
2. **Phase 2**: 把现有组件改成使用 token（如 `bg-blue-500` → `bg-primary`）
3. **Phase 3**: 使用本项目 Button/Card/Input 组件的 variant 设计
4. **Phase 4**: 高级用户使用 Import JSON + Config Health

详细集成指南请查看页面内 "Usage / Integration Guide"。

## localStorage 说明

配置自动保存到 localStorage，刷新后恢复。

- **Key**: `ui-kit-builder-config`
- **保存内容**: themePreset、mode、backgroundStyle、radius、shadow、density、buttonStyle、cardStyle、inputStyle、motionLevel、fontScale

## 项目边界

- ✅ 纯前端
- ✅ GitHub Pages 可部署
- ✅ Local First、离线可用
- ✅ 无后端
- ✅ 无数据库
- ✅ 无登录

## 截图

Screenshots coming soon.

## 文档

- [项目契约](docs/PROJECT_CONTRACT.md)
- [架构设计](docs/ARCHITECTURE.md)
- [UI 风格指南](docs/UI_STYLE_GUIDE.md)
- [风格指纹](docs/STYLE_FINGERPRINT.md)
- [代码规范](docs/CODE_CONVENTIONS.md)
- [变更协议](docs/CHANGE_PROTOCOL.md)

## 许可证

MIT

## 系统风格主题说明

本项目包含"系统风格主题"（System-inspired Theme Packs），仅用于界面色彩与 UI 气质参考。

**重要声明**：

- 本项目**不隶属于** Microsoft、Apple、Canonical、Google、Red Hat、Debian、Fedora、Arch Linux、Kali Linux 或任何其他商标持有者
- **不包含**任何官方 Logo、壁纸、图标、字体或专有资产
- 所有系统风格主题和背景均为 CSS 生成的视觉效果，使用 CSS gradient、radial-gradient、conic-gradient 等实现
- 主题名称仅表示设计灵感来源（如"Windows Classic"表示类 Windows 经典桌面风格），并非官方复刻

系统风格主题仅用于色彩与界面气质参考，不包含任何官方素材。使用即表示理解并接受此免责声明。
