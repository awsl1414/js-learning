/**
 * 模块 06: 对象操作 - 基础练习 (答案)
 *
 * 这是参考答案文件，用于对比和检查你的练习结果
 */

import { test, expect, describe } from "bun:test";

describe("模块06 - 对象基础练习 (答案)", () => {

  test("任务1: 对象创建", () => {
    // 对象字面量
    const person1 = {
      name: "Alice",
      age: 30
    };

    // new Object()
    const person2 = new Object();
    person2.name = "Bob";
    person2.age = 25;

    // Object.create()
    const prototype = { greet: function() { return "Hello"; } };
    const person3 = Object.create(prototype);
    person3.name = "Charlie";

    expect(person1.name).toBe("Alice");
    expect(person2.age).toBe(25);
    expect(person3.greet()).toBe("Hello");
  });

  test("任务2: 属性访问", () => {
    const obj = {
      name: "Alice",
      "age": 30,
      "full name": "Alice Smith"
    };

    // 点表示法
    expect(obj.name).toBe("Alice");

    // 括号表示法
    expect(obj["age"]).toBe(30);

    // 必须使用括号的情况
    expect(obj["full name"]).toBe("Alice Smith");

    // 动态属性
    const key = "name";
    expect(obj[key]).toBe("Alice");
  });

  test("任务3: 可选链操作符 (?.)", () => {
    const user = {
      profile: {
        name: "Alice",
        address: {
          city: "NYC"
        }
      }
    };

    expect(user?.profile?.name).toBe("Alice");
    expect(user?.profile?.address?.city).toBe("NYC");
    expect(user?.missing?.property).toBeUndefined();

    // 可选调用
    const obj = {
      method: () => "result"
    };
    expect(obj.method?.()).toBe("result");
    expect(obj.nonExistent?.()).toBeUndefined();
  });

  test("任务4: 属性存在性检查", () => {
    const obj = { name: "Alice", age: 30 };

    // in 操作符
    expect("name" in obj).toBe(true);
    expect("email" in obj).toBe(false);

    // hasOwnProperty
    expect(obj.hasOwnProperty("name")).toBe(true);
    expect(obj.hasOwnProperty("toString")).toBe(false);  // 继承的

    // Object.hasOwn - ES2022
    expect(Object.hasOwn(obj, "name")).toBe(true);
    expect(Object.hasOwn(obj, "toString")).toBe(false);
  });

  test("任务5: 对象解构", () => {
    const user = {
      name: "Alice",
      age: 30,
      city: "NYC"
    };

    // 基本解构
    const { name, age } = user;
    expect(name).toBe("Alice");
    expect(age).toBe(30);

    // 重命名
    const { name: userName, age: userAge } = user;
    expect(userName).toBe("Alice");

    // 默认值
    const { name: n, country = "USA" } = user;
    expect(country).toBe("USA");

    // 剩余
    const { city, ...rest } = user;
    expect(rest).toEqual({ name: "Alice", age: 30 });
  });

  test("任务6: 对象展开", () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { c: 3, d: 4 };

    // 合并
    const merged = { ...obj1, ...obj2 };
    expect(merged).toEqual({ a: 1, b: 2, c: 3, d: 4 });

    // 覆盖
    const withOverride = { ...obj1, b: 20 };
    expect(withOverride).toEqual({ a: 1, b: 20 });

    // 复制 (浅拷贝)
    const copy = { ...obj1 };
    expect(copy).toEqual(obj1);
    expect(copy).not.toBe(obj1);
  });

  test("任务7: Object 静态方法", () => {
    const obj = {
      name: "Alice",
      age: 30,
      greet() { return "Hello"; }
    };

    // Object.keys
    expect(Object.keys(obj)).toEqual(["name", "age", "greet"]);

    // Object.values
    expect(Object.values(obj)).toEqual(["Alice", 30, obj.greet]);

    // Object.entries
    const entries = Object.entries(obj);
    expect(entries[0]).toEqual(["name", "Alice"]);

    // Object.fromEntries
    const fromEntries = Object.fromEntries([["a", 1], ["b", 2]]);
    expect(fromEntries).toEqual({ a: 1, b: 2 });
  });

  test("任务8: 对象赋值", () => {
    const target = { a: 1 };
    const source1 = { b: 2 };
    const source2 = { c: 3 };

    // Object.assign (修改目标)
    const result = Object.assign(target, source1, source2);
    expect(target).toEqual({ a: 1, b: 2, c: 3 });
    expect(result).toBe(target);  // 返回目标对象

    // 不修改目标
    const target2 = { a: 1 };
    const merged = { ...target2, ...source1 };
    expect(target2).toEqual({ a: 1 });  // 不变
  });

  test("任务9: 对象冻结和密封", () => {
    // Object.freeze
    const frozen = Object.freeze({ a: 1, b: 2 });
    expect(Object.isFrozen(frozen)).toBe(true);

    // 严格模式下会报错，非严格模式静默失败
    frozen.c = 3;
    expect(frozen.c).toBeUndefined();

    // Object.seal
    const sealed = Object.seal({ a: 1, b: 2 });
    expect(Object.isSealed(sealed)).toBe(true);

    sealed.a = 10;  // 可以修改
    expect(sealed.a).toBe(10);

    sealed.c = 3;   // 不能添加
    expect(sealed.c).toBeUndefined();
  });

  test("任务10: 原型链", () => {
    function Person(name) {
      this.name = name;
    }

    Person.prototype.greet = function() {
      return "Hello, " + this.name;
    };

    const alice = new Person("Alice");

    expect(alice.greet()).toBe("Hello, Alice");
    expect(alice.constructor).toBe(Person);
    expect(Object.getPrototypeOf(alice)).toBe(Person.prototype);
  });

  // 更多练习...
  test("任务11: 对象方法", () => {
    const obj = {
      name: "Alice",
      age: 30,

      // 方法简写
      greet() {
        return `Hello, I'm ${this.name}`;
      },

      // Getter
      get info() {
        return `${this.name} is ${this.age} years old`;
      },

      // Setter
      set setName(name) {
        this.name = name;
      }
    };

    expect(obj.greet()).toBe("Hello, I'm Alice");
    expect(obj.info).toBe("Alice is 30 years old");

    obj.setName = "Bob";
    expect(obj.name).toBe("Bob");
  });

  test("任务12: 计算属性名", () => {
    const key = "dynamic";
    const value = "value";

    const obj = {
      [key]: value,
      ["computed_" + key]: "result"
    };

    expect(obj.dynamic).toBe("value");
    expect(obj.computed_dynamic).toBe("result");
  });

  test("任务13: 对象比较", () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, b: 2 };
    const obj3 = obj1;

    // 引用比较
    expect(obj1 === obj2).toBe(false);
    expect(obj1 === obj3).toBe(true);

    // 浅相等
    function shallowEqual(a, b) {
      const keysA = Object.keys(a);
      const keysB = Object.keys(b);

      if (keysA.length !== keysB.length) return false;

      return keysA.every(key => a[key] === b[key]);
    }

    expect(shallowEqual(obj1, obj2)).toBe(true);
  });

  test("任务14: 对象遍历", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const keys = [];
    const values = [];

    // for...in
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        keys.push(key);
      }
    }
    expect(keys).toEqual(["a", "b", "c"]);

    // Object.keys + forEach
    Object.keys(obj).forEach(key => {
      values.push(obj[key]);
    });
    expect(values).toEqual([1, 2, 3]);
  });

  test("任务15: Object.is", () => {
    // 与 === 的区别
    expect(Object.is(NaN, NaN)).toBe(true);
    expect(NaN === NaN).toBe(false);

    expect(Object.is(+0, -0)).toBe(false);
    expect(+0 === -0).toBe(true);

    expect(Object.is(null, undefined)).toBe(false);
  });
});

console.log("🎯 模块06 - 对象基础练习答案完成！");
