// 实现一个队列
class Queue {
  constructor () {
    this._item = []
  }
  // 插入队尾
  enqueue (val) {
    return this._item.push(val)
  }
  // 移除并返回队列的第一个元素
  dequeue () {
    return this._item.shift()
  }
  // 返回队列的第一个元素
  front () {
    return this._item.slice(1)
  }
  isEmpty () {
    return Boolean(this._item.length)
  }
  size () {
    return this._item.length
  }
}

// 循环队列实现击鼓传花
/**
 * 击鼓传花
 * @param {Array} nameList 参加游戏的角色
 * @param {Number} num 每次击鼓的次数
 */
function hotPotato (nameList, num) {
  let queue = new Queue()
  queue._item = nameList.slice()
  let eliminated = ''
  while (queue.size() > 1) {
    for (let i = 0; i < num; i++) {
      queue.enqueue(queue.dequeue())
    }

    eliminated = queue.dequeue()
    console.log(`${eliminated}被淘汰`)
  }
  return queue.dequeue()
}

let nameList = ['zw', 'cty', 'zmq', 'wyl', 'fy']
let winer = hotPotato(nameList, 7)
console.log(`胜利者是${winer}`)
