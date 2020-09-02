// 剑指 Offer 20. 表示数值的字符串
// 请实现一个函数用来判断字符串是否表示数值（包括整数和小数）。例如，字符串"+100"、"5e2"、"-123"、"3.1416"、"-1E-16"、"0123"都表示数值，但"12e"、"1a3.14"、"1.2.3"、"+-5"及"12e+5.4"都不是。

/**
 * @param {string} s
 * @return {boolean}
 */
var isNumber = function(s) {
  var states = [
      {' ': 0, 's': 1, 'd': 2, '.': 4 },
      {'d': 2, '.': 4 } ,
      {'d': 2, '.': 3, 'e': 5, ' ': 8 },
      {'d': 3, 'e': 5, ' ': 8 },
      {'d': 3 },
      {'s': 6, 'd': 7 },
      {'d': 7 },
      {'d': 7, ' ': 8 },
      {' ': 8 }
  ]
  let res = 0
  let p = 0
  for (let i in s) {
    let ele = s[i]
    if (/[0-9]/.test(s[i])) {
      ele = 'd'
    } else if ('+-'.indexOf(s[i]) > -1) {
      ele = 's'
    } else if ('eE'.indexOf(s[i]) > -1) {
      ele = 'e'
    } else if ('. '.indexOf(s[i]) > -1) {
      ele = s[i]
    } else {
      ele = '?'
    }
    if (!(ele in states[p])) return false
    p = states[p][ele]
  }
  return [2, 3, 7, 8].includes(p)
};

// 解题思路：有限状态机
// states数组是状态机的抽象表示数据结构
// 我们定义0-9的字符串标记为d，+-符号标记为s，eE标记为e，小数点或空格标记为自身，其余字符标记为?
// 然后遍历s通过状态机，每个字符都会使状态发生变更，最后只有当状态停留在2，3，7，8时，该字符串才可以表示为合法的数字
