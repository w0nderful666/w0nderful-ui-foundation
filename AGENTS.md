# AGENTS.md - AI Agent 工作入口

本文件是 AI Agent 进入本项目的第一入口。

## 开工前必读

1. 先读 `w0nderful-agent-skills/START_HERE_FOR_AI.md` 了解全局规则
2. 再读本项目 `docs/PROJECT_CONTRACT.md` 了解项目目标
3. 然后读 `docs/UI_STYLE_GUIDE.md` 和 `docs/STYLE_FINGERPRINT.md` 了解 UI 风格

## 项目类型

- **本地优先 UI 地基项目**
- 非业务应用，是可复用 UI 基础设施
- 目标：沉淀页面风格、配色方案、动画系统、基础组件

## AI Agent 工作约束

- 不做业务功能
- 不接数据库
- 不做登录
- 不做云同步
- 不做 Electron / Tauri
- 保持纯前端、Local First、GitHub Pages Ready
- 所有改动必须符合 `docs/STYLE_FINGERPRINT.md` 定义的一致性风格

## 验证要求

完成任何改动后必须运行：
- `npm run build` - 构建检查
- `npm run check` - 类型检查
- `node scripts/self-test.mjs` - 自测
- `node scripts/preflight.mjs` - 预检

## 禁止事项

- 不盲目安装大量组件
- 不引入第二套实现方式
- 不做孤立 UI
- 不新增第二套风格
- 不自动 push、release、publish