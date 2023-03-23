import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";

import { getBanner, getRecommendedList } from "@/services/api/found.js";
import { getMusicListDetail, getMusicList } from "@/services/api/musicList.js";

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
    // console.log(res);
    recomList.value = res.result;
    // console.log(recomList.value);
  };

  /* 
  歌单
  */
  // 歌单详情
  let route = useRoute();
  let musListDetail = ref({}); // 歌单信息
  let getMusicListDetails = async () => {
    let res = await getMusicListDetail(route.query.id);
    // console.log(res.playlist);
    musListDetail.value = res.playlist;
    // console.log(musListDetail.value);
  };

  // 歌单列表
  let musLists = ref({}); // 歌单列表
  // 获取歌曲列表
  let getMusicLists = async () => {
    let res = await getMusicList(route.query.id);
    console.log(res);
    musLists.value = res.songs;
    // console.log(musLists.value);
  };

  // 本地上次听得歌曲
  let plist = JSON.parse(localStorage.getItem("playlist"));

  if (plist) {
    plist = plist;
  } else {
    plist = [
      {
        al: {
          id: 90388661,
          name: "一切都会好起来的", // 专辑名字
          picUrl:
            "https://p1.music.126.net/Jv2DvcSPU1nSyDk71AGmow==/109951165039334386.jpg", // 歌曲图片
          pic_str: "109951165039334386",
        },
        name: "", //
        ar: [], // 歌手名字
        id: 1453210382, // 歌曲id
      },
    ];
  }
  let playlist = ref(plist); // 播放列表
  let plIdx = localStorage.getItem("playlistIdx");
  if (plIdx) {
    plIdx = plIdx * 1;
  } else {
    plIdx = 0;
  }
  let playlistIdx = ref(plIdx); // 播放默认下标
  let isPShow = ref(false); //播放暂停按钮
  let isMusicShow = ref(false); // 歌曲播放页 显示隐藏

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
    musListDetail,
    getMusicListDetails,
    // 歌单列表
    musLists,
    playlist,
    playlistIdx,
    isPShow,
    isMusicShow,
    getMusicLists,
  };
});
