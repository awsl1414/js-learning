# 模块 12: 错误处理与调试

> 📖 **学习目标**: 掌握 JavaScript 错误处理、Error 类型和调试技巧

## 目录

1. [Error 类型](#1-error-类型)
2. [try-catch-finally](#2-try-catch-finally)
3. [throw 语句](#3-throw-语句)
4. [自定义错误](#4-自定义错误)
5. [调试技巧](#5-调试技巧)

---

## 1. Error 类型

### 1.1 内置错误类型

```javascript
// Error - 基础错误类
const error = new Error("Something went wrong");
console.log(error.name);    // "Error"
console.log(error.message); // "Something went wrong"
console.log(error.stack);   // 堆栈跟踪

// TypeError - 类型错误
try {
  const obj = {};
  obj.nonExistent.method();  // TypeError
} catch (error) {
  console.error(error instanceof TypeError);  // true
}

// ReferenceError - 引用错误
try {
  const x = undefinedVariable;  // ReferenceError
} catch (error) {
  console.error(error instanceof ReferenceError);
}

// SyntaxError - 语法错误
try {
  eval("const x = ");  // SyntaxError
} catch (error) {
  console.error(error instanceof SyntaxError);
}

// RangeError - 范围错误
try {
  new Array(-1);  // RangeError
} catch (error) {
  console.error(error instanceof RangeError);
}

// URIError - URI 错误
try {
  decodeURIComponent("%");  // URIError
} catch (error) {
  console.error(error instanceof URIError);
}

// EvalError - eval 错误 (已废弃)
try {
  throw new EvalError("Eval failed");
} catch (error) {
  console.error(error instanceof EvalError);
}

// AggregateError ✅ ES2021
Promise.all([
  Promise.reject(new Error("Error 1")),
  Promise.reject(new Error("Error 2"))
]).catch(error => {
  console.error(error instanceof AggregateError);  // true
  console.error(error.errors);  // [Error, Error]
});
```

---

## 2. try-catch-finally

### 2.1 基本语法

```javascript
// 基本用法
try {
  // 可能抛出错误的代码
  const result = riskyOperation();
  console.log(result);
} catch (error) {
  // 处理错误
  console.error("Error:", error.message);
}

// with finally
try {
  doSomething();
} catch (error) {
  console.error(error);
} finally {
  // ✅ 总是执行 (无论成功或失败)
  cleanup();
}

// ✅ ES2019+: 可选 catch
try {
  JSON.parse(invalidJson);
} catch {
  // 不需要 error 参数
  console.log("Failed to parse");
}
```

### 2.2 嵌套错误处理

```javascript
// 嵌套 try-catch
try {
  // 外层操作
  try {
    // 内层操作
    innerOperation();
  } catch (innerError) {
    // 处理内层错误
    handleInnerError(innerError);
    throw innerError;  // 重新抛出
  }
} catch (outerError) {
  // 处理外层错误
  handleOuterError(outerError);
}
```

### 2.3 执行顺序

```javascript
// 场景 1: try 成功
try {
  console.log("Try");
} catch {
  console.log("Catch");
} finally {
  console.log("Finally");
}
// 输出: Try → Finally

// 场景 2: try 失败
try {
  throw new Error("Error");
} catch {
  console.log("Catch");
} finally {
  console.log("Finally");
}
// 输出: Catch → Finally

// 场景 3: catch 中 throw
try {
  throw new Error("First");
} catch {
  console.log("Catch");
  throw new Error("Second");
} finally {
  console.log("Finally");  // ✅ 总是执行
}
// 输出: Catch → Finally → throw "Second"

// 场景 4: finally 返回 (覆盖)
function test() {
  try {
    throw new Error("Error");
  } catch {
    return "Catch";
  } finally {
    return "Finally";  // ✅ 覆盖 catch 的返回值
  }
}
test();  // "Finally"
```

---

## 3. throw 语句

### 3.1 抛出错误

```javascript
// 抛出 Error 对象 ✅
throw new Error("Error message");

// 抛出特定错误类型
throw new TypeError("Wrong type");
throw new RangeError("Out of range");

// ⚠️ 可以抛出任何值
throw "Error message";  // 字符串
throw 404;              // 数字
throw { code: 500 };    // 对象

// ✅ 推荐: 使用 Error 对象
throw new Error("Descriptive message");
```

### 3.2 条件抛出

```javascript
// 验证参数
function divide(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new TypeError("Arguments must be numbers");
  }
  if (b === 0) {
    throw new Error("Division by zero");
  }
  return a / b;
}

// 验证状态
function withdraw(amount) {
  if (amount > this.balance) {
    throw new Error("Insufficient funds");
  }
  this.balance -= amount;
}
```

### 3.3 重新抛出

```javascript
// 捕获、处理、重新抛出
try {
  operation();
} catch (error) {
  // 记录错误
  console.error("Error occurred:", error);

  // 重新抛出 ✅
  throw error;
}

// 包装错误 ✅
try {
  await fetchUserData();
} catch (originalError) {
  throw new Error(`Failed to fetch user: ${originalError.message}`, {
    cause: originalError  // ✅ ES2022: 错误原因
  });
}
```

---

## 4. 自定义错误

### 4.1 扩展 Error

```javascript
// 自定义错误类 ✅
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}

class AuthError extends Error {
  constructor(message, code) {
    super(message);
    this.name = "AuthError";
    this.code = code;
  }
}

// 使用
function validateEmail(email) {
  if (!email.includes("@")) {
    throw new ValidationError("Invalid email", "email");
  }
}

try {
  validateEmail("invalid");
} catch (error) {
  if (error instanceof ValidationError) {
    console.error(`Field ${error.field}: ${error.message}`);
  }
}
```

### 4.2 错误链 ✅ ES2022

```javascript
// 使用 cause 链接错误
async function fetchConfig() {
  try {
    const response = await fetch("/config.json");
    return await response.json();
  } catch (networkError) {
    throw new Error("Failed to load config", {
      cause: networkError
    });
  }
}

// 访问错误链
try {
  const config = await fetchConfig();
} catch (error) {
  console.error(error.message);       // "Failed to load config"
  console.error(error.cause);         // 原始网络错误
  console.error(error.cause.message); // 网络错误消息
}
```

---

## 5. 调试技巧

### 5.1 console 方法

```javascript
// 基本日志
console.log("Info");
console.error("Error");
console.warn("Warning");
console.info("Info");

// 分组日志 ✅
console.group("User Data");
console.log("Name:", name);
console.log("Age:", age);
console.groupEnd();

// 嵌套分组 ✅
console.group("Outer");
console.log("Outer message");
console.group("Inner");
console.log("Inner message");
console.groupEnd();
console.groupEnd();

// 表格显示 ✅
console.table([
  { name: "Alice", age: 30 },
  { name: "Bob", age: 25 }
]);

// 计数 ✅
console.count("clicks");
console.count("clicks");
console.count("clicks");
console.countReset("clicks");

// 计时 ✅
console.time("operation");
// ... 执行操作
console.timeEnd("operation");

// 断言 ✅
console.assert(x > 0, "x must be positive");
// 如果断言失败，输出第二个参数

// 追踪调用栈 ✅
console.trace("Current stack");

// 样式输出 ✅
console.log("%cImportant!", "color: red; font-size: 20px;");
```

### 5.2 debugger 语句

```javascript
// 设置断点
function complexCalculation(a, b) {
  debugger;  // ⚠️ 暂停执行 (打开开发者工具)

  const result = a * b + Math.sqrt(a);
  return result;
}

// 条件断点
function process(items) {
  for (const item of items) {
    if (item.id === 999) {
      debugger;  // 只在特定条件下暂停
    }
    processItem(item);
  }
}
```

### 5.3 错误堆栈

```javascript
// 捕获堆栈信息
function getStack() {
  const stack = new Error().stack;
  console.log(stack);
}

// 解析堆栈
function parseStack(stack) {
  const lines = stack.split("\n");
  return lines.map(line => {
    // 提取文件名、行号、列号
    const match = line.match(/at .+ \((.+):(\d+):(\d+)\)/);
    if (match) {
      return {
        file: match[1],
        line: match[2],
        column: match[3]
      };
    }
  }).filter(Boolean);
}
```

---

## 6. 全局错误处理

### 6.1 unhandledrejection

```javascript
// 捕获未处理的 Promise 拒绝 ✅
window.addEventListener("unhandledrejection", (event) => {
  console.error("Unhandled promise rejection:", event.reason);

  // 阻止默认控制台错误
  event.preventDefault();
});

// 或者
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled rejection:", reason);
});
```

### 6.2 error 事件

```javascript
// 捕获全局错误 ✅
window.addEventListener("error", (event) => {
  console.error("Global error:", event.error);
  console.error("Message:", event.message);
  console.error("File:", event.filename);
  console.error("Line:", event.lineno, event.colno);

  event.preventDefault();  // 阻止默认错误处理
});

// Node.js
process.on("uncaughtException", (error) => {
  console.error("Uncaught exception:", error);
  // ⚠️ 进程应该退出
  process.exit(1);
});
```

---

## 7. 最佳实践

### 7.1 错误处理原则

```javascript
// ✅ 具体捕获
try {
  JSON.parse(data);
} catch (error) {
  if (error instanceof SyntaxError) {
    // 处理 JSON 解析错误
  } else {
    throw error;  // 重新抛出其他错误
  }
}

// ✅ 提供上下文
async function loadUser(id) {
  try {
    const response = await fetch(`/users/${id}`);
    return await response.json();
  } catch (error) {
    throw new Error(`Failed to load user ${id}`, {
      cause: error
    });
  }
}

// ✅ 使用类型检查
function processValue(value) {
  if (typeof value !== "number") {
    throw new TypeError("Value must be a number");
  }
  // ...
}
```

### 7.2 日志记录

```javascript
// ✅ 错误日志
function logError(error, context = {}) {
  console.error({
    message: error.message,
    stack: error.stack,
    context,
    timestamp: new Date().toISOString()
  });
}

// ✅ 生产环境: 发送到日志服务
function reportError(error) {
  fetch("/api/log", {
    method: "POST",
    body: JSON.stringify({
      message: error.message,
      stack: error.stack,
      url: window.location.href,
      userAgent: navigator.userAgent
    })
  });
}
```

---

**下一步**: 完成 `exercises/12-错误处理与调试/` 目录下的练习题 🚀
