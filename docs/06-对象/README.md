# 模块 06: 对象

> 📖 **学习目标**: 掌握 JavaScript 对象的创建、操作和方法

## 目录

1. [对象创建](#1-对象创建)
2. [对象属性](#2-对象属性)
3. [对象方法](#3-对象方法)
4. [解构与展开](#4-解构与展开)
5. [Object 静态方法](#5-object-静态方法)
6. [对象原型](#6-对象原型)

---

## 1. 对象创建

### 1.1 对象字面量 ✅ **推荐**

```javascript
// 基本语法
const obj = {
  name: "Alice",
  age: 30,
  greet: function() {
    return `Hello, I'm ${this.name}`;
  }
};

// 简写 (属性名与变量名相同)
const name = "Bob";
const age = 25;
const person = { name, age };

// 方法简写 ✅ ES2015
const user = {
  name: "Charlie",
  greet() {  // 等同于 greet: function()
    return `Hi, I'm ${this.name}`;
  },
  // 计算属性名 ✅
  ["user_" + Date.now()]: true
};

// ⚠️ 注意: 简写方法不能用作构造函数
const obj = {
  method() {}
};
// new obj.method();  // TypeError
```

### 1.2 构造函数

```javascript
// 构造函数
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.greet = function() {
  return `Hello, I'm ${this.name}`;
};

const person = new Person("Alice", 30);

// ✅ ES2015 class 语法 (推荐)
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return `Hello, I'm ${this.name}`;
  }
}
```

### 1.3 Object.create()

```javascript
// 创建对象并指定原型
const proto = {
  greet() {
    return `Hello, I'm ${this.name}`;
  }
};

const person = Object.create(proto);
person.name = "Alice";

// ✅ 创建纯净对象 (无原型)
const empty = Object.create(null);
// toString 等方法都不存在
```

---

## 2. 对象属性

### 2.1 属性访问

```javascript
const user = {
  name: "Alice",
  "user-id": 123  // 特殊属性名
};

// 点记法 ✅ (常用)
user.name;  // "Alice"

// 方括号记法 (必需)
user["user-id"];  // 123
user["name"];     // "Alice"

// 动态属性名 ✅
const key = "name";
user[key];  // "Alice"

// 可选链 ✅ ES2020
const addr = user.address?.city;  // undefined (不报错)

// ⚠️ 未定义属性
user.nonExistent;  // undefined
```

### 2.2 属性添加、修改、删除

```javascript
const user = { name: "Alice" };

// 添加/修改属性
user.age = 30;
user["email"] = "alice@example.com";

// 删除属性
delete user.age;  // true
delete user["email"];  // true

// ⚠️ 删除不存在的属性
delete user.nonExistent;  // true (不报错)

// ⚠️ 无法删除的属性
const config = {};
Object.defineProperty(config, "readonly", {
  value: 42,
  configurable: false
});
delete config.readonly;  // false (无法删除)
```

### 2.3 属性描述符 ✅ **重要**

```javascript
// 数据属性
const obj = {};
Object.defineProperty(obj, "name", {
  value: "Alice",
  writable: true,      // 可修改
  enumerable: true,    // 可枚举 (for...in 可见)
  configurable: true   // 可删除/修改描述符
});

// 存取器属性
const user = {
  _age: 25,
  get age() {
    return this._age;
  },
  set age(value) {
    if (value < 0) {
      throw new Error("年龄不能为负");
    }
    this._age = value;
  }
};

// 定义多个属性 ✅
Object.defineProperties(obj, {
  firstName: { value: "Alice", writable: true },
  lastName: { value: "Smith", writable: true },
  fullName: {
    get() { return `${this.firstName} ${this.lastName}`; }
  }
});

// 获取属性描述符
Object.getOwnPropertyDescriptor(obj, "name");
// { value: "Alice", writable: true, enumerable: true, configurable: true }
```

---

## 3. 对象方法

### 3.1 常用实例方法

```javascript
const obj = { a: 1, b: 2, c: 3 };

// Object.prototype.hasOwnProperty() ✅ 检查自身属性
obj.hasOwnProperty("a");  // true
obj.hasOwnProperty("toString");  // false (原型链上的)

// ✅ 推荐使用静态方法 (更安全)
Object.hasOwn(obj, "a");  // true ✅ ES2022

// Object.prototype.toString() (类型检查)
Object.prototype.toString.call(obj);  // "[object Object]"
Object.prototype.toString.call([]);   // "[object Array]"

// Object.prototype.valueOf()
const num = new Number(42);
num.valueOf();  // 42
```

### 3.2 对象比较

```javascript
// ⚠️ 对象是引用比较
const obj1 = { a: 1 };
const obj2 = { a: 1 };
obj1 === obj2;  // false (不同引用)

const obj3 = obj1;
obj1 === obj3;  // true (相同引用)

// ✅ 浅比较
function shallowEqual(obj1, obj2) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (obj1[key] !== obj2[key]) return false;
  }

  return true;
}

