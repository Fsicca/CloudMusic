import axios from "axios";

let instance = axios.create({
  baseURL: "http://localhost:3000",
});

// 拦截器
instance.interceptors.request.use((config) => {
  if (config.method == "post") {
    config.data = {
      ...config.data,
      _t: Date.parse(new Date()) / 1000,
    };
  } else if (config.method == "get") {
    config.params = {
      _t: Date.parse(new Date()) / 1000,
      ...config.params,
    };
  }
  return config;
});
instance.interceptors.response.use((res) => res.data);

export default instance;
