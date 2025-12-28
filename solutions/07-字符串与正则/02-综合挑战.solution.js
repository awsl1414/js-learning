/**
 * 模块 07: 字符串与正则 - 综合挑战
 */

import { test, expect, describe } from "bun:test";

describe("模块07 - 字符串与正则综合挑战", () => {

  test("挑战1: 模板引擎", () => {
    function render(template, data) {
      return template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
        return data[key] ?? "";
      });
    }

    const template = "Hello {{name}}, you are {{age}} years old";
    const data = { name: "Alice", age: 30 };

    expect(render(template, data)).toBe("Hello Alice, you are 30 years old");
  });

  test("挑战2: 字符串格式化", () => {
    function format(str, ...args) {
      return str.replace(/\{(\d+)\}/g, (_, index) => args[index] ?? "");
    }

    expect(format("Hello {0} {1}", "Alice", "Smith")).toBe("Hello Alice Smith");
    expect(format("{0} + {1} = {2}", 1, 2, 3)).toBe("1 + 2 = 3");
  });

  test("挑战3: 正则构建器", () => {
    class RegexBuilder {
      constructor() {
        this.pattern = "";
        this.flags = "";
      }

      literal(text) {
        this.pattern += text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        return this;
      }

      digit() {
        this.pattern += "\\d";
        return this;
      }

      word() {
        this.pattern += "\\w";
        return this;
      }

      whitespace() {
        this.pattern += "\\s";
        return this;
      }

      anyOf(...chars) {
        this.pattern += `[${chars.join("")}]`;
        return this;
      }

      oneOrMore() {
        this.pattern += "+";
        return this;
      }

      zeroOrMore() {
        this.pattern += "*";
        return this;
      }

      optional() {
        this.pattern += "?";
        return this;
      }

      ignoreCase() {
        this.flags += "i";
        return this;
      }

      global() {
        this.flags += "g";
        return this;
      }

      build() {
        return new RegExp(this.pattern, this.flags);
      }
    }

    const emailRegex = new RegexBuilder()
      .word().oneOrMore()
      .literal("@")
      .word().oneOrMore()
      .literal(".")
      .word().oneOrMore()
      .build();

    expect(emailRegex.test("user@example.com")).toBe(true);
  });

  test("挑战4: 字符串计算器", () => {
    function evaluate(expr) {
      // 简单的计算器，支持 + - * /
      const tokens = expr.match(/(\d+\.?\d*|\+|\-|\*|\/)/g);
      if (!tokens) return NaN;

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

    expect(evaluate("2+3*4")).toBe(14);
    expect(evaluate("10-2*3")).toBe(4);
  });

  test("挑战5: HTML 转义", () => {
    function escapeHtml(str) {
      const map = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      };
      return str.replace(/[&<>"']/g, m => map[m]);
    }

    expect(escapeHtml("<div>Hello & 'World'</div>"))
      .toBe("&lt;div&gt;Hello &amp; &#39;World&#39;&lt;/div&gt;");
  });

  test("挑战6: 字符串着色", () => {
    function highlight(str, keyword, className = "highlight") {
      const regex = new RegExp(`(${keyword})`, "gi");
      return str.replace(regex, `<span class="${className}">$1</span>`);
    }

    expect(highlight("Hello World", "world"))
      .toBe('Hello <span class="highlight">World</span>');
  });

  test("挑战7: Base64 编解码", () => {
    function base64Encode(str) {
      return btoa(unescape(encodeURIComponent(str)));
    }

    function base64Decode(str) {
      return decodeURIComponent(escape(atob(str)));
    }

    const original = "Hello 你好";
    const encoded = base64Encode(original);
    const decoded = base64Decode(encoded);

    expect(decoded).toBe(original);
  });

  test("挑战8: 正则命名捕获组", () => {
    function parseDate(str) {
      const regex = /^(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})$/;
      const match = str.match(regex);
      if (!match) return null;
      return match.groups;
    }

    const result = parseDate("2024-01-15");
    expect(result?.year).toBe("2024");
    expect(result?.month).toBe("01");
    expect(result?.day).toBe("15");
  });

  test("挑战9: 字符串相似度", () => {
    function levenshtein(a, b) {
      const matrix = [];

      for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
      }

      for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
      }

      for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
          if (b.charAt(i - 1) === a.charAt(j - 1)) {
            matrix[i][j] = matrix[i - 1][j - 1];
          } else {
            matrix[i][j] = Math.min(
              matrix[i - 1][j - 1] + 1,
              matrix[i][j - 1] + 1,
              matrix[i - 1][j] + 1
            );
          }
        }
      }

      return matrix[b.length][a.length];
    }

    expect(levenshtein("kitten", "sitting")).toBe(3);
    expect(levenshtein("hello", "hello")).toBe(0);
  });

  test("挑战10: 字符串压缩", () => {
    function compress(str) {
      if (!str) return "";
      let compressed = "";
      let count = 1;

      for (let i = 0; i < str.length; i++) {
        if (str[i] === str[i + 1]) {
          count++;
        } else {
          compressed += str[i] + (count > 1 ? count : "");
          count = 1;
        }
      }

      return compressed;
    }

    expect(compress("aaabbc")).toBe("a3b2c");
    expect(compress("abc")).toBe("abc");
  });
});

console.log("🎯 模块07 - 字符串与正则综合挑战完成！");
