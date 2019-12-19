var curryFunction = function(fn) {
  let args = [].slice.call(arguments, 1);
  return function() {
    var newArgs = args.concat([].slice.call(arguments));
    if (arguments.length !== 0) {
      return curryFunction.call(this, fn, ...newArgs);
    } else {
      return fn.apply(this, newArgs);
    }
  };
};

var addCurry = curryFunction(function() {
  var args = [].slice.call(arguments);
  var sum = 0;
  args.forEach(element => {
    sum += element;
  });
  return sum;
});

console.log(addCurry(1)(2)()); //12
console.log(addCurry(1, 2, 3)()); //6
console.log(addCurry(1)(2)(3)(4)()); //10
console.log(addCurry(1)(2)(2, 3)(4)()); //12
