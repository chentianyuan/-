// 557. 反转字符串中的单词 III
// 给定一个字符串，你需要反转字符串中每个单词的字符顺序，同时仍保留空格和单词的初始顺序。

// 示例：

// 输入："Let's take LeetCode contest"
// 输出："s'teL ekat edoCteeL tsetnoc"


// 提示：

// 在字符串中，每个单词由单个空格分隔，并且字符串中不会有任何额外的空格。

/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
  let stack = []
  let word = ''
  for (let i = 0; i < s.length; i++) {
    if (s[i] === ' ') {
      word && stack.push(word)
      s[i] && stack.push(s[i])
      word = ''
    } else {
      word = s[i] + word
    }
  }
  word && stack.push(word)
  return stack.join('')
};

// 解题思路：
// 单词由空格分隔，一次遍历，word逆序存储单词，遇到空格则将空格和逆序单词推入栈中
// 最后连接所有元素即可
// 时间复杂度O(n)
// 空间复杂度O(n)