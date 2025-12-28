/**
 * 模块 11: 类与对象 - 综合挑战 (参考答案)
 */

import { test, expect, describe } from "bun:test";

describe("模块11 - 类与对象综合挑战", () => {

  test("挑战1: 观察者模式", () => {
    class Observable {
      constructor() {
        this.observers = [];
      }

      subscribe(observer) {
        this.observers.push(observer);
        return () => {
          this.observers = this.observers.filter(o => o !== observer);
        };
      }

      notify(data) {
        this.observers.forEach(observer => observer(data));
      }
    }

    const observable = new Observable();
    let results = [];

    const unsubscribe1 = observable.subscribe(data => results.push(`A: ${data}`));
    const unsubscribe2 = observable.subscribe(data => results.push(`B: ${data}`));

    observable.notify("test1");
    unsubscribe1();
    observable.notify("test2");

    expect(results).toEqual(["A: test1", "B: test1", "B: test2"]);
  });

  test("挑战2: 单例模式", () => {
    class Database {
      static instance = null;

      constructor() {
        if (Database.instance) {
          return Database.instance;
        }
        this.connection = "connected";
        Database.instance = this;
      }

      static getInstance() {
        if (!Database.instance) {
          Database.instance = new Database();
        }
        return Database.instance;
      }
    }

    const db1 = Database.getInstance();
    const db2 = Database.getInstance();

    expect(db1).toBe(db2);
  });

  test("挑战3: 工厂模式", () => {
    class CarFactory {
      static create(type) {
        switch (type) {
          case "sedan":
            return new Sedan();
          case "suv":
            return new SUV();
          default:
            throw new Error("Unknown type");
        }
      }
    }

    class Sedan {
      getType() { return "sedan"; }
    }

    class SUV {
      getType() { return "suv"; }
    }

    const car1 = CarFactory.create("sedan");
    const car2 = CarFactory.create("suv");

    expect(car1.getType()).toBe("sedan");
    expect(car2.getType()).toBe("suv");
  });

  test("挑战4: 策略模式", () => {
    class PaymentStrategy {
      pay(amount) {
        throw new Error("Must implement");
      }
    }

    class CreditCardPayment extends PaymentStrategy {
      pay(amount) {
        return `Paid $${amount} with Credit Card`;
      }
    }

    class PayPalPayment extends PaymentStrategy {
      pay(amount) {
        return `Paid $${amount} with PayPal`;
      }
    }

    class ShoppingCart {
      constructor(paymentStrategy) {
        this.paymentStrategy = paymentStrategy;
      }

      setPaymentStrategy(strategy) {
        this.paymentStrategy = strategy;
      }

      checkout(amount) {
        return this.paymentStrategy.pay(amount);
      }
    }

    const cart = new ShoppingCart(new CreditCardPayment());
    expect(cart.checkout(100)).toBe("Paid $100 with Credit Card");

    cart.setPaymentStrategy(new PayPalPayment());
    expect(cart.checkout(200)).toBe("Paid $200 with PayPal");
  });

  test("挑战5: 装饰器模式", () => {
    class Coffee {
      cost() {
        return 5;
      }

      description() {
        return "Coffee";
      }
    }

    class MilkDecorator {
      constructor(coffee) {
        this.coffee = coffee;
      }

      cost() {
        return this.coffee.cost() + 1;
      }

      description() {
        return this.coffee.description() + ", Milk";
      }
    }

    class SugarDecorator {
      constructor(coffee) {
        this.coffee = coffee;
      }

      cost() {
        return this.coffee.cost() + 0.5;
      }

      description() {
        return this.coffee.description() + ", Sugar";
      }
    }

    let coffee = new Coffee();
    coffee = new MilkDecorator(coffee);
    coffee = new SugarDecorator(coffee);

    expect(coffee.cost()).toBe(6.5);
    expect(coffee.description()).toBe("Coffee, Milk, Sugar");
  });

  test("挑战6: 代理模式", () => {
    class Subject {
      request() {
        return "Real subject response";
      }
    }

    class Proxy {
      constructor(realSubject) {
        this.realSubject = realSubject;
        this.cache = null;
      }

      request() {
        if (!this.cache) {
          this.cache = this.realSubject.request();
        }
        return this.cache;
      }
    }

    const proxy = new Proxy(new Subject());
    expect(proxy.request()).toBe("Real subject response");
  });

  test("挑战7: 建造者模式", () => {
    class StringBuilder {
      constructor() {
        this.parts = [];
      }

      addPart(part) {
        this.parts.push(part);
        return this;
      }

      addParts(parts) {
        this.parts.push(...parts);
        return this;
      }

      build() {
        return this.parts.join(" ");
      }
    }

    const sentence = new StringBuilder()
      .addPart("Hello")
      .addPart("beautiful")
      .addPart("world")
      .build();

    expect(sentence).toBe("Hello beautiful world");
  });

  test("挑战8: 状态模式", () => {
    class TrafficLight {
      constructor() {
        this.state = new RedState(this);
      }

      setState(state) {
        this.state = state;
      }

      change() {
        this.state.handle();
      }

      getColor() {
        return this.state.getColor();
      }
    }

    class RedState {
      constructor(light) {
        this.light = light;
      }

      handle() {
        this.light.setState(new GreenState(this.light));
      }

      getColor() {
        return "red";
      }
    }

    class GreenState {
      constructor(light) {
        this.light = light;
      }

      handle() {
        this.light.setState(new YellowState(this.light));
      }

      getColor() {
        return "green";
      }
    }

    class YellowState {
      constructor(light) {
        this.light = light;
      }

      handle() {
        this.light.setState(new RedState(this.light));
      }

      getColor() {
        return "yellow";
      }
    }

    const light = new TrafficLight();
    expect(light.getColor()).toBe("red");

    light.change();
    expect(light.getColor()).toBe("green");

    light.change();
    expect(light.getColor()).toBe("yellow");

    light.change();
    expect(light.getColor()).toBe("red");
  });

  test("挑战9: 责任链模式", () => {
    class Handler {
      constructor() {
        this.next = null;
      }

      setNext(handler) {
        this.next = handler;
        return handler;
      }

      handle(request) {
        if (this.next) {
          return this.next.handle(request);
        }
        return null;
      }
    }

    class AuthHandler extends Handler {
      handle(request) {
        if (!request.authenticated) {
          return "Not authenticated";
        }
        return super.handle(request);
      }
    }

    class LogHandler extends Handler {
      handle(request) {
        console.log(`Request: ${request.action}`);
        return super.handle(request);
      }
    }

    const auth = new AuthHandler();
    const log = new LogHandler();

    auth.setNext(log);

    expect(auth.handle({ authenticated: false, action: "read" }))
      .toBe("Not authenticated");
  });

  test("挑战10: 命令模式", () => {
    class Command {
      execute() {
        throw new Error("Must implement");
      }

      undo() {
        throw new Error("Must implement");
      }
    }

    class AddCommand extends Command {
      constructor(receiver, value) {
        super();
        this.receiver = receiver;
        this.value = value;
      }

      execute() {
        this.receiver.add(this.value);
      }

      undo() {
        this.receiver.subtract(this.value);
      }
    }

    class Calculator {
      constructor() {
        this.value = 0;
      }

      add(v) {
        this.value += v;
      }

      subtract(v) {
        this.value -= v;
      }

      getValue() {
        return this.value;
      }
    }

    const calc = new Calculator();
    const command = new AddCommand(calc, 5);

    command.execute();
    expect(calc.getValue()).toBe(5);

    command.undo();
    expect(calc.getValue()).toBe(0);
  });
});

console.log("🎯 模块11 - 类与对象综合挑战完成！");
