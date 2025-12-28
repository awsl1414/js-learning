# 模块 04: 函数基础

> 📖 **学习目标**: 掌握 JavaScript 函数的定义、参数、作用域和高级用法

## 目录

1. [函数定义](#1-函数定义)
2. [参数处理](#2-参数处理)
3. [作用域与闭包](#3-作用域与闭包)
4. [this 关键字](#4-this-关键字)
5. [高阶函数](#5-高阶函数)
6. [递归](#6-递归)

---

## 1. 函数定义

### 1.1 函数声明 ⚠️ **会提升**

```javascript
// 函数声明
function greet(name) {
  return `Hello, ${name}`;
}

// ✅ 可以在声明前调用 (提升)
greet("Alice");  // "Hello, Alice"

function greet(name) {
  return `Hello, ${name}`;
}
```

### 1.2 函数表达式 ✅ **推荐**

```javascript
// 函数表达式
const greet = function(name) {
  return `Hello, ${name}`;
};

// ❌ 不能在声明前调用
// greet("Bob");  // TypeError

const greet = function(name) {
  return `Hello, ${name}`;
};

// 命名函数表达式 (可用于递归和调试)
const factorial = function fact(n) {
  if (n <= 1) return 1;
  return n * fact(n - 1);  // 可以使用内部名称
};
```

### 1.3 箭头函数 ✅ **ES2015+**

```javascript
// 基本语法
const add = (a, b) => a + b;

// 多个语句需要大括号和 return
const greet = (name) => {
  const message = `Hello, ${name}`;
  return message;
};

// 单个参数可以省略括号
const double = n => n * 2;

// 无参数需要括号
const getRandom = () => Math.random();

// 返回对象字面量需要括号
const createUser = (name) => ({ name, id: Date.now() });

// ⚠️ 箭头函数特性
// 1. 没有 this 绑定
// 2. 没有 arguments 对象
// 3. 不能用作构造函数
// 4. 没有 prototype 属性

// ✅ 适合场景
const arr = [1, 2, 3];
const doubled = arr.map(n => n * 2);
setTimeout(() => console.log("延迟执行"), 1000);
```

### 1.4 函数构造函数 ⚠️ **避免使用**

```javascript
// Function 构造函数
const add = new Function('a', 'b', 'return a + b');

// ⚠️ 安全风险 (类似于 eval)
// ⚠️ 性能较差
// ⚠️ 作用域问题

// ❌ 不推荐使用
const risky = new Function('console.log("可以执行任意代码!")');
```

---

## 2. 参数处理

### 2.1 默认参数 ✅ **ES2015+**

```javascript
// 基本用法
function greet(name = "Guest", age = 0) {
  return `Hello ${name}, you're ${age}`;
}

greet();              // "Hello Guest, you're 0"
greet("Alice");       // "Hello Alice, you're 0"
greet("Bob", 30);     // "Hello Bob, you're 30"

// ⚠️ undefined 会触发默认值
greet(undefined, 25); // "Hello Guest, you're 25"
// null 不会触发默认值
greet(null, 25);      // "Hello null, you're 25"

// 复杂默认值 (可以是表达式)
function createUser(name, friends = []) {
  return { name, friends };
}

function log(message, timestamp = new Date()) {
  console.log(timestamp, message);
}

// 前面的参数可以使用后面的参数 ⚠️
function foo(a, b = a) {
  return [a, b];
}
foo(1);  // [1, 1]
```

### 2.2 剩余参数 ✅ **ES2015+**

```javascript
// 收集剩余参数为数组
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}

sum(1, 2, 3);        // 6
sum(1, 2, 3, 4, 5);  // 15

// 部分参数 + 剩余参数
function greet(greeting, ...names) {
  names.forEach(name => console.log(`${greeting}, ${name}`));
}

greet("Hello", "Alice", "Bob", "Charlie");

// ⚠️ 剩余参数必须是最后一个
// function wrong(...rest, last) { }  // SyntaxError
```

### 2.3 展开运算符 ✅

```javascript
// 展开数组作为参数
function add(a, b, c) {
  return a + b + c;
}

const nums = [1, 2, 3];
add(...nums);  // 6

// 结合使用
const nums1 = [1, 2];
const nums2 = [3, 4];
add(...nums1, ...nums2);  // 10
```

### 2.4 参数解构 ✅

```javascript
// 对象参数解构
function createUser({ name, age, email }) {
  console.log(name, age, email);
}

createUser({
  name: "Alice",
  age: 30,
  email: "alice@example.com"
});

// 带默认值的解构
function createUser({ name = "Guest", age = 0, email = "" } = {}) {
  return { name, age, email };
}

createUser();  // 使用默认对象和解构默认值
createUser({ name: "Bob" });  // 部分提供

// 数组参数解构
function swap([first, second]) {
  return [second, first];
}

swap([1, 2]);  // [2, 1]
```

---

## 3. 作用域与闭包

### 3.1 作用域

```javascript
// 全局作用域
const global = "global";

function outer() {
  // 函数作用域
  const outerVar = "outer";

  function inner() {
    // 内层函数作用域
    const innerVar = "inner";
    console.log(global);    // ✅ 可访问
    console.log(outerVar);  // ✅ 可访问
    console.log(innerVar);  // ✅ 可访问
  }

  inner();
  // console.log(innerVar);  // ❌ 不可访问
}

// 块级作用域 (let/const)
function test() {
  if (true) {
    const blockScoped = "block";
  }
  // console.log(blockScoped);  // ❌ ReferenceError
}

// ⚠️ var 的函数作用域
function varTest() {
  if (true) {
    var functionScoped = "leaked";
  }
  console.log(functionScoped);  // ✅ 可以访问
}
```

### 3.2 闭包 ✅ **核心概念**

```javascript
// 闭包: 函数记住其定义时的词法环境
function createCounter() {
  let count = 0;  // 私有变量
  return function() {
    count++;
    return count;
  };
}

const counter = createCounter();
console.log(counter());  // 1
console.log(counter());  // 2
console.log(counter());  // 3

// 实际应用: 数据私有化
function createUser(name) {
  let _name = name;

  return {
    getName: () => _name,
    setName: (newName) => {
      if (newName) _name = newName;
    }
  };
}

const user = createUser("Alice");
console.log(user.getName());  // "Alice"
user.setName("Bob");
console.log(user.getName());  // "Bob"
console.log(user._name);      // undefined (无法直接访问)

// ⚠️ 闭包陷阱: 循环中的 var
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// 输出: 3, 3, 3 (不是 0, 1, 2!)

// ✅ 解决方案 1: 使用 let
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// 输出: 0, 1, 2

// ✅ 解决方案 2: 使用闭包
for (var i = 0; i < 3; i++) {
  (function(j) {
    setTimeout(() => console.log(j), 100);
  })(i);
}
```

---

## 4. this 关键字

### 4.1 this 的绑定规则

```javascript
// 1. 默认绑定 (严格模式: undefined, 非严格: global)
function foo() {
  console.log(this);
}
foo();  // 严格模式: undefined

// 2. 隐式绑定 (调用时的对象)
const obj = {
  name: "Alice",
  greet() {
    console.log(this.name);
  }
};
obj.greet();  // "Alice"

// ⚠️ 丢失绑定
const greet = obj.greet;
greet();  // undefined (或全局对象)

// 3. 显式绑定 (call/apply/bind)
function greet(greeting) {
  console.log(`${greeting}, ${this.name}`);
}

const person = { name: "Alice" };

greet.call(person, "Hello");     // "Hello, Alice"
greet.apply(person, ["Hi"]);     // "Hi, Alice"

const boundGreet = greet.bind(person);
boundGreet("Hey");  // "Hey, Alice"

// 4. new 绑定
function Person(name) {
  this.name = name;
}
const p = new Person("Alice");
console.log(p.name);  // "Alice"

// 5. 箭头函数 (没有 this, 继承外层)
const obj = {
  name: "Alice",
  greet: function() {
    const inner = () => {
      console.log(this.name);  // 继承外层 this
    };
    inner();
  }
};
obj.greet();  // "Alice"
```

### 4.2 call/apply/bind

```javascript
// call: 逐个传递参数
function introduce(greeting, punctuation) {
  console.log(`${greeting}, I'm ${this.name}${punctuation}`);
}

const person = { name: "Alice" };
introduce.call(person, "Hello", "!");  // "Hello, I'm Alice!"

// apply: 数组传递参数
introduce.apply(person, ["Hi", "."]);  // "Hi, I'm Alice."

// bind: 创建新函数 (永久绑定 this)
const bound = introduce.bind(person, "Hey");
bound("~");  // "Hey, I'm Alice~"

// 借用方法
const arr1 = [1, 2, 3];
const arr2 = [4, 5];
Array.prototype.push.apply(arr1, arr2);
console.log(arr1);  // [1, 2, 3, 4, 5]

// ⚠️ 箭头函数不能绑定 this
const arrow = () => console.log(this);
arrow.call({ name: "Alice" });  // 仍然绑定到外层 this
```

---

## 5. 高阶函数

### 5.1 函数作为值

```javascript
// 函数可以赋值给变量
const greet = function(name) {
  return `Hello, ${name}`;
};

// 函数可以作为参数
function execute(fn, value) {
  return fn(value);
}

execute(x => x * 2, 5);  // 10

// 函数可以作为返回值
function createMultiplier(multiplier) {
  return function(x) {
    return x * multiplier;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

double(5);   // 10
triple(5);   // 15
```

### 5.2 常用高阶函数模式

```javascript
// 回调函数
function fetchUserData(userId, callback) {
  // 模拟异步操作
  setTimeout(() => {
    const data = { id: userId, name: "Alice" };
    callback(data);
  }, 1000);
}

fetchUserData(1, (user) => {
  console.log(user);
});

// 函数组合
function compose(...fns) {
  return function(x) {
    return fns.reduceRight((acc, fn) => fn(acc), x);
  };
}

const addOne = x => x + 1;
const double = x => x * 2;

const addOneThenDouble = compose(double, addOne);
addOneThenDouble(5);  // 12: (5 + 1) * 2

// 记忆化 (Memoization)
function memoize(fn) {
  const cache = new Map();

  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

const slowFib = memoize(function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
});

console.log(slowFib(100));  // 快速计算
```

---

## 6. 递归

### 6.1 基本递归

```javascript
// 阶乘
function factorial(n) {
  // 基准情况
  if (n <= 1) return 1;

  // 递归情况
  return n * factorial(n - 1);
}

factorial(5);  // 120

// 斐波那契数列
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// 数组求和
function sumArray(arr) {
  if (arr.length === 0) return 0;
  return arr[0] + sumArray(arr.slice(1));
}

sumArray([1, 2, 3, 4]);  // 10
```

### 6.2 尾递归优化

```javascript
// ⚠️ JavaScript 引擎不保证尾调用优化
// 但可以编写尾递归形式的代码

// 非尾递归
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);  // 递归调用后还有乘法
}

// 尾递归形式
function factorialTail(n, acc = 1) {
  if (n <= 1) return acc;
  return factorialTail(n - 1, n * acc);  // 递归调用是最后操作
}

factorialTail(5);  // 120
```

---

## 7. 最佳实践

### 7.1 函数设计

```javascript
// ✅ 单一职责
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function saveUser(user) {
  // 保存逻辑
}

// ❌ 职责过多
function processUser(email) {
  // 验证邮箱
  // 保存用户
  // 发送邮件
  // ...
}

// ✅ 纯函数 (无副作用)
function add(a, b) {
  return a + b;
}

// ❌ 非纯函数
let count = 0;
function increment() {
  count++;  // 副作用
  return count;
}
```

### 7.2 函数命名

```javascript
// ✅ 动词开头
function getUser(id) { }
function createUser(data) { }
function deleteUser(id) { }
function isValidEmail(email) { }
function calculateTotal(items) { }

// ✅ 布尔函数: is/has/can
function isValid() { }
function hasPermission() { }
function canEdit() { }

// ❌ 模糊的命名
function process() { }
function handle() { }
function doIt() { }
```

---

**下一步**: 完成 `exercises/04-函数基础/` 目录下的练习题 🚀
