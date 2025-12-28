/**
 * 模块 04: 函数基础 - 综合挑战
 *
 * 本练习包含复杂的实际应用场景
 */

import { test, expect, describe } from "bun:test";

describe("模块04 - 函数综合挑战", () => {

  // ==================== 挑战 1: 函数式工具库 ====================

  test("挑战1: 实现函数式工具库", () => {
    // 实现常用的函数式编程工具
    const _ = {
      // Curry - 柯里化
      curry(fn) {
        return function curried(...args) {
          if (args.length >= fn.length) {
            return fn(...args);
          }
          return (...more) => curried(...args, ...more);
        };
      },

      // Compose - 函数组合 (从右到左)
      compose(...fns) {
        return (x) => fns.reduceRight((acc, fn) => fn(acc), x);
      },

      // Pipe - 函数管道 (从左到右)
      pipe(...fns) {
        return (x) => fns.reduce((acc, fn) => fn(acc), x);
      },

      // Memoize - 记忆化
      memoize(fn, keyGen = (...args) => JSON.stringify(args)) {
        const cache = new Map();
        return (...args) => {
          const key = keyGen(...args);
          if (cache.has(key)) return cache.get(key);
          const result = fn(...args);
          cache.set(key, result);
          return result;
        };
      },

      // Partial - 偏函数
      partial(fn, ...presetArgs) {
        return (...laterArgs) => fn(...presetArgs, ...laterArgs);
      },

      // Negate - 断言取反
      negate(predicate) {
        return (...args) => !predicate(...args);
      },

      // Once - 只执行一次
      once(fn) {
        let called = false;
        let result;
        return (...args) => {
          if (!called) {
            called = true;
            result = fn(...args);
          }
          return result;
        };
      },

      // After - n次调用后执行
      after(n, fn) {
        let count = 0;
        return (...args) => {
          count++;
          if (count >= n) return fn(...args);
        };
      },

      // Before - n次调用前执行
      before(n, fn) {
        let count = 0;
        let result;
        return (...args) => {
          count++;
          if (count < n) result = fn(...args);
          return result;
        };
      },

      // Flip - 反转参数顺序
      flip(fn) {
        return (...args) => fn(...args.reverse());
      }
    };

    // 测试 curry
    const add = (a, b, c) => a + b + c;
    const curriedAdd = _.curry(add);
    expect(curriedAdd(1)(2)(3)).toBe(6);

    // 测试 compose
    const f = (x) => x + 1;
    const g = (x) => x * 2;
    expect(_.compose(g, f)(3)).toBe(8); // g(f(3)) = g(4) = 8

    // 测试 pipe
    expect(_.pipe(f, g)(3)).toBe(8); // g(f(3)) = 8

    // 测试 memoize
    let callCount = 0;
    const exp = _.memoize((x) => {
      callCount++;
      return x * x;
    });
    expect(exp(5)).toBe(25);
    expect(exp(5)).toBe(25);
    expect(callCount).toBe(1);

    // 测试 partial
    const multiply = (a, b, c) => a * b * c;
    const double = _.partial(multiply, 2);
    expect(double(3, 4)).toBe(24);

    // 测试 negate
    const isEven = (x) => x % 2 === 0;
    const isOdd = _.negate(isEven);
    expect(isOdd(3)).toBe(true);

    // 测试 once
    let initCount = 0;
    const init = _.once(() => {
      initCount++;
      return "initialized";
    });
    expect(init()).toBe("initialized");
    expect(init()).toBe("initialized");
    expect(initCount).toBe(1);

    // 测试 after
    let afterCount = 0;
    const after3 = _.after(3, () => {
      afterCount++;
      return "done";
    });
    expect(after3()).toBeUndefined();
    expect(after3()).toBeUndefined();
    expect(after3()).toBe("done");
    expect(afterCount).toBe(1);
  });

  // ==================== 挑战 2: 事件发射器 ====================

  test("挑战2: EventEmitter 实现", () => {
    class EventEmitter {
      constructor() {
        this.events = {};
      }

      // 订阅事件
      on(event, listener) {
        if (!this.events[event]) {
          this.events[event] = [];
        }
        this.events[event].push(listener);
        return this;
      }

      // 一次性订阅
      once(event, listener) {
        const onceWrapper = (...args) => {
          this.off(event, onceWrapper);
          listener(...args);
        };
        this.on(event, onceWrapper);
        return this;
      }

      // 取消订阅
      off(event, listenerToRemove) {
        if (!this.events[event]) return this;
        this.events[event] = this.events[event].filter(
          listener => listener !== listenerToRemove
        );
        return this;
      }

      // 触发事件
      emit(event, ...args) {
        if (!this.events[event]) return false;
        this.events[event].forEach(listener => {
          listener(...args);
        });
        return true;
      }

      // 获取监听器数量
      listenerCount(event) {
        return this.events[event]?.length || 0;
      }

      // 移除所有监听器
      removeAllListeners(event) {
        if (event) {
          delete this.events[event];
        } else {
          this.events = {};
        }
        return this;
      }
    }

    const emitter = new EventEmitter();
    let count = 0;
    let data = null;

    const handler = (msg) => {
      count++;
      data = msg;
    };

    emitter.on("test", handler);
    emitter.emit("test", "hello");

    expect(count).toBe(1);
    expect(data).toBe("hello");

    // 测试 once
    let onceCount = 0;
    emitter.once("once", () => {
      onceCount++;
    });

    emitter.emit("once");
    emitter.emit("once");
    expect(onceCount).toBe(1);

    // 测试 off
    emitter.off("test", handler);
    emitter.emit("test", "world");
    expect(count).toBe(1);  // 没有增加
  });

  // ==================== 挑战 3: 流式处理管道 ====================

  test("挑战3: 数据流处理", () => {
    class Stream {
      constructor(source) {
        this.source = source;
        this.operations = [];
      }

      // Map 操作
      map(fn) {
        this.operations.push({ type: "map", fn });
        return new Stream(this.source);
      }

      // Filter 操作
      filter(predicate) {
        this.operations.push({ type: "filter", predicate });
        return new Stream(this.source);
      }

      // Take 操作
      take(n) {
        this.operations.push({ type: "take", n });
        return new Stream(this.source);
      }

      // Skip 操作
      skip(n) {
        this.operations.push({ type: "skip", n });
        return new Stream(this.source);
      }

      // 收集结果
      collect() {
        let result = [...this.source];

        for (const op of this.operations) {
          if (op.type === "map") {
            result = result.map(op.fn);
          } else if (op.type === "filter") {
            result = result.filter(op.predicate);
          } else if (op.type === "take") {
            result = result.slice(0, op.n);
          } else if (op.type === "skip") {
            result = result.slice(op.n);
          }
        }

        return result;
      }

      // ForEach
      forEach(fn) {
        this.collect().forEach(fn);
      }

      // Reduce
      reduce(fn, initial) {
        return this.collect().reduce(fn, initial);
      }
    }

    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const result = new Stream(numbers)
      .filter(x => x % 2 === 0)
      .map(x => x * 2)
      .take(3)
      .collect();

    expect(result).toEqual([4, 8, 12]);  // [2*2, 4*2, 6*2]
  });

  // ==================== 挑战 4: 中间件模式 ====================

  test("挑战4: 中间件系统", () => {
    class MiddlewareRunner {
      constructor() {
        this.middlewares = [];
      }

      use(middleware) {
        this.middlewares.push(middleware);
        return this;
      }

      run(context, finalHandler) {
        let index = 0;

        const next = (error) => {
          if (error) {
            throw error;
          }
          index++;
          if (index < this.middlewares.length) {
            return this.middlewares[index](context, next);
          } else {
            return finalHandler(context);
          }
        };

        return this.middlewares[0](context, next);
      }

      // 异步版本
      async runAsync(context, finalHandler) {
        let index = 0;

        const next = async (error) => {
          if (error) {
            throw error;
          }
          index++;
          if (index < this.middlewares.length) {
            await this.middlewares[index](context, next);
          } else {
            await finalHandler(context);
          }
        };

        await this.middlewares[0](context, next);
      }
    }

    const runner = new MiddlewareRunner();

    let log = [];
    let result = 0;

    // 添加中间件
    runner.use((ctx, next) => {
      log.push("middleware 1 before");
      ctx.value1 = 1;
      next();
      log.push("middleware 1 after");
    });

    runner.use((ctx, next) => {
      log.push("middleware 2 before");
      ctx.value2 = 2;
      next();
      log.push("middleware 2 after");
    });

    // 最终处理器
    const finalHandler = (ctx) => {
      log.push("final handler");
      result = ctx.value1 + ctx.value2;
    };

    runner.run({}, finalHandler);

    expect(log).toEqual([
      "middleware 1 before",
      "middleware 2 before",
      "final handler",
      "middleware 2 after",
      "middleware 1 after"
    ]);

    expect(result).toBe(3);
  });

  // ==================== 挑战 5: 函数工厂 ====================

  test("挑战5: 类型检查工厂", () => {
    const TypeCheck = {
      // 创建类型检查函数
      isType(type) {
        return (value) => typeof value === type;
      },

      // 创建实例检查函数
      isInstance(Class) {
        return (value) => value instanceof Class;
      },

      // 创建范围检查函数
      inRange(min, max) {
        return (value) => value >= min && value <= max;
      },

      // 创建模式匹配函数
      matches(pattern) {
        const regex = new RegExp(`^${pattern}$`);
        return (value) => regex.test(value);
      },

      // 组合多个检查
      all(...checkers) {
        return (value) => checkers.every(check => check(value));
      },

      // 任一检查通过
      any(...checkers) {
        return (value) => checkers.some(check => check(value));
      }
    };

    const isString = TypeCheck.isType("string");
    const isNumber = TypeCheck.isType("number");
    const isArray = TypeCheck.isInstance(Array);
    const isPositive = TypeCheck.inRange(0, Infinity);
    const isEmail = TypeCheck.matches("[^@]+@[^@]+");

    expect(isString("hello")).toBe(true);
    expect(isNumber(42)).toBe(true);
    expect(isArray([1, 2, 3])).toBe(true);
    expect(isPositive(5)).toBe(true);
    expect(isEmail("test@example.com")).toBe(true);

    // 组合检查
    const isPositiveNumber = TypeCheck.all(isNumber, isPositive);
    expect(isPositiveNumber(5)).toBe(true);
    expect(isPositiveNumber(-1)).toBe(false);
    expect(isPositiveNumber("5")).toBe(false);
  });

  // ==================== 挑战 6: 递归高级应用 ====================

  test("挑战6: 树结构操作", () => {
    class TreeUtils {
      // 深度优先遍历
      dfs(node, callback) {
        callback(node);
        if (node.children) {
          for (const child of node.children) {
            this.dfs(child, callback);
          }
        }
      }

      // 广度优先遍历
      bfs(node, callback) {
        const queue = [node];
        while (queue.length > 0) {
          const current = queue.shift();
          callback(current);
          if (current.children) {
            queue.push(...current.children);
          }
        }
      }

      // 查找节点
      find(node, predicate) {
        if (predicate(node)) return node;
        if (node.children) {
          for (const child of node.children) {
            const found = this.find(child, predicate);
            if (found) return found;
          }
        }
        return null;
      }

      // 计算深度
      depth(node) {
        if (!node.children || node.children.length === 0) {
          return 1;
        }
        return 1 + Math.max(...node.children.map(child => this.depth(child)));
      }

      // 计算节点数
      count(node) {
        let total = 1;
        if (node.children) {
          for (const child of node.children) {
            total += this.count(child);
          }
        }
        return total;
      }
    }

    const tree = {
      value: "root",
      children: [
        {
          value: "A",
          children: [
            { value: "A1" },
            { value: "A2" }
          ]
        },
        {
          value: "B",
          children: [
            { value: "B1" },
            { value: "B2" },
            { value: "B3" }
          ]
        }
      ]
    };

    const utils = new TreeUtils();

    // 测试深度
    expect(utils.depth(tree)).toBe(3);

    // 测试计数
    expect(utils.count(tree)).toBe(7);

    // 测试查找
    const found = utils.find(tree, node => node.value === "B2");
    expect(found?.value).toBe("B2");
  });

  // ==================== 挑战 7: 惰性求值链 ====================

  test("挑战7: 惰性序列", () => {
    class LazySeq {
      constructor(generator) {
        this.generator = generator;
      }

      // 创建范围序列
      static range(start, end, step = 1) {
        return new LazySeq(function*() {
          for (let i = start; i < end; i += step) {
            yield i;
          }
        });
      }

      // 创建无限序列
      static infinite(start, step = 1) {
        return new LazySeq(function*() {
          let current = start;
          while (true) {
            yield current;
            current += step;
          }
        });
      }

      // Map
      map(fn) {
        const self = this;
        return new LazySeq(function*() {
          for (const value of self.generator()) {
            yield fn(value);
          }
        });
      }

      // Filter
      filter(predicate) {
        const self = this;
        return new LazySeq(function*() {
          for (const value of self.generator()) {
            if (predicate(value)) {
              yield value;
            }
          }
        });
      }

      // Take
      take(n) {
        const self = this;
        return new LazySeq(function*() {
          let count = 0;
          for (const value of self.generator()) {
            if (count >= n) break;
            yield value;
            count++;
          }
        });
      }

      // Skip
      skip(n) {
        const self = this;
        return new LazySeq(function*() {
          let count = 0;
          for (const value of self.generator()) {
            if (count >= n) {
              yield value;
            }
            count++;
          }
        });
      }

      // 转为数组
      toArray() {
        return [...this.generator()];
      }

      // Reduce
      reduce(fn, initial) {
        let accumulator = initial;
        for (const value of this.generator()) {
          accumulator = fn(accumulator, value);
        }
        return accumulator;
      }
    }

    // 自然数的平方 (前10个)
    const squares = LazySeq.infinite(1)
      .map(x => x * x)
      .take(10)
      .toArray();

    expect(squares).toEqual([1, 4, 9, 16, 25, 36, 49, 64, 81, 100]);

    // 前10个偶数
    const evens = LazySeq.range(1, 30)
      .filter(x => x % 2 === 0)
      .take(10)
      .toArray();

    expect(evens).toEqual([2, 4, 6, 8, 10, 12, 14, 16, 18, 20]);
  });

  // ==================== 挑战 8: 异步控制流 ====================

  test("挑战8: Promise 工具函数", () => {
    const AsyncUtils = {
      // 延迟
      delay(ms, value) {
        return new Promise(resolve => setTimeout(resolve, ms, value));
      },

      // 重试
      async retry(fn, times = 3) {
        for (let i = 0; i < times; i++) {
          try {
            return await fn();
          } catch (error) {
            if (i === times - 1) throw error;
          }
        }
      },

      // 超时
      timeout(promise, ms) {
        return Promise.race([
          promise,
          this.delay(ms).then(() => {
            throw new Error("Timeout");
          })
        ]);
      },

      // 并行限制
      async parallel(tasks, limit = 5) {
        const results = [];
        const executing = [];

        for (const task of tasks) {
          const promise = task().then(result => {
            executing.splice(executing.indexOf(promise), 1);
            return result;
          });

          executing.push(promise);
          results.push(promise);

          if (executing.length >= limit) {
            await Promise.race(executing);
          }
        }

        return Promise.all(results);
      }
    };

    // 测试延迟
    AsyncUtils.delay(10, "hello").then(value => {
      expect(value).toBe("hello");
    });

    // 测试超时
    const fast = AsyncUtils.delay(10, "fast");
    const slow = AsyncUtils.delay(100, "slow");

    AsyncUtils.timeout(fast, 50).then(result => {
      expect(result).toBe("fast");
    });

    // 测试重试
    let attempts = 0;
    const flaky = async () => {
      attempts++;
      if (attempts < 3) throw new Error("Fail");
      return "success";
    };

    AsyncUtils.retry(flaky).then(result => {
      expect(result).toBe("success");
      expect(attempts).toBe(3);
    });
  });

  // ==================== 挑战 9: 函数装饰器 ====================

  test("挑战9: 函数装饰器", () => {
    const Decorators = {
      // 日志装饰器
      log(fn, name = "function") {
        return function(...args) {
          console.log(`${name} called with:`, args);
          const result = fn(...args);
          console.log(`${name} returned:`, result);
          return result;
        };
      },

      // 性能监控
      time(fn) {
        return function(...args) {
          const start = Date.now();
          const result = fn(...args);
          const end = Date.now();
          console.log(`Execution time: ${end - start}ms`);
          return result;
        };
      },

      // 参数验证
      validate(fn, validators) {
        return function(...args) {
          for (let i = 0; i < validators.length; i++) {
            if (!validators[i](args[i])) {
              throw new Error(`Invalid argument at position ${i}`);
            }
          }
          return fn(...args);
        };
      },

      // 缓存
      cache(fn) {
        const cache = new Map();
        return function(...args) {
          const key = JSON.stringify(args);
          if (cache.has(key)) return cache.get(key);
          const result = fn(...args);
          cache.set(key, result);
          return result;
        };
      },

      // 重试
      retry(fn, times = 3) {
        return async function(...args) {
          for (let i = 0; i < times; i++) {
            try {
              return await fn(...args);
            } catch (error) {
              if (i === times - 1) throw error;
            }
          }
        };
      }
    };

    // 测试验证装饰器
    const divide = Decorators.validate(
      (a, b) => a / b,
      [
        x => typeof x === "number",
        x => typeof x === "number" && x !== 0
      ]
    );

    expect(divide(10, 2)).toBe(5);
    expect(() => divide(10, 0)).toThrow();

    // 测试缓存装饰器
    let computeCount = 0;
    const expensive = Decorators.cache((n) => {
      computeCount++;
      return n * n;
    });

    expect(expensive(5)).toBe(25);
    expect(expensive(5)).toBe(25);
    expect(computeCount).toBe(1);
  });

  // ==================== 挑战 10: 状态机 ====================

  test("挑战10: 有限状态机", () => {
    class StateMachine {
      constructor(initialState, transitions) {
        this.state = initialState;
        this.transitions = transitions;
      }

      // 转换状态
      transition(action, payload) {
        const currentState = this.state;
        const stateTransitions = this.transitions[currentState];

        if (!stateTransitions) {
          throw new Error(`No transitions defined for state: ${currentState}`);
        }

        const nextState = stateTransitions[action];

        if (!nextState) {
          throw new Error(`Invalid action "${action}" for state: ${currentState}`);
        }

        const oldState = this.state;
        this.state = typeof nextState === "function"
          ? nextState(payload)
          : nextState;

        return { oldState, newState: this.state };
      }

      // 检查状态
      is(state) {
        return this.state === state;
      }

      // 获取当前状态
      getCurrentState() {
        return this.state;
      }
    }

    // 交通灯状态机
    const trafficLight = new StateMachine("green", {
      green: {
        timer: "yellow",
        stop: "red"
      },
      yellow: {
        timer: "red"
      },
      red: {
        timer: "green",
        go: "green"
      }
    });

    expect(trafficLight.is("green")).toBe(true);

    trafficLight.transition("timer");
    expect(trafficLight.getCurrentState()).toBe("yellow");

    trafficLight.transition("timer");
    expect(trafficLight.getCurrentState()).toBe("red");

    trafficLight.transition("timer");
    expect(trafficLight.getCurrentState()).toBe("green");
  });

  // ==================== 额外挑战: 函数式响应式 ====================

  test("额外挑战: 简单的 Observable 实现", () => {
    class Observable {
      constructor(subscribe) {
        this.subscribe = subscribe;
      }

      // Map 操作
      map(fn) {
        return new Observable(observer => {
          return this.subscribe({
            next: (value) => observer.next(fn(value)),
            error: observer.error,
            complete: observer.complete
          });
        });
      }

      // Filter 操作
      filter(predicate) {
        return new Observable(observer => {
          return this.subscribe({
            next: (value) => {
              if (predicate(value)) {
                observer.next(value);
              }
            },
            error: observer.error,
            complete: observer.complete
          });
        });
      }

      // Take 操作
      take(n) {
        return new Observable(observer => {
          let count = 0;
          const subscription = this.subscribe({
            next: (value) => {
              if (count < n) {
                count++;
                observer.next(value);
                if (count === n) {
                  observer.complete();
                  subscription?.unsubscribe();
                }
              }
            },
            error: observer.error,
            complete: observer.complete
          });
          return subscription;
        });
      }

      // 订阅
      subscribe(observer) {
        let cleanup;
        if (typeof observer === "function") {
          cleanup = this.subscribe({
            next: observer,
            error: () => {},
            complete: () => {}
          });
        } else {
          cleanup = this.subscribe(observer);
        }
        return { unsubscribe: cleanup || (() => {}) };
      }
    }

    // 创建简单的 Observable
    const fromArray = (arr) => new Observable(observer => {
      for (const item of arr) {
        observer.next(item);
      }
      observer.complete();
    });

    // 使用示例
    const values = [];
    const subscription = fromArray([1, 2, 3, 4, 5])
      .filter(x => x % 2 === 0)
      .map(x => x * 2)
      .take(2)
      .subscribe({
        next: (value) => values.push(value),
        complete: () => values.push("done")
      });

    expect(values).toEqual([4, 8, "done"]);
  });

  test("额外挑战: 函数式链式调用", () => {
    // 实现流畅接口
    class QueryBuilder {
      constructor() {
        this.query = {
          select: [],
          where: [],
          orderBy: null,
          limit: null,
          offset: null
        };
      }

      select(...fields) {
        this.query.select = fields;
        return this;
      }

      where(condition) {
        this.query.where.push(condition);
        return this;
      }

      orderBy(field, direction = "ASC") {
        this.query.orderBy = { field, direction };
        return this;
      }

      limit(n) {
        this.query.limit = n;
        return this;
      }

      offset(n) {
        this.query.offset = n;
        return this;
      }

      build() {
        return { ...this.query };
      }
    }

    const query = new QueryBuilder()
      .select("id", "name", "email")
      .where({ age: { $gt: 18 } })
      .where({ status: "active" })
      .orderBy("name", "ASC")
      .limit(10)
      .offset(5)
      .build();

    expect(query.select).toEqual(["id", "name", "email"]);
    expect(query.where).toHaveLength(2);
    expect(query.limit).toBe(10);
  });
});

console.log("🎯 模块04 - 函数综合挑战完成！");
