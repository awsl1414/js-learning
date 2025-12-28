/**
 * 模块 08: 集合与映射 - 综合挑战
 */

import { test, expect, describe } from "bun:test";

describe("模块08 - 集合与映射综合挑战", () => {

  test("挑战1: 完整的 Set 工具库", () => {
    const SetUtils = {
      union(...sets) {
        return new Set(sets.flatMap(s => [...s]));
      },

      intersection(...sets) {
        if (sets.length === 0) return new Set();
        return new Set([...sets[0]].filter(x => sets.every(s => s.has(x))));
      },

      difference(setA, setB) {
        return new Set([...setA].filter(x => !setB.has(x)));
      },

      symmetricDifference(setA, setB) {
        return new Set([
          ...[...setA].filter(x => !setB.has(x)),
          ...[...setB].filter(x => !setA.has(x))
        ]);
      },

      isSubset(setA, setB) {
        return [...setA].every(x => setB.has(x));
      },

      isSuperset(setA, setB) {
        return [...setB].every(x => setA.has(x));
      },

      cartesianProduct(setA, setB) {
        const product = new Set();
        for (const a of setA) {
          for (const b of setB) {
            product.add([a, b]);
          }
        }
        return product;
      },

      powerSet(set) {
        const arr = [...set];
        const result = new Set();
        const total = 1 << arr.length;

        for (let i = 0; i < total; i++) {
          const subset = [];
          for (let j = 0; j < arr.length; j++) {
            if (i & (1 << j)) {
              subset.push(arr[j]);
            }
          }
          result.add(subset.length === 0 ? [] : subset);
        }

        return result;
      }
    };

    const setA = new Set([1, 2, 3]);
    const setB = new Set([3, 4, 5]);

    expect([...SetUtils.union(setA, setB)]).toEqual([1, 2, 3, 4, 5]);
    expect([...SetUtils.intersection(setA, setB)]).toEqual([3]);
    expect([...SetUtils.symmetricDifference(setA, setB)]).toEqual([1, 2, 4, 5]);
  });

  test("挑战2: LRU 缓存使用 Map", () => {
    class LRUCache {
      constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
      }

      get(key) {
        if (!this.cache.has(key)) return undefined;

        // 移到末尾 (最近使用)
        const value = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, value);
        return value;
      }

      set(key, value) {
        // 如果已存在，删除
        if (this.cache.has(key)) {
          this.cache.delete(key);
        }
        // 如果超出容量，删除最久未使用 (第一个)
        else if (this.cache.size >= this.capacity) {
          const firstKey = this.cache.keys().next().value;
          this.cache.delete(firstKey);
        }

        this.cache.set(key, value);
      }

      has(key) {
        return this.cache.has(key);
      }

      clear() {
        this.cache.clear();
      }

      get size() {
        return this.cache.size;
      }
    }

    const cache = new LRUCache(3);
    cache.set("a", 1);
    cache.set("b", 2);
    cache.set("c", 3);

    expect(cache.size).toBe(3);

    cache.set("d", 4);  // 移除 a
    expect(cache.has("a")).toBe(false);
    expect(cache.has("d")).toBe(true);

    cache.get("b");  // b 变为最近使用
    cache.set("e", 5);  // 移除 c
    expect(cache.has("c")).toBe(false);
  });

  test("挑战3: 多值 Map", () => {
    class MultiMap {
      constructor() {
        this.map = new Map();
      }

      set(key, value) {
        if (!this.map.has(key)) {
          this.map.set(key, new Set());
        }
        this.map.get(key).add(value);
        return this;
      }

      get(key) {
        return this.map.get(key) || new Set();
      }

      has(key, value) {
        const set = this.map.get(key);
        return set ? set.has(value) : false;
      }

      delete(key, value) {
        const set = this.map.get(key);
        if (!set) return false;
        const deleted = set.delete(value);
        if (set.size === 0) {
          this.map.delete(key);
        }
        return deleted;
      }

      clear() {
        this.map.clear();
      }

      get size() {
        return this.map.size;
      }
    }

    const mmap = new MultiMap();
    mmap.set("fruit", "apple");
    mmap.set("fruit", "banana");
    mmap.set("fruit", "apple");  // 重复

    expect(mmap.get("fruit").size).toBe(2);
    expect(mmap.has("fruit", "apple")).toBe(true);
  });

  test("挑战4: 有序 Map", () => {
    class OrderedMap {
      constructor() {
        this.keys = [];
        this.values = [];
        this.map = new Map();
      }

      set(key, value) {
        if (!this.map.has(key)) {
          this.keys.push(key);
        }
        this.map.set(key, value);
        return this;
      }

      get(key) {
        return this.map.get(key);
      }

      has(key) {
        return this.map.has(key);
      }

      delete(key) {
        const index = this.keys.indexOf(key);
        if (index !== -1) {
          this.keys.splice(index, 1);
        }
        return this.map.delete(key);
      }

      keys() {
        return [...this.keys];
      }

      values() {
        return this.keys.map(k => this.map.get(k));
      }

      entries() {
        return this.keys.map(k => [k, this.map.get(k)]);
      }
    }

    const omap = new OrderedMap();
    omap.set("b", 2);
    omap.set("a", 1);
    omap.set("c", 3);

    expect(omap.keys()).toEqual(["b", "a", "c"]);  // 插入顺序
  });

  test("挑战5: Trie 实现", () => {
    class Trie {
      constructor() {
        this.root = {};
        this.size = 0;
      }

      insert(word) {
        let node = this.root;
        for (const char of word) {
          if (!node[char]) {
            node[char] = {};
          }
          node = node[char];
        }
        if (!node.isEnd) {
          node.isEnd = true;
          this.size++;
        }
      }

      has(word) {
        let node = this.root;
        for (const char of word) {
          if (!node[char]) return false;
          node = node[char];
        }
        return node.isEnd === true;
      }

      startsWith(prefix) {
        let node = this.root;
        for (const char of prefix) {
          if (!node[char]) return false;
          node = node[char];
        }
        return true;
      }
    }

    const trie = new Trie();
    trie.insert("hello");
    trie.insert("world");

    expect(trie.has("hello")).toBe(true);
    expect(trie.has("hell")).toBe(false);
    expect(trie.startsWith("hel")).toBe(true);
    expect(trie.startsWith("wor")).toBe(true);
  });

  test("挑战6: 图使用 Map 和 Set", () => {
    class Graph {
      constructor(directed = false) {
        this.directed = directed;
        this.vertices = new Map();
      }

      addVertex(vertex) {
        if (!this.vertices.has(vertex)) {
          this.vertices.set(vertex, new Set());
        }
        return this;
      }

      addEdge(v1, v2) {
        this.addVertex(v1);
        this.addVertex(v2);

        this.vertices.get(v1).add(v2);
        if (!this.directed) {
          this.vertices.get(v2).add(v1);
        }
        return this;
      }

      hasVertex(vertex) {
        return this.vertices.has(vertex);
      }

      hasEdge(v1, v2) {
        return this.vertices.get(v1)?.has(v2) || false;
      }

      getNeighbors(vertex) {
        return this.vertices.get(vertex) || new Set();
      }

      bfs(start, callback) {
        const visited = new Set();
        const queue = [start];

        while (queue.length > 0) {
          const vertex = queue.shift();
          if (visited.has(vertex)) continue;

          visited.add(vertex);
          callback(vertex);

          for (const neighbor of this.getNeighbors(vertex)) {
            if (!visited.has(neighbor)) {
              queue.push(neighbor);
            }
          }
        }
      }
    }

    const graph = new Graph();
    graph.addEdge("A", "B");
    graph.addEdge("B", "C");
    graph.addEdge("A", "C");

    expect(graph.hasEdge("A", "B")).toBe(true);
    expect(graph.hasEdge("B", "A")).toBe(true);  // 无向图
  });
});

console.log("🎯 模块08 - 集合与映射综合挑战完成！");
