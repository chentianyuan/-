// 143. 重排链表
// 给定一个单链表 L：L0→L1→…→Ln-1→Ln ，
// 将其重新排列后变为： L0→Ln→L1→Ln-1→L2→Ln-2→…
//
// 你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。
//
// 示例 1:
//
// 给定链表 1->2->3->4, 重新排列为 1->4->2->3.
// 示例 2:
//
// 给定链表 1->2->3->4->5, 重新排列为 1->5->2->4->3.

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */
function reverseLink (head) {
  if (!head) return null
  let prev = null
  let cur = head
  while (cur) {
    let temp = cur.next
    cur.next = prev
    prev = cur
    cur = temp
  }
  return prev
}


var reorderList = function(head) {
  if (!head) return null
  let temp = head
  let link1 = null
  let link2 = null
  let len = 0
  // 计算出链表长度
  while (head.next) {
    head = head.next
    len++
  }

  head = temp
  link1 = temp
  len = Math.floor(len / 2)
  while (len) {
    head = head.next
    if (len === 1) {
      link2 = head.next
      head.next = null
    }
    len--
  }

  link2 = reverseLink(link2)

  let stash = link1
  let prev = link1
  let cur = link2
  while (cur) {
    let temp = prev.next
    prev.next = cur
    prev = prev.next
    cur = temp
  }

  return stash
};

// 解题思路
// 1、计算链表的中间位置（遍历一遍除以2，或者使用快慢指针）
// 2、分开两端链表，然后反转后半部分的链表
// 3、重排链表，顺序重排即可
