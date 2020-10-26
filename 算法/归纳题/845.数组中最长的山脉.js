// 845. 数组中的最长山脉
// 我们把数组 A 中符合下列属性的任意连续子数组 B 称为 “山脉”：
//
// B.length >= 3
// 存在 0 < i < B.length - 1 使得 B[0] < B[1] < ... B[i-1] < B[i] > B[i+1] > ... > B[B.length - 1]
// （注意：B 可以是 A 的任意子数组，包括整个数组 A。）
//
// 给出一个整数数组 A，返回最长 “山脉” 的长度。
//
// 如果不含有 “山脉” 则返回 0。
//
// 示例 1：
//
// 输入：[2,1,4,7,3,2,5]
// 输出：5
// 解释：最长的 “山脉” 是 [1,4,7,3,2]，长度为 5。
// 示例 2：
//
// 输入：[2,2,2]
// 输出：0
// 解释：不含 “山脉”。

/**
 * @param {number[]} A
 * @return {number}
 */
var longestMountain = function(A) {
  if (A.length < 2) return 0
  let result = 0
  for (let i = 1; i <= A.length - 2; i++) {
    let cur = A[i]
    let len = 1
    let left = i - 1
    let right = i + 1
    while (A[left] < A[left + 1] && left >= 0) {
      len++
      left--
    }

    while (A[right - 1] > A[right] && right <= A.length - 1) {
      len++
      right++
    }

    if (left !== i - 1 && right !== i + 1) {
      result = Math.max(result, len)
    }
  }

  return result
};

// 解题思路
// 1、暴搜，但是也最好理解，遍历每一位作为山顶，向左右两边遍历，统计最长的山脉
// 2、动态规划，dpLeft[n]，dpRight[n]分别记录长度为n的数组，全部作为左|右山脉的长度，然后遍历记录总山脉长度result = Math.max(dpLeft[n] + dpRight[n] + 1, result)
