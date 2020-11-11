// 381. O(1) 时间插入、删除和获取随机元素 - 允许重复
// 设计一个支持在平均 时间复杂度 O(1) 下， 执行以下操作的数据结构。
//
// 注意: 允许出现重复元素。

// insert(val)：向集合中插入元素 val。
// remove(val)：当 val 存在时，从集合中移除一个 val。
// getRandom：从现有集合中随机获取一个元素。每个元素被返回的概率应该与其在集合中的数量呈线性相关。
// 示例:
//
// // 初始化一个空的集合。
//   RandomizedCollection collection = new RandomizedCollection();
//
// // 向集合中插入 1 。返回 true 表示集合不包含 1 。
// collection.insert(1);
//
// // 向集合中插入另一个 1 。返回 false 表示集合包含 1 。集合现在包含 [1,1] 。
// collection.insert(1);
//
// // 向集合中插入 2 ，返回 true 。集合现在包含 [1,1,2] 。
// collection.insert(2);
//
// // getRandom 应当有 2/3 的概率返回 1 ，1/3 的概率返回 2 。
// collection.getRandom();
//
// // 从集合中删除 1 ，返回 true 。集合现在包含 [1,2] 。
// collection.remove(1);
//
// // getRandom 应有相同概率返回 1 和 2 。
// collection.getRandom();

/**
 * Initialize your data structure here.
 */
var RandomizedCollection = function() {
  this.recordMap = {}
  this.nums = []
};

/**
 * Inserts a value to the collection. Returns true if the collection did not already contain the specified element.
 * @param {number} val
 * @return {boolean}
 */
RandomizedCollection.prototype.insert = function(val) {
  this.nums.push(val)
  const set = this.recordMap[val] || new Set()
  // 记录下该元素每次插入时所在的位置
  set.add(this.nums.length - 1)
  this.recordMap[val] = set
  return set.size === 1
};

/**
 * Removes a value from the collection. Returns true if the collection contained the specified element.
 * @param {number} val
 * @return {boolean}
 */
RandomizedCollection.prototype.remove = function(val) {
  if (!this.recordMap[val] || !this.recordMap[val].size) return false
  const set = this.recordMap[val]
  let index
  // 找出其中一个位置坐标
  for (let i of set) {
    if (index === void 0) {
      index = i
      break
    }
  }
  set.delete(index)
  // 如果要删除的刚好是最后一个元素，则无需进行交换+重设的操作
  if (index < this.nums.length - 1) {
    const temp = this.nums[this.nums.length - 1]
    // 尾部元素交换
    this.nums[index] = temp
    // 删除此次坐标
    this.recordMap[temp].delete(this.nums.length - 1)
    // 添加被删除元素的坐标
    this.recordMap[temp].add(index)
  }
  if (!set.size) {
    delete this.recordMap[val]
  }
  // 移除交换过的元素
  this.nums.pop()
  console.log(this.nums, index)
  return true
};

/**
 * Get a random element from the collection.
 * @return {number}
 */
RandomizedCollection.prototype.getRandom = function() {
  return this.nums[Math.floor(Math.random() * (this.nums.length))]
};

/**
 * Your RandomizedCollection object will be instantiated and called as such:
 * var obj = new RandomizedCollection()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */

// 解题思路
// 首先随机按概率返回很容易想到，我们存储所有的元素，然后Math.floor(Math.random() * (this.nums.length))得到[0, this.nums.length - 1]的值，取数组中该下标的元素即可
// 然后remove的实现比较牛批，我们可以通过set存储每个元素在数组中出现的位置，然后需要删除元素时，采用元素替换的方式，随机取一个要删除元素的下标
// 如果取到的下标正好是最后一个元素，那nums数组直接pop即可，否则我们将其与最后一个元素交换，并将该元素的该下标从set中移除，同时，将最后一个元素的下标移除，替换为新的删除元素的下标
