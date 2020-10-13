// 24. 两两交换链表中的节点
// 给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。
//
// 你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。
//
//
//
// 示例:
//
//   给定 1->2->3->4, 你应该返回 2->1->4->3.

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function(head) {
  if (!head) return null
  let prev = head
  let cur = head.next
  let dummy = null
  let result
  while (prev && cur) {
    prev.next = cur.next
    cur.next = prev
    !result && (result = cur)
    dummy && (dummy.next = cur)
    dummy = prev

    prev = prev.next
    cur = prev ? prev.next : null
  }
  return result || head
};

// 解题思路
// 双指针+dummy节点保存上一轮交换的上游节点
// result存储第一轮交换节点的头部，即为最终结果
