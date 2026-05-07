# AGENT_HANDOFF.md（项目专属 Skill）

## 1) 项目基本信息

- 项目名：w0nderful-ui-foundation
- 项目类型：前端 / UI 组件库
- 维护状态：活跃
- 主要负责人/联系方式：w0nderful666

## 2) 项目定位（一句话）

- 为 Local First / GitHub Pages / Web OS 风格小工具提供可复用的 UI 基础设施
- 不做什么（明确排除项）：不做业务功能、不接数据库、不做登录、不做云同步、不做 Electron / Tauri

## 3) 技术栈

- 语言 / 框架：React 18.3.1 + TypeScript 5.4.0
- 构建工具：Vite 5.4.0
- 包管理器：npm
- 运行环境要求：Node.js 18+
- 依赖：Radix UI、Framer Motion、class-variance-authority、tailwind-merge、lucide-react

## 4) 当前稳定版本 / 稳定基线

- 当前版本：0.1.0
- 最近稳定提交：初始化版本
- 关键验收口径：`npm run build` 构建成功，`npm run check` 类型检查通过

## 5) 线上地址 / 产物（如有）

- 线上地址：无（Local First）
- 下载/发布页：无

## 6) 仓库信息

- 仓库地址：https://github.com/w0nderful666/w0nderful-ui-foundation
- 分支策略：main
- 项目标准层入口：AGENTS.md（AI Agent 工作入口）

## 7) 关键文件与目录（只列最重要的）

- 入口文件：src/main.tsx, src/App.tsx
- 核心模块：
  - src/components/ui/（基础 UI 组件，共 12 个）
  - src/components/examples/（示例展示，共 4 个）
  - src/lib/（工具函数：cn.ts, theme.ts, motion.ts）
  - src/styles/（样式系统）
- 配置文件：package.json, vite.config.ts, tsconfig.json, tailwind.config.js
- 测试脚本：scripts/self-test.mjs, scripts/preflight.mjs
- 文档入口：README.md, AGENTS.md

## 8) 现有组件清单

### 基础 UI 组件（src/components/ui/）

| 组件名 | 用途 | API 风格 |
|--------|------|----------|
| Button | 按钮 | cva variant（default/destructive/outline/secondary/ghost/link）+ size（default/sm/lg/icon） |
| Badge | 标签 | variant（default/secondary/destructive/outline） |
| Card | 卡片 | 标准容器，无复杂 props |
| Switch | 开关 | Radix UI Switch |
| Tabs | 标签页 | Radix UI Tabs |
| Dialog | 对话框 | Radix UI Dialog |
| Toast | 提示 | Radix UI Toast |
| Toaster | 提示展示 | Toast.Provider 配套 |
| Toolbar | 工具栏 | 工具条容器 |
| Dock | 停靠栏 | 底部/侧边停靠组件 |
| Window | 窗口 | 窗口容器组件 |
| useToast | Hook | 返回 toast 函数 |

### 示例展示（src/components/examples/）

- ComponentGallery：组件画廊
- FoundationShowcase：基础能力展示
- MotionPlayground：动画演示
- ThemePlayground：主题演示

## 9) 主题系统（src/lib/theme.ts）

### 主题模式

- light / dark
- 自动检测系统偏好
- 支持 localStorage 持久化

### 主题色 tokens

| token | light | dark |
|-------|-------|------|
| background | #fafafa | #18181b |
| foreground | #18181b | #fafafa |
| primary | #6366f1 | #6366f1 |
| secondary | #f4f4f5 | #27272a |
| muted | #f4f4f5 | #27272a |
| destructive | #ef4444 | #ef4444 |
| border | #e4e4e7 | #3f3f46 |

### 动画配置（motion.ts）

- motionConfig.fast: 150ms
- motionConfig.normal: 300ms
- motionConfig.slow: 500ms
- easeOut: [0.22, 1, 0.36, 1]
- easeIn: [0, 0, 0.58, 1]

### 预设动画（src/lib/motion.ts）

- fadeIn / fadeInFast / fadeInSlow
- slideUp / slideDown / slideLeft / slideRight
- scaleIn / scaleInCenter
- springIn
- buttonTap / hoverScale
- staggerContainer / staggerItem

使用方式：`import { fadeIn } from '@/lib/motion'` 然后配合 Framer Motion `AnimatePresence`

## 10) 常用命令（可复制）

- 安装依赖：`npm install`
- 开发运行：`npm run dev`
- 构建：`npm run build`
- 类型检查：`npm run check`
- 自测：`node scripts/self-test.mjs`
- 预检：`node scripts/preflight.mjs`

