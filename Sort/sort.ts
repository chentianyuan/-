const TESTARRAY = [8, 7, 6, 5, 4, 3, 2, 1]

const swap = function (arr:Array<number>, loc1: number, loc2: number):void {
  let temp = arr[loc1]
  arr[loc1] = arr[loc2]
  arr[loc2] = temp
}

// 冒泡排序
let bubbleSort = function (arr:Array<number>):Array<number> {
  let length = arr.length
  for (let i = 0; i < length; i++) {
    for (let j = 1; j <= length - 1 - i; j++) {
      if (arr[j - 1] > arr[j]) {
        swap(arr, j, j - 1)
      }
    }
  }
  return arr
}

// 快速排序
let quickSort = function (arr:Array<number>):Array<number> {
  let length = arr.length
  if (length <= 1) {
    return arr
  }
  let leftArr = []
  let rightArr = []
  let sentry = arr[0]
  for (let i = 1; i < length; i++) {
    if (arr[i] < sentry) {
      leftArr.push(arr[i])
    } else {
      rightArr.push(arr[i])
    }
  }
  return Array.prototype.concat.call([], quickSort(leftArr), sentry, quickSort(rightArr))
}

// 选择排序
let chooseSort = function (arr:Array<number>):Array<number> {
  let length = arr.length
  for (let i = 0; i < length; i++) {
    let min = i
    for (let j = i + 1; j < length; j++) {
      if (arr[j] < arr[min]) {
        min = j
      }
    }
    // 每次找到最小值，交换当前位置
    swap(arr, i, min)
  }
  return arr
}

// 插入排序
let insertSort = function (arr:Array<number>):Array<number> {
  let length = arr.length
  let j
  // 插入的思想是
  // 从第一位开始，将后面的数依次提取出来与前数进行比较，一旦发现前数更小，立即插入，否则将前数位置冒泡
  for (let i = 1; i < length; i++) {
    j = i
    let temp = arr[j]
    while (j > 0 && arr[j - 1] > temp) {
      arr[j] = arr[j - 1]
      j--
    }
    arr[j] = temp
  }
  return arr
}

// 归并排序
// 每当要实现一个递归函数，我们都会实现一个实际被执行的辅助函数
let merge = function (left:Array<number>, right:Array<number>):Array<number> {
  let il = 0
  let ir = 0
  let result:Array<number> = []
  while (il < left.length && ir < right.length) {
    // 关键比较，将分治的两个数组内的元素进行比较
    // 将小的数push进result
    if (left[il] < right[ir]) {
      result.push(left[il++])
    } else {
      result.push(right[ir++])
    }
  }
  // 剩下的未被push的都是大数，直接push至后面
  while (il < left.length) {
    result.push(left[il++])
  }
  while (ir < right.length) {
    result.push(right[ir++])
  }
  return result
}

let mergeSort = function (arr:Array<number>):Array<number> {
  let length = arr.length
  if (arr.length <= 1) {
    return arr
  }
  let middleLoc = Math.floor(length / 2)
  let left = arr.slice(0, middleLoc)
  let right = arr.slice(middleLoc, length)
  return merge(mergeSort(left), mergeSort(right))
}



// console.log(bubbleSort(TESTARRAY))
// console.log(quickSort(TESTARRAY))
// console.log(mergeSort(TESTARRAY))
// console.log(insertSort(TESTARRAY))
// console.log(chooseSort(TESTARRAY))