/**
 * 模块 11: 类与对象 - 综合挑战
 */

import { test, expect, describe } from "bun:test";

describe("模块11 - 类与对象综合挑战", () => {

  test("挑战1: 观察者模式", () => {
    // TODO: 实现 Observable 类，支持订阅和通知
    class Observable {
      constructor() {
        // ???
      }

      subscribe(observer) {
        // 返回取消订阅函数
        // ???
      }

      notify(data) {
        // 通知所有观察者
        // ???
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
    // TODO: 实现 Database 单例类
    class Database {
      // 使用静态属性存储实例
      // ???

      constructor() {
        // 如果实例已存在，返回已存在的实例
        // ???
        this.connection = "connected";
        // ???
      }

      static getInstance() {
        // 返回或创建实例
        // ???
      }
    }

    const db1 = Database.getInstance();
    const db2 = Database.getInstance();

    expect(db1).toBe(db2);
  });

  test("挑战3: 工厂模式", () => {
    // TODO: 实现 CarFactory 工厂类
    class CarFactory {
      static create(type) {
        // 根据类型创建对应的车
        // ???
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
    // TODO: 实现支付策略模式
    class PaymentStrategy {
      pay(amount) {
        throw new Error("Must implement");
      }
    }

    // 实现 CreditCardPayment
    // ???

    // 实现 PayPalPayment
    // ???

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
    // TODO: 实现咖啡装饰器模式
    class Coffee {
      cost() {
        return 5;
      }

      description() {
        return "Coffee";
      }
    }

    // 实现 MilkDecorator
    // ???

    // 实现 SugarDecorator
    // ???

    let coffee = new Coffee();
    coffee = new MilkDecorator(coffee);
    coffee = new SugarDecorator(coffee);

    expect(coffee.cost()).toBe(6.5);
    expect(coffee.description()).toBe("Coffee, Milk, Sugar");
  });

  test("挑战6: 代理模式", () => {
    // TODO: 实现缓存代理
    class Subject {
      request() {
        return "Real subject response";
      }
    }

    class Proxy {
      constructor(realSubject) {
        // ???
      }

      request() {
        // 如果有缓存返回缓存，否则调用真实对象
        // ???
      }
    }

    const proxy = new Proxy(new Subject());
    expect(proxy.request()).toBe("Real subject response");
  });

  test("挑战7: 建造者模式", () => {
    // TODO: 实现 StringBuilder 建造者
    class StringBuilder {
      constructor() {
        // ???
      }

      addPart(part) {
        // ???
      }

      addParts(parts) {
        // ???
      }

      build() {
        // ???
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
    // TODO: 实现交通灯状态模式
    class TrafficLight {
      constructor() {
        // ???
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

    // 实现 RedState, GreenState, YellowState
    // ???

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
    // TODO: 实现处理链
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

    // 实现 AuthHandler
    // ???

    // 实现 LogHandler
    // ???

    const auth = new AuthHandler();
    const log = new LogHandler();

    auth.setNext(log);

    expect(auth.handle({ authenticated: false, action: "read" }))
      .toBe("Not authenticated");
  });

  test("挑战10: 命令模式", () => {
    // TODO: 实现命令模式
    class Command {
      execute() {
        throw new Error("Must implement");
      }

      undo() {
        throw new Error("Must implement");
      }
    }

    // 实现 AddCommand
    // ???

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
