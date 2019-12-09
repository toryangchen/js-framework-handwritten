Function.prototype.myCall = function() {
  let [thisArg, ...args] = Array.from(arguments);

  if (!thisArg) {
    thisArg = typeof window === undefined ? global : window;
  }
  //这里的this就指向了调用者，即函数
  thisArg.func = this;
  // 执行函数
  let result = thisArg.func(...args);

  delete thisArg.func;

  return result;
};

this.a = 1;

var data = {
  a: 2,
};

function add(num) {
  return this.a + num;
}

console.log(add.myCall(data, 2));
console.log(add.myCall(this, 2));
