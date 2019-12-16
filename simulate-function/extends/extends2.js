// 4. 原型式继承
function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}

let person = {
  name: "Nick",
  firends: ["cherry", "july"]
};

let anotherPerson = object(person);
anotherPerson.name = "lily";
anotherPerson.firends.push("Tom");

let person2 = object(person);
person2.name = "Jone";
person2.firends.push("Linda");

// console.log(person.firends);

// 5. 寄生式继承

function createObject(original) {
  let clone = object(original);
  clone.sayHi = function() {
    console.log("hi");
  };
  return clone;
}

let person1 = createObject(person);
// person1.sayHi();

// 6. 寄生组合式继承
function inheritPrototype(childType, superType) {
  let prototype = object(superType.prototype); // 创建对象
  prototype.constructor = childType; // 增强对象
  childType.prototype = prototype; // 指定对象
}

function SuperType(name) {
  this.name = name;
  this.colors = ["red", "yellow", "blue"];
}

SuperType.prototype.sayName = function() {
  console.log(this.name);
};

function ChildType(name, age) {
  SuperType.call(this, name);
  this.age = age;
}

inheritPrototype(ChildType, SuperType);

ChildType.prototype.sayAge = function() {
  console.log(this.age);
};

let instance = new ChildType("cherry", 20);
instance.sayName();
instance.sayAge();