// ✅ 深比较
function deepEqual(obj1, obj2) {
  if (obj1 === obj2) return true;

  if (typeof obj1 !== "object" || typeof obj2 !== "object") {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (!keys2.includes(key)) return false;
    if (!deepEqual(obj1[key], obj2[key])) return false;
  }

  return true;
}
```

---

## 4. 解构与展开

### 4.1 对象解构

```javascript
const user = {
  name: "Alice",
  age: 30,
  address: {
    city: "NYC",
    country: "USA"
  }
};

// 基本解构
const { name, age } = user;
// name = "Alice", age = 30

// 重命名
const { name: userName, age: userAge } = user;

// 默认值
const { name, role = "user" } = user;
// role = "user"

// 嵌套解构
const { address: { city } } = user;
// city = "NYC"

// 解构剩余
const { name, ...rest } = user;
// name = "Alice"
// rest = { age: 30, address: {...} }

// 函数参数解构 ✅
function greet({ name, age = 25 }) {
  return `Hi ${name}, you're ${age}`;
}
greet({ name: "Bob" });  // "Hi Bob, you're 25"
```

### 4.2 对象展开

```javascript
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };

// 合并对象 ✅
const merged = { ...obj1, ...obj2 };
// { a: 1, b: 2, c: 3, d: 4 }

// 覆盖属性
const updated = { ...obj1, b: 20 };
// { a: 1, b: 20 }

// 添加属性
const withNew = { ...obj1, e: 5 };
// { a: 1, b: 2, e: 5 }

// ⚠️ 浅拷贝
const original = { nested: { value: 1 } };
const copy = { ...original };
copy.nested.value = 2;
original.nested.value;  // 2 (被影响!)

// ✅ 深拷贝
const deepCopy = JSON.parse(JSON.stringify(original));
// 或使用 structuredClone ✅ ES2021
const deepCopy2 = structuredClone(original);
```

---

## 5. Object 静态方法

### 5.1 对象操作

```javascript
const obj = { a: 1, b: 2, c: 3 };

// Object.keys() - 获取键数组 ✅
Object.keys(obj);  // ["a", "b", "c"]

// Object.values() - 获取值数组 ✅
Object.values(obj);  // [1, 2, 3]

// Object.entries() - 获取键值对数组 ✅
Object.entries(obj);  // [["a", 1], ["b", 2], ["c", 3]]

// Object.fromEntries() - 从键值对创建对象 ✅
const entries = [["a", 1], ["b", 2]];
Object.fromEntries(entries);  // { a: 1, b: 2 }

// Object.assign() - 合并对象 (修改第一个对象)
const target = { a: 1 };
const source = { b: 2 };
Object.assign(target, source);
// target = { a: 1, b: 2 }

