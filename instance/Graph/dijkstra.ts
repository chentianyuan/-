// Dijkstra算法(贪心算法)
type doubArray = 
  Array<Array<number>>

// 示例: A到其余顶点的最短路径的实现
class Dijkstra {
  private graph: doubArray
  private vertices: Array<string>
  constructor (graph: doubArray, vertices: Array<string>) {
    this.graph = graph
    this.vertices = vertices
  }
  dijkstra (src: string) {
    let dist: any = []
    let visited: any = []
    let length = this.vertices.length
    let loc = this.vertices.indexOf(src)
    for (let i = 0; i < length; i++) {
      // if (this.graph[loc][i] !== 0) {
      //   // 有直接到达的点
      //   dist[this.vertices[i]] = this.graph[loc][i]
      // } else {
      // }
      dist[this.vertices[i]] = Infinity || Number.MAX_SAFE_INTEGER
      // 初始化visited
      visited[this.vertices[i]] = false
    }
    // dist['A'] = 0 | Infinity
    // visited['A'] = false
    // 到自身的最短路径置0
    dist[src] = 0
    for (let u = 0; u < length - 1; u++) {
      // let u = this.minDistance(dist, visited)
      visited[this.vertices[u]] = true
      for (let v = 0; v < length; v++) {
        if (!visited[this.vertices[v]] && dist[this.vertices[u]] != Infinity && dist[this.vertices[u]] + this.graph[u][v] < dist[this.vertices[v]] && this.graph[u][v] != 0) {
          // 第一次以A为顶点，第二次以B为顶点向下搜寻，0即代表无法到达，对能到达的比较当前到达的路径大小，从而获取最短路径
          dist[this.vertices[v]] = dist[this.vertices[u]] + this.graph[u][v]
        }
      }
    }

    return dist
  }
  minDistance (dist: Array<number>, visited: Array<boolean>) {
    return 0
  }
}

let example = new Dijkstra([
  [0, 2, 4, 0, 0, 0],
  [0, 0, 1, 4, 2, 0],
  [0, 0, 0, 0, 3, 0],
  [0, 0, 0, 0, 0, 2],
  [0, 0, 0, 3, 0, 2],
  [0, 0, 0, 0, 0, 0]
], ['A', 'B', 'C', 'D', 'E', 'F'])
console.log(example.dijkstra('A'))