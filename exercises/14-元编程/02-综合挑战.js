/**
 * 模块 14: 元编程 - 综合挑战
 */

import { test, expect, describe } from "bun:test";

describe("模块14 - 元编程综合挑战", () => {

  test("挑战1: 响应式对象", () => {
    // TODO: 实现类似 Vue 的响应式系统
    function reactive(obj, callback) {
      // ???
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
    // TODO: 实现深度观察
    function observe(obj, handler) {
      // ???
    }

    const log = [];
    const data = observe({ user: { name: "Alice" } }, (prop, val) => {
      log.push(`${prop} = ${val}`);
    });

    data.user.name = "Bob";
    expect(log).toContain("name = Bob");
  });

  test("挑战3: 不可变对象", () => {
    // TODO: 实现深度不可变代理
    function immutable(obj) {
      // ???
    }

    const obj = immutable({ a: 1, b: 2 });

    expect(() => { obj.c = 3; }).toThrow(TypeError);
    expect(() => { delete obj.a; }).toThrow(TypeError);
  });

  test("挑战4: 私有字段代理", () => {
    // TODO: 使用 WeakMap 实现私有数据
    const privateData = new WeakMap();

    function withPrivateData(Class) {
      // ???
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
