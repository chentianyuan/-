function easyDeepClone (target) {
  /**
   * 1、无法解决循环依赖，会导致栈溢出
   * 2、无法拷贝 特殊的对象，如正则、Date、Set、Map等
   * 3、无法拷贝函数
   */
  return JSON.parse(JSON.stringify(target))
}

const demoObject = {
  a: {
    b: {
      c: 111
    }
  },
  d: function () {
    console.log(123)
  },
  f: [1, 2, 3]
}

// 函数拷贝
const handleFnc = function (fn) {
  // 箭头函数没有原型对象，可以直接使用eval进行拷贝
  if (!fn.prototype) return eval(fn.toString())
  // eval拷贝普通函数时报错，采用正则匹配形式深度拷贝
  const bodyReg = /(?<={)(.|\n)+(?=})/
  const paramReg = /(?<=\().+(?=\)\s+{)/
  // 分别匹配函数参数和函数体
  const body = bodyReg.exec(fn.toString())
  const param = paramReg.exec(fn.toString())
  // 不合法的函数
  if (!body) return null
  if (param) {
    const paramsArr = param[0].replace(/\s/g, '').split(',')
    return new Function(...paramsArr, body[0])
  } else {
    return new Function(body[0])
  }
}

function deepClone (target, hashMap = new WeakMap()) {
  // 解决循环引用的问题
  if (hashMap.has(target)) return hashMap.get(target)

  // 处理可遍历对象
  if (typeof target === 'object' && target !== null) {
    const result = Array.isArray(target) ? [] : {}
    hashMap.set(target, result)
    for (let key in target) {
      // 因为 for...in 会拷贝原型上的属性，所以这里得用hasOwnProperty判断一下先，不拷贝原型上的属性
      if (target.hasOwnProperty(key)) {
        result[key] = deepClone(target[key])
      }
    }
    return result
  } else if (typeof target === 'function') {
    if (['RegExp', 'Date', 'Number', 'String']) {
      return target.prototype.valueOf.call(target)
    } else {
      // 处理自定义函数引用
      return handleFnc(target)
    }
  } else {
    return target
  }
}

console.log(
  deepClone(demoObject)
)
