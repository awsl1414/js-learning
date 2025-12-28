/**
 * 模块 12: 错误处理 - 基础练习 (参考答案)
 */

import { test, expect, describe } from "bun:test";

describe("模块12 - 错误处理基础练习", () => {

  test("任务1: Error 对象", () => {
    const error = new Error("Something went wrong");

    expect(error.message).toBe("Something went wrong");
    expect(error.name).toBe("Error");
    expect(error.stack).toContain("Error: Something went wrong");
  });

  test("任务2: throw 语句", () => {
    function divide(a, b) {
      if (b === 0) {
        throw new Error("Division by zero");
      }
      return a / b;
    }

    expect(divide(10, 2)).toBe(5);

    expect(() => divide(10, 0)).toThrow("Division by zero");
  });

  test("任务3: try-catch", () => {
    function safeDivide(a, b) {
      try {
        return a / b;
      } catch (error) {
        return "Error: " + error.message;
      }
    }

    expect(safeDivide(10, 2)).toBe(5);
    expect(safeDivide(10, 0)).toBe("Error: Division by zero");  // Infinity 不报错
  });

  test("任务4: finally", () => {
    let cleanupCalled = false;

    try {
      throw new Error("Error");
    } catch (error) {
      // 处理错误
    } finally {
      cleanupCalled = true;
    }

    expect(cleanupCalled).toBe(true);
  });

  test("任务5: 自定义错误", () => {
    class ValidationError extends Error {
      constructor(message) {
        super(message);
        this.name = "ValidationError";
      }
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
    // TypeError
    expect(() => {
      const obj = null;
      obj.method();
    }).toThrow(TypeError);

    // ReferenceError
    expect(() => {
      const x = undefinedVar;
    }).toThrow(ReferenceError);

    // RangeError
    expect(() => {
      new Array(-1);
    }).toThrow(RangeError);

    // SyntaxError
    expect(() => {
      eval("1 + * 2");
    }).toThrow(SyntaxError);
  });

  test("任务7: 多 catch 处理", () => {
    class NetworkError extends Error {
      constructor(message) {
        super(message);
        this.name = "NetworkError";
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
    function level3() {
      throw new Error("Error in level3");
    }

    function level2() {
      level3();
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
    function validateUser(user) {
      const errors = [];

      if (!user.name || user.name.length < 3) {
        errors.push("Name must be at least 3 characters");
      }

      if (!user.email || !user.email.includes("@")) {
        errors.push("Invalid email");
      }

      if (errors.length > 0) {
        throw new ValidationError(errors.join(", "));
      }

      return true;
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
    async function retry(fn, times = 3) {
      for (let i = 0; i < times; i++) {
        try {
          return await fn();
        } catch (error) {
          if (i === times - 1) throw error;
        }
      }
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
