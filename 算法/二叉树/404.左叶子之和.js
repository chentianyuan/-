/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */

var sumOfLeftLeaves = function(root) {
  if (!root) return 0
  let result = 0
  var dfs = function (node) {
    if (node.left && !node.left.left && !node.left.right) {
      result += node.left.val
    }
    node.left && dfs(node.left)
    node.right && dfs(node.right)
  }
  dfs(root)
  return result
};

// 解题思路
// dfs
