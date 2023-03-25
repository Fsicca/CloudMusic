import request from "../request";
/* 
发现音乐
*/

// 顶部轮播图
export const getBanner = () =>
  request({
    url: "/banner?type=2",
    method: "get",
  });

// 推荐歌单
export const getRecommendedList = () =>
  request({
    url: "/personalized?limit=20", // limit 获取几个 最大30个
    method: "get",
  });
