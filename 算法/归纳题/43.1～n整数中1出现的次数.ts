// 剑指 Offer 43. 1～n整数中1出现的次数
// 输入一个整数 n ，求1～n这n个整数的十进制表示中1出现的次数。

// 例如，输入12，1～12这些整数中包含1 的数字有1、10、11和12，1一共出现了5次。

// 示例 1：

// 输入：n = 12
// 输出：5
// 示例 2：

// 输入：n = 13
// 输出：6
function countDigitOne(n: number): number {
  let str = String(n)
  let result = 0
  let l = str.length
  for (let i = l - 1, digit = 1; i >= 0; i--) {
    let now = +str[i]
    let high = +str.slice(0, i) || 0
    let low = +str.slice(i + 1) || 0
    /**
     * 计算每一位出现1的次数，并分三种情况讨论
     * 1、cur === 0，此时当前位出现1的次数即为高位乘以当前阶层次
     * 2、cur === 1，此时当前位出现1次数除了高位乘以当前阶层次，还需要考虑低位也可以进行变化，比如若低位为3则需要多加4次，即low + 1次
     * 3、cur >= 1，此时当前位出现1的次数除了高位乘以当前阶层次，还需要考虑当前位处于哪个阶层，比如当前位在10位，为9，那么当前位为1的时候，个位0-9时该位都可以正常取1，所以需要加上阶层digit次
     */
    if (now === 0) {
      result += high * digit
    } else if (now === 1) {
      result += high * digit + low + 1
    } else {
      result += high * digit + digit
    }
    digit = digit * 10
  }
  return result
};