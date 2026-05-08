# AGENT_HANDOFF.md

## 项目基本信息

- 项目名：web-os-ui-kit-builder
- 项目类型：前端
- 维护状态：活跃 / 稳定基线

## 项目定位

高级、优雅、现代的 Web OS 风格 UI Kit 主题搭配生成器。用户自由搭配整套 UI 风格，实时预览，一键导出。

Design System Workbench - 完整的设计系统工作台，包含主题选择、背景风格、组件样式、动画配置、token 检查、导出功能。

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

- 版本号：v1.0.0
- 阶段：稳定基线，可发布
- 状态：Design System Workbench 完整闭环

## 功能闭环

1. **Preset Gallery** - 8 套高级预设一键应用
2. **Showcase Scene Switcher** - 7 种真实场景预览
3. **Preview Surface System** - 多材质表面系统
4. **Token Inspector** - 设计系统 token 查看与复制
5. **IntegrationGuide** - 5 种集成方式示例
6. **Starter Kit ZIP Export** - 一键下载完整 starter kit

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
│   │   ├── motion.ts            # 7 级动画系统 (off/subtle/normal/expressive/cinematic/elastic/snappy)
│   │   ├── storage.ts            # localStorage 持久化
│   │   ├── applyTheme.ts        # 主题应用到 CSS Variables
│   │   ├── export.ts            # 5 种导出格式 + Starter Kit ZIP
│   │   ├── previewSurfaces.ts   # Surface class 映射
│   │   └── utils.ts             # cn() / copyText() / downloadTextFile()
│   ├── components/
│   │   ├── ui/                  # 12 个基础 UI 组件
│   │   └── builder/             # 20+ 个 Builder 组件
├── docs/                        # 项目标准层文档
├── scripts/                     # self-test.mjs / preflight.mjs
├── package.json
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── index.html
```

## 常用命令

```bash
npm install          # 安装依赖
npm run dev          # 开发运行
npm run build        # 构建 (tsc --noEmit && vite build)
npm run check        # 类型检查
npm run self-test    # 自测 (140 项)
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
- Surface class 来自 `src/lib/previewSurfaces.ts`
- 不允许在组件中硬编码色值或动画参数
- 组件 variants 必须使用 cva 管理
- 所有按钮必须真实可用，不做空壳 UI
- 不破坏现有 6 大功能闭环

## 禁止事项

- 不破坏现有文档结构
- 不破坏构建流程
- 不破坏类型检查
- 不破坏 lib 层接口
- 不破坏 UI 组件接口
- 不破坏 Builder 组件接口
- 不引入第二套实现方式
- 不删除已有功能或动画
- 不自动 push / release / tag

## localStorage

- **Key**: `ui-kit-builder-config`
- **保存内容**: 完整 BuilderConfig (20+ 字段)

## 导出功能

- Copy CSS Variables
- Download theme.css
- Copy Tailwind Config
- Download ui-kit.json
- Copy React Token Object
- Download Starter Kit ZIP

## GitHub Pages

- base: `/web-os-ui-kit-builder/`
- 构建产物：`dist/`

## 最近稳定基线

- 日期：2026-05-08
- 版本：v1.0.0
- 提交：766fbaf
- 测试：build ✅ | check ✅ | self-test 140/140 ✅ | preflight 21/21 ✅

## 后续建议

- Three.js / 3D Showcase Layer 只在 v1.1.0 或之后开始
- v1.0.0 稳定版不做大功能改动
- 发版前运行完整测试套件
- 保持文档与代码同步