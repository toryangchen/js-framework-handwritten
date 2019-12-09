Function.prototype.myBind = function() {
  let [thisArgs, ...args] = Array.from(arguments);
  if (!thisArgs) {
    thisArgs = typeof window === undefined ? global : window;
  }

  let that = this;

  return function() {
    if (!thisArgs.func) {
      thisArgs.func = that;
    }
    let res = thisArgs.func(...args);
    delete thisArgs.func;
    return res;
  };
};
