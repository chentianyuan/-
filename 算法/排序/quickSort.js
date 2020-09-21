const quickSort = function (arr) {
  if (arr.length <= 1) return arr
  const guard = arr[0]
  const left = []
  const right = []
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] <= guard) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return [].concat(quickSort(left), guard, quickSort(right))
}

console.log(quickSort([3,1,5,12,4,5,51,2,5,5]))
