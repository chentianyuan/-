// 组合继承
var Parent = function () {
  this.name = 'zw'
}

Parent.prototype.say = function () {
  console.log(this.name)
}

var Child = function () {
  // 寄生技术，仅在此处调用一次父类构造函数
  Parent.apply(this, arguments)
  this.childName = 'sss'
}

// Child.prototype = new Parent()
// var child = new Child()

// 寄生式组合继承

// 寄生技术，借用F函数，避免了调用两次Parent构造函数
// 同时还继承了父类的构造函数
function F () {}
F.prototype = Parent.prototype
Child.prototype = new F()

var child = new Child()
