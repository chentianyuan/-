// 集合是由一组无序且唯一的项组成的
// 实现集合类 || 也可以用数组来实现
const _items = Symbol()
class Set {
  constructor () {
    this[_items] = {}
  }
  has (val) {
    return this[_items].hasOwnProperty(val)
  }
  add (val) {
    if (!this[_items].has(val)) {
      this[_items][val] = val
      return true
    }
    return false
  }
  remove () {
    if (!this[_items].has(val)) {
      delete items[val]
      return true
    }
    return false
  }
  clear () {
    this[_items] = {}
  }
  values () {
    return Object.values(this[_items])
  }
  size () {
    return Object.keys(this[_items]).length
  }
  
  // set求并集
  union (otherSet) {
    let unionSet = new Set()
    for (let i = 0; i < this[_items].size(); i++) {
      unionSet.add(this[_items].values()[i])
    }

    for (let i = 0; i < otherSet.size(); i++) {
      unionSet.add(otherSet.values()[i])
    }
    // add的实现使得每一项都独一无二
    return unionSet
  }

  // set求交集
  intersection (otherSet) {
    let intersectionSet = new Set()
    let values = this[_items].values()
    for (let i = 0; i < this[_items].size(); i++) {
      if (otherSet.has(values[i])) {
        intersectionSet.add(values[i])
      }
    }

    return intersectionSet
  }

  // 交由es6的set模拟
  // 差集
  // 子集
}
