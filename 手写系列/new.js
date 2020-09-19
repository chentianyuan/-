/**
 * new函数
 * 1、创建一个新对象
 * 2、以改新对象为上下文，接收参数，执行构造函数
 * 3、如果构造函数返回的是对象，则返回对象，否则返回之前新建的对象
 */
export const _new = function (fn, ...args) {
  let obj = Object.create(fn.prototype)
  let result = fn.apply(obj, args)
  return typeof result === '[Object object]' ? result : obj
}
