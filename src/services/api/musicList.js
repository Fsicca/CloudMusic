import request from "../request";
/* 
歌单
*/

// 歌单详情
export const getMusicListDetail = (id) =>
  request({
    url: "/playlist/detail?id=" + id,
    method: "get",
  });

// 歌单列表
export const getMusicList = (id) =>
  request({
    url: "/playlist/track/all?id=" + id + "&limit=&offset=0",
    method: "get",
  });
