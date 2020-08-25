// 1143. 最长公共子序列
// 给定两个字符串 text1 和 text2，返回这两个字符串的最长公共子序列的长度。

// 一个字符串的 子序列 是指这样一个新的字符串：它是由原字符串在不改变字符的相对顺序的情况下删除某些字符（也可以不删除任何字符）后组成的新字符串。
// 例如，"ace" 是 "abcde" 的子序列，但 "aec" 不是 "abcde" 的子序列。两个字符串的「公共子序列」是这两个字符串所共同拥有的子序列。

// 若这两个字符串没有公共子序列，则返回 0。

// 示例 1:

// 输入：text1 = "abcde", text2 = "ace"
// 输出：3
// 解释：最长公共子序列是 "ace"，它的长度为 3。
// 示例 2:

// 输入：text1 = "abc", text2 = "abc"
// 输出：3
// 解释：最长公共子序列是 "abc"，它的长度为 3。
// 示例 3:

// 输入：text1 = "abc", text2 = "def"
// 输出：0
// 解释：两个字符串没有公共子序列，返回 0。


// 提示:

// 1 <= text1.length <= 1000
// 1 <= text2.length <= 1000
// 输入的字符串只含有小写英文字符。

/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function(text1, text2) {
  // 最后的数组将会比字符串本身长度大1，因为扩充了字符串为''的情况
  let m = text1.length + 1
  let n = text2.length + 1
  let dp = new Array(n)
  // 初始化二维数组
  for (let i = 0; i < n; i++) {
    dp[i] = []
    for (let j = 0; j < m; j++) {
      dp[i][j] = 0
    }
  }
  for (let i = 1; i < n; i++) {
    for (let j = 1; j < m; j++) {
      // 状态转移方程
      if (text2[i - 1] === text1[j - 1]) {
        // 两个字符串皆退一位得到的最长公共子序列长度 + 1
        dp[i][j] = dp[i - 1][j - 1] + 1
      } else {
        // 否则的话当前最长公共子序列取两者退一位中结果更长的数
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
      }
    }
  }
  return dp[n - 1][m - 1]
};

// 解题思路：动态规划
// 1、想象两个字符串从0位开始，慢慢增大
// 2、dp二维数组存储两个字符串不同长度时得到的最长公共子序列
// 3、将dp[j][0]和d[0][j]可以皆用0填充，因为当一个子串长度为0时，最长公共子序列长度也为0
// 易得状态转移方程为：dp[i][j] = text1[i - 1] === text2[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1])
// 最后取右下角的dp值返回即可