// ⚠️ 只拷贝自身可枚举属性
// ⚠️ 浅拷贝
```

### 5.2 对象检查

```javascript
// Object.is() - 严格比较 ✅
Object.is(5, 5);              // true
Object.is(NaN, NaN);          // true
Object.is(-0, 0);             // false
Object.is(null, undefined);   // false

// Object.hasOwn() - 检查自身属性 ✅ ES2022
const obj = { a: 1 };
Object.hasOwn(obj, "a");  // true
Object.hasOwn(obj, "toString");  // false

// Object.isExtensible() - 是否可扩展
const empty = {};
Object.isExtensible(empty);  // true
Object.preventExtensions(empty);
Object.isExtensible(empty);  // false

// Object.isSealed() - 是否密封
Object.preventExtensions(obj);
Object.seal(obj);
Object.isSealed(obj);  // true

// Object.isFrozen() - 是否冻结
Object.freeze(obj);
Object.isFrozen(obj);  // true
```

### 5.3 对象保护

```javascript
const config = {
  apiKey: "abc123",
  endpoint: "https://api.example.com"
};

// Object.preventExtensions() - 禁止添加新属性
Object.preventExtensions(config);
config.newProp = "value";  // 静默失败 (严格模式报错)

// Object.seal() - 密封 (禁止添加/删除属性)
Object.seal(config);
delete config.apiKey;  // 静默失败
config.apiKey = "xyz";  // ✅ 可以修改已有属性

// Object.freeze() - 冻结 (禁止任何修改) ✅
Object.freeze(config);
config.apiKey = "xyz";  // 静默失败
delete config.endpoint;  // 静默失败

// ⚠️ freeze 是浅冻结
const obj = {
  data: { value: 1 }
};
Object.freeze(obj);
obj.data.value = 2;  // ✅ 可以修改嵌套对象

// ✅ 深冻结函数
function deepFreeze(obj) {
  Object.freeze(obj);
  for (const value of Object.values(obj)) {
    if (typeof value === "object" && value !== null) {
      deepFreeze(value);
    }
  }
  return obj;
}
```

---

## 6. 对象原型

### 6.1 原型链

```javascript
// 每个对象都有原型
const obj = {};
Object.getPrototypeOf(obj) === Object.prototype;  // true

// 函数的原型
function Person() {}
Person.prototype.sayHello = function() {
  return "Hello";
};

const person = new Person();
person.sayHello();  // "Hello"

// 原型链查找
person.toString();  // 来自 Object.prototype

// 检查属性
person.hasOwnProperty("sayHello");  // false (来自原型)
"name" in person;  // true (包括原型链)
```

### 6.2 原型操作

```javascript
// 设置原型 ⚠️ 性能差
const obj = { a: 1 };
const proto = { b: 2 };
Object.setPrototypeOf(obj, proto);
obj.b;  // 2

// 获取原型
Object.getPrototypeOf(obj) === proto;  // true

// ✅ 创建时指定原型 (性能更好)
const obj2 = Object.create(proto);
obj2.a = 1;
obj2.b;  // 2
```

---

## 7. 最佳实践

### 7.1 对象创建

```javascript
// ✅ 使用对象字面量
const user = {
  name: "Alice",
  age: 30
};

// ❌ 避免 new Object()
const user = new Object();
user.name = "Alice";
```

### 7.2 属性访问

```javascript
// ✅ 点记法 (属性名确定)
user.name;

// ✅ 方括号 (属性名动态或特殊)
user["user-name"];
user[key];

// ✅ 可选链
user.address?.city;
```

### 7.3 对象拷贝

```javascript
// ✅ 浅拷贝: 展开运算符
const copy = { ...original };

// ✅ 深拷贝: structuredClone
const deepCopy = structuredClone(original);

// ⚠️ JSON 方法有限制
// - 函数会被忽略
// - undefined 会被忽略
// - 循环引用会报错
const jsonCopy = JSON.parse(JSON.stringify(original));
```

---

**下一步**: 完成 `exercises/06-对象/` 目录下的练习题 🚀
