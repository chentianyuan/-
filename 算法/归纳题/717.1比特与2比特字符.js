// 717. 1比特与2比特字符
// 有两种特殊字符。第一种字符可以用一比特0来表示。第二种字符可以用两比特(10 或 11)来表示。
//
// 现给一个由若干比特组成的字符串。问最后一个字符是否必定为一个一比特字符。给定的字符串总是由0结束。
//
// 示例 1:
//
// 输入:
//   bits = [1, 0, 0]
// 输出: True
// 解释:
//   唯一的编码方式是一个两比特字符和一个一比特字符。所以最后一个字符是一比特字符。
// 示例 2:
//
// 输入:
//   bits = [1, 1, 1, 0]
// 输出: False
// 解释:
// 唯一的编码方式是两比特字符和两比特字符。所以最后一个字符不是一比特字符。
/**
 * @param {number[]} bits
 * @return {boolean}
 */
var isOneBitCharacter = function(bits) {
  if (bits.length === 1) return true
  if (bits.slice(-2)[0] === 0) return true
  for (let i = 0; i < bits.length - 1;) {
    if (bits[i] === 1) {
      if (i + 2 >= bits.length) return false
      i += 2
      continue
    } else {
      i++
    }
  }
  return true
};

// 解题思路：
// 归纳题，一次遍历，若遇1，则进两位，遇0进一位，判断倒数第二位是否是1即可
