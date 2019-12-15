// 柯里化函数
function curry(fn) {
  return function judgeCurry(...args) {
    return fn.length > args.length
      ? (...args1) => judgeCurry(...args, ...args1)
      : fn(...args);
  };
}
