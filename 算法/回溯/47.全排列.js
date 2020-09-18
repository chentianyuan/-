// 47. 全排列 II
// 给定一个可包含重复数字的序列，返回所有不重复的全排列。
//
// 示例:
//
//   输入: [1,1,2]
// 输出:
//   [
//     [1,1,2],
//     [1,2,1],
//     [2,1,1]
//   ]
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
let dfs = function (arr, temp, result) {
  if (!arr.length) {
    result.push(temp)
    return
  }
  let prev = []
  for (let i = 0; i < arr.length; i++) {
    // 起始元素重复出现过的不用再重新遍历，得到的一定是重复的排列
    if (prev.includes(arr[i])) continue
    prev.push(arr[i])
    dfs([
      ...arr.slice(0, i),
      ...arr.slice(i + 1)
    ], [...temp, arr[i]], result)
  }
}

var permuteUnique = function(nums) {
  let result = []
  dfs(nums, [], result)
  return result
};

// 解题思路：
// 回溯+剪枝
