// 栈实现
class Stack {
  constructor () {
    this.item = []
  }
  // 实现stack需要的方法
  push (v) {
    return this.item.push(v)
  }
  pop () {
    return this.item.pop()
  }
  // 返回栈顶元素但不修改它
  peek () {
    return this.item.slice(-1)
  }
  isEmpty () {
    return !Boolean(this.item.length)
  }
  clear () {
    this.item = []
  }
  size () {
    return this.item.length
  }
}

// 利用栈做十进制转二进制
function divideBy2 (val) {
  let stack = new Stack()
  let rem, binaryString = ''
  val = Math.floor(val)
  while (val > 0) {
    // 被2整除则当前位置应为0，如二进制最后一位，若偶数则为0，反之为1
    rem = val % 2
    val = Math.floor(val / 2)
    stack.push(rem)
  }
  while (!stack.isEmpty()) {
    binaryString += stack.pop().toString()
  }
  return binaryString
}

console.log(divideBy2(99))

// 用栈实现汉诺塔

// 递归实现
function hannt (n, a, b, c) {
  if (n === 1) {
    console.log(`把第${n}块从${a}移动到${c}`)
  } else {
    hannt(n - 1, a, c, b)
    console.log(`把第${n}块从${a}移动到${c}`)
    hannt(n - 1, b, a, c)
  }
}