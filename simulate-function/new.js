// new都干了哪些事情
// 1. 创建一个空对象
// 2. 链接到原型
// 3. 绑定this 值
// 4. 返回新对象

function myNew() {
  let obj = new Object();

  let Constructor = [].shift.call(arguments);

  obj.__proto__ = Constructor.prototype;

  let res = Constructor.apply(obj, arguments);

  return typeof res == "object" ? res : obj;
}

function People(name, age) {
  this.name = name;
  this.age = age;
}

let people1 = new People("Jack", 20);
console.log(people1.name); //Jack
console.log(people1.age); //20

let people2 = myNew(People, "Rose", 18); //调用自定义create实现new
console.log(people2.name); //Rose
console.log(people2.age); //18
