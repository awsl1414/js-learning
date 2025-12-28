/**
 * 模块 11: 类与对象 - 基础练习
 *
 * 学习目标:
 * - 掌握类的定义和使用
 * - 理解继承和多态
 * - 熟练使用 getter/setter
 * - 掌握静态方法和属性
 */

import { test, expect, describe } from "bun:test";

describe("模块11 - 类与对象基础练习", () => {

  test("任务1: 类的定义", () => {
    // TODO: 定义一个 Person 类
    // 提示：使用 class 关键字，包含 constructor 和 greet 方法
    class Person {
      // ???
    }

    const person = new Person("Alice", 30);
    expect(person.name).toBe("Alice");
    expect(person.greet()).toBe("Hello, I'm Alice");
  });

  test("任务2: 继承", () => {
    // TODO: 定义 Animal 类和 Dog 类
    // 提示：使用 extends 关键字实现继承
    class Animal {
      // ???
    }

    class Dog extends Animal {
      // ???
    }

    const dog = new Dog("Buddy");
    expect(dog.speak()).toBe("Buddy barks");
  });

  test("任务3: super 关键字", () => {
    // TODO: 使用 super 关键字调用父类方法
    class Parent {
      constructor(name) {
        this.name = name;
      }

      greet() {
        return `Hello from ${this.name}`;
      }
    }

    class Child extends Parent {
      constructor(name, age) {
        // 使用 super 调用父类构造函数
        // ???
      }

      greet() {
        // 使用 super 调用父类方法
        // ???
      }
    }

    const child = new Child("Alice", 30);
    expect(child.greet()).toBe("Hello from Alice (30)");
  });

  test("任务4: Getter 和 Setter", () => {
    // TODO: 为 Circle 类添加 getter 和 setter
    class Circle {
      constructor(radius) {
        this._radius = radius;
      }

      // 添加 radius getter
      // ???

      // 添加 radius setter，验证值必须大于 0
      // ???

      // 添加 area getter，计算圆面积
      // ???
    }

    const circle = new Circle(5);
    expect(circle.area).toBeCloseTo(78.54, 1);

    circle.radius = 10;
    expect(circle.radius).toBe(10);
  });

  test("任务5: 静态方法", () => {
    // TODO: 创建静态方法 add 和 multiply
    class Math {
      // ???
    }

    expect(Math.add(2, 3)).toBe(5);
    expect(Math.multiply(4, 5)).toBe(20);
  });

  test("任务6: 静态属性", () => {
    // TODO: 创建 Counter 类，使用静态属性计数
    class Counter {
      // ???
    }

    new Counter();
    new Counter();
    new Counter();

    expect(Counter.getCount()).toBe(3);
  });

  test("任务7: 私有字段", () => {
    // TODO: 使用 # 创建私有字段
    class BankAccount {
      // ???
    }

    const account = new BankAccount(100);
    account.deposit(50);
    expect(account.getBalance()).toBe(150);
  });

  test("任务8: 字段声明", () => {
    // TODO: 在类体中声明字段
    class Person {
      // ???
    }

    const person = new Person("Alice", 30);
    expect(person.name).toBe("Alice");
  });

  test("任务9: 方法绑定", () => {
    // TODO: 使用箭头函数绑定方法
    class Button {
      constructor(label) {
        this.label = label;
        this.clickCount = 0;
        // 使用箭头函数定义方法
        // ???
      }
    }

    const button = new Button("Click me");
    const fn = button.handleClick;
    expect(fn()).toBe("Click me");
    expect(button.clickCount).toBe(1);
  });

  test("任务10: 类表达式", () => {
    // TODO: 使用类表达式创建 Person
    const Person = undefined;

    const person = new Person("Alice");
    expect(person.greet()).toBe("Hello, Alice");
  });

  test("任务11: instanceof", () => {
    // TODO: 创建类并使用 instanceof 检查
    class Person {}
    class Dog {}

    const person = new Person();
    const dog = new Dog();

    expect(person instanceof Person).toBe(true);
    expect(person instanceof Dog).toBe(false);
  });

  test("任务12: 对象 instanceof", () => {
    // TODO: 使用 instanceof 检查内置类型
    // [] instanceof Array
    expect([] instanceof Array).toBe(???);
    expect({} instanceof Object).toBe(???);
    expect(/test/ instanceof RegExp).toBe(???);
  });

  test("任务13: 类检查", () => {
    // TODO: 使用 constructor 和 Object.getPrototypeOf
    class Person {}

    const person = new Person();

    // 使用 constructor
    expect(person.constructor).toBe(???);

    // 使用 Object.getPrototypeOf
    expect(Object.getPrototypeOf(person)).toBe(???);
  });

  test("任务14: 混入模式", () => {
    // TODO: 创建混入对象并混入到类中
    const Serializable = {
      // ???
    };

    const Validatable = {
      // ???
    };

    class User {
      constructor(name) {
        this.name = name;
      }
    }

    // 使用 Object.assign 混入方法
    // ???

    const user = new User("Alice");
    expect(user.serialize()).toContain("Alice");
    expect(user.isValid()).toBe(true);
  });

  // 综合练习
  test("综合题1: 链式调用", () => {
    // TODO: 实现 QueryBuilder 类支持链式调用
    class QueryBuilder {
      constructor() {
        this.query = {
          select: [],
          where: [],
          limit: null
        };
      }

      // 实现 select 方法，返回 this
      // ???

      // 实现 where 方法，返回 this
      // ???

      // 实现 limit 方法，返回 this
      // ???

      // 实现 build 方法
      // ???
    }

    const query = new QueryBuilder()
      .select("name", "email")
      .where({ age: 30 })
      .limit(10)
      .build();

    expect(query.select).toEqual(["name", "email"]);
  });
});

console.log("🎯 模块11 - 类与对象基础练习完成！");
