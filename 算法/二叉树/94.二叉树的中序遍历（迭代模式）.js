// 94. 二叉树的中序遍历
// 给定一个二叉树，返回它的中序 遍历。
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
// 输出: [1,3,2]
// 进阶: 递归算法很简单，你可以通过迭代算法完成吗？

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
var inorderTraversal = function(root) {
  if (!root) return[]
  let result = []
  let stack = []
  while (root || stack.length) {
    while (root) {
      stack.push(root)
      root = root.left
    }
    let node = stack.pop()
    result.push(node.val)
    root = node.right
  }
  return result
};

// 解题思路：
// 迭代算法即通过遍历来进行中序遍历
// 思考中序遍历先左子树，再根节点，再右子树的特点
// 我们可以在迭代的时候维护一个栈
// 1、循环推入左子树
// 2、存储当前节点的值
// 3、将根节点设为当前右子树节点，下一步如果有右子树则可以推入右子树了，否则继续弹出下一个左子树，即上一个左子树的根节点
