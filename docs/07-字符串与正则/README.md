# 模块 07: 字符串与正则表达式

> 📖 **学习目标**: 掌握 JavaScript 字符串操作和正则表达式

## 目录

1. [字符串基础](#1-字符串基础)
2. [字符串方法](#2-字符串方法)
3. [字符串高级操作](#3-字符串高级操作)
4. [正则表达式基础](#4-正则表达式基础)
5. [正则表达式方法](#5-正则表达式方法)
6. [常见模式](#6-常见模式)

---

## 1. 字符串基础

### 1.1 创建字符串

```javascript
// 字符串字面量
const str1 = "Hello";
const str2 = 'World';
const str3 = `Hello ${str2}`;  // 模板字符串 ✅

// String 构造函数
const str4 = new String("Hello");  // String 对象 ⚠️
typeof str4;  // "object"

// String() 函数
const str5 = String(42);  // "42"
typeof str5;  // "string"

// ⚠️ 不要使用 String 对象
const s1 = "text";
const s2 = new String("text");
s1 === s2;  // false (类型不同!)
```

### 1.2 字符串不可变

```javascript
let str = "hello";

// ❌ 不能修改字符
str[0] = "H";  // 静默失败

// ✅ 创建新字符串
str = str.toUpperCase();  // "HELLO"
```

---

## 2. 字符串方法

### 2.1 访问和搜索

```javascript
const str = "Hello JavaScript";

// charAt() / at() ✅
str.charAt(0);  // "H"
str.at(0);      // "H"
str.at(-1);     // "t" ✅ ES2022 (支持负索引)

// charCodeAt() / codePointAt()
str.charCodeAt(0);     // 72 (UTF-16 单元)
str.codePointAt(0);    // 72 (Unicode 码点)

// includes() ✅ ES2015
str.includes("Java");  // true
str.includes("java");  // false (大小写敏感)
str.includes("Java", 7);  // false (从位置 7 开始)

// indexOf() / lastIndexOf()
str.indexOf("Java");   // 6
str.indexOf("java");   // -1 (未找到)
str.lastIndexOf("a");  // 10

// startsWith() ✅ ES2015
str.startsWith("Hello");  // true
str.startsWith("Java", 6); // true (从位置 6 开始)

// endsWith() ✅ ES2015
str.endsWith("Script");   // true
str.endsWith("Script", 17);  // true (前 17 个字符)
```

### 2.2 提取和切割

```javascript
const str = "Hello JavaScript";

// slice() ✅ **推荐**
str.slice(0, 5);      // "Hello"
str.slice(6);         // "JavaScript"
str.slice(-10);       // "JavaScript" (负索引)
str.slice(-10, -4);   // "Java"

// substring()
str.substring(0, 5);  // "Hello"
str.substring(6, 0);  // "Hello" (自动交换参数)

// ⚠️ substring vs slice
// substring 不支持负索引 (当作 0)
// slice 支持负索引

// split()
"a,b,c".split(",");        // ["a", "b", "c"]
"hello".split("");         // ["h", "e", "l", "l", "o"]
"hello".split("", 3);      // ["h", "e", "l"] (限制数量)

// ⚠️ 分割器会被完全消耗
"a,,b".split(",");         // ["a", "", "b"]
"a,,b".split(/,+/);        // ["a", "b"]
```

### 2.3 转换和修改

```javascript
const str = "  Hello World  ";

// trim() ✅
str.trim();           // "Hello World"
str.trimStart();      // "Hello World  " ✅ ES2019
str.trimEnd();        // "  Hello World" ✅ ES2019

// 大小写转换
"hello".toUpperCase();  // "HELLO"
"HELLO".toLowerCase();  // "hello"

// ⚠️ 大小写转换不考虑国际化
"ı".toUpperCase();  // "ı" (应该是 "I")
// ✅ 使用 toLocaleUpperCase()

// padStart() / padEnd() ✅ ES2017
"5".padStart(2, "0");     // "05"
"5".padEnd(2, "0");       // "50"
"abc".padStart(5, ".");   // "..abc"

// 实际应用
const id = 42;
id.toString().padStart(6, "0");  // "000042"

// repeat() ✅ ES2015
"ha".repeat(3);  // "hahaha"
"abc".repeat(0); // ""

// replace()
"hello world".replace("world", "there");  // "hello there"
"aaa".replace("a", "b");  // "baa" (只替换第一个)

// replaceAll() ✅ ES2021
"aaa".replaceAll("a", "b");  // "bbb"
```

---

## 3. 字符串高级操作

### 3.1 Unicode 支持

```javascript
// 基本多文种平面 (BMP)
"你".length;           // 1
"你".codePointAt(0);   // 20320

// 代理对 (Supplementary Plane)
"😀".length;           // 2 (两个 UTF-16 单元)
[..."😀"].length;      // 1 (正确)
"😀".codePointAt(0);   // 128512

// ✅ 使用 Array.from 或展开运算符
const chars = [..."😀👍"];
chars.length;  // 2

// normalize() - Unicode 规范化
"café".normalize("NFC");   // 规范化形式
"café".normalize("NFD");   // 分解形式
```

### 3.2 字符串迭代 ✅ ES2015

```javascript
// for...of 正确处理 Unicode
const str = "😀👍❤️";

// ❌ length 和 charAt 错误
str.length;  // 7 (代理对和组合符号)

// ✅ for...of 正确
for (const char of str) {
  console.log(char);
}
// 😀
// 👍
// ❤️

// Array.from
Array.from(str).length;  // 3
```

---

## 4. 正则表达式基础

### 4.1 创建正则表达式

```javascript
// 正则字面量 ✅ **推荐**
const regex1 = /pattern/;
const regex2 = /pattern/gim;  // 带标志

// RegExp 构造函数
const regex3 = new RegExp("pattern");
const regex4 = new RegExp("pattern", "gim");

// 动态构建 (必须用 RegExp)
const keyword = "hello";
const regex5 = new RegExp(keyword, "i");  // /hello/i

// ⚠️ 特殊字符需要转义
const special = "a+b";
const regex6 = new RegExp(special.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
```

### 4.2 正则标志

```javascript
// g - 全局匹配 (查找所有)
// i - 忽略大小写
// m - 多行模式 (^$ 匹配每行)
// s - 点号匹配换行符 ✅ ES2018
// u - Unicode 模式 ✅ ES2015
// y - 粘滞模式 ✅ ES2015
// d - 匹配索引 ✅ ES2022

// 示例
const str = "Hello hello HELLO";

/hello/.exec(str);   // ["hello"] (第一个)
/hello/g.exec(str);  // ["hello"] (需要多次 exec)
/hello/gi.exec(str); // ["Hello"] (忽略大小写)

// ✅ 使用 d 标志获取索引
const regex = /hello/dgi;
const match = regex.exec(str);
match.indices[0];  // [0, 5] (匹配位置)
```

---

## 5. 正则表达式方法

### 5.1 RegExp 方法

```javascript
const str = "The rain in Spain";
const regex = /ain/;

// test() - 测试匹配 ✅
regex.test(str);  // true
/^test/.test("test");  // true
/^test/.test("atest"); // false

// exec() - 详细匹配信息 ✅
const match = regex.exec(str);
match[0];      // "ain" (完整匹配)
match.index;   // 5 (匹配位置)
match.input;   // "The rain in Spain"
match.groups;  // 捕获组

// 全局匹配
const global = /ain/g;
let m;
while ((m = global.exec(str)) !== null) {
  console.log(m.index, m[0]);
}
// 5 "ain"
// 14 "ain"

// ✅ 使用 String.matchAll() ES2020
for (const m of str.matchAll(/ain/g)) {
  console.log(m.index, m[0]);
}
```

### 5.2 String 方法

```javascript
const str = "Hello World";

// match()
str.match(/Hello/);  // ["Hello"]
str.match(/hello/);  // null
str.match(/hello/i); // ["Hello"]

// 全局匹配返回所有匹配
str.match(/o/g);  // ["o", "o"]

// matchAll() ✅ ES2020
for (const m of str.matchAll(/o/g)) {
  console.log(m);
}

// search()
str.search(/World/);  // 6
str.search(/world/i); // 6
str.search(/xyz/);    // -1

// replace()
"hello world".replace(/world/, "there");  // "hello there"
"hello world".replace(/l/g, "L");         // "heLLo worLd"

// $1, $2... 捕获组引用
"John Smith".replace(/(\w+) (\w+)/, "$2, $1");  // "Smith, John"

// $& 整个匹配
"hello".replace(/l/, "[$&]");  // "he[l]lo"

// $` 匹配前的文本, $' 匹配后的文本
"abc".replace(/b/, "$`$'");  // "aac"

// $$ 美元符号
"price".replace(/ice/, "$$");  // "pr$"

// 使用函数 ✅
"hello123".replace(/\d+/g, match => match * 2);  // "hello246"
"hello world".replace(/\b\w/g, c => c.toUpperCase());  // "Hello World"

// split() (使用正则)
"a1b2c3".split(/\d/);  // ["a", "b", "c", ""]
"a, b; c".split(/[,;]\s*/);  // ["a", "b", "c"]
```

---

## 6. 常见模式

### 6.1 字符类

```javascript
// [abc] - 匹配 a, b, c
/ [abc] /.test("a");  // true

// [^abc] - 匹配非 a, b, c
/ [^abc] /.test("d");  // true

// [a-z] - 范围
/ [a-z] /.test("m");  // true

// 预定义类
.     // 任意字符 (除换行符外)
\d    // 数字 [0-9]
\D    // 非数字 [^0-9]
\w    // 单词字符 [a-zA-Z0-9_]
\W    // 非单词字符
\s    // 空白字符 [\t\n\r\f\v ]
\S    // 非空白字符
```

### 6.2 锚点

```javascript
// ^ - 行首
/^Hello/.test("Hello World");  // true

// $ - 行尾
/World$/.test("Hello World");  // true

// \b - 单词边界
/\bcat\b/.test("cat");      // true
/\bcat\b/.test("category"); // false

// \B - 非单词边界
/\Bcat\B/.test("category"); // true
```

### 6.3 量词

```javascript
// * - 0 次或多次
/a*/.exec("baaab");  // "aaa"

// + - 1 次或多次
/a+/.exec("baaab");  // "aaa"

// ? - 0 次或 1 次
/a?/.exec("baaab");  // "a"

// {n} - 恰好 n 次
/a{3}/.test("aaa");  // true

// {n,} - 至少 n 次
/a{2,}/.test("aaaa");  // true

// {n,m} - n 到 m 次
/a{2,4}/.test("aaa");  // true

// ⚠️ 量词默认是贪婪的
/<.+>/.exec("<div>text</div>");  // "<div>text</div>"

// 非贪婪 (惰性)
/<.+?>/.exec("<div>text</div>");  // "<div>"
```

### 6.4 捕获组

```javascript
// () - 捕获组
/(\w+)\s(\w+)/.exec("Hello World");
// ["Hello World", "Hello", "World"]

// (?:) - 非捕获组
/(?:\w+)\s(\w+)/.exec("Hello World");
// ["Hello World", "World"] (只有一个捕获组)

// 命名捕获组 ✅ ES2018
/(?<name>\w+)\s(?<age>\d+)/.exec("Alice 30");
// ["Alice 30", "Alice", "30", name: "Alice", age: "30"]

// 反向引用
/(\w+)\s\1/.test("hello hello");  // true (重复)
/(?<word>\w+)\s\k<word>/.test("hello hello");  // true (命名引用)

// 前瞻断言
/x(?=y)/.exec("xyz");  // ["x"] (x 后面是 y)
/x(?!y)/.exec("xyy");  // null

// 后顾断言 ✅ ES2018
/(?<=x)y/.exec("xyz");  // ["y"] (y 前面是 x)
/(?<!x)y/.exec("ayz");  // ["y"] (y 前面不是 x)
```

---

## 7. 实用示例

### 7.1 常见验证

```javascript
// 邮箱
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// URL
const urlRegex = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;

// 手机号 (中国大陆)
const phoneRegex = /^1[3-9]\d{9}$/;

// 身份证号 (中国大陆)
const idRegex = /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]$/;

// IPv4
const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;

// 十六进制颜色
const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
```

### 7.2 常见操作

```javascript
// 移除 HTML 标签
"<p>Hello</p>".replace(/<[^>]+>/g, "");  // "Hello"

// 驼峰命名转换
"hello-world".replace(/-([a-z])/g, (_, c) => c.toUpperCase());
// "helloWorld"

// 首字母大写
"hello world".replace(/\b\w/g, c => c.toUpperCase());
// "Hello World"

// 移除多余空格
"hello    world".replace(/\s+/g, " ").trim();
// "hello world"

// 格式化数字
"1000000".replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// "1,000,000"
```

---

## 8. 最佳实践

### 8.1 正则表达式编写

```javascript
// ✅ 使用正则字面量 (模式固定)
const regex = /pattern/flags;

// ✅ 使用 RegExp (模式动态)
const regex = new RegExp(pattern, flags);

// ✅ 添加注释 (使用 x 标志或分开编写)
const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ⚠️ 转义特殊字符
const special = "a+b?c";
const escaped = special.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
```

### 8.2 性能考虑

```javascript
// ❌ 避免回溯灾难
/a+a+a+a+a+a+a+[duplicate]/  // 极慢

// ✅ 使用原子组或占有量词
/(?:a++)+a+[duplicate]/  // 更快

// ✅ 使用简单的字符类比 .*
/\d{4}/.test("2024");  // 好
/.{4}/.test("2024");   // 慢
```

---

**下一步**: 完成 `exercises/07-字符串与正则/` 目录下的练习题 🚀
