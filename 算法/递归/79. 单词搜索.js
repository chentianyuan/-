// 79. 单词搜索
// 给定一个二维网格和一个单词，找出该单词是否存在于网格中。

// 单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母不允许被重复使用。

// 示例:

// board =
// [
//   ['A','B','C','E'],
//   ['S','F','C','S'],
//   ['A','D','E','E']
// ]

// 给定 word = "ABCCED", 返回 true
// 给定 word = "SEE", 返回 true
// 给定 word = "ABCB", 返回 false


// 提示：

// board 和 word 中只包含大写和小写英文字母。
// 1 <= board.length <= 200
// 1 <= board[i].length <= 200
// 1 <= word.length <= 10^3
/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */

function initMarked (board, marked) {
  for (let i = 0; i < board.length; i++) {
    marked[i] = []
    for (let j = 0; j < board[i].length; j++) {
      marked[i][j] = false
    }
  }
  return marked
}

var exist = function(board, word) {
  let marked = new Array(board.length)
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      initMarked(board, marked)
      if (boardHasWord(board, word, i, j, marked)) return true
    }
  }
  return false
};

let boardHasWord = function (board, word, i, j, marked) {
  let curWord = word[0]
  if (i < 0 || j < 0 || i >= board.length || j >= board[i].length || board[i][j] !== curWord || marked[i][j]) {
    return false
  }
  if (word.length === 1 && board[i][j] === curWord) return true
  marked[i][j] = true
  return (
    boardHasWord(board, word.slice(1), i + 1, j, JSON.parse(JSON.stringify(marked))) ||
    boardHasWord(board, word.slice(1), i - 1, j, JSON.parse(JSON.stringify(marked))) ||
    boardHasWord(board, word.slice(1), i, j + 1, JSON.parse(JSON.stringify(marked))) ||
    boardHasWord(board, word.slice(1), i, j - 1, JSON.parse(JSON.stringify(marked)))
  )
}

// 解题思路：
// dfs
// 难点在于每个分支如何使用自己独立的状态，避免相互干扰
// 这里我们在每个位置开始执行initMarked(board, marked)，更新marked，并且对每个位置的每个分支都拷贝了一份marked数组（需要优化，但是我太困了。。）