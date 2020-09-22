// 56. 合并区间
// 给出一个区间的集合，请合并所有重叠的区间。
//
//
//
// 示例 1:
//
// 输入: intervals = [[1,3],[2,6],[8,10],[15,18]]
// 输出: [[1,6],[8,10],[15,18]]
// 解释: 区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
//   示例 2:
//
// 输入: intervals = [[1,4],[4,5]]
// 输出: [[1,5]]
// 解释: 区间 [1,4] 和 [4,5] 可被视为重叠区间。

/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
  intervals = intervals.sort((a, b) => a[0] - b[0])
  let len = intervals.length
  for (let i = 1; i < len; i++) {
    let prev = intervals[i - 1]
    let cur = intervals[i]
    if (prev[1] >= cur[0] && prev[1] <= cur[1]) {
      intervals[i] = [prev[0], cur[1]]
      intervals.splice(i - 1, 1)
      len--
      i--
    } else if (prev[1] >= cur[0] && prev[1] >= cur[1]) {
      intervals[i] = prev
      intervals.splice(i - 1, 1)
      len--
      i--
    }
  }
  return intervals
};

// 解题思路：
// 画图呗~
// 进行排序以后只有两种情况可以合并区间，一种是prev和cur相交，一种是cur在prev的内部，除去排序遍历一次即可
