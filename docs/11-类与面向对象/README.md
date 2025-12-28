# 模块 11: 类与面向对象

> 📖 **学习目标**: 掌握 JavaScript 类、继承和面向对象编程

## 目录

1. [类定义](#1-类定义)
2. [继承](#2-继承)
3. [访问修饰符](#3-访问修饰符)
4. [静态成员](#4-静态成员)
5. [类表达式](#5-类表达式)

---

## 1. 类定义

### 1.1 基本语法 ✅ ES2015

```javascript
// 类声明 ✅
class Person {
  // 构造函数
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  // 实例方法
  greet() {
    return `Hello, I'm ${this.name}`;
  }

  // 获取器 ✅
  get info() {
    return `${this.name} is ${this.age} years old`;
  }

  // 设置器 ✅
  set age(value) {
    if (value < 0) {
      throw new Error("Age cannot be negative");
    }
    this._age = value;
  }

  get age() {
    return this._age;
  }
}

// 使用
const person = new Person("Alice", 30);
console.log(person.greet());  // "Hello, I'm Alice"
console.log(person.info);     // "Alice is 30 years old"
```

### 1.2 字段声明 ✅ ES2022

```javascript
class Person {
  // 公共字段 ✅
  name = "Unknown";

  // 私有字段 ✅ (必须以 # 开头)
  #secret = "hidden";

  // 静态字段 ✅
  static count = 0;

  constructor(name) {
    this.name = name;
    Person.count++;
  }

  getSecret() {
    return this.#secret;  // ✅ 类内部可访问
  }
}

const person = new Person("Alice");
console.log(person.name);    // "Alice"
console.log(person.#secret); // ❌ SyntaxError (私有)
console.log(person.getSecret()); // "hidden"
console.log(Person.count);   // 1
```

### 1.3 方法类型

```javascript
class Calculator {
  // 实例方法
  add(a, b) {
    return a + b;
  }

  // 静态方法 ✅
  static sum(...numbers) {
    return numbers.reduce((a, b) => a + b, 0);
  }

  // 私有方法 ✅ ES2022
  #log(message) {
    console.log(`[LOG] ${message}`);
  }

  calculate(a, b) {
    this.#log(`Calculating ${a} + ${b}`);
    return a + b;
  }
}

// 使用
const calc = new Calculator();
calc.calculate(1, 2);  // "[LOG] Calculating 1 + 2"
Calculator.sum(1, 2, 3);  // 6
```

---

## 2. 继承

### 2.1 基本继承

```javascript
// 父类
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    return `${this.name} makes a sound`;
  }
}

// 子类 ✅
class Dog extends Animal {
  constructor(name, breed) {
    super(name);  // ✅ 必须调用 super()
    this.breed = breed;
  }

  speak() {
    // 调用父类方法 ✅
    return super.speak() + " (Woof!)";
  }

  fetch() {
    return `${this.name} fetches the ball`;
  }
}

const dog = new Dog("Buddy", "Golden Retriever");
console.log(dog.speak());  // "Buddy makes a sound (Woof!)"
console.log(dog.fetch());  // "Buddy fetches the ball"
```

### 2.2 继承与覆盖

```javascript
class Vehicle {
  constructor(speed) {
    this.speed = speed;
  }

  move() {
    return `Moving at ${this.speed} km/h`;
  }

  static info() {
    return "This is a vehicle";
  }
}

class Car extends Vehicle {
  constructor(speed, brand) {
    super(speed);
    this.brand = brand;
  }

  // 覆盖实例方法
  move() {
    return `${this.brand} is driving at ${this.speed} km/h`;
  }

  // 覆盖静态方法
  static info() {
    return super.info() + " (Car)";
  }
}

const car = new Car(120, "Toyota");
console.log(car.move());  // "Toyota is driving at 120 km/h"
console.log(Car.info());  // "This is a vehicle (Car)"
```

---

## 3. 访问修饰符

### 3.1 公共、私有、保护

```javascript
class BankAccount {
  // 公共字段
  owner;

  // 私有字段 ✅
  #balance;

  constructor(owner, initialBalance) {
    this.owner = owner;
    this.#balance = initialBalance;
  }

  // 公共方法
  deposit(amount) {
    if (amount <= 0) {
      throw new Error("Invalid amount");
    }
    this.#balance += amount;
  }

  // 私有方法 ✅
  #validateAmount(amount) {
    return amount > 0 && Number.isFinite(amount);
  }

  getBalance() {
    return this.#balance;
  }
}

