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

// 歌单列表
export const getMusicLyric = (id) =>
  request({
    url: "/lyric?id=" + id,
    method: "get",
  });
// 歌单列表 新
// export const getMusicLyrics = (id) =>
// request({
//   url: "/lyric/new?id=" + id,
//   method: "get",
// });
