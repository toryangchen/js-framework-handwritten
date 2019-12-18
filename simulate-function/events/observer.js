// 观察者模式
var Subject = function() {
  this.observer = [];
};

Subject.prototype.addObserver = function(fn) {
  this.observer.push(fn);
};

Subject.prototype.notify = function() {
  for (let iterator of this.observer) {
    if (typeof iterator == "function") {
      iterator.call();
    }
  }
};

var fun1 = function() {
  console.log("this is fun1");
};

var mySubject = new Subject();
mySubject.addObserver(fun1());
mySubject.notify();
