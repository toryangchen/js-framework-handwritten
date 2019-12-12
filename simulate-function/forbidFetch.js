// input
// urls = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]
// limit = 5
// callback

function mapLimit(urls, limit, callback) {
  function sendFetch(urls) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let url = urls.shift();
        callback(url);
        resolve(url);
        // console.log(`link succeed ${url}`);
      }, 1000);
    }).finally(() => {
      if (urls.length > 0) {
        return sendFetch(urls);
      }
    });
  }

  let res = [];
  while (limit--) {
    res.push(sendFetch(urls));
  }

  return Promise.all(res);
}

let urls = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  limit = 5;

mapLimit(urls, limit, res => {
  console.log(res);
}).then(result => {
  console.log(result);
});
