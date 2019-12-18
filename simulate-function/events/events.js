// 发布订阅模式
var Events = function() {
  this.sub = {};
};

Events.prototype.on = function(type, fn) {
  if (!this.sub[type]) {
    this.sub[type] = [];
  }
  this.sub[type].push(fn);
};

Events.prototype.off = function(type, fn) {
  if (!this.sub[type]) {
    return;
  }

  this.sub[type].forEach((item, index, array) => {
    if (item == fn) {
      array.splice(index, 1);
    }
  });
};

Events.prototype.emit = function(type, ...args) {
  if (!this.sub[type]) {
    return;
  }
  this.sub[type].forEach(item => {
    item.call(this, ...args);
  });
};

var fun1 = function(name1, name2) {
  console.log("hello fun1 " + name1, name2);
};

var fun2 = function(name) {
  console.log("hello fun2 " + name);
};

let newEvents = new Events();

newEvents.on("fn", fun1);
newEvents.on("fn", fun2);

newEvents.emit("fn", "toryang", "hello");
