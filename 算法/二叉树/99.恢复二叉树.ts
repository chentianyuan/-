// 99. 恢复二叉搜索树
// 二叉搜索树中的两个节点被错误地交换。

// 请在不改变其结构的情况下，恢复这棵树。

// 示例1:

// 输入: [1,3,null,null,2]

//   1
//  /
// 3
//  \
//   2

// 输出: [3,1,null,null,2]

//   3
//  /
// 1
//  \
//   2
// 示例2:

// 输入: [3,1,4,null,null,2]

//   3
//  / \
// 1   4
//   /
//  2

// 输出: [2,1,4,null,null,3]

//   2
//  / \
// 1   4
//   /
//  3

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/recover-binary-search-tree
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

/**
 Do not return anything, modify root in-place instead.
 */
function recoverTree(root: TreeNode | null): TreeNode | null {
  if (!root) return root
  // 中序遍历
  let inorderTraverse = function (node: TreeNode, arr: Array<number> = []) {
    node.left && inorderTraverse(node.left, arr)
    arr.push(node.val)
    node.right && inorderTraverse(node.right, arr)
    return arr
  }
  let recoverTraverse = function (node: TreeNode, x: any, y: any) {
    if (node.val === x || node.val === y) {
      node.val = node.val === x ? y : x
    }
    node.left && recoverTraverse(node.left, x, y)
    node.right && recoverTraverse(node.right, x, y)
  }
  let arr = inorderTraverse(root, [])
  let x, y
  for (let i = 1; i < arr.length; i++) {
    if (arr[i - 1] > arr[i]) {
      if (x === void 0) {
        x = arr[i - 1]
        y = arr[i]
      } else {
        // 仅更新y
        y = arr[i]
      }
    }
  }
  recoverTraverse(root, x, y)
  return root
};

// 解题思路：搜索二叉树特点（1，中序遍历后是一个递增的数组，2，节点没有重复的值）
// 先中序遍历，然后找到要更换的两个节点，再次遍历替换即可
