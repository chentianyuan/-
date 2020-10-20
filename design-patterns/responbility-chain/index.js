/**
 * 职责链模式
 * 灵活可拆分的职责链
 * 当有多层的if嵌套，需要灵活增减判断分支时可使用职责链模式，来使代码变得可扩展和可读
 */
var order500 = function (orderType, pay, stock) {
  if (orderType === 1 && pay) {
    console.log('500元定金预购，xxx逻辑')
  } else {
    return 'nextSuccess'
  }
}

var order200 = function (orderType, pay, stock) {
  if (orderType === 2 && pay) {
    console.log('200元定金预购，200元定金逻辑')
  } else {
    return 'nextSuccess'
  }
}

var orderNormal = function (orderType, pay, stock) {
  if (stock > 0) {
    console.log('普通购买，无优惠')
  } else {
    return '手机库存不足'
  }
}

// 职责链工具函数
class Chain {
  constructor (fn) {
    this.fn = fn
    this.successor = null
  }

  // 链
  setNextSuccessor (successor) {
    return this.successor = successor
  }

  passRequest () {
    var ret = this.fn.apply(this, arguments)
    if (ret === 'nextSuccess') {
      return this.successor && this.successor.passRequest.apply(this.successor, arguments)
    }
  }
}

// 包装职责链节点
var chainOrder500 = new Chain(order500)
var chainOrder200 = new Chain(order200)
var chainOrderNormal = new Chain(orderNormal)

// 指定职责链顺序
chainOrder500.setNextSuccessor(chainOrder200)
chainOrder200.setNextSuccessor(chainOrderNormal)

// 执行职责链
chainOrder500.passRequest(1, true, 500)
// 从任意处开始执行职责链
chainOrder200.passRequest(1, true, 200)

// 灵活地任意添加职责链
var order300 = function (orderType, pay, stock) { /* ... */ }
var chainOrder300 = new Chain(order300)
chainOrder300.setNextSuccessor(chainOrder500)

// 活动结束
chainOrderNormal.setNextSuccessor(null)
