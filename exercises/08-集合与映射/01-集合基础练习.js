/**
 * 模块 08: 集合与映射 - 基础练习
 *
 * 学习目标:
 * - 掌握 Set 和 WeakSet
 * - 掌握 Map 和 WeakMap
 * - 理解集合和映射的区别
 * - 熟练使用相关方法
 *
 * 提示: 遇到困难时可以查看 solutions/08-集合与映射/01-集合基础练习.solution.js
 */

import { test, expect, describe } from "bun:test";

describe("模块08 - 集合与映射基础练习", () => {

  test("任务1: Set 基础", () => {
    const set = new Set();

    // TODO: 使用 add 方法添加元素
    set.add(1);
    set.add(2);
    set.add(???);  // 添加 3

    // Set 自动去重
    set.add(1);
    expect(set.size).toBe(3);

    // TODO: 使用 has 方法检查元素
    expect(set.has(2)).toBe(???);
    expect(set.has(10)).toBe(false);

    // TODO: 使用 delete 方法删除元素
    set.delete(2);
    expect(set.has(2)).toBe(???);
    expect(set.size).toBe(2);

    // TODO: 使用 clear 方法清空 Set
    set.clear();
    expect(set.size).toBe(???);
  });

  test("任务2: Set 初始化", () => {
    // TODO: 从数组创建 Set（会自动去重）
    const set1 = new Set([1, 2, 3, 2, 1]);
    expect(set1.size).toBe(???);

    // TODO: 从字符串创建 Set
    const set2 = new Set("hello");
    expect(set2.size).toBe(4);  // h, e, l, o

    // TODO: 从另一个 Set 创建
    const set3 = new Set(???);
    expect(set3.size).toBe(3);
  });

  test("任务3: Set 迭代", () => {
    const set = new Set([1, 2, 3]);

    // TODO: 使用 for...of 遍历
    const values = [];
    for (const value of set) {
      values.push(value);
    }
    expect(values).toEqual([1, 2, 3]);

    // TODO: 使用 forEach 遍历
    const values2 = [];
    set.forEach(value => values2.push(value));
    expect(values2).toEqual([???]);

    // TODO: 使用 keys, values, entries
    expect([...set.keys()]).toEqual([1, 2, 3]);
    expect([...set.values()]).toEqual([???]);
    expect([...set.entries()]).toEqual([[1, 1], [2, 2], [3, 3]]);
  });

  test("任务4: Set 转数组", () => {
    const set = new Set([1, 2, 3]);

    // TODO: 使用展开运算符
    expect([...set]).toEqual([???]);

    // TODO: 使用 Array.from
    expect(Array.from(set)).toEqual([1, 2, 3]);
  });

  test("任务5: Set 去重", () => {
    const arr = [1, 2, 2, 3, 3, 3];
    // TODO: 使用 Set 去重
    const unique = [...new Set(arr)];
    expect(unique).toEqual([???]);
  });

  test("任务6: Map 基础", () => {
    const map = new Map();

    // TODO: 使用 set 方法添加键值对
    map.set("name", "Alice");
    map.set(???, 30);  // 添加 age: 30
    map.set(1, "one");

    // TODO: 使用 get 方法获取值
    expect(map.get("name")).toBe("Alice");
    expect(map.get("missing")).toBeUndefined();

    // TODO: 使用 has 方法检查键
    expect(map.has("age")).toBe(???);
    expect(map.has("missing")).toBe(false);

    // TODO: 使用 delete 方法删除
    map.delete("age");
    expect(map.has("age")).toBe(false);

    // TODO: 使用 size 属性
    expect(map.size).toBe(???);
  });

  test("任务7: Map 初始化", () => {
    // TODO: 从数组创建 Map
    const map1 = new Map([
      ["name", "Alice"],
      ["age", ???]  // 添加 age: 30
    ]);
    expect(map1.get("name")).toBe("Alice");

    // TODO: 从对象创建 Map
    const obj = { a: 1, b: 2 };
    const map2 = new Map(???);
    expect(map2.get("a")).toBe(1);
  });

  test("任务8: Map 迭代", () => {
    const map = new Map([
      ["a", 1],
      ["b", 2],
      ["c", 3]
    ]);

    // TODO: 使用 for...of 遍历
    const keys = [];
    const values = [];
    for (const [key, value] of map) {
      keys.push(key);
      values.push(value);
    }
    expect(keys).toEqual(["a", "b", "c"]);
    expect(values).toEqual([???]);

    // TODO: 使用 keys, values, entries
    expect([...map.keys()]).toEqual(["a", "b", "c"]);
    expect([...map.values()]).toEqual([1, 2, 3]);
  });

  test("任务9: Map 转对象", () => {
    const map = new Map([
      ["a", 1],
      ["b", 2]
    ]);

    // TODO: 使用 Object.fromEntries 转换
    const obj = Object.fromEntries(???);
    expect(obj).toEqual({ a: 1, b: 2 });
  });

  test("任务10: WeakSet", () => {
    const weakset = new WeakSet();

    const obj1 = { id: 1 };
    const obj2 = { id: 2 };

    // TODO: 添加对象到 WeakSet
    weakset.add(obj1);
    weakset.add(???);

    expect(weakset.has(obj1)).toBe(true);

    weakset.delete(obj1);
    expect(weakset.has(obj1)).toBe(???);

    // WeakSet 只能是对象
    // weakset.add(1);  // TypeError
  });

  test("任务11: WeakMap", () => {
    const weakmap = new WeakMap();

    const key1 = { id: 1 };
    const key2 = { id: 2 };

    // TODO: 使用 WeakMap 存储数据
    weakmap.set(key1, "value1");
    weakmap.set(???);

    expect(weakmap.get(key1)).toBe("value1");

    weakmap.delete(key1);
    expect(weakmap.has(key1)).toBe(???);
  });

  test("任务12: Set 操作", () => {
    const setA = new Set([1, 2, 3]);
    const setB = new Set([3, 4, 5]);

    // TODO: 实现并集
    const union = new Set([...setA, ...setB]);
    expect([...union]).toEqual([1, 2, 3, 4, 5]);

    // TODO: 实现交集
    const intersection = new Set([...setA].filter(x => setB.has(x)));
    expect([...intersection]).toEqual([???]);

    // TODO: 实现差集
    const difference = new Set([...setA].filter(x => !setB.has(x)));
    expect([...difference]).toEqual([1, 2]);
  });

  test("任务13: Map 合并", () => {
    const map1 = new Map([["a", 1], ["b", 2]]);
    const map2 = new Map([["b", 20], ["c", 3]]);

    // TODO: 合并两个 Map
    const merged = new Map([...map1, ...map2]);
    expect(merged.get("a")).toBe(1);
    expect(merged.get("b")).toBe(20);  // map2 覆盖
    expect(merged.get("c")).toBe(???);
  });

  test("任务14: Set 实用方法", () => {
    const set = new Set([1, 2, 3]);

    // TODO: 检查子集
    const isSubset = (setA, setB) => [...setA].every(x => setB.has(x));
    expect(isSubset(new Set([1, 2]), set)).toBe(???);

    // TODO: 检查超集
    const isSuperset = (setA, setB) => [...setB].every(x => setA.has(x));
    expect(isSuperset(set, new Set([1, 2]))).toBe(true);
  });

  test("任务15: Map 过滤", () => {
    const map = new Map([
      ["a", 1],
      ["b", 2],
      ["c", 3],
      ["d", 4]
    ]);

    // TODO: 过滤出值为偶数的项
    const filtered = new Map([...map].filter(([k, v]) => v % 2 === 0));
    expect([...filtered.keys()]).toEqual([???]);
  });

  // 综合练习
  test("综合题1: 使用 Map 统计词频", () => {
    function wordFrequency(text) {
      const words = text.toLowerCase().split(/\W+/);
      const freq = new Map();

      for (const word of words) {
        if (word) {
          freq.set(word, (freq.get(word) || 0) + 1);
        }
      }

      return freq;
    }

    const freq = wordFrequency("hello world hello");
    expect(freq.get("hello")).toBe(???);
    expect(freq.get("world")).toBe(1);
  });

  test("综合题2: 使用 Set 去重对象数组", () => {
    const users = [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
      { id: 1, name: "Alice" }
    ];

    const unique = (arr, key) => {
      const seen = new Set();
      return arr.filter(item => {
        const k = item[key];
        if (seen.has(k)) return false;
        seen.add(k);
        return true;
      });
    };

    expect(unique(users, "id")).toHaveLength(???);
  });

  test("综合题3: 缓存实现", () => {
    class Cache {
      constructor() {
        this.cache = new Map();
      }

      set(key, value, ttl = 60000) {
        this.cache.set(key, {
          value,
          expires: Date.now() + ttl
        });
      }

      get(key) {
        const item = this.cache.get(key);
        if (!item) return undefined;

        if (Date.now() > item.expires) {
          this.cache.delete(key);
          return undefined;
        }

        return item.value;
      }
    }

    const cache = new Cache();
    cache.set("key", "value", 1000);

    expect(cache.get("key")).toBe(???);
  });
});

console.log("🎯 模块08 - 集合与映射基础练习完成！");
