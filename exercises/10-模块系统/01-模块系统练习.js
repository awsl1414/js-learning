/**
 * 模块 10: ES Modules 模块系统 - 基础练习
 *
 * 学习目标:
 * - 理解 ES 模块系统
 * - 掌握导出 (export)
 * - 掌握导入 (import)
 * - 理解动态导入
 *
 * 提示: 遇到困难时可以查看 solutions/10-模块系统/01-模块系统练习.solution.js
 */

import { test, expect, describe } from "bun:test";

describe("模块10 - 模块系统练习", () => {

  test("任务1: 命名导出", () => {
    // TODO: 使用 export 关键字导出常量
    // export const PI = 3.14159;
    // export let count = 0;

    // TODO: 导出函数
    // export function add(a, b) {
    //   return a + b;
    // }

    // export const multiply = (a, b) => a * b;

    // TODO: 导出类
    // export class Calculator {
    //   add(a, b) { return a + b; }
    // }

    // TODO: 先声明后导出
    // const secret = "hidden";
    // export { secret };
  });

  test("任务2: 默认导出", () => {
    // TODO: 默认导出函数
    // export default function square(x) {
    //   return x * x;
    // }

    // 或
    // const square = (x) => x * x;
    // export default square;

    // 或
    // export default class { }
  });

  test("任务3: 导入", () => {
    // TODO: 命名导入
    // import { add, multiply } from "./math.js";

    // TODO: 重命名导入
    // import { add as sum } from "./math.js";

    // TODO: 导入所有
    // import * as math from "./math.js";

    // TODO: 默认导入
    // import square from "./math.js";

    // TODO: 混合导入
    // import square, { PI } from "./math.js";
  });

  test("任务4: 重导出", () => {
    // TODO: 重导出命名导出
    // export { add, multiply } from "./math.js";

    // TODO: 重导出并重命名
    // export { add as sum } from "./math.js";

    // TODO: 重导出默认
    // export { default } from "./math.js";

    // TODO: 重导出所有 (不包含默认)
    // export * from "./math.js";
  });

  test("任务5: 动态导入", async () => {
    // TODO: 动态导入返回 Promise
    // const module = await import("./math.js");
    // console.log(module.default);

    // TODO: 条件导入
    // if (needsMath) {
    //   const { add } = await import("./math.js");
    // }
  });

  test("任务6: import.meta", () => {
    // TODO: 获取模块 URL
    // console.log(import.meta.url);

    // TODO: 获取脚本标签属性
    // console.log(import.meta.scriptElement.dataset.version);
  });

  test("任务7: 顶层 await", async () => {
    // TODO: 在 ES 模块顶层可以使用 await
    // const response = await fetch("/api/config");
    // export const config = await response.json();
  });

  // 模拟模块测试
  test("综合题1: 模块模式", () => {
    // TODO: 使用闭包创建模块 (CommonJS 风格)
    const mathModule = (() => {
      const PI = 3.14159;

      function add(a, b) {
        return a + b;
      }

      function multiply(a, b) {
        return a * b;
      }

      return { PI, add, multiply };
    })();

    expect(mathModule.add(2, 3)).toBe(???);
    expect(mathModule.multiply(2, 3)).toBe(6);
    expect(mathModule.PI).toBeCloseTo(3.14, 1);
  });

  test("综合题2: 命名空间", () => {
    // TODO: 创建命名空间对象
    const App = {
      Utils: {
        format(str) {
          return str.trim();
        }
      },
      Config: {
        apiUrl: "https://api.example.com"
      }
    };

    expect(App.Utils.format(" hello ")).toBe(???);
    expect(App.Config.apiUrl).toBe("https://api.example.com");
  });

  test("综合题3: 模块依赖注入", () => {
    // TODO: 实现依赖注入模式
    function createModule(deps) {
      return {
        doSomething() {
          return deps.util.format("test");
        }
      };
    }

    const module = createModule({
      util: {
        format(str) {
          return str.toUpperCase();
        }
      }
    });

    expect(module.doSomething()).toBe(???);
  });
});

console.log("🎯 模块10 - 模块系统练习完成！");
