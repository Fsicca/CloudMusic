import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";

import { getBanner, getRecommendedList } from "@/services/api/found.js";
import { getMusciLit } from "@/services/api/musicList.js";

export const useCount = defineStore("count", () => {
  // 搜索
  // 搜索词
  let search = ref("");

  // 弹出层
  // 弹出层隐藏
  let showLeft = ref(false);

  /*
   发现音乐
  */
  //  轮播图获取
  let bannersImg = ref([]); // 轮播图 图片地址
  let getBanners = async () => {
    let res = await getBanner();
    bannersImg.value = res.banners;
    // console.log(bannersImg.value);
  };
  // 推荐歌单
  let recomList = ref([]); // 歌单列表
  let getRecomList = async () => {
    let res = await getRecommendedList();
    console.log(res);
    recomList.value = res.result;
    // console.log(recomList.value);
  };

  /* 
  歌单
  */
  // 歌单详情
  let route = useRoute();
  let musList = ref({}); // 歌单信息
  let getMusciLits = async () => {
    let res = await getMusciLit(route.query.id);
    // console.log(res.playlist);
    musList.value = res.playlist;

    console.log(musList.value);
  };

  return {
    //搜索
    search,
    // 弹出层
    showLeft,
    /* 
     发现音乐 
    */
    // 轮播图
    bannersImg,
    getBanners,
    // 推荐歌单
    recomList,
    getRecomList,
    /*
     歌单 
    */
    // 歌单详情
    musList,
    getMusciLits,
  };
});
