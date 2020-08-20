/**
 * @param {character[][]} board
 * @param {number[]} click
 * @return {character[][]}
 */
var updateBoard = function(board, click) {
  let [i, j] = click
  if (board[i][j] === 'M') {
    board[i][j] = 'X'
    return board
  }
  let dfsExpose = function (i, j, board) {
    if (i >= board.length || i < 0 || j >= board[0].length || j < 0 || board[i][j] === 'M') return
    if (board[i][j] === 'E') {
      let num = getMineAround(i, j, board)
      if (num) {
        board[i][j] = num + ''
      } else {
        board[i][j] = 'B'
        dfsExpose(i - 1, j - 1, board)
        dfsExpose(i - 1, j, board)
        dfsExpose(i - 1, j + 1, board)
        dfsExpose(i + 1, j - 1, board)
        dfsExpose(i + 1, j, board)
        dfsExpose(i + 1, j + 1, board)
        dfsExpose(i, j + 1, board)
        dfsExpose(i, j - 1, board)
      }
    }
  }
  dfsExpose(i, j, board)
  return board
};

function getMineAround (i, j, board) {
  let result = 0
  for (let m = i - 1; m <= i + 1; m++) {
    for (let n = j - 1; n <= j + 1; n++) {
      if (board[m] && board[m][n] === 'M') {
        result++
      }
    }
  }
  return result
}
// 解题思路：
// 理解题意即可
// 若触发M则直接返回
// 其他情况，每个位置计算周围雷数，若雷数为0，则设为B并向8个方向递归，雷数多于0个，则置为雷数