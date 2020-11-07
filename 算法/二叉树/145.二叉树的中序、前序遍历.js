// 145. 二叉树的后序遍历
// 给定一个二叉树，返回它的 后序 遍历。
//
// 示例:
//
//   输入: [1,null,2,3]
//    1
//     \
//      2
//      /
//      3
//
// 输出: [3,2,1]
// 进阶: 递归算法很简单，你可以通过迭代算法完成吗？
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var postorderTraversal = function(root) {
  const result = []
  const stack = []
  let prev = null
  while (root || stack.length) {
    while (root) {
      stack.push(root)
      root = root.left
    }
    root = stack.pop()
    // 叶子节点，或者是已经入栈过的根节点
    if (root.right === null || prev === root.right) {
      result.push(root.val)
      // 根节点第三次入栈，可以直接读取值了
      prev = root
      root = null
    } else {
      // 根节点第二次入栈不能直接读取，需重新入栈
      stack.push(root)
      // 遍历右节点
      root = root.right
    }
  }
  return result
};

// 解题思路
// 维护一个stack栈，推入root.left
// 使用迭代的关键点在于，使用prev记录下上一次推入的root，如果下一次root.right等于prev，说明右节点已经入栈过了，可以将根节点的值推入result，然后把root置空，进入stack的下轮循环

// 二叉树的前序遍历
var preorderTraversal = function(root) {
  if (!root) return []
  let queue = [root]
  let res = []
  while (queue.length) {
    let cur = queue.pop()
    res.push(cur.val)
    while (cur) {
      cur.left && res.push(cur.left.val)
      cur.right && queue.push(cur.right)
      cur = cur.left
    }
  }
  return res
};