## 11) 测试门禁 / 验收门禁

### self-test.mjs 检查项

- package.json exists
- src directory exists
- App.tsx exists
- main.tsx exists
- components directory exists
- lib directory exists
- docs directory exists

### preflight.mjs 检查项

- package.json scripts 完整性
- AGENTS.md 存在性
- docs/ 目录存在性
- src/ 目录存在性
- index.html 存在性

### 必跑验证

- `npm run build` - 构建成功
- `npm run check` - 类型检查通过
- `node scripts/self-test.mjs` - 自测通过
- `node scripts/preflight.mjs` - 预检通过

### 手测清单

1. 首页正常加载：http://localhost:5173
2. 组件示例展示正常
3. 主题切换正常工作（点击切换按钮）

## 12) UI / 交互风格约束

- 视觉风格关键词：Web OS 风格、简洁、现代
- 禁止的 UI 变化：
  - 不要改整体布局
  - 不要改配色体系
  - 不要新增第二套风格
  - 不要引入第二套实现方式
- 必须保持的交互：
  - 键盘可用
  - 无障碍支持（focus-visible、aria-*）

## 13) 后续修改时必须先读的文件

### 必读顺序（按优先级）

1. **docs/PROJECT_CONTRACT.md** - 项目目标和约束（最高优先级）
2. **docs/UI_STYLE_GUIDE.md** - UI 风格体系
3. **docs/STYLE_FINGERPRINT.md** - 样式 DNA
4. **AGENTS.md** - AI Agent 工作约束
5. **AGENT_HANDOFF.md** - 项目上下文
6. **src/lib/theme.ts** - 主题系统和颜色 tokens
7. **src/lib/motion.ts** - 动画预设
8. **src/components/ui/Button.tsx** - 组件 API 风格

### 新增规则文件说明

- **docs/PROJECT_CONTRACT.md**：已创建，定义项目目标、技术边界、Local First 原则
- **docs/UI_STYLE_GUIDE.md**：已创建，定义色彩体系、圆角规则、Typography、深色模式
- **docs/STYLE_FINGERPRINT.md**：已创建，定义项目视觉 DNA、动画节奏、禁止事项
- **START_HERE_FOR_AI.md**：不存在（需从 w0nderful-agent-skills 添加，但默认只读不修改）

## 14) 规则文件优先级

### 优先级顺序

1. **P0 - 不可违背**：
   - PROJECT_CONTRACT.md（项目目标）
   - STYLE_FINGERPRINT.md（样式 DNA）

2. **P1 - 强约束**：
   - UI_STYLE_GUIDE.md（UI 风格）
   - AGENTS.md（AI 工作约束）

3. **P2 - 参考**：
   - AGENT_HANDOFF.md（项目上下文）
   - README.md

### 冲突处理

- P0 规则 > P1 规则 > P2 规则
- 如有冲突，以上级文件为准
- STYLE_FINGERPRINT 是最终判定标准

## 15) 已知问题（长期有效）

- 问题 1：（暂无记录，持续补充）

## 16) 禁止破坏的功能（回归清单）

- 不可破坏点 1：构建成功（`npm run build`）
- 不可破坏点 2：类型检查通过（`npm run check`）
- 不可破坏点 3：UI 组件基本功能可用
- 不可破坏点 4：主题切换功能

## 17) 最近稳定基线（用于对话过长重启）

- 最近一次"确认稳定"的日期：2026-05-07
- 当时通过的验证命令：`npm run build` + `npm run check` + `node scripts/self-test.mjs` + `node scripts/preflight.mjs`
- 当时的关键行为：项目初始化完成，规则文件创建完成

## 18) 最近一次修改摘要（只写结论）

- 修改日期：2026-05-07
- 改了什么：
  1. 克隆并初始化项目
  2. 安装依赖 @emotion/is-prop-valid 修复启动错误
  3. 生成 AGENT_HANDOFF.md 项目专属 Skill
- 为什么改：建立项目文档，方便后续 AI Agent 接手
- 验证方式与结果：所有测试通过

## 19) 下一轮建议

- 建议 1：创建 docs/PROJECT_CONTRACT.md 定义项目目标
- 建议 2：创建 docs/UI_STYLE_GUIDE.md 定义 UI 风格指南
- 建议 3：创建 docs/STYLE_FINGERPRINT.md 定义样式一致性规则

## 20) 本文件更新规则（强制）

- 只记录长期有效信息；不要写流水账/聊天过程/一次性输出
- 每轮任务结束只增量更新；尽量不大改结构
- 若本轮没有新增长期信息：不要为了"看起来更新"而改动