var total = 2
var arr = [
  [0,0,5,4],
  [3,2,6,8]
]
function output (total, arr) {
  let resultArr = []
  // 初始化1024x1024的数组
  for (let i = 0; i < 1024; i++) {
    resultArr[i] = new Array(1024)
  }

  for (let i = 0; i < arr.length; i++) {
    // 获取坐标
    let [x1, y1, x2, y2] = arr[i]
    for (let i = x1; i < x2; i++) {
      for (let j = y1; j < y2; j++) {
        // 标注面积
        resultArr[i][j] = 'x'
      }
    }
  }

  // 计算面积
  let area = 0
  for (let i = 0; i < 1024; i++) {
    for (let j = 0; j < 1024; j++) {
      if (resultArr[i][j] === 'x') {
        area++
      }
    }
  }

  return area
}
