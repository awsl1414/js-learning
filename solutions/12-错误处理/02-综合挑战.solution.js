/**
 * 模块 12: 错误处理 - 综合挑战 (参考答案)
 */

import { test, expect, describe } from "bun:test";

describe("模块12 - 错误处理综合挑战", () => {

  test("挑战1: 全局错误处理", () => {
    // 模拟全局错误处理
    class ErrorHandler {
      constructor() {
        this.handlers = [];
      }

      register(fn) {
        this.handlers.push(fn);
      }

      handle(error) {
        for (const handler of this.handlers) {
          handler(error);
        }
      }
    }

    const handler = new ErrorHandler();
    let logged = [];

    handler.register((err) => logged.push(`ERROR: ${err.message}`));

    handler.handle(new Error("Test error"));
    expect(logged).toContain("ERROR: Test error");
  });

  test("挑战2: 错误包装", () => {
    class WrappedError extends Error {
      constructor(message, cause) {
        super(message);
        this.name = "WrappedError";
        this.cause = cause;
      }
    }

    function parseConfig(json) {
      try {
        return JSON.parse(json);
      } catch (error) {
        throw new WrappedError("Failed to parse config", error);
      }
    }

    expect(() => parseConfig("invalid json")).toThrow(WrappedError);
  });

  test("挑战3: 断言库", () => {
    class AssertionError extends Error {
      constructor(message) {
        super(message);
        this.name = "AssertionError";
      }
    }

    function assert(condition, message) {
      if (!condition) {
        throw new AssertionError(message || "Assertion failed");
      }
    }

    expect(() => assert(false, "Should be true")).toThrow(AssertionError);
    expect(assert(true, "Should be true")).toBe(undefined);
  });

  test("挑战4: 结果类型 (Result Type)", () => {
    class Result {
      static ok(value) {
        return new Ok(value);
      }

      static err(error) {
        return new Err(error);
      }
    }

    class Ok extends Result {
      constructor(value) {
        super();
        this.value = value;
        this.isOk = true;
        this.isErr = false;
      }

      map(fn) {
        return Result.ok(fn(this.value));
      }
    }

    class Err extends Result {
      constructor(error) {
        super();
        this.error = error;
        this.isOk = false;
        this.isErr = true;
      }

      map(fn) {
        return this;
      }
    }

    const divide = (a, b) => {
      if (b === 0) {
        return Result.err(new Error("Division by zero"));
      }
      return Result.ok(a / b);
    };

    const result = divide(10, 2);
    expect(result.isOk).toBe(true);
    expect(result.value).toBe(5);

    const errorResult = divide(10, 0);
    expect(errorResult.isErr).toBe(true);
  });

  test("挑战5: 超时错误", async () => {
    class TimeoutError extends Error {
      constructor(message) {
        super(message);
        this.name = "TimeoutError";
      }
    }

    async function withTimeout(promise, ms) {
      const timeout = new Promise((_, reject) => {
        setTimeout(() => reject(new TimeoutError(`Timeout after ${ms}ms`)), ms);
      });

      return Promise.race([promise, timeout]);
    }

    const slow = new Promise(resolve => setTimeout(() => resolve("done"), 100));

    await expect(withTimeout(slow, 50)).rejects.toThrow(TimeoutError);
  });
});

console.log("🎯 模块12 - 错误处理综合挑战完成！");
