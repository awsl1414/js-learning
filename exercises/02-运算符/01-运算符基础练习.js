/**
 * 模块 02: 运算符 - 基础练习
 *
 * 学习目标:
 * - 掌握算术运算符的使用
 * - 理解比较运算符的区别
 * - 使用逻辑运算符进行条件判断
 *
 * TODO: 完成所有标记为 ??? 的部分
 */

import { test, expect, describe } from "bun:test";

describe("模块02 - 运算符基础练习", () => {

  // ==================== 任务 1-10: 基础运算符 ====================

  test("任务1: 算术运算符 - 基础计算", () => {
    // TODO: 完成下列计算
    const a = 10;
    const b = 3;

    const sum = ???;           // 应该是 13
    const difference = ???;    // 应该是 7
    const product = ???;       // 应该是 30
    const quotient = ???;      // 应该是 3.333...
    const remainder = ???;     // 应该是 1
    const power = ???;         // 应该是 1000

    expect(sum).toBe(13);
    expect(difference).toBe(7);
    expect(Math.floor(product)).toBe(30);
    expect(quotient).toBeCloseTo(3.333, 2);
    expect(remainder).toBe(1);
    expect(power).toBe(1000);
  });

  test("任务2: 自增和自减运算符", () => {
    let x = 5;

    // TODO: 理解前置和后置自增的区别
    // 后置自增: 先返回，后递增
    const a = ???;  // a 应该等于 5, x 应该等于 6
    expect(a).toBe(5);
    expect(x).toBe(6);

    // TODO: 前置自增
    const b = ???;  // x 应该等于 7, b 应该等于 7
    expect(b).toBe(7);
    expect(x).toBe(7);

    // TODO: 后置自减
    const c = ???;  // c 应该等于 7, x 应该等于 6
    expect(c).toBe(7);
    expect(x).toBe(6);

    // TODO: 前置自减
    const d = ???;  // x 应该等于 5, d 应该等于 5
    expect(d).toBe(5);
    expect(x).toBe(5);
  });

  test("任务3: 严格相等 vs 宽松相等", () => {
    // TODO: 理解 === 和 == 的区别
    // 提示: === 比较值和类型, == 只比较值 (会类型转换)

    expect(5 === 5).toBe(???);
    expect(5 === "5").toBe(???);   // 类型不同
    expect(5 == "5").toBe(???);     // 类型转换
    expect(null === undefined).toBe(???);
    expect(null == undefined).toBe(???);
    expect(NaN === NaN).toBe(???); // NaN 特殊
    expect(Object.is(NaN, NaN)).toBe(???); // Object.is 最严格
  });

  test("任务4: 比较运算符", () => {
    // TODO: 完成比较表达式
    expect(5 > 3).toBe(???);
    expect(5 >= 5).toBe(???);
    expect(5 < 10).toBe(???);
    expect(5 <= 5).toBe(???);

    // 字符串比较 (按字典序)
    expect("a" < "b").toBe(???);
    expect("A" < "a").toBe(???);   // 大写字母编码更小
    expect("10" < "2").toBe(???);  // 按字符比较

    // 数字和字符串混合
    expect(10 < "2").toBe(???);   // 数字比较
  });

  test("任务5: 逻辑与运算符 (&&)", () => {
    // TODO: 理解短路求值
    // 提示: 左侧为 falsy 时返回左侧

    expect(false && "hello").toBe(???);
    expect(true && "hello").toBe(???);
    expect(0 && "hello").toBe(???);
    expect("hello" && "world").toBe(???);

    // TODO: 使用 && 实现安全访问
    const user = { name: "Alice", age: 30 };
    const greeting1 = ???;  // 应该返回 "Alice"
    expect(greeting1).toBe("Alice");

    const user2 = null;
    const greeting2 = ???;  // 应该返回 null
    expect(greeting2).toBe(null);
  });

  test("任务6: 逻辑或运算符 (||)", () => {
    // TODO: 理解 || 的短路求值
    expect(true || "hello").toBe(???);
    expect(false || "hello").toBe(???);
    expect(0 || "default").toBe(???);
    expect("hello" || "world").toBe(???);

    // TODO: 使用 || 实现默认值
    function greet(name) {
      return ???;  // 如果 name 为 falsy, 返回 "Guest"
    }
    expect(greet("Alice")).toBe("Alice");
    expect(greet("")).toBe("Guest");  // 空字符串是 falsy
    expect(greet(0)).toBe("Guest");    // 0 是 falsy
  });

  test("任务7: 空值合并运算符 (??)", () => {
    // TODO: 理解 ?? 只处理 null 和 undefined
    expect(null ?? "default").toBe(???);
    expect(undefined ?? "default").toBe(???);
    expect(0 ?? "default").toBe(???);      // 0 不是 null/undefined
    expect("" ?? "default").toBe(???);     // 空字符串不是 null/undefined
    expect(false ?? "default").toBe(???); // false 不是 null/undefined

    // TODO: 理解 ?? 和 || 的区别
    const value = 0;
    expect(value || "default").toBe(???);  // || 会误判
    expect(value ?? "default").toBe(???);  // ?? 正确处理
  });

  test("任务8: 一元运算符", () => {
    // TODO: 一元加号 (转为数字)
    expect(+"42").toBe(???);
    expect(+"hello").toBeNaN();

    // TODO: 一元减号
    expect(-42).toBe(???);
    expect(-"42").toBe(???);

    // TODO: 逻辑非
    expect(!true).toBe(???);
    expect(!false).toBe(???);
    expect(!0).toBe(???);
    expect(!"hello").toBe(???);
    expect(!!"hello").toBe(???); // 双重否定转为布尔
  });

  test("任务9: 位运算符基础", () => {
    // TODO: 按位与 (&)
    // 提示: 5 = 101, 3 = 011
    expect(5 & 3).toBe(???);  // 101 & 011 = 001

    // TODO: 按位或 (|)
    expect(5 | 3).toBe(???);  // 101 | 011 = 111

    // TODO: 按位异或 (^)
    expect(5 ^ 3).toBe(???);  // 101 ^ 011 = 110

    // TODO: 左移 (<<)
    expect(5 << 1).toBe(???);  // 1010

    // TODO: 右移 (>>)
    expect(20 >> 2).toBe(???);

    // TODO: 使用 ~~ 取整
    expect(~~3.14).toBe(???);
    expect(~~(-3.14)).toBe(???);
  });

  test("任务10: 运算符优先级", () => {
    // TODO: 理解运算符优先级
    // && 优先级高于 ||
    const result1 = false || true && false;
    expect(result1).toBe(???); // false || (true && false)

    // TODO: 比较运算符优先级高于逻辑运算符
    const result2 = ???;
    expect(result2).toBe(true);

    // TODO: 使用括号明确意图
    const result3 = ???;
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

    // TODO: 使用可选链安全访问嵌套属性
    expect(user?.profile?.name).toBe(???);
    expect(user?.address?.city).toBe(???);

    // TODO: 可选调用
    const obj = {
      method: () => "hello"
    };
    expect(obj.method?.()).toBe(???);
    expect(obj.nonExistent?.()).toBe(???);

    // TODO: 数组访问
    const arr = [1, 2, 3];
    expect(arr?.[0]).toBe(???);
  });

  test("任务12: 空值合并赋值 (??=)", () => {
    // TODO: 理解 ??= 的用法
    let a = null;
    a ??= 10;  // a = a ?? 10
    expect(a).toBe(???);

    let b = 0;
    b ??= 10;  // 0 不是 null/undefined，保持不变
    expect(b).toBe(???);

    let c = undefined;
    c ??= "default";
    expect(c).toBe(???);
  });

  test("任务13: 逻辑或赋值 (||=)", () => {
    // TODO: 理解 ||= 的用法
    let a = 0;
    a ||= 10;  // a = a || 10
    expect(a).toBe(???); // 0 是 falsy

    let b = 5;
    b ||= 10;
    expect(b).toBe(???); // 5 是 truthy
  });

  test("任务14: 逻辑与赋值 (&&=)", () => {
    // TODO: 理解 &&= 的用法
    let a = 5;
    a &&= 10;  // a = a && 10
    expect(a).toBe(???);

    let b = 0;
    b &&= 10;
    expect(b).toBe(???);
  });

  test("任务15: 数组解构", () => {
    const arr = [1, 2, 3, 4, 5];

    // TODO: 基本解构
    const [first, second] = ???;
    expect(first).toBe(1);
    expect(second).toBe(2);

    // TODO: 跳过元素
    const [x, , y] = ???;
    expect(x).toBe(1);
    expect(y).toBe(3);

    // TODO: 剩余元素
    const [head, ...tail] = ???;
    expect(head).toBe(1);
    expect(tail).toEqual([2, 3, 4, 5]);

    // TODO: 默认值
    const [p = 10, q = 20] = ???;
    expect(p).toBe(1);
    expect(q).toBe(20);
  });

  test("任务16: 对象解构", () => {
    const user = { name: "Alice", age: 30, city: "NYC" };

    // TODO: 基本解构
    const { name, age } = ???;
    expect(name).toBe("Alice");
    expect(age).toBe(30);

    // TODO: 重命名
    const { name: userName, age: userAge } = ???;
    expect(userName).toBe("Alice");
    expect(userAge).toBe(30);

    // TODO: 默认值
    const { name: n, role = "user" } = ???;
    expect(n).toBe("Alice");
    expect(role).toBe("user");

    // TODO: 剩余
    const { city, ...rest } = ???;
    expect(city).toBe("NYC");
    expect(rest).toEqual({ name: "Alice", age: 30 });
  });

  test("任务17: 数组展开运算符", () => {
    const arr1 = [1, 2, 3];
    const arr2 = [4, 5, 6];

    // TODO: 合并数组
    const combined = ???;
    expect(combined).toEqual([1, 2, 3, 4, 5, 6]);

    // TODO: 复制数组
    const copy = ???;
    expect(copy).toEqual([1, 2, 3]);
    expect(copy).not.toBe(arr1); // 不同引用

    // TODO: 在数组中插入
    const withNew = ???;
    expect(withNew).toEqual([0, 1, 2, 3, 4]);

    // TODO: 字符串展开
    const chars = ???;
    expect(chars).toEqual(["h", "e", "l", "l", "o"]);
  });

  test("任务18: 对象展开运算符", () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { c: 3, d: 4 };

    // TODO: 合并对象
    const merged = ???;
    expect(merged).toEqual({ a: 1, b: 2, c: 3, d: 4 });

    // TODO: 覆盖属性
    const updated = ???;
    expect(updated).toEqual({ a: 1, b: 20 });

    // TODO: 添加属性
    const withNew = ???;
    expect(withNew).toEqual({ a: 1, b: 2, e: 5 });
  });

  test("任务19: 函数参数展开", () => {
    // TODO: 使用剩余参数实现 sum 函数
    function sum(???) {
      return ???;
    }

    expect(sum(1, 2, 3)).toBe(6);
    expect(sum(1, 2, 3, 4, 5)).toBe(15);

    // TODO: 使用展开运算符调用 multiply
    function multiply(a, b, c) {
      return a * b * c;
    }

    const nums = [2, 3, 4];
    expect(multiply(???) ).toBe(24);

    // TODO: Math.max/min
    expect(Math.max(???)).toBe(5);
    expect(Math.min(???)).toBe(1);
  });

  test("任务20: 幂运算赋值", () => {
    // TODO: 使用 **= 运算符
    let x = 2;
    ???;  // x = x ** 3, 应该等于 8
    expect(x).toBe(8);

    let y = 5;
    ???;  // y = y ** 2, 应该等于 25
    expect(y).toBe(25);
  });

  // ==================== 综合应用题 ====================

  test("综合题1: 计算器函数", () => {
    // TODO: 实现一个计算器函数，支持基本运算
    function calculate(a, b, operator) {
      ???
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
    // TODO: 实现温度转换函数
    function celsiusToFahrenheit(c) {
      ???
    }

    function fahrenheitToCelsius(f) {
      ???
    }

    expect(celsiusToFahrenheit(0)).toBe(32);
    expect(celsiusToFahrenheit(100)).toBe(212);
    expect(fahrenheitToCelsius(32)).toBeCloseTo(0, 5);
    expect(fahrenheitToCelsius(212)).toBeCloseTo(100, 5);
  });

  test("综合题3: 安全的对象访问", () => {
    // TODO: 使用可选链和空值合并实现安全访问
    function getUserCity(user) {
      ???
    }

    const user1 = { address: { city: "NYC" } };
    expect(getUserCity(user1)).toBe("NYC");

    const user2 = { };
    expect(getUserCity(user2)).toBe("Unknown");

    const user3 = null;
    expect(getUserCity(user3)).toBe("Unknown");
  });

  test("综合题4: 数组统计", () => {
    // TODO: 使用解构和展开运算符
    function analyzeArray(arr) {
      ???
      return {
        first,
        last,
        length: arr.length,
        sum: ???,
        withoutFirst: rest,
        withoutLast: ???
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
    // TODO: 实现配置合并，默认配置 + 用户配置
    function mergeConfig(defaultConfig, userConfig) {
      ???
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
    // TODO: 使用位运算符判断奇偶
    function isOdd(n) {
      ???
    }

    function isEven(n) {
      ???
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
    // TODO: 实现字符串验证函数
    function validateString(str) {
      return {
        isEmpty: ???,
        length: ???,
        hasSpaces: ???,
        hasNumbers: ???,
        hasLetters: ???,
        isAlphaNumeric: ???,
        firstChar: ???,
        lastChar: ???
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
    // TODO: 实现对象数组排序
    const users = [
      { name: "Alice", age: 30 },
      { name: "Bob", age: 25 },
      { name: "Charlie", age: 35 }
    ];

    // TODO: 按年龄升序
    const sortedByAge = ???;
    expect(sortedByAge[0].name).toBe("Bob");
    expect(sortedByAge[2].name).toBe("Charlie");

    // TODO: 按名字字母顺序
    const sortedByName = ???;
    expect(sortedByName[0].name).toBe("Alice");
    expect(sortedByName[2].name).toBe("Charlie");
  });

  test("综合题9: 条件表达式链", () => {
    // TODO: 使用三元运算符实现成绩评级
    function getGrade(score) {
      ???
    }

    expect(getGrade(95)).toBe("A");
    expect(getGrade(85)).toBe("B");
    expect(getGrade(75)).toBe("C");
    expect(getGrade(65)).toBe("D");
    expect(getGrade(55)).toBe("F");
  });

  test("综合题10: 混合运算符挑战", () => {
    // TODO: 综合运用各种运算符
    function processData(data) {
      // 使用 ?? 提供默认值
      const items = ???;

      // 使用可选链和逻辑或
      const config = ???;
      const debug = ???;

      // 使用 map 和展开运算符
      const doubled = ???;

      // 使用 reduce 和位运算
      const sum = ???;
      const isSumEven = ???;

      // 使用 ??= 确保有值
      let result = ???;
      ???;

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

console.log("🎯 模块02 - 运算符基础练习完成！");
