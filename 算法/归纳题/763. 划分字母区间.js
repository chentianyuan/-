// 763. 划分字母区间
// 字符串 S 由小写字母组成。我们要把这个字符串划分为尽可能多的片段，同一个字母只会出现在其中的一个片段。返回一个表示每个字符串片段的长度的列表。
//
//
//
// 示例 1：
//
// 输入：S = "ababcbacadefegdehijhklij"
// 输出：[9,7,8]
// 解释：
// 划分结果为 "ababcbaca", "defegde", "hijhklij"。
// 每个字母最多出现在一个片段中。
// 像 "ababcbacadefegde", "hijhklij" 的划分是错误的，因为划分的片段数较少。
//
//
// 提示：
//
// S的长度在[1, 500]之间。
// S只包含小写字母 'a' 到 'z' 。

/**
 * @param {string} S
 * @return {number[]}
 */
var partitionLabels = function(S) {
  const result = []
  let charMap = {}
  for (let i = 0; i < 26; i++) {
    charMap[String.fromCharCode(97 + i)] = []
  }
  for (let i = 0; i < S.length; i++) {
    if (!charMap[S[i]].length) {
      charMap[S[i]] = [i]
    } else {
      if (charMap[S[i]][1]) {
        charMap[S[i]][1] = Math.max(charMap[S[i]][1], i)
      } else {
        charMap[S[i]].push(i)
      }
    }
  }

  let arr = Object.values(charMap).sort((a, b) => a[0] - b[0])
  let map = {}
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][0] === void 0) continue
    if (arr[i][1] === void 0) {
      map[arr[i][0]] = arr[i][0]
    } else {
      map[arr[i][0]] = arr[i][1]
    }
  }

  let start = 0
  let left = 0
  let distant = 0
  while (start < S.length) {
    if (start > distant) {
      result.push(distant - left + 1)
      while (map[start] === start && start < S.length) {
        result.push(1)
        start++
        left++
        distant++
      }
      distant = map[start]
      left = start
    } else if (map[start] > distant) {
      // 更新区间
      distant = map[start]
    }
    start++
  }

  return distant ? result.concat(distant - left + 1) :result
};

// 解题思路
// 涉及字母的题，很有可能是通过hash表记录字母位置的
// 我的思路是记录每个字母的区间，然后通过指针走过每个区间，遇到指针大于end的时候就推入result，更新当前区间
// 更好的做法是，只需要保存每个字母最后出现的位置，然后遍历原字符串，当i小于end时一直i++，遇到i大于end的时候，就是得到一个目标区间的时候，此时start记录下位置，i++，继续寻找下一个end
