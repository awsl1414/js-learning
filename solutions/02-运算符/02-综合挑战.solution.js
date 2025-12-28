/**
 * 模块 02: 运算符 - 综合挑战
 *
 * 参考答案
 */

import { test, expect, describe } from "bun:test";

describe("模块02 - 运算符综合挑战 (参考答案)", () => {

  test("挑战1: 表单验证器", () => {
    function validateForm(formData) {
      const errors = [];

      const username = formData.username ?? "";
      if (username.length < 3) {
        errors.push("用户名至少3个字符");
      }
      if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        errors.push("用户名只能包含字母、数字和下划线");
      }

      const email = formData.email ?? "";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push("邮箱格式不正确");
      }

      const age = formData.age;
      if (typeof age !== "number" || age < 0 || age > 150) {
        errors.push("年龄必须是0-150之间的数字");
      }

      const password = formData.password ?? "";
      if (password.length < 8) {
        errors.push("密码至少8个字符");
      }
      if (!/[A-Z]/.test(password)) {
        errors.push("密码必须包含大写字母");
      }
      if (!/[a-z]/.test(password)) {
        errors.push("密码必须包含小写字母");
      }
      if (!/\d/.test(password)) {
        errors.push("密码必须包含数字");
      }

      return {
        isValid: errors.length === 0,
        errors
      };
    }

    const validForm = {
      username: "alice123",
      email: "alice@example.com",
      age: 25,
      password: "Password123"
    };
    expect(validateForm(validForm).isValid).toBe(true);

    const invalidForm = {
      username: "a",
      email: "invalid-email",
      age: 200,
      password: "weak"
    };
    const result = validateForm(invalidForm);
    expect(result.isValid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });

  test("挑战2: 数组工具函数", () => {
    const ArrayTools = {
      reverse(arr) {
        return [...arr].reverse();
      },

      shuffle(arr) {
        const copy = [...arr];
        for (let i = copy.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
      },

      chunk(arr, size) {
        const chunks = [];
        for (let i = 0; i < arr.length; i += size) {
          chunks.push(arr.slice(i, i + size));
        }
        return chunks;
      },

      flatten(arr) {
        return arr.flat(Infinity);
      },

      unique(arr) {
        return [...new Set(arr)];
      },

      allEven(arr) {
        return arr.every(n => (n & 1) === 0);
      },

      allOdd(arr) {
        return arr.every(n => (n & 1) === 1);
      }
    };

    expect(ArrayTools.reverse([1, 2, 3])).toEqual([3, 2, 1]);

    const original = [1, 2, 3, 4, 5];
    const shuffled = ArrayTools.shuffle(original);
    expect(shuffled).toHaveLength(5);
    expect(new Set(shuffled)).toEqual(new Set(original));

    expect(ArrayTools.chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    expect(ArrayTools.flatten([1, [2, [3, [4]]]])).toEqual([1, 2, 3, 4]);
    expect(ArrayTools.unique([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);
    expect(ArrayTools.allEven([2, 4, 6, 8])).toBe(true);
    expect(ArrayTools.allEven([2, 4, 5, 8])).toBe(false);
    expect(ArrayTools.allOdd([1, 3, 5, 7])).toBe(true);
  });

  test("挑战3: 深度对象操作", () => {
    function deepMerge(target, source) {
      const result = { ...target };

      for (const key in source) {
        if (source[key] && typeof source[key] === "object" &&
            target[key] && typeof target[key] === "object") {
          result[key] = deepMerge(target[key], source[key]);
        } else {
          result[key] = source[key];
        }
      }

      return result;
    }

    function deepClone(obj) {
      if (obj === null || typeof obj !== "object") {
        return obj;
      }
      if (obj instanceof Date) {
        return new Date(obj);
      }
      if (obj instanceof Array) {
        return obj.map(item => deepClone(item));
      }
      if (obj instanceof Object) {
        const cloned = {};
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            cloned[key] = deepClone(obj[key]);
          }
        }
        return cloned;
      }
    }

    const obj1 = {
      a: 1,
      nested: {
        b: 2,
        deep: {
          c: 3
        }
      }
    };

    const obj2 = {
      a: 10,
      nested: {
        b: 20,
        new: "added"
      }
    };

    const merged = deepMerge(obj1, obj2);
    expect(merged.a).toBe(10);
    expect(merged.nested.b).toBe(20);
    expect(merged.nested.deep.c).toBe(3);
    expect(merged.nested.new).toBe("added");

    const cloned = deepClone(obj1);
    expect(cloned).toEqual(obj1);
    expect(cloned).not.toBe(obj1);
    cloned.nested.b = 100;
    expect(obj1.nested.b).toBe(2);
  });

  test("挑战4: 数学工具", () => {
    const MathTools = {
      isInteger(n) {
        return Number.isInteger(n);
      },

      inRange(n, min, max) {
        return n >= min && n <= max;
      },

      clamp(n, min, max) {
        return Math.min(Math.max(n, min), max);
      },

      random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      },

      round(n, decimals = 0) {
        const factor = 10 ** decimals;
        return Math.round(n * factor) / factor;
      },

      sign(n) {
        if (n > 0) return 1;
        if (n < 0) return -1;
        return 0;
      },

      isPowerOfTwo(n) {
        return n > 0 && (n & (n - 1)) === 0;
      }
    };

    expect(MathTools.isInteger(5)).toBe(true);
    expect(MathTools.isInteger(5.5)).toBe(false);
    expect(MathTools.inRange(5, 1, 10)).toBe(true);
    expect(MathTools.inRange(0, 1, 10)).toBe(false);
    expect(MathTools.clamp(15, 1, 10)).toBe(10);
    expect(MathTools.clamp(5, 1, 10)).toBe(5);
    expect(MathTools.clamp(-5, 1, 10)).toBe(1);
    expect(MathTools.round(3.14159, 2)).toBe(3.14);
    expect(MathTools.sign(-10)).toBe(-1);
    expect(MathTools.sign(0)).toBe(0);
    expect(MathTools.sign(10)).toBe(1);
    expect(MathTools.isPowerOfTwo(1)).toBe(true);
    expect(MathTools.isPowerOfTwo(2)).toBe(true);
    expect(MathTools.isPowerOfTwo(4)).toBe(true);
    expect(MathTools.isPowerOfTwo(6)).toBe(false);
    expect(MathTools.isPowerOfTwo(8)).toBe(true);
  });

  test("挑战5: 字符串转换", () => {
    function camelToKebab(str) {
      return str.replace(/([A-Z])/g, "-$1").toLowerCase();
    }

    function kebabToCamel(str) {
      return str.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    }

    function capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function titleCase(str) {
      return str.replace(/\b\w/g, c => c.toUpperCase());
    }

    function reverse(str) {
      return [...str].reverse().join("");
    }

    expect(camelToKebab("helloWorld")).toBe("hello-world");
    expect(camelToKebab("userName")).toBe("user-name");
    expect(kebabToCamel("hello-world")).toBe("helloWorld");
    expect(kebabToCamel("user-name")).toBe("userName");
    expect(capitalize("hello")).toBe("Hello");
    expect(titleCase("hello world")).toBe("Hello World");
    expect(reverse("hello")).toBe("olleh");
  });

  test("挑战6: 高级类型检查", () => {
    const TypeCheck = {
      getType(value) {
        return Object.prototype.toString.call(value).slice(8, -1);
      },

      isPlainObject(value) {
        return this.getType(value) === "Object";
      },

      isEmptyObject(value) {
        return this.isPlainObject(value) && Object.keys(value).length === 0;
      },

      isEmptyArray(value) {
        return Array.isArray(value) && value.length === 0;
      },

      isPromise(value) {
        return value instanceof Promise ||
               (value !== null && typeof value === "object" &&
                typeof value.then === "function");
      },

      deepEqual(a, b) {
        if (a === b) return true;
        if (typeof a !== typeof b) return false;
        if (typeof a !== "object" || a === null || b === null) return false;

        if (Array.isArray(a) !== Array.isArray(b)) return false;
        if (Array.isArray(a)) {
          if (a.length !== b.length) return false;
          return a.every((item, i) => this.deepEqual(item, b[i]));
        }

        const keysA = Object.keys(a);
        const keysB = Object.keys(b);
        if (keysA.length !== keysB.length) return false;

        return keysA.every(key =>
          this.deepEqual(a[key], b[key])
        );
      }
    };

    expect(TypeCheck.getType(42)).toBe("Number");
    expect(TypeCheck.getType("hello")).toBe("String");
    expect(TypeCheck.getType(null)).toBe("Null");
    expect(TypeCheck.getType([])).toBe("Array");
    expect(TypeCheck.isPlainObject({})).toBe(true);
    expect(TypeCheck.isPlainObject([])).toBe(false);
    expect(TypeCheck.isEmptyObject({})).toBe(true);
    expect(TypeCheck.isEmptyObject({ a: 1 })).toBe(false);
    expect(TypeCheck.isEmptyArray([])).toBe(true);
    expect(TypeCheck.isEmptyArray([1])).toBe(false);
    expect(TypeCheck.isPromise(Promise.resolve())).toBe(true);
    expect(TypeCheck.isPromise({})).toBe(false);
    expect(TypeCheck.deepEqual({ a: 1 }, { a: 1 })).toBe(true);
    expect(TypeCheck.deepEqual({ a: [1, 2] }, { a: [1, 2] })).toBe(true);
    expect(TypeCheck.deepEqual({ a: 1 }, { a: 2 })).toBe(false);
  });

  test("终极挑战: 数据处理管道", () => {
    class DataPipeline {
      constructor(data) {
        this.data = data;
        this.operations = [];
      }

      filter(predicate) {
        this.operations.push(d => d.filter(predicate));
        return this;
      }

      map(mapper) {
        this.operations.push(d => d.map(mapper));
        return this;
      }

      sort(compareFn) {
        this.operations.push(d => [...d].sort(compareFn));
        return this;
      }

      groupBy(key) {
        this.operations.push(d => {
          return d.reduce((acc, item) => {
            const group = item[key];
            if (!acc[group]) acc[group] = [];
            acc[group].push(item);
            return acc;
          }, {});
        });
        return this;
      }

      flatten() {
        this.operations.push(d => d.flat(Infinity));
        return this;
      }

      unique() {
        this.operations.push(d => [...new Set(d)]);
        return this;
      }

      take(n) {
        this.operations.push(d => d.slice(0, n));
        return this;
      }

      skip(n) {
        this.operations.push(d => d.slice(n));
        return this;
      }

      exec() {
        return this.operations.reduce(
          (data, op) => op(data),
          this.data
        );
      }
    }

    const users = [
      { name: "Alice", age: 30, city: "NYC", active: true },
      { name: "Bob", age: 25, city: "LA", active: false },
      { name: "Charlie", age: 35, city: "NYC", active: true },
      { name: "David", age: 28, city: "LA", active: true },
      { name: "Eve", age: 22, city: "NYC", active: false }
    ];

    const result = new DataPipeline(users)
      .filter(u => u.active)
      .filter(u => u.age >= 25)
      .sort((a, b) => a.age - b.age)
      .groupBy("city")
      .exec();

    expect(result.NYC.length).toBe(2);
    expect(result.NYC[0].name).toBe("Alice");
    expect(result.LA).toBeUndefined();

    const names = new DataPipeline(users)
      .map(u => u.name)
      .filter(n => n.length > 3)
      .take(3)
      .exec();

    expect(names).toEqual(["Alice", "Charlie", "David"]);
  });

  test("额外挑战: 位运算应用", () => {
    const READ = 1;
    const WRITE = 2;
    const EXECUTE = 4;

    function hasPermission(permissions, flag) {
      return (permissions & flag) !== 0;
    }

    function addPermission(permissions, flag) {
      return permissions | flag;
    }

    function removePermission(permissions, flag) {
      return permissions & ~flag;
    }

    let perms = READ | WRITE;
    expect(hasPermission(perms, READ)).toBe(true);
    expect(hasPermission(perms, WRITE)).toBe(true);
    expect(hasPermission(perms, EXECUTE)).toBe(false);

    perms = addPermission(perms, EXECUTE);
    expect(hasPermission(perms, EXECUTE)).toBe(true);

    perms = removePermission(perms, WRITE);
    expect(hasPermission(perms, READ)).toBe(true);
    expect(hasPermission(perms, WRITE)).toBe(false);
    expect(hasPermission(perms, EXECUTE)).toBe(true);
  });

  test("额外挑战: 位运算交换变量", () => {
    let a = 5;
    let b = 10;

    a ^= b;
    b ^= a;
    a ^= b;

    expect(a).toBe(10);
    expect(b).toBe(5);
  });
});

console.log("✅ 模块02 - 运算符综合挑战 (参考答案)");
