# Web OS UI Kit Builder

高级、优雅、现代的 Web OS 风格 UI Kit 主题搭配生成器。

## 项目定位

用户打开网页后，可以自由搭配整套网页 UI 风格，包括主题、背景、圆角、阴影、密度、按钮、卡片、输入框、字体、动画强度等。左侧实时预览最终效果，右侧调整配置。所有配置实时生效，并支持一键导出。

## 核心功能

- **20 个开发者主题**：Tokyo Night、Catppuccin、Dracula、Nord、Gruvbox、Rosé Pine、One Dark、Solarized、Monokai、GitHub Light、Vercel Geist、Linear Dark、Raycast、Cyber Neon、Frosted Glass、Mint Lab、Amber Studio、Rose Terminal、Slate Pro、Oceanic
- **12 种背景风格**：Solid、Soft Gradient、Radial Glow、Grid Surface、Noise Glass、Aurora、Terminal Matrix、Mesh Gradient、Frosted Panel、Starfield、Blueprint Grid、Minimal Paper
- **11 项可配置项**：Theme、Background、Mode (light/dark)、Radius、Shadow、Density、Button Style、Card Style、Input Style、Motion Level、Font Scale
- **5 种导出格式**：CSS Variables、theme.css、Tailwind Config、ui-kit.json、React Token Object
- **全局动画系统**：5 级 Motion Level (off/subtle/normal/expressive/cinematic)
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
git clone https://github.com/your-username/web-os-ui-kit-builder.git
cd web-os-ui-kit-builder/app

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

项目已配置 GitHub Pages 兼容。`vite.config.ts` 中设置 `base: '/web-os-ui-kit-builder/'`。

```bash
# 构建
npm run build

# 将 dist/ 目录部署到 GitHub Pages
# 或使用 GitHub Actions 自动部署
```

### GitHub Actions 配置示例

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./app/dist
```

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
- **Copy React Token Object**：复制 React 可用的 Token 对象

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
