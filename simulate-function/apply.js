Function.prototype.myApply = function() {
  let [thisArgs, args] = Array.from(arguments);
  if (!thisArgs) {
    thisArgs = typeof window === undefined ? global : window;
  }

  // 与 call类似，this就指向了调用者，即函数
  thisArgs.func = this;

  let res = thisArgs.func(...args);
  delete thisArgs.func;

  return res;
};
