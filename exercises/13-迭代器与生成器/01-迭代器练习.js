/**
 * 模块 13: 迭代器与生成器 - 基础练习
 *
 * 学习目标:
 * - 理解迭代器协议
 * - 掌握生成器函数
 * - 熟练使用 yield
 * - 理解迭代器工具
 */

import { test, expect, describe } from "bun:test";

describe("模块13 - 迭代器与生成器基础练习", () => {

  test("任务1: Symbol.iterator", () => {
    // TODO: 实现自定义迭代器
    const iterable = {
      data: [1, 2, 3],
      [Symbol.iterator]() {
        // 返回一个对象，包含 next 方法
        // ???
      }
    };

    expect([...iterable]).toEqual([1, 2, 3]);
  });

  test("任务2: 生成器函数", () => {
    // TODO: 创建生成器函数 generateNumbers
    function* generateNumbers() {
      // 使用 yield 生成值
      // ???
    }

    const gen = generateNumbers();
    expect(gen.next()).toEqual({ value: 1, done: false });
    expect(gen.next()).toEqual({ value: 2, done: false });
    expect(gen.next()).toEqual({ value: 3, done: false });
    expect(gen.next()).toEqual({ done: true });
  });

  test("任务3: 生成器与 for...of", () => {
    // TODO: 实现 range 生成器
    function* range(start, end) {
      // ???
    }

    const values = [...range(1, 5)];
    expect(values).toEqual([1, 2, 3, 4, 5]);
  });

  test("任务4: yield* 委托", () => {
    // TODO: 使用 yield* 委托给其他生成器
    function* inner() {
      yield 1;
      yield 2;
    }

    function* outer() {
      // 使用 yield* 委托给 inner
      // ???
      yield 3;
    }

    expect([...outer()]).toEqual([1, 2, 3]);
  });

  test("任务5: 生成器传参", () => {
    // TODO: 实现双向通信的生成器
    function* echo() {
      const a = yield;
      const b = yield;
      yield a + b;
    }

    const gen = echo();
    gen.next();
    gen.next(10);
    expect(gen.next(20).value).toBe(30);
  });

  test("任务6: 生成器返回值", () => {
    // TODO: 使用 return 返回生成器的最终值
    function* generator() {
      yield 1;
      yield 2;
      return "done";
    }

    const gen = generator();
    gen.next();
    gen.next();
    expect(gen.next()).toEqual({ value: "done", done: true });
  });

  test("任务7: 无限生成器", () => {
    // TODO: 实现斐波那契数列生成器
    function* fibonacci() {
      // ???
    }

    const gen = fibonacci();
    expect(gen.next().value).toBe(1);
    expect(gen.next().value).toBe(1);
    expect(gen.next().value).toBe(2);
    expect(gen.next().value).toBe(3);
    expect(gen.next().value).toBe(5);
  });

  test("任务8: 迭代器工具", () => {
    // TODO: 实现常见的迭代器工具函数
    function* take(iterable, n) {
      // 只取前 n 个元素
      // ???
    }

    function* map(iterable, fn) {
      // 对每个元素应用 fn
      // ???
    }

    function* filter(iterable, predicate) {
      // 过滤满足条件的元素
      // ???
    }

    const numbers = [1, 2, 3, 4, 5];

    expect([...take(numbers, 3)]).toEqual([1, 2, 3]);
    expect([...map(numbers, x => x * 2)]).toEqual([2, 4, 6, 8, 10]);
    expect([...filter(numbers, x => x % 2 === 0)]).toEqual([2, 4]);
  });

  // 综合练习
  test("综合题1: 树遍历", () => {
    // TODO: 实现树的深度优先遍历
    function* traverseTree(node) {
      // ???
    }

    const tree = {
      value: 1,
      children: [
        { value: 2, children: [{ value: 4 }, { value: 5 }] },
        { value: 3, children: [{ value: 6 }] }
      ]
    };

    expect([...traverseTree(tree)]).toEqual([1, 2, 4, 5, 3, 6]);
  });

  test("综合题2: 惰性序列", () => {
    // TODO: 实现惰性序列
    function* naturals() {
      // 生成无限自然数序列
      // ???
    }

    function* takeWhile(iterable, predicate) {
      // 取到不满足条件为止
      // ???
    }

    const result = [...takeWhile(naturals(), n => n <= 5)];
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });
});

console.log("🎯 模块13 - 迭代器与生成器基础练习完成！");
