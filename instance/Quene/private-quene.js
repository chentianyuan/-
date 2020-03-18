// 借助WeakMap实现队列私有化，无法通过定义的方法外的方法获取到队列
const Queue2 = (function () {
  const items = new WeakMap()
  class Queue2 {
    constructor () {
      items.set(this, [])
    }

    enqueue (val) {
      items.get(this).push(val)
    }
  }

  return Queue2
})
