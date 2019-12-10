function instance_of(L, R) {
  let protoChain = Object.getPrototypeOf(L);
  const Lprototype = R.prototype;

  // 最坏情况递归查到Object.prototype === null
  while (protoChain) {
    // 两个对象指向同一个内存地址，则为同一个对象
    if (protoChain === Lprototype) {
      return true;
    }
    protoChain = Object.getPrototypeOf(protoChain);
  }

  return false;
}

var number = { b: 1 };
var a = { c: 1 };

console.log(instance_of(number, a));
