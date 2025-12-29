#!/usr/bin/env bun
/**
 * 练习 01.2: 数据类型 (参考答案)
 *
 * 本练习涵盖:
 * - 7 种原始类型
 * - typeof 操作符
 * - 类型检查
 */

import { test, expect } from "bun:test";

// ============================================
// 第一部分: Number 类型
// ============================================

/**
 * 任务 1.1: 创建各种数字
 */
function task01_createNumbers() {
  const integer = 42;
  const negative = -17;
  const float = 3.14;
  const scientific = 1.5e10;
  const hex = 0xFF;
  const binary = 0b1010;
  const withSeparator = 1_000_000;

  return { integer, negative, float, scientific, hex, binary, withSeparator };
}

/**
 * 任务 1.2: 特殊数字值
 */
function task02_specialNumbers() {
  const infinity = Infinity;
  const negInfinity = -Infinity;
  const nan = NaN;

  return {
    infinity,
    negInfinity,
    nan,
    infinityIsFinite: Number.isFinite(infinity),
    negInfinityIsFinite: Number.isFinite(negInfinity),
    nanIsNaN: Number.isNaN(nan),
  };
}

/**
 * 任务 1.3: Number 方法
 */
function task03_numberMethods() {
  const str1 = "42";
  const str2 = "42px";
  const str3 = "3.14";

  const num1 = Number(str1);
  const num2 = parseInt(str2);
  const num3 = parseFloat(str3);

  return {
    num1,
    num2,
    num3,
    num1Type: typeof num1,
    isInteger: Number.isInteger(num1),
    isFloat: !Number.isInteger(num3)
  };
}

/**
 * 任务 1.4: 浮点数精度问题
 */
function task04_floatPrecision() {
  const result = 0.1 + 0.2;

  const explanation = "浮点数使用二进制表示，某些十进制小数无法精确表示，导致精度误差。";

  // 解决方案：使用 Number.EPSILON 进行近似比较
  const preciseResult = Math.abs((0.1 + 0.2) - 0.3) < Number.EPSILON ? 0.3 : result;

  return {
    actualResult: result,
    isExactly: result === 0.3,
    explanation,
    preciseResult
  };
}

// ============================================
// 第二部分: BigInt 类型
// ============================================

/**
 * 任务 2.1: 创建 BigInt
 */
function task05_createBigInt() {
  const big1 = 9007199254740991n;
  const big2 = BigInt("9007199254740991");

  return {
    big1,
    big2,
    areEqual: big1 === 9007199254740991n
  };
}

/**
 * 任务 2.2: BigInt 运算
 */
function task06_bigIntMath() {
  const a = 100n;
  const b = 25n;

  const sum = a + b;
  const diff = a - b;
  const product = a * b;
  const div = a / b;

  return { sum, diff, product, div };
}

/**
 * 任务 2.3: BigInt 与 Number 的比较
 */
function task07_bigIntComparison() {
  const big = 10n;
  const num = 10;

  return {
    strictEqual: big === num,      // false (类型不同)
    looseEqual: big == num,        // true (值相同)
    explanation: "严格相等比较类型，10n !== 10。宽松相等只比较值，10n == 10。"
  };
}

// ============================================
// 第三部分: String 类型
// ============================================

/**
 * 任务 3.1: 创建字符串
 */
function task08_createStrings() {
  const singleQuote = 'Hello';
  const doubleQuote = "World";
  const template = `Hello World`;
  const multiline = `Line 1
Line 2
Line 3`;

  return {
    singleQuote,
    doubleQuote,
    template,
    multiline
  };
}

/**
 * 任务 3.2: 模板字符串插值
 */
function task09_templateInterpolation(name, age) {
  return `姓名: ${name}, 年龄: ${age}`;
}

/**
 * 任务 3.3: 常用字符串方法
 */
function task10_stringMethods() {
  const str = "  Hello JavaScript World  ";

  return {
    length: str.length,
    upper: str.toUpperCase(),
    lower: str.toLowerCase(),
    trimmed: str.trim(),
    slice: str.slice(2, 14),
    includes: str.includes("JavaScript"),
    startsWith: str.startsWith("Hello"),
    endsWith: str.endsWith("World"),
    replace: str.replace("JavaScript", "JS"),
    repeat: "Ha".repeat(3)
  };
}

/**
 * 任务 3.4: 字符串不可变性
 */
