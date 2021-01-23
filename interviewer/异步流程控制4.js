const generateAsyncTask = (function () {
  let index = 0
  let startTime = new Date().getTime()
  return (ms = 1000) => () => {
    index++
    return new Promise(resolve => {
      setTimeout(i => {
        console.log(`我是${i}号任务，执行完成花费了${new Date().getTime() - startTime}ms`)
        resolve(i)
      }, ms, index)
    })
  }
})()

const task1 = generateAsyncTask(1500)
const task2 = generateAsyncTask(2000)
const task3 = generateAsyncTask(5000)
const task4 = generateAsyncTask(1000)

function asyncControllerGenerate () {
  const realTasks = [] // 实际在运行的异步任务
  const recordTasks = [] // 已经运行的异步任务
  return function callTask (asyncTasks, limit = 2) {
    while (limit > 0 && asyncTasks.length) {
      limit--
      const task = asyncTasks.shift()
      const record = task()
      const len = realTasks.length
      recordTasks.push(record)
      realTasks.push(record.then(() => realTasks.splice(len, 1)))
    }

    return !asyncTasks.length ? Promise.all(recordTasks) : Promise.race(realTasks).then(() => {
      limit++
      return callTask(asyncTasks, limit)
    })
  }
}

const asyncController = asyncControllerGenerate()

asyncController([
  task1, task2, task3, task4,
]).then(results => {
  console.log(results)
}).catch(() => {
  console.log('error')
})
