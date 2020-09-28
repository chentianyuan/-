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

// 解题思路
// 只进行一次买卖的情况下，找出最小的点和最大的点，最小点的位置应当在最大值的序列之前
