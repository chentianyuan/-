// 你这个学期必须选修 numCourse 门课程，记为 0 到 numCourse - 1 。

// 在选修某些课程之前需要一些先修课程。 例如，想要学习课程 0 ，你需要先完成课程 1 ，我们用一个匹配来表示他们：[0, 1]

// 给定课程总量以及它们的先决条件，请你判断是否可能完成所有课程的学习？

// 示例 1:

// 输入: 2, [[1, 0]]
// 输出: true
// 解释: 总共有 2 门课程。学习课程 1 之前，你需要完成课程 0。所以这是可能的。
// 示例 2:

// 输入: 2, [[1, 0], [0, 1]]
// 输出: false
// 解释: 总共有 2 门课程。学习课程 1 之前，你需要先完成​课程 0；并且学习课程 0 之前，你还应先完成课程 1。这是不可能的。


// 提示：

// 输入的先决条件是由 边缘列表 表示的图形，而不是 邻接矩阵 。详情请参见图的表示法。
// 你可以假定输入的先决条件中没有重复的边。
// 1 <= numCourses <= 10 ^ 5

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/course-schedule
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

class _Graph {
  vertices: number
  adjList: Map<number, number[]>
  constructor(vertices: number) {
    this.vertices = vertices // 顶点数量 即课程数量
    this.adjList = new Map() // 表示邻接表
  }

  // 添加顶点
  addVertex(v: number) {
    this.adjList.set(v, [])
  }

  // 添加单项边
  addEdge(start: number, target: number) {
    let arr = this.adjList.get(start) || []
    arr.push(target)
  }
}

// 判读是否存在环
function hasCirle(node: number, visits: number[], graph: _Graph) {
  // 如果有课程的前置课程是自己，则无法完成学习
  if (visits[node] === 1) return true
  // 从课程node开始
  // 课程node已被学习
  visits[node] = 1
  // 开始学习node之后可以学习的课程
  for (let i = 0; i < graph.adjList.get(node).length; i++) {
    if (hasCirle(graph.adjList.get(node)[i], visits, graph)) {
      return true
    }
  }
  // 重置学习状态
  visits[node] = 0
  return false
}

function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  let graph = new _Graph(numCourses)
  for (let i = 0; i < numCourses; i++) {
    // 设置所有课程为顶点
    graph.addVertex(i)
  }
  prerequisites.forEach(([v, w]) => graph.addEdge(w, v))
  // 存储顶点访问状态
  let visits: number[] = new Array(graph.vertices).fill(0)
  for (let i = 0; i < numCourses; i++) {
    // 判断每门课程是否有环
    if (hasCirle(i, visits, graph)) {
      return false
    }
  }
  return true
};