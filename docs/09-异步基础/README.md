# 模块 09: 异步编程基础

> 📖 **学习目标**: 掌握 JavaScript 异步编程: 回调、Promise 和 async/await

## 目录

1. [异步概念](#1-异步概念)
2. [回调函数](#2-回调函数)
3. [Promise](#3-promise)
4. [async/await](#4-asyncawait)
5. [错误处理](#5-错误处理)
6. [并发控制](#6-并发控制)

---

## 1. 异步概念

### 1.1 同步 vs 异步

```javascript
// 同步代码 (阻塞)
console.log("Start");
console.log("Middle");
console.log("End");
// 输出: Start → Middle → End

// 异步代码 (非阻塞)
console.log("Start");

setTimeout(() => {
  console.log("Async");
}, 0);

console.log("End");
// 输出: Start → End → Async
```

### 1.2 事件循环

```javascript
// 调用栈 (Call Stack)
// 任务队列 (Task Queue)
// 微任务队列 (Microtask Queue)

console.log("1");

setTimeout(() => console.log("2"), 0);  // 宏任务
Promise.resolve().then(() => console.log("3"));  // 微任务

console.log("4");
// 输出: 1 → 4 → 3 → 2

// 执行顺序:
// 1. 同步代码: 1, 4
// 2. 微任务: 3
// 3. 宏任务: 2
```

---

## 2. 回调函数

### 2.1 基本回调

```javascript
// 同步回调
function greet(name, callback) {
  console.log(`Hello, ${name}`);
  callback();
}

greet("Alice", () => {
  console.log("Callback executed");
});
// Hello, Alice
// Callback executed

// 异步回调
function fetchData(callback) {
  setTimeout(() => {
    const data = { id: 1, name: "Alice" };
    callback(data);
  }, 1000);
}

fetchData((data) => {
  console.log(data);
});
```

### 2.2 回调地狱 ⚠️

```javascript
// ❌ 回调地狱 (难以维护)
getData((a) => {
  getMoreData(a, (b) => {
    getMoreData(b, (c) => {
      getMoreData(c, (d) => {
        // 嵌套过深
      });
    });
  });
});

// ✅ 使用命名函数
function handleData(a) {
  getMoreData(a, handleMoreData);
}

function handleMoreData(b) {
  getMoreData(b, handleFinalData);
}
```

### 2.3 错误处理

```javascript
// Node.js 风格: error-first callback
function fetchData(callback) {
  setTimeout(() => {
    const error = null;
    const data = { id: 1 };
    callback(error, data);
  }, 1000);
}

fetchData((error, data) => {
  if (error) {
    console.error("Error:", error);
    return;
  }
  console.log(data);
});
```

---

## 3. Promise

### 3.1 创建和使用 Promise

```javascript
// 创建 Promise
const promise = new Promise((resolve, reject) => {
  // 异步操作
  setTimeout(() => {
    const success = true;

    if (success) {
      resolve("Success!");  // 成功
    } else {
      reject("Failed!");    // 失败
    }
  }, 1000);
});

// 使用 Promise
promise
  .then(result => {
    console.log(result);  // "Success!"
  })
  .catch(error => {
    console.error(error);
  });

// ✅ Promise 三种状态
// pending:   初始状态
// fulfilled: 操作成功 (resolve)
// rejected:  操作失败 (reject)
// ⚠️ 状态一旦改变不可逆
```

### 3.2 Promise 链式调用 ✅

```javascript
// 链式 then()
Promise.resolve(1)
  .then(value => {
    console.log(value);  // 1
    return value + 1;
  })
  .then(value => {
    console.log(value);  // 2
    return value + 1;
  })
  .then(value => {
    console.log(value);  // 3
  });

// ⚠️ 必须返回值传递给下一个 then
Promise.resolve(1)
  .then(value => {
    value + 1;  // ❌ 没有返回
  })
  .then(value => {
    console.log(value);  // undefined
  });
```

### 3.3 Promise 静态方法

```javascript
// Promise.resolve() ✅
Promise.resolve("success").then(v => console.log(v));
Promise.resolve(Promise.resolve("nested")).then(v => console.log(v));

// Promise.reject()
Promise.reject(new Error("fail")).catch(e => console.error(e.message));

// Promise.all() ✅ 全部成功才成功
Promise.all([
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.resolve(3)
]).then(values => {
  console.log(values);  // [1, 2, 3]
});

// ⚠️ 一个失败就全部失败
Promise.all([
  Promise.resolve(1),
  Promise.reject(new Error("fail")),
  Promise.resolve(3)
]).catch(error => {
  console.error(error.message);  // "fail"
});

// Promise.allSettled() ✅ ES2020
// 无论成功失败都返回结果
Promise.allSettled([
  Promise.resolve(1),
  Promise.reject(new Error("fail")),
  Promise.resolve(3)
]).then(results => {
  console.log(results);
  // [
  //   { status: "fulfilled", value: 1 },
  //   { status: "rejected", reason: Error: fail },
  //   { status: "fulfilled", value: 3 }
  // ]
});

// Promise.race() ✅
// 返回最先完成的结果
Promise.race([
  delay(100, "first"),
  delay(200, "second")
]).then(value => {
  console.log(value);  // "first"
});

// Promise.any() ✅ ES2021
// 返回第一个成功的
Promise.any([
  Promise.reject(new Error("fail1")),
  Promise.reject(new Error("fail2")),
  Promise.resolve("success")
]).then(value => {
  console.log(value);  // "success"
});

// ⚠️ 全部失败抛出 AggregateError
Promise.any([
  Promise.reject(new Error("fail1")),
  Promise.reject(new Error("fail2"))
]).catch(error => {
  console.error(error);  // AggregateError
});
```

---

## 4. async/await

### 4.1 基本语法 ✅ **ES2017**

```javascript
// async 函数返回 Promise
async function fetchData() {
  return "data";
}

fetchData().then(data => console.log(data));  // "data"

// await 等待 Promise 结果
async function main() {
  const data = await fetchData();
  console.log(data);  // "data"
}

main();

// ⚠️ await 必须在 async 函数内
// const data = await fetchData();  // SyntaxError
```

### 4.2 错误处理

```javascript
// try...catch ✅
async function fetchWithError() {
  try {
    const data = await Promise.reject(new Error("fail"));
  } catch (error) {
    console.error(error.message);  // "fail"
  }
}

// 捕获单个错误
async function main() {
  const data = await fetchData().catch(error => {
    console.error(error);
    return null;
  });
}

// ⚠️ 未捕获的 Promise 拒绝
async function unhandled() {
  throw new Error("fail");
}

unhandled();  // ⚠️ UnhandledPromiseRejection
```

### 4.3 并发执行

```javascript
// ❌ 顺序执行 (慢)
async function sequential() {
  const a = await fetchA();  // 等待 1s
  const b = await fetchB();  // 等待 1s
  const c = await fetchC();  // 等待 1s
  // 总共 3s
}

// ✅ 并发执行 (快)
async function parallel() {
  const [a, b, c] = await Promise.all([
    fetchA(),  // 同时执行
    fetchB(),
    fetchC()
  ]);
  // 总共 1s
}

// ✅ 独立错误处理
async function parallelSafe() {
  const results = await Promise.allSettled([
    fetchA(),
    fetchB(),
    fetchC()
  ]);

  results.forEach((result, i) => {
    if (result.status === "fulfilled") {
      console.log(`Task ${i}:`, result.value);
    } else {
      console.error(`Task ${i}:`, result.reason);
    }
  });
}
```

---

## 5. 错误处理

### 5.1 Promise 错误处理

```javascript
// then(null, onRejected)
Promise.reject("error")
  .then(null, error => {
    console.error(error);
  });

// ✅ 使用 catch
Promise.reject("error")
  .catch(error => {
    console.error(error);
  });

// ⚠️ catch 后继续执行
Promise.reject("error")
  .catch(error => {
    console.error(error);
    return "recovered";  // 恢复
  })
  .then(value => {
    console.log(value);  // "recovered"
  });
```

### 5.2 async/await 错误处理

```javascript
// ✅ try...catch
async function handle() {
  try {
    const data = await fetchData();
    return data;
  } catch (error) {
    console.error(error);
    return null;  // 返回默认值
  }
}

// ✅ 多个 try...catch
async function multiple() {
  try {
    const a = await fetchA();
  } catch (error) {
    console.error("A failed", error);
  }

  try {
    const b = await fetchB();
  } catch (error) {
    console.error("B failed", error);
  }
}

// ✅ 辅助函数
function to(promise) {
  return promise
    .then(data => [null, data])
    .catch(error => [error, null]);
}

async function withHelper() {
  const [error, data] = await to(fetchData());

  if (error) {
    console.error(error);
    return;
  }

  console.log(data);
}
```

---

## 6. 并发控制

### 6.1 限制并发数

```javascript
// 并发控制器 ✅
async function asyncPool(limit, items, fn) {
  const results = [];
  const executing = new Set();

  for (const [index, item] of items.entries()) {
    const promise = fn(item, index).then(result => {
      executing.delete(promise);
      return result;
    });

    executing.add(promise);
    results.push(promise);

    if (executing.size >= limit) {
      await Promise.race(executing);
    }
  }

  return Promise.all(results);
}

// 使用
const urls = ["url1", "url2", "url3", /*...*/];
const results = await asyncPool(3, urls, fetchUrl);
```

### 6.2 实用工具

```javascript
// 延迟函数 ✅
function delay(ms, value) {
  return new Promise(resolve => setTimeout(resolve, ms, value));
}

// 超时 ✅
function timeout(promise, ms) {
  return Promise.race([
    promise,
    delay(ms, Promise.reject(new Error("Timeout")))
  ]);
}

// 重试 ✅
async function retry(fn, times = 3) {
  for (let i = 0; i < times; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === times - 1) throw error;
      console.log(`Retry ${i + 1}...`);
    }
  }
}

// 使用
retry(() => fetchData())
  .then(data => console.log(data))
  .catch(error => console.error("All retries failed", error));
```

---

## 7. Top-Level await ✅ **ES2022**

### 7.1 模块顶层 await

```javascript
// ✅ ES Modules 中可以使用顶层 await
// config.js
const response = await fetch("/api/config");
export const config = await response.json();

// main.js
import { config } from "./config.js";
console.log(config.apiUrl);  // 直接使用配置

// ⚠️ 普通脚本不支持顶层 await
// script.js (非 ESM)
// await Promise.resolve();  // SyntaxError
```

### 7.2 使用场景

```javascript
// ✅ 动态导入模块
const { lodash } = await import("/lib/lodash.mjs");
const { Chart } = await import("chart.js");

// ✅ 数据库初始化
const db = await connectDatabase();
export { db };

// ✅ 资源加载
const translations = await fetch("/locales/en.json")
  .then(r => r.json());

export default translations;

// ✅ 依赖初始化
await initializeApp();
console.log("App initialized");
```

### 7.3 注意事项

```javascript
// ⚠️ 执行顺序
// module1.mjs
console.log("module1 start");
await delay(1000);
console.log("module1 end");
export const value = 1;

// module2.mjs
import { value } from "./module1.mjs";
console.log("module2");  // 等待 module1 完成

// ⚠️ 错误处理
// 整个模块会失败
const data = await fetchData();  // 如果失败，模块加载失败

// ✅ 添加错误处理
let data;
try {
  data = await fetchData();
} catch (error) {
  console.error("Failed to load data:", error);
  data = null;
}

export { data };

// ⚠️ 性能考虑
// 避免多个独立的顶层 await
await initA();  // 等待 A 完成
await initB();  // 等待 B 完成

// ✅ 并行执行
const [resultA, resultB] = await Promise.all([
  initA(),
  initB()
]);
```

---

## 8. 最佳实践

### 8.1 选择异步模式

```javascript
// ✅ 简单异步: async/await
async function simple() {
  const data = await fetchData();
  return process(data);
}

// ✅ 并发: Promise.all
const [a, b, c] = await Promise.all([fetchA(), fetchB(), fetchC()]);

// ✅ 条件: if + await
if (needsData) {
  const data = await fetchData();
}
```

### 8.2 避免陷阱

```javascript
// ⚠️ 不要在循环中 await (除非有顺序依赖)
// ❌ 慢
for (const url of urls) {
  const data = await fetch(url);  // 顺序执行
}

// ✅ 快
const results = await Promise.all(
  urls.map(url => fetch(url))
);

// ⚠️ 注意未处理的 Promise
Promise.reject("error");  // ⚠️ Unhandled rejection

// ✅ 总是处理错误
Promise.reject("error").catch(console.error);
```

---

**下一步**: 完成 `exercises/09-异步基础/` 目录下的练习题 🚀
