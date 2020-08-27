// 给定一个机票的字符串二维数组 [from, to]，子数组中的两个成员分别表示飞机出发和降落的机场地点，对该行程进行重新规划排序。所有这些机票都属于一个从 JFK（肯尼迪国际机场）出发的先生，所以该行程必须从 JFK 开始。

// 说明:

// 如果存在多种有效的行程，你可以按字符自然排序返回最小的行程组合。例如，行程 ["JFK", "LGA"] 与 ["JFK", "LGB"] 相比就更小，排序更靠前
// 所有的机场都用三个大写字母表示（机场代码）。
// 假定所有机票至少存在一种合理的行程。
// 示例 1:

// 输入: [["MUC", "LHR"], ["JFK", "MUC"], ["SFO", "SJC"], ["LHR", "SFO"]]
// 输出: ["JFK", "MUC", "LHR", "SFO", "SJC"]
// 示例 2:

// 输入: [["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]
// 输出: ["JFK","ATL","JFK","SFO","ATL","SFO"]
// 解释: 另一种有效的行程是 ["JFK","SFO","ATL","JFK","ATL","SFO"]。但是它自然排序更大更靠后。

/**
 * @param {string[][]} tickets
 * @return {string[]}
 */
let dfs = function (ticket, adjList, result) {
  while (adjList.get(ticket) && adjList.get(ticket).length !== 0) {
    dfs(adjList.get(ticket).shift(), adjList, result)
  }
  result.push(ticket)
}
var findItinerary = function(tickets) {
  let adjList = new Map() // 图的数量
  let result = []
  for (let [from, to] of tickets) {
    if (!adjList.get(from)) {
      adjList.set(from, [to])
    } else {
      adjList.get(from).push(to)
      adjList.get(from).sort()
    }
  }
  dfs('JFK', adjList, result)
  return result.reverse()
};

// 解题思路：
// 依据题意，给出的有向图必然是一个欧拉图或者半欧拉图，如果我们对该图进行深度优先遍历，最后遍历到的那一位必定是最后一张机票，如果是半欧拉图，最后一位也就是（死胡同或者说一笔画）的最后一笔画
// 要点1：map存储所有ticket得到有向图
// 要点2：依据题意在某ticket可以飞向多个地区时应该按照自然排序，对目标地区排序
// 要点3：从JFK开始遍历，每次dfs需要按顺序shift先走自然排序小的ticket（每次shift也保证了每个ticket只会被走到一次）
// 药店4：我们result中push的ticket是先进后push的顺序推入的，最后的结果reverse一次即可