function asyncControl (count, list, asyncFn) {
  let index = 0
  let tasks = []
  let doingTasks = []

  let queue = function () {
    if (index === list.length) {
      return Promise.resolve()
    }
    // 这个地方已经把任务推进异步队列等待执行了！！！
    let task = Promise.resolve().then(() => asyncFn(list[index++]))
    tasks.push(task)

    // 为了存储现在正在执行的任务数量，并且利用上Promise.race方法，这边又开了一个数组，专门用来存储正在执行的异步任务
    // 这里有一个闭包，在task执行完成之后自动清除doingTasks内的这个函数
    const doingTask = task.then(() => doingTasks.splice(doingTasks.indexOf(doingTask), 1))
    doingTasks.push(doingTask)
    // 利用Promise.race判断出是否有promise已经执行完毕
    const res = doingTasks.length >= count ? Promise.race(doingTasks) : Promise.resolve()
    return res.then(queue)
  }
  // 最后用Promise.all(tasks)读取所有的返回的数据
  return queue().then(() => Promise.all(tasks))
}

const list = [3000, 2000, 4000, 1000, 5000, 500]
const count = 1
let index = 0

function sleep (ms) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`已执行任务${index++}，该任务耗时${ms}`)
      resolve(ms)
    }, ms)
  })
}

asyncControl(count, list, sleep).then(res => console.log(res, '--------------------'))
