/**
 * 模块 05: 数组操作 - 综合挑战
 *
 * 参考答案
 */

import { test, expect, describe } from "bun:test";

describe("模块05 - 数组综合挑战 (参考答案)", () => {

  test("挑战1: 实现数组工具库", () => {
    const ArrayTools = {
      flattenDeep(arr) {
        return arr.flat(Infinity);
      },

      flattenDepth(arr, depth) {
        return arr.flat(depth);
      },

      union(...arrays) {
        return [...new Set(arrays.flat())];
      },

      difference(arr, ...values) {
        const exclude = values.flat();
        return arr.filter(x => !exclude.includes(x));
      },

      intersection(...arrays) {
        return arrays[0].filter(x =>
          arrays.every(arr => arr.includes(x))
        );
      },

      xor(...arrays) {
        const frequency = {};
        for (const arr of arrays) {
          for (const item of arr) {
            frequency[item] = (frequency[item] || 0) + 1;
          }
        }
        return Object.keys(frequency)
          .filter(key => frequency[key] === 1)
          .map(Number);
      },

      groupBy(arr, fn) {
        return arr.reduce((acc, item) => {
          const key = fn(item);
          (acc[key] = acc[key] || []).push(item);
          return acc;
        }, {});
      },

      chunk(arr, size) {
        const chunks = [];
        for (let i = 0; i < arr.length; i += size) {
          chunks.push(arr.slice(i, i + size));
        }
        return chunks;
      },

      sample(arr, n) {
        const shuffled = [...arr].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, Math.min(n, arr.length));
      },

      shuffle(arr) {
        const copy = [...arr];
        for (let i = copy.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
      }
    };

    expect(ArrayTools.flattenDeep([1, [2, [3, [4]]]])).toEqual([1, 2, 3, 4]);
    expect(ArrayTools.union([1, 2], [2, 3], [3, 4])).toEqual([1, 2, 3, 4]);
    expect(ArrayTools.intersection([1, 2, 3], [2, 3, 4], [3, 4, 5])).toEqual([3]);
    expect(ArrayTools.xor([1, 2], [2, 3])).toEqual([1, 3]);

    const users = [
      { name: "Alice", age: 30 },
      { name: "Bob", age: 25 },
      { name: "Charlie", age: 30 }
    ];
    const grouped = ArrayTools.groupBy(users, u => u.age);
    expect(grouped[30]).toHaveLength(2);

    const sampled = ArrayTools.sample([1, 2, 3, 4, 5], 3);
    expect(sampled).toHaveLength(3);
  });

  test("挑战2: 响应式数组", () => {
    class ReactiveArray {
      constructor(initial = []) {
        this.array = [...initial];
        this.listeners = [];
      }

      subscribe(listener) {
        this.listeners.push(listener);
        return () => {
          this.listeners = this.listeners.filter(l => l !== listener);
        };
      }

      notify() {
        for (const listener of this.listeners) {
          listener([...this.array]);
        }
      }

      push(...items) {
        this.array.push(...items);
        this.notify();
        return this.array.length;
      }

      pop() {
        const item = this.array.pop();
        this.notify();
        return item;
      }

      shift() {
        const item = this.array.shift();
        this.notify();
        return item;
      }

      unshift(...items) {
        const length = this.array.unshift(...items);
        this.notify();
        return length;
      }

      splice(start, deleteCount, ...items) {
        const removed = this.array.splice(start, deleteCount, ...items);
        this.notify();
        return removed;
      }

      get() {
        return [...this.array];
      }
    }

    const reactive = new ReactiveArray([1, 2, 3]);
    let results = [];

    reactive.subscribe(arr => results.push([...arr]));

    reactive.push(4);
    reactive.push(5);
    reactive.shift();

    expect(results).toEqual([
      [1, 2, 3, 4],
      [1, 2, 3, 4, 5],
      [2, 3, 4, 5]
    ]);
  });

  test("挑战3: 二维数组工具", () => {
    const Matrix2D = {
      transpose(matrix) {
        return matrix[0].map((_, i) => matrix.map(row => row[i]));
      },

      rotate(matrix, times = 1) {
        let result = matrix;
        for (let i = 0; i < times; i++) {
          result = this.transpose(result).map(row => row.reverse());
        }
        return result;
      },

      getRow(matrix, index) {
        return matrix[index] || [];
      },

      getColumn(matrix, index) {
        return matrix.map(row => row[index] ?? undefined);
      },

      getDiagonal(matrix) {
        return matrix.map((row, i) => row[i]);
      },

      getAntiDiagonal(matrix) {
        return matrix.map((row, i) => row[row.length - 1 - i]);
      }
    };

    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ];

    expect(Matrix2D.transpose(matrix)).toEqual([
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9]
    ]);

    expect(Matrix2D.getColumn(matrix, 1)).toEqual([2, 5, 8]);
    expect(Matrix2D.getDiagonal(matrix)).toEqual([1, 5, 9]);
  });

  test("挑战4: 数组查询语言", () => {
    class ArrayQuery {
      constructor(data) {
        this.data = data;
        this.filters = [];
        this.sorts = [];
        this.limitCount = null;
        this.skipCount = 0;
      }

      where(predicate) {
        this.filters.push(predicate);
        return this;
      }

      orderBy(fn, direction = "asc") {
        this.sorts.push({ fn, direction });
        return this;
      }

      take(n) {
        this.limitCount = n;
        return this;
      }

      skip(n) {
        this.skipCount = n;
        return this;
      }

      execute() {
        let result = [...this.data];

        for (const filter of this.filters) {
          result = result.filter(filter);
        }

        for (const sort of this.sorts) {
          result.sort((a, b) => {
            const av = sort.fn(a);
            const bv = sort.fn(b);
            return sort.direction === "asc"
              ? av > bv ? 1 : av < bv ? -1 : 0
              : av < bv ? 1 : av > bv ? -1 : 0;
          });
        }

        result = result.slice(this.skipCount);

        if (this.limitCount) {
          result = result.slice(0, this.limitCount);
        }

        return result;
      }

      first() {
        return this.execute()[0];
      }

      last() {
        const results = this.execute();
        return results[results.length - 1];
      }
    }

    const users = [
      { name: "Alice", age: 30, active: true },
      { name: "Bob", age: 25, active: false },
      { name: "Charlie", age: 35, active: true },
      { name: "David", age: 28, active: true }
    ];

    const query = new ArrayQuery(users);

    const result = query
      .where(u => u.active)
      .orderBy(u => u.age)
      .take(2)
      .execute();

    expect(result).toHaveLength(2);
    expect(result[0].name).toBe("David");
  });

  test("挑战5: LRU 缓存实现", () => {
    class LRUCache {
      constructor(capacity) {
        this.capacity = capacity;
        this.cache = [];
      }

      get(key) {
        const index = this.cache.findIndex(item => item.key === key);
        if (index === -1) return undefined;

        const [item] = this.cache.splice(index, 1);
        this.cache.unshift(item);
        return item.value;
      }

      set(key, value) {
        const index = this.cache.findIndex(item => item.key === key);

        if (index !== -1) {
          this.cache.splice(index, 1);
        } else if (this.cache.length >= this.capacity) {
          this.cache.pop();
        }

        this.cache.unshift({ key, value });
      }

      has(key) {
        return this.cache.some(item => item.key === key);
      }

      clear() {
        this.cache = [];
      }

      size() {
        return this.cache.length;
      }
    }

    const cache = new LRUCache(3);

    cache.set("a", 1);
    cache.set("b", 2);
    cache.set("c", 3);

    expect(cache.get("a")).toBe(1);
    expect(cache.size()).toBe(3);

    cache.set("d", 4);

    expect(cache.has("b")).toBe(false);
    expect(cache.has("d")).toBe(true);
  });

  test("挑战6: 自定义迭代器", () => {
    class ArrayIterator {
      constructor(array) {
        this.array = array;
        this.index = 0;
      }

      next() {
        if (this.index < this.array.length) {
          return {
            value: this.array[this.index++],
            done: false
          };
        }
        return { done: true };
      }

      [Symbol.iterator]() {
        return this;
      }
    }

    const arr = [1, 2, 3];
    const iterator = new ArrayIterator(arr);

    expect(iterator.next()).toEqual({ value: 1, done: false });
    expect(iterator.next()).toEqual({ value: 2, done: false });
    expect(iterator.next()).toEqual({ value: 3, done: false });
    expect(iterator.next()).toEqual({ done: true });

    const iterator2 = new ArrayIterator([1, 2, 3]);
    const values = [];
    for (const value of iterator2) {
      values.push(value);
    }
    expect(values).toEqual([1, 2, 3]);
  });

  test("挑战7: 数组操作性能追踪", () => {
    class TrackedArray {
      constructor(initial = []) {
        this.array = [...initial];
        this.operations = [];
      }

      log(operation, ...args) {
        this.operations.push({
          operation,
          args,
          timestamp: Date.now()
        });
      }

      push(...items) {
        this.log("push", ...items);
        return this.array.push(...items);
      }

      pop() {
        this.log("pop");
        return this.array.pop();
      }

      shift() {
        this.log("shift");
        return this.array.shift();
      }

      unshift(...items) {
        this.log("unshift", ...items);
        return this.array.unshift(...items);
      }

      splice(start, deleteCount, ...items) {
        this.log("splice", start, deleteCount, ...items);
        return this.array.splice(start, deleteCount, ...items);
      }

      getHistory() {
        return [...this.operations];
      }

      clearHistory() {
        this.operations = [];
      }

      getValue() {
        return [...this.array];
      }
    }

    const tracked = new TrackedArray([1, 2, 3]);

    tracked.push(4);
    tracked.pop();
    tracked.shift();

    const history = tracked.getHistory();
    expect(history).toHaveLength(3);
    expect(history[0].operation).toBe("push");
  });

  test("挑战8: 数组压缩和解压", () => {
    const ArrayCompress = {
      compress(arr) {
        if (arr.length === 0) return [];

        const compressed = [];
        let current = arr[0];
        let count = 1;

        for (let i = 1; i < arr.length; i++) {
          if (arr[i] === current) {
            count++;
          } else {
            compressed.push([current, count]);
            current = arr[i];
            count = 1;
          }
        }
        compressed.push([current, count]);

        return compressed;
      },

      decompress(compressed) {
        const decompressed = [];
        for (const [value, count] of compressed) {
          for (let i = 0; i < count; i++) {
            decompressed.push(value);
          }
        }
        return decompressed;
      }
    };

    const original = [1, 1, 1, 2, 2, 3, 3, 3, 3];
    const compressed = ArrayCompress.compress(original);

    expect(compressed).toEqual([
      [1, 3], [2, 2], [3, 4]
    ]);

    const decompressed = ArrayCompress.decompress(compressed);
    expect(decompressed).toEqual(original);
  });

  test("挑战9: 树转数组和数组转树", () => {
    const TreeUtils = {
      treeToArray(tree) {
        const result = [];
        const queue = [tree];

        while (queue.length > 0) {
          const node = queue.shift();
          result.push(node.value);

          if (node.children) {
            queue.push(...node.children);
          }
        }

        return result;
      },

      arrayToTree(arr, index = 0) {
        if (index >= arr.length) return null;

        return {
          value: arr[index],
          left: this.arrayToTree(arr, 2 * index + 1),
          right: this.arrayToTree(arr, 2 * index + 2)
        };
      }
    };

    const tree = {
      value: 1,
      children: [
        {
          value: 2,
          children: [
            { value: 4 },
            { value: 5 }
          ]
        },
        {
          value: 3,
          children: [
            { value: 6 },
            { value: 7 }
          ]
        }
      ]
    };

    expect(TreeUtils.treeToArray(tree)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  test("挑战10: 流式数组处理", () => {
    class ArrayStream {
      constructor(source) {
        this.source = source;
        this.transformers = [];
      }

      pipe(transformer) {
        this.transformers.push(transformer);
        return this;
      }

      collect() {
        return this.transformers.reduce(
          (data, transformer) => transformer(data),
          [...this.source]
        );
      }
    }

    const transformers = {
      filter: (predicate) => (arr) => arr.filter(predicate),
      map: (fn) => (arr) => arr.map(fn),
      take: (n) => (arr) => arr.slice(0, n),
      skip: (n) => (arr) => arr.slice(n),
      sort: (compareFn) => (arr) => [...arr].sort(compareFn),
      reverse: () => (arr) => [...arr].reverse()
    };

    const numbers = [5, 2, 8, 1, 9, 3];

    const result = new ArrayStream(numbers)
      .pipe(transformers.filter(x => x > 2))
      .pipe(transformers.map(x => x * 2))
      .pipe(transformers.sort((a, b) => a - b))
      .pipe(transformers.take(3))
      .collect();

    expect(result).toEqual([4, 6, 10]);
  });

  test("额外挑战: 数组diff算法", () => {
    function arrayDiff(oldArr, newArr) {
      const changes = [];

      for (let i = 0; i < oldArr.length; i++) {
        if (!newArr.includes(oldArr[i])) {
          changes.push({ type: "remove", value: oldArr[i], index: i });
        }
      }

      for (let i = 0; i < newArr.length; i++) {
        if (!oldArr.includes(newArr[i])) {
          changes.push({ type: "add", value: newArr[i], index: i });
        }
      }

      return changes;
    }

    const changes = arrayDiff(
      [1, 2, 3, 4, 5],
      [1, 2, 4, 5, 6]
    );

    expect(changes).toEqual([
      { type: "remove", value: 3, index: 2 },
      { type: "add", value: 6, index: 4 }
    ]);
  });

  test("额外挑战: 数组去重保持顺序", () => {
    function uniqueOrdered(arr, keyFn = x => x) {
      const seen = new Set();
      const result = [];

      for (const item of arr) {
        const key = keyFn(item);
        if (!seen.has(key)) {
          seen.add(key);
          result.push(item);
        }
      }

      return result;
    }

    const users = [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
      { id: 1, name: "Alice Duplicate" },
      { id: 3, name: "Charlie" },
      { id: 2, name: "Bob Duplicate" }
    ];

    const unique = uniqueOrdered(users, u => u.id);

    expect(unique).toHaveLength(3);
    expect(unique[0].name).toBe("Alice");
  });
});

console.log("✅ 模块05 - 数组综合挑战 (参考答案)");
