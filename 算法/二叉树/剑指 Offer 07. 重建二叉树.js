
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
  let rootIndex = 0
  let inorderMap = new Map()
  inorder.forEach((v, _) => inorderMap.set(v, _))
  let helper = function (left_idx, right_idx) {
    if (left_idx > right_idx) return null
    let val = preorder[rootIndex]
    let root = new TreeNode(val)
    let index = inorderMap.get(val)

    rootIndex++
    root.left = helper(left_idx, index - 1)
    root.right = helper(index + 1, right_idx)
    return root
  }

  return helper(0, inorder.length - 1)
};

// 解题思路
// 同106题，中序+前序
///
