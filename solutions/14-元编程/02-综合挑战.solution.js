/**
 * 模块 14: 元编程 - 综合挑战 (参考答案)
 */

import { test, expect, describe } from "bun:test";

describe("模块14 - 元编程综合挑战", () => {

  test("挑战1: 响应式对象", () => {
    function reactive(obj, callback) {
      return new Proxy(obj, {
        set(target, property, value) {
          const oldValue = target[property];
          target[property] = value;
          callback(property, value, oldValue);
          return true;
        }
      });
    }

    const changes = [];
    const data = reactive({ name: "Alice", age: 30 }, (prop, newVal, oldVal) => {
      changes.push({ prop, newVal, oldVal });
    });

    data.name = "Bob";
    data.age = 31;

    expect(changes).toHaveLength(2);
    expect(changes[0]).toEqual({ prop: "name", newVal: "Bob", oldVal: "Alice" });
  });

  test("挑战2: 观察对象", () => {
    function observe(obj, handler) {
      const handlers = new Map();

      const proxy = new Proxy(obj, {
        get(target, property) {
          if (typeof target[property] === "object" && target[property] !== null) {
            if (!handlers.has(property)) {
              handlers.set(property, new Map());
            }
          }
          return target[property];
        },
        set(target, property, value) {
          const result = Reflect.set(target, property, value);
          handler(property, value);
          return result;
        }
      });

      return proxy;
    }

    const log = [];
    const data = observe({ user: { name: "Alice" } }, (prop, val) => {
      log.push(`${prop} = ${val}`);
    });

    data.user.name = "Bob";
    expect(log).toContain("name = Bob");
  });

  test("挑战3: 不可变对象", () => {
    function immutable(obj) {
      return new Proxy(obj, {
        set() {
          throw new TypeError("Cannot modify immutable object");
        },
        deleteProperty() {
          throw new TypeError("Cannot delete from immutable object");
        }
      });
    }

    const obj = immutable({ a: 1, b: 2 });

    expect(() => { obj.c = 3; }).toThrow(TypeError);
    expect(() => { delete obj.a; }).toThrow(TypeError);
  });

  test("挑战4: 私有字段代理", () => {
    const privateData = new WeakMap();

    function withPrivateData(Class) {
      return new Proxy(Class, {
        construct(target, args) {
          const instance = Reflect.construct(target, args);
          privateData.set(instance, {});
          return instance;
        }
      });
    }

    const SecureClass = withPrivateData(class {
      constructor(value) {
        this.public = value;
      }
    });

    // 概念演示
    expect(typeof SecureClass).toBe("function");
  });
});

console.log("🎯 模块14 - 元编程综合挑战完成！");
