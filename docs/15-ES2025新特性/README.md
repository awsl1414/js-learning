# 模块 15: ES2025 新特性

> 📖 **学习目标**: 掌握 ES2025 (ES2024/ESNext) 最新特性和提案

## 目录

1. [新数组方法](#1-新数组方法)
2. [Promise 改进](#2-promise-改进)
3. [Temporal 时间 API](#3-temporal-时间-api)
4. [其他新特性](#4-其他新特性)
5. [未来提案](#5-未来提案)

---

## 1. 新数组方法

### 1.1 分组方法 ✅ ES2024 (Stage 3)

```javascript
// Object.groupBy() ✅
const people = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 25 }
];

// 按年龄分组
const groupedByAge = Object.groupBy(people, person => person.age);
// {
//   25: [{ name: "Alice", age: 25 }, { name: "Charlie", age: 25 }],
//   30: [{ name: "Bob", age: 30 }]
// }

// Map.groupBy() ✅
const grouped = Map.groupBy(people, person => person.age);
// Map { 25 => [...], 30 => [...] }
```

### 1.2 不可变更新方法 ✅ ES2023

```javascript
const arr = [1, 2, 3, 4, 5];

// toSorted() - 不修改原数组排序 ✅
const sorted = arr.toSorted();
console.log(arr);      // [1, 2, 3, 4, 5] (不变)
console.log(sorted);   // [1, 2, 3, 4, 5]

sorted.toSorted((a, b) => b - a);  // [5, 4, 3, 2, 1]

// toReversed() - 不修改原数组反转 ✅
const reversed = arr.toReversed();
console.log(arr);       // [1, 2, 3, 4, 5] (不变)
console.log(reversed);  // [5, 4, 3, 2, 1]

// toSpliced() - 不修改原数组删除/插入 ✅
const spliced = arr.toSpliced(1, 2, 20, 30);
console.log(arr);       // [1, 2, 3, 4, 5] (不变)
console.log(spliced);   // [1, 20, 30, 4, 5]

// with() - 不修改原数组更新 ✅
const updated = arr.with(2, 30);
console.log(arr);       // [1, 2, 3, 4, 5] (不变)
console.log(updated);   // [1, 2, 30, 4, 5]
```

### 1.3 查找方法 ✅ ES2023

```javascript
const arr = [1, 2, 3, 2, 1];

// findLast() - 从后查找 ✅
arr.findLast(x => x === 2);  // 2 (最后一个 2)

// findLastIndex() - 从后查找索引 ✅
arr.findLastIndex(x => x === 2);  // 3
```

---

## 2. Promise 改进

### 2.1 Promise.withResolvers() ✅ ES2024

```javascript
// ✅ 不需要包装在 Promise 构造函数中
const { promise, resolve, reject } = Promise.withResolvers();

// 稍后解决
setTimeout(() => resolve("Success!"), 1000);

promise.then(result => console.log(result));  // "Success!"

// 等同于旧方式
let resolveOuter, rejectOuter;
const promise2 = new Promise((resolve, reject) => {
  resolveOuter = resolve;
  rejectOuter = reject;
});
```

---

## 3. Temporal 时间 API ✅ **提案中**

### 3.1 Temporal.PlainDate

```javascript
// 创建日期 (无时区)
const date = Temporal.PlainDate.from("2024-01-15");

date.year;   // 2024
date.month;  // 1
date.day;    // 15

// 日期运算
const nextWeek = date.add({ days: 7 });
// 2024-01-22

const lastMonth = date.subtract({ months: 1 });
// 2023-12-15

// 比较日期
date1.equals(date2);
date1.until(date2);  // 时间差
```

### 3.2 Temporal.PlainTime

```javascript
// 创建时间 (无时区)
const time = Temporal.PlainTime.from("12:30:45");

time.hour;   // 12
time.minute; // 30
time.second; // 45

// 时间运算
time.add({ hours: 2 });
time.subtract({ minutes: 30 });
```

### 3.3 Temporal.PlainDateTime

```javascript
// 创建日期时间 (无时区)
const datetime = Temporal.PlainDateTime.from("2024-01-15T12:30:45");

datetime.year;       // 2024
datetime.hour;       // 12
datetime.toString();  // "2024-01-15T12:30:45"

// 转换为时区时间
datetime.toZonedDateTime("America/New_York");
```

### 3.4 Temporal.ZonedDateTime

```javascript
// 带时区的日期时间
const zoned = Temporal.ZonedDateTime.from({
  timeZone: "America/New_York",
  year: 2024,
  month: 1,
  day: 15,
  hour: 12
});

zoned.toString();  // "2024-01-15T12:00:00-05:00[America/New_York]"

// 时区转换
const utc = zoned.withTimeZone("UTC");
```

### 3.5 Temporal.Now

```javascript
// 当前时间 ✅
Temporal.Now.plainDateISO();        // 当前日期
Temporal.Now.plainTimeISO();        // 当前时间
Temporal.Now.plainDateTimeISO();    // 当前日期时间
Temporal.Now.zonedDateTimeISO();   // 当前时区时间

// 特定时区
Temporal.Now.plainDate("Asia/Shanghai");  // 上海时区的当前日期
Temporal.Now.plainTime("Asia/Tokyo");     // 东京时区的当前时间
```

---

## 4. 其他新特性

### 4.1 String 方法增强 ✅

```javascript
// String.isWellFormed() ✅ ES2025
// 检查字符串是否包含孤立的代理项
const str = "a\uD800";  // 孤立的高代理
str.isWellFormed();     // false

// String.toWellFormed() ✅ ES2025
// 修复孤立的代理项
str.toWellFormed();     // "a\uFFFD" (替换字符)
```

### 4.2 Atomics.waitAsync() ✅ ES2024

```javascript
// 异步等待 ✅
const result = Atomics.waitAsync(sharedArray, index, value, timeout);

if (result.async) {
  result.value.then(() => {
    console.log("Wait resolved");
  });
}
```

### 4.3 RegExp v 标志 ✅ ES2024

```javascript
// set notation + character class subtraction
const regex = /[\p{Letter}--[a-z]]/v;

// 匹配非小写字母的字母字符
regex.test("A");  // true
regex.test("a");  // false
```

---

## 5. 未来提案

### 5.1 Decorators 装饰器 ✅ **Stage 3**

```javascript
// 类装饰器
@logged
class MyClass {
  @memoize
  expensive() {
    // ...
  }
}

// 装饰器定义
function logged(target) {
  return class extends target {
    constructor(...args) {
      super(...args);
      console.log("Instantiated");
    }
  };
}

function memoize(target, key, descriptor) {
  const original = descriptor.value;
  const cache = new Map();

  descriptor.value = function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = original.apply(this, args);
    cache.set(key, result);
    return result;
  };

  return descriptor;
}
```

### 5.2 Pipeline Operator 管道运算符 ⚠️ **Stage 2**

```javascript
// Hack-style (|>)
const result = value
  |> double(%)
  |> add(%, 10)
  |> toString(%);

// 等同于
const result = toString(add(double(value), 10));
```

### 5.3 Record & Tuple ⚠️ **Stage 2**

```javascript
// 不可变的 Record 和 Tuple
const record = #{ x: 1, y: 2 };
const tuple = #[1, 2, 3];

// 深度相等
#{ x: 1 } === #{ x: 1 };  // true
#[1, 2] === #[1, 2];      // true

// 不可修改
record.x = 10;  // TypeError
```

---

## 6. 迁移指南

### 6.1 Date → Temporal

```javascript
// ❌ 旧方式
const now = new Date();
const year = now.getFullYear();
const month = now.getMonth() + 1;  // ⚠️ 0-indexed

// ✅ 新方式
const now = Temporal.Now.plainDateISO();
const year = now.year;
const month = now.month;  // ✅ 1-indexed
```

### 6.2 Intl.DateTimeFormat → Temporal

```javascript
// ❌ 旧方式
const formatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric"
});
formatter.format(new Date());

// ✅ 新方式
const date = Temporal.Now.plainDateISO();
date.toLocaleString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric"
});
```

---

**下一步**: 完成 `exercises/15-ES2025新特性/` 目录下的练习题 🚀
