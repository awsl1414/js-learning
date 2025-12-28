/**
 * 模块 13: 迭代器与生成器 - 综合挑战
 */

import { test, expect, describe } from "bun:test";

describe("模块13 - 迭代器与生成器综合挑战", () => {

  test("挑战1: 异步生成器", async () => {
    // TODO: 实现异步生成器
    async function* asyncRange(start, end) {
      // ???
    }

    const result = [];
    for await (const value of asyncRange(1, 3)) {
      result.push(value);
    }

    expect(result).toEqual([1, 2, 3]);
  });

  test("挑战2: 管道处理", () => {
    // TODO: 实现数据处理管道
    function* pipeline(iterable, ...transforms) {
      // ???
    }

    const map = (fn) => function* (iterable) {
      for (const item of iterable) {
        yield fn(item);
      }
    };

    const filter = (predicate) => function* (iterable) {
      for (const item of iterable) {
        if (predicate(item)) {
          yield item;
        }
      }
    };

    const numbers = [1, 2, 3, 4, 5];
    const result = [...pipeline(numbers, map(x => x * 2), filter(x => x > 4))];

    expect(result).toEqual([6, 8, 10]);
  });

  test("挑战3: 协程实现", () => {
    // TODO: 实现协程函数
    function coroutine(generatorFn) {
      // ???
    }

    function* processNumbers() {
      let sum = 0;
      while (true) {
        const num = yield sum;
        sum += num;
      }
    }

    const proc = coroutine(processNumbers);
    expect(proc(10)).toBe(10);
    expect(proc(20)).toBe(30);
    expect(proc(30)).toBe(60);
  });

  test("挑战4: 组合生成器", () => {
    // TODO: 实现 zip 函数，组合多个可迭代对象
    function* zip(...iterables) {
      // ???
    }

    const a = [1, 2, 3];
    const b = ["a", "b", "c"];

    expect([...zip(a, b)]).toEqual([[1, "a"], [2, "b"], [3, "c"]]);
  });

  test("挑战5: 扁平化生成器", () => {
    // TODO: 实现深度扁平化
    function* flatten(iterable) {
      // ???
    }

    const nested = [1, [2, [3, [4]]]];
    expect([...flatten(nested)]).toEqual([1, 2, 3, 4]);
  });
});

console.log("🎯 模块13 - 迭代器与生成器综合挑战完成！");
