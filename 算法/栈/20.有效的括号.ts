// 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。

// 有效字符串需满足：

// 左括号必须用相同类型的右括号闭合。
// 左括号必须以正确的顺序闭合。
// 注意空字符串可被认为是有效字符串。

// 示例 1:

// 输入: "()"
// 输出: true
// 示例 2:

// 输入: "()[]{}"
// 输出: true
// 示例 3:

// 输入: "(]"
// 输出: false
// 示例 4:

// 输入: "([)]"
// 输出: false
// 示例 5:

// 输入: "{[]}"
// 输出: true

function isValid(s: string): boolean {
  if (!s.length) return true

  let braceArr = [s[0]]
  let braceMap = new Map()
  braceMap.set(')', '(')
  braceMap.set('}', '{')
  braceMap.set(']', '[')
  let i = 1

  while (i < s.length) {
    // 注意判空，否则数组为空时也会走进pop

    if (braceMap.get(s[i]) && braceArr.slice(-1)[0] === braceMap.get(s[i])) {
      braceArr.pop()
    } else {
      braceArr.push(s[i])
    }
    i++
  }
  return !Boolean(braceArr.length)
};
