/**
 * 模块 07: 字符串与正则 - 基础练习
 *
 * 学习目标:
 * - 掌握字符串方法
 * - 理解正则表达式
 * - 熟练使用模板字符串
 * - 掌握字符串搜索和替换
 *
 * 提示: 遇到困难时可以查看 solutions/07-字符串与正则/01-字符串基础练习.solution.js
 */

import { test, expect, describe } from "bun:test";

describe("模块07 - 字符串与正则基础练习", () => {

  test("任务1: 字符串创建", () => {
    // TODO: 使用双引号、单引号和模板字符串创建字符串
    const str1 = ???;
    const str2 = ???;
    const str3 = ???;

    expect(str1).toBe("Hello");
    expect(str2).toBe("World");
    expect(str3).toBe("Hello World");
  });

  test("任务2: 模板字符串", () => {
    const name = "Alice";
    const age = 30;

    // TODO: 使用模板字符串和插值
    const greeting = `Hello, ${name}!`;
    expect(greeting).toBe("Hello, Alice!");

    // TODO: 在模板字符串中使用表达式
    const message = ???;
    expect(message).toBe("Alice is 30 years old");

    // TODO: 创建多行字符串
    const multiline = ???;
    expect(multiline).toContain("Line 2");
  });

  test("任务3: 字符串长度", () => {
    const str = "Hello";
    expect(str.length).toBe(???);

    // 空字符串
    expect("".length).toBe(0);

    // Unicode
    const emoji = "👋";
    expect(emoji.length).toBe(2);  // emoji 占两个代码单元
  });

  test("任务4: 字符串访问", () => {
    const str = "Hello";

    // TODO: 使用 charAt 访问字符
    expect(str.charAt(0)).toBe("H");
    expect(str.charAt(4)).toBe(???);

    // TODO: 使用方括号访问
    expect(str[0]).toBe("H");
    expect(str[4]).toBe(???);

    // TODO: 使用 at 方法 (ES2022) 支持负索引
    expect(str.at(0)).toBe("H");
    expect(str.at(-1)).toBe(???);
  });

  test("任务5: 字符串拼接", () => {
    const a = "Hello";
    const b = "World";

    // TODO: 使用 + 运算符
    expect(a + " " + b).toBe(???);

    // TODO: 使用 concat 方法
    expect(a.concat(" ", b)).toBe(???);

    // TODO: 使用模板字符串
    expect(`${a} ${b}`).toBe("Hello World");
  });

  test("任务6: 大小写转换", () => {
    const str = "Hello World";

    expect(str.toUpperCase()).toBe(???);
    expect(str.toLowerCase()).toBe("hello world");
  });

  test("任务7: 字符串搜索", () => {
    const str = "Hello World";

    // TODO: 使用 indexOf 查找子字符串位置
    expect(str.indexOf("World")).toBe(???);
    expect(str.indexOf("xyz")).toBe(-1);

    // TODO: 使用 includes 检查是否包含
    expect(str.includes("World")).toBe(???);
    expect(str.includes("xyz")).toBe(false);

    // TODO: 使用 startsWith 和 endsWith
    expect(str.startsWith("Hello")).toBe(???);
    expect(str.endsWith("World")).toBe(???);
  });

  test("任务8: 字符串提取", () => {
    const str = "Hello World";

    // TODO: 使用 slice 提取子字符串
    expect(str.slice(0, 5)).toBe("Hello");
    expect(str.slice(6)).toBe(???);
    expect(str.slice(-5)).toBe("World");

    // TODO: 使用 substring
    expect(str.substring(0, 5)).toBe(???);
  });

  test("任务9: 字符串修剪", () => {
    const str = "  Hello World  ";

    expect(str.trim()).toBe(???);
    expect(str.trimStart()).toBe("Hello World  ");
    expect(str.trimEnd()).toBe("  Hello World");
  });

  test("任务10: 字符串分割和连接", () => {
    const str = "a,b,c,d,e";

    // TODO: 使用 split 分割字符串
    const arr = str.split(",");
    expect(arr).toEqual(["a", "b", "c", "d", "e"]);

    // TODO: 使用 join 连接数组
    expect(arr.join("-")).toBe(???);
  });

  test("任务11: 字符串替换", () => {
    const str = "Hello World";

    // TODO: 使用 replace 替换第一次出现
    expect(str.replace("World", "Alice")).toBe(???);

    // TODO: 使用 replaceAll 替换所有出现
    expect("aaa".replaceAll("a", "b")).toBe(???);
  });

  test("任务12: 字符串重复", () => {
    expect("a".repeat(3)).toBe(???);
    expect("ab".repeat(2)).toBe("abab");
  });

  test("任务13: 字符串填充", () => {
    // TODO: 使用 padStart 在前面填充
    expect("5".padStart(2, "0")).toBe(???);
    expect("5".padStart(4, "0")).toBe("0005");

    // TODO: 使用 padEnd 在后面填充
    expect("5".padEnd(4, "x")).toBe(???);
  });

  test("任务14: 正则表达式基础", () => {
    // TODO: 使用正则字面量
    const regex1 = /hello/;
    expect(regex1.test("hello world")).toBe(???);

    // TODO: 使用 RegExp 构造函数
    const regex2 = new RegExp("hello");
    expect(regex2.test("hello world")).toBe(???);
  });

  test("任务15: 正则表达式标志", () => {
    // TODO: i - 不区分大小写
    expect(/hello/i.test("HELLO")).toBe(???);

    // TODO: g - 全局匹配
    expect("aaa".match(/a/g)).toHaveLength(???);

    // TODO: m - 多行模式
    expect(/^b$/m.test("a\nb")).toBe(true);
  });

  test("任务16: 正则字符类", () => {
    // \d - 数字
    expect(/\d/.test("123")).toBe(???);

    // \w - 单词字符
    expect(/\w/.test("abc")).toBe(???);

    // \s - 空白
    expect(/\s/.test("a b")).toBe(???);

    // [abc] - 字符集
    expect(/[abc]/.test("b")).toBe(???);

    // [^abc] - 否定字符集
    expect(/[^abc]/.test("d")).toBe(???);
  });

  test("任务17: 正则量词", () => {
    // * - 0次或多次
    expect(/ab*/.test("a")).toBe(???);
    expect(/ab*/.test("abbb")).toBe(true);

    // + - 1次或多次
    expect(/ab+/.test("a")).toBe(???);
    expect(/ab+/.test("ab")).toBe(true);

    // ? - 0次或1次
    expect(/ab?/.test("a")).toBe(???);
    expect(/ab?/.test("ab")).toBe(true);

    // {n} - n次
    expect(/a{3}/.test("aaa")).toBe(???);

    // {n,m} - n到m次
    expect(/a{2,4}/.test("aaa")).toBe(???);
  });

  test("任务18: 正则锚点", () => {
    // ^ - 开始
    expect(/^Hello/.test("Hello World")).toBe(???);

    // $ - 结束
    expect(/World$/.test("Hello World")).toBe(???);

    // \b - 单词边界
    expect(/\bhello\b/.test("hello world")).toBe(???);
  });

  test("任务19: 正则分组", () => {
    // TODO: 使用捕获分组提取日期部分
    const match = /(\d{4})-(\d{2})-(\d{2})/.exec("2024-01-15");
    expect(match[1]).toBe(???);
    expect(match[2]).toBe("01");
    expect(match[3]).toBe("15");
  });

  test("任务20: 正则方法", () => {
    // TODO: test 方法
    expect(/hello/.test("hello")).toBe(???);

    // TODO: exec 方法
    const result = /hello/.exec("hello world");
    expect(result[0]).toBe("hello");

    // TODO: match 方法
    expect("hello world".match(/hello/)?.[0]).toBe(???);

    // TODO: matchAll 方法
    const matches = [..."aaa".matchAll(/a/g)];
    expect(matches).toHaveLength(???);

    // TODO: replace 方法
    expect("hello world".replace(/hello/, "hi")).toBe(???);

    // TODO: split 方法
    expect("a,b,c".split(/,/)).toEqual(["a", "b", "c"]);
  });

  // 综合练习
  test("综合题1: 验证邮箱", () => {
    // TODO: 实现邮箱验证函数
    function isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    expect(isValidEmail("test@example.com")).toBe(???);
    expect(isValidEmail("invalid")).toBe(false);
  });

  test("综合题2: 驼峰转短横线", () => {
    // TODO: 将驼峰命名转换为短横线命名
    function camelToKebab(str) {
      return str.replace(/([A-Z])/g, "-$1").toLowerCase();
    }

    expect(camelToKebab("helloWorld")).toBe(???);
  });

  test("综合题3: 短横线转驼峰", () => {
    // TODO: 将短横线命名转换为驼峰命名
    function kebabToCamel(str) {
      return str.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    }

    expect(kebabToCamel("hello-world")).toBe(???);
  });

  test("综合题4: 获取URL参数", () => {
    // TODO: 解析 URL 查询参数
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
    expect(params.limit).toBe(???);
  });

  test("综合题5: 截断文本", () => {
    // TODO: 实现文本截断函数
    function truncate(text, length, suffix = "...") {
      if (text.length <= length) return text;
      return text.slice(0, length - suffix.length) + suffix;
    }

    expect(truncate("Hello World", 5)).toBe("He...");
    expect(truncate("Hi", 5)).toBe(???);
  });
});

console.log("🎯 模块07 - 字符串与正则基础练习完成！");
