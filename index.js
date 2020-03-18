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