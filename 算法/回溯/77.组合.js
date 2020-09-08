/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
function dfs (arr, temp, result, k) {
  if (temp.length === k) {
    result.push(temp)
    return
  }
  for (let i = 0; i < arr.length; i++) {
    dfs(arr.slice(i + 1), [...temp, arr[i]], result, k)
  }
}
var combine = function(n, k) {
  let arr = Array.from(new Array(n), (_, i) => i + 1)
  let result = []
  dfs(arr, [], result, k)
  return result
};

// 解题思路：
// 回溯即可