// 剑指 Offer 38. 字符串的排列
// 输入一个字符串，打印出该字符串中字符的所有排列。
//
// 你可以以任意顺序返回这个字符串数组，但里面不能有重复元素。
//
// 示例:
//
//   输入：s = "abc"
// 输出：["abc","acb","bac","bca","cab","cba"]
/**
 * @param {string} s
 * @return {string[]}
 */
let dfs = function (str, temp, result) {
  if (!str.length) {
    result.push(temp)
    return
  }

  let record = new Set()
  for (let i = 0; i < str.length; i++) {
    if (record.has(str[i])) continue
    record.add(str[i])
    let newStr = str.slice(0, i).concat(str.slice(i + 1))
    dfs(newStr, str[i] + temp, result)
  }
}

var permutation = function(s) {
  const result = []
  dfs(s, '', result)
  return result
};

// 解题思路
// 注意使用record存储之前出现过的字符即可，避免重复寻找结果
