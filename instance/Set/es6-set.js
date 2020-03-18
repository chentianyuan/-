// 集合类
let set = new Set()

// 差集
function difference (setA, setB) {
  let differenceSet = new Set()
  for (let v of setA) {
    if (!setB.has(v)) {
      differenceSet.add(v)
    }
  }

  return differenceSet
}

// 子集
function subSet (setA, setB) {
  return Object.values(setB).every(v => setA.has(v))
}