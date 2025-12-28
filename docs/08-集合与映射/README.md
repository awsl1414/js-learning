# 模块 08: 集合与映射

> 📖 **学习目标**: 掌握 JavaScript 中的 Map、Set 及其 Weak 变体

## 目录

1. [Set 集合](#1-set-集合)
2. [WeakSet 弱引用集合](#2-weakset-弱引用集合)
3. [Map 映射](#3-map-映射)
4. [WeakMap 弱引用映射](#4-weakmap-弱引用映射)
5. [选择指南](#5-选择指南)

---

## 1. Set 集合

### 1.1 创建和基本操作

```javascript
// 创建 Set
const set = new Set();

// 添加元素 ✅
set.add(1);
set.add(2);
set.add(3);
set.add(2);  // 重复值会被忽略

console.log(set);  // Set {1, 2, 3}

// 初始化时传入数组 ✅
const set2 = new Set([1, 2, 3, 2, 1]);
console.log(set2);  // Set {1, 2, 3} (自动去重)

// 字符串去重 ✅
const uniqueChars = [...new Set("hello")];
console.log(uniqueChars);  // ["h", "e", "l", "o"]

// 数组去重 ✅
const arr = [1, 2, 2, 3, 3, 3];
const uniqueArr = [...new Set(arr)];
console.log(uniqueArr);  // [1, 2, 3]

// 检查元素
set.has(1);  // true
set.has(10); // false

// 删除元素
set.delete(2);  // true
set.delete(10); // false (元素不存在)

// 清空
set.clear();
set.size;  // 0
```

### 1.2 遍历 Set

```javascript
const set = new Set(["a", "b", "c"]);

// for...of ✅
for (const item of set) {
  console.log(item);
}

// forEach()
set.forEach((value, key, set) => {
  console.log(value);  // value 和 key 相同
});

// 转数组
[...set];              // ["a", "b", "c"]
Array.from(set);       // ["a", "b", "c"]

// 解构
const [first, second] = set;
console.log(first, second);  // "a" "b"

// keys(), values(), entries()
set.keys();    // SetIterator {"a", "b", "c"}
set.values();  // SetIterator {"a", "b", "c"}
set.entries(); // SetIterator {["a", "a"], ["b", "b"], ["c", "c"]}
```

### 1.3 Set 实用方法

```javascript
// 交集 ✅
const setA = new Set([1, 2, 3, 4]);
const setB = new Set([3, 4, 5, 6]);

const intersection = [...setA].filter(item => setB.has(item));
console.log(intersection);  // [3, 4]

// 并集
const union = new Set([...setA, ...setB]);
console.log(union);  // Set {1, 2, 3, 4, 5, 6}

// 差集
const difference = [...setA].filter(item => !setB.has(item));
console.log(difference);  // [1, 2]

// 判断子集
const isSubset = (set1, set2) =>
  [...set1].every(item => set2.has(item));

isSubset(new Set([1, 2]), setA);  // true

// 判断真子集
const isProperSubset = (set1, set2) =>
  isSubset(set1, set2) && set1.size < set2.size;
```

---

## 2. WeakSet 弱引用集合

### 2.1 WeakSet 特点

```javascript
// ⚠️ WeakSet 只能存储对象
const weakSet = new WeakSet();

const obj1 = { name: "Alice" };
const obj2 = { name: "Bob" };

weakSet.add(obj1);
weakSet.add(obj2);
// weakSet.add(1);  // TypeError!

// ✅ 没有遍历方法 (不可迭代)
// weakSet.forEach();  // TypeError
// for (const item of weakSet) {}  // TypeError

// ✅ 没有size属性
// weakSet.size;  // undefined

// ✅ 弱引用: 对象被回收后自动移除
let obj = { data: "value" };
const ws = new WeakSet();
ws.add(obj);

obj = null;  // 解除引用
// { data: "value" } 对象可能被垃圾回收
// ws 中的引用自动移除
```

### 2.2 WeakSet 用途

```javascript
// ✅ 跟踪对象是否被处理过
const processed = new WeakSet();

function process(obj) {
  if (processed.has(obj)) {
    console.log("Already processed");
    return;
  }

  // 处理对象
  console.log("Processing...");

  processed.add(obj);
}

const data = { value: 1 };
process(data);  // Processing...
process(data);  // Already processed

// ✅ 私有数据标记
const privateData = new WeakSet();

function createPrivateObject() {
  const obj = { public: "data" };
  privateData.add(obj);
  return obj;
}

const obj = createPrivateObject();
console.log(privateData.has(obj));  // true
```

---

## 3. Map 映射

### 3.1 创建和基本操作

```javascript
// 创建 Map
const map = new Map();

// 设置键值 ✅
map.set("name", "Alice");
map.set("age", 30);
map.set(1, "one");

// 链式调用 ✅
map.set("a", 1)
   .set("b", 2)
   .set("c", 3);

// 初始化 ✅
const map2 = new Map([
  ["name", "Bob"],
  ["age", 25]
]);

// 获取值
map.get("name");  // "Alice"
map.get("xyz");   // undefined

// 检查键
map.has("name");  // true
map.has("xyz");   // false

// 删除
map.delete("age");  // true
map.delete("xyz");  // false

// 清空
map.clear();
map.size;  // 0
```

### 3.2 Map vs Object

```javascript
// ✅ Map 的优势

// 1. 键可以是任意类型
const map = new Map();
map.set(1, "one");
map.set(true, "boolean");
map.set({ id: 1 }, "object");
map.set(document.body, "DOM element");

// 2. 有序 (插入顺序)
for (const [key, value] of map) {
  console.log(key, value);
}

// 3. size 属性
map.size;  // 直接获取大小

// 4. 可迭代
for (const [key, value] of map) { }

// 5. 频繁增删操作性能更好

// ⚠️ Object 的优势
// - JSON 序列化
// - 简单的键值对
// - 更好的性能 (小数据量)
```

### 3.3 遍历 Map

```javascript
const map = new Map([
  ["name", "Alice"],
  ["age", 30],
  ["city", "NYC"]
]);

// for...of ✅
for (const [key, value] of map) {
  console.log(key, value);
}

// forEach()
map.forEach((value, key, map) => {
  console.log(key, value);
});

// keys(), values(), entries()
for (const key of map.keys()) {
  console.log(key);
}

for (const value of map.values()) {
  console.log(value);
}

for (const [key, value] of map.entries()) {
  console.log(key, value);
}

// 转数组
[...map];              // [["name", "Alice"], ["age", 30], ["city", "NYC"]]
[...map.keys()];       // ["name", "age", "city"]
[...map.values()];     // ["Alice", 30, "NYC"]

// 转对象
Object.fromEntries(map);  // { name: "Alice", age: 30, city: "NYC" }
```

### 3.4 Map 实用操作

```javascript
const map = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3]
]);

// 过滤 ✅
const filtered = new Map(
  [...map].filter(([key, value]) => value > 1)
);
// Map {"b" => 2, "c" => 3}

// 映射 ✅
const mapped = new Map(
  [...map].map(([key, value]) => [key, value * 2])
);
// Map {"a" => 2, "b" => 4, "c" => 6}

// 合并 ✅
const map1 = new Map([["a", 1]]);
const map2 = new Map([["b", 2]]);
const merged = new Map([...map1, ...map2]);
// Map {"a" => 1, "b" => 2}

// 获取键/值数组
const keys = [...map.keys()];    // ["a", "b", "c"]
const values = [...map.values()]; // [1, 2, 3]
```

---

## 4. WeakMap 弱引用映射

### 4.1 WeakMap 特点

```javascript
// ⚠️ WeakMap 键必须是对象
const weakMap = new WeakMap();

const obj = { id: 1 };
weakMap.set(obj, "metadata");
// weakMap.set("key", "value");  // TypeError!

// ✅ 没有遍历方法
// weakMap.forEach();  // TypeError

// ✅ 没有 size 属性
// weakMap.size;  // undefined

// ✅ 弱引用: 键被回收后自动移除
let key = { data: "value" };
const wm = new WeakMap();
wm.set(key, "metadata");

key = null;  // 解除引用
// { data: "value" } 可能被垃圾回收
// wm 中的映射自动移除
```

### 4.2 WeakMap 用途

```javascript
// ✅ 私有数据存储
const privateData = new WeakMap();

class User {
  constructor(name, age) {
    this.name = name;
    privateData.set(this, { age });  // 私有数据
  }

  getAge() {
    return privateData.get(this).age;
  }

  setAge(age) {
    privateData.get(this).age = age;
  }
}

const user = new User("Alice", 30);
console.log(user.name);   // "Alice"
console.log(user.age);    // undefined (私有)
console.log(user.getAge()); // 30

// ✅ DOM 节点关联数据
const nodeData = new WeakMap();

function attachData(node, data) {
  nodeData.set(node, data);
}

const button = document.querySelector("button");
attachData(button, { clicks: 0 });

button.addEventListener("click", () => {
  const data = nodeData.get(button);
  data.clicks++;
  console.log(`Clicked ${data.clicks} times`);
});

// 节点被移除后数据自动清理
button.remove();
// nodeData 中的条目自动移除

// ✅ 缓存计算结果
const cache = new WeakMap();

function process(obj) {
  if (cache.has(obj)) {
    return cache.get(obj);
  }

  const result = /* 复杂计算 */ "computed";
  cache.set(obj, result);
  return result;
}
```

---

## 5. 选择指南

### 5.1 Set vs Array

```javascript
// ✅ 使用 Set
// - 需要唯一值
// - 频繁检查存在性
// - 需要去重

const set = new Set([1, 2, 3]);
set.has(2);  // O(1) 快速查找

// ❌ 使用 Array
// - 需要索引访问
// - 需要排序
// - 需要重复值

const arr = [1, 2, 3];
arr.includes(2);  // O(n) 慢
```

### 5.2 Map vs Object

```javascript
// ✅ 使用 Map
// - 键类型多样
// - 频繁增删
// - 需要保持顺序
// - 需要知道大小

// ✅ 使用 Object
// - 键是字符串/Symbol
// - 简单的键值对
// - 需要 JSON 序列化
// - 静态配置
```

### 5.3 WeakSet/WeakMap

```javascript
// ✅ 使用 WeakSet
// - 需要跟踪对象
// - 不希望阻止垃圾回收
// - 不需要遍历

// ✅ 使用 WeakMap
// - 关联对象元数据
// - 私有数据存储
// - 缓存计算结果
```

---

## 6. 最佳实践

### 6.1 性能考虑

```javascript
// ✅ Set 去重
const unique = [...new Set(array)];

// ❌ Array.includes 去重 (慢)
const unique2 = array.filter((item, index) =>
  array.indexOf(item) === index
);

// ✅ Map 频繁增删
const map = new Map();
map.set(key, value);
map.delete(key);

// ❌ Object 频增删 (慢，需要遍历)
delete obj[key];
```

### 6.2 类型安全

```javascript
// ✅ 检查 Map/Set 类型
function isMap(value) {
  return value instanceof Map;
}

function isSet(value) {
  return value instanceof Set;
}

// ⚠️ WeakMap/WeakSet 无法检查实例
// 因为它们不可迭代
```

---

**下一步**: 完成 `exercises/08-集合与映射/` 目录下的练习题 🚀
