class Node {
  constructor (ele) {
    this.prev = null
    this.element = ele
    this.next = null
  }
}

// 链表 --> 双向链表 --> 循环链表 --> 双向循环链表
// 实现双向循环链表(建立在双向链表之上)
const length = Symbol('length')
const head = Symbol('head')
const tail = Symbol('tail')
class circularLinkedList {
  constructor () {
    this[head] = null
    this[length] = 0
    this[tail] = null
  }

  append (ele) {
    let node = new Node(ele)
    let current = this[head]
    let previous
    if (!current) {
      this[head] = node
      this[tail] = node
      this[head].next = node
      this[tail].prev = node
    } else {
      while (current.next) {
        previous = current
        current = current.next
      }
      previous.next = node
      node.prev = previous
      node.next = this[head]
      this[tail] = node
    }
  }
}

// 链表相比于数组的好处在于链表添加或删除元素时不需要移动元素的位置，仅需通过标识来表示，性能优于数组
// 当需要添加和移除很多元素时最好的选择就是链表，而非数组