# CHANGE_PROTOCOL.md - 变更协议

本文件定义项目变更的管理方式。

## 变更分类

### 1. 小改动

- 修复拼写错误
- 调整样式细节
- 添加注释
- 优化代码结构（不改变功能）

**处理方式**：直接修改，提交前自检

### 2. 中等改动

- 新增组件
- 新增样式 token
- 修复 bug
- 改进交互

**处理方式**：修改后运行完整验证

### 3. 大改动

- 新增功能模块
- 修改架构
- 新增依赖
- 变更 UI 风格

**处理方式**：
1. 先写计划
2. 评审改动影响
3. 分步实施
4. 完整验证

## 验证要求

所有变更必须通过：

```bash
npm run build    # 构建
npm run check    # 类型检查
node scripts/self-test.mjs   # 自测
node scripts/preflight.mjs   # 预检
```

## 禁止事项

- 不引入未验证的依赖
- 不破坏已有功能
- 不改变 UI 风格（除非明确计划）
- 不删除已有组件（除非明确废弃）

## 更新文档

变更后需要更新的文档：
- 代码改动 → CODE_CONVENTIONS.md
- UI 改动 → UI_STYLE_GUIDE.md
- 架构改动 → ARCHITECTURE.md
- 风格改动 → STYLE_FINGERPRINT.md