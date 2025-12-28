/**
 * 模块 09: 异步基础 - 综合挑战
 *
 * 提示: 遇到困难时可以查看 solutions/09-异步基础/02-综合挑战.solution.js
 */

import { test, expect, describe } from "bun:test";

describe("模块09 - 异步综合挑战", () => {

  test("挑战1: Promise 工具函数", async () => {
    const PromiseUtils = {
      // TODO: 实现 delay 函数，延迟指定时间后返回值
      delay(ms, value) {
        return new Promise(resolve => setTimeout(resolve, ms, value));
      },

      // TODO: 实现 timeout 函数，为 Promise 添加超时
      timeout(promise, ms) {
        return Promise.race([
          promise,
          this.delay(ms).then(() => {
            throw new Error("Timeout");
          })
        ]);
      },

      // TODO: 实现 retry 函数，重试失败的函数
      retry(fn, times = 3) {
        return new Promise((resolve, reject) => {
          function attempt(n) {
            fn()
              .then(resolve)
              .catch(err => {
                if (n >= times) reject(err);
                else attempt(n + 1);
              });
          }
          attempt(1);
        });
      }
    };

    expect(await PromiseUtils.delay(10, "hello")).toBe(???);

    let count = 0;
    const flaky = async () => {
      count++;
      if (count < 3) throw new Error("fail");
      return "success";
    };

    expect(await PromiseUtils.retry(flaky)).toBe("success");
  });

  test("挑战2: 异步队列", async () => {
    // TODO: 实现 AsyncQueue 类，控制并发执行数量
    class AsyncQueue {
      constructor(concurrency = 1) {
        this.concurrency = concurrency;
        this.running = 0;
        this.queue = [];
      }

      async add(fn) {
        while (this.running >= this.concurrency) {
          await new Promise(resolve => this.queue.push(resolve));
        }

        this.running++;
        try {
          return await fn();
        } finally {
          this.running--;
          const next = this.queue.shift();
          if (next) next();
        }
      }
    }

    const queue = new AsyncQueue(2);
    let results = [];

    await Promise.all([
      queue.add(async () => {
        await PromiseUtils.delay(50);
        results.push(1);
      }),
      queue.add(async () => {
        await PromiseUtils.delay(50);
        results.push(2);
      }),
      queue.add(async () => {
        await PromiseUtils.delay(50);
        results.push(3);
      })
    ]);

    expect(results).toEqual([???]);
  });

  const PromiseUtils = {
    delay(ms, value) {
      return new Promise(resolve => setTimeout(resolve, ms, value));
    }
  };

  test("挑战3: 信号量", async () => {
    // TODO: 实现 Semaphore 类，限制同时访问资源的数量
    class Semaphore {
      constructor(permits) {
        this.permits = permits;
        this.queue = [];
      }

      async acquire() {
        if (this.permits > 0) {
          this.permits--;
          return;
        }

        await new Promise(resolve => this.queue.push(resolve));
      }

      release() {
        if (this.queue.length > 0) {
          const resolve = this.queue.shift();
          resolve();
        } else {
          this.permits++;
        }
      }
    }

    const semaphore = new Semaphore(2);
    let count = 0;
    let max = 0;

    const update = () => {
      count++;
      if (count > max) max = count;
    };
    const decrement = () => count--;

    const tasks = [
      (async () => {
        await semaphore.acquire();
        update();
        await PromiseUtils.delay(50);
        decrement();
        semaphore.release();
      })(),
      (async () => {
        await semaphore.acquire();
        update();
        await PromiseUtils.delay(50);
        decrement();
        semaphore.release();
      })(),
      (async () => {
        await semaphore.acquire();
        update();
        await PromiseUtils.delay(50);
        decrement();
        semaphore.release();
      })()
    ];

    await Promise.all(tasks);
    expect(max).toBe(???);
  });
});

console.log("🎯 模块09 - 异步综合挑战完成！");
