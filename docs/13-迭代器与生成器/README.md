# 模块 13: 迭代器与生成器

> 📖 **学习目标**: 掌握 JavaScript 迭代协议和生成器函数

## 目录

1. [迭代协议](#1-迭代协议)
2. [for...of 循环](#2-forof-循环)
3. [生成器函数](#3-生成器函数)
4. [生成器方法](#4-生成器方法)
5. [实用模式](#5-实用模式)

---

## 1. 迭代协议

### 1.1 可迭代协议

```javascript
// 可迭代对象必须实现 [Symbol.iterator] 方法 ✅
const myIterable = {
  data: [1, 2, 3],
  [Symbol.iterator]() {
    let index = 0;
    const data = this.data;

    return {
      next() {
        if (index < data.length) {
          return { value: data[index++], done: false };
        }
        return { value: undefined, done: true };
      }
    };
  }
};

// 使用 for...of
for (const item of myIterable) {
  console.log(item);  // 1, 2, 3
}

// 解构
const [a, b] = myIterable;  // a=1, b=2

// 展开运算符
[...myIterable];  // [1, 2, 3]
```

### 1.2 迭代器接口

```javascript
// 迭代器必须有 next() 方法 ✅
const iterator = {
  next() {
    return { value: ..., done: true/false };
  }
};

// 可选: return() 方法 (提前关闭)
const closableIterator = {
  next() {
    return { value: 1, done: false };
  },
  return() {
    console.log("Iterator closed");
    return { done: true };
  }
};

// 可选: throw() 方法 (向迭代器传递错误)
```

---

## 2. for...of 循环

### 2.1 遍历可迭代对象

```javascript
// 数组 ✅
for (const item of [1, 2, 3]) {
  console.log(item);
}

// 字符串 ✅
for (const char of "hello") {
  console.log(char);
}

// Map ✅
const map = new Map([["a", 1], ["b", 2]]);
for (const [key, value] of map) {
  console.log(key, value);
}

// Set ✅
const set = new Set([1, 2, 3]);
for (const item of set) {
  console.log(item);
}

// arguments ✅
function sum() {
  let total = 0;
  for (const num of arguments) {
    total += num;
  }
  return total;
}
```

### 2.2 遍历对象

```javascript
// ❌ 对象不是可迭代的
// for (const item of { a: 1, b: 2 }) { }  // TypeError

// ✅ 使用 Object.keys/values/entries
const obj = { a: 1, b: 2, c: 3 };

// 遍历键
for (const key of Object.keys(obj)) {
  console.log(key);
}

// 遍历值
for (const value of Object.values(obj)) {
  console.log(value);
}

// 遍历键值对
for (const [key, value] of Object.entries(obj)) {
  console.log(key, value);
}
```

### 2.3 迭代器工具

```javascript
// 创建迭代器
const arr = [1, 2, 3];
const iterator = arr[Symbol.iterator]();

iterator.next();  // { value: 1, done: false }
iterator.next();  // { value: 2, done: false }
iterator.next();  // { value: 3, done: false }
iterator.next();  // { value: undefined, done: true }
```

---

## 3. 生成器函数

### 3.1 基本语法 ✅ **ES2015**

```javascript
// 生成器函数声明
function* generator() {
  yield 1;
  yield 2;
  yield 3;
}

// 生成器函数表达式
const genExpr = function* () {
  yield 1;
  yield 2;
};

// 对象方法简写 ✅
const obj = {
  *generator() {
    yield 1;
    yield 2;
  }
};

// 使用生成器
const gen = generator();

gen.next();  // { value: 1, done: false }
gen.next();  // { value: 2, done: false }
gen.next();  // { value: 3, done: false }
gen.next();  // { value: undefined, done: true }
```

### 3.2 yield 表达式

```javascript
function* greet() {
  yield "Hello";
  yield "World";
  return "Done";  // return 值在 done: true 时返回
}

const gen = greet();

gen.next();  // { value: "Hello", done: false }
gen.next();  // { value: "World", done: false }
gen.next();  // { value: "Done", done: true }

// yield 作为表达式 (双向通信) ✅
function* conversation() {
  const name = yield "What's your name?";
  const age = yield "How old are you?";
  return `${name} is ${age} years old`;
}

const gen2 = conversation();

console.log(gen2.next());           // { value: "What's your name?", done: false }
console.log(gen2.next("Alice"));    // { value: "How old are you?", done: false }
console.log(gen2.next(30));         // { value: "Alice is 30 years old", done: true }
```

### 3.3 yield* 委托 ✅

```javascript
// 委托给其他生成器
function* inner() {
  yield "a";
  yield "b";
}

function* outer() {
  yield 1;
  yield* inner();  // ✅ 委托
  yield 2;
}

for (const item of outer()) {
  console.log(item);  // 1, "a", "b", 2
}

// 委托给可迭代对象
function* gen() {
  yield* [1, 2, 3];     // ✅ 数组
  yield* "hello";      // ✅ 字符串
  yield* new Set([4, 5]);  // ✅ Set
}

[...gen()];  // [1, 2, 3, "h", "e", "l", "l", "o", 4, 5]
```

---

## 4. 生成器方法

### 4.1 next(value)

```javascript
function* counter() {
  let count = 0;
  while (true) {
    const increment = yield count;
    if (increment !== undefined) {
      count += increment;
    } else {
      count++;
    }
  }
}

const gen = counter();

gen.next();      // { value: 0, done: false }
gen.next();      // { value: 1, done: false }
gen.next(5);     // { value: 6, done: false } ✅ 传入值
gen.next(10);    // { value: 16, done: false }
```

### 4.2 return(value)

```javascript
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

const g = gen();

g.next();  // { value: 1, done: false }
g.return("ended");  // { value: "ended", done: true } ✅ 提前结束
g.next();  // { value: undefined, done: true }
```

### 4.3 throw(error)

```javascript
function* gen() {
  try {
    yield 1;
    yield 2;
  } catch (e) {
    console.log("Caught:", e.message);
  }
}

const g = gen();

g.next();  // { value: 1, done: false }
g.throw(new Error("Error in generator"));  // { value: undefined, done: true } ✅
// 输出: "Caught: Error in generator"
```

---

## 5. 实用模式

### 5.1 无限序列

```javascript
// 无限计数器 ✅
function* infiniteCounter(start = 0) {
  let i = start;
  while (true) {
    yield i++;
  }
}

// 使用 take 限制
function* take(iterable, n) {
  let count = 0;
  for (const item of iterable) {
    if (count++ >= n) break;
    yield item;
  }
}

// 使用
const counter = infiniteCounter(1);
const firstFive = take(counter, 5);
[...firstFive];  // [1, 2, 3, 4, 5]

// 斐波那契数列 ✅
function* fibonacci() {
  let [prev, curr] = [0, 1];
  while (true) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

[...take(fibonacci(), 10)];  // [1, 1, 2, 3, 5, 8, 13, 21, 34, 55]
```

### 5.2 树遍历

```javascript
// 深度优先遍历 ✅
const tree = {
  value: 1,
  left: {
    value: 2,
    left: { value: 4 },
    right: { value: 5 }
  },
  right: {
    value: 3,
    left: { value: 6 },
    right: { value: 7 }
  }
};

function* dfs(node) {
  if (!node) return;
  yield node.value;
  yield* dfs(node.left);
  yield* dfs(node.right);
}

[...dfs(tree)];  // [1, 2, 4, 5, 3, 6, 7]
```

### 5.3 异步生成器 ✅ **ES2018**

```javascript
// 异步生成器函数
async function* asyncGenerator() {
  yield await Promise.resolve(1);
  yield await Promise.resolve(2);
  yield await Promise.resolve(3);
}

// 使用 for await...of ✅
(async () => {
  for await (const value of asyncGenerator()) {
    console.log(value);  // 1, 2, 3
  }
})();

// 实际应用: 分页获取
async function* fetchAllPages(url) {
  let nextUrl = url;
  while (nextUrl) {
    const response = await fetch(nextUrl);
    const data = await response.json();

    yield* data.items;

    nextUrl = data.nextUrl;
  }
}

// 使用
for await (const item of fetchAllPages("/api/items")) {
  console.log(item);
}
```

---

## 6. 最佳实践

### 6.1 选择迭代方式

```javascript
// ✅ 简单迭代: for...of
for (const item of array) {
  process(item);
}

// ✅ 需要索引: for...of + entries
for (const [index, item] of array.entries()) {
  console.log(index, item);
}

// ✅ 无限序列: 生成器
function* naturals() {
  let i = 1;
  while (true) yield i++;
}

// ✅ 异步序列: 异步生成器
async function* asyncStream() {
  while (true) {
    const data = await fetchNext();
    if (!data) break;
    yield data;
  }
}
```

### 6.2 性能考虑

```javascript
// ✅ 惰性求值 (生成器)
function* filter(iterable, predicate) {
  for (const item of iterable) {
    if (predicate(item)) {
      yield item;
    }
  }
}

// ✅ 链式处理
const largeArray = [...]; // 大数组

for (const item of filter(filter(largeArray, x => x > 0), x => x < 100)) {
  // 处理过滤后的项
  // 不会创建中间数组
}
```

---

**下一步**: 完成 `exercises/13-迭代器与生成器/` 目录下的练习题 🚀
