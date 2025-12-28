/**
 * 模块 11: 类与对象 - 基础练习 (参考答案)
 */

import { test, expect, describe } from "bun:test";

describe("模块11 - 类与对象基础练习", () => {

  test("任务1: 类的定义", () => {
    class Person {
      constructor(name, age) {
        this.name = name;
        this.age = age;
      }

      greet() {
        return `Hello, I'm ${this.name}`;
      }
    }

    const person = new Person("Alice", 30);
    expect(person.name).toBe("Alice");
    expect(person.greet()).toBe("Hello, I'm Alice");
  });

  test("任务2: 继承", () => {
    class Animal {
      constructor(name) {
        this.name = name;
      }

      speak() {
        return `${this.name} makes a sound`;
      }
    }

    class Dog extends Animal {
      speak() {
        return `${this.name} barks`;
      }
    }

    const dog = new Dog("Buddy");
    expect(dog.speak()).toBe("Buddy barks");
  });

  test("任务3: super 关键字", () => {
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
        super(name);
        this.age = age;
      }

      greet() {
        return super.greet() + ` (${this.age})`;
      }
    }

    const child = new Child("Alice", 30);
    expect(child.greet()).toBe("Hello from Alice (30)");
  });

  test("任务4: Getter 和 Setter", () => {
    class Circle {
      constructor(radius) {
        this._radius = radius;
      }

      get radius() {
        return this._radius;
      }

      set radius(value) {
        if (value > 0) {
          this._radius = value;
        }
      }

      get area() {
        return Math.PI * this._radius * this._radius;
      }
    }

    const circle = new Circle(5);
    expect(circle.area).toBeCloseTo(78.54, 1);

    circle.radius = 10;
    expect(circle.radius).toBe(10);
  });

  test("任务5: 静态方法", () => {
    class Math {
      static add(a, b) {
        return a + b;
      }

      static multiply(a, b) {
        return a * b;
      }
    }

    expect(Math.add(2, 3)).toBe(5);
    expect(Math.multiply(4, 5)).toBe(20);
  });

  test("任务6: 静态属性", () => {
    class Counter {
      static count = 0;

      constructor() {
        Counter.count++;
      }

      static getCount() {
        return Counter.count;
      }
    }

    new Counter();
    new Counter();
    new Counter();

    expect(Counter.getCount()).toBe(3);
  });

  test("任务7: 私有字段", () => {
    class BankAccount {
      #balance;

      constructor(initialBalance) {
        this.#balance = initialBalance;
      }

      deposit(amount) {
        this.#balance += amount;
      }

      getBalance() {
        return this.#balance;
      }
    }

    const account = new BankAccount(100);
    account.deposit(50);
    expect(account.getBalance()).toBe(150);
  });

  test("任务8: 字段声明", () => {
    class Person {
      name = "Unknown";
      age = 0;

      constructor(name, age) {
        this.name = name;
        this.age = age;
      }
    }

    const person = new Person("Alice", 30);
    expect(person.name).toBe("Alice");
  });

  test("任务9: 方法绑定", () => {
    class Button {
      constructor(label) {
        this.label = label;
        this.clickCount = 0;
      }

      handleClick = () => {
        this.clickCount++;
        return this.label;
      };
    }

    const button = new Button("Click me");
    const fn = button.handleClick;
    expect(fn()).toBe("Click me");
    expect(button.clickCount).toBe(1);
  });

  test("任务10: 类表达式", () => {
    const Person = class {
      constructor(name) {
        this.name = name;
      }

      greet() {
        return `Hello, ${this.name}`;
      }
    };

    const person = new Person("Alice");
    expect(person.greet()).toBe("Hello, Alice");
  });

  test("任务11: instanceof", () => {
    class Person {}
    class Dog {}

    const person = new Person();
    const dog = new Dog();

    expect(person instanceof Person).toBe(true);
    expect(person instanceof Dog).toBe(false);
  });

  test("任务12: 对象 instanceof", () => {
    expect([] instanceof Array).toBe(true);
    expect({} instanceof Object).toBe(true);
    expect(/test/ instanceof RegExp).toBe(true);
  });

  test("任务13: 类检查", () => {
    class Person {}

    const person = new Person();

    expect(person.constructor).toBe(Person);
    expect(Object.getPrototypeOf(person)).toBe(Person.prototype);
  });

  test("任务14: 混入模式", () => {
    const Serializable = {
      serialize() {
        return JSON.stringify(this);
      }
    };

    const Validatable = {
      isValid() {
        return true;
      }
    };

    class User {
      constructor(name) {
        this.name = name;
      }
    }

    Object.assign(User.prototype, Serializable, Validatable);

    const user = new User("Alice");
    expect(user.serialize()).toContain("Alice");
    expect(user.isValid()).toBe(true);
  });

  test("综合题1: 链式调用", () => {
    class QueryBuilder {
      constructor() {
        this.query = {
          select: [],
          where: [],
          limit: null
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

      limit(n) {
        this.query.limit = n;
        return this;
      }

      build() {
        return { ...this.query };
      }
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
