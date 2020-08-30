// 214. 最短回文串
// 给定一个字符串 s，你可以通过在字符串前面添加字符将其转换为回文串。找到并返回可以用这种方式转换的最短回文串。

// 示例 1:

// 输入: "aacecaaa"
// 输出: "aaacecaaa"
// 示例 2:

// 输入: "abcd"
// 输出: "dcbabcd"

/**
 * @param {string} s
 * @return {string}
 */
const shortestPalindrome = (s) => { // s：ananab
  const len = s.length;
  const rev_s = s.split('').reverse().join(''); // rev_s：banana
  for (let i = len; i >= 0; i--) {              // ananab==banana?、anana==anana?、……
  // 相比对比是否是回文子串，字符串截取时间复杂度降低，不会超时
    if (s.substring(0, i) == rev_s.substring(len - i)) {
      return rev_s.substring(0, len - i) + s;   // 返回 b + ananab
    }
  }
}

// 解题思路：
// 寻找s内最长的回文子串，然后拼接上非回文子串部分的翻转即可
// 但是通过判断是否是回文子串时间复杂度会是O(2n^2)，字符串过长会超时
// 因此，可以通过比较翻转后的子串什么时候存在相同的子串，截取，然后拼接上非相同子串即可时间复杂度O(n)

// 另一种思路是KMP算法
// 创建出部分匹配表之后
// 通过简单地遍历，来获取其中是回文子串的部分，时间复杂度会随着子串变化而变化
// http://www.ruanyifeng.com/blog/2013/05/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm.html
