// 归并排序
// 采用分治的思想，使用二分法拆分成最小单元，进行排序
// 由于保证了left和right的值一定是有序的，所以避免了很多额外比较，比选择排序n^2的时间复杂度要好一些
// 如果数组长度为n，那么拆分的时间复杂度就是log2n，合并的时间复杂度是n，因此归并排序的总体时间复杂度是O(nlog2n)

// function mergeSort (arr) {
//   if (arr.length <= 1) {
//     return arr
//   }
//   let mid = Math.floor(arr.length / 2)
//   let left = mergeSort(arr.slice(0, mid))
//   let right = mergeSort(arr.slice(mid))
//   return merge(left, right)
// }
//
// function merge (left, right) {
//   let result = []
//   while (left.length || right.length) {
//     if (!left.length) {
//       result.push(...right.splice(0, right.length))
//     } else if (!right.length) {
//       result.push(...left.splice(0, left.length))
//     } else {
//       let tempL = left[0]
//       let tempR = right[0]
//       if (tempL < tempR) {
//         result.push(...left.splice(0, 1))
//       } else {
//         result.push(...right.splice(0, 1))
//       }
//     }
//   }
//   return result
// }

const mergeSort = function (arr) {
  if (arr.length <= 1) return arr
  let mid = Math.floor(arr.length / 2)
  let left = mergeSort(arr.slice(0, mid))
  let right = mergeSort(arr.slice(mid))
  return merge(left, right)
}

const merge = function (left, right) {
  const arr = []
  while (left.length && right.length) {
    if (left[0] > right[0]) {
      arr.push(...right.splice(0, 1))
    } else {
      arr.push(...left.splice(0, 1))
    }
  }
  // 注意！！！！！！
  // splice的插入是插入到指定位置的前面，所以这里应该使用arr.length，而不是arr.length - 1的位置
  if (left.length) {
    arr.splice(arr.length, 0, ...left)
  }
  if (right.length) {
    arr.splice(arr.length, 0, ...right)
  }
  return arr
}

console.log(mergeSort([3,1,5,12,4,5,51,2,5,5]))
