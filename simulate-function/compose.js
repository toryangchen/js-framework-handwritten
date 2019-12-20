/**
 * 参数均为函数, 返回值也是函数
 * 第一函数接受参数, 其他函数接受的上一个函数的返回值
 * 第一个函数的参数是多元的, 其他函数的一元的
 * 自右向左执行
 * @param  {...any} fns
 */
var compose = function(...fns) {
  var length = fns.length;
  var index = length - 1;
  var result;

  return function f1(...arg1) {
    result = fns[index].call(this, arg1);
    if (index <= 0) {
      index = length - 1;
      return result;
    } else {
      --index;
      return f1.call(null, result);
    }
  };
};
