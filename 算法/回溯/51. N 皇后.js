// 51. N 皇后
// n 皇后问题研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。

// 上图为 8 皇后问题的一种解法。

// 给定一个整数 n，返回所有不同的 n 皇后问题的解决方案。

// 每一种解法包含一个明确的 n 皇后问题的棋子放置方案，该方案中 'Q' 和 '.' 分别代表了皇后和空位。

// 示例：

// 输入：4
// 输出：[
//  [".Q..",  // 解法 1
//   "...Q",
//   "Q...",
//   "..Q."],

//  ["..Q.",  // 解法 2
//   "Q...",
//   "...Q",
//   ".Q.."]
// ]
// 解释: 4 皇后问题存在两个不同的解法。

// 提示：

// 皇后彼此不能相互攻击，也就是说：任何两个皇后都不能处于同一条横行、纵行或斜线上。

/**
 * @param {number} n
 * @return {string[][]}
 */
function getfullSort (arr, midArr, target) {
  if (!arr.length) {
    target.push(midArr)
    return
  }
  for (let i = 0; i < arr.length; i++) {
    getfullSort([...arr.slice(0, i), ...arr.slice(i + 1)], [...midArr, arr[i]], target)
  }
}

function isRightSolve (fullSortArr, n) {
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      // 如果全排列数组中的arr的位置差绝对值，等于两个皇后上下绝对值差值，则在同一条斜线上
      if (Math.abs(j - i) === Math.abs(fullSortArr[j] - fullSortArr[i])) {
        return false
      }
    }
  }
  return true
}

var solveNQueens = function(n) {
  let defaultArr = new Array(n).fill('').map((v, i) => i)
  let fullSort = []
  let sortResult = []
  let result = []
  getfullSort(defaultArr, [], fullSort)
  for (let i = 0; i < fullSort.length; i++) {
    if (isRightSolve(fullSort[i], n)) {
      sortResult.push(fullSort[i])
    }
  }
  sortResult.forEach(item => {
    let arr = []
    let target = ''
    for (let i = 0; i < n; i++) {
      target = ''
      for (let j = 0; j < n; j++) {
        target += (item[i] === j ? 'Q' : '.')
      }
      arr.push(target)
    }
    result.push(arr)
  })
  return result
};

// 解题思路：
// 回溯+剪枝
// 每行每列都有且仅有一个皇后，我们用数组存储每一列皇后的位置，得到一个n的全排列数组，然后只需要从中挑选出满足斜对角线上没有共存的皇后的数据即可
// 最后遍历符合条件的数组，将皇后Q和.安排上即可
// tips: 对比是否在对角线上只需要判断 Math.abs(j - i) === Math.abs(fullSortArr[j] - fullSortArr[i]) 横纵距离是否一样即可
