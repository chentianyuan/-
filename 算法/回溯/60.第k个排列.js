// 60. 第k个排列
// 给出集合 [1,2,3,…,n]，其所有元素共有 n! 种排列。

// 按大小顺序列出所有排列情况，并一一标记，当 n = 3 时, 所有排列如下：

// "123"
// "132"
// "213"
// "231"
// "312"
// "321"
// 给定 n 和 k，返回第 k 个排列。

// 说明：

// 给定 n 的范围是 [1, 9]。
// 给定 k 的范围是[1,  n!]。
// 示例 1:

// 输入: n = 3, k = 3
// 输出: "213"
// 示例 2:

// 输入: n = 4, k = 9
// 输出: "2314"

/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */
var getPermutation = function(n, k) {
  let arr = Array.from(new Array(n), (k, i) => i + 1)
  let result = []
  return handler(arr, [], k).join('')
};

function getPermutationNum (n) {
  let nums = 1
  while (n > 0) {
    nums *= n
    n--
  }
  return nums
}

function handler (arr, temp, k) {
  if (!arr.length) return temp
  for (let i = 0; i < arr.length; i++) {
    let permutationNums = getPermutationNum(arr.length - 1)
    if (k > permutationNums) {
      k = k - permutationNums
      continue
    }
    let newArr = arr.slice(0, i).concat(arr.slice(i + 1))
    return handler(newArr, [...temp, arr[i]], k)
  }
}

// 解题思路：回溯
// 肯定是回溯，但是剪枝不到位某些用例会超时
// 一种比较高效的剪枝方法是，对比k和当前剩余数字的全排列个数，如果k大于剩余全排列个数，则直接进入下一个数字开头的全排列，并缩小k的范围
// 遇到剩余数字全排列数量大于k时，则返回并将当前位置的数推入temp，进行回溯，直到arr中的数字第一次被清空，返回temp（注意这里不能直接判断k等于0，因为有可能k的值等于上一次全排列的值，k没有做减法跳过，因此最后返回时k是可能有值的）
