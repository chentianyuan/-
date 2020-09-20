// 78. 子集
// 给定一组不含重复元素的整数数组 nums，返回该数组所有可能的子集（幂集）。
//
// 说明：解集不能包含重复的子集。
//
// 示例:
//
//   输入: nums = [1,2,3]
// 输出:
//   [
//     [3],
//     [1],
//     [2],
//     [1,2,3],
//     [1,3],
//     [2,3],
//     [1,2],
//     []
//   ]

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var dfs = function (arr, temp) {
  let result = []
  result.push(temp)
  for (let i = 0; i < arr.length; i++) {
    result.push(...dfs(arr.slice(i + 1), [...temp, arr[i]]))
  }
  return result
}
var subsets = function(nums) {
  return dfs(nums, [])
};

// 解题思路：
// 找出元素子集，并且不在意顺序，那么回溯过程就不用考虑已经进入过结果的值了，直接arr = arr.slice(i + 1)进入下一轮回溯即可
// 每一轮的回溯都将temp结果推入result中，最后返回即可，时间复杂度O(n * (n - 1) * ... * 1)
