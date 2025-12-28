# 模块 01: 变量声明与数据类型

> 📖 **学习目标**: 掌握 JavaScript 中的变量声明方式和基本数据类型

## 目录

1. [变量声明](#1-变量声明)
2. [基本数据类型](#2-基本数据类型)
3. [类型转换](#3-类型转换)
4. [类型检查](#4-类型检查)
5. [最佳实践](#5-最佳实践)

---

## 1. 变量声明

### 1.1 `const` - 常量声明 ✅ **推荐**

```javascript
const PI = 3.14159;
const name = "JavaScript";

// ✅ 正确: 声明时必须初始化
const max = 100;

// ❌ 错误: 不能重新赋值
PI = 3.14;  // TypeError: Assignment to constant variable

// ❌ 错误: 必须初始化
const empty;  // SyntaxError: Missing initializer in const declaration
```

**特性**:
- 块级作用域 (Block Scope)
- 必须在声明时初始化
- 不可重新赋值
- 对于对象/数组，引用不可变，但内容可修改

```javascript
const user = { name: "Tom" };
user.name = "Jerry";  // ✅ 允许: 修改对象属性
user = {};            // ❌ 错误: 不能重新赋值
```

### 1.2 `let` - 变量声明 ✅ **推荐**

```javascript
let count = 0;
let isActive = true;

// ✅ 可以重新赋值
count = count + 1;
count = 10;

// ✅ 可以先声明后赋值
let score;
score = 100;
```

**特性**:
- 块级作用域 (Block Scope)
- 可以重新赋值
- 可以不初始化（默认为 `undefined`）
- 同一作用域内不能重复声明

```javascript
let x = 1;
// let x = 2;  // ❌ SyntaxError: Cannot redeclare block-scoped variable
```

### 1.3 `var` - 传统变量声明 ⚠️ **不推荐**

```javascript
var old = "传统方式";
```

**问题**:
- 函数作用域 (Function Scope) - 容易造成变量泄漏
- 存在变量提升 (Hoisting)
- 允许重复声明
- 没有 TDZ (Temporal Dead Zone)

```javascript
// 变量提升示例
console.log(x);  // undefined (不会报错)
var x = 10;

// 相当于:
var x;
console.log(x);
x = 10;
```

### 1.4 作用域对比

```javascript
// const/let - 块级作用域 ✅
if (true) {
  const blockScoped = "只在块内可见";
  console.log(blockScoped);  // ✅
}
console.log(blockScoped);    // ❌ ReferenceError

// var - 函数作用域 ⚠️
function test() {
  if (true) {
    var functionScoped = "泄漏到函数作用域";
  }
  console.log(functionScoped);  // ✅ 仍然可见
}
```

### 1.5 TDZ (Temporal Dead Zone)

```javascript
// let/const 存在 TDZ
console.log(x);  // ❌ ReferenceError: Cannot access 'x' before initialization
let x = 10;

// TDZ 在声明语句到初始化之间
{
  // TDZ 开始
  console.log(typeof x);  // ❌ ReferenceError
  let x = 10;  // TDZ 结束
}
```

---

## 2. 基本数据类型

### 2.1 类型概览

ES2025 中有 7 种原始类型 (Primitive Types) 和 1 种引用类型:

| 类型 | typeof 返回值 | 描述 |
|------|--------------|------|
| `Number` | `"number"` | 数字 (整数/浮点数) |
| `BigInt` | `"bigint"` | 大整数 |
| `String` | `"string"` | 字符串 |
| `Boolean` | `"boolean"` | 布尔值 |
| `Undefined` | `"undefined"` | 未定义 |
| `Null` | `"object"` | 空值 |
| `Symbol` | `"symbol"` | 唯一标识符 |
| `Object` | `"object"` | 对象 (含数组、函数等) |

### 2.2 Number - 数字类型

```javascript
// 整数
let integer = 42;
let negative = -17;
let zero = 0;

// 浮点数
let float = 3.14;
let scientific = 1.5e10;  // 15000000000
let negativeFloat = -2.5e-3;  // -0.0025

// 特殊值
let infinity = Infinity;
let negInfinity = -Infinity;
let notANumber = NaN;  // Not a Number

// 数字字面量 (ES2021+)
let billion = 1_000_000_000;        // 数字分隔符 ✅
let hex = 0xFF;                     // 十六进制
let binary = 0b1010;                // 二进制 ✅
let octal = 0o755;                  // 八进制 ✅

// 数字方法
Number.isInteger(42);       // true
Number.isFinite(Infinity);  // false
Number.isNaN(NaN);          // true
Number.parseFloat("3.14");  // 3.14
Number.parseInt("42px");    // 42

// ⚠️ 浮点数精度问题
0.1 + 0.2 === 0.3;  // false (实际是 0.30000000000000004)
// 解决: 使用 Number.EPSILON 或整数运算
```

### 2.3 BigInt - 大整数 ✅ ES2020

```javascript
// 创建 BigInt
let big1 = 9007199254740991n;  // 后缀 n
let big2 = BigInt("12345678901234567890");

// 运算
let sum = big1 + big2;
let product = big1 * 2n;

// ⚠️ 不能与 Number 混合运算
// big1 + 10;  // ❌ TypeError
big1 + 10n;   // ✅

// 比较
10n === 10;   // false (类型不同)
10n == 10;    // true (宽松相等)
```

### 2.4 String - 字符串类型

```javascript
// 单引号
let str1 = 'Hello';

// 双引号
let str2 = "World";

// 模板字符串 (Template Literals) ✅ **推荐**
let name = "Alice";
let greeting = `Hello, ${name}!`;  // 支持插值

// 多行字符串
let multiline = `
  第一行
  第二行
  第三行
`;

// 转义字符
let path = "C:\\Users\\Name";     // \
let quote = "He said \"Hi\"";     // \"
let newline = "Line1\nLine2";     // \n
let tab = "Col1\tCol2";           // \t

// 字符串方法 (常用)
str.length;           // 长度
str.toUpperCase();    // 转大写
str.toLowerCase();    // 转小写
str.trim();           // 去除首尾空格 ✅
str.slice(0, 5);      // 截取
str.split(",");       // 分割为数组
str.includes("text"); // 是否包含 ✅
str.startsWith("He"); // 是否以...开头 ✅
str.endsWith("lo");   // 是否以...结尾 ✅
str.repeat(3);        // 重复 ✅
str.replace("old", "new");  // 替换
str.replaceAll("a", "b");   // 全部替换 ✅

// 字符串不可变
let s = "hello";
s[0] = "H";  // ❌ 无效
s = s.toUpperCase();  // ✅ 创建新字符串

// Unicode 支持
let emoji = "😀";
[...emoji].length;  // 1 (正确)
emoji.length;       // 2 (错误，UTF-16 单元)
```

### 2.5 Boolean - 布尔类型

```javascript
let isTrue = true;
let isFalse = false;

// Boolean() 构造函数 (不推荐用于转换)
let b = Boolean(1);  // true

// 更推荐使用 !! 或 Boolean()
!!"text";     // true
!!"";         // false
!!0;          // false
!!1;          // true
!!null;       // false
!!undefined;  // false

// 假值 (Falsy Values)
// false, 0, -0, 0n, "", null, undefined, NaN

// 真值 (Truthy Values)
// 所有其他值，包括 "false", "0", [], {}
```

### 2.6 Undefined - 未定义

```javascript
// 未赋值的变量自动为 undefined
let x;
console.log(x);  // undefined

// 不存在的属性
let obj = {};
console.log(obj.noProp);  // undefined

// 显式赋值 (不推荐)
let y = undefined;

// 检查
typeof undefined;  // "undefined"
undefined === undefined;  // true
```

### 2.7 Null - 空值

```javascript
// 显式表示"无值"
let empty = null;

// ⚠️ typeof 的历史遗留问题
typeof null;  // "object" (这是 bug)

// 正确的 null 检查
let value = null;
value === null;  // true

// undefined vs null
undefined;  // 变量声明了但未赋值
null;       // 变量赋值为"空"

// ⚠️ 未声明变量 vs undefined
let declared;
console.log(declared);  // undefined
// console.log(notDeclared);  // ❌ ReferenceError
```

### 2.8 Symbol - 唯一标识符 ✅ ES2015

```javascript
// 创建 Symbol
let sym1 = Symbol();
let sym2 = Symbol("description");
let sym3 = Symbol("description");

// 每个 Symbol 都是唯一的
console.log(sym1 === sym1);  // true
console.log(sym2 === sym3);  // false

// 用途: 对象属性键 (避免命名冲突)
let id = Symbol("id");
let user = {
  name: "Alice",
  [id]: 123  // Symbol 属性
};

console.log(user[id]);  // 123
console.log(Object.keys(user));  // ["name"] (Symbol 属性不可枚举)

// 全局 Symbol 注册表
let globalSym = Symbol.for("app.id");
let sameGlobalSym = Symbol.for("app.id");
console.log(globalSym === sameGlobalSym);  // true

// 获取 Symbol 描述
Symbol("test").description;  // "test"
```

---

## 3. 类型转换

### 3.1 自动类型转换 (隐式转换)

```javascript
// 字符串拼接
"5" + 3;      // "53" (数字转字符串)
"5" + true;   // "5true"
"5" + null;   // "5null"
"5" + undefined;  // "5undefined"

// 算术运算
"5" - 2;      // 3 (字符串转数字)
"5" * 2;      // 10
"5" / 2;      // 2.5
"5" % 2;      // 1

// ⚠️ 特殊情况
"5" - "2";    // 3
"5" + "2";    // "52" (拼接，非相加)

// 比较运算
5 == "5";     // true (类型转换)
5 === "5";    // false (严格比较，不转换) ✅ 推荐使用

null == undefined;   // true
null === undefined;  // false

// 布尔转换
if ("text") { }    // true (非空字符串为真)
if ("") { }        // false
if (0) { }         // false
if ([]) { }        // true (空对象为真)
```

### 3.2 显式类型转换

```javascript
// 转字符串
String(123);           // "123"
String(true);          // "true"
String(null);          // "null"
String(undefined);     // "undefined"
String({});            // "[object Object]"

123.toString();        // "123"
(true).toString();     // "true"
// null.toString();    // ❌ TypeError

// 转数字
Number("123");         // 123
Number("123.45");      // 123.45
Number("123px");       // NaN
Number("");            // 0
Number(true);          // 1
Number(false);         // 0
Number(null);          // 0
Number(undefined);     // NaN

parseInt("123");       // 123
parseInt("123px");     // 123
parseInt("10", 2);     // 2 (二进制) ✅ 指定基数
parseInt("10", 10);    // 10 (十进制) ✅ 推荐始终指定

parseFloat("123.45");  // 123.45
parseFloat("123.45px"); // 123.45

// ⚠️ parseInt 的坑
parseInt("0x10");      // 16 (自动识别)
parseInt("010");       // 10 (现代 JS 不再识别八进制)

// 转布尔
Boolean(1);            // true
Boolean(0);            // false
Boolean("text");       // true
Boolean("");           // false
Boolean({});           // true
Boolean([]);           // true

// 简写: !! (双重否定)
!!1;        // true
!!0;        // false
!!"text";   // true

// ⚠️ 不要使用 new Boolean() 等包装类型
new Boolean(true);  // Boolean 对象 (不推荐)
```

### 3.3 转换规则表

| 原始值 | 转字符串 | 转数字 | 转布尔 |
|--------|---------|--------|--------|
| "123" | "123" | 123 | true |
| "" | "" | 0 | false |
| "0" | "0" | 0 | true |
| "abc" | "abc" | NaN | true |
| 0 | "0" | 0 | false |
| 123 | "123" | 123 | true |
| NaN | "NaN" | NaN | false |
| Infinity | "Infinity" | Infinity | true |
| true | "true" | 1 | true |
| false | "false" | 0 | false |
| null | "null" | 0 | false |
| undefined | "undefined" | NaN | false |
| {} | "[object Object]" | NaN | true |
| [] | "" | 0 | true |

---

## 4. 类型检查

### 4.1 `typeof` 操作符

```javascript
typeof 42;           // "number"
typeof 3.14;         // "number"
typeof 9007199254740991n;  // "bigint"
typeof "hello";      // "string"
typeof true;         // "boolean"
typeof undefined;    // "undefined"
typeof null;         // "object" ⚠️ (历史 bug)
typeof Symbol();     // "symbol"
typeof {};           // "object"
typeof [];           // "object"
typeof function(){}; // "function"

// ⚠️ typeof 的坑
typeof null;  // "object" (需要特殊处理)

// 正确检查 null
function isNull(value) {
  return value === null;
}
```

### 4.2 `instanceof` 操作符

```javascript
// 检查对象类型
[] instanceof Array;        // true
{} instanceof Object;       // true
new Date() instanceof Date; // true

// ⚠️ 不同上下文的问题
let iframe = document.createElement("iframe");
document.body.appendChild(iframe);
let iframeArray = iframe.contentWindow.Array;
iframeArray instanceof Array;  // false
Array.isArray(iframeArray);    // true ✅
```

### 4.3 `Object.prototype.toString`

```javascript
// 最准确的类型检查方法
function getType(value) {
  return Object.prototype.toString.call(value).slice(8, -1);
}

getType(42);           // "Number"
getType("hello");      // "String"
getType(true);         // "Boolean"
getType(undefined);    // "Undefined"
getType(null);         // "Null"
getType({});           // "Object"
getType([]);           // "Array"
getType(new Date());   // "Date"
getType(/regex/);      // "RegExp"
getType(Symbol());     // "Symbol"
getType(new Map());    // "Map"
getType(new Set());    // "Set"

// 常用类型检查函数
function isArray(value) {
  return Array.isArray(value);  // ✅ ES5
}

function isNull(value) {
  return value === null;
}

function isNumber(value) {
  return typeof value === "number" && !Number.isNaN(value);
}

function isString(value) {
  return typeof value === "string";
}

function isBoolean(value) {
  return typeof value === "boolean";
}

function isFunction(value) {
  return typeof value === "function";
}

function isObject(value) {
  return value !== null && typeof value === "object";
}

function isPlainObject(value) {
  return Object.prototype.toString.call(value) === "[object Object]";
}
```

---

## 5. 最佳实践

### 5.1 变量声明 ✅

```javascript
// ✅ 默认使用 const
const API_URL = "https://api.example.com";
const config = { debug: true };

// ✅ 需要重新赋值时使用 let
let count = 0;
count = count + 1;

// ❌ 避免 var (除非有特殊需求)
var old = "过时";  // 不推荐

// ✅ 声明风格
const MAX_RETRY = 3;      // 常量: 全大写
let userName = "Alice";   // 变量: camelCase

// ✅ 链式赋值 (使用解构)
const [a, b, c] = [1, 2, 3];
const { x, y } = { x: 1, y: 2 };
```

### 5.2 类型安全 ✅

```javascript
// ✅ 使用严格相等
if (value === null) { }
if (count !== 0) { }

// ❌ 避免宽松相等 (容易出错)
if (value == null) { }  // 会匹配 null 和 undefined

// ✅ 使用 Number 方法检查数字
Number.isInteger(value);   // 检查整数
Number.isFinite(value);    // 检查有限数字
Number.isNaN(value);       // 检查 NaN (推荐)
// isNaN(value);           // 全局版本 (会先转换类型)

// ✅ 检查数组
Array.isArray(value);      // 推荐
value instanceof Array;    // 不够可靠

// ✅ 检查 null
value === null;  // 简单可靠
```

### 5.3 命名规范 ✅

```javascript
// ✅ 变量和函数: camelCase
const userName = "Alice";
const isActive = true;
function getUserById(id) { }

// ✅ 常量: UPPER_SNAKE_CASE
const MAX_SIZE = 100;
const API_KEY = "abc123";

// ✅ 类/构造函数: PascalCase
class UserModel { }
function UserService() { }

// ✅ 私有成员: 前缀下划线 (约定)
class User {
  _privateField = "private";
}

// ✅ 布尔值: is/has/can 前缀
const isEnabled = true;
const hasPermission = false;
const canEdit = true;

// ❌ 避免
const a = 1;              // 无意义名称
const data2 = {};         // 数字后缀
const flag = true;        // 不清楚的布尔值
```

### 5.4 代码风格 ✅

```javascript
// ✅ 使用模板字符串
const greeting = `Hello, ${name}!`;

// ❌ 避免字符串拼接
const greeting = "Hello, " + name + "!";

// ✅ 使用数字分隔符提高可读性
const billion = 1_000_000_000;

// ✅ 使用明确的类型转换
const num = Number(str);
const str = String(num);

// ❌ 避免隐式转换
const num = str * 1;       // 不清晰
const str = "" + num;      // 不清晰

// ✅ 使用语义化的类型检查
if (Array.isArray(items)) { }

// ❌ 避免 hack
if (Object.prototype.toString.call(items) === "[object Array]") { }
```

### 5.5 性能考虑 ✅

```javascript
// ✅ 原始类型比包装对象快
const str = "hello";           // 推荐
const str = new String("hello"); // 不必要

// ✅ 避免频繁创建临时对象
// ❌ 差: 每次循环创建新对象
for (let i = 0; i < 1000; i++) {
  let result = new String("text");
}

// ✅ 好: 重用值
const text = "text";
for (let i = 0; i < 1000; i++) {
  let result = text;
}

// ✅ 使用适当的数据类型
// 小整数: Number
// 大整数: BigInt
// 文本: String
// 标识符: Symbol
```

---

## 6. ES2025 新特性相关

虽然本模块主要讲基础，但以下 ES2025+ 特性与类型相关：

### 6.1 数字字面量增强 (ES2021)

```javascript
// ✅ 数字分隔符
const million = 1_000_000;
const bytes = 0xFF_FF_FF_FF;
const bits = 0b1010_0001_1000_0101;
```

### 6.2 String 新方法

```javascript
// ✅ String.replaceAll (ES2021)
"text text text".replaceAll("text", "new");

// ✅ String.at() (ES2022)
"abc".at(0);   // "a"
"abc".at(-1);  // "c" (支持负索引)

// ✅ String.toWellFormed() (ES2025)
// 检查字符串是否包含孤立的代理项
const str = "a\uD800";  // 孤立的高代理
str.toWellformed();     // "a\uFFFD" (替换字符)
str.isWellFormed();     // false
```

---

## 📝 总结

### 关键要点

1. **变量声明**: 优先 `const`，需要重赋值时用 `let`，避免 `var`
2. **基本类型**: 掌握 7 种原始类型和 `typeof` 检查
3. **类型转换**: 理解隐式转换规则，优先显式转换
4. **类型检查**: 使用 `===`、`Array.isArray` 等可靠方法
5. **命名规范**: 遵循 camelCase、UPPER_SNAKE_CASE 等约定

### 常见陷阱

- ⚠️ `typeof null` 返回 `"object"` (历史遗留)
- ⚠️ `0.1 + 0.2 !== 0.3` (浮点数精度)
- ⚠️ `"5" + 3 = "53"` (字符串拼接)
- ⚠️ `parseInt("010")` 在旧 JS 中是八进制
- ⚠️ `NaN === NaN` 为 `false`

---

**下一步**: 完成 `exercises/01-变量与类型/` 目录下的练习题 🚀
