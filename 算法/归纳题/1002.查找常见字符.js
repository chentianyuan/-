// 1002. 查找常用字符
// 给定仅有小写字母组成的字符串数组 A，返回列表中的每个字符串中都显示的全部字符（包括重复字符）组成的列表。例如，如果一个字符在每个字符串中出现 3 次，但不是 4 次，则需要在最终答案中包含该字符 3 次。
//
// 你可以按任意顺序返回答案。
//
//
//
// 示例 1：
//
// 输入：["bella","label","roller"]
// 输出：["e","l","l"]
// 示例 2：
//
// 输入：["cool","lock","cook"]
// 输出：["c","o"]
//
//
// 提示：
//
// 1 <= A.length <= 100
// 1 <= A[i].length <= 100
// A[i][j] 是小写字母

/**
 * @param {string[]} A
 * @return {string[]}
 */
var commonChars = function(A) {
  if (!A.length) return []
  if (A.length === 1) return A[0].split('')
  // [{b: 1, e: 1, l: 2, a: 1}, {l: 2, a: 1, b: 1, e: 1}]
  const arr = []
  let result = ''
  A.forEach((word, index) => {
    arr[index] = {}
    for (let i = 0; i < word.length; i++) {
      const key = word[i]
      if (arr[index][key]) {
        arr[index][key]++
      } else {
        arr[index][key] = 1
      }
    }
  })

  arr.reduce((prev, cur, index) => {
    const newPrev = {}
    if (index === 0) {
      prev = cur
    } else {
      Object.keys(cur).forEach(key => {
        if (!prev[key]) return
        newPrev[key] = Math.min(prev[key], cur[key])
      })
    }
    if (index === arr.length - 1) {
      Object.keys(newPrev).forEach(key => {
        result += (key.repeat(newPrev[key]))
      })
    }
    return index === 0 ? prev : newPrev
  }, {})

  return result.split('')
};

// 解题思路
// 1、很傻的解法，统计出现次数，再迭代判断
// 2、好一点的解法，key存储26位字母，value存储每个单词内当前字母出现的次数，最后遍历这26个数组就好
// 注意：这里用到一个非常少用的Api，String.fromCharCode(97) => 'a'
// 静态String.fromCharCode(i)方法返回由指定的UTF-16代码单元序列创建的字符串，第97位是a字母

/**
 * @param {string[]} A
 * @return {string[]}
 */
var commonChars = function(A) {
  if (!A.length) return []
  if (A.length === 1) return A[0].split('')
  // 第一种 [{b: 1, e: 1, l: 2, a: 1}, {l: 2, a: 1, b: 1, e: 1}]
  // 第二种 {a: [1,1,0], b: [1,0,0]}
  const len = A.length
  const map = {}
  let result = ''

  for (let i = 0; i < 26; i++) {
    map[String.fromCharCode(97 + i)] = new Array(len).fill(0)
  }

  for (let i = 0; i < len; i++) {
    for (let char of A[i]) {
      map[char][i]++
    }
  }

  for (let i = 0; i < 26; i++) {
    let char = String.fromCharCode(97 + i)
    let count = Math.min(...map[char])
    count && (result += char.repeat(count))
  }

  return result.split('')
};
