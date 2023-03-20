import { createRouter, createWebHashHistory } from "vue-router"
import routes from "./routes" //见下
let router = createRouter({
  //指定路由模式
  history: createWebHashHistory(),
  //路由匹配规则 
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})
export default router;