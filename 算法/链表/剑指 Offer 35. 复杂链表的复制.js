/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */
var copyRandomList = function(head) {
  const temp = new Map()
  let dummy = new Node(0)
  let stashDummy = dummy
  let stashHead = head
  const result = stashDummy

  while (head) {
    dummy.next = new Node(head.val, null, null)
    temp.set(head, dummy.next)
    head = head.next
    dummy = dummy.next
  }

  while (stashHead) {
    if (stashHead.random) {
      stashDummy.next.random = temp.get(stashHead.random)
    }
    stashHead = stashHead.next
    stashDummy = stashDummy.next
  }
  return result.next
};

// 解题思路
// 两次遍历
// 第一次复制除random外的整个链表，并且将原链表的每个节点作为key值，对应新的dummy链表位置
// 第二次复制random节点，在Map中查找原链表random节点指向的节点key对应的dummy节点位置，并将dummy.random节点指向该节点

