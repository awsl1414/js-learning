/**
 * 模块 12: 错误处理 - 综合挑战
 */

import { test, expect, describe } from "bun:test";

describe("模块12 - 错误处理综合挑战", () => {

  test("挑战1: 全局错误处理", () => {
    // TODO: 实现全局错误处理器
    class ErrorHandler {
      constructor() {
        // ???
      }

      register(fn) {
        // ???
      }

      handle(error) {
        // ???
      }
    }

    const handler = new ErrorHandler();
    let logged = [];

    handler.register((err) => logged.push(`ERROR: ${err.message}`));

    handler.handle(new Error("Test error"));
    expect(logged).toContain("ERROR: Test error");
  });

  test("挑战2: 错误包装", () => {
    // TODO: 实现错误包装，保留原始错误
    class WrappedError extends Error {
      constructor(message, cause) {
        // ???
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
    // TODO: 实现简单的断言函数
    class AssertionError extends Error {
      constructor(message) {
        // ???
      }
    }

    function assert(condition, message) {
      // ???
    }

    expect(() => assert(false, "Should be true")).toThrow(AssertionError);
    expect(assert(true, "Should be true")).toBe(undefined);
  });

  test("挑战4: 结果类型 (Result Type)", () => {
    // TODO: 实现 Result 类型用于错误处理
    class Result {
      static ok(value) {
        // ???
      }

      static err(error) {
        // ???
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
    // TODO: 实现带超时的 Promise 包装
    class TimeoutError extends Error {
      constructor(message) {
        // ???
      }
    }

    async function withTimeout(promise, ms) {
      // ???
    }

    const slow = new Promise(resolve => setTimeout(() => resolve("done"), 100));

    await expect(withTimeout(slow, 50)).rejects.toThrow(TimeoutError);
  });
});

console.log("🎯 模块12 - 错误处理综合挑战完成！");
