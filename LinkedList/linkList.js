// Node类属于链表元素的一个抽象
class Node {
  constructor (ele) {
    this.element = ele
    this.next = null
  }
}

const LinkedList = (() => {
  const map = new WeakMap()
  // 创建链表类
  return class LinkedList {
    constructor () {
      // 链表的初始化数据，私有属性
      map.set(this['length'] = {}, 0)
      map.set(this['head'] = {}, null)
    }
    getHead () {
      return map.get(this.head)
    }
    size () {
      return map.get(this.length)
    }
    append (ele) {
      // 生成链表中的新元素
      let node = new Node(ele)
      // 当前节点
      let current
      let head = map.get(this.head)
      let length = map.get(this.length)
      if (head === null) {
        map.set(this.head, node)
      } else {
        current = head
        // 循环链表找到最后一项
        while (current.next) {
          current = current.next
        }

        // 添加到最后一项
        current.next = node
      }
      map.set(this.length, ++length)
    }
  }
})()

let linkedList = new LinkedList()
linkedList.append(12)
linkedList.append(13)
console.log(linkedList.getHead(), linkedList.size())