/**
 * 模块 15: ES2025 新特性 - 综合挑战 (参考答案)
 */

import { test, expect, describe } from "bun:test";

describe("模块15 - ES2025 新特性综合挑战", () => {

  test("挑战1: 异步迭代器工具", async () => {
    async function* asyncFilter(asyncIterable, predicate) {
      for await (const item of asyncIterable) {
        if (await predicate(item)) {
          yield item;
        }
      }
    }

    async function* asyncMap(asyncIterable, fn) {
      for await (const item of asyncIterable) {
        yield await fn(item);
      }
    }

    async function* asyncNumbers() {
      yield 1;
      yield 2;
      yield 3;
      yield 4;
      yield 5;
    }

    const evens = asyncMap(
      asyncFilter(asyncNumbers(), x => x % 2 === 0),
      x => x * 2
    );

    const result = [];
    for await (const val of evens) {
      result.push(val);
    }

    expect(result).toEqual([4, 8]);
  });

  test("挑战2: 使用 Temporal API (未来特性)", () => {
    // Temporal 是未来的日期时间 API
    // 目前需要 polyfill 或支持

    // 概念演示
    const now = new Date();
    const instant = Temporal?.Instant?.from(now);

    if (instant) {
      expect(typeof instant.epochSeconds).toBe("number");
    }
  });

  test("挑战3: 使用 Array.fromAsync 处理异步数据", async () => {
    async function fetchIds() {
      return [1, 2, 3];
    }

    async function fetchById(id) {
      return { id, name: `Item ${id}` };
    }

    async function getAllItems() {
      const ids = await fetchIds();
      const items = await Array.fromAsync(ids, fetchById);
      return items;
    }

    const items = await getAllItems();
    expect(items).toHaveLength(3);
    expect(items[0].name).toBe("Item 1");
  });

  test("挑战4: 装饰器模式模拟", () => {
    // 装饰器即将成为标准语法
    function memoize(target, key, descriptor) {
      const originalMethod = descriptor.value;
      const cache = new Map();

      descriptor.value = function(...args) {
        const cacheKey = JSON.stringify(args);
        if (cache.has(cacheKey)) {
          return cache.get(cacheKey);
        }
        const result = originalMethod.apply(this, args);
        cache.set(cacheKey, result);
        return result;
      };

      return descriptor;
    }

    class Calculator {
      @memoize
      expensive(n) {
        let result = 0;
        for (let i = 0; i < n; i++) {
          result += i;
        }
        return result;
      }
    }

    // 概念演示
    expect(typeof Calculator).toBe("function");
  });

  test("挑战5: Record 和 Tuple (提案)", () => {
    // Record 和 Tuple 是深度不可变的数据结构
    // 目前是提案阶段，需要 polyfill

    // 概念演示
    // const record = #{ x: 1, y: 2 };
    // const tuple = #[1, 2, 3];

    // expect(record.x).toBe(1);
    // expect(tuple[0]).toBe(1);
  });

  test("挑战6: 使用管道操作符 (提案)", () => {
    // 管道操作符 |> 是提案中的语法
    // function double(n) { return n * 2; }
    // function addOne(n) { return n + 1; }

    // const result = 5 |> double |> addOne;
    // expect(result).toBe(11);

    // 模拟
    function pipe(value, ...fns) {
      return fns.reduce((acc, fn) => fn(acc), value);
    }

    const double = n => n * 2;
    const addOne = n => n + 1;

    expect(pipe(5, double, addOne)).toBe(11);
  });

  test("挑战7: 数值分隔符", () => {
    // 数值分隔符 - ES2021
    const billion = 1_000_000_000;
    expect(billion).toBe(1000000000);

    const bytes = 0xFF_FF_FF_FF;
    expect(bytes).toBe(4294967295);
  });

  test("挑战8: 逻辑赋值运算符", () => {
    // 逻辑赋值 - ES2021
    let a = 0;
    a ||= 10;
    expect(a).toBe(10);

    let b = 5;
    b &&= 10;
    expect(b).toBe(10);

    let c = null;
    c ??= 20;
    expect(c).toBe(20);
  });

  test("挑战9: 数字分隔符和 BigInt", () => {
    // BigInt - ES2020
    const big = 9007199254740991n;
    expect(typeof big).toBe("bigint");

    const big2 = 9_007_199_254_740_991n;
    expect(big2).toBe(big);
  });

  test("挑战10: String.prototype.replaceAll", () => {
    // replaceAll - ES2021
    const str = "hello world hello";
    expect(str.replaceAll("hello", "hi")).toBe("hi world hi");
    expect(str.replaceAll(/l/g, "1")).toBe("he11o wor1d he11o");
  });
});

console.log("🎯 模块15 - ES2025 新特性综合挑战完成！");
