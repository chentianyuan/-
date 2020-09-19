process.nextTick(function () {
  console.log(1)
})

setImmediate(function () {
  console.log(4)
})

setTimeout(() => {
  console.log(2)
})

Promise.resolve(3).then(res => {
  console.log(res)
})

require('fs').createReadStream('./tsconfig.json', {
  encoding: 'utf-8'
}).on('data', function (data) {
  console.log(data)
})

var obj = {
  toString:function(){
    console.log('toString')
    return Object.prototype.toString.call(this)
  },
  valueOf:function(){
    console.log('valueOf')
    return Object.prototype.valueOf.call(this)
  }
}
console.log(obj)
console.log(+obj) // 先触发valueOf，再触发toString，得到NaN
console.log(obj=={})
console.log(obj==={})
console.log(obj=='test') // 先触发valueOf，再触发toString，得到false
console.log(obj==='test')
