/**
 * 模块 13: 迭代器与生成器 - 基础练习 (参考答案)
 */

import { test, expect, describe } from "bun:test";

describe("模块13 - 迭代器与生成器基础练习", () => {

  test("任务1: Symbol.iterator", () => {
    const iterable = {
      data: [1, 2, 3],
      [Symbol.iterator]() {
        let index = 0;
        const data = this.data;

        return {
          next() {
            if (index < data.length) {
              return { value: data[index++], done: false };
            }
            return { done: true };
          }
        };
      }
    };

    expect([...iterable]).toEqual([1, 2, 3]);
  });

  test("任务2: 生成器函数", () => {
    function* generateNumbers() {
      yield 1;
      yield 2;
      yield 3;
    }

    const gen = generateNumbers();
    expect(gen.next()).toEqual({ value: 1, done: false });
    expect(gen.next()).toEqual({ value: 2, done: false });
    expect(gen.next()).toEqual({ value: 3, done: false });
    expect(gen.next()).toEqual({ done: true });
  });

  test("任务3: 生成器与 for...of", () => {
    function* range(start, end) {
      for (let i = start; i <= end; i++) {
        yield i;
      }
    }

    const values = [...range(1, 5)];
    expect(values).toEqual([1, 2, 3, 4, 5]);
  });

  test("任务4: yield* 委托", () => {
    function* inner() {
      yield 1;
      yield 2;
    }

    function* outer() {
      yield* inner();
      yield 3;
    }

    expect([...outer()]).toEqual([1, 2, 3]);
  });

  test("任务5: 生成器传参", () => {
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
    function* fibonacci() {
      let [prev, curr] = [0, 1];
      while (true) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
      }
    }

    const gen = fibonacci();
    expect(gen.next().value).toBe(1);
    expect(gen.next().value).toBe(1);
    expect(gen.next().value).toBe(2);
    expect(gen.next().value).toBe(3);
    expect(gen.next().value).toBe(5);
  });

  test("任务8: 迭代器工具", () => {
    function* take(iterable, n) {
      let i = 0;
      for (const item of iterable) {
        if (i >= n) break;
        yield item;
        i++;
      }
    }

    function* map(iterable, fn) {
      for (const item of iterable) {
        yield fn(item);
      }
    }

    function* filter(iterable, predicate) {
      for (const item of iterable) {
        if (predicate(item)) {
          yield item;
        }
      }
    }

    const numbers = [1, 2, 3, 4, 5];

    expect([...take(numbers, 3)]).toEqual([1, 2, 3]);
    expect([...map(numbers, x => x * 2)]).toEqual([2, 4, 6, 8, 10]);
    expect([...filter(numbers, x => x % 2 === 0)]).toEqual([2, 4]);
  });

  // 综合练习
  test("综合题1: 树遍历", () => {
    function* traverseTree(node) {
      yield node.value;
      if (node.children) {
        for (const child of node.children) {
          yield* traverseTree(child);
        }
      }
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
    function* naturals() {
      let i = 1;
      while (true) {
        yield i++;
      }
    }

    function* takeWhile(iterable, predicate) {
      for (const item of iterable) {
        if (!predicate(item)) break;
        yield item;
      }
    }

    const result = [...takeWhile(naturals(), n => n <= 5)];
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });
});

console.log("🎯 模块13 - 迭代器与生成器基础练习完成！");
