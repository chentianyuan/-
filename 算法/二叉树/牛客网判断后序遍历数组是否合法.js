// 给定一个后序遍历数组，请判断该后序遍历数组是否合法

function VerifySquenceOfBST(sequence)
{
  // write code here
  if (!sequence.length) return false
  let isVaild = function (arr, left_idx, right_idx) {
    // 根节点
    if (left_idx >= right_idx) return true
    let i = right_idx
    // 寻找第一个小于root节点的元素，左边为一个新的后序遍历数组，右边为一个新的后序遍历数组
    while (i > left_idx && arr[i - 1] > arr[right_idx]) i--
    // 判断一下，左子树不应该有比当前根节点大的元素了（右节点可以跳过了）
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[right_idx]) {
        return false
      }
    }

    return isVaild(arr, left_idx, i - 1) && isVaild(arr, i, right_idx - 1)
  }
  return isVaild(sequence, 0, sequence.length - 1)
}
module.exports = {
  VerifySquenceOfBST : VerifySquenceOfBST
};

// 解题思路：（太香啦）
// 后序遍历的最后一位一定是根节点，剩下的部分一定可以分为两个后序遍历的子树的值
// 通过递归判断剩下的子树是否合法，可以判断整个后序遍历是否合法
// 剩余子树的区分关键在于，找到第一个小于当前root.val的值，那么当前值的左侧即为左子树，右侧为右子树，找到之后只需要判断左子树中是否还包含大于根节点的值即可

