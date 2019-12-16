// 1. 借用原型链的继承
function SuperType() {
  this.superType = "SuperType";
}

SuperType.prototype.getSuper = function() {
  return this.superType;
};

function ChildType() {
  this.childType = "ChildType";
}

ChildType.prototype = new SuperType();
let instance = new ChildType();
// console.log(instance.getSuper());
// console.log(SuperType.getSuper()); 为什么会报错?

// 2. 借用构造函数
function SuperType_1() {
  this.colors = ["red", "green", "blue"];
}

function ChildType_1(name) {
  this.name = name;
  SuperType_1.call(this, name);
}

let instance_1 = new ChildType_1("Toryang_1");
instance_1.colors.push("yellow"); // ["red", "green", "blue", "yellow"]
// console.log(instance_1.colors);
// console.log(instance_1.name);
let instance_1_1 = new ChildType_1("Toryang_2");
// console.log(instance_1_1.name);
// console.log(instance_1_1.colors); // ["red", "green", "blue"]

// 3. 组合继承
function SuperType_2(name) {
  this.name = name;
  this.colors = ["red", "green", "yellow"];
}
SuperType_2.prototype.getColors = function() {
  return this.colors;
};

function ChildType_2(name) {
  // 继承属性
  SuperType_2.call(this, name);
}
// 继承方法
ChildType_2.prototype = new SuperType_2();

let instance_2 = new ChildType_2("Nick");
let instance_2_1 = new ChildType_2("Cherry");
instance_2.colors.push("black");

// console.log(instance_2.name);
// console.log(instance_2.colors);
// console.log(instance_2.getColors());

// console.log(instance_2_1.colors);
// console.log(instance_2_1.getColors());
