/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {ListNode} head
 * @return {TreeNode}
 */
function sortedListToBST(head) {
  return buildTree(head, null)
};

function buildTree (left, right) {
  // 当左右链表相等，表示已经分区完毕，链表上的元素已经插入树中
  if (left === right) return null
  let middle = getMiddle(left, right)
  let root = new TreeNode(middle.val)
  // 分别构建左右子树
  root.left = buildTree(left, middle)
  root.right = buildTree(middle.next, right)
  return root
}

// 1、找到链表的中间节点，快慢指针
// 2、分区，[left, mid]，[mid.next, right]
// 注意！此处的分区应为left到mid，mid到right而不是mid到null，因为right是在左分区过程中会存在的，不能写死为null
function getMiddle (left, right) {
  let slow = left
  let fast = left
  while (fast !== right && fast.next !== right) {
    fast = fast.next
    fast = fast.next
    slow = slow.next
  }
  return slow
}