// 例子中药品箱子长度为10，一共有五种药品，长度分别为2，3，5，5，1，满足条件的药品组合是（2，3，5），共3个药品，并且2+3+5=10，正好塞满箱子。

let result = 0
function dfs (arr, count, target) {
  if (target === 0) {
    result = Math.max(result, count)
  }

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > target) break
    dfs(
      [...arr.slice(0, i), ...arr.slice(i + 1)],
      count + 1,
      target - arr[i]
    )
  }
}

function output (target, drugs) {
  drugs = drugs.sort((a, b) => a - b)
  dfs(drugs, 0, target)
  return result
}

console.log(output(10, [2,3,5,5,1]))
