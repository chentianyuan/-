class Node {
  constructor (ele) {
    this.prev = null // 新增指向previous的指针
    this.element = ele
    this.next = null
  }
}

// 实现双向链表
class DoublyLinkedList {
  constructor () {
    this.head = null
    this.length = 0
    this.tail = null // 新增尾部节点存储变量，存储最后一项的引用
  }

  insert (position, ele) {
    let node = new Node(ele)
    let current = this.head
    let previous
    let index = 0
    if (position > -1 && position <= this.length) {
      if (position === 0) {
        if (!this.head) {
          // 首尾节点都是该node
          this.head = node
          this.tail = node
        } else {
          // console.log(node, '---')
          node.next = current
          current.prev = node
          this.head = node
        }
      } else if (position === this.length) {
        current = tail
        current.next = node
        node.prev = current
        this.tail = node
      } else {
        while (index !== position) {
          index++
          previous = current
          current = current.next
        }
        previous.next = node
        node.prev = previous
        node.next = current
        current.prev = node
      }
      this.length++
      return true
    }

    return false
  }
}

let doublyLinkedList = new DoublyLinkedList()
doublyLinkedList.insert(0, 12)
doublyLinkedList.insert(0, 32)
doublyLinkedList.insert(1, 22)

console.log(doublyLinkedList)