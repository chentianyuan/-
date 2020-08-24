// 459. 重复的子字符串
// 给定一个非空的字符串，判断它是否可以由它的一个子串重复多次构成。给定的字符串只含有小写英文字母，并且长度不超过10000。

// 示例 1:

// 输入: "abab"

// 输出: True

// 解释: 可由子字符串 "ab" 重复两次构成。
// 示例 2:

// 输入: "aba"

// 输出: False
// 示例 3:

// 输入: "abcabcabcabc"

// 输出: True

// 解释: 可由子字符串 "abc" 重复四次构成。 (或者子字符串 "abcabc" 重复两次构成。)

/**
 * @param {string} s
 * @return {boolean}
 */
var repeatedSubstringPattern = function(s) {
  let length = s.length
  let l = Math.floor(length / 2)
  for (let k = 1; k <= l;) {
    let start = 0
    let mid = start + k
    let end = mid + k
    while (end <= length) {
      if (s.substring(start, mid) === s.substring(mid, end)) {
        if (end === length) {
          return true
        }
        start += k
        mid += k
        end += k
      } else {
        break
      }
    }
    k++
    while (length % k !== 0 && k < l) {
      k++
    }
  }
  return false
};

// 解题思路：
// 0、我们可以假设重复子串的长度为k
// 1、子字符串最大长度不能大于 Math.floor(length / 2)
// 2、在这个区间内我们只需要枚举所有可能的k值并截取字符串进行比较即可
// 剪枝：k一定是整体长度的公约数