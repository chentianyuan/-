// 336. 回文对
// 给定一组 互不相同 的单词， 找出所有不同 的索引对(i, j) ，使得列表中的两个单词， words[i] + words[j]，可拼接成回文串。
// 示例 1：
// 输入：["abcd", "dcba", "lls", "s", "sssll"]
// 输出：[[0, 1], [1, 0], [3, 2], [2, 4]]
// 解释：可拼接成的回文串为["dcbaabcd", "abcddcba", "slls", "llssssll"]

// 示例 2：
// 输入：["bat", "tab", "cat"]
// 输出：[[0, 1], [1, 0]]
// 解释：可拼接成的回文串为["battab", "tabbat"]
type normalMap = {
  [key: string]: number
}
// 判断回文
function isPalindrome(str: string) {
  return str === reverse(str)
}
// 翻转函数
function reverse(str: string) {
  return str.split('').reverse().join('')
}
function palindromePairs(words: string[]): number[][] {
  let map: normalMap = {}
  let result = new Array()
  for (let i = 0; i < words.length; i++) {
    // 存储翻转的字符串，省去接下来的翻转步骤
    map[reverse(words[i])] = i
  }
  for (let i = 0; i < words.length; i++) {
    let currWord = words[i]
    if (isPalindrome(currWord) && map[''] !== void 0 && currWord !== '') {
      result.push([map[''], i]);
    }
    // 根据回文串的特点，对串进行拆分，如果左半部分是回文串，那么只要找map里是否有剩下右半部分的翻转，即可判断这两串能否拼凑成一对回文串
    for (let j = 0; j < currWord.length; j++) {
      let left = currWord.substring(0, j)
      let right = currWord.substring(j)
      if (isPalindrome(right) && map[left] !== void 0 && map[left] !== i) {
        result.push([i, map[left]])
      }
      if (isPalindrome(left) && map[right] !== void 0 && map[right] !== i) {
        result.push([map[right], i])
      }
    }
  }
  return result
};