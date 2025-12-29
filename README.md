# JavaScript 学习项目

本项目是一个专门用于学习 JavaScript 编程语言的项目，使用现代 ES2025 标准。

## 安装依赖

```bash
bun install
```

## 运行项目

```bash
bun run index.js
```

## 开发模式（热重载）

```bash
bun --hot index.js
```

## 项目特点

- 使用纯 JavaScript 进行开发
- 遵循 ES2025 (ESNext) 最新标准
- 基于 Bun 快速 JavaScript 运行时
- 严格模式编程，确保代码质量
- 支持现代 JavaScript 特性

## 学习内容

- JavaScript 核心概念和语法
- 异步编程（Promise、async/await）
- ES6+ 模块系统
- 现代 JavaScript 特性
- DOM 操作和事件处理

## 使用说明

### 启动学习系统

```bash
bun run index.js
```

### 交互式命令

- `1` 或 `modules` - 查看所有学习模块
- `2` 或 `progress` - 查看学习进度
- `3` 或 `search` - 搜索课程内容
- `4` 或 `quick` - 快速测试模式
- `5` 或 `recommend` - 查看推荐学习路径
- `run <课程ID>` - 运行指定课程（如：`run 01-variables`）
- `module <模块ID>` - 运行整个模块（如：`module 01-basics`）
- `help` - 显示帮助信息
- `exit` 或 `quit` - 退出程序

### 学习路径

1. **JavaScript 基础** (01-basics)
   - 变量声明 (let、const、var)
   - 数据类型
   - 运算符
   - 控制流
   - 函数

2. **JavaScript 进阶** (02-intermediate)
   - 对象和数组
   - 作用域和闭包
   - this 关键字
   - ES6+ 新特性

3. **异步编程** (03-async)
   - 回调函数
   - Promise
   - async/await
   - 事件循环

4. **模块系统** (04-modules)
   - ES6 模块
   - 导入导出
   - 动态导入

5. **DOM 操作** (05-dom)
   - DOM 选择和操作
   - 事件处理
   - Fetch API
   - 本地存储

## 项目特点

- 🎓 渐进式学习路径
- 💻 丰富的代码示例
- 📝 理论与实践结合
- 🔄 交互式练习
- 📊 进度追踪系统
- 🔍 搜索功能
- 💡 错误示例对比
- 📚 练习题与参考答案分离

## 练习与答案

项目包含 15 个模块共 30 套练习题，每套练习都有对应的参考答案：

### 目录结构

```
js-learning/
├── docs/                   # 学习文档
│   ├── 01-变量与类型/
│   ├── 02-运算符/
│   └── ...
├── exercises/              # 练习题
│   ├── 01-变量与类型/
│   │   ├── 01-变量声明练习.js
│   │   └── 02-数据类型练习.js
│   └── ...
└── solutions/              # 参考答案
    ├── 01-变量与类型/
    │   ├── 01-变量声明练习.solution.js
    │   └── 02-数据类型练习.solution.js
    └── ...
```

### 运行练习

```bash
# 运行练习题
bun test exercises/02-运算符/01-运算符基础练习.js

# 查看参考答案
cat solutions/02-运算符/01-运算符基础练习.solution.js
```

### 练习说明

- **练习题** (`exercises/`): 包含待完成的代码，使用 `???` 或注释标记需要填写的部分
- **参考答案** (`solutions/`): 完整的实现代码，可供学习和对照

本项目使用 `bun init` 在 bun v1.3.5 中创建。[Bun](https://bun.com) 是一个快速的 JavaScript 全栈运行时。
