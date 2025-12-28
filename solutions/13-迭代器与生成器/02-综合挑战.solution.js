/**
 * 模块 13: 迭代器与生成器 - 综合挑战 (参考答案)
 */

import { test, expect, describe } from "bun:test";

describe("模块13 - 迭代器与生成器综合挑战", () => {

  test("挑战1: 异步生成器", async () => {
    async function* asyncRange(start, end) {
      for (let i = start; i <= end; i++) {
        yield Promise.resolve(i);
      }
    }

    const result = [];
    for await (const value of asyncRange(1, 3)) {
      result.push(value);
    }

    expect(result).toEqual([1, 2, 3]);
  });

  test("挑战2: 管道处理", () => {
    function* pipeline(iterable, ...transforms) {
      let result = iterable;
      for (const transform of transforms) {
        result = transform(result);
      }
      yield* result;
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
    function coroutine(generatorFn) {
      const gen = generatorFn();

      return (...args) => {
        const result = gen.next(...args);
        if (result.done) {
          return result.value;
        }
        return result.value;
      };
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
    function* zip(...iterables) {
      const iterators = iterables.map(i => i[Symbol.iterator]());
      while (true) {
        const values = iterators.map(it => it.next());
        if (values.some(v => v.done)) break;
        yield values.map(v => v.value);
      }
    }

    const a = [1, 2, 3];
    const b = ["a", "b", "c"];

    expect([...zip(a, b)]).toEqual([[1, "a"], [2, "b"], [3, "c"]]);
  });

  test("挑战5: 扁平化生成器", () => {
    function* flatten(iterable) {
      for (const item of iterable) {
        if (item?.[Symbol.iterator]) {
          yield* flatten(item);
        } else {
          yield item;
        }
      }
    }

    const nested = [1, [2, [3, [4]]]];
    expect([...flatten(nested)]).toEqual([1, 2, 3, 4]);
  });
});

console.log("🎯 模块13 - 迭代器与生成器综合挑战完成！");
