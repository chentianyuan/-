// 私有属性
// 无法通过实例来访问，但是在构造函数内部可以被访问
// 私有属性无法被继承

// methods1
// 借用闭包，实现属性私有化
// class Test {
//   constructor (a) {
//     const _a = a
//     this.getA = function () {
//       return _a
//     }
//   }
// }

// method2
// 借用Symbol数据类型，Symbol值唯一，外界无法获取的特性
// !Object.getOwnPropertySymbols(test)可以获取实例上的Symbol，从而读取到私有属性
// class Test {
//   constructor (a) {
//     const _a = Symbol('a')
//     this[_a] = a
//     this.getA = function () {
//       return this[_a]
//     }
//   }
// }

// method3
// 比较优秀的做法，因为闭包，外界无法获取weakMap，当然也无法获取我们的私有属性a
// 而且借用了IIFE，此时的getA不是挂在实例，而是挂载在构造函数的原型链上的
const Test = (function () {
  const weakMap1 = new WeakMap()
  const weakMap2 = new WeakMap()
  class innerTest {
    constructor (a) {
      weakMap1.set(this, a)
      weakMap2.set(this, 'b')
    }
    getA () {
      return weakMap1.get(this)
    }
    getB () {
      return weakMap2.get(this)
    }
  }
  return innerTest
})()

// method4/5
// 使用 #a 新的语法 、上ts，直接使用private

let test = new Test(123)
let test2 = new Test(1234)

console.log(test.a)
console.log(test.getA())
console.log(test2.getA())
console.log(test.getB())
console.log(Object.getOwnPropertySymbols(test))
