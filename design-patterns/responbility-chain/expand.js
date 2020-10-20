// 异步职责链

class Chain {
  constructor (fn) {
    this.fn = fn
    this.successor = null
  }

  // 设置下链
  setNextSuccessor (successor) {
    return this.successor = successor
  }

  next () {
    return this.successor && this.successor.passRequest.apply(this.successor, arguments)
  }

  passRequest () {
    return this.fn.apply(this, arguments)
  }
}

const asyncFn = function () {
  setTimeout(() => {
    console.log(123)
    // asyncFn执行时绑定的是Chain的this，因此可以控制异步职责链的执行在定时器之后
    this.next()
  }, 1000)
}

// 执行职责链
const chain1 = new Chain(asyncFn)
chain1.setNextSuccessor(chain2).setNextSuccessor(chain3)
