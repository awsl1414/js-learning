/**
 * 模块 04: 函数基础 - 基础练习
 *
 * 学习目标:
 * - 掌握函数声明和表达式
 * - 理解参数和返回值
 * - 使用箭头函数
 * - 理解作用域和闭包
 */

import { test, expect, describe } from "bun:test";

describe("模块04 - 函数基础练习", () => {

  // ==================== 任务 1-10: 函数定义 ====================

  test("任务1: 函数声明", () => {
    // 函数声明
    function greet(name) {
      return "Hello, " + name + "!";
    }

    // 函数表达式
    const greet2 = function(name) {
      return "Hi, " + name + "!";
    };

    expect(greet("Alice")).toBe("Hello, Alice!");
    expect(greet2("Bob")).toBe("Hi, Bob!");
  });

  test("任务2: 箭头函数基础", () => {
    // 箭头函数语法
    const add = (a, b) => a + b;
    const square = x => x * x;
    const greet = () => "Hello!";

    expect(add(2, 3)).toBe(5);
    expect(square(5)).toBe(25);
    expect(greet()).toBe("Hello!");
  });

  test("任务3: 箭头函数与 this", () => {
    // 箭头函数没有自己的 this
    const obj = {
      value: 42,
      regular: function() {
        return this.value;
      },
      arrow: () => {
        return this?.value ?? undefined;
      }
    };

    expect(obj.regular()).toBe(42);
    expect(obj.arrow()).toBeUndefined();

    // 箭头函数从外部作用域继承 this
    const obj2 = {
      value: 100,
      method() {
        const inner = () => this.value;
        return inner();
      }
    };

    expect(obj2.method()).toBe(100);
  });

  test("任务4: 默认参数", () => {
    function greet(name = "Guest", greeting = "Hello") {
      return `${greeting}, ${name}!`;
    }

    expect(greet()).toBe("Hello, Guest!");
    expect(greet("Alice")).toBe("Hello, Alice!");
    expect(greet("Bob", "Hi")).toBe("Hi, Bob!");

    // 默认参数可以是表达式
    function calculateDiscount(price, discount = price * 0.1) {
      return price - discount;
    }

    expect(calculateDiscount(100)).toBe(90);
    expect(calculateDiscount(100, 20)).toBe(80);
  });

  test("任务5: 剩余参数", () => {
    function sum(...numbers) {
      let total = 0;
      for (const num of numbers) {
        total += num;
      }
      return total;
    }

    expect(sum()).toBe(0);
    expect(sum(1)).toBe(1);
    expect(sum(1, 2, 3, 4, 5)).toBe(15);

    // 剩余参数与其他参数结合
    function multiply(factor, ...numbers) {
      return numbers.map(n => n * factor);
    }

    expect(multiply(2, 1, 2, 3)).toEqual([2, 4, 6]);
  });

  test("任务6: 参数解构", () => {
    // 对象解构
    function greetUser({ name, age, city = "Unknown" }) {
      return `${name} is ${age} years old from ${city}`;
    }

    const user = { name: "Alice", age: 30, city: "NYC" };
    expect(greetUser(user)).toBe("Alice is 30 years old from NYC");

    const user2 = { name: "Bob", age: 25 };
    expect(greetUser(user2)).toBe("Bob is 25 years old from Unknown");

    // 数组解构
    function firstAndSecond([first, second]) {
      return { first, second };
    }

    expect(firstAndSecond([1, 2, 3, 4])).toEqual({ first: 1, second: 2 });
  });

  test("任务7: 返回值", () => {
    // 显式返回
    function add(a, b) {
      return a + b;
    }

    // 隐式返回 (箭头函数)
    const multiply = (a, b) => a * b;

    // 返回对象 (需要括号)
    const createUser = (name, age) => ({ name, age });

    expect(add(2, 3)).toBe(5);
    expect(multiply(4, 5)).toBe(20);
    expect(createUser("Alice", 30)).toEqual({ name: "Alice", age: 30 });
  });

  test("任务8: 早期返回 (Guard Clause)", () => {
    function getDiscount(age, isMember) {
      // 提前返回使代码更清晰
      if (age < 18) {
        return 0.9; // 儿童9折
      }
      if (age >= 65) {
        return 0.85; // 老人85折
      }
      if (isMember) {
        return 0.8; // 会员8折
      }
      return 1; // 原价
    }

    expect(getDiscount(10, false)).toBe(0.9);
    expect(getDiscount(70, false)).toBe(0.85);
    expect(getDiscount(30, true)).toBe(0.8);
    expect(getDiscount(30, false)).toBe(1);
  });

  test("任务9: 函数作为值", () => {
    // 函数可以作为变量传递
    const operation = (a, b, fn) => fn(a, b);

    const add = (a, b) => a + b;
    const multiply = (a, b) => a * b;

    expect(operation(5, 3, add)).toBe(8);
    expect(operation(5, 3, multiply)).toBe(15);

    // 函数可以作为返回值
    function createMultiplier(factor) {
      return function(x) {
        return x * factor;
      };
    }

    const double = createMultiplier(2);
    const triple = createMultiplier(3);

    expect(double(5)).toBe(10);
    expect(triple(5)).toBe(15);
  });

  test("任务10: 高阶函数", () => {
    // 接受函数作为参数
    function withLogging(fn) {
      return function(...args) {
        console.log(`Calling with args:`, args);
        const result = fn(...args);
        console.log(`Result:`, result);
        return result;
      };
    }

    const add = (a, b) => a + b;
    const loggedAdd = withLogging(add);

    expect(loggedAdd(2, 3)).toBe(5);

    // 返回函数
    function compose(f, g) {
      return function(x) {
        return f(g(x));
      };
    }

    const double = x => x * 2;
    const square = x => x * x;

    const doubleThenSquare = compose(square, double);

    expect(doubleThenSquare(3)).toBe(36); // (3 * 2) ^ 2 = 36
  });

  // ==================== 任务 11-20: 作用域和闭包 ====================

  test("任务11: 词法作用域", () => {
    const global = "global";

    function outer() {
      const outer = "outer";

      function inner() {
        const inner = "inner";
        return `${global} > ${outer} > ${inner}`;
      }

      return inner();
    }

    expect(outer()).toBe("global > outer > inner");
  });

  test("任务12: 变量遮蔽", () => {
    const x = "global";

    function shadow() {
      const x = "local";
      return x;
    }

    expect(shadow()).toBe("local");
    expect(x).toBe("global");
  });

  test("任务13: 闭包基础", () => {
    function createCounter() {
      let count = 0;
      return function() {
        count++;
        return count;
      };
    }

    const counter1 = createCounter();
    const counter2 = createCounter();

    expect(counter1()).toBe(1);
    expect(counter1()).toBe(2);
    expect(counter2()).toBe(1);  // 独立的 count
  });

  test("任务14: 闭包的应用 - 数据私有化", () => {
    function createPerson(name) {
      let age = 0;

      return {
        getName() {
          return name;
        },
        getAge() {
          return age;
        },
        setAge(newAge) {
          if (newAge >= 0) {
            age = newAge;
          }
        },
        incrementAge() {
          age++;
        }
      };
    }

    const person = createPerson("Alice");

    expect(person.getName()).toBe("Alice");
    expect(person.getAge()).toBe(0);

    person.setAge(25);
    expect(person.getAge()).toBe(25);

    person.incrementAge();
    expect(person.getAge()).toBe(26);

    // age 无法直接访问
    expect(person.age).toBeUndefined();
  });

  test("任务15: 闭包陷阱 - 循环", () => {
    // 错误示例 (使用 var)
    const functions1 = [];
    for (var i = 0; i < 3; i++) {
      functions1.push(function() {
        return i;
      });
    }

    expect(functions1[0]()).toBe(3);  // 都是 3
    expect(functions1[1]()).toBe(3);
    expect(functions1[2]()).toBe(3);

    // 正确方式 1: 使用 let
    const functions2 = [];
    for (let j = 0; j < 3; j++) {
      functions2.push(function() {
        return j;
      });
    }

    expect(functions2[0]()).toBe(0);
    expect(functions2[1]()).toBe(1);
    expect(functions2[2]()).toBe(2);

    // 正确方式 2: 使用闭包
    const functions3 = [];
    for (let k = 0; k < 3; k++) {
      (function(value) {
        functions3.push(function() {
          return value;
        });
      })(k);
    }

    expect(functions3[0]()).toBe(0);
    expect(functions3[1]()).toBe(1);
    expect(functions3[2]()).toBe(2);
  });

  test("任务16: 立即执行函数 (IIFE)", () => {
    // IIFE 语法
    const result1 = (function() {
      return "IIFE executed";
    })();

    expect(result1).toBe("IIFE executed");

    // 带参数
    const result2 = (function(x, y) {
      return x + y;
    })(5, 3);

    expect(result2).toBe(8);

    // 创建私有作用域
    const counter = (function() {
      let count = 0;
      return {
        increment() { count++; },
        get() { return count; }
      };
    })();

    counter.increment();
    expect(counter.get()).toBe(1);
  });

  test("任务17: 递归函数", () => {
    // 阶乘
    function factorial(n) {
      if (n <= 1) return 1;
      return n * factorial(n - 1);
    }

    expect(factorial(5)).toBe(120);
    expect(factorial(0)).toBe(1);

    // 斐波那契
    function fibonacci(n) {
      if (n <= 1) return n;
      return fibonacci(n - 1) + fibonacci(n - 2);
    }

    expect(fibonacci(0)).toBe(0);
    expect(fibonacci(1)).toBe(1);
    expect(fibonacci(10)).toBe(55);

    // 数组求和
    function sumArray(arr) {
      if (arr.length === 0) return 0;
      return arr[0] + sumArray(arr.slice(1));
    }

    expect(sumArray([1, 2, 3, 4, 5])).toBe(15);
  });

  test("任务18: 尾递归优化", () => {
    // 非尾递归 (栈溢出风险)
    function factorial(n) {
      if (n <= 1) return 1;
      return n * factorial(n - 1);
    }

    // 尾递归优化版本
    function factorialTail(n, accumulator = 1) {
      if (n <= 1) return accumulator;
      return factorialTail(n - 1, n * accumulator);
    }

    expect(factorial(5)).toBe(120);
    expect(factorialTail(5)).toBe(120);

    // 非尾递归
    function sumUpTo(n) {
      if (n <= 0) return 0;
      return n + sumUpTo(n - 1);
    }

    // 尾递归优化版本
    function sumUpToTail(n, accumulator = 0) {
      if (n <= 0) return accumulator;
      return sumUpToTail(n - 1, n + accumulator);
    }

    expect(sumUpTo(5)).toBe(15);
    expect(sumUpToTail(5)).toBe(15);
  });

  test("任务19: 函数属性", () => {
    function greet(name) {
      return `Hello, ${name}!`;
    }

    // 函数也是对象
    greet.version = "1.0";
    greet.defaultName = "Guest";

    expect(greet.version).toBe("1.0");
    expect(greet.defaultName).toBe("Guest");

    // 使用函数属性
    greet.withDefault = function(name) {
      return this(name || this.defaultName);
    };

    expect(greet.withDefault()).toBe("Hello, Guest!");
    expect(greet.withDefault("Alice")).toBe("Hello, Alice!");
  });

  test("任务20: 函数方法 (call, apply, bind)", () => {
    function greet(greeting, punctuation) {
      return `${greeting}, ${this.name}${punctuation}`;
    }

    const person = { name: "Alice" };

    // call
    expect(greet.call(person, "Hello", "!")).toBe("Hello, Alice!");

    // apply
    expect(greet.apply(person, ["Hi", "?"])).toBe("Hi, Alice?");

    // bind
    const boundGreet = greet.bind(person, "Hey");
    expect(boundGreet("~")).toBe("Hey, Alice~");
  });

  // ==================== 综合应用题 ====================

  test("综合题1: 函数柯里化", () => {
    // 柯里化: 将多参数函数转为单参数函数链
    function curry(fn) {
      return function curried(...args) {
        if (args.length >= fn.length) {
          return fn(...args);
        }
        return function(...more) {
          return curried(...args, ...more);
        };
      };
    }

    function add(a, b, c) {
      return a + b + c;
    }

    const curriedAdd = curry(add);

    expect(curriedAdd(1)(2)(3)).toBe(6);
    expect(curriedAdd(1, 2)(3)).toBe(6);
    expect(curriedAdd(1)(2, 3)).toBe(6);
    expect(curriedAdd(1, 2, 3)).toBe(6);
  });

  test("综合题2: 函数组合", () => {
    // 从右到左组合
    function compose(...fns) {
      return function(x) {
        return fns.reduceRight((acc, fn) => fn(acc), x);
      };
    }

    // 从左到右组合
    function pipe(...fns) {
      return function(x) {
        return fns.reduce((acc, fn) => fn(acc), x);
      };
    }

    const addOne = x => x + 1;
    const double = x => x * 2;
    const square = x => x * x;

    // compose: square(double(addOne(3))) = square(double(4)) = square(8) = 64
    const composed = compose(square, double, addOne);
    expect(composed(3)).toBe(64);

    // pipe: square(addOne(double(3))) = square(addOne(6)) = square(7) = 49
    const piped = pipe(addOne, double, square);
    expect(piped(3)).toBe(49);
  });

  test("综合题3: 记忆化 (Memoization)", () => {
    function memoize(fn) {
      const cache = new Map();

      return function(...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
          return cache.get(key);
        }

        const result = fn(...args);
        cache.set(key, result);
        return result;
      };
    }

    let callCount = 0;
    function expensive(n) {
      callCount++;
      return n * n;
    }

    const memoized = memoize(expensive);

    expect(memoized(5)).toBe(25);
    expect(callCount).toBe(1);

    expect(memoized(5)).toBe(25);  // 从缓存读取
    expect(callCount).toBe(1);

    expect(memoized(10)).toBe(100);
    expect(callCount).toBe(2);
  });

  test("综合题4: 防抖 (Debounce)", () => {
    function debounce(fn, delay) {
      let timeoutId;

      return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          fn(...args);
        }, delay);
      };
    }

    let callCount = 0;
    const debounced = debounce(() => {
      callCount++;
    }, 100);

    // 快速多次调用，只有最后一次会执行
    debounced();
    debounced();
    debounced();

    // 等待执行
    // 注意: 在测试中需要使用真实的时间延迟
    // 这里只是展示概念
    expect(callCount).toBe(0);
  });

  test("综合题5: 节流 (Throttle)", () => {
    function throttle(fn, delay) {
      let lastCall = 0;
      let timeoutId;

      return function(...args) {
        const now = Date.now();
        const remaining = delay - (now - lastCall);

        if (remaining <= 0) {
          if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
          }
          lastCall = now;
          fn(...args);
        } else if (!timeoutId) {
          timeoutId = setTimeout(() => {
            lastCall = Date.now();
            timeoutId = null;
            fn(...args);
          }, remaining);
        }
      };
    }

    let callCount = 0;
    const throttled = throttle(() => {
      callCount++;
    }, 100);

    // 概念测试
    expect(typeof throttled).toBe("function");
  });

  test("综合题6: 偏函数 (Partial Application)", () => {
    function partial(fn, ...presetArgs) {
      return function(...laterArgs) {
        return fn(...presetArgs, ...laterArgs);
      };
    }

    function multiply(a, b, c) {
      return a * b * c;
    }

    const double = partial(multiply, 2);
    const timesSix = partial(double, 3);

    expect(double(5, 10)).toBe(100);  // 2 * 5 * 10
    expect(timesSix(5)).toBe(30);     // 2 * 3 * 5
  });

  test("综合题7: 惰性求值", () => {
    function lazy(fn) {
      let cached = false;
      let result;

      return function() {
        if (!cached) {
          result = fn();
          cached = true;
        }
        return result;
      };
    }

    let callCount = 0;
    const expensive = lazy(() => {
      callCount++;
      return "expensive result";
    });

    expect(callCount).toBe(0);

    expect(expensive()).toBe("expensive result");
    expect(callCount).toBe(1);

    expect(expensive()).toBe("expensive result");
    expect(callCount).toBe(1);  // 没有重复调用
  });

  test("综合题8: 函数重载模拟", () => {
    function createPerson(nameOrConfig, age) {
      // 支持两种调用方式
      if (typeof nameOrConfig === "object") {
        const { name, age: personAge } = nameOrConfig;
        return { name, age: personAge };
      }
      return { name: nameOrConfig, age };
    }

    expect(createPerson("Alice", 30)).toEqual({ name: "Alice", age: 30 });
    expect(createPerson({ name: "Bob", age: 25 })).toEqual({ name: "Bob", age: 25 });
  });

  test("综合题9: 链式调用", () => {
    class Calculator {
      constructor(value = 0) {
        this.value = value;
      }

      add(n) {
        this.value += n;
        return this;
      }

      subtract(n) {
        this.value -= n;
        return this;
      }

      multiply(n) {
        this.value *= n;
        return this;
      }

      divide(n) {
        this.value /= n;
        return this;
      }

      getResult() {
        return this.value;
      }
    }

    const result = new Calculator(10)
      .add(5)
      .multiply(2)
      .subtract(5)
      .divide(3)
      .getResult();

    expect(result).toBe(15);  // ((10 + 5) * 2 - 5) / 3 = 25
  });

  test("综合题10: 函数式编程工具", () => {
    const FP = {
      // Map
      map(arr, fn) {
        const result = [];
        for (const item of arr) {
          result.push(fn(item));
        }
        return result;
      },

      // Filter
      filter(arr, predicate) {
        const result = [];
        for (const item of arr) {
          if (predicate(item)) {
            result.push(item);
          }
        }
        return result;
      },

      // Reduce
      reduce(arr, fn, initial) {
        let accumulator = initial;
        for (const item of arr) {
          accumulator = fn(accumulator, item);
        }
        return accumulator;
      },

      // Find
      find(arr, predicate) {
        for (const item of arr) {
          if (predicate(item)) {
            return item;
          }
        }
        return undefined;
      },

      // Every
      every(arr, predicate) {
        for (const item of arr) {
          if (!predicate(item)) {
            return false;
          }
        }
        return true;
      },

      // Some
      some(arr, predicate) {
        for (const item of arr) {
          if (predicate(item)) {
            return true;
          }
        }
        return false;
      }
    };

    const numbers = [1, 2, 3, 4, 5];

    expect(FP.map(numbers, x => x * 2)).toEqual([2, 4, 6, 8, 10]);
    expect(FP.filter(numbers, x => x > 2)).toEqual([3, 4, 5]);
    expect(FP.reduce(numbers, (sum, x) => sum + x, 0)).toBe(15);
    expect(FP.find(numbers, x => x > 3)).toBe(4);
    expect(FP.every(numbers, x => x > 0)).toBe(true);
    expect(FP.some(numbers, x => x > 4)).toBe(true);
  });
});

console.log("🎯 模块04 - 函数基础练习完成！");
