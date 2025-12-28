/**
 * 模块 14: 元编程 - 基础练习 (参考答案)
 */

import { test, expect, describe } from "bun:test";

describe("模块14 - 元编程基础练习", () => {

  test("任务1: Proxy 基础", () => {
    const target = {
      name: "Alice",
      age: 30
    };

    const proxy = new Proxy(target, {
      get(target, property) {
        return target[property];
      }
    });

    expect(proxy.name).toBe("Alice");
  });

  test("任务2: Proxy 拦截 set", () => {
    const validator = {
      set(target, property, value) {
        if (property === "age" && typeof value !== "number") {
          throw new TypeError("Age must be a number");
        }
        target[property] = value;
        return true;
      }
    };

    const person = new Proxy({}, validator);
    person.age = 30;
    expect(person.age).toBe(30);

    expect(() => { person.age = "30"; }).toThrow(TypeError);
  });

  test("任务3: Reflect API", () => {
    const obj = { name: "Alice" };

    // Reflect.get
    expect(Reflect.get(obj, "name")).toBe("Alice");

    // Reflect.set
    Reflect.set(obj, "age", 30);
    expect(obj.age).toBe(30);

    // Reflect.has
    expect(Reflect.has(obj, "name")).toBe(true);

    // Reflect.ownKeys
    expect(Reflect.ownKeys(obj)).toEqual(["name", "age"]);
  });

  test("任务4: Symbol 基础", () => {
    const id = Symbol("id");
    const obj = {
      [id]: "unique",
      name: "Alice"
    };

    expect(obj[id]).toBe("unique");
    expect(Object.keys(obj)).toEqual(["name"]);  // Symbol 不会被枚举
  });

  test("任务5: 内置 Symbol", () => {
    // Symbol.iterator
    const iterable = {
      data: [1, 2, 3],
      [Symbol.iterator]() {
        let index = 0;
        return {
          next: () => {
            if (index < this.data.length) {
              return { value: this.data[index++], done: false };
            }
            return { done: true };
          }
        };
      }
    };

    expect([...iterable]).toEqual([1, 2, 3]);

    // Symbol.toStringTag
    const obj = {
      [Symbol.toStringTag]: "MyObject"
    };

    expect(Object.prototype.toString.call(obj)).toBe("[object MyObject]");
  });

  test("任务6: Proxy has 拦截", () => {
    const proxy = new Proxy({}, {
      has(target, property) {
        return property.startsWith("secret_");
      }
    });

    expect("secret_key" in proxy).toBe(true);
    expect("public_key" in proxy).toBe(false);
  });

  test("任务7: Proxy deleteProperty", () => {
    const logged = [];
    const proxy = new Proxy({ a: 1, b: 2 }, {
      deleteProperty(target, property) {
        logged.push(`Deleting ${property}`);
        delete target[property];
        return true;
      }
    });

    delete proxy.a;
    expect(logged).toContain("Deleting a");
  });

  test("任务8: Reflect.apply", () => {
    function greet(greeting, name) {
      return `${greeting}, ${name}!`;
    }

    expect(Reflect.apply(greet, null, ["Hello", "Alice"])).toBe("Hello, Alice!");
  });

  test("任务9: 类装饰器模拟", () => {
    function logged(Class) {
      return class extends Class {
        constructor(...args) {
          super(...args);
          console.log(`Created ${Class.name}`);
        }
      };
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
    function readOnly(obj) {
      return new Proxy(obj, {
        set(target, property) {
          console.warn(`Cannot set ${property}`);
          return true;
        },
        deleteProperty(target, property) {
          console.warn(`Cannot delete ${property}`);
          return true;
        }
      });
    }

    const obj = readOnly({ name: "Alice" });
    obj.name = "Bob";  // 静默失败
    expect(obj.name).toBe("Alice");
  });

  test("综合题2: 验证代理", () => {
    function createValidator(schema) {
      return new Proxy({}, {
        set(target, property, value) {
          const rules = schema[property];
          if (!rules) {
            target[property] = value;
            return true;
          }

          if (rules.type && typeof value !== rules.type) {
            throw new TypeError(`${property} must be ${rules.type}`);
          }

          if (rules.validate && !rules.validate(value)) {
            throw new Error(`${property} is invalid`);
          }

          target[property] = value;
          return true;
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
