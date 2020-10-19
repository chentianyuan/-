// 416. 分割等和子集
// 给定一个只包含正整数的非空数组。是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。
// 注意:
// 每个数组中的元素不会超过 100
// 数组的大小不会超过 200
// 示例 1:
// 输入: [1, 5, 11, 5]
// 输出: true
// 解释: 数组可以分割成 [1, 5, 5] 和 [11].
// 示例 2:
// 输入: [1, 2, 3, 5]
// 输出: false
// 解释: 数组不能分割成两个元素和相等的子集.

/**
 * @param {number[]} nums
 * @return {boolean}
 */
let getSum = arr => arr.reduce((a, b) => a + b)
let dfs = function (arr, target, index) {
  if (target === arr[index]) return true
  if (index > arr.length - 1 || target < 0) return false
  return dfs(arr, target - arr[index], index + 1) || dfs(arr, target, index + 1)
}
var canPartition = function(nums) {
  if (!nums.length) return true
  const total = getSum(nums)
  if (total % 2 !== 0) return false
  nums = nums.sort((a, b) => b - a)
  return dfs(nums, total / 2, 0)
};

// 解题思路1：
// 通用的回溯解题思路，java过了，js超时，(╬◣д◢)！！！

/**
 * @param {number[]} nums
 * @return {boolean}
 */
let getSum = arr => arr.reduce((a, b) => a + b)
var canPartition = function(nums) {
  if (!nums.length) return true
  let total = getSum(nums)
  if (total % 2 !== 0) return false
  total = total / 2
  nums = nums.sort((a, b) => b - a)
  const dp = []
  for (let i = 0; i < nums.length; i++) {
    dp[i] = []
    for (let j = 0; j <= total; j++) {
      dp[i][j] = false

      if (i === 0) {
        dp[i][j] = nums[i] === j
      }

      if (j === 0) {
        dp[i][j] = true
      }
    }
  }

  // i表示可以从0-i的位置，选取若干个元素
  // j表示前面选择的数总和等于j
  // dp[i][j]表示前面的条件是否成立
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j <= total; j++) {
      dp[i][j] = dp[i - 1][j]

      if (nums[i] <= j) {
        // 如果nums[i]大于j那么直接用上面的dp[i - 1][j]的结果即可
        // 否则的话，可能是刚好选择这个元素，那么需要判断dp[i-1][j-nums[i]]是否成立
        dp[i][j] = dp[i - 1][j] || dp[i - 1][j - nums[i]]
      }

      if (dp[i][total]) {
        return true
      }
    }
  }
  return false
};

// 解题思路2
// 0-1背包问题的变种
// 此时背包容量为total，可选的物品大小从nums[0]-nums[i]不等，是否有使得刚好装满背包的情况？
// dp[i][j] = dp[i-1][j] || dp[i-1][j-nums[i]]
