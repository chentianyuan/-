// 单例模式

interface Constructable<T> {
  new (...args: any[]) : T;
}

const getInstance = (function () {
  let instanceWeakMap = new WeakMap()
  return function (consuctorFn: Constructable<Object>, ...rests: any[]) {
    if (typeof consuctorFn === 'function' && consuctorFn.prototype) {
      if (!instanceWeakMap.has(consuctorFn)) {
        instanceWeakMap.set(consuctorFn, new consuctorFn(...rests))
      }
      return instanceWeakMap.get(consuctorFn)
    }
  }
})()

class A {
  name: string
  constructor(name) {
    this.name = name
  }
}

const a1 = getInstance(A, '111')
const a2 = getInstance(A, '222')

console.log(a1 === a2) // true
console.log(a1.name, a2.name) // 111, 111
