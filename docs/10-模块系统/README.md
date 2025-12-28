# 模块 10: ES Modules 模块系统

> 📖 **学习目标**: 掌握 JavaScript ES Modules 的导入和导出

## 目录

1. [模块概述](#1-模块概述)
2. [导出 (Export)](#2-导出-export)
3. [导入 (Import)](#3-导入-import)
4. [动态导入](#4-动态导入)
5. [模块最佳实践](#5-模块最佳实践)

---

## 1. 模块概述

### 1.1 ES Modules 特点

```javascript
// ✅ ES Modules (ESM)
// - 静态结构
// - 编译时加载
// - 自动严格模式
// - 作用域隔离
// - 支持 Tree Shaking

// ⚠️ 与 CommonJS 的区别
// CommonJS: require() (动态)
// ES Modules: import (静态)
```

### 1.2 启用 ES Modules

```javascript
// package.json
{
  "type": "module"  // ✅ 启用 ESM
}

// 或使用 .mjs 扩展名
// script.js.mjs

// HTML 中使用
<script type="module" src="app.js"></script>
```

---

## 2. 导出 (Export)

### 2.1 命名导出 ✅

```javascript
// utils.js

// 导出变量
export const PI = 3.14159;
export let count = 0;

// 导出函数
export function add(a, b) {
  return a + b;
}

export const multiply = (a, b) => a * b;

// 导出类
export class Calculator {
  add(a, b) {
    return a + b;
  }
}

// 先声明后导出 ✅
const secret = "hidden";
const publicVar = "visible";

export { secret, publicVar };

// 重命名导出 ✅
export { add as sum, multiply as product };

// ✅ 导出列表
export {
  add,
  multiply,
  Calculator,
  PI
};
```

### 2.2 默认导出 ✅

```javascript
// math.js

// 默认导出 (每个模块只能有一个)
export default function square(x) {
  return x * x;
}

// 或
const square = (x) => x * x;
export default square;

// 或
export default class MathUtils {
  static square(x) {
    return x * x;
  }
}

// ⚠️ 混合命名导出和默认导出 ✅
export const PI = 3.14;
export default square;
```

### 2.3 导出导入的值 ✅

```javascript
// 重导出 (Re-export)
export { add, multiply } from "./utils.js";

// 重导出并重命名
export { add as sum } from "./utils.js";

// 重导出默认
export { default } from "./math.js";

// 重导出所有 (命名导出)
export * from "./utils.js";

// ⚠️ 不会重导出默认
// export * from "./math.js";  // 不包含默认导出
```

### 2.4 导出注意事项

```javascript
// ⚠️ 导出的是引用 (绑定)
export let count = 0;

export function increment() {
  count++;  // ✅ 导入的模块也会看到变化
}

// ⚠️ 不能在条件语句中导出
// if (condition) {
//   export const x = 1;  // SyntaxError
// }

// ✅ 导出必须是顶层
export const value = 1;
```

---

## 3. 导入 (Import)

### 3.1 命名导入 ✅

```javascript
// 导入特定名称
import { add, multiply } from "./utils.js";

// 导入并重命名 ✅
import { add as sum, multiply as product } from "./utils.js";

// 导入所有命名导出 ✅
import * as utils from "./utils.js";

utils.add(1, 2);
utils.multiply(3, 4);

// ⚠️ 导入只读 (不能修改导入的绑定)
// import { count } from "./utils.js";
// count = 10;  // TypeError
```

### 3.2 默认导入 ✅

```javascript
// 导入默认导出
import square from "./math.js";

// 混合导入
import square, { PI } from "./math.js";

// 重命名默认导入
import { default as squareFn } from "./math.js";
```

### 3.3 导入副作用

```javascript
// 只执行模块 (不导入任何值)
import "./polyfills.js";

// 导入副作用和命名导出
import "./styles.css";
import { init } from "./app.js";
```

### 3.4 导入注意事项

```javascript
// ⚠️ 导入必须写在顶层
// function load() {
//   import { add } from "./utils.js";  // SyntaxError
// }

// ✅ 静态导入在顶层
import { add } from "./utils.js";

// ⚠️ 相对路径必须以 ./ 或 ../ 开头
// import { add } from "utils.js";  // 错误
import { add } from "./utils.js";  // ✅

// ✅ node_modules 或 URL 可以省略 ./
import React from "react";
```

---

## 4. 动态导入 ✅ **ES2020**

### 4.1 基本用法

```javascript
// 动态导入 (返回 Promise)
import("./math.js").then(module => {
  console.log(module.default);
  console.log(module.square(5));
});

// ✅ async/await
async function loadMath() {
  const math = await import("./math.js");
  return math.default(5);
}

// ✅ 条件导入
if (needsFeature) {
  const module = await import("./feature.js");
  module.init();
}
```

### 4.2 动态导入模式

```javascript
// 路由懒加载 ✅
const routes = {
  home: () => import("./pages/home.js"),
  about: () => import("./pages/about.js"),
  contact: () => import("./pages/contact.js")
};

async function navigate(page) {
  const module = await routes[page]();
  module.render();
}

// 按需加载 ✅
button.addEventListener("click", async () => {
  const { Chart } = await import("./chart.js");
  new Chart(canvas);
});
```

---

## 5. 模块最佳实践

### 5.1 导出策略

```javascript
// ✅ 优先命名导出
// utils.js
export function add(a, b) {
  return a + b;
}

export function multiply(a, b) {
  return a * b;
}

// ✅ 默认导出用于主要功能
// api.js
export default function createClient(config) {
  return {
    get() { },
    post() { }
  };
}

// ✅ 混合使用
// index.js
export { default as API } from "./api.js";
export * from "./utils.js";
```

### 5.2 导入风格

```javascript
// ✅ 命名导入 (清晰的依赖)
import { add, multiply } from "./utils.js";

// ❌ 导入所有 (不明确依赖)
import * as utils from "./utils.js";
utils.add(1, 2);

// ✅ 组织导入
// 1. Node modules
import React from "react";
import { useState } from "react";

// 2. 绝对导入
import { Button } from "@/components";

// 3. 相对导入
import { Header } from "./Header";
import "./styles.css";
```

### 5.3 模块结构

```javascript
// ✅ 清晰的模块结构
// src/
//   api/
//     index.js (聚合导出)
//     users.js
//     posts.js
//   utils/
//     index.js
//     date.js
//     string.js
//   components/
//     Button/
//       index.js
//       Button.js
//       Button.css

// 聚合导出 ✅
// api/index.js
export { fetchUsers } from "./users.js";
export { fetchPosts } from "./posts.js";

// 使用
import { fetchUsers, fetchPosts } from "@/api";
```

---

## 6. import.meta 对象 ✅ ES2020

### 6.1 元信息

```javascript
// 获取模块信息 ✅
console.log(import.meta.url);  // 模块的 URL

// 获取脚本标签属性
// <script type="module" src="app.js" data-version="1.0"></script>
console.log(import.meta.scriptElement.dataset.version);  // "1.0"

// 使用示例
const modulePath = new URL(".", import.meta.url).href;
const assetsPath = new URL("./assets", import.meta.url).href;
```

---

## 7. 导入断言 ✅ ES2020

### 7.1 类型断言

```javascript
// 为导入添加类型断言 ✅
import { Chart } from "./chart.js" with { type: "json" };
import styles from "./styles.css" with { type: "css" };

// 常见类型
// "javascript" (默认)
// "json"
// "css"
// "html"
// "text"

// 条件导入 (仅支持某些类型)
if (import.meta.env?.PROD) {
  import { config } from "./config.prod.json" with { type: "json" };
}
```

### 7.2 导入属性 (Import Attributes) ✅ ES2024

```javascript
// 新语法 (更通用) ✅
import { data } from "./data.json" with { type: "json" };
import styles from "./styles.css" with { type: "css" };

// 等同于旧语法
import { data } from "./data.json" assert { type: "json" };  // 旧
import styles from "./styles.css" assert { type: "css" };  // 旧
```

---

## 8. 与 CommonJS 的互操作

### 8.1 在 ESM 中导入 CommonJS

```javascript
// ✅ 导入 CommonJS 模块
// math.cjs
module.exports.add = (a, b) => a + b;

// app.js
import { add } from "./math.cjs";
// ⚠️ 默认导入
import math from "./math.cjs";
```

### 8.2 在 CommonJS 中导入 ESM

```javascript
// ⚠️ 不支持!
// require 只能同步导入，ESM 是异步的

// ✅ 使用动态导入
async function load() {
  const { add } = await import("./utils.js");
  return add(1, 2);
}
```

---

## 9. 实用模式

### 7.1 单例模式

```javascript
// db.js (单例)
let instance = null;

export default function getDatabase() {
  if (!instance) {
    instance = new Database();
  }
  return instance;
}

// 使用
import db from "./db.js";
const connection = db();
```

### 7.2 工厂模式

```javascript
// creators.js
export function createUser(name) {
  return {
    name,
    id: Math.random()
  };
}

export function createProduct(name, price) {
  return {
    name,
    price,
    id: Math.random()
  };
}

// 使用
import { createUser, createProduct } from "./creators.js";
```

---

**下一步**: 完成 `exercises/10-模块系统/` 目录下的练习题 🚀
