// 剑指 Offer 12. 矩阵中的路径
// 请设计一个函数，用来判断在一个矩阵中是否存在一条包含某字符串所有字符的路径。路径可以从矩阵中的任意一格开始，每一步可以在矩阵中向左、右、上、下移动一格。如果一条路径经过了矩阵的某一格，那么该路径不能再次进入该格子。例如，在下面的3×4的矩阵中包含一条字符串“bfce”的路径（路径中的字母用加粗标出）。
//
// [["a","b","c","e"],
//   ["s","f","c","s"],
//   ["a","d","e","e"]]
//
// 但矩阵中不包含字符串“abfb”的路径，因为字符串的第一个字符b占据了矩阵中的第一行第二个格子之后，路径不能再次进入这个格子。
//
//
//
// 示例 1：
//
// 输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
// 输出：true
// 示例 2：
//
// 输入：board = [["a","b"],["c","d"]], word = "abcd"
// 输出：false

/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
  let recordArr = []
  for (let i = 0; i < board.length; i++) {
    recordArr[i] = []
    for (let j = 0; j < board[0].length; j++) {
      recordArr[i][j] = ''
    }
  }

  let hasRightPath = function (board, i, j, k) {
    if (i < 0 || j < 0 || i >= board.length || j >= board[0].length || recordArr[i][j] === '/') {
      return false
    }

    if (board[i][j] === word[k]) {
      let temp = board[i][j]
      recordArr[i][j] = '/'
      if (k === word.length - 1
        || hasRightPath(board, i - 1, j, k + 1)
        || hasRightPath(board, i + 1, j, k + 1)
        || hasRightPath(board, i, j - 1, k + 1)
        || hasRightPath(board, i, j + 1, k + 1)) return true
      // 恢复recordArr[i][j]位置的内容，此处的恢复也是从递归的最内层向外恢复，所以每次进入这边，只要走不下去了，都会递归地恢复
      recordArr[i][j] = temp
      return false
    }
  }

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (hasRightPath(board, i, j, 0)) {
        return true
      }
    }
  }
  return false
};

// 解题思路
// 关键点在于如何保证每个循环的recordArr不会相互影响？关键答案是储存判断结果，然后递归恢复recordArr[i][j]的内容！！！！
