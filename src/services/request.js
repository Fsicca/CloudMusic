import axios from "axios";
// import { useCount } from "@/store/count";
// import { storeToRefs } from "pinia";

// const countStore = useCount();

let instance = axios.create({
  baseURL: "http://localhost:3000",
});

// 拦截器
instance.interceptors.request.use((config) => {
  // 添加时间戳
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

  // countStore.isLoading.value = true;
  return config;
});
instance.interceptors.response.use((res) => {
  // isLoading.value = false;
  return res.data;
});

export default instance;
