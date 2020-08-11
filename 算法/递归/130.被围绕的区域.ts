// 130. 被围绕的区域
// 给定一个二维的矩阵，包含 'X' 和 'O'（字母 O）。

// 找到所有被 'X' 围绕的区域，并将这些区域里所有的 'O' 用 'X' 填充。

// 示例:

// X X X X
// X O O X
// X X O X
// X O X X
// 运行你的函数后，矩阵变为：

// X X X X
// X X X X
// X X X X
// X O X X
// 解释:

// 被围绕的区间不会存在于边界上，换句话说，任何边界上的 'O' 都不会被填充为 'X'。 任何不在边界上，或不与边界上的 'O' 相连的 'O' 最终都会被填充为 'X'。如果两个元素在水平或垂直方向相邻，则称它们是“相连”的。

/**
 Do not return anything, modify board in-place instead.
 */
function solve(board: string[][]): string[][] {
  if (!board.length) return board
  let n = board.length
  let m = board[0].length
  // 深度优先，遍历外框，然后逐渐向内遍历，将遍历到的'O'置为'A'，如果不做处理会导致死循环
  const dfs = function (board: string[][], x: number, y: number): void {
    if (y >= m || x >= n || x < 0 || y < 0 || board[x][y] !== 'O') return
    board[x][y] = 'A'
    dfs(board, x + 1, y)
    dfs(board, x - 1, y)
    dfs(board, x, y - 1)
    dfs(board, x, y + 1)
  }
  for (let i = 0; i < m; i++) {
    dfs(board, 0, i)
    dfs(board, n - 1, i)
  }
  for (let i = 0; i < n; i++) {
    dfs(board, i, 0)
    dfs(board, i, m - 1)
  }
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      board[i][j] = board[i][j] === 'A' ? 'O' : 'X'
    }
  }
  return board
};

// 解题思路：
// 从题意可知，要找到完全被包围的O其实可以从周边开始向内查找，如果遇到相连的O，则先置为A，最后遍历所有元素，将A还原为O，剩下的O转置为X即可
// 注意点：矩阵遍历是先行后列，注意x，y的取值