# AGENT_HANDOFF.md

## 项目基本信息

- 项目名：web-os-ui-kit-builder
- 项目类型：前端
- 维护状态：活跃 / 稳定基线

## 项目定位

高级、优雅、现代的 Web OS 风格 UI Kit 主题搭配生成器。用户自由搭配整套 UI 风格，实时预览，一键导出。

不做什么：不做后端、不做登录、不做数据库、不做空壳 UI。

## 技术栈

- 语言：TypeScript
- 框架：React 18
- 构建工具：Vite 5
- 包管理器：npm
- 样式：Tailwind CSS 3 + Framer Motion 11
- 组件变体：cva
- 图标：lucide-react

## 当前稳定版本

- 版本号：v0.6.0
- 阶段：阶段 6 - 最终验收完成
- 状态：稳定基线，可发布

## 文件结构

```
app/
├── src/
│   ├── main.tsx                 # React 入口
│   ├── App.tsx                  # 主应用（加载 config，渲染 BuilderLayout）
│   ├── index.css                # 全局样式 + CSS Variables
│   ├── lib/
│   │   ├── builder.ts           # 配置类型 + 默认值 + 可选项数组
│   │   ├── themes.ts            # 20 主题 × 2 模式
│   │   ├── motion.ts            # 5 级动画系统
│   │   ├── storage.ts           # localStorage 持久化
│   │   ├── applyTheme.ts        # 主题应用到 CSS Variables
│   │   ├── export.ts            # 5 种导出格式
│   │   └── utils.ts             # cn() / copyText() / downloadTextFile()
│   ├── components/
│   │   ├── ui/                  # 12 个基础 UI 组件
│   │   └── builder/             # 16 个 Builder 组件
├── docs/                        # 项目标准层文档
├── scripts/                     # self-test.mjs / preflight.mjs
├── package.json
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── index.html
```

## 核心模块

### lib 层

| 文件 | 职责 |
|------|------|
| builder.ts | BuilderConfig 类型、20 主题、12 背景、所有可选项数组、DEFAULT_CONFIG |
| themes.ts | 20 个主题定义，每个主题包含 light/dark 两套完整 token |
| motion.ts | 5 级 Motion System，统一管理所有动画参数 |
| storage.ts | localStorage 持久化，key: `ui-kit-builder-config` |
| applyTheme.ts | 将 config 写入 document.documentElement CSS Variables |
| export.ts | 5 种导出格式生成 |
| utils.ts | cn() / copyText() / downloadTextFile() |

### UI 组件层

| 组件 | variants |
|------|----------|
| Button | solid / soft / outline / ghost / gradient / glass / neon |
| Card | solid / glass / bordered / elevated / floating / terminal |
| Input | filled / outline / minimal / glass / terminal |
| Badge | default / secondary / success / warning / info / destructive |
| Alert | default / destructive / success / warning / info |
| Dialog | - |
| Tabs | - |
| Switch | - |
| Progress | - |
| Table | - |
| Toast | - |
| CodeBlock | - |

### Builder 组件层

| 组件 | 职责 |
|------|------|
| BuilderLayout | 左右双栏布局 |
| ControlPanel | 右侧控制台（所有配置项） |
| LivePreview | 左侧实时预览入口 |
| PreviewApp | 完整 Web App 预览 |
| PreviewShell | App Shell 布局 |
| ThemePicker | 20 主题选择器 |
| BackgroundPicker | 12 种背景选择器 |
| StyleOptionGroup | 通用样式选项组 |
| ExportPanel | 5 种导出功能 |
| MotionPreview | 动画预览 |
| TokenPreview | Token 预览 |
| CommandPalettePreview | 命令面板 |
| FloatingWindowPreview | 浮动窗口 |
| SettingsPanelPreview | 设置面板 |
| EmptyStatePreview | 空状态 |
| ActivityPanelPreview | 活动面板 |

## 常用命令

```bash
npm install          # 安装依赖
npm run dev          # 开发运行
npm run build        # 构建 (tsc --noEmit && vite build)
npm run check        # 类型检查
npm run self-test    # 自测 (49 项)
npm run preflight    # 预检 (21 项)
```

## 测试门禁

- `npm run build` 必须通过
- `npm run check` 必须通过
- `npm run self-test` 必须通过
- `npm run preflight` 必须通过

## 修改前必读文件

1. `AGENTS.md` - 项目规则
2. `docs/PROJECT_CONTRACT.md` - 项目契约
3. `docs/ARCHITECTURE.md` - 架构设计
4. `docs/UI_STYLE_GUIDE.md` - UI 风格指南
5. `docs/STYLE_FINGERPRINT.md` - 风格指纹

## 核心规则

- 主题颜色必须来自 `src/lib/themes.ts`
- 动画参数必须来自 `src/lib/motion.ts`
- 配置项定义必须来自 `src/lib/builder.ts`
- 不允许在组件中硬编码色值或动画参数
- 组件 variants 必须使用 cva 管理
- 所有按钮必须真实可用，不做空壳 UI

## 禁止事项

- 不破坏现有文档结构
- 不破坏构建流程
- 不破坏类型检查
- 不破坏 lib 层接口
- 不破坏 UI 组件接口
- 不破坏 Builder 组件接口
- 不引入第二套实现方式
- 不删除已有功能或动画
- 不自动 push / release

## localStorage

- **Key**: `ui-kit-builder-config`
- **保存内容**: themePreset、mode、backgroundStyle、radius、shadow、density、buttonStyle、cardStyle、inputStyle、motionLevel、fontScale

## 导出功能

- Copy CSS Variables
- Download theme.css
- Copy Tailwind Config
- Download ui-kit.json
- Copy React Token Object

## GitHub Pages

- base: `/web-os-ui-kit-builder/`
- 构建产物：`dist/`

## 最近稳定基线

- 日期：2026-05-07
- 阶段：v0.6.0 最终验收完成
- 测试：build ✅ | check ✅ | self-test 49/49 ✅ | preflight 21/21 ✅

## 后续建议

- 如需新功能，新开分支开发
- 发版前运行完整测试套件
- 保持文档与代码同步
