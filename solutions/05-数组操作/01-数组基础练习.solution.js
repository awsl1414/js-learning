/**
 * 模块 05: 数组操作 - 基础练习
 *
 * 参考答案
 *
 * 说明：
 * 这是练习题的参考答案，请在完成练习后再查看
 */

import { test, expect, describe } from "bun:test";

describe("模块05 - 数组基础练习 (参考答案)", () => {

  // ==================== 任务 1-10: 数组创建和访问 ====================

  test("任务1: 数组创建方式", () => {
    // 1. 使用数组字面量
    const arr1 = [1, 2, 3, 4, 5];

    // 2. 使用 Array 构造函数
    const arr2 = new Array(1, 2, 3, 4, 5);

    // 3. 使用 Array.of
    const arr3 = Array.of(1, 2, 3, 4, 5);

    // 4. 使用 Array.from
    const arr4 = Array.from([1, 2, 3, 4, 5]);

    expect(arr1).toEqual(arr2);
    expect(arr2).toEqual(arr3);
    expect(arr3).toEqual(arr4);

    // 5. 创建长度为 5 的空数组
    const arr5 = new Array(5);
    expect(arr5).toHaveLength(5);

    // 6. 创建长度为 5 且全部填充 0 的数组
    const arr6 = new Array(5).fill(0);
    expect(arr6).toEqual([0, 0, 0, 0, 0]);
  });

  test("任务2: 数组访问和修改", () => {
    const arr = ["apple", "banana", "cherry"];

    // 访问第一个元素
    expect(arr[0]).toBe("apple");

    // 访问最后一个元素
    expect(arr[2]).toBe("cherry");

    // 修改第二个元素为 "blueberry"
    arr[1] = "blueberry";
    expect(arr[1]).toBe("blueberry");

    // 使用 at() 方法访问最后一个元素
    expect(arr.at(-1)).toBe("cherry");

    // 添加第四个元素 "date"
    arr[3] = "date";
    expect(arr).toHaveLength(4);
  });

  test("任务3: 数组解构", () => {
    const arr = [1, 2, 3, 4, 5];

    // 解构第一个和第二个元素
    const [first, second] = arr;
    expect(first).toBe(1);
    expect(second).toBe(2);

    // 跳过第一个元素，获取第二和第三个
    const [, a, b] = arr;
    expect(a).toBe(2);
    expect(b).toBe(3);

    // 使用剩余模式获取除第一个外的所有元素
    const [head, ...tail] = arr;
    expect(head).toBe(1);
    expect(tail).toEqual([2, 3, 4, 5]);
  });

  test("任务4: 数组基本方法", () => {
    const arr = [1, 2, 3, 4, 5];

    // 向数组末尾添加元素 6
    arr.push(6);
    expect(arr).toContain(6);

    // 移除数组末尾的元素
    const popped = arr.pop();
    expect(popped).toBe(6);
    expect(arr).toHaveLength(5);

    // 向数组开头添加元素 0
    arr.unshift(0);
    expect(arr[0]).toBe(0);

    // 移除数组开头的元素
    const shifted = arr.shift();
    expect(shifted).toBe(0);
  });

  test("任务5: 数组长度和清空", () => {
    const arr = [1, 2, 3, 4, 5];

    // 获取数组长度
    expect(arr.length).toBe(5);

    // 清空数组
    arr.length = 0;
    expect(arr).toHaveLength(0);
  });

  // ==================== 任务 6-15: 数组迭代方法 ====================

  test("任务6: forEach", () => {
    const arr = [1, 2, 3, 4, 5];
    let sum = 0;

    // 使用 forEach 计算数组元素的总和
    arr.forEach((item) => {
      sum += item;
    });

    expect(sum).toBe(15);
  });

  test("任务7: map", () => {
    const arr = [1, 2, 3, 4, 5];

    // 使用 map 将每个元素乘以 2
    const doubled = arr.map(x => x * 2);
    expect(doubled).toEqual([2, 4, 6, 8, 10]);
  });

  test("任务8: filter", () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    // 筛选出所有偶数
    const evens = arr.filter(x => x % 2 === 0);
    expect(evens).toEqual([2, 4, 6, 8, 10]);

    // 筛选出所有大于 5 的数
    const greaterThan5 = arr.filter(x => x > 5);
    expect(greaterThan5).toEqual([6, 7, 8, 9, 10]);
  });

  test("任务9: reduce", () => {
    const arr = [1, 2, 3, 4, 5];

    // 使用 reduce 计算总和
    const sum = arr.reduce((acc, x) => acc + x, 0);
    expect(sum).toBe(15);

    // 使用 reduce 计算乘积
    const product = arr.reduce((acc, x) => acc * x, 1);
    expect(product).toBe(120);
  });

  test("任务10: find 和 findIndex", () => {
    const arr = [1, 2, 3, 4, 5];

    // 找到第一个大于 3 的元素
    const found = arr.find(x => x > 3);
    expect(found).toBe(4);

    // 找到第一个大于 3 的元素的索引
    const index = arr.findIndex(x => x > 3);
    expect(index).toBe(3);
  });

  // ==================== 任务 11-20: 数组转换和排序 ====================

  test("任务11: sort", () => {
    const arr = [3, 1, 4, 1, 5, 9, 2, 6];

    // 升序排序
    const asc = [...arr].sort((a, b) => a - b);
    expect(asc).toEqual([1, 1, 2, 3, 4, 5, 6, 9]);

    // 降序排序
    const desc = [...arr].sort((a, b) => b - a);
    expect(desc).toEqual([9, 6, 5, 4, 3, 2, 1, 1]);
  });

  test("任务12: concat 和展开", () => {
    const arr1 = [1, 2, 3];
    const arr2 = [4, 5, 6];

    // 使用 concat 合并数组
    const merged1 = arr1.concat([4, 5, 6]);
    expect(merged1).toEqual([1, 2, 3, 4, 5, 6]);

    // 使用展开运算符合并数组
    const merged2 = [...arr1, ...arr2];
    expect(merged2).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test("任务13: slice 和 splice", () => {
    const arr = [1, 2, 3, 4, 5];

    // 使用 slice 获取子数组（不修改原数组）
    const sliced = arr.slice(1, 3);
    expect(sliced).toEqual([2, 3]);
    expect(arr).toEqual([1, 2, 3, 4, 5]);

    // 使用 splice 删除元素（修改原数组）
    const spliced = [...arr];
    const removed = spliced.splice(1, 2);
    expect(removed).toEqual([2, 3]);
    expect(spliced).toEqual([1, 4, 5]);
  });

  test("任务14: includes 和 indexOf", () => {
    const arr = [1, 2, 3, 4, 5];

    // 检查是否包含 3
    expect(arr.includes(3)).toBe(true);

    // 查找 3 的索引
    expect(arr.indexOf(3)).toBe(2);

    // 查找不存在的元素
    expect(arr.indexOf(10)).toBe(-1);
  });

  test("任务15: some 和 every", () => {
    const arr = [1, 2, 3, 4, 5];

    // 检查是否至少有一个偶数
    const hasEven = arr.some(x => x % 2 === 0);
    expect(hasEven).toBe(true);

    // 检查是否所有元素都大于 0
    const allPositive = arr.every(x => x > 0);
    expect(allPositive).toBe(true);
  });

  // ==================== 任务 16-20: 数组高级操作 ====================

  test("任务16: flat 和 flatMap", () => {
    const nested = [1, [2, [3, [4]]]];

    // 完全扁平化嵌套数组
    const flattened = nested.flat(Infinity);
    expect(flattened).toEqual([1, 2, 3, 4]);

    // 使用 flatMap 先映射再扁平化
    const arr = [1, 2, 3];
    const flatMapped = arr.flatMap(x => [x, x * 2]);
    expect(flatMapped).toEqual([1, 2, 2, 4, 3, 6]);
  });

  test("任务17: join", () => {
    const arr = ["Hello", "World", "!"];

    // 用空格连接数组元素
    expect(arr.join(" ")).toBe("Hello World !");

    // 用逗号连接数组元素
    expect(arr.join(",")).toBe("Hello,World,!");
  });

  test("任务18: reverse", () => {
    const arr = [1, 2, 3, 4, 5];

    // 反转数组（会修改原数组）
    const copy = [...arr];
    copy.reverse();
    expect(copy).toEqual([5, 4, 3, 2, 1]);

    // 不修改原数组的情况下反转
    const reversed = [...arr].reverse();
    expect(reversed).toEqual([5, 4, 3, 2, 1]);
    expect(arr).toEqual([1, 2, 3, 4, 5]);
  });

  test("任务19: fill", () => {
    const arr = new Array(5);

    // 用 0 填充整个数组
    arr.fill(0);
    expect(arr).toEqual([0, 0, 0, 0, 0]);
  });

  test("任务20: copyWithin", () => {
    const arr = [1, 2, 3, 4, 5];

    // 从位置 0 开始，复制位置 3 开始的元素
    arr.copyWithin(0, 3);
    expect(arr).toEqual([4, 5, 3, 4, 5]);
  });

  // ==================== 综合应用题 ====================

  test("综合题1: 数组分块", () => {
    function chunk(arr, size) {
      const chunks = [];
      for (let i = 0; i < arr.length; i += size) {
        chunks.push(arr.slice(i, i + size));
      }
      return chunks;
    }

    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    expect(chunk([1, 2, 3, 4, 5], 3)).toEqual([[1, 2, 3], [4, 5]]);
  });

  test("综合题2: 数组去重", () => {
    function unique(arr) {
      return [...new Set(arr)];
    }

    expect(unique([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);
    expect(unique(["a", "b", "a", "c"])).toEqual(["a", "b", "c"]);
  });

  test("综合题3: 数组差集", () => {
    function difference(arr, values) {
      return arr.filter(item => !values.includes(item));
    }

    expect(difference([1, 2, 3, 4, 5], [2, 4])).toEqual([1, 3, 5]);
  });

  test("综合题4: 数组交集", () => {
    function intersection(...arrays) {
      return arrays[0].filter(item =>
        arrays.every(arr => arr.includes(item))
      );
    }

    expect(intersection([1, 2, 3], [2, 3, 4], [3, 4, 5])).toEqual([3]);
  });

  test("综合题5: 数组分组", () => {
    function groupBy(arr, fn) {
      return arr.reduce((acc, item) => {
        const key = fn(item);
        if (!acc[key]) acc[key] = [];
        acc[key].push(item);
        return acc;
      }, {});
    }

    const users = [
      { name: "Alice", age: 30 },
      { name: "Bob", age: 25 },
      { name: "Charlie", age: 30 }
    ];

    const grouped = groupBy(users, user => user.age);
    expect(grouped[30]).toHaveLength(2);
    expect(grouped[25]).toHaveLength(1);
  });
});

console.log("✅ 模块05 - 数组基础练习 (参考答案)");
