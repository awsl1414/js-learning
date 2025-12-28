/**
 * 模块 03: 控制流 - 综合挑战
 *
 * 本练习包含复杂的实际应用场景
 */

import { test, expect, describe } from "bun:test";

describe("模块03 - 控制流综合挑战", () => {

  // ==================== 挑战 1: 复杂表单验证 ====================

  test("挑战1: 多步骤表单验证器", () => {
    // 实现复杂的多步骤表单验证
    function validateRegistration(formData) {
      const errors = [];

      // 步骤1: 用户名验证
      const username = formData.username ?? "";
      if (username.length < 3 || username.length > 20) {
        errors.push("用户名长度必须在3-20个字符之间");
      }
      if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        errors.push("用户名只能包含字母、数字和下划线");
      }
      if (/^\d/.test(username)) {
        errors.push("用户名不能以数字开头");
      }

      // 步骤2: 邮箱验证
      const email = formData.email ?? "";
      if (!/^[^\s@]+@([^\s@]+\.)+[^\s@]+$/.test(email)) {
        errors.push("邮箱格式不正确");
      }

      // 步骤3: 密码强度验证
      const password = formData.password ?? "";
      const confirmPassword = formData.confirmPassword ?? "";

      if (password.length < 8) {
        errors.push("密码至少8个字符");
      }
      if (!/[a-z]/.test(password)) {
        errors.push("密码必须包含小写字母");
      }
      if (!/[A-Z]/.test(password)) {
        errors.push("密码必须包含大写字母");
      }
      if (!/\d/.test(password)) {
        errors.push("密码必须包含数字");
      }
      if (!/[!@#$%^&*]/.test(password)) {
        errors.push("密码必须包含特殊字符 (!@#$%^&*)");
      }
      if (password !== confirmPassword) {
        errors.push("两次密码不一致");
      }

      // 步骤4: 年龄验证
      const age = formData.age;
      if (typeof age !== "number" || age < 13 || age > 120) {
        errors.push("年龄必须在13-120之间");
      }

      return {
        isValid: errors.length === 0,
        errors,
        errorCount: errors.length
      };
    }

    // 测试有效表单
    const validForm = {
      username: "Alice123",
      email: "alice@example.com",
      password: "Pass123!",
      confirmPassword: "Pass123!",
      age: 25
    };
    expect(validateRegistration(validForm).isValid).toBe(true);

    // 测试无效表单
    const invalidForm = {
      username: "1a",
      email: "invalid",
      password: "weak",
      confirmPassword: "different",
      age: 10
    };
    const result = validateRegistration(invalidForm);
    expect(result.isValid).toBe(false);
    expect(result.errorCount).toBeGreaterThan(5);
  });

  // ==================== 挑战 2: 数据分析工具集 ====================

  test("挑战2: 统计分析工具", () => {
    const StatsAnalyzer = {
      // 计算平均值
      mean(arr) {
        if (arr.length === 0) return 0;
        let sum = 0;
        for (const num of arr) {
          sum += num;
        }
        return sum / arr.length;
      },

      // 计算中位数
      median(arr) {
        if (arr.length === 0) return 0;
        const sorted = [...arr].sort((a, b) => a - b);
        const mid = Math.floor(sorted.length / 2);
        return sorted.length % 2 !== 0
          ? sorted[mid]
          : (sorted[mid - 1] + sorted[mid]) / 2;
      },

      // 计算众数
      mode(arr) {
        if (arr.length === 0) return [];
        const frequency = {};
        for (const num of arr) {
          frequency[num] = (frequency[num] || 0) + 1;
        }

        let maxFreq = 0;
        let modes = [];
        for (const num in frequency) {
          if (frequency[num] > maxFreq) {
            maxFreq = frequency[num];
            modes = [Number(num)];
          } else if (frequency[num] === maxFreq) {
            modes.push(Number(num));
          }
        }
        return modes;
      },

      // 计算标准差
      standardDeviation(arr) {
        if (arr.length === 0) return 0;
        const mean = this.mean(arr);
        let sumSquaredDiff = 0;
        for (const num of arr) {
          sumSquaredDiff += (num - mean) ** 2;
        }
        return Math.sqrt(sumSquaredDiff / arr.length);
      },

      // 找出异常值
      findOutliers(arr) {
        if (arr.length < 4) return [];
        const sorted = [...arr].sort((a, b) => a - b);
        const q1 = sorted[Math.floor(sorted.length * 0.25)];
        const q3 = sorted[Math.floor(sorted.length * 0.75)];
        const iqr = q3 - q1;
        const lowerBound = q1 - 1.5 * iqr;
        const upperBound = q3 + 1.5 * iqr;

        const outliers = [];
        for (const num of arr) {
          if (num < lowerBound || num > upperBound) {
            outliers.push(num);
          }
        }
        return outliers;
      }
    };

    const data = [1, 2, 2, 3, 4, 5, 5, 5, 6, 100];

    expect(StatsAnalyzer.mean(data)).toBeCloseTo(13.3, 1);
    expect(StatsAnalyzer.median([1, 2, 3, 4, 5])).toBe(3);
    expect(StatsAnalyzer.median([1, 2, 3, 4])).toBe(2.5);
    expect(StatsAnalyzer.mode([1, 2, 2, 3, 3])).toEqual([2, 3]);
    expect(StatsAnalyzer.standardDeviation([1, 2, 3, 4, 5])).toBeCloseTo(1.41, 1);
    expect(StatsAnalyzer.findOutliers(data)).toContain(100);
  });

  // ==================== 挑战 3: 日程管理系统 ====================

  test("挑战3: 日程安排器", () => {
    class ScheduleManager {
      constructor() {
        this.events = [];
      }

      // 添加事件（检查冲突）
      addEvent(start, end, title) {
        // 检查时间冲突
        for (const event of this.events) {
          if (!(end <= event.start || start >= event.end)) {
            return { success: false, message: `与 "${event.title}" 时间冲突` };
          }
        }

        this.events.push({ start, end, title });
        this.events.sort((a, b) => a.start - b.start);
        return { success: true, message: "添加成功" };
      }

      // 查找空闲时间段
      findFreeSlots(startTime, endTime, duration) {
        const freeSlots = [];
        let currentStart = startTime;

        for (const event of this.events) {
          // 跳过不在范围内的
          if (event.end <= startTime || event.start >= endTime) {
            continue;
          }

          // 检查事件前是否有空闲时间
          if (currentStart + duration <= event.start && currentStart >= startTime) {
            freeSlots.push({ start: currentStart, end: event.start });
          }

          currentStart = Math.max(currentStart, event.end);
        }

        // 检查最后是否有空闲时间
        if (currentStart + duration <= endTime) {
          freeSlots.push({ start: currentStart, end: endTime });
        }

        return freeSlots;
      }

      // 获取今日事件
      getEventsForDay(hourStart, hourEnd) {
        const dayEvents = [];
        for (const event of this.events) {
          const eventHour = Math.floor(event.start / 60);
          if (eventHour >= hourStart && eventHour < hourEnd) {
            dayEvents.push(event);
          }
        }
        return dayEvents;
      }
    }

    const schedule = new ScheduleManager();

    // 时间以分钟为单位（0 = 00:00, 60 = 01:00）
    expect(schedule.addEvent(540, 600, "晨会").success).toBe(true);  // 9:00-10:00
    expect(schedule.addEvent(570, 630, "冲突事件").success).toBe(false);  // 9:30-10:30 冲突
    expect(schedule.addEvent(600, 660, "技术讨论").success).toBe(true);  // 10:00-11:00

    const freeSlots = schedule.findFreeSlots(540, 720, 30);  // 9:00-12:00, 30分钟
    expect(freeSlots.length).toBeGreaterThan(0);
  });

  // ==================== 挑战 4: 密码生成器 ====================

  test("挑战4: 安全密码生成器", () => {
    class PasswordGenerator {
      constructor() {
        this.lowercase = "abcdefghijklmnopqrstuvwxyz";
        this.uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        this.numbers = "0123456789";
        this.symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";
      }

      // 生成随机密码
      generate(options = {}) {
        const {
          length = 12,
          includeLowercase = true,
          includeUppercase = true,
          includeNumbers = true,
          includeSymbols = true,
          excludeSimilar = false  // 排除相似字符 (i, l, 1, L, o, 0, O)
        } = options;

        let charset = "";
        if (includeLowercase) charset += this.lowercase;
        if (includeUppercase) charset += this.uppercase;
        if (includeNumbers) charset += this.numbers;
        if (includeSymbols) charset += this.symbols;

        if (excludeSimilar) {
          const similar = /[il1Lo0O]/g;
          charset = charset.replace(similar, "");
        }

        if (charset.length === 0) {
          throw new Error("至少选择一种字符类型");
        }

        let password = "";
        const randomValues = new Uint32Array(length);
        crypto.getRandomValues(randomValues);

        for (let i = 0; i < length; i++) {
          password += charset[randomValues[i] % charset.length];
        }

        return password;
      }

      // 生成 passphrase
      generatePassphrase(wordCount = 4) {
        const words = [
          "correct", "horse", "battery", "staple", "apple", "breeze",
          "cloud", "dance", "elephant", "flower", "guitar", "harbor",
          "island", "jungle", "kangaroo", "lemon", "mountain", "nutmeg",
          "orange", "piano", "quiet", "river", "sunset", "tiger", "umbrella",
          "violet", "whisper", "xylophone", "yellow", "zebra"
        ];

        const passphrase = [];
        const randomValues = new Uint32Array(wordCount);
        crypto.getRandomValues(randomValues);

        for (let i = 0; i < wordCount; i++) {
          passphrase.push(words[randomValues[i] % words.length]);
        }

        return passphrase.join("-");
      }

      // 检查密码强度
      checkStrength(password) {
        let score = 0;

        // 长度
        if (password.length >= 8) score++;
        if (password.length >= 12) score++;
        if (password.length >= 16) score++;

        // 字符类型
        if (/[a-z]/.test(password)) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/\d/.test(password)) score++;
        if (/[!@#$%^&*]/.test(password)) score++;

        // 复杂度
        if (/\d.*\d.*\d/.test(password)) score++;
        if (/[a-z].*[A-Z]|[A-Z].*[a-z]/.test(password)) score++;

        if (score <= 3) return "弱";
        if (score <= 6) return "中等";
        return "强";
      }
    }

    const generator = new PasswordGenerator();

    // 测试密码生成
    const password1 = generator.generate({ length: 16 });
    expect(password1).toHaveLength(16);

    const password2 = generator.generate({
      length: 12,
      excludeSimilar: true
    });
    expect(password2).toHaveLength(12);
    expect(/[il1Lo0O]/.test(password2)).toBe(false);

    // 测试 passphrase
    const passphrase = generator.generatePassphrase(4);
    expect(passphrase.split("-")).toHaveLength(4);

    // 测试强度检查
    expect(generator.checkStrength("abc")).toBe("弱");
    expect(generator.checkStrength("abc12345")).toBe("弱");
    expect(generator.checkStrength("Abc123!@#")).toBe("中等");
    expect(generator.checkStrength("Abc123!@#xyzABC789")).toBe("强");
  });

  // ==================== 挑战 5: 文本分析器 ====================

  test("挑战5: 高级文本分析", () => {
    class TextAnalyzer {
      constructor(text) {
        this.text = text;
      }

      // 统计单词频率
      wordFrequency() {
        const words = this.text
          .toLowerCase()
          .replace(/[^\w\s]/g, "")
          .split(/\s+/)
          .filter(word => word.length > 0);

        const frequency = {};
        for (const word of words) {
          frequency[word] = (frequency[word] || 0) + 1;
        }

        // 按频率排序
        const sorted = [];
        for (const word in frequency) {
          sorted.push({ word, count: frequency[word] });
        }
        sorted.sort((a, b) => b.count - a.count);

        return sorted;
      }

      // 查找最长句子
      findLongestSentence() {
        const sentences = this.text.split(/[.!?]+/);
        let longest = "";

        for (const sentence of sentences) {
          const trimmed = sentence.trim();
          if (trimmed.length > longest.length) {
            longest = trimmed;
          }
        }

        return longest;
      }

      // 检测语言（基于常见词）
      detectLanguage() {
        const patterns = {
          english: /\b(the|and|is|in|at|of|to|a)\b/i,
          chinese: /[\u4e00-\u9fa5]/,
          spanish: /\b(el|la|de|que|y|en|un|es)\b/i,
          french: /\b(le|la|de|et|à|un|il|être)\b/i
        };

        let maxScore = 0;
        let detected = "unknown";

        for (const lang in patterns) {
          const matches = this.text.match(patterns[lang]);
          const score = matches ? matches.length : 0;
          if (score > maxScore) {
            maxScore = score;
            detected = lang;
          }
        }

        return detected;
      }

      // 阅读难度评估（基于句子和单词长度）
      readingLevel() {
        const sentences = this.text.split(/[.!?]+/).filter(s => s.trim().length > 0);
        const words = this.text.split(/\s+/).filter(w => w.length > 0);

        const avgSentenceLength = words.length / sentences.length;
        const avgWordLength = this.text.replace(/\s/g, "").length / words.length;

        // 简化的 Flesch Reading Ease
        if (avgSentenceLength < 8 && avgWordLength < 4) return "简单";
        if (avgSentenceLength < 15 && avgWordLength < 5) return "中等";
        return "困难";
      }
    }

    const text = "The quick brown fox jumps over the lazy dog. " +
                 "This sentence contains various words. " +
                 "Programming is fun and challenging!";

    const analyzer = new TextAnalyzer(text);

    const frequency = analyzer.wordFrequency();
    expect(frequency[0].word).toBe("the");

    expect(analyzer.detectLanguage()).toBe("english");
  });

  // ==================== 挑战 6: 游戏逻辑 ====================

  test("挑战6: 井字棋游戏", () => {
    class TicTacToe {
      constructor() {
        this.board = Array(9).fill(null);
        this.currentPlayer = "X";
        this.winner = null;
        this.isDraw = false;
      }

      makeMove(position) {
        if (this.winner || this.isDraw) return false;
        if (position < 0 || position > 8) return false;
        if (this.board[position] !== null) return false;

        this.board[position] = this.currentPlayer;
        this.checkWinner();

        if (!this.winner && !this.isBoardFull()) {
          this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
        }

        return true;
      }

      checkWinner() {
        const lines = [
          [0, 1, 2], [3, 4, 5], [6, 7, 8],  // rows
          [0, 3, 6], [1, 4, 7], [2, 5, 8],  // columns
          [0, 4, 8], [2, 4, 6]              // diagonals
        ];

        for (const line of lines) {
          const [a, b, c] = line;
          if (this.board[a] &&
              this.board[a] === this.board[b] &&
              this.board[a] === this.board[c]) {
            this.winner = this.board[a];
            return;
          }
        }

        if (this.isBoardFull()) {
          this.isDraw = true;
        }
      }

      isBoardFull() {
        return this.board.every(cell => cell !== null);
      }

      getStatus() {
        if (this.winner) return `${this.winner} 获胜!`;
        if (this.isDraw) return "平局!";
        return `${this.currentPlayer} 的回合`;
      }
    }

    const game = new TicTacToe();

    expect(game.makeMove(0)).toBe(true);   // X
    expect(game.makeMove(1)).toBe(true);   // O
    expect(game.makeMove(3)).toBe(true);   // X
    expect(game.makeMove(4)).toBe(true);   // O
    expect(game.makeMove(6)).toBe(true);   // X 获胜

    expect(game.getStatus()).toBe("X 获胜!");
  });

  // ==================== 挑战 7: 购物车系统 ====================

  test("挑战7: 购物车逻辑", () => {
    class ShoppingCart {
      constructor() {
        this.items = [];
        this.discounts = [];
      }

      // 添加商品
      addItem(product, price, quantity = 1) {
        const existing = this.items.find(item => item.product === product);
        if (existing) {
          existing.quantity += quantity;
        } else {
          this.items.push({ product, price, quantity });
        }
        return this;
      }

      // 移除商品
      removeItem(product) {
        const index = this.items.findIndex(item => item.product === product);
        if (index !== -1) {
          this.items.splice(index, 1);
        }
        return this;
      }

      // 更新数量
      updateQuantity(product, quantity) {
        const item = this.items.find(item => item.product === product);
        if (item) {
          if (quantity <= 0) {
            this.removeItem(product);
          } else {
            item.quantity = quantity;
          }
        }
        return this;
      }

      // 添加折扣
      addDiscount(name, condition, discount) {
        this.discounts.push({ name, condition, discount });
        return this;
      }

      // 计算总价
      calculateTotal() {
        let subtotal = 0;
        for (const item of this.items) {
          subtotal += item.price * item.quantity;
        }

        // 应用折扣
        let totalDiscount = 0;
        for (const discount of this.discounts) {
          if (discount.condition(this)) {
            totalDiscount += discount.discount(this);
          }
        }

        return {
          subtotal,
          discounts: totalDiscount,
          total: subtotal - totalDiscount
        };
      }

      // 获取商品数量
      getItemCount() {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
      }
    }

    const cart = new ShoppingCart();

    // 添加商品
    cart.addItem("Apple", 2, 3);
    cart.addItem("Banana", 1, 5);
    cart.addItem("Orange", 3, 2);

    expect(cart.getItemCount()).toBe(10);

    // 添加折扣
    cart.addDiscount(
      "满50减10",
      (cart) => cart.calculateTotal().subtotal >= 50,
      () => 10
    );

    const total = cart.calculateTotal();
    expect(total.subtotal).toBe(17);  // 6 + 5 + 6
    expect(total.total).toBe(17);     // 未满50，无折扣

    cart.addItem("Grape", 10, 5);  // 添加到 50 以上

    const total2 = cart.calculateTotal();
    expect(total2.total).toBe(57);  // 67 - 10
  });

  // ==================== 挑战 8: 二维数组操作 ====================

  test("挑战8: 矩阵运算工具", () => {
    const MatrixUtils = {
      // 转置矩阵
      transpose(matrix) {
        const rows = matrix.length;
        const cols = matrix[0].length;
        const result = [];

        for (let j = 0; j < cols; j++) {
          result[j] = [];
          for (let i = 0; i < rows; i++) {
            result[j][i] = matrix[i][j];
          }
        }

        return result;
      },

      // 旋转矩阵 90 度
      rotate(matrix) {
        const n = matrix.length;
        const result = [];

        for (let i = 0; i < n; i++) {
          result[i] = [];
          for (let j = n - 1; j >= 0; j--) {
            result[i][n - 1 - j] = matrix[j][i];
          }
        }

        return result;
      },

      // 螺旋遍历
      spiral(matrix) {
        const result = [];
        let top = 0, bottom = matrix.length - 1;
        let left = 0, right = matrix[0].length - 1;

        while (top <= bottom && left <= right) {
          // 上边
          for (let i = left; i <= right; i++) {
            result.push(matrix[top][i]);
          }
          top++;

          // 右边
          for (let i = top; i <= bottom; i++) {
            result.push(matrix[i][right]);
          }
          right--;

          // 下边
          if (top <= bottom) {
            for (let i = right; i >= left; i--) {
              result.push(matrix[bottom][i]);
            }
            bottom--;
          }

          // 左边
          if (left <= right) {
            for (let i = bottom; i >= top; i--) {
              result.push(matrix[i][left]);
            }
            left++;
          }
        }

        return result;
      },

      // 判断是否为对角矩阵
      isDiagonal(matrix) {
        const n = matrix.length;
        for (let i = 0; i < n; i++) {
          for (let j = 0; j < n; j++) {
            if (i !== j && matrix[i][j] !== 0) {
              return false;
            }
          }
        }
        return true;
      }
    };

    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ];

    expect(MatrixUtils.transpose(matrix)).toEqual([
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9]
    ]);

    expect(MatrixUtils.spiral(matrix)).toEqual([
      1, 2, 3, 6, 9, 8, 7, 4, 5
    ]);

    expect(MatrixUtils.isDiagonal([
      [1, 0, 0],
      [0, 2, 0],
      [0, 0, 3]
    ])).toBe(true);
  });

  // ==================== 挑战 9: 迷宫求解器 ====================

  test("挑战9: 迷宫寻路", () => {
    class MazeSolver {
      constructor(maze) {
        this.maze = maze;
        this.rows = maze.length;
        this.cols = maze[0].length;
        this.visited = [];
      }

      // 深度优先搜索
      solveDFS(start, end) {
        this.visited = Array(this.rows).fill(null)
          .map(() => Array(this.cols).fill(false));

        const path = [];
        if (this.dfsHelper(start.x, start.y, end.x, end.y, path)) {
          return path;
        }
        return null;
      }

      dfsHelper(x, y, endX, endY, path) {
        // 越界检查
        if (x < 0 || x >= this.rows || y < 0 || y >= this.cols) {
          return false;
        }

        // 墙壁或已访问
        if (this.maze[x][y] === 1 || this.visited[x][y]) {
          return false;
        }

        // 标记访问
        this.visited[x][y] = true;
        path.push({ x, y });

        // 到达终点
        if (x === endX && y === endY) {
          return true;
        }

        // 四个方向: 上、右、下、左
        const directions = [
          { dx: -1, dy: 0 },
          { dx: 0, dy: 1 },
          { dx: 1, dy: 0 },
          { dx: 0, dy: -1 }
        ];

        for (const dir of directions) {
          if (this.dfsHelper(x + dir.dx, y + dir.dy, endX, endY, path)) {
            return true;
          }
        }

        // 回溯
        path.pop();
        return false;
      }

      // 最短路径 (BFS)
      shortestPath(start, end) {
        const queue = [{ ...start, path: [{ x: start.x, y: start.y }] }];
        const visited = Array(this.rows).fill(null)
          .map(() => Array(this.cols).fill(false));
        visited[start.x][start.y] = true;

        const directions = [
          { dx: -1, dy: 0 },  // 上
          { dx: 0, dy: 1 },   // 右
          { dx: 1, dy: 0 },   // 下
          { dx: 0, dy: -1 }   // 左
        ];

        while (queue.length > 0) {
          const current = queue.shift();

          if (current.x === end.x && current.y === end.y) {
            return current.path;
          }

          for (const dir of directions) {
            const nx = current.x + dir.dx;
            const ny = current.y + dir.dy;

            if (nx >= 0 && nx < this.rows &&
                ny >= 0 && ny < this.cols &&
                !visited[nx][ny] && this.maze[nx][ny] !== 1) {

              visited[nx][ny] = true;
              queue.push({
                x: nx,
                y: ny,
                path: [...current.path, { x: nx, y: ny }]
              });
            }
          }
        }

        return null;
      }
    }

    // 0 = 路径, 1 = 墙壁
    const maze = [
      [0, 0, 1, 0],
      [1, 0, 1, 0],
      [0, 0, 0, 0],
      [0, 1, 1, 0]
    ];

    const solver = new MazeSolver(maze);
    const path = solver.shortestPath({ x: 0, y: 0 }, { x: 3, y: 3 });

    expect(path).not.toBeNull();
    expect(path[path.length - 1]).toEqual({ x: 3, y: 3 });
  });

  // ==================== 挑战 10: 简单解释器 ====================

  test("挑战10: 表达式求值器", () => {
    class ExpressionEvaluator {
      constructor() {
        this.variables = {};
      }

      // 设置变量
      setVariable(name, value) {
        this.variables[name] = value;
      }

      // 解析并计算简单表达式
      evaluate(expression) {
        // 移除空格
        expression = expression.replace(/\s+/g, "");

        // 替换变量
        for (const name in this.variables) {
          const regex = new RegExp(`\\b${name}\\b`, "g");
          expression = expression.replace(regex, this.variables[name]);
        }

        // 简单的计算器（只支持 + - * / 和括号）
        return this.evaluateExpression(expression);
      }

      evaluateExpression(expr) {
        // 处理括号
        while (true) {
          const lastClose = expr.lastIndexOf(")");
          if (lastClose === -1) break;

          const lastOpen = expr.lastIndexOf("(", lastClose);
          if (lastOpen === -1) break;

          const subExpr = expr.substring(lastOpen + 1, lastClose);
          const result = this.evaluateSimple(subExpr);
          expr = expr.substring(0, lastOpen) + result + expr.substring(lastClose + 1);
        }

        return this.evaluateSimple(expr);
      }

      evaluateSimple(expr) {
        // 先乘除
        const mulDivPattern = /(-?\d+\.?\d*)\s*([*/])\s*(-?\d+\.?\d*)/g;
        while (mulDivPattern.test(expr)) {
          expr = expr.replace(mulDivPattern, (_, a, op, b) => {
            const x = parseFloat(a);
            const y = parseFloat(b);
            return op === "*" ? x * y : x / y;
          });
        }

        // 后加减
        const addSubPattern = /(-?\d+\.?\d*)\s*([+-])\s*(-?\d+\.?\d*)/g;
        while (addSubPattern.test(expr)) {
          expr = expr.replace(addSubPattern, (_, a, op, b) => {
            const x = parseFloat(a);
            const y = parseFloat(b);
            return op === "+" ? x + y : x - y;
          });
        }

        return parseFloat(expr);
      }
    }

    const evaluator = new ExpressionEvaluator();

    expect(evaluator.evaluate("2 + 3 * 4")).toBe(14);
    expect(evaluator.evaluate("(2 + 3) * 4")).toBe(20);
    expect(evaluator.evaluate("10 / 2 - 3")).toBe(2);

    evaluator.setVariable("x", 5);
    evaluator.setVariable("y", 3);
    expect(evaluator.evaluate("x + y * 2")).toBe(11);
  });

  // ==================== 额外挑战: 生命游戏 ====================

  test("额外挑战: 康威生命游戏", () => {
    class GameOfLife {
      constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.grid = this.createGrid();
      }

      createGrid() {
        return Array(this.rows).fill(null)
          .map(() => Array(this.cols).fill(0));
      }

      // 设置细胞状态
      setCell(row, col, alive) {
        if (row >= 0 && row < this.rows && col >= 0 && col < this.cols) {
          this.grid[row][col] = alive ? 1 : 0;
        }
      }

      // 计算邻居数量
      countNeighbors(row, col) {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;

            const r = row + i;
            const c = col + j;

            if (r >= 0 && r < this.rows && c >= 0 && c < this.cols) {
              count += this.grid[r][c];
            }
          }
        }
        return count;
      }

      // 下一代
      nextGeneration() {
        const newGrid = this.createGrid();

        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.cols; j++) {
            const neighbors = this.countNeighbors(i, j);
            const alive = this.grid[i][j] === 1;

            if (alive && (neighbors === 2 || neighbors === 3)) {
              newGrid[i][j] = 1;  // 存活
            } else if (!alive && neighbors === 3) {
              newGrid[i][j] = 1;  // 繁殖
            } else {
              newGrid[i][j] = 0;  // 死亡
            }
          }
        }

        this.grid = newGrid;
        return this.grid;
      }

      // 获取活细胞数量
      getAliveCount() {
        let count = 0;
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.cols; j++) {
            count += this.grid[i][j];
          }
        }
        return count;
      }
    }

    // 闪烁器 (oscillator)
    const game = new GameOfLife(3, 3);
    game.setCell(1, 0, true);
    game.setCell(1, 1, true);
    game.setCell(1, 2, true);

    expect(game.getAliveCount()).toBe(3);

    game.nextGeneration();
    expect(game.getAliveCount()).toBe(3);

    game.nextGeneration();
    expect(game.getAliveCount()).toBe(3);  // 循环
  });

  test("额外挑战: 迷宫生成器", () => {
    class MazeGenerator {
      constructor(width, height) {
        this.width = width;
        this.height = height;
        this.maze = [];
      }

      // 使用深度优先搜索生成迷宫
      generate() {
        // 初始化全是墙
        this.maze = Array(this.height).fill(null)
          .map(() => Array(this.width).fill(1));

        // 从 (1, 1) 开始
        this.carve(1, 1);

        // 确保入口和出口
        this.maze[1][0] = 0;  // 入口
        this.maze[this.height - 2][this.width - 1] = 0;  // 出口

        return this.maze;
      }

      carve(x, y) {
        this.maze[y][x] = 0;  // 标记为路径

        // 随机方向
        const directions = [
          { dx: 0, dy: -2 },  // 上
          { dx: 2, dy: 0 },   // 右
          { dx: 0, dy: 2 },   // 下
          { dx: -2, dy: 0 }   // 左
        ];

        // Fisher-Yates 洗牌
        for (let i = directions.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [directions[i], directions[j]] = [directions[j], directions[i]];
        }

        for (const dir of directions) {
          const nx = x + dir.dx;
          const ny = y + dir.dy;

          // 检查边界
          if (nx > 0 && nx < this.width - 1 &&
              ny > 0 && ny < this.height - 1 &&
              this.maze[ny][nx] === 1) {

            // 打通中间的墙
            this.maze[y + dir.dy / 2][x + dir.dx / 2] = 0;
            this.carve(nx, ny);
          }
        }
      }

      // 打印迷宫
      print() {
        for (const row of this.maze) {
          console.log(row.map(cell => cell === 1 ? "█" : " ").join(""));
        }
      }
    }

    const generator = new MazeGenerator(21, 11);
    const maze = generator.generate();

    // 验证边界是墙
    for (let i = 0; i < generator.width; i++) {
      expect(maze[0][i]).toBe(1);
      expect(maze[generator.height - 1][i]).toBe(1);
    }

    // 验证有路径
    let pathCount = 0;
    for (const row of maze) {
      for (const cell of row) {
        if (cell === 0) pathCount++;
      }
    }

    expect(pathCount).toBeGreaterThan(10);
  });
});

console.log("🎯 模块03 - 控制流综合挑战完成！");
