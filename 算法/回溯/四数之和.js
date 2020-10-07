// 18. 四数之和
// 给定一个包含 n 个整数的数组 nums 和一个目标值 target，判断 nums 中是否存在四个元素 a，b，c 和 d ，使得 a + b + c + d 的值与 target 相等？找出所有满足条件且不重复的四元组。
//
// 注意：
//
// 答案中不可以包含重复的四元组。
//
// 示例：
//
// 给定数组 nums = [1, 0, -1, 0, -2, 2]，和 target = 0。
//
// 满足要求的四元组集合为：
// [
//   [-1,  0, 0, 1],
//   [-2, -1, 1, 2],
//   [-2,  0, 0, 2]
// ]

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
// 回溯
let dfs = function (arr, temp, result, target) {
  if (temp.length === 4) {
    if (target === 0) {
      result.push(temp)
    }
    return
  }
  if (arr.length + temp.length < 4) return
  let last = Infinity
  for (let i = 0; i < arr.length; i++) {
    if (last === arr[i]) continue
    last = arr[i]
    if (target >= 0 && target - arr[i] < 0) break
    if (target < 0 && target - arr[i] > 0) break
    dfs(arr.slice(i + 1), [...temp, arr[i]], result, target - arr[i])
  }
}

// var fourSum = function(nums, target) {
//   let result = []
//   nums = nums.sort((a, b) => {
//     return target >= 0 ? a - b : b - a
//   })
//   dfs(nums, [], result, target)
//   return result
// };

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function(nums, target) {
  const len = nums.length
  let res = [{}, []]
  nums = nums.sort((a, b) => a - b)
  for (let i = 0; i < len - 1; i++) {
    for (let j = i + 1; j < len - 2; j++) {
      // 确定ij后，将l后移，r前移
      let l = j + 1
      let r = len - 1
      while (l < r) {
        const total = nums[i] + nums[j] + nums[l] + nums[r]
        if (total === target) {
          const key = '' + nums[i] + nums[j] + nums[l] + nums[r]
          !res[0][key] && res[1].push([nums[i], nums[j], nums[l], nums[r]]) && (res[0][key] = 1)
          // 注意此处不能break，l和r中间可能有其他解
          l++
        } else {
          total > target ? r-- : l++
        }
      }
    }
  }
  return res[1]
};

// 解题思路
// 回溯+剪枝 或者 双指针的形式（其实用到了四个指针，但是时间复杂度只有O(n^3)并且规避了很多不合理的场景）
