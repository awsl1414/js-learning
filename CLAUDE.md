# JavaScript 学习项目 - AI 开发规范

## 项目概述

本项目是一个**交互式 JavaScript 学习系统**，使用现代 ES2025 标准和 Bun 运行时。包含 15 个学习模块，每个模块都有：
- 📚 学习文档 (`docs/`)
- 📝 练习题 (`exercises/`)
- ✅ 参考答案 (`solutions/`)

## Bun 运行时规范

**优先使用 Bun 而不是 Node.js。**

### 基本命令

- 使用 `bun <file>` 而不是 `node <file>` 或 `ts-node <file>`
- 使用 `bun test` 而不是 `jest` 或 `vitest`
- 使用 `bun build <file.html|file.ts|file.css>` 而不是 `webpack` 或 `esbuild`
- 使用 `bun install` 而不是 `npm install`、`yarn install` 或 `pnpm install`
- 使用 `bun run <script>` 而不是 `npm run <script>`、`yarn run <script>` 或 `pnpm run <script>`
- 使用 `bunx <package> <command>` 而不是 `npx <package> <command>`
- Bun 自动加载 .env 文件，无需使用 dotenv

### Bun APIs

- `Bun.serve()` 支持 WebSockets、HTTPS 和路由。不要使用 `express`。
- 使用 `bun:sqlite` 处理 SQLite。不要使用 `better-sqlite3`。
- 使用 `Bun.redis` 处理 Redis。不要使用 `ioredis`。
- 使用 `Bun.sql` 处理 Postgres。不要使用 `pg` 或 `postgres.js`。
- `WebSocket` 是内置的。不要使用 `ws`。
- 优先使用 `Bun.file` 而不是 `node:fs` 的 readFile/writeFile
- 使用 Bun.$`ls` 而不是 execa。

## 项目结构规范

```
js-learning/
├── docs/           # 学习文档 (15个模块)
├── exercises/      # 练习题 (30套)
├── solutions/      # 参考答案 (30套，与练习一一对应)
├── index.js        # 主入口文件
├── package.json    # 使用 ES Modules ("type": "module")
└── CLAUDE.md       # 本文件
```

## 测试规范

使用 `bun test` 运行测试。

### 测试文件格式

```javascript
#!/usr/bin/env bun
import { test, expect, describe } from "bun:test";

describe("模块XX - 功能描述", () => {
  test("测试用例描述", () => {
    const result = someFunction();
    expect(result).toBe(expectedValue);
  });
});
```

### 练习文件规范

练习文件必须包含：
1. **Shebang**: `#!/usr/bin/env bun`
2. **导入测试框架**: `import { test, expect } from "bun:test";`
3. **任务函数**: 每个任务都是一个独立的函数
4. **测试用例**: 每个任务都有对应的测试
5. **占位符**: 使用 `???` 或注释标记待填写部分

```javascript
#!/usr/bin/env bun
/**
 * 模块 XX: 功能描述
 *
 * 学习目标:
 * - 目标1
 * - 目标2
 */

import { test, expect } from "bun:test";

/**
 * 任务 1: 任务描述
 */
function task01() {
  // TODO: 在这里实现
  const result = ???;
  return result;
}

// 测试
test("任务 1: 测试描述", () => {
  expect(task01()).toBe(expectedValue);
});
```

### 答案文件规范

答案文件必须：
1. 与练习文件同名，添加 `.solution` 后缀
2. 包含完整的实现代码
3. 保留所有测试用例
4. 添加注释说明关键点

## 学习模块开发规范

### 新增模块流程

1. **创建文档** (`docs/XX-模块名/README.md`):
   - 使用 Markdown 格式
   - 包含代码示例（使用 ✅ 推荐 vs ⚠️ 不推荐）
   - 添加最佳实践章节
   - 使用 ES2025 语法

2. **创建练习文件** (`exercises/XX-模块名/`):
   - 文件命名: `01-基础练习.js`, `02-综合挑战.js`
   - 使用占位符标记待填写部分
   - 编写完整的测试用例
   - 添加友好提示

3. **创建答案文件** (`solutions/XX-模块名/`):
   - 与练习文件一一对应
   - 提供完整实现
   - 添加注释说明

### 文档编写规范

#### Markdown 结构

```markdown
# 模块 XX: 模块名称

> 📖 **学习目标**: 简明扼要的学习目标

## 目录

1. [章节一](#1-章节一)
2. [章节二](#2-章节二)

---

## 1. 章节一

### 1.1 小节

```javascript
// ✅ 推荐做法
const good = "example";