function task11_stringImmutability() {
  let str = "hello";

  // 字符串是不可变的，不能通过索引修改
  // str[0] = "H" 不会生效

  // 正确的方法：使用 toUpperCase() 返回新字符串
  const uppercase = str.toUpperCase();

  const explanation = "字符串是原始类型，值不可变。所有字符串方法都返回新字符串，而不是修改原字符串。";

  return {
    original: str,
    uppercase,
    explanation
  };
}

// ============================================
// 第四部分: Boolean 和 Undefined/Null
// ============================================

/**
 * 任务 4.1: 创建布尔值
 */
function task12_booleans() {
  const isTrue = true;
  const isFalse = false;

  return {
    isTrue,
    isFalse,
    boolFromNum: Boolean(0),
    boolFromStr: Boolean(""),
    boolFromObj: Boolean({}),
    boolFromNull: Boolean(null),
    boolFromUndef: Boolean(undefined),
    boolFromNaN: Boolean(NaN)
  };
}

/**
 * 任务 4.2: 假值与真值
 */
function task13_truthyFalsy() {
  return {
    "false": "falsy",
    "0": "falsy",
    "''": "falsy",
    "null": "falsy",
    "undefined": "falsy",
    "NaN": "falsy",
    "'0'": "truthy",
    "'false'": "truthy",
    "[]": "truthy",
    "{}": "truthy"
  };
}

/**
 * 任务 4.3: undefined vs null
 */
function task14_undefinedVsNull() {
  let undefinedVar;
  const nullVar = null;

  return {
    undefinedVar,
    nullVar,
    undefinedType: typeof undefinedVar,
    nullType: typeof nullVar,
    explanation: "undefined 表示变量已声明但未赋值；null 表示有意设置为空值。typeof null 返回 'object' 是历史遗留的 bug。"
  };
}

// ============================================
// 第五部分: Symbol 类型
// ============================================

/**
 * 任务 5.1: 创建和比较 Symbol
 */
function task15_symbols() {
  const sym1 = Symbol("id");
  const sym2 = Symbol("id");
  const sym3 = sym1;

  return {
    sym1Description: sym1.description,
    sym1EqualsSym2: sym1 === sym2,
    sym1EqualsSym3: sym1 === sym3,
    explanation: "每次调用 Symbol() 都创建唯一的值，即使描述相同。但 Symbol 是原始类型，可以按引用比较。"
  };
}

/**
 * 任务 5.2: Symbol 作为对象属性
 */
function task16_symbolAsProperty() {
  const idSym = Symbol("id");

  const user = {
    name: "Alice",
    [idSym]: 12345
  };

  const symbolPropertyValue = user[idSym];

  return {
    user,
    symbolPropertyValue
  };
}

// ============================================
// 第六部分: typeof 操作符
// ============================================

/**
 * 任务 6.1: typeof 运算
 */
function task17_typeof() {
  return {
    number: typeof 42,
    bigint: typeof 42n,
    string: typeof "hello",
    boolean: typeof true,
    undefined: typeof undefined,
    "null (注意!)": typeof null,
    symbol: typeof Symbol(),
    object: typeof {},
    array: typeof [],
    function: typeof function() {}
  };
}

/**
 * 任务 6.2: 类型检查函数
 */
function task18_typeCheck() {
  function isNumber(value) {
    return typeof value === "number" && !Number.isNaN(value);
  }

  function isString(value) {
    return typeof value === "string";
  }

  function isBoolean(value) {
    return typeof value === "boolean";
  }

  function isNull(value) {
    return value === null;
  }

  function isArray(value) {
    return Array.isArray(value);
  }

  function isObject(value) {
    return typeof value === "object" && value !== null && !Array.isArray(value);
  }

  return {
    isNumber: isNumber(42) && !isNumber(NaN),
    isString: isString("hello"),
    isBoolean: isBoolean(true),
    isNull: isNull(null) && !isNull(undefined),
    isArray: isArray([1, 2, 3]),
    isObject: isObject({ a: 1 }) && !isObject([1, 2, 3])
  };
}

// ============================================
// 第七部分: 类型转换
// ============================================

/**
 * 任务 7.1: 显式类型转换
 */
