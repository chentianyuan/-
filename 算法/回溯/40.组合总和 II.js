// 40. 组合总和 II
// 给定一个数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。

// candidates 中的每个数字在每个组合中只能使用一次。

// 说明：

// 所有数字（包括目标数）都是正整数。
// 解集不能包含重复的组合。
// 示例 1:

// 输入: candidates = [10,1,2,7,6,1,5], target = 8,
// 所求解集为:
// [
//   [1, 7],
//   [1, 2, 5],
//   [2, 6],
//   [1, 1, 6]
// ]
// 示例 2:

// 输入: candidates = [2,5,2,1,2], target = 5,
// 所求解集为:
// [
//   [1,2,2],
//   [5]
// ]
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
let dfs = function (arr, temp, n, result) {
  let total = temp.reduce((a, b) => a + b, 0)
  let last = -1
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === last) continue
    last = arr[i]
    if (total + arr[i] > n) {
      continue
    } else if (total + arr[i] === n) {
      result.push([...temp, arr[i]])
      continue
    } else {
      dfs(arr.slice(i + 1), [...temp, arr[i]], n, result)
    }
  }
}

var combinationSum2 = function(candidates, target) {
  let result = []
  candidates = candidates.sort((a, b) => a - b)
  dfs(candidates, [], target, result)
  return result
};

// 解题思路
// 回溯+剪枝
// 同39题组合总和I
// 不同点是题目要求一个数只能用一次，且不同顺序的同元素数组属于一个解
// candidates数组有序是解题的关键，我们记录上一次回溯的起始值，当下一次回溯开始时值等于上一次回溯的起始值则可以直接跳过，因为如果有解，这种情况一定会得到相同的解
