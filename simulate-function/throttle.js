// 节流函数
function throttle(fn, delay) {
  let lastTime, timer;
  return function(arguments) {
    let that = this,
      args = arguments;
    let nowTime = +new Date();
    if (lastTime && nowTime < lastTime + delay) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        lastTime = nowTime;
        fn.call(that, args);
      }, delay);
    } else {
      lastTime = nowTime;
      fn.call(that, args);
    }
  };
}

function ajax(content) {
  //模拟ajax请求
  console.log("ajax request " + content);
}

let throttleRequest = throttle(ajax, 1000);

setInterval(() => {
  throttleRequest("content");
}, 500);
