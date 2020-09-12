// 637. 二叉树的层平均值
// 给定一个非空二叉树, 返回一个由每层节点平均值组成的数组。

// 示例 1：

// 输入：
//     3
//    / \
//   9  20
//     /  \
//    15   7
// 输出：[3, 14.5, 11]
// 解释：
// 第 0 层的平均值是 3 ,  第1层是 14.5 , 第2层是 11 。因此返回 [3, 14.5, 11] 。


// 提示：

// 节点值的范围在32位有符号整数范围内。

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var averageOfLevels = function(root) {
  if (!root) return []
  let queue = [root]
  let result = []
  while (queue.length) {
    let len = queue.length
    let total = 0
    for (let i = 0; i < len; i++) {
      let node = queue.shift()
      total += node.val
      node.left && queue.push(node.left)
      node.right && queue.push(node.right)
    }
    result.push(total / len)
  }
  return result
};

// 解题思路：
// 广度优先搜索，利用队列先进（push）先出（shift）的特性，遍历每层计算平均值
