// 组合继承
var Parent = function () {
  this.name = 'zw'
}
var Child = function () {
  Parent.apply(this, arguments)
  this.childName = 'sss'
}

// Child.prototype = new Parent()
// var child = new Child()

// 寄生式组合继承

// 借用F函数，避免了调用两次Parent构造函数，寄生技术
function F () {}
F.prototype = Parent.prototype
Child.prototype = new F()

var child = new Child()
