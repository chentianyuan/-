/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
  let dummy = new ListNode(0)
  let copyDummy = dummy
  while (l1 && l2) {
    if (l1.val < l2.val) {
      copyDummy.next = new ListNode(l1.val)
      l1 = l1.next
    } else {
      copyDummy.next = new ListNode(l2.val)
      l2 = l2.next
    }
    copyDummy = copyDummy.next
  }
  if (l1) {
    copyDummy.next = l1
  }
  if (l2) {
    copyDummy.next = l2
  }
  return dummy.next
};

var mergeTwoLists = function(l1, l2) {
  if (!l2) return l1
  if (!l1) return l2
  if (l1.val < l2.val) {
    l1.next = mergeTwoLists(l1.next, l2)
    return l1
  } else {
    l2.next = mergeTwoLists(l1, l2.next)
    return l2
  }
};

// 解题思路：
// 1、创建新的dummy节点，l1，l2双指针向后遍历，最后返回dummy.next即可、
// 2、递归法，无需创建额外的链表，迭代自身，得到排序后的链表
