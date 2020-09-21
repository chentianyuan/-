// 此题需要图片示意 力扣链接：https://leetcode-cn.com/problems/binary-tree-cameras/
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
var minCameraCover = function(root) {
  let result = 0
  // 维护节点的三种状态
  // 0 节点尚未被监控
  // 1 节点已被监控到
  // 2 节点已安装上摄像头
  const dfs = function (node) {
    // null节点不必被监控，也可视作已被监控的一个节点
    if (node === null) return 1

    // 深度递归
    let left = dfs(node.left)
    let right = dfs(node.right)
    // 如果左右两边的子节点有节点未被监控，那么当前这个节点必定需要被放上摄像头，此时的左右节点的值无需动它，已经不需要了
    if (left === 0 || right === 0) {
      result++
      return 2
    }

    // 左右子节点皆为null的情况，当前节点还尚未被监控
    if (left === 1 && right === 1) {
      return 0
    }

    // 两边都安装了摄像头，或者一边安装了摄像头，另一边为空节点的情况，此时当前节点已被监控
    if (left + right >= 3) {
      return 1
    }
  }

  // 根节点尚未被监控
  if (dfs(root) === 0) {
    result++
  }

  return result
};

// 解题思路
// 递归所有的节点
// 维护节点状态
// 0 节点尚未被监控
// 1 节点已被监控到
// 2 节点已安装上摄像头
// 针对左右节点不同状态的情况，判断当前节点的状态，从而推断当前节点是否需要安装摄像头，得到最终的结果
