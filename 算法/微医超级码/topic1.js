
// n 为放大倍数
function output (n) {
  let origin = `*********@*********
  
**@@@@**@@@**@@@@**

*@****@**@**@****@*

**@****@***@****@**

***@****@@@****@***

**@****@***@****@**

*@****@*****@****@*

**@@@@*******@@@@**

*******************`
  if (n === 1) return origin
  let result = ''
  let prev = ''
  for (let i = 0; i < origin.length; i++) {
    let scale = n
    if (origin[i] === '\n') {
      while (scale) {
        result += prev
        result += '\n'
        scale--
      }
      prev = ''
    } else {
      while (scale) {
        prev += origin[i]
        scale--
      }
    }
  }

  return  result
}

console.log(output(2))
// output(2)
