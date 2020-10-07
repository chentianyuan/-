// 75. 颜色分类
// 给定一个包含红色、白色和蓝色，一共 n 个元素的数组，原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。
//
// 此题中，我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。
//
// 注意:
//   不能使用代码库中的排序函数来解决这道题。
//
// 示例:
//
//   输入: [2,0,2,1,1,0]
// 输出: [0,0,1,1,2,2]
// 进阶：
//
// 一个直观的解决方案是使用计数排序的两趟扫描算法。
// 首先，迭代计算出0、1 和 2 元素的个数，然后按照0、1、2的排序，重写当前数组。
// 你能想出一个仅使用常数空间的一趟扫描算法吗？

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
function swap (nums, i, j) {
  let temp = nums[j]
  nums[j] = nums[i]
  nums[i] = temp
}

var sortColors = function(nums) {
  const len = nums.length
  let p0Location = 0; p2Location = len - 1
  let count = 0
  // count一直向前
  // p0Location标识现在存储0已经到达的位置
  // p2Location标识现在最后一位能存储2的位置
  while (count <= p2Location) {
    if (nums[count] === 0) {
      swap(nums, count, p0Location)
      p0Location++
      count++
    } else if (nums[count] === 2) {
      swap(nums, count, p2Location)
      p2Location--
      // 此处不能count++直接进入下一个位置，因为次数交换来的nums[p2Location]不一定是一个正确的数
    } else {
      // 遇到1直接前进即可，如果后续有0会通过count和i进行置换
      count++
    }
  }
  return nums
};

// 解题思路
// 1，两次遍历，第一次遍历将所有0交换到头部，第二次遍历将所有的1交换到头部的0之后，此时排序完成
// 2，双指针，p0Location存储已交换好的0的位置，p2Location存储已交换好的2的位置，count不断前进
// 遇到0则与i交换位置，遇到2则与j交换位置，遇到1则继续前进

