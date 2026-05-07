# docs/PROJECT_CONTRACT.md

> 本文件定义项目目标和约束，是 AI Agent 理解项目"做什么"的核心文档。

---

## 1. 项目定位

### 一句话定义

**w0nderful-ui-foundation** 是为 Local First / GitHub Pages / Web OS 风格小工具提供可复用的 UI 基础设施。

### 项目目标

1. 沉淀统一的页面风格
2. 沉淀配色方案（亮色/暗色）
3. 沉淀动画系统
4. 提供可复用的基础组件

---

## 2. 不做什么

### 明确排除项

- ❌ 不做业务功能
- ❌ 不接数据库
- ❌ 不做登录
- ❌ 不做云同步
- ❌ 不做 Electron / Tauri
- ❌ 不做复杂工作流
- ❌ 不做第三方集成

---

## 3. 技术边界

### 技术栈

- **框架**：React 18 + TypeScript 5
- **构建**：Vite 5
- **样式**：Tailwind CSS 3（使用 cva）
- **UI 库**：Radix UI（无头组件）
- **动画**：Framer Motion
- **图标**：lucide-react
- **工具**：class-variance-authority, tailwind-merge

### 技术边界原则

- 纯前端，无后端依赖
- 无需数据库
- 无需用户系统
- 无需云服务
- GitHub Pages Ready

---

## 4. Local First 原则

### 定义

所有数据存在本地，不依赖云服务。

### 原则

1. ✅ 数据本地存储（localStorage）
2. ✅ 可导入导出
3. ✅ 离线可用
4. ✅ 无需登录即可使用
5. ✅ 不强制联网

### 禁止

- ❌ 必须联网才能运行
- ❌ 必须登录才能使用
- ❌ 数据存在服务端

---

## 5. GitHub Pages 原则

### 部署方式

- 构建产物：`dist/` 目录
- 托管：GitHub Pages
- 触发：main 分支 push

### 原则

1. ✅ `npm run build` 生成静态产物
2. ✅ 产物在 `dist/` 目录
3. ✅ 支持 SPA 路由（hash 或 rewrite）
4. ✅ 无需后端服务

### 禁止

- ❌ 构建产物包含敏感信息
- ❌ 硬编码 API 地址

---

## 6. 无后端原则

### 定义

纯静态前端，无服务端代码。

### 原则

1. ✅ 所有代码在前端运行
2. ✅ 无需部署服务器
3. ✅ 无 API 调用（除非公开 API）
4. ✅ 无数据库连接

### 禁止

- ❌ Node/Express 服务端
- ❌ Python/Flask 后端
- ❌ 数据库连接
- ❌ 代理服务

---

## 7. 组件目标

### 现有组件（12 个）

| 组件 | 用途 |
|------|------|
| Button | 按钮 |
| Badge | 标签 |
| Card | 卡片 |
| Switch | 开关 |
| Tabs | 标签页 |
| Dialog | 对话框 |
| Toast | 提示 |
| Toaster | 提示展示 |
| Toolbar | 工具栏 |
| Dock | 停靠栏 |
| Window | 窗口 |
| useToast | Hook |

### 组件原则

1. ✅ 可独立使用
2. ✅ 无业务逻辑
3. ✅ 使用 cva 定义变体
4. ✅ 支持 dark mode
5. ✅ 支持 keyboard navigation
6. ✅ 符合 STYLE_FINGERPRINT

### 新增组件规范

- 必须符合 UI_STYLE_GUIDE
- 必须符合 STYLE_FINGERPRINT
- 必须使用 cva + forwardRef
- 必须支持 dark mode

---

## 8. AI Agent 修改约束

### 修改前必读

1. **AGENTS.md** - AI Agent 工作入口
2. **AGENT_HANDOFF.md** - 项目上下文
3. **docs/PROJECT_CONTRACT.md** - 项目目标（本文件）
4. **docs/UI_STYLE_GUIDE.md** - UI 风格
5. **docs/STYLE_FINGERPRINT.md** - 样式 DNA

### 修改约束

1. 🚫 不做业务功能
2. 🚫 不引入第二套实现
3. 🚫 不新增第二套风格
4. 🚫 不破坏现有组件
5. 🚫 不改 primary 颜色

### 修改后验证

- `npm run build` - 构建成功
- `npm run check` - 类型通过
- `node scripts/self-test.mjs` - 自测通过
- `node scripts/preflight.mjs` - 预检通过

---

## 9. 发布门禁

### 发布前检查

- [ ] 版本号更新（package.json version）
- [ ] 构建成功（`npm run build`）
- [ ] 类型检查通过（`npm run check`）
- [ ] 自测通过（`node scripts/self-test.mjs`）
- [ ] 预检通过（`node scripts/preflight.mjs`）
- [ ] README 更新（如有必要）
- [ ] RELEASE_NOTES 更新

### 禁止

- ❌ 不检查就发布
- ❌ 构建失败就发布
- ❌ 破坏现有功能就发布

---

## 10. 测试门禁

### 必须运行

```bash
npm run build          # 构建
npm run check        # 类型检查
node scripts/self-test.mjs    # 自测
node scripts/preflight.mjs     # 预检
```

### 门禁规则

- 构建失败 ❌ 不允许合并
- 类型错误 ❌ 不允许合并
- 自测失败 ❌ 不允许合并
- 预检失败 ⚠️ 需评估

### 手测清单

1. 首页正常加载
2. 组件示例展示正常
3. 主题切换正常

---

## 11. 长期维护原则

### 维护目标

- 保持代码简洁
- 保持风格统一
- 保持可扩展性

### 维护禁止

- ❌ 不盲目添加组件
- ❌ 不引入复杂依赖
- ❌ 不破坏向后兼容
- ❌ 不创建重复实现

### 维护建议

1. 复用现有组件
2. 复用现有工具函数
3. 复用现有动画预设
4. 复用 themeTokens
5. 定期运行测试门禁

---

## 更新日志

- 2026-05-07：初始化，基于 AGENTS.md 提取