function task19_explicitConversion() {
  return {
    strToNum: Number("42"),
    strToFloat: Number("3.14"),
    invalidStrToNum: Number("abc"),
    emptyStrToNum: Number(""),
    numToStr: String(123),
    boolToNum: Number(true),
    numToBool: Boolean(1),
    emptyStrToBool: Boolean(""),
    nullToNum: Number(null),
    undefToNum: Number(undefined)
  };
}

/**
 * 任务 7.2: 隐式类型转换
 */
function task20_implicitConversion() {
  return {
    "5 + 3": "5" + 3,
    "5 - 3": "5" - 3,
    "5 * 2": "5" * 2,
    "5 + true": "5" + true,
    "5 - true": "5" - true,
    "5 + null": "5" + null,
    "5 - null": "5" - null,
    "5 + undefined": "5" + undefined,
    "5 == '5'": 5 == "5",
    "5 === '5'": 5 === "5",
    "null == undefined": null == undefined,
    "null === undefined": null === undefined
  };
}

/**
 * 任务 7.3: 类型转换陷阱
 */
function task21_conversionTraps() {
  const traps = {
    "0.1 + 0.2 === 0.3": 0.1 + 0.2 === 0.3,
    "9999999999999999 === 10000000000000000": 9999999999999999 === 10000000000000000,
    "'5' - 1": "5" - 1,
    "'5' + 1": "5" + 1,
    "[] + []": [] + [],
    "{} + []": {} + [],
    "0 == '0'": 0 == "0",
    "0 == '": 0 == "",
    "'0' == '": "0" == ""
  };

  return {
    results: traps,
    explanations: {
      "0.1 + 0.2": "浮点数精度问题，结果是 0.30000000000000004",
      "大整数": "超过 Number.MAX_SAFE_INTEGER 的整数精度丢失",
      "字符串运算": "+ 会进行字符串拼接，而 -、*、/ 会尝试转为数字",
      "对象转字符串": "空数组转为空字符串，空对象可能转为 '[object Object]'"
    }
  };
}

// ============================================
// 第八部分: 综合应用
// ============================================

/**
 * 任务 8.1: 类型验证函数
 */
function task22_createValidator() {
  function getType(value) {
    if (value === null) return "Null";
    if (Array.isArray(value)) return "Array";
    const type = typeof value;
    return type.charAt(0).toUpperCase() + type.slice(1);
  }

  return {
    number: getType(42),
    string: getType("hello"),
    array: getType([1, 2, 3]),
    null: getType(null),
    object: getType({ a: 1 }),
    date: getType(new Date())
  };
}

/**
 * 任务 8.2: 安全的类型转换工具
 */
function task23_safeConversion() {
  function toNumber(value) {
    const num = Number(value);
    return Number.isNaN(num) ? null : num;
  }

  function toInteger(value) {
    const num = Number(value);
    if (Number.isNaN(num)) return null;
    return Math.trunc(num);
  }

  function toString(value) {
    if (value === null || value === undefined) return "";
    return String(value);
  }

  return {
    num1: toNumber("42"),
    num2: toNumber("42px"),
    num3: toNumber("abc"),
    int1: toInteger("42.9"),
    int2: toInteger("abc"),
    str1: toString(42),
    str2: toString(null),
    str3: toString(undefined)
  };
}

/**
 * 任务 8.3: 数据清洗工具
 */
function task24_dataSanitizer() {
  function sanitizeInput(input) {
    const str = String(input).trim();
    return str === "" ? null : str;
  }

  function sanitizeNumber(input) {
    const num = Number(input);
    return Number.isNaN(num) ? null : num;
  }

  return {
    text1: sanitizeInput("  hello  "),
    text2: sanitizeInput("   "),
    text3: sanitizeInput(123),
    num1: sanitizeNumber("42"),
    num2: sanitizeNumber("42px"),
    num3: sanitizeNumber("abc")
  };
}

/**
 * 任务 8.4: 类型检查器
 */
function task25_typeInspector() {
  function inspect(value) {
    const type = typeof value;

    return {
      type: type === "object" ? (Array.isArray(value) ? "Array" : (value === null ? "Null" : "Object")) : type.charAt(0).toUpperCase() + type.slice(1),
      isPrimitive: value === null || typeof value !== "object",
      isTruthy: Boolean(value),
      typeof: type,
      valueOf: typeof value === "object" && value !== null ? JSON.stringify(value) : value
    };
  }

  return inspect([1, 2, 3]);
}

// ============================================
// 测试套件
// ============================================

