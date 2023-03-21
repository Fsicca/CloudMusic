import request from "../request";
/* 
歌单
*/

// 歌单
export const getMusciLit = (id) =>
  request({
    url: "/playlist/detail?id=" + id,
    method: "get",
  });
