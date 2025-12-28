/**
 * 模块 02: 运算符 - 基础练习 (参考答案)
 *
 * 学习目标:
 * - 掌握算术运算符的使用
 * - 理解比较运算符的区别
 * - 使用逻辑运算符进行条件判断
 */

import { test, expect, describe } from "bun:test";

describe("模块02 - 运算符基础练习 (参考答案)", () => {

  // ==================== 任务 1-10: 基础运算符 ====================

  test("任务1: 算术运算符 - 基础计算", () => {
    const a = 10;
    const b = 3;

    const sum = a + b;           // 13
    const difference = a - b;    // 7
    const product = a * b;       // 30
    const quotient = a / b;      // 3.333...
    const remainder = a % b;     // 1
    const power = a ** b;        // 1000

    expect(sum).toBe(13);
    expect(difference).toBe(7);
    expect(Math.floor(product)).toBe(30);
    expect(quotient).toBeCloseTo(3.333, 2);
    expect(remainder).toBe(1);
    expect(power).toBe(1000);
  });

  test("任务2: 自增和自减运算符", () => {
    let x = 5;

    // 后置自增: 先返回，后递增
    const a = x++;  // a = 5, x = 6
    expect(a).toBe(5);
    expect(x).toBe(6);

    // 前置自增: 先递增，后返回
    const b = ++x;  // x = 7, b = 7
    expect(b).toBe(7);
    expect(x).toBe(7);

    // 后置自减
    const c = x--;  // c = 7, x = 6
    expect(c).toBe(7);
    expect(x).toBe(6);

    // 前置自减
    const d = --x;  // x = 5, d = 5
    expect(d).toBe(5);
    expect(x).toBe(5);
  });

  test("任务3: 严格相等 vs 宽松相等", () => {
    // 严格相等 (===): 比较值和类型
    // 宽松相等 (==): 只比较值 (类型转换)

    expect(5 === 5).toBe(true);
    expect(5 === "5").toBe(false);   // 类型不同
    expect(5 == "5").toBe(true);     // 类型转换
    expect(null === undefined).toBe(false);
    expect(null == undefined).toBe(true);
    expect(NaN === NaN).toBe(false); // NaN 特殊
    expect(Object.is(NaN, NaN)).toBe(true); // Object.is 最严格
  });

  test("任务4: 比较运算符", () => {
    expect(5 > 3).toBe(true);
    expect(5 >= 5).toBe(true);
    expect(5 < 10).toBe(true);
    expect(5 <= 5).toBe(true);

    // 字符串比较 (按字典序)
    expect("a" < "b").toBe(true);
    expect("A" < "a").toBe(true);   // 大写字母编码更小
    expect("10" < "2").toBe(true);  // 按字符比较

    // 数字和字符串混合
    expect(10 < "2").toBe(false);   // 数字比较
  });

  test("任务5: 逻辑与运算符 (&&)", () => {
    // 短路求值: 左侧为 falsy 时返回左侧
    expect(false && "hello").toBe(false);
    expect(true && "hello").toBe("hello");
    expect(0 && "hello").toBe(0);
    expect("hello" && "world").toBe("world");

    // 实际应用: 安全访问
    const user = { name: "Alice", age: 30 };
    const greeting1 = user && user.name;
    expect(greeting1).toBe("Alice");

    const user2 = null;
    const greeting2 = user2 && user2.name;
    expect(greeting2).toBe(null);
  });

  test("任务6: 逻辑或运算符 (||)", () => {
    // 短路求值: 左侧为 truthy 时返回左侧
    expect(true || "hello").toBe(true);
    expect(false || "hello").toBe("hello");
    expect(0 || "default").toBe("default");
    expect("hello" || "world").toBe("hello");

    // 默认值模式
    function greet(name) {
      return name || "Guest";
    }
    expect(greet("Alice")).toBe("Alice");
    expect(greet("")).toBe("Guest");  // 空字符串是 falsy
    expect(greet(0)).toBe("Guest");    // 0 是 falsy
  });

  test("任务7: 空值合并运算符 (??)", () => {
    // ?? 只处理 null 和 undefined
    expect(null ?? "default").toBe("default");
    expect(undefined ?? "default").toBe("default");
    expect(0 ?? "default").toBe(0);      // 0 不是 null/undefined
    expect("" ?? "default").toBe("");     // 空字符串不是 null/undefined
    expect(false ?? "default").toBe(false); // false 不是 null/undefined

    // vs || 的区别
    const value = 0;
    expect(value || "default").toBe("default");  // || 会误判
    expect(value ?? "default").toBe(0);          // ?? 正确处理
  });

  test("任务8: 一元运算符", () => {
    // 一元加号 (转为数字)
    expect(+"42").toBe(42);
    expect(+"hello").toBeNaN();

    // 一元减号
    expect(-42).toBe(-42);
    expect(-"42").toBe(-42);

    // 逻辑非
    expect(!true).toBe(false);
    expect(!false).toBe(true);
    expect(!0).toBe(true);
    expect(!"hello").toBe(false);
    expect(!!"hello").toBe(true); // 双重否定转为布尔
  });

  test("任务9: 位运算符基础", () => {
    // 按位与 (&)
    expect(5 & 3).toBe(1);  // 101 & 011 = 001

    // 按位或 (|)
    expect(5 | 3).toBe(7);  // 101 | 011 = 111

    // 按位异或 (^)
    expect(5 ^ 3).toBe(6);  // 101 ^ 011 = 110

    // 左移 (<<)
    expect(5 << 1).toBe(10);  // 1010

    // 右移 (>>)
    expect(20 >> 2).toBe(5);

    // 取整技巧
    expect(~~3.14).toBe(3);
    expect(~~(-3.14)).toBe(-3);
  });

  test("任务10: 运算符优先级", () => {
    // && 优先级高于 ||
    const result1 = false || true && false;
    expect(result1).toBe(false); // false || (true && false)

    // 比较运算符优先级高于逻辑运算符
    const result2 = 5 > 3 && 10 < 20;
    expect(result2).toBe(true);

    // 使用括号明确意图
    const result3 = (5 > 3) && (10 < 20);
    expect(result3).toBe(true);
  });

  // ==================== 任务 11-20: 现代运算符 ====================

  test("任务11: 可选链运算符 (?.)", () => {
    const user = {
      name: "Alice",
      address: {
        city: "NYC",
        zip: "10001"
      }
    };

    // 安全访问嵌套属性
    expect(user?.profile?.name).toBeUndefined();
    expect(user?.address?.city).toBe("NYC");

    // 可选调用
    const obj = {
      method: () => "hello"
    };
    expect(obj.method?.()).toBe("hello");
    expect(obj.nonExistent?.()).toBeUndefined();

    // 数组访问
    const arr = [1, 2, 3];
    expect(arr?.[0]).toBe(1);
  });

  test("任务12: 空值合并赋值 (??=)", () => {
    let a = null;
    a ??= 10;  // a = a ?? 10
    expect(a).toBe(10);

    let b = 0;
    b ??= 10;  // 0 不是 null/undefined，保持不变
    expect(b).toBe(0);

    let c = undefined;
    c ??= "default";
    expect(c).toBe("default");
  });

  test("任务13: 逻辑或赋值 (||=)", () => {
    let a = 0;
    a ||= 10;  // a = a || 10
    expect(a).toBe(10); // 0 是 falsy

    let b = 5;
    b ||= 10;
    expect(b).toBe(5); // 5 是 truthy
  });

  test("任务14: 逻辑与赋值 (&&=)", () => {
    let a = 5;
    a &&= 10;  // a = a && 10
    expect(a).toBe(10);

    let b = 0;
    b &&= 10;
    expect(b).toBe(0);
  });

  test("任务15: 数组解构", () => {
    const arr = [1, 2, 3, 4, 5];

    // 基本解构
    const [first, second] = arr;
    expect(first).toBe(1);
    expect(second).toBe(2);

    // 跳过元素
    const [x, , y] = arr;
    expect(x).toBe(1);
    expect(y).toBe(3);

    // 剩余元素
    const [head, ...tail] = arr;
    expect(head).toBe(1);
    expect(tail).toEqual([2, 3, 4, 5]);

    // 默认值
    const [p = 10, q = 20] = [1];
    expect(p).toBe(1);
    expect(q).toBe(20);
  });

  test("任务16: 对象解构", () => {
    const user = { name: "Alice", age: 30, city: "NYC" };

    // 基本解构
    const { name, age } = user;
    expect(name).toBe("Alice");
    expect(age).toBe(30);

    // 重命名
    const { name: userName, age: userAge } = user;
    expect(userName).toBe("Alice");
    expect(userAge).toBe(30);

    // 默认值
    const { name: n, role = "user" } = user;
    expect(n).toBe("Alice");
    expect(role).toBe("user");

    // 剩余
    const { city, ...rest } = user;
    expect(city).toBe("NYC");
    expect(rest).toEqual({ name: "Alice", age: 30 });
  });

  test("任务17: 数组展开运算符", () => {
    const arr1 = [1, 2, 3];
    const arr2 = [4, 5, 6];

    // 合并数组
    const combined = [...arr1, ...arr2];
    expect(combined).toEqual([1, 2, 3, 4, 5, 6]);

    // 复制数组
    const copy = [...arr1];
    expect(copy).toEqual([1, 2, 3]);
    expect(copy).not.toBe(arr1); // 不同引用

    // 在数组中插入
    const withNew = [0, ...arr1, 4];
    expect(withNew).toEqual([0, 1, 2, 3, 4]);

    // 字符串展开
    const chars = [..."hello"];
    expect(chars).toEqual(["h", "e", "l", "l", "o"]);
  });

  test("任务18: 对象展开运算符", () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { c: 3, d: 4 };

    // 合并对象
    const merged = { ...obj1, ...obj2 };
    expect(merged).toEqual({ a: 1, b: 2, c: 3, d: 4 });

    // 覆盖属性
    const updated = { ...obj1, b: 20 };
    expect(updated).toEqual({ a: 1, b: 20 });

    // 添加属性
    const withNew = { ...obj1, e: 5 };
    expect(withNew).toEqual({ a: 1, b: 2, e: 5 });
  });

  test("任务19: 函数参数展开", () => {
    function sum(...numbers) {
      return numbers.reduce((a, b) => a + b, 0);
    }

    expect(sum(1, 2, 3)).toBe(6);
    expect(sum(1, 2, 3, 4, 5)).toBe(15);

    function multiply(a, b, c) {
      return a * b * c;
    }

    const nums = [2, 3, 4];
    expect(multiply(...nums)).toBe(24);

    // Math.max/min
    expect(Math.max(...[1, 5, 3])).toBe(5);
    expect(Math.min(...[1, 5, 3])).toBe(1);
  });

  test("任务20: 幂运算赋值", () => {
    let x = 2;
    x **= 3;  // x = x ** 3
    expect(x).toBe(8);

    let y = 5;
    y **= 2;
    expect(y).toBe(25);
  });

  // ==================== 综合应用题 ====================

  test("综合题1: 计算器函数", () => {
    function calculate(a, b, operator) {
      switch (operator) {
        case "+": return a + b;
        case "-": return a - b;
        case "*": return a * b;
        case "/": return b !== 0 ? a / b : "Error: Division by zero";
        case "%": return a % b;
        case "**": return a ** b;
        default: return "Error: Unknown operator";
      }
    }

    expect(calculate(10, 5, "+")).toBe(15);
    expect(calculate(10, 5, "-")).toBe(5);
    expect(calculate(10, 5, "*")).toBe(50);
    expect(calculate(10, 5, "/")).toBe(2);
    expect(calculate(10, 5, "%")).toBe(0);
    expect(calculate(2, 8, "**")).toBe(256);
    expect(calculate(10, 0, "/")).toBe("Error: Division by zero");
  });

  test("综合题2: 温度转换器", () => {
    function celsiusToFahrenheit(c) {
      return (c * 9 / 5) + 32;
    }

    function fahrenheitToCelsius(f) {
      return (f - 32) * 5 / 9;
    }

    expect(celsiusToFahrenheit(0)).toBe(32);
    expect(celsiusToFahrenheit(100)).toBe(212);
    expect(fahrenheitToCelsius(32)).toBeCloseTo(0, 5);
    expect(fahrenheitToCelsius(212)).toBeCloseTo(100, 5);
  });

  test("综合题3: 安全的对象访问", () => {
    function getUserCity(user) {
      return user?.address?.city ?? "Unknown";
    }

    const user1 = { address: { city: "NYC" } };
    expect(getUserCity(user1)).toBe("NYC");

    const user2 = { };
    expect(getUserCity(user2)).toBe("Unknown");

    const user3 = null;
    expect(getUserCity(user3)).toBe("Unknown");
  });

  test("综合题4: 数组统计", () => {
    function analyzeArray(arr) {
      const [first] = arr;
      const [...rest] = arr;
      const last = arr.at(-1);

      return {
        first,
        last,
        length: arr.length,
        sum: arr.reduce((a, b) => a + b, 0),
        withoutFirst: rest,
        withoutLast: arr.slice(0, -1)
      };
    }

    const result = analyzeArray([1, 2, 3, 4, 5]);

    expect(result.first).toBe(1);
    expect(result.last).toBe(5);
    expect(result.length).toBe(5);
    expect(result.sum).toBe(15);
    expect(result.withoutFirst).toEqual([2, 3, 4, 5]);
    expect(result.withoutLast).toEqual([1, 2, 3, 4]);
  });

  test("综合题5: 配置合并器", () => {
    function mergeConfig(defaultConfig, userConfig) {
      return {
        ...defaultConfig,
        ...userConfig,
        // 嵌套对象也需要合并
        settings: {
          ...defaultConfig.settings,
          ...(userConfig.settings || {})
        }
      };
    }

    const defaults = {
      debug: false,
      timeout: 5000,
      settings: {
        theme: "light",
        fontSize: 14
      }
    };

    const userConfig = {
      debug: true,
      settings: {
        theme: "dark"
      }
    };

    const merged = mergeConfig(defaults, userConfig);

    expect(merged.debug).toBe(true);           // 用户配置覆盖
    expect(merged.timeout).toBe(5000);        // 默认配置
    expect(merged.settings.theme).toBe("dark"); // 用户配置
    expect(merged.settings.fontSize).toBe(14); // 默认配置
  });

  test("综合题6: 奇偶判断器", () => {
    function isOdd(n) {
      return (n & 1) === 1;
    }

    function isEven(n) {
      return (n & 1) === 0;
    }

    expect(isOdd(1)).toBe(true);
    expect(isOdd(2)).toBe(false);
    expect(isOdd(99)).toBe(true);
    expect(isEven(100)).toBe(true);
    expect(isEven(101)).toBe(false);

    // 负数测试
    expect(isOdd(-3)).toBe(true);
    expect(isEven(-4)).toBe(true);
  });

  test("综合题7: 字符串验证器", () => {
    function validateString(str) {
      return {
        isEmpty: str.length === 0,
        length: str.length,
        hasSpaces: /\s/.test(str),
        hasNumbers: /\d/.test(str),
        hasLetters: /[a-zA-Z]/.test(str),
        isAlphaNumeric: /^[a-zA-Z0-9]+$/.test(str),
        firstChar: str.at(0) ?? "",
        lastChar: str.at(-1) ?? ""
      };
    }

    const result = validateString("Hello123");

    expect(result.isEmpty).toBe(false);
    expect(result.length).toBe(8);
    expect(result.hasSpaces).toBe(false);
    expect(result.hasNumbers).toBe(true);
    expect(result.hasLetters).toBe(true);
    expect(result.isAlphaNumeric).toBe(true);
    expect(result.firstChar).toBe("H");
    expect(result.lastChar).toBe("3");
  });

  test("综合题8: 数组排序比较", () => {
    const users = [
      { name: "Alice", age: 30 },
      { name: "Bob", age: 25 },
      { name: "Charlie", age: 35 }
    ];

    // 按年龄升序
    const sortedByAge = [...users].sort((a, b) => a.age - b.age);
    expect(sortedByAge[0].name).toBe("Bob");
    expect(sortedByAge[2].name).toBe("Charlie");

    // 按名字字母顺序
    const sortedByName = [...users].sort((a, b) => a.name.localeCompare(b.name));
    expect(sortedByName[0].name).toBe("Alice");
    expect(sortedByName[2].name).toBe("Charlie");
  });

  test("综合题9: 条件表达式链", () => {
    function getGrade(score) {
      return score >= 90 ? "A" :
             score >= 80 ? "B" :
             score >= 70 ? "C" :
             score >= 60 ? "D" : "F";
    }

    expect(getGrade(95)).toBe("A");
    expect(getGrade(85)).toBe("B");
    expect(getGrade(75)).toBe("C");
    expect(getGrade(65)).toBe("D");
    expect(getGrade(55)).toBe("F");
  });

  test("综合题10: 混合运算符挑战", () => {
    function processData(data) {
      // 使用 ?? 提供默认值
      const items = data?.items ?? [];

      // 使用可选链和逻辑或
      const config = data?.config ?? {};
      const debug = config.debug ?? false;

      // 使用 map 和展开运算符
      const doubled = items.map(x => x * 2);

      // 使用 reduce 和位运算
      const sum = items.reduce((a, b) => a + b, 0);
      const isSumEven = (sum & 1) === 0;

      // 使用 ??= 确保有值
      let result = data?.result;
      result ??= sum;

      return {
        original: items,
        doubled,
        sum,
        isSumEven,
        result,
        debug
      };
    }

    const input = {
      items: [1, 2, 3, 4, 5],
      config: { debug: true }
    };

    const output = processData(input);

    expect(output.original).toEqual([1, 2, 3, 4, 5]);
    expect(output.doubled).toEqual([2, 4, 6, 8, 10]);
    expect(output.sum).toBe(15);
    expect(output.isSumEven).toBe(false);
    expect(output.result).toBe(15);
    expect(output.debug).toBe(true);
  });
});

console.log("✅ 模块02 - 运算符基础练习 (参考答案) 完成！");
