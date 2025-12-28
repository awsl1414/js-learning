#!/usr/bin/env bun
/**
 * 练习 01.2: 数据类型
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
  // ✏️ 创建以下变量:
  const integer = ;           // 整数 42
  const negative = ;          // 负数 -17
  const float = ;             // 浮点数 3.14
  const scientific = ;        // 科学计数法 1.5e10
  const hex = ;               // 十六进制 0xFF
  const binary = ;            // 二进制 0b1010
  const withSeparator = ;     // 数字分隔符 1_000_000

  return { integer, negative, float, scientific, hex, binary, withSeparator };
}

/**
 * 任务 1.2: 特殊数字值
 */
function task02_specialNumbers() {
  // ✏️ 创建以下特殊值:
  const infinity = ;      // Infinity
  const negInfinity = ;   // -Infinity
  const nan = ;           // NaN

  return {
    infinity,
    negInfinity,
    nan,
    infinityIsFinite: Number.isFinite(infinity),      // ?
    negInfinityIsFinite: Number.isFinite(negInfinity), // ?
    nanIsNaN: Number.isNaN(nan),                       // ?
  };
}

/**
 * 任务 1.3: Number 方法
 */
function task03_numberMethods() {
  const str1 = "42";
  const str2 = "42px";
  const str3 = "3.14";

  // ✏️ 使用 Number/parseInt/parseFloat 转换:
  const num1 = ; // 将 str1 转为数字
  const num2 = ; // 将 str2 转为数字 (只取数字部分)
  const num3 = ; // 将 str3 转为浮点数

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
  // 这个经典问题的结果是什么?
  const result = 0.1 + 0.2;

  // ✏️ 解释为什么结果不是 0.3:
  const explanation = "";

  // ✏️ 提供一个解决方案 (使用 Number.EPSILON 或整数运算):
  const preciseResult = 0;

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
  // ✏️ 创建两种方式:
  const big1 = ;  // 使用 n 后缀
  const big2 = ;  // 使用 BigInt()

  return {
    big1: big1,
    big2: big2,
    areEqual: big1 === 9007199254740991n
  };
}

/**
 * 任务 2.2: BigInt 运算
 */
function task06_bigIntMath() {
  const a = 100n;
  const b = 25n;

  // ✏️ 进行运算:
  const sum = ;      // a + b
  const diff = ;     // a - b
  const product = ;  // a * b
  const div = ;      // a / b

  return { sum, diff, product, div };
}

/**
 * 任务 2.3: BigInt 与 Number 的比较
 */
function task07_bigIntComparison() {
  const big = 10n;
  const num = 10;

  // ✏️ 预测结果并解释:
  return {
    strictEqual: big === num,      // 结果? true/false
    looseEqual: big == num,        // 结果? true/false
    explanation: ""                // 解释为什么
  };
}

// ============================================
// 第三部分: String 类型
// ============================================

/**
 * 任务 3.1: 创建字符串
 */
function task08_createStrings() {
  // ✏️ 使用不同方式创建:
  const singleQuote = ;    // 单引号: Hello
  const doubleQuote = ;    // 双引号: World
  const template = ;       // 模板字符串: Hello World
  const multiline = ;      // 多行字符串

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
  // ✏️ 使用模板字符串返回格式化的字符串:
  // 格式: "姓名: Alice, 年龄: 30"

  return "";  // 替换为你的实现
}

/**
 * 任务 3.3: 常用字符串方法
 */
function task10_stringMethods() {
  const str = "  Hello JavaScript World  ";

  return {
    length: ,                      // ✏️ 字符串长度
    upper: ,                       // ✏️ 转大写
    lower: ,                       // ✏️ 转小写
    trimmed: ,                     // ✏️ 去除首尾空格
    slice: ,                       // ✏️ 截取 "JavaScript" (索引 2-14)
    includes: ,                    // ✏️ 检查是否包含 "JavaScript"
    startsWith: ,                  // ✏️ 检查是否以 "Hello" 开头
    endsWith: ,                    // ✏️ 检查是否以 "World" 结尾
    replace: ,                     // ✏️ 替换 "JavaScript" 为 "JS"
    repeat:                        // ✏️ 重复 "Ha" 3 次
  };
}

/**
 * 任务 3.4: 字符串不可变性
 */
function task11_stringImmutability() {
  let str = "hello";

  // ❌ 这行代码能工作吗? 为什么?
  // str[0] = "H";

  // ✏️ 如何正确地将字符串转为大写?

  // ✏️ 解释为什么字符串是不可变的:

  return {
    original: str,
    uppercase: "",  // 正确的大写版本
    explanation: ""
  };
}

// ============================================
// 第四部分: Boolean 和 Undefined/Null
// ============================================

/**
 * 任务 4.1: 创建布尔值
 */
function task12_booleans() {
  // ✏️ 创建:
  const isTrue = ;
  const isFalse = ;

  // ✏️ 以下值转为布尔后是什么?
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
  // ✏️ 判断以下值是真值还是假值:
  return {
    "false": "truthy/falsy?",
    "0": "truthy/falsy?",
    "''": "truthy/falsy?",
    "null": "truthy/falsy?",
    "undefined": "truthy/falsy?",
    "NaN": "truthy/falsy?",
    "'0'": "truthy/falsy?",
    "'false'": "truthy/falsy?",
    "[]": "truthy/falsy?",
    "{}": "truthy/falsy?"
  };
}

