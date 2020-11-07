// 实现异步并发，并且如果其中某个promise reject也不影响整个异步流程

const promiseGenerate = function (id, ms = 1000) {
  return new Promise((resolve, reject) => {
    setTimeout((Math.random() > 0.5 ? resolve : reject)(id), ms)
  })
}

let p1 = promiseGenerate(1).catch(err => {})
let p2 = promiseGenerate(2).catch(err => {})
let p3 = promiseGenerate(3).catch(err => {})
let p4 = promiseGenerate(4).catch(err => {})

Promise.all([p1,p2,p3,p4]).then(res => {
  console.log(res, '进入then')
}).catch(res => {
  console.log(res, '进入catch')
})

Promise.allSettled([p1,p2,p3,p4]).then(results => {
  results.forEach(result => {
    if (result.status === 'fulfilled') {
      console.log(result.value)
    } else if (result.status === 'rejected') {
      console.log(result.readson)
    }
  })
})
