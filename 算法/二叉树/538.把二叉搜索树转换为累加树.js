// 538. 把二叉搜索树转换为累加树
// 给定一个二叉搜索树（Binary Search Tree），把它转换成为累加树（Greater Tree)，使得每个节点的值是原来的节点值加上所有大于它的节点值之和。
//
// 例如：
//
// 输入: 原始二叉搜索树:
//    5
//   /   \
//  2     13
//
// 输出: 转换为累加树:
//    18
//   /   \
// 20     13


/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */

function getAdd (arr) {
  if (!arr.length) return 0
  return arr.reduce((a, b) => a + b)
}
var convertBST = function(root) {
  if (!root) return root
  let sortArr = []
  let dfs = function (node) {
    if (!node) return
    node.left && dfs(node.left)
    sortArr.push(node.val)
    node.right && dfs(node.right)
  }
  dfs(root)
  let dfsAdd = function (node) {
    if (!node) return
    node.left && dfsAdd(node.left)
    sortArr = sortArr.slice(1)
    node.val += getAdd(sortArr)
    node.right && dfsAdd(node.right)
  }
  dfsAdd(root)
  return root
};

// 解题思路：
// 暴力解，两次遍历
// 先中序得排序数组，再中序，累加排序数组中的值
// 返回
// 更好思路：
// 反中序遍历，记录上一个right.val，加给下个node.val，一次遍历即可
