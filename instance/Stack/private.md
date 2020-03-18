```javascript
// symbol
// js中的第七种数据类型，有着绝不重复的特点，适合用作对象的属性，绝不重复
let symbol = symbol()

// 若没有Object.getOwnPropertySymbols()方法，symbol可以用来创建类的私有属性
(() => {
  // _items将作为私有属性，只在构造函数内部被使用
  const _items = symbol()
  class Stack {
    constructor () {
      this[_items] = []
    }
  }
})()

let item = new Stack()
```

或者使用wakeMap来实现私有属性
```javascript
(() => {
  const _items = new wakeMap()
  class Stack {
    constructor () {
      _items.set(this, [])
    }

    add (v) {
     let priviate = _items.get(this)
     priviate.push(v)
     return priviate
    }
  }
})
```