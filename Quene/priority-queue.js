// 优先队列
function PriorityQueue () {
  let items = []
  function QueueElement (element, priority) {
    this.element = element
    this.priority = priority
  }

  // 插入
  this.enqueue = function (element, priority) {
    let queueElement = new QueueElement(element, priority)

    let added = false
    for (let i = 0; i < items.length; i++) {
      if (queueElement.priority < items[i].priority) {
        // 插入到优先级比它大的队列元素的后面
        items.splice(i, 0, queueElement)
        added = true
        break
      }
    }

    // 找不到优先级比它低的元素，则直接放入队尾
    if (!added) {
      items.push(queueElement)
    }
  }

  // ...
  return items
}

let priorityQueue = new PriorityQueue()
priority.enqueue('Jack', 1)
priority.enqueue('willen', 2)
priority.enqueue('Camila', 1)

// 最后的队列顺序是Jack, Camila, willen