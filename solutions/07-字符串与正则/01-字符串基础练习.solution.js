/**
 * 模块 07: 字符串与正则 - 基础练习
 *
 * 学习目标:
 * - 掌握字符串方法
 * - 理解正则表达式
 * - 熟练使用模板字符串
 * - 掌握字符串搜索和替换
 */

import { test, expect, describe } from "bun:test";

describe("模块07 - 字符串与正则基础练习", () => {

  test("任务1: 字符串创建", () => {
    const str1 = "Hello";
    const str2 = 'World';
    const str3 = `Hello World`;

    expect(str1).toBe("Hello");
    expect(str2).toBe("World");
    expect(str3).toBe("Hello World");
  });

  test("任务2: 模板字符串", () => {
    const name = "Alice";
    const age = 30;

    // 基本插值
    const greeting = `Hello, ${name}!`;
    expect(greeting).toBe("Hello, Alice!");

    // 表达式
    const message = `${name} is ${age} years old`;
    expect(message).toBe("Alice is 30 years old");

    // 多行
    const multiline = `Line 1
Line 2
Line 3`;
    expect(multiline).toContain("Line 2");
  });

  test("任务3: 字符串长度", () => {
    const str = "Hello";
    expect(str.length).toBe(5);

    // 空字符串
    expect("".length).toBe(0);

    // Unicode
    const emoji = "👋";
    expect(emoji.length).toBe(2);  // emoji 占两个代码单元
  });

  test("任务4: 字符串访问", () => {
    const str = "Hello";

    // charAt
    expect(str.charAt(0)).toBe("H");
    expect(str.charAt(4)).toBe("o");

    // 方括号
    expect(str[0]).toBe("H");
    expect(str[4]).toBe("o");

    // at (ES2022)
    expect(str.at(0)).toBe("H");
    expect(str.at(-1)).toBe("o");
  });

  test("任务5: 字符串拼接", () => {
    const a = "Hello";
    const b = "World";

    // +
    expect(a + " " + b).toBe("Hello World");

    // concat
    expect(a.concat(" ", b)).toBe("Hello World");

    // 模板字符串
    expect(`${a} ${b}`).toBe("Hello World");
  });

  test("任务6: 大小写转换", () => {
    const str = "Hello World";

    expect(str.toUpperCase()).toBe("HELLO WORLD");
    expect(str.toLowerCase()).toBe("hello world");
  });

  test("任务7: 字符串搜索", () => {
    const str = "Hello World";

    // indexOf
    expect(str.indexOf("World")).toBe(6);
    expect(str.indexOf("xyz")).toBe(-1);

    // includes
    expect(str.includes("World")).toBe(true);
    expect(str.includes("xyz")).toBe(false);

    // startsWith
    expect(str.startsWith("Hello")).toBe(true);

    // endsWith
    expect(str.endsWith("World")).toBe(true);
  });

  test("任务8: 字符串提取", () => {
    const str = "Hello World";

    // slice
    expect(str.slice(0, 5)).toBe("Hello");
    expect(str.slice(6)).toBe("World");
    expect(str.slice(-5)).toBe("World");

    // substring
    expect(str.substring(0, 5)).toBe("Hello");

    // substr (已废弃)
    expect(str.substr(0, 5)).toBe("Hello");
  });

  test("任务9: 字符串修剪", () => {
    const str = "  Hello World  ";

    expect(str.trim()).toBe("Hello World");
    expect(str.trimStart()).toBe("Hello World  ");
    expect(str.trimEnd()).toBe("  Hello World");
  });

  test("任务10: 字符串分割和连接", () => {
    const str = "a,b,c,d,e";

    // split
    const arr = str.split(",");
    expect(arr).toEqual(["a", "b", "c", "d", "e"]);

    // join
    expect(arr.join("-")).toBe("a-b-c-d-e");
  });

  test("任务11: 字符串替换", () => {
    const str = "Hello World";

    // replace (第一次)
    expect(str.replace("World", "Alice")).toBe("Hello Alice");

    // replaceAll
    expect("aaa".replaceAll("a", "b")).toBe("bbb");
  });

  test("任务12: 字符串重复", () => {
    expect("a".repeat(3)).toBe("aaa");
    expect("ab".repeat(2)).toBe("abab");
  });

  test("任务13: 字符串填充", () => {
    // padStart
    expect("5".padStart(2, "0")).toBe("05");
    expect("5".padStart(4, "0")).toBe("0005");

    // padEnd
    expect("5".padEnd(4, "x")).toBe("5xxx");
  });

  test("任务14: 正则表达式基础", () => {
    // 字面量
    const regex1 = /hello/;
    expect(regex1.test("hello world")).toBe(true);

    // 构造函数
    const regex2 = new RegExp("hello");
    expect(regex2.test("hello world")).toBe(true);
  });

  test("任务15: 正则表达式标志", () => {
    // i - 不区分大小写
    expect(/hello/i.test("HELLO")).toBe(true);

    // g - 全局匹配
    expect("aaa".match(/a/g)).toHaveLength(3);

    // m - 多行
    expect(/^b$/m.test("a\nb")).toBe(true);
  });

  test("任务16: 正则字符类", () => {
    // \d - 数字
    expect(/\d/.test("123")).toBe(true);

    // \w - 单词字符
    expect(/\w/.test("abc")).toBe(true);

    // \s - 空白
    expect(/\s/.test("a b")).toBe(true);

    // [abc] - 字符集
    expect(/[abc]/.test("b")).toBe(true);

    // [^abc] - 否定字符集
    expect(/[^abc]/.test("d")).toBe(true);
  });

  test("任务17: 正则量词", () => {
    // * - 0次或多次
    expect(/ab*/.test("a")).toBe(true);
    expect(/ab*/.test("abbb")).toBe(true);

    // + - 1次或多次
    expect(/ab+/.test("a")).toBe(false);
    expect(/ab+/.test("ab")).toBe(true);

    // ? - 0次或1次
    expect(/ab?/.test("a")).toBe(true);
    expect(/ab?/.test("ab")).toBe(true);

    // {n} - n次
    expect(/a{3}/.test("aaa")).toBe(true);

    // {n,m} - n到m次
    expect(/a{2,4}/.test("aaa")).toBe(true);
  });

  test("任务18: 正则锚点", () => {
    // ^ - 开始
    expect(/^Hello/.test("Hello World")).toBe(true);

    // $ - 结束
    expect(/World$/.test("Hello World")).toBe(true);

    // \b - 单词边界
    expect(/\bhello\b/.test("hello world")).toBe(true);
  });

  test("任务19: 正则分组", () => {
    // 捕获分组
    const match = /(\d{4})-(\d{2})-(\d{2})/.exec("2024-01-15");
    expect(match[1]).toBe("2024");
    expect(match[2]).toBe("01");
    expect(match[3]).toBe("15");
  });

  test("任务20: 正则方法", () => {
    // test
    expect(/hello/.test("hello")).toBe(true);

    // exec
    const result = /hello/.exec("hello world");
    expect(result[0]).toBe("hello");

    // match
    expect("hello world".match(/hello/)?.[0]).toBe("hello");

    // matchAll
    const matches = [..."aaa".matchAll(/a/g)];
    expect(matches).toHaveLength(3);

    // replace
    expect("hello world".replace(/hello/, "hi")).toBe("hi world");

    // split
    expect("a,b,c".split(/,/)).toEqual(["a", "b", "c"]);
  });

  // 综合练习
  test("综合题1: 验证邮箱", () => {
    function isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    expect(isValidEmail("test@example.com")).toBe(true);
    expect(isValidEmail("invalid")).toBe(false);
  });

  test("综合题2: 驼峰转短横线", () => {
    function camelToKebab(str) {
      return str.replace(/([A-Z])/g, "-$1").toLowerCase();
    }

    expect(camelToKebab("helloWorld")).toBe("hello-world");
  });

  test("综合题3: 短横线转驼峰", () => {
    function kebabToCamel(str) {
      return str.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    }

    expect(kebabToCamel("hello-world")).toBe("helloWorld");
  });

  test("综合题4: 获取URL参数", () => {
    function getUrlParams(url) {
      const params = {};
      const queryString = url.split("?")[1];
      if (!queryString) return params;

      queryString.split("&").forEach(pair => {
        const [key, value] = pair.split("=");
        params[decodeURIComponent(key)] = decodeURIComponent(value);
      });

      return params;
    }

    const params = getUrlParams("https://example.com?page=1&limit=10");
    expect(params.page).toBe("1");
    expect(params.limit).toBe("10");
  });

  test("综合题5: 截断文本", () => {
    function truncate(text, length, suffix = "...") {
      if (text.length <= length) return text;
      return text.slice(0, length - suffix.length) + suffix;
    }

    expect(truncate("Hello World", 5)).toBe("He...");
    expect(truncate("Hi", 5)).toBe("Hi");
  });
});

console.log("🎯 模块07 - 字符串与正则基础练习完成！");
