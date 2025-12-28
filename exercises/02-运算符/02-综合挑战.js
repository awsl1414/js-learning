/**
 * 模块 02: 运算符 - 综合挑战
 *
 * 本练习包含更复杂的实际应用场景
 */

import { test, expect, describe } from "bun:test";

describe("模块02 - 运算符综合挑战", () => {

  // ==================== 挑战 1: 数据验证器 ====================

  test("挑战1: 表单验证器", () => {
    // 实现完整的表单验证
    function validateForm(formData) {
      const errors = [];

      // 用户名验证
      const username = formData.username ?? "";
      if (username.length < 3) {
        errors.push("用户名至少3个字符");
      }
      if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        errors.push("用户名只能包含字母、数字和下划线");
      }

      // 邮箱验证
      const email = formData.email ?? "";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push("邮箱格式不正确");
      }

      // 年龄验证
      const age = formData.age;
      if (typeof age !== "number" || age < 0 || age > 150) {
        errors.push("年龄必须是0-150之间的数字");
      }

      // 密码验证
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

    // 测试有效表单
    const validForm = {
      username: "alice123",
      email: "alice@example.com",
      age: 25,
      password: "Password123"
    };
    expect(validateForm(validForm).isValid).toBe(true);

    // 测试无效表单
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

  // ==================== 挑战 2: 数组操作工具集 ====================

  test("挑战2: 数组工具函数", () => {
    const ArrayTools = {
      // 使用解构和展开实现
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

      // 使用位运算判断
      allEven(arr) {
        return arr.every(n => (n & 1) === 0);
      },

      allOdd(arr) {
        return arr.every(n => (n & 1) === 1);
      }
    };

    // 测试 reverse
    expect(ArrayTools.reverse([1, 2, 3])).toEqual([3, 2, 1]);

    // 测试 shuffle (检查长度和元素)
    const original = [1, 2, 3, 4, 5];
    const shuffled = ArrayTools.shuffle(original);
    expect(shuffled).toHaveLength(5);
    expect(new Set(shuffled)).toEqual(new Set(original));

    // 测试 chunk
    expect(ArrayTools.chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);

    // 测试 flatten
    expect(ArrayTools.flatten([1, [2, [3, [4]]]])).toEqual([1, 2, 3, 4]);

    // 测试 unique
    expect(ArrayTools.unique([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);

    // 测试 allEven/allOdd
    expect(ArrayTools.allEven([2, 4, 6, 8])).toBe(true);
    expect(ArrayTools.allEven([2, 4, 5, 8])).toBe(false);
    expect(ArrayTools.allOdd([1, 3, 5, 7])).toBe(true);
  });

  // ==================== 挑战 3: 对象深度操作 ====================

  test("挑战3: 深度对象操作", () => {
    // 深度合并对象
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

    // 深度克隆
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
    expect(obj1.nested.b).toBe(2); // 原对象不变
  });

  // ==================== 挑战 4: 数字工具集 ====================

  test("挑战4: 数学工具", () => {
    const MathTools = {
      // 判断是否为整数
      isInteger(n) {
        return Number.isInteger(n);
      },

      // 判断是否在范围内
      inRange(n, min, max) {
        return n >= min && n <= max;
      },

      // 限制在范围内
      clamp(n, min, max) {
        return Math.min(Math.max(n, min), max);
      },

      // 生成范围随机数
      random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      },

      // 四舍五入到指定小数位
      round(n, decimals = 0) {
        const factor = 10 ** decimals;
        return Math.round(n * factor) / factor;
      },

      // 判断符号
      sign(n) {
        if (n > 0) return 1;
        if (n < 0) return -1;
        return 0;
      },

      // 使用位运算判断是否为2的幂
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

  // ==================== 挑战 5: 字符串转换器 ====================

  test("挑战5: 字符串转换", () => {
    // 驼峰转短横线
    function camelToKebab(str) {
      return str.replace(/([A-Z])/g, "-$1").toLowerCase();
    }

    // 短横线转驼峰
    function kebabToCamel(str) {
      return str.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    }

    // 首字母大写
    function capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // 单词首字母大写
    function titleCase(str) {
      return str.replace(/\b\w/g, c => c.toUpperCase());
    }

    // 反转字符串
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

  // ==================== 挑战 6: 类型检查工具 ====================

  test("挑战6: 高级类型检查", () => {
    const TypeCheck = {
      // 精确的类型检查
      getType(value) {
        return Object.prototype.toString.call(value).slice(8, -1);
      },

      // 检查是否为纯对象
      isPlainObject(value) {
        return this.getType(value) === "Object";
      },

      // 检查是否为空对象
      isEmptyObject(value) {
        return this.isPlainObject(value) && Object.keys(value).length === 0;
      },

      // 检查是否为空数组
      isEmptyArray(value) {
        return Array.isArray(value) && value.length === 0;
      },

      // 检查是否为Promise
      isPromise(value) {
        return value instanceof Promise ||
               (value !== null && typeof value === "object" &&
                typeof value.then === "function");
      },

      // 深度相等
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

  // ==================== 终极挑战: 完整的数据处理管道 ====================

  test("终极挑战: 数据处理管道", () => {
    // 实现一个数据处理管道
    class DataPipeline {
      constructor(data) {
        this.data = data;
        this.operations = [];
      }

      // 过滤: 使用逻辑与
      filter(predicate) {
        this.operations.push(d => d.filter(predicate));
        return this;
      }

      // 映射: 使用箭头函数
      map(mapper) {
        this.operations.push(d => d.map(mapper));
        return this;
      }

      // 排序: 使用比较函数
      sort(compareFn) {
        this.operations.push(d => [...d].sort(compareFn));
        return this;
      }

      // 分组: 使用对象属性
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

      // 扁平化
      flatten() {
        this.operations.push(d => d.flat(Infinity));
        return this;
      }

      // 去重
      unique() {
        this.operations.push(d => [...new Set(d)]);
        return this;
      }

      // 限制数量
      take(n) {
        this.operations.push(d => d.slice(0, n));
        return this;
      }

      // 跳过
      skip(n) {
        this.operations.push(d => d.slice(n));
        return this;
      }

      // 执行管道
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

    // 链式操作
    const result = new DataPipeline(users)
      .filter(u => u.active)                    // 只取活跃用户
      .filter(u => u.age >= 25)                 // 年龄 >= 25
      .sort((a, b) => a.age - b.age)           // 按年龄排序
      .groupBy("city")                          // 按城市分组
      .exec();

    expect(result.NYC.length).toBe(2);
    expect(result.NYC[0].name).toBe("Alice");
    expect(result.LA).toBeUndefined();         // LA的活跃用户不足25岁

    // 另一个管道
    const names = new DataPipeline(users)
      .map(u => u.name)
      .filter(n => n.length > 3)
      .take(3)
      .exec();

    expect(names).toEqual(["Alice", "Charlie", "David"]);
  });

  test("额外挑战: 位运算应用", () => {
    // 实现权限系统
    const READ = 1;    // 001
    const WRITE = 2;   // 010
    const EXECUTE = 4; // 100

    function hasPermission(permissions, flag) {
      return (permissions & flag) !== 0;
    }

    function addPermission(permissions, flag) {
      return permissions | flag;
    }

    function removePermission(permissions, flag) {
      return permissions & ~flag;
    }

    let perms = READ | WRITE;  // 011
    expect(hasPermission(perms, READ)).toBe(true);
    expect(hasPermission(perms, WRITE)).toBe(true);
    expect(hasPermission(perms, EXECUTE)).toBe(false);

    perms = addPermission(perms, EXECUTE);  // 111
    expect(hasPermission(perms, EXECUTE)).toBe(true);

    perms = removePermission(perms, WRITE);  // 101
    expect(hasPermission(perms, READ)).toBe(true);
    expect(hasPermission(perms, WRITE)).toBe(false);
    expect(hasPermission(perms, EXECUTE)).toBe(true);
  });

  test("额外挑战: 位运算交换变量", () => {
    // 使用位运算交换两个变量 (不使用临时变量)
    let a = 5;
    let b = 10;

    // XOR 交换
    a ^= b;
    b ^= a;
    a ^= b;

    expect(a).toBe(10);
    expect(b).toBe(5);
  });
});

console.log("🎯 模块02 - 运算符综合挑战完成！");
