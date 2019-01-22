// 借助链表分离链接
const LinkedList = require('../LinkedList/linkList')
// 散列表是字典（map）的一种实现
// 和字典的区别是散列表可以更快速地找到对应的值
// 字典则是有序的，查找键时需遍历整个数据结构来找到对应的值

class HashTable {
  constructor () {
    this.table = []
  }

  loseloseHashCode (key) {
    let hash = 0
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i)
    }
    return hash % 37 // 减小散列表长度，减小内存消耗
  }

  djb2HashCode () {} // 更好的散列函数

  put (key, value) {
    let hash = this.loseloseHashCode(key)
    // 不简单地存储一个值，而是一个链表
    if (!this.table[hash]) {
      // 借助链表解决位置被占用的问题
      this.table[hash] = new LinkedList().append({key, value})
    } else {
      this.table[hash].append({key, value})
    }
  }
  get (key) {
    let position = this.loseloseHashCode(key)
    if (this.table[position] !== undefined) {
      let current = this.table[position].getHead()
      while (current.next) {
        if(current.element.key === key) {
          return current.element.value
        }
        current = current.next
      }
      // 链表中有且仅有一个元素时进行判断
      if(current.element.key === key) {
        return current.element.value
      }
    }
    // 链表中没有对应元素
    return undefined
  }
}

// TODO: 线性探查，当ASCIIkey被占用默认加1，需要时再进行探查，依次判断所对应的key是否是所需要的key

// 解决散列冲突的问题方法有两种
// 1、使用链表，分离链接
// 2、线性探查