/**
 * @param {number[][]} edges
 * @return {number[]}
 */

const findRoot = function (x_root, parents) {
  let root = x_root
  while (parents[root] !== -1) {
    root = parents[root]
  }
  return root
}
/**
 * 合并节点
 * 1 - union successfully
 * 0 - union fail
 */
const union_vertices = function (x, y, parents) {
  let x_root = findRoot(x, parents)
  let y_root = findRoot(y, parents)
  if (x_root === y_root) {
    return 0
  }
  parents[x_root] = y_root
  return 1
}
var findRedundantConnection = function(edges) {
  let N = edges.length
  // N个节点，及一条附加的边
  // 正常情况N个节点的无环图边一定是N-1个，这里多有一条附加边，那么边的个数一定是N条
  // parents 数组储存每个节点的根节点，先初始化每个节点的根节点为自身，也就是-1
  let parents = new Array(N + 1).fill(-1)
  for (let i = 0; i < N; i++) {
    let x = edges[i][0]
    let y = edges[i][1]
    if (union_vertices(x, y, parents) === 0) {
      return [x, y]
    }
  }
};

// 解题思路：
// 1、dfs遍历，如果有遇到集合中已经出现的值则返回当前节点
// 2、并查集的要点如下
// 使用parents存储各个位置节点的根节点，对每条路径进行遍历并执行union合并方法，如果存在两个i，j的根节点为同一节点的情况，则说明图中有环存在
// 并查集的时间复杂度为O(n)远远优于普通的dfs
