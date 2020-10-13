// 530. 二叉搜索树的最小绝对差
// 给你一棵所有节点为非负值的二叉搜索树，请你计算树中任意两节点的差的绝对值的最小值。
//
// 示例：
//
// 输入：
//
//    1
//     \
//      3
//      /
//      2
//
// 输出：
// 1
//
// 解释：
// 最小绝对差为 1，其中 2 和 1 的差的绝对值为 1（或者 2 和 3）。

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
// 递归
var getMinimumDifference = function(root) {
  let res = Infinity
  let prev
  let cur
  let dfs = function (node) {
    node.left && dfs(node.left, res)
    cur = node.val
    if (prev === void 0) {
      prev = node.val
    } else {
      res = Math.min(cur - prev, res)
      prev = node.val
    }
    node.right && dfs(node.right, res)
  }
  dfs(root, res)
  return res
};

// 迭代
var getMinimumDifference = function(root) {
  let res = Infinity
  let prev
  let queue = []
  while (root || queue.length) {
    while(root) {
      queue.push(root)
      root = root.left
    }
    const node = queue.pop()
    let cur = node.val
    if (prev === void 0) {
      prev = cur
    } else {
      res = Math.min(cur - prev, res)
      prev = cur
    }
    root = node.right
  }
  return res
}

// 解题思路
// 递归或者迭代
