// 图是解决计算机数据中的复杂非线性数据结构问题的抽象
// 最常用的表示方式有以下几种
// 邻接矩阵 二维数组来表示顶点之间的联结
// 邻接表 列表，链表，散列表，字典皆可表示
// 关联矩阵 一维数组表示联通性，节省空间和内存

interface dictionary<T> {
  set(key: T, value: any): void
  get(key: T): any
}

interface shortest<T1, T2> {
  distant: Array<T1>
  predecessors: Array<T2>
}

class Dictionary implements dictionary<string>{
  public set (key: string, value: any):void {
    Object.defineProperty(this, key, {
      enumerable: true,
      value
    })
  }
  public get (key: string): any {
    return (this as any)[key] || undefined
  }
}

class Queue {
  _item: Array<any>
  constructor () {
    this._item = []
  }
  // 插入队尾
  enqueue (val: any) {
    return this._item.push(val)
  }
  // 移除并返回队列的第一个元素
  dequeue () {
    return this._item.shift()
  }
  // 返回队列的第一个元素
  front () {
    return this._item.slice(1)
  }
  isEmpty () {
    return !Boolean(this._item.length)
  }
  size () {
    return this._item.length
  }
}


// 邻接表表示图
// 邻接表类似
/**
 * {
 *  verticeA: ['verticeB', 'verticeC'],
 *  verticeB: ['verticeA']
 *  verticeC: ['verticeA']
 * }
 */
class Graph {
  public vertices: Array<any>
  public adjList: Dictionary
  constructor () {
    this.vertices = [] // 存储图中所有定点的名字
    this.adjList = new Dictionary() // 字典存储邻接表
  }

  // 添加一个顶点
  public addVertex (v: string):void {
    this.vertices.push(v)
    this.adjList.set(v, [])
  }

  // 添加一条边线
  public addEdge (v: string, w: string):void {
    this.adjList.get(v).push(w) // 单独一行即可表示有向图
    this.adjList.get(w).push(v) // 两行可表示联通关系，表示无向图
  }

  // 输出邻接表(图)
  public toString () {
    let s = ''
    this.vertices.forEach(vertex => {
      s += vertex + ' -> '
      let line = this.adjList.get(vertex).toString().replace(/\,/g, ' ')
      s += line + '\n'
    })
    return s
  }

  // 图的遍历
  // 初始化各个顶点的颜色
  private initializeColor<T> (str: T): Array<T> {
    let color: Array<T> = []
    this.vertices.forEach(v => color[v] = str)
    return color
  }

  // 广度优先搜索(Breadth-First Search, BFS) 定点存入队列，先存入队列的顶点优先被探索
  public BFS (v: string, callback: Function): void {
    let color = this.initializeColor<string>('white')
    let queue: Queue = new Queue()
    // 将顶点插入队尾
    queue.enqueue(v)

    // 开始遍历，队列为空时，遍历完成
    while(!queue.isEmpty()) {
      // 移除并返回第一个元素，也就是队列的头部，即传入的图的顶点
      let u = queue.dequeue()
      let neighbors = this.adjList.get(u)
      neighbors.forEach((w: any) => {
        // 针对顶点相邻的顶点
        if (color[w] === 'white') {
          // 第一次遍历到，由白色置灰
          color[w] = 'grey'
          // 置灰后插入队列，依次加入，先加入的先通过dequeue出队列
          queue.enqueue(w)
        }
      })
      color[u] = 'block'
      if (callback) {
        // 对遍历到的树的节点进行操作
        callback(u)
      }
    }
  }

  // 广度优先搜索的最短路径算法
  public shortBFS (v:string): shortest<number, string | null> {
    let d: Array<number> = [] // 存储路径长度
    let pred: Array<string | null> = [] // 存储前溯顶点

    let color = this.initializeColor<string>('white')
    let queue: Queue = new Queue()
    // 将顶点插入队尾
    queue.enqueue(v)
    // 初始化最短路径
    for (let i = 0; i < this.vertices.length; i++) {
      d[this.vertices[i]] = 0
      pred[this.vertices[i]] = null
    }

    while (!queue.isEmpty()) {
      let u = queue.dequeue()
      let neighbors = this.adjList.get(u)
      neighbors.forEach((w: any) => {
        if (color[w] === 'white') {
          color[w] = 'grey'
          queue.enqueue(w)
          // 当前路径，等于上一路径长度再加一
          d[w] = d[u] + 1
          // 前溯点即为u
          pred[w] = u
        }
      })
      color[u] = 'black'
    }
    return {
      distant: d,
      predecessors: pred
    }
  }

  // 深度优先搜索(Depth-First Search, DFS) 沿着一个顶点搜索至最深的顶点，结束了再搜索下一个neighbors
  public DFS (v:string, callback: Function) {
    let color: any = this.initializeColor<string>('white')
    let queue: Queue = new Queue()
    queue.enqueue(v)

    let dfsVisit = function (this: Graph, vertice: string, color: any, callback: Function) {
      color[vertice] = 'grey'
      if (callback) {
        callback(vertice)
      }
      let neighbors = this.adjList.get(vertice)
      for(let i = 0; i < neighbors.length; i++) {
        if (color[neighbors[i]] === 'white') {
          dfsVisit.call(this, neighbors[i], color, callback)
        }
      }
      color[vertice] = 'black'
    }

    this.vertices.forEach((vertice: string) => {
      if (color[vertice] === 'white') {
        dfsVisit.call(this, vertice, color, callback)
      }
    })
  }

}

// 新建图和顶点
let myVertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
let graph = new Graph()
// 添加点
myVertices.forEach(vertice => {
  graph.addVertex(vertice)
})
// 添加线
graph.addEdge('A', 'B')
graph.addEdge('A', 'C')
graph.addEdge('A', 'D')
graph.addEdge('C', 'D')
graph.addEdge('C', 'G')
graph.addEdge('D', 'G')
graph.addEdge('D', 'H')
graph.addEdge('B', 'E')
graph.addEdge('B', 'F')
graph.addEdge('E', 'I')

// console.log(graph.toString())
// console.log(graph.BFS('A', (vertice: string) => console.log('Visited vertex: ' + vertice)))
// console.log(graph.shortBFS(myVertices[0]))

console.log(graph.DFS('A', (vertice: string) => console.log('Visited vertex: ' + vertice)))