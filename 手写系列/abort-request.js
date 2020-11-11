// 封装一个请求方法，使其可以被abort
function mockRequest (url, ms = 1000) {
  return new Promise(r => {
    setTimeout(() => {
      r(`${url}请求完毕`)
    }, ms)
  })
}

function Post (url) {
  let requestAbort = false
  let resolveTick = null
  const abort = () => requestAbort = true
  const tick = new Promise(resolve => {resolveTick = resolve})
  this.request = mockRequest(url).then(res => {
    return !requestAbort && resolveTick(res)
  })
  return new Proxy(this, {
    // 第三个参数指向该proxy对象，不常用
    get (target, propKey, receiver) {
      return propKey === 'abort' ? abort : Reflect.get(tick, propKey).bind(tick)
    }
  })
}

var post = new Post('http://127.0.0.1:8080/test')
post.then(res => console.log(res))
post.abort()

// 思路：原生xhr对象有一个abort方法，如果只是封装则用flag标记即可
