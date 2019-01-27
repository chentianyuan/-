// BST二叉搜索树，它是一种有序的树
// 它是二叉树的一种，它只允许在左节点存储比父节点小的值，右节点存储比父节点大的值

interface _Node {
  left: Object | null
  right: Object | null
  ele: number
}

// 节点构造器
class treeNode implements _Node {
  public left: treeNode | null
  public right: treeNode | null
  public ele: number
  constructor (key: number) {
    this.left = null
    this.right = null
    this.ele = key
  }
}

// 实现二叉树
class BinarySearchTree {
  public root: treeNode | null
  constructor () {
    this.root = null
  }
  insert (key: number) {
    let newNode = new treeNode(key)
    if (!this.root) {
      this.root = newNode
    } else {
      this.insertNode(this.root, newNode)
    }
  }

  // 二叉树插入方法实现
  public insertNode (root: treeNode, newNode: treeNode) {
    if (root.ele > newNode.ele) {
      if (!root.left) {
        // 左节点为null
        root.left = newNode
      } else {
        this.insertNode(root.left, newNode)
      }
    } else {
      if (!root.right) {
        // 右节点为空
        root.right = newNode
      } else {
        this.insertNode(root.right, newNode)
      }
    }
  }

  // 树的遍历，中序，先序和后序三种方式
  // 从左到右的二叉树中序遍历其实就是从小到大的排序
  public inOrderTraverse (node: treeNode | null, callback: Function): void {
    if (!node) return // 遍历结束
    this.inOrderTraverse(node.left, callback)
    callback(node.ele) // 对遍历到的节点的值拿来做一些操作
    this.inOrderTraverse(node.right, callback)
  }
  // 先序遍历
  public preOrderTraverse (node: treeNode | null, callback: Function): void {
    if (!node) return // 遍历结束
    callback(node.ele) // 对遍历到的节点的值拿来做一些操作
    this.inOrderTraverse(node.left, callback)
    this.inOrderTraverse(node.right, callback)
  }
  // 后序遍历
  public postOrderTraverse (node: treeNode | null, callback: Function): void {
    if (!node) return // 遍历结束
    this.inOrderTraverse(node.left, callback)
    this.inOrderTraverse(node.right, callback)
    callback(node.ele) // 对遍历到的节点的值拿来做一些操作
  }

  // 搜索二叉搜索树中的最大最小值
  // 传入节点的值可获取以该节点为根节点的二叉搜索树再进行操作，传参易于扩展
  public minNode (node: treeNode): treeNode {
    if (!node.left) {
      return node
    } else {
      return this.minNode(node.left)
    }
  }
  // 搜索二叉搜索树中的最大最小值
  public maxNode (node: treeNode): treeNode {
    if (!node.right) {
      return node
    } else {
      if (!node.right) {
        return node
      } else {
        return this.maxNode(node.right)
      }
    }
  }
  // TODO: 二叉树搜索值
  // 二叉树移除节点
  public removeNode (node: treeNode | null, ele: number): treeNode | null {
    if (!node) return null
      if (ele < node.ele) {
      this.removeNode(node.left, ele)
      return node
    } else if (ele > node.ele) {
      this.removeNode(node.right, ele)
      return node
    } else { // 键等于node
      if (node.left === null && node.right === null) {
        // 叶子节点
        node = null
        return node
      }
      // 有一个子节点的节点
      if (node.left === null) {
        node = node.right
        return node
      } else if (node.right === null) {
        node = node.left
        return node
      } else {
        // 有两个子节点
        // 移除当前节点的同时，应该由右节点中的最小节点来顶替当前位置，再移除右节点的最小节点
        let aux = this.minNode(node.right)
        node.ele = aux.ele
        node.right = this.removeNode(node.right, aux.ele) // 更新右节点，若不更新，即便这边删除了，树中还是有两个相同节点，因为更改的leftMin的值，而不是leftMin的引用
        return node
      }
    }
  }

  // AVL自平衡树
  // 平衡因子 = 节点右子树高度 - 节点左子树高度
  // 若对于任一节点，|平衡因子| > 1 则需要平衡子树
  // 平衡方法对应 YY YL LY LL 四种旋转方式

  // 红黑树 自平衡二叉查找树的一种 又叫二叉B树
  
  // 一个红黑树有以下规定
  // 节点是红色或黑色。
  // 根是黑色。
  // 所有叶子都是黑色（叶子是NIL节点）。
  // 每个红色节点必须有两个黑色的子节点。（从每个叶子到根的所有路径上不能有两个连续的红色节点。）
  // 从任一节点到其每个叶子的所有简单路径都包含相同数目的黑色节点。

  // 它是复杂的，但它的操作有着良好的最坏情况运行时间，并且在实践中是高效的：它可以在O(log n)时间内做查找，插入和删除，这里的 n 是树中元素的数目。
}

let tree = new BinarySearchTree()
tree.insert(11)
tree.insert(7)
tree.insert(15)
tree.insert(5)
tree.insert(3)
tree.insert(9)
tree.insert(8)
tree.insert(10)
tree.insert(13)
tree.insert(12)
tree.insert(20)
tree.insert(18)
tree.insert(25)
tree.inOrderTraverse(tree.root, (ele: number) => console.log(ele))
