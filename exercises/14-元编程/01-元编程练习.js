/**
 * 模块 14: 元编程 - 基础练习
 *
 * 学习目标:
 * - 理解 Proxy 对象
 * - 掌握 Reflect API
 * - 理解 Symbol
 * - 掌握装饰器
 */

import { test, expect, describe } from "bun:test";

describe("模块14 - 元编程基础练习", () => {

  test("任务1: Proxy 基础", () => {
    // TODO: 创建一个拦截 get 操作的 Proxy
    const target = {
      name: "Alice",
      age: 30
    };

    const proxy = new Proxy(target, {
      // 实现 get 拦截器
      // ???
    });

    expect(proxy.name).toBe("Alice");
  });

  test("任务2: Proxy 拦截 set", () => {
    // TODO: 创建验证 age 必须是数字的 Proxy
    const validator = {
      set(target, property, value) {
        // ???
      }
    };

    const person = new Proxy({}, validator);
    person.age = 30;
    expect(person.age).toBe(30);

    expect(() => { person.age = "30"; }).toThrow(TypeError);
  });

  test("任务3: Reflect API", () => {
    // TODO: 使用 Reflect API 操作对象
    const obj = { name: "Alice" };

    // 使用 Reflect.get 获取属性
    expect(Reflect.get(obj, "name")).toBe("Alice");

    // 使用 Reflect.set 设置属性
    // ???

    // 使用 Reflect.has 检查属性
    // ???

    // 使用 Reflect.ownKeys 获取所有键
    // ???
  });

  test("任务4: Symbol 基础", () => {
    // TODO: 创建 Symbol 并作为对象属性
    const id = Symbol("id");
    const obj = {
      // ???
      name: "Alice"
    };

    expect(obj[id]).toBe("unique");
    expect(Object.keys(obj)).toEqual(["name"]);  // Symbol 不会被枚举
  });

  test("任务5: 内置 Symbol", () => {
    // TODO: 使用 Symbol.iterator 和 Symbol.toStringTag
    const iterable = {
      data: [1, 2, 3],
      [Symbol.iterator]() {
        // ???
      }
    };

    expect([...iterable]).toEqual([1, 2, 3]);

    const obj = {
      // 使用 Symbol.toStringTag 自定义类型标签
      // ???
    };

    expect(Object.prototype.toString.call(obj)).toBe("[object MyObject]");
  });

  test("任务6: Proxy has 拦截", () => {
    // TODO: 拦截 in 操作符
    const proxy = new Proxy({}, {
      has(target, property) {
        // ???
      }
    });

    expect("secret_key" in proxy).toBe(true);
    expect("public_key" in proxy).toBe(false);
  });

  test("任务7: Proxy deleteProperty", () => {
    // TODO: 拦截 delete 操作并记录日志
    const logged = [];
    const proxy = new Proxy({ a: 1, b: 2 }, {
      deleteProperty(target, property) {
        // ???
      }
    });

    delete proxy.a;
    expect(logged).toContain("Deleting a");
  });

  test("任务8: Reflect.apply", () => {
    // TODO: 使用 Reflect.apply 调用函数
    function greet(greeting, name) {
      return `${greeting}, ${name}!`;
    }

    // 使用 Reflect.apply 调用 greet
    // ???
  });

  test("任务9: 类装饰器模拟", () => {
    // TODO: 实现简单的类装饰器
    function logged(Class) {
      // 返回一个包装类
      // ???
    }

    @logged
    class Person {
      constructor(name) {
        this.name = name;
      }
    }

    // 注意: 需要启用装饰器支持
    // const person = new Person("Alice");
  });

  // 综合练习
  test("综合题1: 只读对象", () => {
    // TODO: 实现只读代理
    function readOnly(obj) {
      return new Proxy(obj, {
        set(target, property) {
          // ???
        },
        deleteProperty(target, property) {
          // ???
        }
      });
    }

    const obj = readOnly({ name: "Alice" });
    obj.name = "Bob";  // 静默失败
    expect(obj.name).toBe("Alice");
  });

  test("综合题2: 验证代理", () => {
    // TODO: 实现模式验证代理
    function createValidator(schema) {
      return new Proxy({}, {
        set(target, property, value) {
          // ???
        }
      });
    }

    const person = createValidator({
      age: { type: "number", validate: v => v >= 0 }
    });

    person.age = 30;
    expect(person.age).toBe(30);

    expect(() => { person.age = -5; }).toThrow(Error);
  });
});

console.log("🎯 模块14 - 元编程基础练习完成！");
