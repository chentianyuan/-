// 111. 二叉树的最小深度
// 给定一个二叉树，找出其最小深度。

// 最小深度是从根节点到最近叶子节点的最短路径上的节点数量。

// 说明: 叶子节点是指没有子节点的节点。

// 示例:

// 给定二叉树 [3,9,20,null,null,15,7],

//     3
//    / \
//   9  20
//     /  \
//    15   7
// 返回它的最小深度  2.

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

// bfs形式
var minDepth = function(root) {
  if (!root) return 0
  let queue = [root]
  let result = 0
  while (queue.length) {
    result++
    const l = queue.length
    for (let i = 0; i < l; i++) {
      if (!queue[i].left && !queue[i].right) {
        return result
      } else {
        queue[i].left && queue.push(queue[i].left)
        queue[i].right && queue.push(queue[i].right)
      }
    }
    queue = queue.slice(l)
  }
  return result
};

// dfs形式
var minDepth = function(root) {
  if (!root) return 0
  let getMinDepth = function (node, depth) {
    if (!node) return depth
    if (!node.left && !node.right) return depth
    let arr = []
    node.left && arr.push(getMinDepth(node.left, depth + 1))
    node.right && arr.push(getMinDepth(node.right, depth + 1))
    return Math.min(...arr)
  }
  return getMinDepth(root, 1)
};

// 解题思路：
// dfs的话就对比每条路径的深度，返回最小的深度
// bfs的话每层深度加一，遇到没有子节点的叶子节点则为最小深度
