// 异步限制
const limit = (count, list, asyncFunc) => {
  const tasks = []
  const doingTasks = []
  let index = 0
  function enqueue () {
    if (index === list.length) {
      return Promise.resolve()
    }
    const task = Promise.resolve().then(() => asyncFunc(list[index++]))
    tasks.push(task)
    console.log(`push task ${index}`)
    const doingTask = task.then(() => doingTasks.splice(doingTasks.indexOf(doingTask), 1))
    doingTasks.push(doingTask)
    const res = doingTasks.length >= count ? Promise.race(doingTasks) : Promise.resolve()
    return res.then(enqueue)
  }
  return enqueue().then(() => {
    return Promise.all(tasks)
  })
}

let index = 0
function sleep (ms) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`已执行任务${index++}，该任务耗时${ms}`)
      resolve(ms)
    }, ms)
  })
}

const count = 4
const list = [3000, 2000, 4000, 1000, 5000, 500]
limit(count, list, sleep).then(res => console.log(res, '--------------------'))
