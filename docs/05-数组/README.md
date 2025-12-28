# 模块 05: 数组

> 📖 **学习目标**: 掌握 JavaScript 数组的创建、操作和常用方法

## 目录

1. [数组创建与初始化](#1-数组创建与初始化)
2. [数组基本操作](#2-数组基本操作)
3. [数组遍历方法](#3-数组遍历方法)
4. [数组转换方法](#4-数组转换方法)
5. [数组查找方法](#5-数组查找方法)
6. [数组操作方法](#6-数组操作方法)
7. [数组归约方法](#7-数组归约方法)
8. [ES2025+ 新方法](#8-es2025-新方法)

---

## 1. 数组创建与初始化

### 1.1 创建数组

```javascript
// 数组字面量 ✅ **推荐**
const arr1 = [1, 2, 3];
const arr2 = ["a", "b", "c"];
const arr3 = [1, "two", true, null, undefined]; // 混合类型
const arr4 = [];  // 空数组

// Array 构造函数
const arr5 = new Array(1, 2, 3);  // [1, 2, 3]
const arr6 = new Array(3);        // [empty x 3] (长度为 3 的空数组)
const arr7 = Array(1, 2, 3);      // [1, 2, 3] (无 new 也可以)

// ⚠️ 注意单一数字参数
new Array(3);    // [empty × 3]
new Array("3");  // ["3"]

// Array.of() ✅ ES2015
Array.of(3);        // [3] (单一数字也作为元素)
Array.of(1, 2, 3);  // [1, 2, 3]

// Array.from() ✅ ES2015
// 从类数组或可迭代对象创建数组
Array.from("hello");           // ["h", "e", "l", "l", "o"]
Array.from([1, 2, 3]);         // [1, 2, 3]
Array.from({ length: 3 });     // [undefined, undefined, undefined]

// 带映射函数
Array.from([1, 2, 3], x => x * 2);  // [2, 4, 6]
Array.from({ length: 3 }, (_, i) => i);  // [0, 1, 2]
```

### 1.2 数组长度

```javascript
const arr = [1, 2, 3, 4, 5];

arr.length;        // 5
arr.length = 3;    // 截断数组: [1, 2, 3]
arr.length = 5;    // 扩展数组: [1, 2, 3, empty × 2]
arr.length = 0;    // 清空数组: []

// ⚠️ 稀疏数组
const sparse = [1, , , 4];  // [1, empty, empty, 4]
sparse.length;      // 4
sparse[1];          // undefined

// ✅ 避免创建稀疏数组
const dense = [1, undefined, undefined, 4];
```

---

## 2. 数组基本操作

### 2.1 访问和修改元素

```javascript
const arr = ["a", "b", "c", "d"];

// 访问元素
arr[0];    // "a" (第一个)
arr[1];    // "b"
arr[arr.length - 1];  // "d" (最后一个)
arr.at(-1);  // "d" ✅ ES2022 (支持负索引)

// 修改元素
arr[1] = "x";     // ["a", "x", "c", "d"]
arr[arr.length] = "e";  // ["a", "x", "c", "d", "e"]

// ⚠️ 越界访问
arr[100];         // undefined (不会报错)
arr[100] = "z";   // 创建稀疏数组

// ✅ 使用 at() 方法更安全
arr.at(0);   // "a"
arr.at(-1);  // "e"
arr.at(100); // undefined
```

### 2.2 添加和删除元素

```javascript
const arr = [1, 2, 3];

// 尾部操作
arr.push(4);      // 返回 4, arr = [1, 2, 3, 4]
arr.push(5, 6);   // 返回 6, arr = [1, 2, 3, 4, 5, 6]
const last = arr.pop();  // 返回 6, arr = [1, 2, 3, 4, 5]

// 头部操作
arr.unshift(0);   // 返回 6, arr = [0, 1, 2, 3, 4, 5]
arr.unshift(-1, -2);  // 返回 8, arr = [-2, -1, 0, 1, 2, 3, 4, 5]
const first = arr.shift();  // 返回 -2, arr = [-1, 0, 1, 2, 3, 4, 5]

// ⚠️ push/unshift 性能问题 (需要移动所有元素)
// 大数组时使用其他方法
```

### 2.3 数组拼接

```javascript
// concat() - 不修改原数组
const arr1 = [1, 2];
const arr2 = [3, 4];
const arr3 = arr1.concat(arr2);  // [1, 2, 3, 4]
const arr4 = arr1.concat(arr2, [5, 6]);  // [1, 2, 3, 4, 5, 6]

// ✅ 展开运算符 (更灵活)
const arr5 = [...arr1, ...arr2];  // [1, 2, 3, 4]
const arr6 = [...arr1, 0, ...arr2];  // [1, 2, 0, 3, 4]

// 扁平化 ✅ ES2019
const nested = [1, [2, [3, [4]]]];
nested.flat();           // [1, 2, [3, [4]]] (默认深度 1)
nested.flat(2);          // [1, 2, 3, [4]]
nested.flat(Infinity);   // [1, 2, 3, 4] (完全扁平)

// flatMap() ✅ ES2019
const pairs = [[1, 2], [3, 4]];
pairs.flatMap(pair => pair);  // [1, 2, 3, 4]
// 等同于 pairs.flat().map(...)
```

---

## 3. 数组遍历方法

### 3.1 forEach()

```javascript
const arr = [1, 2, 3, 4, 5];

// 基本用法
arr.forEach((item, index, array) => {
  console.log(item, index);
});

// 对象方法调用
const obj = {
  value: 10,
  double(arr) {
    arr.forEach(function(item) {
      console.log(item * this.value);  // this 指向 obj
    }, this);  // 传递 thisArg
  }
};

// ⚠️ forEach 无法中断 (使用 break)
// 需要中断使用 for...of
for (const item of arr) {
  if (item > 3) break;
  console.log(item);
}
```

---

## 4. 数组转换方法

### 4.1 map() ✅ **常用**

```javascript
// 创建新数组 (不修改原数组)
const arr = [1, 2, 3, 4, 5];

const doubled = arr.map(x => x * 2);  // [2, 4, 6, 8, 10]

const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" }
];
const names = users.map(user => user.name);  // ["Alice", "Bob"]

// 带 index
const indexed = arr.map((item, index) => ({
  index,
  value: item
}));

// ⚠️ map 跳过空位
[1, , 3].map(x => x * 2);  // [2, empty, 6]
```

### 4.2 其他转换方法

```javascript
const arr = [1, 2, 3, 4, 5];

// filter() - 过滤 ✅
const evens = arr.filter(x => x % 2 === 0);  // [2, 4]

// slice() - 提取子数组 (不修改原数组)
const sliced = arr.slice(1, 4);  // [2, 3, 4]
const sliced2 = arr.slice(-3);   // [3, 4, 5]
const copied = arr.slice();      // [1, 2, 3, 4, 5] (浅拷贝)

// splice() - 删除/插入/替换 (修改原数组)
const removed = arr.splice(1, 2);  // 返回 [2, 3], arr = [1, 4, 5]
arr.splice(1, 0, 2, 3);  // 在位置 1 插入 2, 3: arr = [1, 2, 3, 4, 5]
arr.splice(1, 2, 20, 30);  // 替换: arr = [1, 20, 30, 4, 5]

// reverse() - 反转 (修改原数组)
const arr2 = [1, 2, 3];
arr2.reverse();  // [3, 2, 1]

// sort() - 排序 (修改原数组)
const nums = [3, 1, 4, 1, 5];
nums.sort();  // [1, 1, 3, 4, 5] (默认按字符串排序!)

// ⚠️ 数字排序需要比较函数
nums.sort((a, b) => a - b);  // 升序
nums.sort((a, b) => b - a);  // 降序

// 对象数组排序
const users = [
  { name: "Bob", age: 30 },
  { name: "Alice", age: 25 }
];
users.sort((a, b) => a.age - b.age);  // 按年龄升序

// join() - 转字符串
const words = ["Hello", "World"];
words.join(" ");  // "Hello World"
words.join("");   // "HelloWorld"
words.join(", "); // "Hello, World"
```

---

## 5. 数组查找方法

### 5.1 查找元素

```javascript
const arr = [1, 2, 3, 4, 5];

// indexOf() - 查找索引
arr.indexOf(3);      // 2
arr.indexOf(10);     // -1 (未找到)
arr.indexOf(2, 2);   // -1 (从位置 2 开始查找)

// lastIndexOf() - 从后查找
arr.lastIndexOf(4);  // 3

// includes() - 检查包含 ✅ ES2016
arr.includes(3);     // true
arr.includes(10);    // false
[NaN].includes(NaN); // true ✅

// find() - 查找符合条件的元素 ✅
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" }
];
const user = users.find(u => u.id === 2);  // { id: 2, name: "Bob" }
const notFound = users.find(u => u.id === 3);  // undefined

// findIndex() - 查找索引 ✅
users.findIndex(u => u.name === "Bob");  // 1
users.findIndex(u => u.name === "Charlie");  // -1

// findLast() ✅ ES2023
[1, 2, 3, 2, 1].findLast(x => x === 2);  // 2 (最后一个 2)

// findLastIndex() ✅ ES2023
[1, 2, 3, 2, 1].findLastIndex(x => x === 2);  // 3
```

### 5.2 检查条件

```javascript
const arr = [2, 4, 6, 8, 10];

// every() - 所有元素都满足条件 ✅
arr.every(x => x % 2 === 0);  // true
arr.every(x => x > 5);        // false

// some() - 至少一个元素满足条件 ✅
arr.some(x => x > 8);         // true
arr.some(x => x % 2 !== 0);   // false
```

---

## 6. 数组操作方法

### 6.1 填充和复制

```javascript
// fill() - 填充 ✅ ES2015
const arr = new Array(5);
arr.fill(0);  // [0, 0, 0, 0, 0]

[1, 2, 3].fill(0);     // [0, 0, 0]
[1, 2, 3, 4, 5].fill(0, 1, 3);  // [1, 0, 0, 4, 5]

// copyWithin() - 内部复制 ✅ ES2015
const arr2 = [1, 2, 3, 4, 5];
arr2.copyWithin(0, 3);  // [4, 5, 3, 4, 5] (从位置 3 复制到位置 0)
arr2.copyWithin(0, 3, 4);  // [4, 2, 3, 4, 5] (复制索引 3 到 4-1)
```

### 6.2 数组排序优化

```javascript
// 快速打乱数组 (Fisher-Yates 洗牌算法)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// toSorted() ✅ ES2023 (不修改原数组)
const arr = [3, 1, 2];
const sorted = arr.toSorted();  // [1, 2, 3]
console.log(arr);  // [3, 1, 2] (原数组不变)

// toReversed() ✅ ES2023
const arr2 = [1, 2, 3];
const reversed = arr2.toReversed();  // [3, 2, 1]
console.log(arr2);  // [1, 2, 3]

// toSpliced() ✅ ES2023
const arr3 = [1, 2, 3, 4];
const spliced = arr3.toSpliced(1, 2, 20, 30);  // [1, 20, 30, 4]
console.log(arr3);  // [1, 2, 3, 4]
```

---

## 7. 数组归约方法

### 7.1 reduce() ✅ **核心方法**

```javascript
const arr = [1, 2, 3, 4, 5];

// 基本用法
const sum = arr.reduce((acc, item) => acc + item, 0);  // 15

// 不提供初始值 (使用第一个元素作为初始值)
const sum2 = arr.reduce((acc, item) => acc + item);  // 15

// 找最大值
const max = arr.reduce((max, item) => Math.max(max, item));  // 5

// 统计频率
const words = ["a", "b", "a", "c", "b", "a"];
const frequency = words.reduce((acc, word) => {
  acc[word] = (acc[word] || 0) + 1;
  return acc;
}, {});
// { a: 3, b: 2, c: 1 }

// 分组
const people = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 25 }
];
const grouped = people.reduce((acc, person) => {
  const age = person.age;
  if (!acc[age]) acc[age] = [];
  acc[age].push(person);
  return acc;
}, {});
// { 25: [{...}, {...}], 30: [{...}] }
```

### 7.2 reduceRight()

```javascript
// 从右向左归约
const arr = [[1, 2], [3, 4], [5, 6]];
const flattened = arr.reduceRight((acc, item) => acc.concat(item));
// [5, 6, 3, 4, 1, 2]

// 与 reduce 对比
arr.reduce((acc, item) => acc.concat(item));
// [1, 2, 3, 4, 5, 6]
```

---

## 8. ES2025+ 新方法

### 8.1 数组分组 ✅ ES2024 (Stage 3)

```javascript
// Object.groupBy() ✅
const people = [
  { name: "Alice", role: "admin" },
  { name: "Bob", role: "user" },
  { name: "Charlie", role: "admin" }
];

const grouped = Object.groupBy(people, person => person.role);
// {
//   admin: [{ name: "Alice", role: "admin" }, { name: "Charlie", role: "admin" }],
//   user: [{ name: "Bob", role: "user" }]
// }

// Map.groupBy() ✅
const mapGrouped = Map.groupBy(people, person => person.role);
// Map { 'admin' => [...], 'user' => [...] }
```

### 8.2 其他新方法

```javascript
// with() ✅ ES2023 (不可变更新)
const arr = [1, 2, 3, 4];
const updated = arr.with(2, 30);  // [1, 2, 30, 4]
console.log(arr);  // [1, 2, 3, 4] (原数组不变)

// 支持负索引
arr.with(-1, 40);  // [1, 2, 3, 40]
```

---

## 9. 最佳实践

### 9.1 方法选择

```javascript
// ✅ 遍历并创建新数组: map()
const doubled = [1, 2, 3].map(x => x * 2);

// ✅ 遍历并过滤: filter()
const evens = [1, 2, 3, 4].filter(x => x % 2 === 0);

// ✅ 查找元素: find()
const user = users.find(u => u.id === 1);

// ✅ 检查存在: some()/includes()
const hasEven = [1, 2, 3].some(x => x % 2 === 0);
const hasThree = [1, 2, 3].includes(3);

// ✅ 累积计算: reduce()
const sum = [1, 2, 3].reduce((a, b) => a + b, 0);

// ✅ 副作用操作: forEach()
[1, 2, 3].forEach(x => console.log(x));

// ✅ 需要中断: for...of
for (const item of array) {
  if (condition) break;
}
```

### 9.2 性能考虑

```javascript
// ❌ 链式调用创建中间数组
const result = arr.map(x => x * 2)
                  .filter(x => x > 5)
                  .map(x => x + 1);

// ✅ 使用 reduce 一次遍历
const result2 = arr.reduce((acc, x) => {
  const doubled = x * 2;
  if (doubled > 5) acc.push(doubled + 1);
  return acc;
}, []);

// ✅ 使用 for...of (最高性能)
const result3 = [];
for (const x of arr) {
  const doubled = x * 2;
  if (doubled > 5) result3.push(doubled + 1);
}
```

---

**下一步**: 完成 `exercises/05-数组/` 目录下的练习题 🚀
