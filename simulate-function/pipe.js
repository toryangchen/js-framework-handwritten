// 组合函数的一种
function pipe(...args) {
  return subArgs => {
    return args.reduce((acc, func, index) => {
      return func(acc);
    }, subArgs);
  };
}

//https://segmentfault.com/a/1190000015102804
