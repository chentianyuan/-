// 题目描述
// 请实现有重复数字的有序数组的二分查找。
// 输出在数组中第一个大于等于查找值的位置，如果数组中不存在这样的数，则输出数组长度加一。
// 示例1
//   输入
//     5,4,[1,2,4,4,5]
//   输出
//     3

/**
 * 二分查找
 * @param n int整型 数组长度
 * @param v int整型 查找值
 * @param a int整型一维数组 有序数组
 * @return int整型
 */
function upper_bound_( n ,  v ,  a ) {
  let left = 0, right = n - 1
  while (left < right) {
    let mid = left + Math.floor((right - left) / 2)
    if (a[mid] >= v) {
      if (mid === 0 || a[mid - 1] < v) return mid + 1
      right = mid
    } else {
      left = mid + 1
    }
  }
  return n + 1
}
module.exports = {
  upper_bound_ : upper_bound_
};

// 解题思路：二分法
// 1、使用递归，找到值之后使用findIndex寻找其在数组中的位置
// 2、使用双指针，left和right，每次mid的值都应该为 left + Math.floor((right - left) / 2)
// 目标值大于a[mid]则将左指针右移至mid，因为此时结果一定在右边，目标值小于a[mid]那么判断上一个元素是否小于目标值，如果是，那返回mid + 1即可，如果不是，则移动right指针至mid位置，进行下一轮比较
