import axios from "axios";
// import { useCount } from "@/store/count";
// import { storeToRefs } from "pinia";

// const countStore = useCount();

let instance = axios.create({
  // baseURL: "http://localhost:3000", // 本地
  baseURL:
    "https://service-9kzf0xba-1317500014.gz.apigw.tencentcs.com/release/", // 腾讯云
});

// 拦截器
instance.interceptors.request.use(
  (config) => {
    // 添加时间戳
    if (config.method == "post") {
      config.data = {
        ...config.data,
        _t: Date.parse(new Date()) / 1000,
      };
    } else if (config.method == "get") {
      config.params = {
        // realIP: "116.25.146.177",
        _t: Date.parse(new Date()) / 1000,
        ...config.params,
      };
    }

    // countStore.isLoading.value = true;
    return config;
  },
  (err) => {
    return err;
  }
);
instance.interceptors.response.use((res) => {
  // isLoading.value = false;
  return res.data;
});

export default instance;
