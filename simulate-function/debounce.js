// 防抖函数
function debounce(fn, delay) {
  return function(arguments) {
    let that = this;
    let args = arguments;
    clearTimeout(fn.id);
    fn.id = setTimeout(() => {
      fn.call(that, args);
    }, delay);
  };
}

function ajax(content) {
  //模拟ajax请求
  console.log("ajax request " + content);
}

let debounceRequest = debounce(ajax, 1000);

setInterval(() => {
  debounceRequest("content");
}, 1200);
