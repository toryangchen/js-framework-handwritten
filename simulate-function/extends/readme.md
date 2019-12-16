# 在JS中实现继承的几种方法

## 1、借用原型链

利用构造函数、原型和实例之间的关系，来实现一个引用类型继承另一个类型的属性和方法；

存在问题：父类的实例属性会变成子类的原型属性，该属性会成为共享属性；

## 2、借用构造函数

子类型构造函数中使用apply()或call()调用超类型（父类型）构造函数；

在子类实例创建的时候，使用call改变父类的作用域为子类的，每个子类的实例都有自己的父类副本；

存在的问题：方法只能在构造函数中定义，定义在父类原型上的方法对子类不可见；

## 3、组合继承

利用原型链实现原型属性和方法的继承，从而通过构造函数来实现实例属性的继承（每个实例都有单独的实例属性，互不影响）

最大的问题：调用两次父类的构造函数

## 4、原型式继承

使用Object.create()方法

```javascript
function object(o){
    function F() = {}
    F.prototype = o;
    return new F();
}
```
包含引用类型的属性始终是共享的，就像使用原型链继承一样。

## 5、寄生式继承

在原型式继承的基础上为对象添加函数；

```javascript
function createObject(original) {
  let clone = object(original);
  clone.sayHi = function() {
    console.log('hi');
  };
  return clone;
}
```

使用寄生式继承来为对象添加函数，会由于造成函数不能被复用而降低效率，无法复用构造函数

## 6、寄生组合式继承

```javascript
function inheritPrototype(childType, superType) {
  let prototype = object(superType.prototype);
  prototype.constructor = childType;
  childType.prototype = prototype;
}
```

实例中的`inheritPrototype`完成了寄生组合式继承最简单的形式。它接受两个参数：子类型构造函数和超类型构造函数。在函数内部，第一步是创建父类型原型的一个副本，第二步是为创建的副本添加`constructor`属性，弥补重写原型后`constructor`属性的丢失。最后一步将新创建的原型副本赋值给子类型的原型。这样我们就可以调用`inheritPrototype`来替换之前例子中为子类型原型赋值的那一步