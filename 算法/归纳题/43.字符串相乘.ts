// 43. 字符串相乘
// 给定两个以字符串形式表示的非负整数 num1 和 num2，返回 num1 和 num2 的乘积，它们的乘积也表示为字符串形式。

// 示例 1:

// 输入: num1 = "2", num2 = "3"
// 输出: "6"
// 示例 2:

// 输入: num1 = "123", num2 = "456"
// 输出: "56088"
// 说明：

// num1 和 num2 的长度小于110。
// num1 和 num2 只包含数字 0 - 9。
// num1 和 num2 均不以零开头，除非是数字 0 本身。
// 不能使用任何标准库的大数类型（比如 BigInteger）或直接将输入转换为整数来处理。

function add(a: string, b: string) {
  let i = a.length - 1
  let j = b.length - 1
  let flag = false
  let result = ''
  while (i >= 0 || j >= 0) {
    const total: number = Number(a[i] || 0) + Number(b[j] || 0) + Number(flag)
    flag = total >= 10
    result = total % 10 + result
    i--
    j--
  }
  return flag ? '1' + result : result
}
function multiply(num1: string, num2: string): string {
  if (num1 === '0' || num2 === '0') return '0'
  let result = '0'
  let [max, min] = num1.length > num2.length ? [num1, num2] : [num2, num1]
  for (let i = max.length - 1; i >= 0; i--) {
    let dig = '0'.repeat(max.length - i - 1)
    let j = +max[i]
    let mn = ''
    // 非常关键，不能直接使用一位的数和另一个数相乘，会造成越界，只能通过模拟累加的方式
    while (j > 0) {
      mn = add(mn, min)
      j--
    }
    result = add(result, mn + dig)
  }
  return result
};

// 解题思路：通过模拟相加来实现大数的乘法
// 要注意的点：
// 1、num1，num2为0则直接返回
// 2、模拟相乘时需使用个位的数乘以num1，num2中一个较小的一个数
// 3、个位乘以另一个小数时也不能直接使用乘法，需要使用累加的方式，模拟出一个乘法