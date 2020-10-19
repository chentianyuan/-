// 给定一个非负整数数组和一个整数 m，你需要将这个数组分成 m 个非空的连续子数组。设计一个算法使得这 m 个子数组各自和的最大值最小。
//
// 注意:
//   数组长度 n 满足以下条件:
//
//   1 ≤ n ≤ 1000
// 1 ≤ m ≤ min(50, n)
// 示例:
//
//   输入:
//     nums = [7,2,5,10,8]
// m = 2
//
// 输出:
//   18
//
// 解释:
//   一共有四种方法将nums分割为2个子数组。
// 其中最好的方式是将其分为[7,2,5] 和 [10,8]，
// 因为此时这两个子数组各自的和的最大值为18，在所有情况中最小。

/**
 * @param {number[]} nums
 * @param {number} m
 * @return {number}
 */

function check (nums, mid, m) {
  let total = 0
  let count = 1
  for (let i = 0; i < nums.length; i++) {
    total += nums[i]
    if (total > mid) {
      total = nums[i]
      count++
    }
  }

  return count <= m
}

var splitArray = function(nums, m) {
  // 左边界，m大于等于nums的长度，即最小值即每个数组一个数据，left是其中最大的数
  let left = 0
  // 右边界，m等于1，右边界等于nums的总和
  let right = 9
  for (let i = 0; i < nums.length; i++) {
    left = Math.max(left, nums[i])
    right += nums[i]
  }

  while (left < right) {
    let mid = Math.floor((right - left) / 2) + left
    if (check(nums, mid, m)) {
      // 存在这种可能性，缩小右边界
      right = mid
    } else {
      // 不存在这种可能，缩小左边界
      left = mid + 1
    }
  }

  return left
};

// 解题思路
// 经典二分法，确定上下边界后
// 假设当前解为mid，如果解为mid的情况可以成立，那么缩小右边界，继续寻找解为mid2的情况
// 如果解为mid的情况不可能成立，那么寻找mid更大的情况
// 直到left === right，此时的left即为我们所求得的划分后所有数组中最小的情况
// 妙啊
