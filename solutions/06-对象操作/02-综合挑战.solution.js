/**
 * 模块 06: 对象操作 - 综合挑战 (答案)
 *
 * 这是参考答案文件，用于对比和检查你的练习结果
 */

import { test, expect, describe } from "bun:test";

describe("模块06 - 对象综合挑战 (答案)", () => {

  test("挑战1: 深度克隆", () => {
    function deepClone(obj) {
      if (obj === null || typeof obj !== "object") return obj;
      if (obj instanceof Date) return new Date(obj);
      if (obj instanceof Array) return obj.map(item => deepClone(item));

      const cloned = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          cloned[key] = deepClone(obj[key]);
        }
      }
      return cloned;
    }

    const original = {
      a: 1,
      nested: { b: 2, deep: { c: 3 } },
      array: [1, 2, 3],
      date: new Date("2024-01-01")
    };

    const cloned = deepClone(original);
    expect(cloned).toEqual(original);
    expect(cloned).not.toBe(original);
    cloned.nested.b = 100;
    expect(original.nested.b).toBe(2);
  });

  test("挑战2: 深度合并", () => {
    function deepMerge(target, source) {
      const result = { ...target };

      for (const key in source) {
        if (source[key] && typeof source[key] === "object" &&
            target[key] && typeof target[key] === "object" &&
            !Array.isArray(source[key])) {
          result[key] = deepMerge(target[key], source[key]);
        } else {
          result[key] = source[key];
        }
      }

      return result;
    }

    const target = {
      a: 1,
      nested: { x: 1, y: 2 },
      arr: [1, 2]
    };

    const source = {
      b: 2,
      nested: { y: 20, z: 30 },
      arr: [3, 4]
    };

    const merged = deepMerge(target, source);
    expect(merged.nested).toEqual({ x: 1, y: 20, z: 30 });
  });

  test("挑战3: 对象路径访问", () => {
    function get(obj, path, defaultValue) {
      const keys = Array.isArray(path) ? path : path.split(".");
      let current = obj;

      for (const key of keys) {
        if (current == null) return defaultValue;
        current = current[key];
      }

      return current ?? defaultValue;
    }

    const obj = {
      user: {
        profile: {
          name: "Alice",
          address: {
            city: "NYC"
          }
        }
      }
    };

    expect(get(obj, "user.profile.name")).toBe("Alice");
    expect(get(obj, "user.profile.address.city")).toBe("NYC");
    expect(get(obj, "user.missing.property", "default")).toBe("default");
  });

  test("挑战4: 对象路径设置", () => {
    function set(obj, path, value) {
      const keys = Array.isArray(path) ? path : path.split(".");
      const lastKey = keys.pop();
      const target = keys.reduce((current, key) => {
        if (!current[key] || typeof current[key] !== "object") {
          current[key] = {};
        }
        return current[key];
      }, obj);
      target[lastKey] = value;
      return obj;
    }

    const obj = {};
    set(obj, "user.profile.name", "Alice");
    expect(obj.user.profile.name).toBe("Alice");
  });

  test("挑战5: 对象不可变更新", () => {
    function update(obj, path, updater) {
      const keys = Array.isArray(path) ? path : path.split(".");
      const key = keys[0];

      if (keys.length === 1) {
        return { ...obj, [key]: typeof updater === "function" ? updater(obj[key]) : updater };
      }

      return {
        ...obj,
        [key]: update(obj[key] || {}, keys.slice(1), updater)
      };
    }

    const state = {
      user: {
        name: "Alice",
        age: 30
      }
    };

    const updated = update(state, "user.age", age => age + 1);
    expect(updated.user.age).toBe(31);
    expect(state.user.age).toBe(30);  // 原对象不变
  });

  test("挑战6: 对象观察者", () => {
    class ObservableObject {
      constructor(initial) {
        this.data = initial ? { ...initial } : {};
        this.listeners = {};
      }

      subscribe(path, callback) {
        if (!this.listeners[path]) {
          this.listeners[path] = [];
        }
        this.listeners[path].push(callback);
        return () => {
          this.listeners[path] = this.listeners[path].filter(cb => cb !== callback);
        };
      }

      set(path, value) {
        const keys = path.split(".");
        const lastKey = keys.pop();
        const target = keys.reduce((current, key) => current[key], this.data);
        target[lastKey] = value;

        this.notify(path, value);
      }

      get(path) {
        return get(this.data, path);
      }

      notify(path, value) {
        for (const [key, callbacks] of Object.entries(this.listeners)) {
          if (path.startsWith(key) || key.startsWith(path)) {
            callbacks.forEach(cb => cb(value, path));
          }
        }
      }
    }

    function get(obj, path) {
      return path.split(".").reduce((current, key) => current?.[key], obj);
    }

    const obs = new ObservableObject({ user: { name: "Alice" } });
    let notified = [];

    obs.subscribe("user", (val, path) => notified.push({ val, path }));
    obs.set("user.name", "Bob");

    expect(notified[0].val).toBe("Bob");
  });

  test("挑战7: 对象验证", () => {
    function validate(obj, schema) {
      const errors = [];

      for (const [key, rules] of Object.entries(schema)) {
        const value = obj[key];

        if (rules.required && (value === undefined || value === null)) {
          errors.push(`${key} is required`);
          continue;
        }

        if (value !== undefined && value !== null) {
          if (rules.type && typeof value !== rules.type) {
            errors.push(`${key} must be ${rules.type}`);
          }
          if (rules.validate && !rules.validate(value)) {
            errors.push(`${key} is invalid`);
          }
        }
      }

      return { isValid: errors.length === 0, errors };
    }

    const userSchema = {
      name: { required: true, type: "string" },
      age: { required: true, type: "number", validate: v => v >= 0 },
      email: { required: false, type: "string" }
    };

    const result = validate({ name: "Alice", age: -5 }, userSchema);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain("age is invalid");
  });

  test("挑战8: 对象差异比较", () => {
    function diff(obj1, obj2) {
      const changes = [];
      const allKeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);

      for (const key of allKeys) {
        const val1 = obj1[key];
        const val2 = obj2[key];

        if (val1 !== val2) {
          changes.push({ key, from: val1, to: val2 });
        }
      }

      return changes;
    }

    const obj1 = { a: 1, b: 2, c: 3 };
    const obj2 = { a: 1, b: 20, d: 4 };

    const changes = diff(obj1, obj2);
    expect(changes).toHaveLength(3);
  });

  test("挑战9: 对象扁平化", () => {
    function flatten(obj, prefix = "") {
      const result = {};

      for (const [key, value] of Object.entries(obj)) {
        const newKey = prefix ? `${prefix}.${key}` : key;

        if (value && typeof value === "object" && !Array.isArray(value)) {
          Object.assign(result, flatten(value, newKey));
        } else {
          result[newKey] = value;
        }
      }

      return result;
    }

    const obj = {
      user: {
        profile: {
          name: "Alice"
        },
        settings: {
          theme: "dark"
        }
      }
    };

    const flat = flatten(obj);
    expect(flat["user.profile.name"]).toBe("Alice");
    expect(flat["user.settings.theme"]).toBe("dark");
  });

  test("挑战10: 对象管道", () => {
    function objectPipe(obj, ...transforms) {
      return transforms.reduce((result, transform) => transform(result), obj);
    }

    const transform1 = (obj) => ({ ...obj, a: obj.a * 2 });
    const transform2 = (obj) => ({ ...obj, b: obj.b + 10 });
    const transform3 = (obj) => ({ ...obj, c: obj.a + obj.b });

    const result = objectPipe({ a: 1, b: 2 }, transform1, transform2, transform3);
    expect(result).toEqual({ a: 2, b: 12, c: 14 });
  });
});

console.log("🎯 模块06 - 对象综合挑战答案完成！");
