# AGENTS.md

## 项目定位

Web OS UI Kit Builder —— 高级、优雅、现代的 Web OS 风格 UI Kit 主题搭配生成器。

## 技术栈

- Vite + React 18 + TypeScript
- Tailwind CSS + Framer Motion
- Radix UI + cva + lucide-react
- 纯前端、Local First、GitHub Pages 可部署

## 开发规则

### 必须遵守

- 纯前端，无后端、无数据库、无登录
- 所有按钮真实可用，不做空壳 UI
- localStorage 保存配置，刷新恢复
- 每轮少读文件、少改范围、省 token
- 不修改 SSH / WARP / 防火墙 / 系统网络配置

### 禁止事项

- 不要顺手重构无关代码
- 不要引入第二套实现方式
- 不要删除已有功能、动画或测试
- 不要使用临时 hack 糊过去
- 不要自动 push / release / 发布

### 文档优先

修改前先读：
- `docs/PROJECT_CONTRACT.md`
- `docs/ARCHITECTURE.md`
- `docs/UI_STYLE_GUIDE.md`

### 验收门禁

每次修改后必须运行：
```bash
npm run build
npm run check
npm run self-test
npm run preflight
```

## 文件结构

```
src/
  App.tsx            # 主应用入口
  main.tsx           # React 入口
  index.css          # 全局样式 + CSS Variables
  lib/               # 核心逻辑层
    themes.ts        # 主题定义
    motion.ts        # 全局动画系统
    storage.ts       # localStorage
    export.ts        # 导出功能
    applyTheme.ts    # 主题应用
    builder.ts       # Builder 状态管理
    utils.ts         # 工具函数
  components/
    builder/         # Builder 布局组件
    ui/              # 通用 UI 组件
docs/                # 项目标准层文档
scripts/             # 自测脚本
```

## 当前状态

- 版本：v0.1.0
- 阶段：阶段 1 - 项目骨架搭建中
- 下一阶段：核心 lib 层实现
