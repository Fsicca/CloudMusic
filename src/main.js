import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "lib-flexible";
import "vant/es/toast/style";
import { createPinia } from "pinia";

import "./assets/main.scss";

createApp(App).use(createPinia()).use(router).mount("#app");
