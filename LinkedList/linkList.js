// Node类属于链表元素的一个抽象
class Node {
  constructor (ele) {
    this.element = ele
    this.next = null
  }
}

// 实现单向链表
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

    removeAt (position) {
      if (position > -1 && position < length) {
        let length = this.size()
        let head = this.getHead()
        let current = head
        let previous
        let index = 0
        if (position === 0) {
          map.set(this.head, current.next)
        } else {
          while (index < position) {
            previous = current
            current = current.next
          }
          // previous.next = current 如果这样写，等于没有删除掉current
          // 重新连接链表，但是previous的next不再指向current，而是current.next所指向的单元
          previous.next = current.next
          map.set(this.length, --length)
          return current.element
        }
      } else {
        return null
      }
    }

    insert (position, ele) {
      let node = new Node(ele)
      let head = this.getHead()
      let length = this.size()
      let index = 0
      let previous
      let current = head
      if (position > -1 && position <= length) {
        if (position === 0) {
          // console.log(node)
          node.next = current
          // head作为weakMap设置的对象，修改其内存地址，也只能通过weakMap来修改
          map.set(this.head, node)
        } else {
          while (index++ < position) {
            previous = current
            current = current.next
          }
          node.next = current
          previous.next = node
        }

        map.set(this.length, ++length)
        return true
      } else {
        return false
      }
    }

    toString () {
      let head = this.getHead()
      let current = head // current用于记录当前链表单元所在位置非常有用
      let string = ''

      while (current) {
        string += current.element + (current.next ? ' --> ' : '')
        current = current.next
      }

      return string
    }

    indexOf (ele) {
      let head = this.getHead()
      let length = this.size()
      let current = head // current用于记录当前链表单元所在位置非常有用
      let index = 0
      for (let i = 0; i < length; i++) {
        if (current.element === ele) {
          return index
        }
        current = current.next
        index++
      }
      return -1
    }
  }
})()

let linkedList = new LinkedList()
linkedList.append(12)
linkedList.append(13)
linkedList.insert(0, 25)
console.log(linkedList.indexOf(13))
// console.log(linkedList.getHead(), linkedList.size())

module.exports = LinkedList