test("任务 1.1: 创建各种数字", () => {
  const result = task01_createNumbers();
  expect(result.integer).toBe(42);
  expect(result.negative).toBe(-17);
  expect(result.float).toBe(3.14);
  expect(result.scientific).toBe(15000000000);
  expect(result.hex).toBe(255);
  expect(result.binary).toBe(10);
  expect(result.withSeparator).toBe(1000000);
});

test("任务 1.2: 特殊数字值", () => {
  const result = task02_specialNumbers();
  expect(result.infinity).toBe(Infinity);
  expect(result.negInfinity).toBe(-Infinity);
  expect(Number.isNaN(result.nan)).toBe(true);
  expect(result.infinityIsFinite).toBe(false);
  expect(result.nanIsNaN).toBe(true);
});

test("任务 1.3: Number 方法", () => {
  const result = task03_numberMethods();
  expect(result.num1).toBe(42);
  expect(result.num2).toBe(42);
  expect(result.num3).toBe(3.14);
  expect(result.num1Type).toBe("number");
  expect(result.isInteger).toBe(true);
});

test("任务 2.1: 创建 BigInt", () => {
  const result = task05_createBigInt();
  expect(typeof result.big1).toBe("bigint");
  expect(result.areEqual).toBe(true);
});

test("任务 2.2: BigInt 运算", () => {
  const result = task06_bigIntMath();
  expect(result.sum).toBe(125n);
  expect(result.diff).toBe(75n);
  expect(result.product).toBe(2500n);
  expect(result.div).toBe(4n);
});

test("任务 3.1: 创建字符串", () => {
  const result = task08_createStrings();
  expect(result.singleQuote).toBe("Hello");
  expect(result.doubleQuote).toBe("World");
  expect(result.template).toBe("Hello World");
});

test("任务 3.2: 模板字符串插值", () => {
  expect(task09_templateInterpolation("Alice", 30)).toBe("姓名: Alice, 年龄: 30");
  expect(task09_templateInterpolation("Bob", 25)).toBe("姓名: Bob, 年龄: 25");
});

test("任务 3.3: 字符串方法", () => {
  const result = task10_stringMethods();
  expect(result.length).toBe(27);
  expect(result.upper).toBe("  HELLO JAVASCRIPT WORLD  ");
  expect(result.trimmed).toBe("Hello JavaScript World");
  expect(result.slice).toBe("JavaScript");
  expect(result.includes).toBe(true);
  expect(result.startsWith).toBe(true);
  expect(result.endsWith).toBe(true);
  expect(result.replace).toBe("  Hello JS World  ");
  expect(result.repeat).toBe("HaHaHa");
});

test("任务 4.1: 布尔值转换", () => {
  const result = task12_booleans();
  expect(result.isTrue).toBe(true);
  expect(result.isFalse).toBe(false);
  expect(result.boolFromNum).toBe(false);
  expect(result.boolFromStr).toBe(false);
  expect(result.boolFromObj).toBe(true);
});

test("任务 6.1: typeof 操作符", () => {
  const result = task17_typeof();
  expect(result.number).toBe("number");
  expect(result.bigint).toBe("bigint");
  expect(result.string).toBe("string");
  expect(result.boolean).toBe("boolean");
  expect(result.undefined).toBe("undefined");
  expect(result["null (注意!)"]).toBe("object");
  expect(result.symbol).toBe("symbol");
  expect(result.array).toBe("object");
  expect(result.function).toBe("function");
});

test("任务 8.3: 数据清洗工具", () => {
  const result = task24_dataSanitizer();
  expect(result.text1).toBe("hello");
  expect(result.text2).toBe(null);
  expect(result.text3).toBe("123");
  expect(result.num1).toBe(42);
  expect(result.num2).toBe(42);
  expect(result.num3).toBe(null);
});

console.log(`
╔══════════════════════════════════════════════════════════════╗
║              📝 练习 01.2: 数据类型 (参考答案)               ║
╚══════════════════════════════════════════════════════════════╝

运行 'bun test ${import.meta.url}' 查看测试结果

💡 关键要点:
  - JavaScript 有 7 种原始类型: Number, BigInt, String, Boolean, Null, Undefined, Symbol
  - typeof null 返回 'object' 是历史遗留 bug
  - 使用 === 而不是 == 进行严格相等比较
  - 注意类型转换的陷阱，特别是 + 运算符
`);
