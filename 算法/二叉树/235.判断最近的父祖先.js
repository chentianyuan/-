// 235. 二叉搜索树的最近公共祖先
// 给定一个二叉搜索树, 找到该树中两个指定节点的最近公共祖先。
//
// 百度百科中最近公共祖先的定义为：“对于有根树 T 的两个结点 p、q，最近公共祖先表示为一个结点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”
//
// 例如，给定如下二叉搜索树:  root = [6,2,8,0,4,7,9,null,null,3,5]
//
//
//
//
//
// 示例 1:
//
// 输入: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
// 输出: 6
// 解释: 节点 2 和节点 8 的最近公共祖先是 6。
// 示例 2:
//
// 输入: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4
// 输出: 2
// 解释: 节点 2 和节点 4 的最近公共祖先是 2, 因为根据定义最近公共祖先节点可以为节点本身。

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */

function getNode (node, val) {
  let result = null
  if (node.val === val) return node
  if (node.val > val) {
    return getNode(node.left, val)
  } else {
    return getNode(node.right, val)
  }
}

var lowestCommonAncestor = function(root, p, q) {
  if (!root) return null
  let helper = function (node, target, arr) {
    if (!node) return arr
    arr.push(node.val)
    if (node.val === target) {
      return arr
    } else if (node.val > target) {
      return helper(node.left, target, arr)
    } else {
      return helper(node.right, target, arr)
    }
  }

  let p_path = helper(root, p.val, [])
  let q_path = helper(root, q.val, [])
  let i = 0
  let j = 0
  while (true) {
    if (i > p_path.length || j > q_path.length || p_path[i] !== q_path[j]) {
      return getNode(root, p_path[Math.min(p_path.length - 1, q_path.length - 1, i - 1, j - 1)])
    } else {
      i++
      j++
    }
  }
};

// 解题思路
// 1、两次遍历，判断当前val的大小，寻找p，q的路径，找到p_path和q_path路径之后，两个路径进行比对，取最后相同的元素即为公共父祖先（这里我们存储的数值，所以还得进行一次节点的搜寻）
