# PROJECT_CONTRACT.md - 项目契约

## 项目信息

- **项目名**：w0nderful-ui-foundation
- **类型**：UI 地基项目（非业务应用）
- **版本**：0.1.0
- **创建日期**：2025-05

## 项目目标

沉淀一套可复用的 UI 基础设施，供以后所有 Local First / GitHub Pages / Web OS 风格小工具使用。

## 核心能力

- 页面风格
- 配色方案
- 动画系统与过渡效果
- 基础组件库（Toast / Modal / Card / Dock / Window / Toolbar）
- AI Agent 可继承的项目标准层

## 约束条件

- **纯前端**：不使用后端服务
- **Local First**：数据存储在浏览器本地
- **GitHub Pages Ready**：可部署到 GitHub Pages
- **可复制**：其他项目可直接参考或复制
- **不接数据库**：不使用任何数据库
- **不做登录**：不需要用户认证
- **不做云同步**：不依赖云服务
- **不做 Electron / Tauri**：保持纯 Web

## 技术栈

- Vite
- React
- TypeScript
- Tailwind CSS
- Radix UI
- Motion / Framer Motion
- lucide-react

## 组件原则

可以参考 shadcn/ui 的组件组织方式，但：
- 不盲目安装大量组件
- 只实现本项目必要的组件
- 必要时可手写类似结构

## 首版范围

建立稳定的 UI 地基，包括：
1. 基础样式系统（tokens, themes, effects, layout）
2. 工具函数（cn, theme, motion）
3. 基础 UI 组件
4. 示例展示页面

## 验收标准

- 项目可正常构建
- 组件可正常渲染
- 动画和过渡效果正常
- 示例页面可正常展示
- 通过 self-test 和 preflight 检查