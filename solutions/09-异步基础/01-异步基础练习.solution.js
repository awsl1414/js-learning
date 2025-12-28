/**
 * 模块 09: 异步基础 - 基础练习
 *
 * 学习目标:
 * - 理解异步概念
 * - 掌握 Promise 使用
 * - 熟练使用 async/await
 * - 理解事件循环
 */

import { test, expect, describe } from "bun:test";

describe("模块09 - 异步基础练习", () => {

  test("任务1: 回调函数", (done) => {
    function fetchData(callback) {
      setTimeout(() => {
        callback("data");
      }, 100);
    }

    fetchData((data) => {
      expect(data).toBe("data");
      done();
    });
  });

  test("任务2: Promise 基础", (done) => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("success");
      }, 100);
    });

    promise.then((data) => {
      expect(data).toBe("success");
      done();
    });
  });

  test("任务3: Promise 链式调用", (done) => {
    Promise.resolve(1)
      .then((v) => v + 1)
      .then((v) => v * 2)
      .then((v) => {
        expect(v).toBe(4);
        done();
      });
  });

  test("任务4: Promise 错误处理", (done) => {
    Promise.reject(new Error("fail"))
      .catch((err) => {
        expect(err.message).toBe("fail");
        done();
      });
  });

  test("任务5: Promise.all", (done) => {
    const p1 = Promise.resolve(1);
    const p2 = Promise.resolve(2);
    const p3 = Promise.resolve(3);

    Promise.all([p1, p2, p3]).then((values) => {
      expect(values).toEqual([1, 2, 3]);
      done();
    });
  });

  test("任务6: Promise.race", (done) => {
    const p1 = new Promise(r => setTimeout(() => r(1), 100));
    const p2 = new Promise(r => setTimeout(() => r(2), 50));

    Promise.race([p1, p2]).then((value) => {
      expect(value).toBe(2);
      done();
    });
  });

  test("任务7: async/await 基础", async () => {
    async function getData() {
      return "data";
    }

    const data = await getData();
    expect(data).toBe("data");
  });

  test("任务8: async/await 错误处理", async () => {
    async function fail() {
      throw new Error("error");
    }

    try {
      await fail();
      expect(true).toBe(false);  // 不应该到达
    } catch (err) {
      expect(err.message).toBe("error");
    }
  });

  test("任务9: async/await 并行", async () => {
    async function fetchA() {
      return "A";
    }
    async function fetchB() {
      return "B";
    }

    const [a, b] = await Promise.all([fetchA(), fetchB()]);
    expect(a).toBe("A");
    expect(b).toBe("B");
  });

  test("任务10: 事件循环顺序", (done) => {
    const order = [];

    console.log("1");
    order.push(1);

    setTimeout(() => {
      order.push(2);
      console.log("2");
      if (order.length === 5) {
        expect(order).toEqual([1, 3, 4, 5, 2]);
        done();
      }
    }, 0);

    Promise.resolve().then(() => {
      order.push(3);
      console.log("3");
    });

    console.log("4");
    order.push(4);

    Promise.resolve().then(() => {
      order.push(5);
      console.log("5");
    });
  });
});

console.log("🎯 模块09 - 异步基础练习完成！");
