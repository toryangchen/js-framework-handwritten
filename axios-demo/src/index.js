import Axios from "./axios";
// Axios.default.transformRequest = function(config) {
//   config.headers.token = "token";
//   return config;
// };

// Axios.default.transformResponse = function(res) {
//   res.data = JSON.parse(res.data);
//   return res;
// };

Axios.interceptors.request.use(function(config) {
  config.headers.interceptors = true;
  return config;
});

Axios.interceptors.response.use(function(config) {
  config.data = JSON.parse(config.data);
  config.data.a = 123;
  return config;
});

(async () => {
  let res = await Axios("/data/1.json", {
    headers: {
      a: 12,
      b: "32431,,vsdsd  ; :",
    },
  });
  console.log(res);
})();
