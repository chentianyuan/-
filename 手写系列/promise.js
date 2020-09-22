const PENDING = 'pending'
const RESOLVED = 'fulfilled'
const REJECTED = 'rejected'

class myPromise {
  constructor (execute) {
    this.state = PENDING
    this.value = void 0
    this.reason = void 0
    this.successFnCallBack = []
    this.failFnCallBack = []
    const resolve = res => {
      this.state = RESOLVED
      this.value = res
      this.successFnCallBack.forEach(callback => {
        callback(this.value)
      })
    }
    const reject = err => {
      this.state = REJECTED
      this.reason = err
      this.failFnCallBack.forEach(callback => {
        callback(this.reason)
      })
    }
    try {
      execute(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  then (successFn, failFn) {
    successFn = typeof successFn === 'function' ? successFn : res => res
    failFn = typeof failFn === 'function' ? failFn : err => {
      throw err
    }
    return new myPromise((resolve, reject) => {
      if (this.state === PENDING) {
        // 异步状态变更
        successFn && this.successFnCallBack.push(() => {
          try{
            const x = successFn(this.value)
            // 非常关键！！！
            // 如果当前是异步调用的then方法，此处的resolve函数存储了下一个链式调用的then方法的success方法
            resolve(x)
          } catch (err) {
            reject(err)
          }
        })
        failFn && this.failFnCallBack.push(() => {
          try {
            const x = failFn(this.reason)
            x instanceof myPromise ? x.then(result => resolve(result)) : resolve(x)
          } catch (err) {
            reject(err)
          }
        })
      }

      if (this.state === RESOLVED) {
        // 同步resolve
        resolve(successFn(this.value))
      }

      if (this.state === REJECTED) {
        // 同步reject
        reject(failFn(this.reason))
      }
    })
  }

  catch (failFn) {
    return this.then(null, failFn)
  }
}

const p = new myPromise(function (resolve, reject) {
  reject(111)
})

p.then(res1 => {
  console.log(res1)
  return 222
}).then(res2 => {
  console.log(res2)
}).catch(err => {
  console.log(err)
})