/**
 * 任务 4.3: undefined vs null
 */
function task14_undefinedVsNull() {
  // ✏️ 创建示例并解释区别:

  let undefinedVar;
  const nullVar = null;

  return {
    undefinedVar,
    nullVar,
    undefinedType: typeof undefinedVar,
    nullType: typeof nullVar,
    explanation: ""  // 解释两者的区别和用途
  };
}

// ============================================
// 第五部分: Symbol 类型
// ============================================

/**
 * 任务 5.1: 创建和比较 Symbol
 */
function task15_symbols() {
  // ✏️ 创建 Symbol:
  const sym1 = Symbol("id");
  const sym2 = Symbol("id");
  const sym3 = sym1;

  return {
    sym1Description: sym1.description,
    sym1EqualsSym2: sym1 === sym2,  // 结果?
    sym1EqualsSym3: sym1 === sym3,  // 结果?
    explanation: ""  // 解释结果
  };
}

/**
 * 任务 5.2: Symbol 作为对象属性
 */
function task16_symbolAsProperty() {
  // ✏️ 创建一个 Symbol 作为对象属性键:
  const idSym = ;

  const user = {
    name: "Alice",
    // ✏️ 添加 Symbol 属性 id
  };

  // ✏️ 访问 Symbol 属性:

  return {
    user,
    symbolPropertyValue: ""  // Symbol 属性的值
  };
}

// ============================================
// 第六部分: typeof 操作符
// ============================================

/**
 * 任务 6.1: typeof 运算
 */
function task17_typeof() {
  // ✏️ 预测 typeof 的结果:
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
  // ✏️ 实现类型检查函数:

  function isNumber(value) {
    // 实现: 检查是否为有效数字 (排除 NaN)
    return false;
  }

  function isString(value) {
    // 实现: 检查是否为字符串
    return false;
  }

  function isBoolean(value) {
    // 实现: 检查是否为布尔值
    return false;
  }

  function isNull(value) {
    // 实现: 检查是否为 null (typeof 不够用)
    return false;
  }

  function isArray(value) {
    // 实现: 检查是否为数组
    return false;
  }

  function isObject(value) {
    // 实现: 检查是否为普通对象 (非 null，非数组)
    return false;
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
  // ✏️ 进行类型转换:
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
  // ✏️ 预测结果:
  return {
    "5 + 3": "5" + 3,           // 结果?
    "5 - 3": "5" - 3,           // 结果?
    "5 * 2": "5" * 2,           // 结果?
    "5 + true": "5" + true,     // 结果?
    "5 - true": "5" - true,     // 结果?
    "5 + null": "5" + null,     // 结果?
    "5 - null": "5" - null,     // 结果?
    "5 + undefined": "5" + undefined,  // 结果?
    "5 == '5'": 5 == "5",       // 结果?
    "5 === '5'": 5 === "5",     // 结果?
    "null == undefined": null == undefined,  // 结果?
    "null === undefined": null === undefined // 结果?
  };
}

/**
 * 任务 7.3: 类型转换陷阱
 */
function task21_conversionTraps() {
  // ✏️ 解释以下结果的陷阱:

  const traps = {
    "0.1 + 0.2 === 0.3": 0.1 + 0.2 === 0.3,
    "9999999999999999 === 10000000000000000": 9999999999999999 === 10000000000000000,
    "'5' - 1": "5" - 1,
    "'5' + 1": "5" + 1,
    "[] + []": [] + [],
    "{} + []": {} + [],
    "0 == '0'": 0 == "0",
    "0 == '': 0 == ''",
    "'0' == '': "0" == ""
  };

  // ✏️ 为每个结果写下解释:

  return {
    results: traps,
    explanations: {
      "0.1 + 0.2": "",
      "大整数": "",
      "字符串运算": "",
      "对象转字符串": ""
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
  // ✏️ 实现一个全面的类型验证函数:
  function getType(value) {
    // 返回值的准确类型名称
    // 例如: "Number", "String", "Array", "Null", "Object", etc.
    return "";
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
  // ✏️ 实现安全的转换函数:
  function toNumber(value) {
    // 安全地转换为数字，失败返回 null
    return null;
  }

  function toInteger(value) {
    // 安全地转换为整数，失败返回 null
    return null;
  }

  function toString(value) {
    // 安全地转换为字符串
    return "";
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
  // ✏️ 实现数据清洗函数，处理用户输入:
  function sanitizeInput(input) {
    // 1. 转为字符串
    // 2. 去除首尾空格
    // 3. 如果是空字符串，返回 null
    // 4. 否则返回清洗后的字符串
    return "";
  }

  function sanitizeNumber(input) {
    // 1. 尝试转为数字
    // 2. 如果是 NaN，返回 null
    // 3. 否则返回数字
    return 0;
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
  // ✏️ 创建一个函数，返回值的详细信息:
  function inspect(value) {
    return {
      type: "",           // 准确的类型名
      isPrimitive: ,     // 是否为原始类型
      isTruthy: ,        // 是否为真值
      typeof: "",        // typeof 结果
      valueOf:           // 基础值 (如果是对象)
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
║                     📝 练习 01.2: 数据类型                    ║
╚══════════════════════════════════════════════════════════════╝

运行 'bun test ${import.meta.url}' 查看测试结果

💡 提示:
  - 理解每种数据类型的特点
  - 掌握 typeof 的返回值
  - 注意类型转换的陷阱
`);
