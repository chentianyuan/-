// 给定范围 [m, n]，其中 0 <= m <= n <= 2147483647，返回此范围内所有数字的按位与（包含 m, n 两端点）。
// ​
// 示例 1:
// ​
// 输入: [5,7]
// 输出: 4
// 示例 2:
// ​
// 输入: [0,1]
// 输出: 0​

/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */

// 这种方法容易想到，但是在m，n的范围过大时会造成执行超时
// var rangeBitwiseAnd = function(m, n) {
//   let result
//   while(m !== n) {
//     result = result === void 0 ? m : (result & m)
//     m++
//   }
//   return result
// };

var rangeBitwiseAnd = function(m, n) {
  let mstr = parseInt(m).toString(2)
  let nstr = parseInt(n).toString(2)
  let [longStr, shortStr] = mstr.length > nstr.length ? [mstr, nstr] : [nstr, mstr]
  shortStr = '0'.repeat(longStr.length - shortStr.length) + shortStr
  let result = ''
  for (let i = 0; i < longStr.length; i++) {
    if (longStr[i] === shortStr[i]) {
      result += longStr[i]
    } else {
      result += '0'.repeat(longStr.length - i)
      break
    }
  }
  return parseInt(result || '0', 2)
};

// 解题思路：
// 观察m和n的二进制串，m不足的位用0补齐，发现从头部开始，如果出现了不等的位，后面的位数必然会出现00000 -> 11111这样类似的值，因此，他们最后与计算的结果一定是0
// 因此，我们只需要计算m和n的公共自前缀即可，他们按位与之后一定依然是本身