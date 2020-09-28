// 剑指 Offer 63. 股票的最大利润
// 假设把某股票的价格按照时间先后顺序存储在数组中，请问买卖该股票一次可能获得的最大利润是多少？
//
// 示例 1:
//
// 输入: [7,1,5,3,6,4]
// 输出: 5
// 解释: 在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
//      注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格。
// 示例 2:
//
// 输入: [7,6,4,3,1]
// 输出: 0
// 解释: 在这种情况下, 没有交易完成, 所以最大利润为 0。

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  let result = 0
  let min = Infinity
  let max = 0
  for (let i = 1; i < prices.length; i++) {
    if (prices[i] - prices[i - 1] > 0) {
      // 如果是上涨趋势
      max = Math.max(max, prices[i])
      min = Math.min(min, prices[i - 1])
      result = Math.max(result, max - min)
    } else {
      // 如果是下降趋势
      max = 0
      min = Math.min(min, prices[i])
    }
  }
  return result
};

// 更简洁的写法
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  let result = 0
  let min = prices[0]
  for (let i = 1; i < prices.length; i++) {
    min = Math.min(min, prices[i])
    result = Math.max(result, prices[i] - min)
  }
  return result
};

// 解题思路
// 只进行一次买卖的情况下，找出最小的点，将每次卖出时机当成最佳时机，得到最大差值
