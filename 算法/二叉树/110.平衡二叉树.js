// 110.平衡二叉树
// 给定一个二叉树，判断它是否是高度平衡的二叉树。

// 本题中，一棵高度平衡二叉树定义为：

// 一个二叉树每个节点的左右两个子树的高度差的绝对值不超过1。

// 示例 1:

// 给定二叉树 [3,9,20,null,null,15,7]

//     3
//    / \
//   9  20
//     /  \
//    15   7
// 返回 true 。

// 示例 2:

// 给定二叉树 [1,2,2,3,3,null,null,4,4]

//        1
//       / \
//      2   2
//     / \
//    3   3
//   / \
//  4   4
// 返回 false 。

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function (root) {
  if (!root) return true
  let left = getTreeDeep(root.left, 1)
  let right = getTreeDeep(root.right, 1)
  if (Math.abs(left - right) > 1) {
    return false
  }
  return isBalanced(root.left) && isBalanced(root.right)
};

function getTreeDeep(node, height) {
  if (!node) {
    return height
  }
  return Math.max(getTreeDeep(node.left, height + 1), getTreeDeep(node.right, height + 1))
}

// 解题思路：
// 一个二叉树每个节点的左右两个子树的高度差的绝对值不超过1。
// 通过计算每个节点左右子树的深度，取大值，即为当前节点左右子树高度，对比差值绝对值是否大于1即可