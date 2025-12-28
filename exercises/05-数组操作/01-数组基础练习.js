/**
 * 模块 05: 数组操作 - 基础练习
 *
 * 学习目标:
 * - 掌握数组创建和初始化
 * - 熟练使用数组方法
 * - 理解数组迭代和遍历
 * - 掌握数组排序和搜索
 *
 * 说明：
 * 请完成每个 TODO 标记的任务，使测试通过
 */

import { test, expect, describe } from "bun:test";

describe("模块05 - 数组基础练习", () => {

  // ==================== 任务 1-10: 数组创建和访问 ====================

  test("任务1: 数组创建方式", () => {
    // TODO: 请用不同的方式创建包含 1,2,3,4,5 的数组

    // 1. 使用数组字面量
    const arr1 = [1, 2, 3, 4, 5];  // 已完成示例

    // 2. TODO: 使用 Array 构造函数
    const arr2 = undefined;

    // 3. TODO: 使用 Array.of
    const arr3 = undefined;

    // 4. TODO: 使用 Array.from
    const arr4 = undefined;

    // TODO: 验证这四个数组是否相等
    expect(arr1).toEqual(arr2);
    expect(arr2).toEqual(arr3);
    expect(arr3).toEqual(arr4);

    // TODO: 创建长度为 5 的空数组
    const arr5 = undefined;
    expect(arr5).toHaveLength(5);

    // TODO: 创建长度为 5 且全部填充 0 的数组
    const arr6 = undefined;
    expect(arr6).toEqual([0, 0, 0, 0, 0]);
  });

  test("任务2: 数组访问和修改", () => {
    const arr = ["apple", "banana", "cherry"];

    // TODO: 访问数组的第一个元素
    expect(arr[?]).toBe("apple");

    // TODO: 访问数组的最后一个元素
    expect(arr[?]).toBe("cherry");

    // TODO: 修改第二个元素为 "blueberry"
    // ? = "blueberry";
    expect(arr[1]).toBe("blueberry");

    // TODO: 使用 at() 方法访问最后一个元素
    expect(arr.at(?)).toBe("cherry");

    // TODO: 添加第四个元素 "date"
    // ? = "date";
    expect(arr).toHaveLength(4);
  });

  test("任务3: 数组解构", () => {
    const arr = [1, 2, 3, 4, 5];

    // TODO: 解构第一个和第二个元素
    const [first, second] = ?;
    expect(first).toBe(1);
    expect(second).toBe(2);

    // TODO: 跳过第一个元素，获取第二和第三个
    const [, a, b] = ?;
    expect(a).toBe(2);
    expect(b).toBe(3);

    // TODO: 使用剩余模式获取除第一个外的所有元素
    const [head, ...tail] = ?;
    expect(head).toBe(1);
    expect(tail).toEqual([2, 3, 4, 5]);
  });

  test("任务4: 数组基本方法", () => {
    const arr = [1, 2, 3, 4, 5];

    // TODO: 向数组末尾添加元素 6
    // arr.?(6);
    expect(arr).toContain(6);

    // TODO: 移除数组末尾的元素
    const popped = arr.?();
    expect(popped).toBe(6);
    expect(arr).toHaveLength(5);

    // TODO: 向数组开头添加元素 0
    // arr.?(0);
    expect(arr[0]).toBe(0);

    // TODO: 移除数组开头的元素
    const shifted = arr.?();
    expect(shifted).toBe(0);
  });

  test("任务5: 数组长度和清空", () => {
    const arr = [1, 2, 3, 4, 5];

    // TODO: 获取数组长度
    expect(arr.?).toBe(5);

    // TODO: 清空数组（使用 length 属性）
    // arr.? = 0;
    expect(arr).toHaveLength(0);
  });

  // ==================== 任务 6-15: 数组迭代方法 ====================

  test("任务6: forEach", () => {
    const arr = [1, 2, 3, 4, 5];
    let sum = 0;

    // TODO: 使用 forEach 计算数组元素的总和
    arr.?((item) => {
      sum += item;
    });

    expect(sum).toBe(15);
  });

  test("任务7: map", () => {
    const arr = [1, 2, 3, 4, 5];

    // TODO: 使用 map 将每个元素乘以 2
    const doubled = arr.?;
    expect(doubled).toEqual([2, 4, 6, 8, 10]);
  });

  test("任务8: filter", () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    // TODO: 筛选出所有偶数
    const evens = arr.?;
    expect(evens).toEqual([2, 4, 6, 8, 10]);

    // TODO: 筛选出所有大于 5 的数
    const greaterThan5 = arr.?;
    expect(greaterThan5).toEqual([6, 7, 8, 9, 10]);
  });

  test("任务9: reduce", () => {
    const arr = [1, 2, 3, 4, 5];

    // TODO: 使用 reduce 计算总和
    const sum = arr.?((acc, x) => acc + x, ?);
    expect(sum).toBe(15);

    // TODO: 使用 reduce 计算乘积
    const product = arr.?((acc, x) => acc * x, ?);
    expect(product).toBe(120);
  });

  test("任务10: find 和 findIndex", () => {
    const arr = [1, 2, 3, 4, 5];

    // TODO: 找到第一个大于 3 的元素
    const found = arr.?;
    expect(found).toBe(4);

    // TODO: 找到第一个大于 3 的元素的索引
    const index = arr.?;
    expect(index).toBe(3);
  });

  // ==================== 任务 11-20: 数组转换和排序 ====================

  test("任务11: sort", () => {
    const arr = [3, 1, 4, 1, 5, 9, 2, 6];

    // TODO: 升序排序（注意：sort 会修改原数组）
    const asc = [...arr].sort((a, b) => ?);
    expect(asc).toEqual([1, 1, 2, 3, 4, 5, 6, 9]);

    // TODO: 降序排序
    const desc = [...arr].sort((a, b) => ?);
    expect(desc).toEqual([9, 6, 5, 4, 3, 2, 1, 1]);
  });

  test("任务12: concat 和展开", () => {
    const arr1 = [1, 2, 3];
    const arr2 = [4, 5, 6];

    // TODO: 使用 concat 合并数组
    const merged1 = arr1.?([4, 5, 6]);
    expect(merged1).toEqual([1, 2, 3, 4, 5, 6]);

    // TODO: 使用展开运算符合并数组
    const merged2 = [?];
    expect(merged2).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test("任务13: slice 和 splice", () => {
    const arr = [1, 2, 3, 4, 5];

    // TODO: 使用 slice 获取子数组（不修改原数组）
    const sliced = arr.?;
    expect(sliced).toEqual([2, 3]);
    expect(arr).toEqual([1, 2, 3, 4, 5]); // 原数组不变

    // TODO: 使用 splice 删除元素（修改原数组）
    const spliced = [...arr];
    const removed = spliced.?;
    expect(removed).toEqual([2, 3]);
    expect(spliced).toEqual([1, 4, 5]);
  });

  test("任务14: includes 和 indexOf", () => {
    const arr = [1, 2, 3, 4, 5];

    // TODO: 检查是否包含 3
    expect(arr.?(3)).toBe(true);

    // TODO: 查找 3 的索引
    expect(arr.?(3)).toBe(2);

    // TODO: 查找不存在的元素
    expect(arr.?(10)).toBe(-1);
  });

  test("任务15: some 和 every", () => {
    const arr = [1, 2, 3, 4, 5];

    // TODO: 检查是否至少有一个偶数
    const hasEven = arr.?;
    expect(hasEven).toBe(true);

    // TODO: 检查是否所有元素都大于 0
    const allPositive = arr.?;
    expect(allPositive).toBe(true);
  });

  // ==================== 任务 16-20: 数组高级操作 ====================

  test("任务16: flat 和 flatMap", () => {
    const nested = [1, [2, [3, [4]]]];

    // TODO: 完全扁平化嵌套数组
    const flattened = nested.? ;
    expect(flattened).toEqual([1, 2, 3, 4]);

    // TODO: 使用 flatMap 先映射再扁平化
    const arr = [1, 2, 3];
    const flatMapped = arr.flatMap(x => [x, x * 2]);
    expect(flatMapped).toEqual([1, 2, 2, 4, 3, 6]);
  });

  test("任务17: join", () => {
    const arr = ["Hello", "World", "!"];

    // TODO: 用空格连接数组元素
    expect(arr.?(?)).toBe("Hello World !");

    // TODO: 用逗号连接数组元素
    expect(arr.?(?)).toBe("Hello,World,!");
  });

  test("任务18: reverse", () => {
    const arr = [1, 2, 3, 4, 5];

    // TODO: 反转数组（会修改原数组）
    const copy = [...arr];
    copy.?();
    expect(copy).toEqual([5, 4, 3, 2, 1]);

    // TODO: 不修改原数组的情况下反转
    const reversed = [...arr].?();
    expect(reversed).toEqual([5, 4, 3, 2, 1]);
    expect(arr).toEqual([1, 2, 3, 4, 5]); // 原数组不变
  });

  test("任务19: fill", () => {
    const arr = new Array(5);

    // TODO: 用 0 填充整个数组
    arr.?;
    expect(arr).toEqual([0, 0, 0, 0, 0]);
  });

  test("任务20: copyWithin", () => {
    const arr = [1, 2, 3, 4, 5];

    // TODO: 从位置 0 开始，复制位置 3 开始的元素
    arr.? ;
    expect(arr).toEqual([4, 5, 3, 4, 5]);
  });

  // ==================== 综合应用题 ====================

  test("综合题1: 数组分块", () => {
    function chunk(arr, size) {
      // TODO: 实现将数组分成指定大小的块
      // 提示：使用 slice 和循环
    }

    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    expect(chunk([1, 2, 3, 4, 5], 3)).toEqual([[1, 2, 3], [4, 5]]);
  });

  test("综合题2: 数组去重", () => {
    function unique(arr) {
      // TODO: 实现数组去重
      // 提示：使用 Set
    }

    expect(unique([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);
    expect(unique(["a", "b", "a", "c"])).toEqual(["a", "b", "c"]);
  });

  test("综合题3: 数组差集", () => {
    function difference(arr, values) {
      // TODO: 返回 arr 中有但 values 中没有的元素
      // 提示：使用 filter 和 includes
    }

    expect(difference([1, 2, 3, 4, 5], [2, 4])).toEqual([1, 3, 5]);
  });

  test("综合题4: 数组交集", () => {
    function intersection(...arrays) {
      // TODO: 返回所有数组中都存在的元素
      // 提示：使用 filter 和 every
    }

    expect(intersection([1, 2, 3], [2, 3, 4], [3, 4, 5])).toEqual([3]);
  });

  test("综合题5: 数组分组", () => {
    function groupBy(arr, fn) {
      // TODO: 按照指定函数的返回值分组
      // 提示：使用 reduce
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

console.log("🎯 模块05 - 数组基础练习完成！\n请查看 solutions/05-数组操作/01-数组基础练习.solution.js 获取参考答案");
