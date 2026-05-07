# PROJECT_CONTRACT.md

## 项目定位

Web OS UI Kit Builder —— 高级、优雅、现代的 Web OS 风格 UI Kit 主题搭配生成器。

## 核心价值

让用户自由搭配整套网页 UI 风格，实时预览，一键导出。

## 技术栈

- Vite 5 + React 18 + TypeScript
- Tailwind CSS 3 + Framer Motion 11
- Radix UI + cva + lucide-react

## 架构原则

### 纯前端

- 无后端、无数据库、无登录
- GitHub Pages 可部署
- Local First、离线可用

### 代码规范

- TypeScript 严格模式
- 组件单一职责
- 不引入第二套实现方式
- 不删除已有功能或动画

### 文档优先

- 修改前先读 `docs/`
- 保持文档与代码同步
- 重大变更必须记录

## 功能边界

### 必须实现

- 20+ 开发者主题（各支持 light/dark）
- 12 种背景风格
- 5 级全局动画系统
- 8 类样式配置项
- 左侧实时预览 + 右侧控制台
- 5 种导出格式
- localStorage 持久化

### 不做

- 后端服务
- 用户登录 / 注册
- 数据库存储
- 空壳 UI / 假按钮
- 大白板 / 毛坯 demo

## 质量门禁

### 构建

```bash
npm run build    # 必须通过
npm run check    # 类型检查必须通过
```

### 测试

```bash
npm run self-test    # 自测必须通过
npm run preflight    # 预检必须通过
```

### 手测清单

- 主题切换实时生效
- 背景切换实时生效
- Light/Dark 切换正常
- 导出功能可用
- localStorage 保存恢复正常

## UI 风格约束

- Web OS 气质
- 深色模式优先
- 卡片式布局
- 所有按钮真实有反馈
- 动画流畅但不浮夸
- 移动端可用

## 部署

- GitHub Pages 兼容
- base path: `/web-os-ui-kit-builder/`
- 构建产物：`dist/`
