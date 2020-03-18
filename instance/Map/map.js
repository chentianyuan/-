// 字典，以键值对形式存储数据
// 相比Object，map更适合用于存储键值对的数据结构
// 任何类型的值都能被作为键名（而对象只能接收字符串作为键名）
let map = new Map()

map.set('name', 'zw')
map.get('name')
map.has('name')
map.delete('name')
map.clear()
map.keys()
map.values()
map.entries()

let map2 = new Map([
  ['name', 'zw'],
  ['age', 22]
])

// weakMap字典和map类似
// 不同点是WeakMap只能以对象为键名，且没有除get，set，has，delete以外的方法
// 典型应用是，一个对应DOM元素的WeakMap结构，当某个DOM元素被清除，其所对应的WeakMap记录就会自动被移除。
// 基本上，WeakMap的专用场合就是，它的键所对应的对象，可能会在将来消失。WeakMap结构有助于防止内存泄漏。
// 在集合类Set中也有类似的WeakSet的实现
let weakMap = new WeakMap()