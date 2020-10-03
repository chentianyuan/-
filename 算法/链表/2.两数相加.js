// 2. 两数相加
// 给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。
//
// 如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。
//
// 您可以假设除了数字 0 之外，这两个数都不会以 0 开头。
//
// 示例：
//
// 输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
// 输出：7 -> 0 -> 8
// 原因：342 + 465 = 807

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
  let hexadecimal = false
  let dummy = new ListNode(0)
  let temp = dummy
  while (l1 || l2) {
    let l1Val = l1 ? l1.val : 0
    let l2Val = l2 ? l2.val : 0
    l1 = l1 ? l1.next : null
    l2 = l2 ? l2.next : null
    let total = l1Val + l2Val + (hexadecimal ? 1 : 0)
    hexadecimal = total >= 10
    temp.next = new ListNode(total % 10)
    temp = temp.next
  }

  if (hexadecimal) {
    temp.next = new ListNode(1)
  }
  return dummy.next
};

// 解题思路
// 顺带提一下两数相加1，用hash表做仅需进行一次遍历
// 两数相加2为模拟相加，创建dummy节点，将l1,l2模拟相加，知道l1，l2都为null时结束
