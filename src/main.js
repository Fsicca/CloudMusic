import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "lib-flexible";
import "vant/es/toast/style";
import { createPinia } from "pinia";

// 跑马灯
import Vue3Marquee from "vue3-marquee";
import "vue3-marquee/dist/style.css";

import "./assets/main.scss";

createApp(App).use(createPinia()).use(router).use(Vue3Marquee).mount("#app");
