#!/usr/bin/env bun
/**
 * 练习 01.1: 变量声明
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
  // ✏️ 在这里写代码

  // 测试: 不要修改
  return PI;
}

/**
 * 任务 1.2: 声明一个常量对象 user，包含 name 和 age 属性
 * 然后修改 name 属性 (这应该是可行的)
 */
function task02() {
  // ✏️ 声明 user 对象

  // ✏️ 修改 user.name 为 "Bob"

  return user;
}

/**
 * 任务 1.3: 解释为什么 const 对象可以修改属性？
 * (用注释说明)
 */
function task03_explain() {
  /*

    ✏️ 在这里写下你的解释:

  */
}

// ============================================
// 第二部分: let 声明
// ============================================

/**
 * 任务 2.1: 声明一个变量 count，初始值为 0
 * 然后将其增加到 10
 */
function task04() {
  // ✏️ 在这里写代码

  return count;
}

/**
 * 任务 2.2: 声明一个变量，先声明不赋值，然后赋值
 */
function task05() {
  // ✏️ 先声明变量

  // ✏️ 再赋值为 "initialized"

  return myVar;
}

/**
 * 任务 2.3: 以下代码会输出什么？解释为什么
 */
function task06_explain() {
  /*
    let x = 10;
    {
      let x = 20;
      console.log(x);  // 输出什么?
    }
    console.log(x);    // 输出什么?
  */

  // ✏️ 写下你的答案和解释
  return {
    firstOutput: "",  // 填空
    secondOutput: "", // 填空
    explanation: ""
  };
}

// ============================================
// 第三部分: const vs let 选择
// ============================================

/**
 * 任务 3.1: 判断应该用 const 还是 let
 * 对于每个场景，选择合适的声明方式
 */
function task07() {
  // 场景 1: 圆周率
  const PI = 3.14;  // ✅ const

  // 场景 2: 循环计数器
  // ✏️ 声明 i (应该用 const 还是 let?)

  for (let i = 0; i < 5; i++) {
    console.log(i);
  }

  // 场景 3: 配置对象，但不需要重新赋值
  // ✏️ 声明 config

  // 场景 4: 累加器
  // ✏️ 声明 sum，初始 0，然后累加

  sum = sum + 10;

  return {
    PI,
    i,
    config: { debug: true },
    sum
  };
}

/**
 * 任务 3.2: 将以下代码改为使用 const/let
 */
function task08_refactor() {
  // 原始代码 (使用 var)
  var name = "Alice";
  var age = 25;
  age = age + 1;

  // ✏️ 改写为使用 const/let

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

  // blockScoped 在这里可访问吗?
  // ✏️ 取消下面的注释并修复代码，使其能正常工作
  // result.push(blockScoped);

  return result;
}

/**
 * 任务 4.2: TDZ (Temporal Dead Zone)
 * 以下代码为什么会报错？如何修复？
 */
function task10_fix() {
  // ❌ 有问题的代码:
  // console.log(x);
  // let x = 10;

  // ✏️ 修复后的代码:

  return x;
}

/**
 * 任务 4.3: 理解变量提升
 * 比较 var 和 let 的行为差异
 */
function task11_compare() {
  // 用 var
  var varOutput;
  try {
    console.log(varVar);
    var varVar = "var";
    varOutput = "成功";
  } catch (e) {
    varOutput = e.message;
  }

  // 用 let
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
    explanation: "" // ✏️ 解释差异
  };
}

// ============================================
// 第五部分: 综合应用
// ============================================

/**
 * 任务 5.1: 编写一个函数，计算圆的面积
 * 使用合适的变量声明方式
 */
function task12_calculateCircleArea(radius) {
  // ✏️ 在这里实现

  // 提示: 面积 = π * r²
  // 使用 Math.PI 或声明常量
}

/**
 * 任务 5.2: 编写一个函数，统计字符串中某个字符的出现次数
 */
function task13_countChar(str, char) {
  // ✏️ 在这里实现
  // 提示: 遍历字符串，使用计数器

  return 0; // 替换为实际实现
}

/**
 * 任务 5.3: 代码审查 - 找出并修复问题
 */
function task14_codeReview() {
  // 这段代码有问题，请找出并修复

  var config = { debug: true };
  config.debug = false;

  var result = [];
  for (var i = 0; i < 5; i++) {
    result.push(i);
  }

  // i 在这里是什么值? 为什么?

  // ✏️ 重写这段代码，使用 const/let 并修复任何问题

  return { config, result };
}

/**
 * 任务 5.4: 最佳实践应用
 * 将以下混乱的代码规范化
 */
function task15_refactorBestPractice() {
  var a = "john";
  var b = 30;
  var c = true;
  var d = 100;
  var e = "john@example.com";
  var MAX = 1000;

  // ✏️ 应用最佳实践重写:
  // - 使用合适的命名
  // - 使用 const/let
  // - 使用合适的命名规范 (camelCase, UPPER_SNAKE_CASE)

  return {
    userName: "",
    userAge: 0,
    isActive: false,
    maxRequests: 0,
    email: "",
    MAX_VALUE: 0
  };
}

// ============================================
// 测试套件 (运行测试验证你的答案)
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

// 运行所有测试
console.log(`
╔══════════════════════════════════════════════════════════════╗
║                     📝 练习 01.1: 变量声明                    ║
╚══════════════════════════════════════════════════════════════╝

运行 'bun test ${import.meta.url}' 查看测试结果

💡 提示:
  - 仔细阅读每个任务的注释
  - 理解 const/let/var 的区别
  - 思考块级作用域的影响
`);
