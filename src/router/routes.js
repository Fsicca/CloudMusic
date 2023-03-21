export default [
  {
    path: "/",
    component: () => import("../views/Home.vue"),
    children: [
      {
        path: "/mine",
        name: "mine",
        component: () => import("../views/Mine.vue"),
      },
      {
        path: "/foundMusic",
        name: "foundMusic",
        component: () => import("../views/FoundMusic.vue"),
      },
      {
        path: "/cloudVillage",
        name: "cloudVillage",
        component: () => import("../views/CloudVillage.vue"),
      },
      {
        path: "/videos",
        name: "videos",
        component: () => import("../views/Videos.vue"),
      },
      {
        path: "",
        redirect: "/foundMusic",
      },
    ],
  },
  // 搜索
  {
    path: "/search",
    name: "search",
    component: () => import("../views/SearchMusic.vue"),
  },
  // 歌单详情
  {
    path: "/musicListDetail",
    name: "musicListDetail",
    component: () => import("../views/MusicListDetails.vue"),
  },
];
