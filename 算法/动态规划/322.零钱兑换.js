322. 零钱兑换
// 给定不同面额的硬币 coins 和一个总金额 amount。编写一个函数来计算可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回 -1。
// 你可以认为每种硬币的数量是无限的。
// 示例 1：
// 输入：coins = [1, 2, 5], amount = 11
// 输出：3
// 解释：11 = 5 + 5 + 1
// 示例 2：
// 输入：coins = [2], amount = 3
// 输出：-1
// 示例 3：
// 输入：coins = [1], amount = 0
// 输出：0
// 示例 4：
// 输入：coins = [1], amount = 1
// 输出：1
// 示例 5：
// 输入：coins = [1], amount = 2
// 输出：2

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
  coins = coins.sort((a, b) => a - b)
  // i表示在只有0-i种硬币的情况下
  // j表示总金额为j
  // dp[i][j]表示所需的总硬币数量
  const dp = []
  for (let i = 0; i < coins.length; i++) {
    dp[i] = []
    for (let j = 0; j <= amount; j++) {
      dp[i][j] = -1

      if (j === 0) {
        dp[i][j] = 0
      }

      if (i === 0) {
        if (j % coins[i] !== 0) continue
        dp[i][j] = Math.floor(j / coins[i])
      }
    }
  }

  for (let i = 1; i < coins.length; i++) {
    for (let j = 0; j <= amount; j++) {
      let count = Math.floor(j / coins[i])
      dp[i][j] = Infinity
      // 存在dp[i][j]大于dp[i-1][j]的情况，就是说，选了当前这个硬币，反而需要更多的硬币，所以这里必须要有等于号
      while (count >= 0) {
        if (dp[i - 1][j - count * coins[i]] !== -1) {
          dp[i][j] = Math.min(dp[i - 1][j - count * coins[i]] + count, dp[i][j])
        }
        count--
      }
      dp[i][j] === Infinity && (dp[i][j] = dp[i - 1][j])
    }
  }

  return dp[coins.length - 1][amount]
};

// 解题思路
// i表示当前只提供了0-i这么几种硬币
// j表示可以凑齐的总数
// dp[i][j]表示需要的最小硬币数
// 类似于分隔等和子集的问题，类似背包问题
// 需要注意，当新增一种大的硬币，最优情况大的硬币可能放0-count枚，需要一一比较

var coinChange = function(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity)
  dp[0] = 0
  for (let i = 1; i <= amount; i++) {
    for (let j = 0; j < coins.length; j++) {
      if (coins[j] <= i) {
        dp[i] = Math.min(dp[i - coins[j]] + 1, dp[i])
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount]
}
// 解题思路2
// 自底向上，从总和出发，每次判断是否需要使用新的硬币，dp[amount]不会大于amount自身，硬币最小也是1元了（妙妙妙啊）
// 从打败了5%提升到75%...
