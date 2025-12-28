# 模块 03: 控制流

> 📖 **学习目标**: 掌握 JavaScript 中的条件判断和循环控制

## 目录

1. [条件语句](#1-条件语句)
2. [循环语句](#2-循环语句)
3. [跳转语句](#3-跳转语句)
4. [异常处理](#4-异常处理)
5. [最佳实践](#5-最佳实践)

---

## 1. 条件语句

### 1.1 if...else 语句

```javascript
// 基本语法
if (condition) {
  // 条件为真时执行
}

if (condition) {
  // 真分支
} else {
  // 假分支
}

// 多条件
if (condition1) {
  // 条件1为真
} else if (condition2) {
  // 条件2为真
} else {
  // 所有条件都为假
}

// 示例
const score = 85;

if (score >= 90) {
  console.log("优秀");
} else if (score >= 80) {
  console.log("良好");
} else if (score >= 60) {
  console.log("及格");
} else {
  console.log("不及格");
}
```

### 1.2 三元运算符

```javascript
// 基本语法
condition ? expr1 : expr2;

// 简单示例
const age = 20;
const status = age >= 18 ? "成年" : "未成年";

// 嵌套 (可读性变差)
const result = score > 90 ? "A" :
              score > 80 ? "B" :
              score > 70 ? "C" : "D";

// ✅ 推荐: 简单条件
const max = a > b ? a : b;

// ❌ 避免: 复杂逻辑
const value = x > 0 ? (y > 0 ? "both positive" : "x positive") :
              x < 0 ? (y > 0 ? "y positive" : "both negative") :
              "x is zero";
```

### 1.3 switch 语句

```javascript
// 基本语法
switch (expression) {
  case value1:
    // 代码
    break;
  case value2:
    // 代码
    break;
  default:
    // 默认代码
}

// 示例
const day = 3;
let dayName;

switch (day) {
  case 1:
    dayName = "周一";
    break;
  case 2:
    dayName = "周二";
    break;
  case 3:
    dayName = "周三";
    break;
  default:
    dayName = "未知";
}

// ⚠️ 不要忘记 break!
switch (x) {
  case 1:
    console.log("1");
  case 2:
    console.log("2");  // x=1 时也会执行! (fall-through)
    break;
}

// ✅ 利用 fall-through (有意为之)
switch (day) {
  case 1:
  case 2:
  case 3:
  case 4:
  case 5:
    console.log("工作日");
    break;
  case 6:
  case 7:
    console.log("周末");
    break;
}
```

---

## 2. 循环语句

### 2.1 for 循环

```javascript
// 标准语法
for (initialization; condition; update) {
  // 循环体
}

// 示例
for (let i = 0; i < 5; i++) {
  console.log(i);
}

// 多重变量
for (let i = 0, j = 10; i < j; i++, j--) {
  console.log(i, j);
}

// 省略部分 (无限循环需要内部 break)
let i = 0;
for (; i < 5; i++) { }     // 省略初始化
for (let j = 0; ; j++) {   // 省略条件 (无限循环)
  if (j >= 5) break;
}
```

### 2.2 while 循环

```javascript
// while 循环
let i = 0;
while (i < 5) {
  console.log(i);
  i++;
}

// do-while 循环 (至少执行一次)
let j = 0;
do {
  console.log(j);
  j++;
} while (j < 5);
```

### 2.3 for...in 循环

```javascript
// 遍历对象的可枚举属性
const obj = { a: 1, b: 2, c: 3 };

for (const key in obj) {
  console.log(key, obj[key]);
}
// a 1
// b 2
// c 3

// ⚠️ 遍历数组会得到索引而非值
const arr = ["a", "b", "c"];
for (const index in arr) {
  console.log(index);  // "0", "1", "2"
}

// ⚠️ 会遍历原型链上的属性
for (const key in obj) {
  if (obj.hasOwnProperty(key)) {  // ✅ 检查自身属性
    console.log(key);
  }
}
```

### 2.4 for...of 循环 ✅ **推荐**

```javascript
// 遍历可迭代对象 (数组、字符串、Map、Set 等)
const arr = ["a", "b", "c"];

for (const item of arr) {
  console.log(item);  // "a", "b", "c"
}

// 遍历字符串
for (const char of "hello") {
  console.log(char);
}

// 获取索引和值
for (const [index, value] of arr.entries()) {
  console.log(index, value);
}

// 遍历 Map
const map = new Map([["a", 1], ["b", 2]]);
for (const [key, value] of map) {
  console.log(key, value);
}

// 遍历 Set
const set = new Set([1, 2, 3]);
for (const item of set) {
  console.log(item);
}

// ❌ for...of 不能遍历普通对象
// for (const item of {}) { }  // TypeError
```

---

## 3. 跳转语句

### 3.1 break 语句

```javascript
// 跳出循环
for (let i = 0; i < 10; i++) {
  if (i === 5) break;
  console.log(i);
}
// 输出: 0, 1, 2, 3, 4

// 跳出嵌套循环 (只跳出一层)
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (i === 1 && j === 1) break;  // 只跳出内层循环
    console.log(i, j);
  }
}
```

### 3.2 continue 语句

```javascript
// 跳过当前迭代
for (let i = 0; i < 5; i++) {
  if (i === 2) continue;
  console.log(i);
}
// 输出: 0, 1, 3, 4

// 在 while 中的使用
let i = 0;
while (i < 5) {
  i++;
  if (i === 2) continue;
  console.log(i);
}
```

### 3.3 label 语句 ⚠️ **谨慎使用**

```javascript
// 标签用于跳出嵌套循环
outer: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (i === 1 && j === 1) {
      break outer;  // 跳出外层循环
    }
    console.log(i, j);
  }
}
// 输出: 0,0 0,1 0,2 1,0

// continue 也可以使用标签
outer: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (i === 1 && j === 1) {
      continue outer;
    }
    console.log(i, j);
  }
}
```

---

## 4. 异常处理

### 4.1 try...catch 语句

```javascript
// 基本语法
try {
  // 可能抛出错误的代码
} catch (error) {
  // 处理错误
} finally {
  // 总是执行 (可选)
}

// 示例
try {
  const result = riskyOperation();
  console.log(result);
} catch (error) {
  console.error("发生错误:", error.message);
} finally {
  console.log("清理工作");
}

// ✅ ES2019+: 可选的 catch 绑定
try {
  JSON.parse(invalidJson);
} catch {
  console.log("解析失败");  // 不需要 error 参数
}
```

### 4.2 throw 语句

```javascript
// 抛出错误
throw new Error("Something went wrong");

// 抛出不同类型的值
throw "Error message";
throw 404;
throw { code: 500, message: "Server Error" };

// ✅ 推荐: Error 对象
throw new Error("描述性错误信息");
throw new TypeError("类型错误");
throw new RangeError("超出范围");

// 示例
function divide(a, b) {
  if (b === 0) {
    throw new Error("除数不能为零");
  }
  return a / b;
}

try {
  divide(10, 0);
} catch (error) {
  console.error(error.message);  // "除数不能为零"
}
```

---

## 5. 最佳实践

### 5.1 条件语句

```javascript
// ✅ 使用明确的条件
if (isValid) { }

// ❌ 避免双重否定
if (!isInvalid) { }

// ✅ 提前返回 (Guard Clause)
function process(data) {
  if (!data) return null;
  if (!data.isValid) return null;
  // 主要逻辑
  return processData(data);
}

// ❌ 嵌套过深
function process(data) {
  if (data) {
    if (data.isValid) {
      // 主要逻辑
      return processData(data);
    }
  }
  return null;
}
```

### 5.2 循环选择

```javascript
// ✅ 已知次数: for 循环
for (let i = 0; i < 10; i++) { }

// ✅ 未知次数: while 循环
while (.hasMoreData()) { }

// ✅ 遍历数组: for...of
for (const item of array) { }

// ✅ 遍历对象: for...in
for (const key in object) {
  if (object.hasOwnProperty(key)) {
    // 使用 key
  }
}

// ✅ 需要索引: for...of + entries()
for (const [index, item] of array.entries()) {
  console.log(index, item);
}
```

### 5.3 性能考虑

```javascript
// ❌ 避免在循环条件中进行复杂计算
for (let i = 0; i < array.length; i++) { }
// 如果 array.length 可能变化，这是必需的
// 如果不变，可以先缓存长度

// ✅ 缓存长度 (大数组时)
const len = array.length;
for (let i = 0; i < len; i++) { }

// ✅ 现代引擎优化后差异不大，使用可读性更好的方式
for (let i = 0; i < array.length; i++) { }

// ✅ 遍历数组优先使用 for...of (更简洁)
for (const item of array) { }
```

---

**下一步**: 完成 `exercises/03-控制流/` 目录下的练习题 🚀
