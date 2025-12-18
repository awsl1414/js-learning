# 项目概述 - JavaScript 学习项目

这是一个专门用于学习 JavaScript 编程语言的项目。项目为中文项目，重点关注 JavaScript 语言的核心概念和最佳实践。

## 项目信息
- **项目名称**: js-learning
- **项目类型**: JavaScript 学习项目
- **开发语言**: TypeScript (ES2025 标准)
- **运行时环境**: Bun

## 技术栈
- **运行时**: Bun v1.3.5
- **语言**: TypeScript + JavaScript
- **模块系统**: ES Modules (type: "module")
- **目标标准**: ESNext (ES2025)
- **编译选项**: 严格模式启用

## 项目结构
```
js-learning/
├── index.ts          # 主入口文件
├── package.json      # 项目配置和依赖
├── tsconfig.json     # TypeScript 编译配置
├── README.md         # 项目说明文档
├── bun.lock          # Bun 锁定文件
└── .gitignore        # Git 忽略文件
```

## 代码风格和约定
- 使用 TypeScript 严格模式
- 支持 JSX (React)
- 禁用未使用变量检查 (noUnusedLocals: false)
- 模块解析使用 bundler 模式
- 允许导入 TypeScript 扩展名
- 使用 ESNext 模块语法

## 入口点
- **主文件**: index.ts
- **运行命令**: `bun run index.ts`

## 开发环境
- 操作系统: Darwin (macOS)
- 包管理器: Bun
- TypeScript 版本: ^5