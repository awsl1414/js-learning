# 常用命令指南

## 基础开发命令

### 依赖管理
```bash
# 安装依赖
bun install

# 添加新依赖
bun add <package-name>

# 添加开发依赖
bun add -D <package-name>

# 移除依赖
bun remove <package-name>
```

### 运行和执行
```bash
# 运行主文件
bun run index.ts

# 直接运行文件
bun <filename>

# 热重载模式运行
bun --hot index.ts
```

### TypeScript 编译
```bash
# 类型检查
bun tsc --noEmit

# 编译 TypeScript
bun build <file.ts>
```

### 测试命令
```bash
# 运行测试
bun test

# 运行特定测试文件
bun test <filename.test.ts>
```

### 构建和打包
```bash
# 构建项目
bun build <file>

# 构建 HTML 文件
bun build <file.html>

# 构建 CSS 文件
bun build <file.css>
```

### 包管理命令
```bash
# 运行脚本
bun run <script-name>

# 执行包命令
bunx <package> <command>
```

## 开发工具命令

### 文件操作 (Darwin/macOS)
```bash
# 列出文件
ls -la

# 查找文件
find . -name "*.ts" -type f

# 搜索文件内容
grep -r "pattern" .

# 显示文件内容
cat <filename>

# 编辑文件
nano <filename>
# 或使用 vim
vim <filename>
```

### Git 操作
```bash
# 初始化仓库
git init

# 查看状态
git status

# 添加文件到暂存区
git add .

# 提交更改
git commit -m "commit message"

# 查看提交历史
git log --oneline
```

## 环境特定命令

### Bun 特有功能
```bash
# 创建新项目
bun init

# 运行服务器 (如果有)
bun serve

# 数据库操作 (如果使用 sqlite)
# 使用 bun:sqlite 模块
```

### 开发模式
```bash
# 启用开发模式 (HMR)
bun --hot index.ts

# 启用开发模式控制台
bun --hot --console index.ts
```