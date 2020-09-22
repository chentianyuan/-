// 手写bind函数
Function.prototype.MyBind = function (context, ...args) {
  const fn = this
  const applyFunction = function () {
    let extraArgs = arguments
    // 执行new操作的时候应当将this设置为构造函数的上下文，而不是bind提供的context
    return fn.apply(this instanceof applyFunction ? this : context, [...args, ...extraArgs])
  }
  return applyFunction
}

const name = 'zw'

const testFn = function (age, sex) {
  console.log(this.name)
  console.log(age)
  console.log(sex)
  this.age = age
  return 'return'
}

const fn = testFn.MyBind({name: 123}, 22, '男')
// 测试返回的函数
// fn()

// 测试new方法
const f = new fn(23, '男')
console.log(f.age)
