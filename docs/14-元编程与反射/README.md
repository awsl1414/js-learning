# 模块 14: 元编程与反射

> 📖 **学习目标**: 掌握 Proxy、Reflect 和 Symbol 元编程技术

## 目录

1. [Proxy 代理](#1-proxy-代理)
2. [Reflect 反射](#2-reflect-反射)
3. [Symbol 元素](#3-symbol-元素)
4. [元编程应用](#4-元编程应用)

---

## 1. Proxy 代理

### 1.1 创建 Proxy

```javascript
// 基本语法 ✅ ES2015
const target = {
  name: "Alice",
  age: 30
};

const handler = {
  // 拦截属性读取
  get(target, property, receiver) {
    console.log(`Getting ${property}`);
    return target[property];
  },

  // 拦截属性设置
  set(target, property, value, receiver) {
    console.log(`Setting ${property} to ${value}`);
    target[property] = value;
    return true;  // ✅ 必须返回 true 表示成功
  }
};

const proxy = new Proxy(target, handler);

proxy.name;  // "Getting name" → "Alice"
proxy.age = 31;  // "Setting age to 31"
```

### 1.2 Proxy 拦截器

```javascript
const handler = {
  // get(target, prop, receiver) - 属性读取
  get(target, prop) {
    if (!(prop in target)) {
      throw new ReferenceError(`Property "${prop}" doesn't exist`);
    }
    return target[prop];
  },

  // set(target, prop, value, receiver) - 属性设置
  set(target, prop, value) {
    if (typeof value !== "string") {
      throw new TypeError("Value must be a string");
    }
    target[prop] = value;
    return true;
  },

  // has(target, prop) - in 操作符
  has(target, prop) {
    return prop in target;
  },

  // deleteProperty(target, prop) - delete 操作符
  deleteProperty(target, prop) {
    if (prop.startsWith("_")) {
      throw new Error("Cannot delete private property");
    }
    delete target[prop];
    return true;
  },

  // ownKeys(target) - Object.keys()
  ownKeys(target) {
    return Object.keys(target).filter(key => !key.startsWith("_"));
  },

  // getOwnPropertyDescriptor(target, prop)
  getOwnPropertyDescriptor(target, prop) {
    return Object.getOwnPropertyDescriptor(target, prop);
  },

  // defineProperty(target, prop, descriptor)
  defineProperty(target, prop, descriptor) {
    Object.defineProperty(target, prop, descriptor);
    return true;
  },

  // getPrototypeOf(target) - Object.getPrototypeOf()
  getPrototypeOf(target) {
    return Object.getPrototypeOf(target);
  },

  // setPrototypeOf(target, proto) - Object.setPrototypeOf()
  setPrototypeOf(target, proto) {
    Object.setPrototypeOf(target, proto);
    return true;
  },

  // isExtensible(target) - Object.isExtensible()
  isExtensible(target) {
    return Object.isExtensible(target);
  },

  // preventExtensions(target) - Object.preventExtensions()
  preventExtensions(target) {
    Object.preventExtensions(target);
    return true;
  },

  // apply(target, thisArg, args) - 函数调用
  apply(target, thisArg, args) {
    return target.apply(thisArg, args);
  },

  // construct(target, args, newTarget) - new 操作符
  construct(target, args, newTarget) {
    return new target(...args);
  }
};
```

### 1.3 可撤销 Proxy ✅

```javascript
// Proxy.revocable() ✅
const { proxy, revoke } = Proxy.revocable(target, handler);

proxy.name;  // "Alice"

// 撤销代理
revoke();

proxy.name;  // TypeError: Cannot perform 'get' on a proxy that has been revoked
```

---

## 2. Reflect 反射

### 2.1 Reflect 方法

```javascript
// Reflect 与 Object 方法对应 ✅

// Reflect.get(target, prop, receiver) ✅
Reflect.get(obj, "name");  // 等同于 obj.name

// Reflect.set(target, prop, value, receiver) ✅
Reflect.set(obj, "name", "Bob");  // 等同于 obj.name = "Bob"

// Reflect.has(target, prop) ✅
Reflect.has(obj, "name");  // 等同于 "name" in obj

// Reflect.deleteProperty(target, prop) ✅
Reflect.deleteProperty(obj, "age");  // 等同于 delete obj.age

// Reflect.ownKeys(target) ✅
Reflect.ownKeys(obj);  // 等同于 Object.keys(obj) + Symbol keys

// Reflect.getOwnPropertyDescriptor(target, prop) ✅
Reflect.getOwnPropertyDescriptor(obj, "name");

// Reflect.defineProperty(target, prop, descriptor) ✅
Reflect.defineProperty(obj, "name", {
  value: "Alice",
  writable: true
});

// Reflect.getPrototypeOf(target) ✅
Reflect.getPrototypeOf(obj);  // 等同于 Object.getPrototypeOf(obj)

// Reflect.setPrototypeOf(target, proto) ✅
Reflect.setPrototypeOf(obj, {});  // 等同于 Object.setPrototypeOf(obj, {})

// Reflect.isExtensible(target) ✅
Reflect.isExtensible(obj);  // 等同于 Object.isExtensible(obj)

// Reflect.preventExtensions(target) ✅
Reflect.preventExtensions(obj);  // 等同于 Object.preventExtensions(obj)

// Reflect.apply(target, thisArg, args) ✅
Reflect.apply(fn, obj, [1, 2]);  // 等同于 fn.apply(obj, [1, 2])

// Reflect.construct(target, args, newTarget) ✅
Reflect.construct(Date, [2024, 0, 1]);  // 等同于 new Date(2024, 0, 1)
```

### 2.2 Reflect vs Object

```javascript
// ✅ Reflect 返回布尔值
// Object.defineProperty 失败抛出异常
try {
  Object.defineProperty(Object.freeze({}), "name", { value: "Alice" });
} catch (e) {
  console.error(e);  // TypeError
}

// Reflect.defineProperty 返回 false ✅
const result = Reflect.defineProperty(Object.freeze({}), "name", {
  value: "Alice"
});
console.log(result);  // false

// ✅ Reflect 保证正确的 this 绑定
const obj = {
  get value() {
    return this._value;
  }
};

const receiver = { _value: "custom" };

// Object methods: this 绑定问题
Object.getOwnPropertyDescriptor(obj, "value").get.call(receiver);  // undefined

// Reflect: 正确的 this ✅
Reflect.get(obj, "value", receiver);  // "custom"
```

---

## 3. Symbol 元素

### 3.1 内置 Symbol

```javascript
// Symbol.iterator - 迭代器 ✅
const myIterable = {
  data: [1, 2, 3],
  [Symbol.iterator]() {
    let index = 0;
    return {
      next: () => ({
        value: this.data[index++],
        done: index > this.data.length
      })
    };
  }
};

[...myIterable];  // [1, 2, 3]

// Symbol.asyncIterator - 异步迭代器 ✅
const myAsyncIterable = {
  async *[Symbol.asyncIterator]() {
    yield await Promise.resolve(1);
    yield await Promise.resolve(2);
  }
};

// Symbol.toStringTag - 自定义 Object.prototype.toString ✅
class MyClass {
  get [Symbol.toStringTag]() {
    return "MyClass";
  }
}

Object.prototype.toString.call(new MyClass());  // "[object MyClass]"

// Symbol.toPrimitive - 类型转换 ✅
const obj = {
  [Symbol.toPrimitive](hint) {
    if (hint === "number") return 42;
    if (hint === "string") return "hello";
    return true;  // "default"
  }
};

+obj;   // 42
`${obj}`;  // "hello"
obj + "";  // "true"

// Symbol.hasInstance - instanceof ✅
class MyArray {
  static [Symbol.hasInstance](instance) {
    return Array.isArray(instance);
  }
}

[] instanceof MyArray;  // true

// Symbol.species - 派生对象构造 ✅
class MyArray extends Array {
  static get [Symbol.species]() {
    return Array;
  }
}

const arr = new MyArray(1, 2, 3);
const mapped = arr.map(x => x * 2);
mapped instanceof MyArray;  // false
mapped instanceof Array;    // true

// Symbol.isConcatSpreadable - concat 行为 ✅
const spreadable = [1, 2];
spreadable[Symbol.isConcatSpreadable] = false;
[0].concat(spreadable);  // [0, [1, 2]] (不展开)

// Symbol.unscopables - with 排除 ✅
Array.prototype[Symbol.unscopables] = {
  copyWithin: true,
  entries: true,
  // ...
};

// Symbol.match、Symbol.replace、Symbol.search、Symbol.split
// - 自定义 String 方法行为

class CustomMatcher {
  [Symbol.match](string) {
    return string.length > 5;
  }
}

"hello".match(new CustomMatcher());  // true

// Symbol.matchAll ✅
class MatchAll {
  *[Symbol.matchAll](str) {
    yield { matched: "found", index: 0 };
  }
}

// Symbol.split ✅
class CustomSplitter {
  [Symbol.split](string) {
    return string.split("");
  }
}

"a,b".split(new CustomSplitter());  // ["a", ",", "b"]
```

### 3.2 注册 Symbol

```javascript
// 全局 Symbol 注册表 ✅
const sym1 = Symbol.for("uid");
const sym2 = Symbol.for("uid");

console.log(sym1 === sym2);  // true

// 获取 Symbol 的 key
Symbol.keyFor(sym1);  // "uid"

// 非全局 Symbol
const sym3 = Symbol("local");
Symbol.keyFor(sym3);  // undefined
```

---

## 4. 元编程应用

### 4.1 响应式系统 ✅

```javascript
// 简单的响应式实现
function reactive(obj) {
  const handlers = new Map();

  return new Proxy(obj, {
    get(target, prop) {
      // 收集依赖
      if (currentEffect) {
        if (!handlers.has(prop)) {
          handlers.set(prop, new Set());
        }
        handlers.get(prop).add(currentEffect);
      }
      return target[prop];
    },

    set(target, prop, value) {
      const old = target[prop];
      target[prop] = value;

      // 触发更新
      if (old !== value && handlers.has(prop)) {
        for (const effect of handlers.get(prop)) {
          effect();
        }
      }
      return true;
    }
  });
}

let currentEffect = null;

function effect(fn) {
  currentEffect = fn;
  fn();
  currentEffect = null;
}

// 使用
const state = reactive({ count: 0 });

effect(() => {
  console.log("Count changed:", state.count);
});

state.count = 1;  // "Count changed: 1"
```

### 4.2 数据验证 ✅

```javascript
// 类型检查代理
function typedObject() {
  return new Proxy({}, {
    set(target, prop, value) {
      const existing = target[prop];

      // 类型一致性检查
      if (existing !== undefined && typeof value !== typeof existing) {
        throw new TypeError(
          `Cannot change type of ${prop} from ${typeof existing} to ${typeof value}`
        );
      }

      target[prop] = value;
      return true;
    }
  });
}

const obj = typedObject();
obj.name = "Alice";
obj.name = "Bob";  // ✅
// obj.name = 123;   // ❌ TypeError
```

### 4.3 私有属性模拟 ✅

```javascript
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

class User {
  constructor(name) {
    this.name = name;
    privateData.get(this).secret = "hidden";
  }

  getSecret() {
    return privateData.get(this).secret;
  }
}

const SecureUser = withPrivateData(User);
const user = new SecureUser("Alice");
console.log(user.getSecret());  // "hidden"
```

---

## 5. 最佳实践

### 5.1 使用场景

```javascript
// ✅ 使用 Proxy
// - 数据验证
// - 响应式系统
// - 调试和日志
// - 访问控制

// ✅ 使用 Reflect
// - 更可靠的反射操作
// - 正确的 this 绑定
// - 统一的返回值

// ✅ 使用 Symbol
// - 定义对象行为
// - 元属性
// - 避免命名冲突
```

### 5.2 性能注意

```javascript
// ⚠️ Proxy 有性能开销
// 避免在高频代码中使用

// ❌ 不推荐
const proxyArray = new Proxy(array, handler);
for (let i = 0; i < 1000000; i++) {
  proxyArray[i];  // 慢
}

// ✅ 直接访问
for (let i = 0; i < 1000000; i++) {
  array[i];  // 快
}
```

---

**下一步**: 完成 `exercises/14-元编程与反射/` 目录下的练习题 🚀
