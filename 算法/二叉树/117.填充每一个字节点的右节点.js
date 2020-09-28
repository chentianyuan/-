// 117. 填充每个节点的下一个右侧节点指针 II
// 给定一个二叉树
//
// struct Node {
//   int val;
//   Node *left;
//   Node *right;
//   Node *next;
// }
// 填充它的每个 next 指针，让这个指针指向其下一个右侧节点。如果找不到下一个右侧节点，则将 next 指针设置为 NULL。
//
// 初始状态下，所有 next 指针都被设置为 NULL。
//
// 进阶：
//
// 你只能使用常量级额外空间。
// 使用递归解题也符合要求，本题中递归程序占用的栈空间不算做额外的空间复杂度。
//
// 示例：
//
// 输入：root = [1,2,3,4,5,null,7]
// 输出：[1,#,2,3,#,4,5,7,#]
// 解释：给定二叉树如图 A 所示，你的函数应该填充它的每个 next 指针，以指向其下一个右侧节点，如图 B 所示。

/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

/**
 * @param {Node} root
 * @return {Node}
 */
var connect = function(root) {
  if (!root) return null
  let queue = [root]
  while (queue.length) {
    let len = queue.length
    for (let i = 0; i < len; i++) {
      let next = i === len - 1 ? null : queue[i + 1]
      let temp = queue[i]
      temp.next = next
      temp.left && queue.push(temp.left)
      temp.right && queue.push(temp.right)
    }
    queue = queue.slice(len)
  }
  return root
};

var connect = function(root) {
  if (!root) return null
  let last = null
  let nextstart = null
  function helper (node) {
    if (last) {
      last.next = node
    }

    if (!nextstart) {
      // 缓存下一层的头结点
      nextstart = node
    }

    last = node
  }

  let start = root
  while (start) {
    last = null
    nextstart = null
    // 每层的第一个头结点即为当前一层的最左侧的节点
    // 循环start.next，即循环头结点
    for (;start !== null; start = start.next) {
      if (start.left) {
        helper(start.left)
      }

      if (start.right) {
        helper(start.right)
      }
    }
    start = nextstart
  }

  return root
};

// 解题思路：
// 1、空间复杂度O(n)的常规解法，bfs取下一个节点添加上即可
// 2、空间复杂度O(1)的解法。借用递归，每次建立n-1层的next，再保存n-1层的头节点，进行循环，直到头节点为null。秒哇~
