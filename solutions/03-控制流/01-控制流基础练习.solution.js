/**
 * 模块 03: 控制流 - 基础练习
 *
 * 参考答案
 */

import { test, expect, describe } from "bun:test";

describe("模块03 - 控制流基础练习 (参考答案)", () => {

  test("任务1: if-else 基础", () => {
    function getGrade(score) {
      if (score >= 90) {
        return "A";
      } else if (score >= 80) {
        return "B";
      } else if (score >= 70) {
        return "C";
      } else if (score >= 60) {
        return "D";
      } else {
        return "F";
      }
    }

    expect(getGrade(95)).toBe("A");
    expect(getGrade(85)).toBe("B");
    expect(getGrade(75)).toBe("C");
    expect(getGrade(65)).toBe("D");
    expect(getGrade(55)).toBe("F");
  });

  test("任务2: 三元运算符", () => {
    function max(a, b) {
      return a > b ? a : b;
    }

    function min(a, b) {
      return a < b ? a : b;
    }

    function sign(n) {
      return n > 0 ? "positive" : n < 0 ? "negative" : "zero";
    }

    expect(max(5, 10)).toBe(10);
    expect(min(5, 10)).toBe(5);
    expect(sign(10)).toBe("positive");
    expect(sign(-5)).toBe("negative");
    expect(sign(0)).toBe("zero");
  });

  test("任务3: 逻辑运算符短路", () => {
    function getValue(a, b) {
      return a || b;
    }

    function getDefault(value, defaultValue) {
      return value ?? defaultValue;
    }

    expect(getValue(0, 10)).toBe(10);
    expect(getValue("hello", 10)).toBe("hello");
    expect(getDefault(null, "default")).toBe("default");
    expect(getDefault(0, "default")).toBe(0);
  });

  test("任务4: switch 语句", () => {
    function getDayName(day) {
      switch (day) {
        case 1: return "周一";
        case 2: return "周二";
        case 3: return "周三";
        case 4: return "周四";
        case 5: return "周五";
        case 6: return "周六";
        case 7: return "周日";
        default: return "未知";
      }
    }

    function getMonthDays(month) {
      switch (month) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
          return 31;
        case 4:
        case 6:
        case 9:
        case 11:
          return 30;
        case 2:
          return 28;
        default:
          return "未知";
      }
    }

    expect(getDayName(1)).toBe("周一");
    expect(getDayName(7)).toBe("周日");
    expect(getMonthDays(1)).toBe(31);
    expect(getMonthDays(2)).toBe(28);
    expect(getMonthDays(4)).toBe(30);
  });

  test("任务5: 提前返回 (Guard Clause)", () => {
    function divide(a, b) {
      if (b === 0) {
        return "不能除以零";
      }
      return a / b;
    }

    function getDiscount(age, isMember) {
      if (isMember) {
        return 0.8;
      }
      if (age < 18) {
        return 0.9;
      }
      if (age >= 65) {
        return 0.85;
      }
      return 1;
    }

    expect(divide(10, 2)).toBe(5);
    expect(divide(10, 0)).toBe("不能除以零");
    expect(getDiscount(25, true)).toBe(0.8);
    expect(getDiscount(10, false)).toBe(0.9);
    expect(getDiscount(70, false)).toBe(0.85);
  });

  test("任务6: for 循环基础", () => {
    function sum(n) {
      let total = 0;
      for (let i = 1; i <= n; i++) {
        total += i;
      }
      return total;
    }

    function factorial(n) {
      let result = 1;
      for (let i = 2; i <= n; i++) {
        result *= i;
      }
      return result;
    }

    expect(sum(5)).toBe(15);
    expect(factorial(5)).toBe(120);
  });

  test("任务7: while 循环", () => {
    function findFirst(str, char) {
      let i = 0;
      while (i < str.length && str[i] !== char) {
        i++;
      }
      return i < str.length ? i : -1;
    }

    function countdown(n) {
      const result = [];
      while (n > 0) {
        result.push(n);
        n--;
      }
      return result;
    }

    expect(findFirst("hello", "l")).toBe(2);
    expect(findFirst("hello", "x")).toBe(-1);
    expect(countdown(5)).toEqual([5, 4, 3, 2, 1]);
  });

  test("任务8: do-while 循环", () => {
    function gcd(a, b) {
      do {
        let temp = b;
        b = a % b;
        a = temp;
      } while (b !== 0);
      return a;
    }

    expect(gcd(12, 18)).toBe(6);
    expect(gcd(17, 23)).toBe(1);
  });

  test("任务9: for...of 循环", () => {
    function sumArray(arr) {
      let total = 0;
      for (const item of arr) {
        total += item;
      }
      return total;
    }

    function filterPositive(arr) {
      const result = [];
      for (const item of arr) {
        if (item > 0) {
          result.push(item);
        }
      }
      return result;
    }

    expect(sumArray([1, 2, 3, 4, 5])).toBe(15);
    expect(filterPositive([1, -2, 3, -4, 5])).toEqual([1, 3, 5]);
  });

  test("任务10: for...in 循环", () => {
    function sumObject(obj) {
      let total = 0;
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          total += obj[key];
        }
      }
      return total;
    }

    function getObjectKeys(obj) {
      const keys = [];
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          keys.push(key);
        }
      }
      return keys;
    }

    const obj = { a: 1, b: 2, c: 3 };
    expect(sumObject(obj)).toBe(6);
    expect(getObjectKeys(obj)).toEqual(["a", "b", "c"]);
  });

  test("任务11: break 语句", () => {
    function findFirstNegative(arr) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] < 0) {
          return arr[i];
        }
      }
      return null;
    }

    function findLimit(arr, limit) {
      for (const item of arr) {
        if (item > limit) {
          return item;
        }
      }
      return null;
    }

    expect(findFirstNegative([1, 2, -3, 4, -5])).toBe(-3);
    expect(findFirstNegative([1, 2, 3])).toBe(null);
    expect(findLimit([1, 3, 5, 7, 9], 5)).toBe(7);
  });

  test("任务12: continue 语句", () => {
    function sumEvenNumbers(arr) {
      let total = 0;
      for (const num of arr) {
        if (num % 2 !== 0) {
          continue;
        }
        total += num;
      }
      return total;
    }

    function filterLongWords(words, minLength) {
      const result = [];
      for (const word of words) {
        if (word.length < minLength) {
          continue;
        }
        result.push(word);
      }
      return result;
    }

    expect(sumEvenNumbers([1, 2, 3, 4, 5, 6])).toBe(12);
    expect(filterLongWords(["a", "bb", "ccc", "dddd"], 3)).toEqual(["ccc", "dddd"]);
  });

  test("任务13: 嵌套循环", () => {
    function multiplyMatrix(m1, m2) {
      const result = [];
      for (let i = 0; i < m1.length; i++) {
        result[i] = [];
        for (let j = 0; j < m2[0].length; j++) {
          let sum = 0;
          for (let k = 0; k < m2.length; k++) {
            sum += m1[i][k] * m2[k][j];
          }
          result[i][j] = sum;
        }
      }
      return result;
    }

    const matrix1 = [[1, 2], [3, 4]];
    const matrix2 = [[5, 6], [7, 8]];
    const result = multiplyMatrix(matrix1, matrix2);

    expect(result[0][0]).toBe(19);
    expect(result[0][1]).toBe(22);
    expect(result[1][0]).toBe(43);
    expect(result[1][1]).toBe(50);
  });

  test("任务14: 标签和 break", () => {
    function searchInMatrix(matrix, target) {
      outer: for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
          if (matrix[i][j] === target) {
            return [i, j];
          }
        }
      }
      return null;
    }

    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ];

    expect(searchInMatrix(matrix, 5)).toEqual([1, 1]);
    expect(searchInMatrix(matrix, 9)).toEqual([2, 2]);
    expect(searchInMatrix(matrix, 10)).toBe(null);
  });

  test("任务15: 统计字符出现次数", () => {
    function countChars(str) {
      const counts = {};
      for (const char of str) {
        counts[char] = (counts[char] || 0) + 1;
      }
      return counts;
    }

    const result = countChars("hello");
    expect(result.h).toBe(1);
    expect(result.e).toBe(1);
    expect(result.l).toBe(2);
    expect(result.o).toBe(1);
  });

  test("综合题1: FizzBuzz 问题", () => {
    function fizzBuzz(n) {
      const result = [];
      for (let i = 1; i <= n; i++) {
        if (i % 15 === 0) {
          result.push("FizzBuzz");
        } else if (i % 3 === 0) {
          result.push("Fizz");
        } else if (i % 5 === 0) {
          result.push("Buzz");
        } else {
          result.push(i);
        }
      }
      return result;
    }

    const result = fizzBuzz(15);
    expect(result[0]).toBe(1);
    expect(result[2]).toBe("Fizz");
    expect(result[4]).toBe("Buzz");
    expect(result[14]).toBe("FizzBuzz");
  });

  test("综合题2: 寻找峰值", () => {
    function findPeak(arr) {
      for (let i = 0; i < arr.length; i++) {
        const prev = i > 0 ? arr[i - 1] : -Infinity;
        const next = i < arr.length - 1 ? arr[i + 1] : -Infinity;
        if (arr[i] > prev && arr[i] > next) {
          return arr[i];
        }
      }
      return null;
    }

    expect(findPeak([1, 3, 2, 5, 4])).toBe(3);
    expect(findPeak([5, 4, 3, 2, 1])).toBe(5);
    expect(findPeak([1, 2, 3, 4, 5])).toBe(5);
  });

  test("综合题3: 二分查找", () => {
    function binarySearch(arr, target) {
      let left = 0;
      let right = arr.length - 1;

      while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) {
          return mid;
        } else if (arr[mid] < target) {
          left = mid + 1;
        } else {
          right = mid - 1;
        }
      }
      return -1;
    }

    const sorted = [1, 3, 5, 7, 9, 11, 13];
    expect(binarySearch(sorted, 7)).toBe(3);
    expect(binarySearch(sorted, 1)).toBe(0);
    expect(binarySearch(sorted, 13)).toBe(6);
    expect(binarySearch(sorted, 4)).toBe(-1);
  });

  test("综合题4: 打印菱形", () => {
    function generateDiamond(n) {
      const result = [];
      for (let i = 1; i <= n; i++) {
        const spaces = " ".repeat(n - i);
        const stars = "*".repeat(2 * i - 1);
        result.push(spaces + stars);
      }
      for (let i = n - 1; i >= 1; i--) {
        const spaces = " ".repeat(n - i);
        const stars = "*".repeat(2 * i - 1);
        result.push(spaces + stars);
      }
      return result;
    }

    const diamond = generateDiamond(3);
    expect(diamond[0]).toBe("  *");
    expect(diamond[1]).toBe(" ***");
    expect(diamond[2]).toBe("*****");
    expect(diamond[3]).toBe(" ***");
    expect(diamond[4]).toBe("  *");
  });

  test("综合题5: 质数判断", () => {
    function isPrime(n) {
      if (n < 2) return false;
      if (n === 2) return true;
      if (n % 2 === 0) return false;

      for (let i = 3; i <= Math.sqrt(n); i += 2) {
        if (n % i === 0) {
          return false;
        }
      }
      return true;
    }

    expect(isPrime(2)).toBe(true);
    expect(isPrime(3)).toBe(true);
    expect(isPrime(4)).toBe(false);
    expect(isPrime(17)).toBe(true);
    expect(isPrime(18)).toBe(false);
  });

  test("综合题6: 数组去重", () => {
    function unique(arr) {
      const result = [];
      for (const item of arr) {
        if (!result.includes(item)) {
          result.push(item);
        }
      }
      return result;
    }

    expect(unique([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);
    expect(unique(["a", "b", "a", "c"])).toEqual(["a", "b", "c"]);
  });

  test("综合题7: 数组扁平化", () => {
    function flatten(arr) {
      const result = [];
      for (const item of arr) {
        if (Array.isArray(item)) {
          for (const nested of flatten(item)) {
            result.push(nested);
          }
        } else {
          result.push(item);
        }
      }
      return result;
    }

    expect(flatten([1, [2, [3, [4]]])).toEqual([1, 2, 3, 4]);
    expect(flatten([[1, 2], [3, 4]])).toEqual([1, 2, 3, 4]);
  });

  test("综合题8: 冒泡排序", () => {
    function bubbleSort(arr) {
      const copy = [...arr];
      for (let i = 0; i < copy.length; i++) {
        for (let j = 0; j < copy.length - 1 - i; j++) {
          if (copy[j] > copy[j + 1]) {
            [copy[j], copy[j + 1]] = [copy[j + 1], copy[j]];
          }
        }
      }
      return copy;
    }

    expect(bubbleSort([3, 1, 4, 1, 5])).toEqual([1, 1, 3, 4, 5]);
    expect(bubbleSort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
  });

  test("综合题9: 快速排序", () => {
    function quickSort(arr) {
      if (arr.length <= 1) {
        return arr;
      }

      const pivot = arr[0];
      const left = [];
      const right = [];

      for (let i = 1; i < arr.length; i++) {
        if (arr[i] < pivot) {
          left.push(arr[i]);
        } else {
          right.push(arr[i]);
        }
      }

      return [...quickSort(left), pivot, ...quickSort(right)];
    }

    expect(quickSort([3, 1, 4, 1, 5, 9, 2, 6])).toEqual([1, 1, 2, 3, 4, 5, 6, 9]);
  });

  test("综合题10: 计算器", () => {
    function calculator(expression) {
      const tokens = expression.match(/(\d+\.?\d*|\+|\-|\*|\/)/g);
      if (!tokens) return "Invalid expression";

      let result = parseFloat(tokens[0]);
      for (let i = 1; i < tokens.length; i += 2) {
        const op = tokens[i];
        const num = parseFloat(tokens[i + 1]);
        switch (op) {
          case "+": result += num; break;
          case "-": result -= num; break;
          case "*": result *= num; break;
          case "/": result /= num; break;
        }
      }
      return result;
    }

    expect(calculator("2+3*4")).toBe(14);
    expect(calculator("10-3*2")).toBe(4);
    expect(calculator("20/4+1")).toBe(6);
  });
});

console.log("✅ 模块03 - 控制流基础练习 (参考答案)");
