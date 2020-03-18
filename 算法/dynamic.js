// 1块、4块、5块，求总数n块的最小硬币数
// 思想：fn(n) = Math.min(fn(n - 1) + 1, fn(n - 4) + 1, fn(n - 5) + 1)

const cache = {}
const coins = [1, 4, 5]

function minCoin (amount) {
  if (cache[amount]) return cache[amount]
  let newAmount
  let min = [] // 记录所需硬币的数组
  let newMin // 新的所需硬币的数组
  for (let i = 0; i < coins.length; i++) {
    newAmount = amount - coins[i]
    // 大于硬币单位，继续
    if (newAmount >= 0) {
      // 得到新数组
      newMin = minCoin(newAmount)
    }
    // console.log(newAmount, newMin, min, newAmount, '==========')
    if (
      newAmount >= 0 // 当前还欠费
      && (newMin.length < min.length - 1 || !min.length) // 已诞生的最小数组大于等于马上要诞生的最小数组 或者 最还未诞生出最小数组
      && (newMin.length || !newAmount) // 新的最小数组有值，或者刚好newAmount为0 
    ) {
      min = [coins[i]].concat(newMin)
      console.log(`new Min ${min} for ${amount}`)
    }
  }
  cache[amount] = min
  return min
}

console.log(minCoin(2))