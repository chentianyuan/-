// 剑指 Offer 46. 把数字翻译成字符串
// 给定一个数字，我们按照如下规则把它翻译为字符串：0 翻译成 “a” ，1 翻译成 “b”，……，11 翻译成 “l”，……，25 翻译成 “z”。一个数字可能有多个翻译。请编程实现一个函数，用来计算一个数字有多少种不同的翻译方法。
//
// 示例 1:
//
// 输入: 12258
// 输出: 5
// 解释: 12258有5种不同的翻译，分别是"bccfi", "bwfi", "bczi", "mcfi"和"mzi"

/**
 * @param {number} num
 * @return {number}
 */
var translateNum = function(num) {
  num += ''
  let dp = []
  let n = num.length
  dp[0] = 1
  dp[1] = (num[0] + num[1]) <= 25 ? 2 : 1
  for (let i = 2; i < n; i++) {
    dp[i] = dp[i - 1]
    if (+num[i - 1] !== 0 && num[i - 1] + num[i] <= 25) {
      dp[i] += dp[i - 2]
    }
  }
  return dp[n - 1]
};

// 解题思路
// 动态规划，注意像502这样的数字，02<=25，但是不能被翻译为一个正确的字符串，所以还得判断dp[n - 1] !== 0