const account = new BankAccount("Alice", 1000);
account.deposit(500);
console.log(account.getBalance());  // 1500
console.log(account.#balance);      // ❌ SyntaxError
```

### 3.2 使用 Symbol 模拟私有

```javascript
const _privateData = Symbol("private");

class User {
  constructor(name) {
    this.name = name;
    this[_privateData] = { id: Math.random() };
  }

  getData() {
    return this[_privateData];
  }
}

const user = new User("Alice");
console.log(user.name);       // "Alice"
console.log(user.getData());  // { id: ... }
// ⚠️ 仍可通过 Symbol 访问 (不是真正的私有)
```

---

## 4. 静态成员

### 4.1 静态属性和方法

```javascript
class MathUtil {
  // 静态属性 ✅
  static PI = 3.14159;

  // 静态方法
  static circleArea(radius) {
    return this.PI * radius * radius;
  }

  static add(a, b) {
    return a + b;
  }
}

// 使用类名调用 ✅
console.log(MathUtil.PI);  // 3.14159
console.log(MathUtil.circleArea(5));  // 78.54

// ⚠️ 实例不能访问
// const util = new MathUtil();
// util.add(1, 2);  // TypeError
```

### 4.2 静态块 ✅ ES2022

```javascript
class Config {
  static apiUrl;
  static timeout;

  // 静态初始化块 ✅
  static {
    // 从环境变量加载配置
    this.apiUrl = process.env.API_URL || "https://api.example.com";
    this.timeout = parseInt(process.env.TIMEOUT) || 5000;

    console.log("Config initialized");
  }
}

console.log(Config.apiUrl);  // 配置值
```

---

## 5. 类表达式

### 5.1 匿名类

```javascript
// 匿名类表达式
const Person = class {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return `Hello, ${this.name}`;
  }
};

const person = new Person("Alice");
console.log(person.greet());  // "Hello, Alice"
```

### 5.2 命名类表达式

```javascript
// 命名类表达式 (名称只在类内部可见)
const Person = class PersonClass {
  constructor(name) {
    this.name = name;
  }

  getClass() {
    return PersonClass;  // ✅ 可以使用
  }
};

const person = new Person("Alice");
console.log(person.getClass());  // [class PersonClass]
// console.log(PersonClass);     // ❌ ReferenceError
```

---

## 6. 对象检查

### 6.1 instanceof

```javascript
class Animal { }
class Dog extends Animal { }

const dog = new Dog();

console.log(dog instanceof Dog);      // true
console.log(dog instanceof Animal);   // true
console.log(dog instanceof Object);   // true
console.log(dog instanceof Array);    // false
```

### 6.2 对象原型检查

```javascript
class Person { }

const person = new Person();

// 获取原型
Object.getPrototypeOf(person) === Person.prototype;  // true

// 检查原型链
Person.prototype.isPrototypeOf(person);  // true

// 获取类名
person.constructor.name;  // "Person"
```

---

## 7. 最佳实践

### 7.1 类设计

```javascript
// ✅ 单一职责
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  validate() {
    return this.name && this.email;
  }
}

class UserRepository {
  save(user) {
    // 保存到数据库
  }

  findById(id) {
    // 查找用户
  }
}

// ❌ 职责过多
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  validate() { }
  save() { }  // 应该分离
  sendEmail() { }  // 应该分离
}
```

### 7.2 继承 vs 组合

```javascript
// ✅ 组合优先于继承
class Engine {
  start() {
    return "Engine started";
  }
}

class Car {
  constructor(engine) {
    this.engine = engine;
  }

  start() {
    return this.engine.start();
  }
}

const engine = new Engine();
const car = new Car(engine);
car.start();  // "Engine started"
```

### 7.3 私有数据

```javascript
// ✅ 使用私有字段 (#)
class User {
  #password;

  setPassword(password) {
    if (password.length < 8) {
      throw new Error("Password too short");
    }
    this.#password = password;
  }
}

// ✅ 使用闭包 (旧方式)
function createUser(name) {
  let secret = "hidden";

  return {
    name,
    getSecret: () => secret
  };
}
```

---

**下一步**: 完成 `exercises/11-类与面向对象/` 目录下的练习题 🚀
