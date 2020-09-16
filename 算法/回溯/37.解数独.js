// 37.解数独.js
// 编写一个程序，通过已填充的空格来解决数独问题。
//
// 一个数独的解法需遵循如下规则：
//
// 数字 1-9 在每一行只能出现一次。
// 数字 1-9 在每一列只能出现一次。
// 数字 1-9 在每一个以粗实线分隔的 3x3 宫内只能出现一次。
// 空白格用 '.' 表示。

/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */

function backtracking (board) {
  for (let i = 0; i < board.length; i++) { // 遍历行
    for (let j = 0; j < board[0].length; j++) { // 遍历列
      if (board[i][j] != '.') continue
      for (let k = 1; k <= 9; k++) { // (i, j) 这个位置放k是否合适
        if (isValid(i, j, k, board)) {
          board[i][j] = String(k)
          if (backtracking(board)) return true // 如果找到合适一组立刻返回
          // 如果不合适，那么需要把board[i][j]重置为.
          board[i][j] = '.'
        }
      }
      return false
    }
  }
  return true // 遍历完没有返回false，说明找到了合适棋盘位置了
}

function isValid (row, col, val, board) {
  for (let i = 0; i < 9; i++) { // 判断行里是否重复
    if (board[row][i] == val) {
      return false
    }
  }
  for (let j = 0; j < 9; j++) { // 判断列里是否重复
    if (board[j][col] == val) {
      return false
    }
    let startRow = Math.floor(row / 3) * 3;
  }
  let startCol = Math.floor(col / 3) * 3;
  for (let i = startRow; i < startRow + 3; i++) { // 判断9方格里是否重复
    for (let j = startCol; j < startCol + 3; j++) {
      if (board[i][j] == val) {
        return false;
      }
    }
  }
  return true
}

var solveSudoku = function(board) {
  return backtracking(board)
}

// 解题思路：
// 枚举回溯，遍历过程判断行列（3*3）的块是否合法，合法则修改board[i][j]的值，使用k进行填充，并进入下一次backtracking
// 如果不合法则将board[i][j]的值还原成.，使用下一个k值，进入判断
