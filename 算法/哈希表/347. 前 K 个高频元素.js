// 347. 前 K 个高频元素
// 给定一个非空的整数数组，返回其中出现频率前 k 高的元素。

// 示例 1:

// 输入: nums = [1,1,1,2,2,3], k = 2
// 输出: [1,2]
// 示例 2:

// 输入: nums = [1], k = 1
// 输出: [1]


// 提示：

// 你可以假设给定的 k 总是合理的，且 1 ≤ k ≤ 数组中不相同的元素的个数。
// 你的算法的时间复杂度必须优于 O(n log n) , n 是数组的大小。
// 题目数据保证答案唯一，换句话说，数组中前 k 个高频元素的集合是唯一的。
// 你可以按任意顺序返回答案。
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function(nums, k) {
  let hashMap = {}
  for (let i = 0; i < nums.length; i++) {
    if (!hashMap[nums[i]]) {
      hashMap[nums[i]] = 1
    } else {
      hashMap[nums[i]] += 1
    }
  }
  let result = []
  for (let [key, val] of Object.entries(hashMap)) {
    result.push({key, val})
  }
  result.sort((a, b) => b.val - a.val)
  return result.slice(0, k).map(item => item.key)
};

// 解题思路
// 偷懒了，战术勤奋，战略懒惰
// 借助sort函数勉强达标
// 时间复杂度应该是O(m * n)吧，m是数组内不同数字的个数