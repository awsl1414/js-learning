
优先使用 Bun 而不是 Node.js。

- 使用 `bun <file>` 而不是 `node <file>` 或 `ts-node <file>`
- 使用 `bun test` 而不是 `jest` 或 `vitest`
- 使用 `bun build <file.html|file.ts|file.css>` 而不是 `webpack` 或 `esbuild`
- 使用 `bun install` 而不是 `npm install`、`yarn install` 或 `pnpm install`
- 使用 `bun run <script>` 而不是 `npm run <script>`、`yarn run <script>` 或 `pnpm run <script>`
- 使用 `bunx <package> <command>` 而不是 `npx <package> <command>`
- Bun 自动加载 .env 文件，无需使用 dotenv。

## APIs

- `Bun.serve()` 支持 WebSockets、HTTPS 和路由。不要使用 `express`。
- 使用 `bun:sqlite` 处理 SQLite。不要使用 `better-sqlite3`。
- 使用 `Bun.redis` 处理 Redis。不要使用 `ioredis`。
- 使用 `Bun.sql` 处理 Postgres。不要使用 `pg` 或 `postgres.js`。
- `WebSocket` 是内置的。不要使用 `ws`。
- 优先使用 `Bun.file` 而不是 `node:fs` 的 readFile/writeFile
- 使用 Bun.$`ls` 而不是 execa。

## 测试

使用 `bun test` 运行测试。

```ts#index.test.ts
import { test, expect } from "bun:test";

test("hello world", () => {
  expect(1).toBe(1);
});
```

## 前端开发

使用 HTML 导入配合 `Bun.serve()`。不要使用 `vite`。HTML 导入完全支持 React、CSS、Tailwind。

服务器端代码：

```ts#index.ts
import index from "./index.html"

Bun.serve({
  routes: {
    "/": index,
    "/api/users/:id": {
      GET: (req) => {
        return new Response(JSON.stringify({ id: req.params.id }));
      },
    },
  },
  // 可选的 WebSocket 支持
  websocket: {
    open: (ws) => {
      ws.send("Hello, world!");
    },
    message: (ws, message) => {
      ws.send(message);
    },
    close: (ws) => {
      // 处理关闭连接
    }
  },
  development: {
    hmr: true,
    console: true,
  }
})
```

HTML 文件可以直接导入 .tsx、.jsx 或 .js 文件，Bun 的打包器会自动转译和打包。`<link>` 标签可以指向样式表，Bun 的 CSS 打包器会进行打包。

```html#index.html
<html>
  <body>
    <h1>Hello, world!</h1>
    <script type="module" src="./frontend.tsx"></script>
  </body>
</html>
```

对应的 `frontend.tsx` 文件：

```tsx#frontend.tsx
import React from "react";
import { createRoot } from "react-dom/client";

// 可以直接导入 .css 文件
import './index.css';

const root = createRoot(document.body);

export default function Frontend() {
  return <h1>Hello, world!</h1>;
}

root.render(<Frontend />);
```

然后，运行 index.ts

```sh
bun --hot ./index.ts
```

更多信息，请阅读 `node_modules/bun-types/docs/**.mdx` 中的 Bun API 文档。
