/**
 * 模块 06: 对象操作 - 基础练习
 *
 * 学习目标:
 * - 掌握对象创建和属性访问
 * - 熟练使用对象方法
 * - 理解原型链
 * - 掌握对象解构和展开
 *
 * 提示: 遇到困难时可以查看 solutions/06-对象操作/01-对象基础练习.solution.js
 */

import { test, expect, describe } from "bun:test";

describe("模块06 - 对象基础练习", () => {

  test("任务1: 对象创建", () => {
    // TODO: 使用对象字面量创建一个对象
    const person1 = {
      name: "Alice",
      age: 30
    };

    // TODO: 使用 new Object() 创建对象并添加属性
    const person2 = new Object();
    person2.name = ???;  // 添加 name 属性为 "Bob"
    person2.age = ???;   // 添加 age 属性为 25

    // TODO: 使用 Object.create() 创建对象，指定原型
    const prototype = { greet: function() { return "Hello"; } };
    const person3 = Object.create(???);
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

    // TODO: 使用点表示法访问 name 属性
    expect(obj.name).toBe("Alice");

    // TODO: 使用括号表示法访问 age 属性
    expect(obj[???]).toBe(30);

    // TODO: 访问带空格的属性名
    expect(obj[???]).toBe("Alice Smith");

    // TODO: 使用动态变量访问属性
    const key = "name";
    expect(obj[???]).toBe("Alice");
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

    // TODO: 使用可选链访问嵌套属性
    expect(user?.profile?.name).toBe("Alice");
    expect(user?.profile?.address?.city).toBe(???);
    expect(user?.missing?.property).toBeUndefined();

    // TODO: 使用可选链调用方法
    const obj = {
      method: () => "result"
    };
    expect(obj.method?.()).toBe(???);
    expect(obj.nonExistent?.()).toBeUndefined();
  });

  test("任务4: 属性存在性检查", () => {
    const obj = { name: "Alice", age: 30 };

    // TODO: 使用 in 操作符检查属性
    expect("name" in obj).toBe(???);
    expect("email" in obj).toBe(???);

    // TODO: 使用 hasOwnProperty 方法
    expect(obj.hasOwnProperty("name")).toBe(???);
    expect(obj.hasOwnProperty("toString")).toBe(???);  // 继承的

    // TODO: 使用 Object.hasOwn (ES2022)
    expect(Object.hasOwn(obj, "name")).toBe(???);
    expect(Object.hasOwn(obj, "toString")).toBe(???);
  });

  test("任务5: 对象解构", () => {
    const user = {
      name: "Alice",
      age: 30,
      city: "NYC"
    };

    // TODO: 解构 name 和 age 属性
    const { name, age } = user;
    expect(name).toBe("Alice");
    expect(age).toBe(???);

    // TODO: 解构并重命名属性
    const { name: userName, age: userAge } = user;
    expect(userName).toBe("Alice");

    // TODO: 解构并设置默认值
    const { name: n, country = "USA" } = user;
    expect(country).toBe(???);

    // TODO: 使用剩余属性解构
    const { city, ...rest } = user;
    expect(rest).toEqual({ name: "Alice", age: ??? });
  });

  test("任务6: 对象展开", () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { c: 3, d: 4 };

    // TODO: 使用展开运算符合并对象
    const merged = { ...obj1, ...obj2 };
    expect(merged).toEqual({ a: 1, b: 2, c: 3, d: ??? });

    // TODO: 使用展开运算符覆盖属性
    const withOverride = { ...obj1, b: 20 };
    expect(withOverride).toEqual({ a: 1, b: ??? });

    // TODO: 使用展开运算符复制对象
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

    // TODO: 使用 Object.keys 获取所有键
    expect(Object.keys(obj)).toEqual([???]);

    // TODO: 使用 Object.values 获取所有值
    expect(Object.values(obj)).toEqual(["Alice", 30, obj.greet]);

    // TODO: 使用 Object.entries 获取键值对数组
    const entries = Object.entries(obj);
    expect(entries[0]).toEqual([???]);

    // TODO: 使用 Object.fromEntries 从键值对数组创建对象
    const fromEntries = Object.fromEntries([["a", 1], ["b", 2]]);
    expect(fromEntries).toEqual({ a: 1, b: ??? });
  });

  test("任务8: 对象赋值", () => {
    const target = { a: 1 };
    const source1 = { b: 2 };
    const source2 = { c: 3 };

    // TODO: 使用 Object.assign 合并对象
    const result = Object.assign(target, source1, source2);
    expect(target).toEqual({ a: 1, b: 2, c: ??? });
    expect(result).toBe(target);  // 返回目标对象

    // TODO: 使用展开运算符合并（不修改原对象）
    const target2 = { a: 1 };
    const merged = { ...target2, ...source1 };
    expect(target2).toEqual({ a: ??? });  // 不变
  });

  test("任务9: 对象冻结和密封", () => {
    // TODO: 冻结对象
    const frozen = Object.freeze({ a: 1, b: 2 });
    expect(Object.isFrozen(frozen)).toBe(???);

    // 严格模式下会报错，非严格模式静默失败
    frozen.c = 3;
    expect(frozen.c).toBeUndefined();

    // TODO: 密封对象
    const sealed = Object.seal({ a: 1, b: 2 });
    expect(Object.isSealed(sealed)).toBe(???);

    sealed.a = 10;  // 可以修改
    expect(sealed.a).toBe(???);

    sealed.c = 3;   // 不能添加
    expect(sealed.c).toBeUndefined();
  });

  test("任务10: 原型链", () => {
    function Person(name) {
      this.name = name;
    }

    // TODO: 在 Person.prototype 上添加 greet 方法
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

      // TODO: 使用方法简写语法
      greet() {
        return `Hello, I'm ${this.name}`;
      },

      // TODO: 添加 getter
      get info() {
        return `${this.name} is ${this.age} years old`;
      },

      // TODO: 添加 setter
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

    // TODO: 使用计算属性名创建对象
    const obj = {
      [key]: value,
      ["computed_" + key]: "result"
    };

    expect(obj.dynamic).toBe("value");
    expect(obj.computed_dynamic).toBe(???);
  });

  test("任务13: 对象比较", () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, b: 2 };
    const obj3 = obj1;

    // TODO: 理解对象引用比较
    expect(obj1 === obj2).toBe(???);
    expect(obj1 === obj3).toBe(???);

    // TODO: 实现浅相等比较函数
    function shallowEqual(a, b) {
      const keysA = Object.keys(a);
      const keysB = Object.keys(b);

      if (keysA.length !== keysB.length) return false;

      return keysA.every(key => a[key] === b[key]);
    }

    expect(shallowEqual(obj1, obj2)).toBe(???);
  });

  test("任务14: 对象遍历", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const keys = [];
    const values = [];

    // TODO: 使用 for...in 遍历对象
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        keys.push(key);
      }
    }
    expect(keys).toEqual(["a", "b", "c"]);

    // TODO: 使用 Object.keys + forEach 遍历
    Object.keys(obj).forEach(key => {
      values.push(obj[key]);
    });
    expect(values).toEqual([1, 2, 3]);
  });

  test("任务15: Object.is", () => {
    // TODO: 理解 Object.is 与 === 的区别
    expect(Object.is(NaN, NaN)).toBe(???);
    expect(NaN === NaN).toBe(false);

    expect(Object.is(+0, -0)).toBe(???);
    expect(+0 === -0).toBe(true);

    expect(Object.is(null, undefined)).toBe(???);
  });
});

console.log("🎯 模块06 - 对象基础练习完成！");
