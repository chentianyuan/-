// 手写bing方法
Function.prototype.myCall = function (context) {
  context.fn = this || window
  var args = Array.prototype.slice.call(arguments, 1)
  // 避免使用...ES6的扩展运算符来实现ES3的call方法
  var result = eval('context.fn(\'' + args.join(',') + '\')')
  delete context.fn
  return result
}


// 手写apply方法
Function.prototype.myApply = function (context) {
  var result
  context.fn = this || window
  var args = Array.prototype.slice.call(arguments, 1)
  // 避免使用...ES6的扩展运算符来实现ES3的call方法
  if (!args.length) {
    result = context.fn()
  } else {
    result = eval('context.fn(\'' + args.join(',') + '\')')
  }
  delete context.fn
  return result
}

function testFn (arg) {
  console.log(this.name)
  console.log(arg)
  return this
}

console.log(testFn.myCall({ name: '张三' }, 'params'))
console.log(testFn.myApply({ name: '张三' }, 'params'))
