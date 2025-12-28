/**
 * 模块 12: 错误处理 - 基础练习
 *
 * 学习目标:
 * - 理解 Error 对象
 * - 掌握 try-catch-finally
 * - 熟练使用 throw
 * - 掌握自定义错误
 */

import { test, expect, describe } from "bun:test";

describe("模块12 - 错误处理基础练习", () => {

  test("任务1: Error 对象", () => {
    // TODO: 创建一个 Error 对象
    const error = new Error("Something went wrong");

    expect(error.message).toBe("Something went wrong");
    expect(error.name).toBe("Error");
    expect(error.stack).toContain("Error: Something went wrong");
  });

  test("任务2: throw 语句", () => {
    // TODO: 实现 divide 函数，除数为0时抛出错误
    function divide(a, b) {
      // ???
    }

    expect(divide(10, 2)).toBe(5);
    expect(() => divide(10, 0)).toThrow("Division by zero");
  });

  test("任务3: try-catch", () => {
    // TODO: 使用 try-catch 处理错误
    function safeDivide(a, b) {
      // ???
    }

    expect(safeDivide(10, 2)).toBe(5);
    expect(safeDivide(10, 0)).toBe("Error: Division by zero");
  });

  test("任务4: finally", () => {
    // TODO: 使用 finally 确保清理代码执行
    let cleanupCalled = false;

    try {
      throw new Error("Error");
    } catch (error) {
      // 处理错误
    } finally {
      // ???
    }

    expect(cleanupCalled).toBe(true);
  });

  test("任务5: 自定义错误", () => {
    // TODO: 创建自定义 ValidationError 类
    class ValidationError extends Error {
      // ???
    }

    function validateAge(age) {
      if (age < 0 || age > 150) {
        throw new ValidationError("Invalid age");
      }
      return true;
    }

    expect(() => validateAge(-1)).toThrow(ValidationError);
  });

  test("任务6: Error 类型", () => {
    // TODO: 理解不同类型的 Error
    // TypeError - 尝试调用 null 的方法
    expect(() => {
      const obj = null;
      obj.method();
    }).toThrow(TypeError);

    // ReferenceError - 访问不存在的变量
    expect(() => {
      const x = undefinedVar;
    }).toThrow(ReferenceError);

    // RangeError - 创建大小为负数的数组
    expect(() => {
      new Array(-1);
    }).toThrow(RangeError);

    // SyntaxError - eval 无效语法
    expect(() => {
      eval("1 + * 2");
    }).toThrow(SyntaxError);
  });

  test("任务7: 多 catch 处理", () => {
    // TODO: 创建 NetworkError 类并处理不同类型的错误
    class NetworkError extends Error {
      constructor(message) {
        // ???
      }
    }

    function fetchData(shouldFail) {
      if (shouldFail) {
        throw new NetworkError("Network error");
      }
      return "data";
    }

    let result;
    try {
      result = fetchData(false);
    } catch (error) {
      if (error instanceof NetworkError) {
        result = "Network error handled";
      } else {
        result = "Other error handled";
      }
    }

    expect(result).toBe("data");
  });

  test("任务8: Promise 错误处理", async () => {
    // TODO: 处理异步错误
    function asyncFail() {
      return Promise.reject(new Error("Async error"));
    }

    try {
      await asyncFail();
      expect(true).toBe(false);
    } catch (error) {
      expect(error.message).toBe("Async error");
    }
  });

  test("任务9: 错误传播", () => {
    // TODO: 理解错误如何在调用栈中传播
    function level3() {
      throw new Error("Error in level3");
    }

    function level2() {
      // ???
    }

    function level1() {
      try {
        level2();
      } catch (error) {
        return error.message;
      }
    }

    expect(level1()).toBe("Error in level3");
  });

  test("任务10: 错误堆栈", () => {
    // TODO: 理解错误堆栈信息
    function first() {
      second();
    }

    function second() {
      third();
    }

    function third() {
      throw new Error("Error");
    }

    try {
      first();
    } catch (error) {
      expect(error.stack).toContain("first");
      expect(error.stack).toContain("second");
      expect(error.stack).toContain("third");
    }
  });

  // 综合练习
  test("综合题1: 验证器", () => {
    // TODO: 实现用户验证器
    function validateUser(user) {
      // ???
    }

    class ValidationError extends Error {
      constructor(message) {
        super(message);
        this.name = "ValidationError";
      }
    }

    expect(() => validateUser({ name: "ab", email: "invalid" }))
      .toThrow(ValidationError);
  });

  test("综合题2: 重试机制", async () => {
    // TODO: 实现带重试的异步函数
    async function retry(fn, times = 3) {
      // ???
    }

    let attempts = 0;
    const flaky = async () => {
      attempts++;
      if (attempts < 3) throw new Error("Fail");
      return "success";
    };

    const result = await retry(flaky);
    expect(result).toBe("success");
  });
});

console.log("🎯 模块12 - 错误处理基础练习完成！");
