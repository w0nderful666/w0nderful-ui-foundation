# w0nderful-ui-foundation

UI 地基项目 - 沉淀可复用的页面风格、配色方案、动画系统、基础组件。

## 项目目标

为 Local First / GitHub Pages / Web OS 风格小工具提供可复用的 UI 基础设施。

## 技术栈

- Vite
- React
- TypeScript
- Tailwind CSS
- Radix UI
- Motion (Framer Motion)
- lucide-react

## 功能

- 基础 UI 组件库
- 主题系统（亮色/暗色）
- 动画系统
- 示例展示

## 快速开始

```bash
npm install
npm run dev
```

## 项目命令

```bash
npm run dev      # 开发模式
npm run build    # 构建
npm run preview  # 预览构建结果
npm run check    # 类型检查
```

## 自测

```bash
node scripts/self-test.mjs
node scripts/preflight.mjs
```

## 项目结构

```
src/
  components/ui/   # 基础 UI 组件
  components/examples/  # 示例展示
  styles/          # 样式系统
  lib/             # 工具函数
  App.tsx          # 主应用
  main.tsx         # 入口
docs/              # 项目文档
scripts/           # 脚本
```

## 约束

- 纯前端
- Local First
- 不接数据库
- 不做登录
- 不做云同步
- 不做 Electron / Tauri

## License

MIT