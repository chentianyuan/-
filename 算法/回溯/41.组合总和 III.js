// 216. 组合总和 III
// 找出所有相加之和为 n 的 k 个数的组合。组合中只允许含有 1 - 9 的正整数，并且每种组合中不存在重复的数字。

// 说明：

// 所有数字都是正整数。
// 解集不能包含重复的组合。
// 示例 1:

// 输入: k = 3, n = 7
// 输出: [[1,2,4]]
// 示例 2:

// 输入: k = 3, n = 9
// 输出: [[1,2,6], [1,3,5], [2,3,4]]

/**
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
var dfs = function (arr, temp, n, result, k) {
  let total = temp.reduce((a, b) => a + b, 0)
  for (let i = 0; i < arr.length; i++) {
    if (temp.length === k - 1 && total + arr[i] === n) {
      result.push([...temp, arr[i]])
      return
    } else if (total + arr[i] > n || total.length > k) {
      return
    } else {
      dfs(arr.slice(i + 1), [...temp, arr[i]], n, result, k)
    }
  }
}

var combinationSum3 = function(k, n) {
  let result = []
  let arr = Array.from(new Array(9), (_, k) => k + 1)
  dfs(arr, [], n, result, k)
  return result
};

// 解题思路
// 回溯+剪枝
// 大剪枝 => 总和大于n或者长度超限
// 小剪枝 => 去除小于当前回溯元素的元素
