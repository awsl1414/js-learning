/**
 * 模块 15: ES2025 新特性 - 基础练习 (参考答案)
 */

import { test, expect, describe } from "bun:test";

describe("模块15 - ES2025 新特性基础练习", () => {

  test("任务1: Array.fromAsync - ES2024", async () => {
    async function* asyncNumbers() {
      yield 1;
      yield 2;
      yield 3;
    }

    const arr = await Array.fromAsync(asyncNumbers());
    expect(arr).toEqual([1, 2, 3]);
  });

  test("任务2: Object.groupBy - ES2024", () => {
    const people = [
      { name: "Alice", age: 30 },
      { name: "Bob", age: 25 },
      { name: "Charlie", age: 30 }
    ];

    const grouped = Object.groupBy(people, person => person.age);
    expect(grouped[30]).toHaveLength(2);
    expect(grouped[25]).toHaveLength(1);
  });

  test("任务3: Promise.withResolvers - ES2024", async () => {
    const { promise, resolve, reject } = Promise.withResolvers();

    resolve("success");
    expect(await promise).toBe("success");
  });

  test("任务4: String.prototype.wellFormed - ES2024", () => {
    // 检查字符串是否格式良好
    expect("hello".isWellFormed()).toBe(true);
    // 包含不匹配的代理对
    // expect("\uD800".isWellFormed()).toBe(false);
  });

  test("任务5: Atomics.waitAsync - ES2024", async () => {
    // 异步等待
    const sharedBuffer = new SharedArrayBuffer(4);
    const int32 = new Int32Array(sharedBuffer);

    async function consumer() {
      // 等待值被设置
      // await Atomics.waitAsync(int32, 0, 0, 1000);
    }

    // 概念演示
    expect(typeof Atomics.waitAsync).toBe("function");
  });

  test("任务6: 正则表达式 v 标志 - ES2024", () => {
    // unicodeSets: v 标志
    const regex = /^\p{Emoji}$/v;
    // expect(regex.test("👋")).toBe(true);
  });

  test("任务7: ArrayBuffer 转移 - ES2023", () => {
    const buffer = new ArrayBuffer(4);
    const view = new Uint8Array(buffer);
    view[0] = 1;
    view[1] = 2;

    // 转移 buffer
    // const transferred = structuredClone(buffer, { transfer: [buffer] });
    // expect(buffer.byteLength).toBe(0);  // 原buffer已空
  });

  test("任务8: Symbol 作为 WeakMap 键 - ES2023", () => {
    const weakmap = new WeakMap();
    const key = Symbol("key");

    weakmap.set(key, "value");
    expect(weakmap.get(key)).toBe("value");
  });

  test("任务9: Array.prototype.toReversed - ES2023", () => {
    const arr = [1, 2, 3, 4, 5];
    const reversed = arr.toReversed();

    expect(reversed).toEqual([5, 4, 3, 2, 1]);
    expect(arr).toEqual([1, 2, 3, 4, 5]);  // 原数组不变
  });

  test("任务10: Array.prototype.toSorted - ES2023", () => {
    const arr = [3, 1, 4, 1, 5];
    const sorted = arr.toSorted();

    expect(sorted).toEqual([1, 1, 3, 4, 5]);
    expect(arr).toEqual([3, 1, 4, 1, 5]);  // 原数组不变
  });

  test("任务11: Array.prototype.toSpliced - ES2023", () => {
    const arr = [1, 2, 3, 4, 5];
    const spliced = arr.toSpliced(2, 2, "a", "b");

    expect(spliced).toEqual([1, 2, "a", "b", 5]);
    expect(arr).toEqual([1, 2, 3, 4, 5]);  // 原数组不变
  });

  test("任务12: Array.prototype.with - ES2023", () => {
    const arr = [1, 2, 3, 4, 5];
    const updated = arr.with(2, 100);

    expect(updated).toEqual([1, 2, 100, 4, 5]);
    expect(arr).toEqual([1, 2, 3, 4, 5]);  // 原数组不变
  });

  test("任务13: findLast 和 findLastIndex - ES2023", () => {
    const arr = [1, 2, 3, 2, 1];

    expect(arr.findLast(x => x === 2)).toBe(2);
    expect(arr.findLastIndex(x => x === 2)).toBe(3);
  });

  test("任务14: Hashbang 语法 - ES2023", () => {
    // 脚本可以以 #! 开头
    // #!/usr/bin/env node
    // console.log("Hello");
  });

  test("任务15: 通过尾部逗号扩展参数", () => {
    function sum(a, b, ...rest) {
      return a + b + rest.reduce((x, y) => x + y, 0);
    }

    expect(sum(1, 2, 3, 4, 5)).toBe(15);
  });

  // 综合练习
  test("综合题1: 使用新特性处理数据", () => {
    const users = [
      { name: "Alice", age: 30, role: "admin" },
      { name: "Bob", age: 25, role: "user" },
      { name: "Charlie", age: 30, role: "user" }
    ];

    // 使用 toSorted 不修改原数组
    const byAge = users.toSorted((a, b) => a.age - b.age);
    expect(byAge[0].name).toBe("Bob");

    // 使用 toSpliced 不修改原数组
    const firstTwo = users.toSpliced(2);
    expect(firstTwo).toHaveLength(2);
    expect(users).toHaveLength(3);
  });

  test("综合题2: 使用 Promise.withResolvers", async () => {
    async function fetchWithTimeout(url, timeout = 1000) {
      const { promise, resolve } = Promise.withResolvers();

      const timer = setTimeout(() => {
        resolve({ timeout: true });
      }, timeout);

      try {
        // 模拟 fetch
        resolve({ data: "response" });
        clearTimeout(timer);
      } catch (error) {
        resolve({ error });
      }

      return promise;
    }

    const result = await fetchWithTimeout("/api");
    expect(result).toBeDefined();
  });

  test("综合题3: 使用 Object.groupBy", () => {
    const products = [
      { name: "Apple", category: "Fruit", price: 1.5 },
      { name: "Banana", category: "Fruit", price: 1 },
      { name: "Carrot", category: "Vegetable", price: 2 }
    ];

    const byCategory = Object.groupBy(products, p => p.category);
    expect(byCategory.Fruit).toHaveLength(2);
    expect(byCategory.Vegetable).toHaveLength(1);
  });
});

console.log("🎯 模块15 - ES2025 新特性基础练习完成！");
