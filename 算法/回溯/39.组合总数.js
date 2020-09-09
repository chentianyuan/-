// 39. 组合总和
// 给定一个无重复元素的数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。

// candidates 中的数字可以无限制重复被选取。

// 说明：

// 所有数字（包括 target）都是正整数。
// 解集不能包含重复的组合。
// 示例 1：

// 输入：candidates = [2,3,6,7], target = 7,
// 所求解集为：
// [
//   [7],
//   [2,2,3]
// ]
// 示例 2：

// 输入：candidates = [2,3,5], target = 8,
// 所求解集为：
// [
//   [2,2,2,2],
//   [2,3,3],
//   [3,5]
// ]


// 提示：

// 1 <= candidates.length <= 30
// 1 <= candidates[i] <= 200
// candidate 中的每个元素都是独一无二的。
// 1 <= target <= 500

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
function getResult (arr, temp, n, result)  {
  let total = temp.length ? temp.reduce((a, b) => a + b) : 0
  for (let i = 0; i < arr.length; i++) {
    if (total + arr[i] < n) {
      getResult(arr.slice(i), [...temp, arr[i]], n, result)
    } else if (total + arr[i] === n) {
      result.push([...temp, arr[i]])
      continue
    } else {
      continue
    }
  }
}

var combinationSum = function(candidates, target) {
  let result = []
  getResult(candidates, [], target, result)
  return result
};

// 解题思路
// 回溯+剪枝
// 和普通回溯有些许不同，此处要求[2,2,3]和[2,3,2]是相同的结果，不能重复出现，因此回溯时需要按照一定的顺序处理
// 即如若第一轮选取了3，那么以后都不能选取3之前已经选过的数字（但是可以选取自己），避免重复