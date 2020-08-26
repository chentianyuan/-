// 17. 电话号码的字母组合
// 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。

// 给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。

// 示例:

// 输入："23"
// 输出：["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].

/**
 * @param {string} digits
 * @return {string[]}
 */
let map = new Map()
map.set('2', 'abc')
map.set('3', 'def')
map.set('4', 'ghi')
map.set('5', 'jkl')
map.set('6', 'mno')
map.set('7', 'pqrs')
map.set('8', 'tuv')
map.set('9', 'wxyz')
var letterCombinations = function(digits) {
  if (!digits.length) return []
  let result = []
  let len = digits.length
  let dfs = function (z, str) {
    if (str.length === len) {
      result.push(str)
      return
    }
    let chars = map.get(digits[z])
    for (let i = 0; i < chars.length; i++) {
      dfs(z + 1, str + chars[i])
    }
  }
  dfs(0, '')
  return result
};

// 解题思路：
// 老回溯了，关键点在于，找到得到最终解的条件
// 由于用户的每一个数字映射到最后的字母其实是一一对应的，因此，当前str的长度等于用户输入数字的长度即得到一个最终解
// 通过z的长度递增，str随之递增，即可枚举出所有可能出现的结果
