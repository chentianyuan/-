// 113. 路径总和 II
// 给定一个二叉树和一个目标和，找到所有从根节点到叶子节点路径总和等于给定目标和的路径。
//
// 说明: 叶子节点是指没有子节点的节点。
//
// 示例:
//   给定如下二叉树，以及目标和 sum = 22，
//
//               5
//               / \
//             4   8
//            /   / \
//           11  13  4
//          /  \    / \
//         7    2  5   1
// 返回:
//
//   [
//     [5,4,11,2],
//     [5,8,4,5]
//   ]

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {number[][]}
 */
var pathSum = function(root, sum) {
  if (!root) return []
  let result = []
  let dfs = function (node, remaind, temp) {
    remaind -= node.val
    temp.push(node.val)
    // 注意负数
    if (!node.left && !node.right && remaind === 0) {
      result.push(temp)
      return
    }
    // 防止temp重复引用
    node.left && dfs(node.left, remaind, temp.slice())
    node.right && dfs(node.right, remaind, temp.slice())
  }
  dfs(root, sum, [])
  return result
};

// 解题思路
// 由题意得，需要从根节点开始遍历，使用dfs，存储temp
// 遇到符合要求的节点返回即可
