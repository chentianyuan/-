/**
 * @param {string} s
 * @return {character}
 */
var firstUniqChar = function(str) {
  let result = { value: ' ', index: Infinity }
  let hashMap = {}
  for (let i = 0; i < str.length; i++) {
    if (!hashMap[str[i]]) {
      hashMap[str[i]] = {
        value: str[i],
        once: true,
        index: i
      }
    } else {
      hashMap[str[i]].once = false
    }
  }
  Object.values(hashMap).forEach(item => {
    if (result.index > item.index && item.once) {
      result = item
    }
  })
  return result.value
}

// 解题思路
// hash表存储三个信息，节点出现次数，出现位置，节点的值
// 最后遍历hash表的值，得到第一个出现的字符
