# CHANGE_PROTOCOL.md

## 变更流程

### 1. 读取相关文档

修改前必须读取：
- `AGENTS.md`
- `docs/PROJECT_CONTRACT.md`
- `docs/ARCHITECTURE.md`
- `docs/UI_STYLE_GUIDE.md`

### 2. 确认变更范围

- 只改必要的文件
- 不顺手重构无关代码
- 不引入第二套实现

### 3. 执行变更

- 小步修改
- 保持风格一致
- 遵守代码规范

### 4. 验证变更

```bash
npm run build
npm run check
npm run self-test
npm run preflight
```

### 5. 报告变更

必须说明：
- 改了什么
- 为什么改
- 如何验证
- 风险/回滚点

## 版本规则

### 版本号格式

`MAJOR.MINOR.PATCH`

- MAJOR：破坏性变更
- MINOR：新增功能
- PATCH：修复问题

### 更新时机

- 每个稳定阶段结束时更新版本号
- 更新 `RELEASE_NOTES.md`
- 更新 `AGENT_HANDOFF.md`

## 回滚策略

### 本地回滚

```bash
git stash        # 暂存当前修改
git checkout .   # 恢复到上次提交
```

### 远程回滚

```bash
git revert HEAD  # 创建回滚提交
git push         # 推送回滚
```

## 禁止的变更

- 删除已有功能
- 删除已有动画
- 删除已有测试
- 引入第二套实现
- 修改测试来掩盖问题
- 使用临时 hack