// ⚠️ 不推荐
const bad = "example";
```

---

## 最佳实践

- 实践1
- 实践2

---

**下一步**: 完成 `exercises/XX-模块名/` 目录下的练习题 🚀
```

#### 代码注释规范

- 使用中文注释
- `// ✅` 标记推荐做法
- `// ⚠️` 标记需要注意的地方
- `// ❌` 标记错误做法
- `// TODO:` 标记待完成项

## JavaScript 代码规范

### ES2025 特性优先

- 优先使用 `const` 和 `let`，避免 `var`
- 使用箭头函数 `() => {}`
- 使用模板字符串 `` `Hello ${name}` ``
- 使用解构赋值 `const { name, age } = user;`
- 使用数组方法 `map()`, `filter()`, `reduce()`
- 使用可选链 `user?.profile?.name`
- 使用空值合并 `value ?? defaultValue`
- 使用 `async/await` 处理异步

### 代码风格

- 使用 2 空格缩进
- 使用单引号或双引号（保持一致）
- 每行不超过 80 字符
- 函数之间空一行
- 注释前空一行

### 命名规范

- 变量/函数: `camelCase`
- 常量: `UPPER_SNAKE_CASE`
- 类: `PascalCase`
- 私有字段: `_privateField`

## 文件操作规范

### 编辑现有文件

1. **先读取**: 使用 `Read` 工具查看文件内容
2. **再编辑**: 使用 `Edit` 工具进行精确编辑
3. **避免**: 不要使用 `Write` 工具覆盖已存在的文件

### 创建新文件

1. **创建练习文件**: 使用 `Write` 工具
2. **创建答案文件**: 同时创建对应的 `.solution.js`
3. **更新文档**: 更新 `docs/重构进度.md`

## 搜索和查询规范

### 优先使用符号工具

- **代码符号**: 使用 Serena 的 `find_symbol` 工具
- **代码引用**: 使用 `find_referencing_symbols` 工具
- **文件搜索**: 使用 `find_file` 工具
- **模式搜索**: 使用 `search_for_pattern` 工具

### 避免使用 Bash 搜索

- 不要使用 `grep` 直接搜索
- 不要使用 `find` 查找文件
- 不要使用 `cat` 读取文件

## 提交规范

### Git 提交信息格式

```
<type>: <emoji> <subject>

type:
- feat: 新功能
- fix: 修复
- docs: 文档更新
- refactor: 重构
- style: 代码格式
- test: 测试相关
- chore: 构建/工具

emoji:
- :sparkles: (feat) 新功能
- :bug: (fix) 修复 bug
- :book: (docs) 文档
- :recycle: (refactor) 重构
- :white_check_mark: (test) 测试
- :wrench: (chore) 工具配置

示例:
feat: :sparkles: 添加数组练习模块
docs: :book: 更新运算符文档
fix: :bug: 修复测试用例错误
```

## 学习资源规范

### 查阅文档

- Bun API: `node_modules/bun-types/docs/**.mdx`
- MDN: https://developer.mozilla.org/zh-CN/
- ECMAScript: https://tc39.es/ecma262/

### 使用 Context7

使用 `mcp__context7__query-docs` 工具查询最新的库文档。

## 常见任务

### 添加新的练习题

1. 在 `exercises/XX-模块名/` 创建练习文件
2. 在 `solutions/XX-模块名/` 创建对应答案文件
3. 运行 `bun test exercises/XX-模块名/文件名.js` 验证测试
4. 更新 `docs/重构进度.md`

### 更新模块文档

1. 编辑 `docs/XX-模块名/README.md`
2. 确保代码示例可运行
3. 添加 ✅/⚠️/❌ 标记
4. 更新最佳实践章节

### 运行测试

```bash
# 运行单个练习测试
bun test exercises/01-变量与类型/01-变量声明练习.js

# 运行所有测试
bun test

# 运行特定模块的测试
bun test exercises/02-运算符/
```

### 查看答案

```bash
# 查看答案文件
cat solutions/01-变量与类型/01-变量声明练习.solution.js
```

## 注意事项

1. **保持中文化**: 所有文档、注释、提示使用中文
2. **ES2025 标准**: 使用最新的 JavaScript 特性
3. **实践导向**: 理论与实践结合，每个知识点都有练习
4. **测试驱动**: 每个练习都有完整的测试用例
5. **循序渐进**: 从基础到高级，难度递增

## 快速参考

| 命令 | 用途 |
|------|------|
| `bun install` | 安装依赖 |
| `bun run index.js` | 运行主程序 |
| `bun --hot index.js` | 开发模式（热重载） |
| `bun test <file>` | 运行测试 |
| `bun test` | 运行所有测试 |

---
