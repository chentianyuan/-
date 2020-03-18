// Prim算法
// 求MIT最小生成树
// 示例: A到其余顶点的最短路径的实现
class Prim {
  private graph: doubArray
  private vertices: Array<string>
  constructor (graph: doubArray, vertices: Array<string>) {
    this.graph = graph
    this.vertices = vertices
  }
  prim (src: string) {
    let key: any = []
    let parent = []
    let length = this.vertices.length
    let loc = this.vertices.indexOf(src)
    for (let i = 0; i < length; i++) {
      key[this.vertices[i]] = Infinity || Number.MAX_SAFE_INTEGER
    }
    // key['A'] = 0 | Infinity
    // visited['A'] = false
    // 到自身的最短路径置0
    key[src] = 0
    for (let i = 0; i < length - 1; i++) {
      for (let j = 0; j < length; j++) {

      }
    }
  }
}

let exampleTwo = new Prim([
  [0, 2, 4, 0, 0, 0],
  [2, 0, 2, 4, 2, 0],
  [4, 2, 0, 0, 3, 0],
  [0, 4, 0, 0, 3, 2],
  [0, 2, 3, 3, 0, 2],
  [0, 0, 0, 2, 2, 0]
], ['A', 'B', 'C', 'D', 'E', 'F'])
console.log(exampleTwo.prim('A'))