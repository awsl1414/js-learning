#!/usr/bin/env bun
/**
 * 练习 01.1: 变量声明 (参考答案)
 *
 * 本练习涵盖:
 * - const/let/var 的使用
 * - 块级作用域
 * - 变量提升与 TDZ
 */

import { test, expect } from "bun:test";

// ============================================
// 第一部分: const 声明
// ============================================

/**
 * 任务 1.1: 声明一个名为 PI 的常量，值为 3.14159
 */
function task01() {
  const PI = 3.14159;
  return PI;
}

/**
 * 任务 1.2: 声明一个常量对象 user，包含 name 和 age 属性
 * 然后修改 name 属性 (这应该是可行的)
 */
function task02() {
  const user = { name: "Alice", age: 25 };
  user.name = "Bob";
  return user;
}

/**
 * 任务 1.3: 解释为什么 const 对象可以修改属性？
 */
function task03_explain() {
  /*
    const 保证的是变量绑定的引用不可改变，而不是对象内容不可变。
    对象是引用类型，const 只是阻止了重新赋值（user = {...}），
    但对象的属性仍然可以修改。
  */
}

// ============================================
// 第二部分: let 声明
// ============================================

/**
 * 任务 2.1: 声明一个变量 count，初始值为 0，然后将其增加到 10
 */
function task04() {
  let count = 0;
  count = 10;
  return count;
}

/**
 * 任务 2.2: 声明一个变量，先声明不赋值，然后赋值
 */
function task05() {
  let myVar;
  myVar = "initialized";
  return myVar;
}

/**
 * 任务 2.3: 以下代码会输出什么？解释为什么
 */
function task06_explain() {
  return {
    firstOutput: "20",
    secondOutput: "10",
    explanation: "let 具有块级作用域。内层的 x 只在块内有效，不影响外层的 x。"
  };
}

// ============================================
// 第三部分: const vs let 选择
// ============================================

/**
 * 任务 3.1: 判断应该用 const 还是 let
 */
function task07() {
  const PI = 3.14;

  let i;
  for (let i = 0; i < 5; i++) {
    console.log(i);
  }

  const config = { debug: true };

  let sum = 0;
  sum = sum + 10;

  return {
    PI,
    i,
    config,
    sum
  };
}

/**
 * 任务 3.2: 将以下代码改为使用 const/let
 */
function task08_refactor() {
  const name = "Alice";
  let age = 25;
  age = age + 1;

  return { name, age };
}

// ============================================
// 第四部分: 作用域与 TDZ
// ============================================

/**
 * 任务 4.1: 预测输出
 */
function task09() {
  let result = [];

  if (true) {
    const blockScoped = "block";
    result.push(blockScoped);
  }

  // blockScoped 在这里不可访问，因为它有块级作用域
  // 正确的做法是在块内获取值，或者使用一个外部变量

  return result;
}

/**
 * 任务 4.2: TDZ (Temporal Dead Zone) - 修复后的代码
 */
function task10_fix() {
  const x = 10; // 先声明
  console.log(x); // 再使用
  return x;
}

/**
 * 任务 4.3: 理解变量提升
 */
function task11_compare() {
  var varOutput;
  try {
    console.log(varVar);
    var varVar = "var";
    varOutput = "成功";
  } catch (e) {
    varOutput = e.message;
  }

  let letOutput;
  try {
    console.log(letLet);
    let letLet = "let";
    letOutput = "成功";
  } catch (e) {
    letOutput = e.message;
  }

  return {
    varResult: varOutput,
    letResult: letOutput,
    explanation: "var 会被提升并初始化为 undefined，而 let 虽然被提升但在声明前处于 TDZ，访问会报错。"
  };
}

// ============================================
// 第五部分: 综合应用
// ============================================

/**
 * 任务 5.1: 计算圆的面积
 */
function task12_calculateCircleArea(radius) {
  const PI = Math.PI;
  return PI * radius * radius;
}

/**
 * 任务 5.2: 统计字符串中某个字符的出现次数
 */
function task13_countChar(str, char) {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === char) {
      count++;
    }
  }
  return count;
}

/**
 * 任务 5.3: 代码审查 - 修复问题
 */
function task14_codeReview() {
  const config = { debug: true };
  config.debug = false;

  const result = [];
  for (let i = 0; i < 5; i++) {
    result.push(i);
  }

  // 使用 const/let 确保块级作用域，避免 var 的函数作用域问题

  return { config, result };
}

/**
 * 任务 5.4: 最佳实践应用
 */
function task15_refactorBestPractice() {
  // 应用命名规范和 const/let
  const userName = "john";
  const userAge = 30;
  const isActive = true;
  let maxRequests = 100;
  const email = "john@example.com";
  const MAX_VALUE = 1000;

  return {
    userName,
    userAge,
    isActive,
    maxRequests,
    email,
    MAX_VALUE
  };
}

// ============================================
// 测试套件
// ============================================

test("任务 1.1: const 声明常量", () => {
  expect(task01()).toBe(3.14159);
});

test("任务 1.2: const 对象属性可修改", () => {
  expect(task02()).toEqual({ name: "Bob", age: 25 });
});

test("任务 2.1: let 变量重新赋值", () => {
  expect(task04()).toBe(10);
});

test("任务 2.2: let 先声明后赋值", () => {
  expect(task05()).toBe("initialized");
});

test("任务 3.1: const vs let 选择", () => {
  const result = task07();
  expect(result.PI).toBe(3.14);
  expect(result.config.debug).toBe(true);
  expect(result.sum).toBe(10);
});

test("任务 3.2: 改用 const/let", () => {
  expect(task08_refactor()).toEqual({ name: "Alice", age: 26 });
});

test("任务 4.1: 块级作用域", () => {
  expect(task09()).toEqual(["block"]);
});

test("任务 4.3: var vs let", () => {
  const result = task11_compare();
  expect(result.varResult).toBe("成功");
  expect(result.letResult).toContain("Cannot access");
});

test("任务 5.1: 计算圆面积", () => {
  expect(task12_calculateCircleArea(5)).toBeCloseTo(78.54, 2);
  expect(task12_calculateCircleArea(10)).toBeCloseTo(314.16, 2);
});

test("任务 5.2: 统计字符出现次数", () => {
  expect(task13_countChar("hello world", "o")).toBe(2);
  expect(task13_countChar("hello world", "l")).toBe(3);
  expect(task13_countChar("hello world", "x")).toBe(0);
});

test("任务 5.3: 代码审查", () => {
  expect(task14_codeReview().result).toEqual([0, 1, 2, 3, 4]);
});

test("任务 5.4: 最佳实践重构", () => {
  const result = task15_refactorBestPractice();
  expect(result.userName).toBeDefined();
  expect(result.MAX_VALUE).toBeDefined();
});

console.log(`
╔══════════════════════════════════════════════════════════════╗
║              📝 练习 01.1: 变量声明 (参考答案)               ║
╚══════════════════════════════════════════════════════════════╝

运行 'bun test ${import.meta.url}' 查看测试结果

💡 关键要点:
  - const 用于不会重新赋值的变量
  - let 用于需要重新赋值的变量
  - 避免使用 var（函数作用域问题）
  - 理解块级作用域和 TDZ
`);
