<template>
  <!-- 歌单列表 -->
  <div class="musLists" v-if="musLists">
    <van-sticky :offset-top="50">
      <div class="muslTitle">
        <div class="musltLeft" @click="playAll">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-bofang8"></use>
          </svg>
          <span>
            播放全部 （
            <i>{{ musLists.length }}</i>
            ）
          </span>
        </div>
        <div class="musltRight">
          <svg class="icon upload" aria-hidden="true">
            <use xlink:href="#icon-xiazai3"></use>
          </svg>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shaixuanliebiao"></use>
          </svg>
        </div>
      </div>
    </van-sticky>
    <!-- 列表 -->
    <div class="musl">
      <ul>
        <li v-for="(item, idx) in musLists" :key="item.id">
          <div
            class="itemLeft"
            @click="setMusic(idx)"
            :class="{ active: item.id == playlist[playlistIdx].id }"
          >
            <span v-if="item.id != playlist[playlistIdx].id">
              {{ idx + 1 }}
            </span>
            <img
              src="@/assets/play.gif"
              alt=""
              class="palyStatus"
              v-if="item.id == playlist[playlistIdx].id"
            />
            <!-- 歌曲名字 -->
            <div class="musName">
              <p>
                <span
                  :class="{ active: item.id == playlist[playlistIdx].id }"
                  >{{ item.name }}</span
                >
                &nbsp;
                <i v-if="item.alia[0]">({{ item.alia[0] }})</i>
              </p>

              <i class="album">
                <span class="vip" v-if="item.fee == 4 || item.fee == 1">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-VIP2"></use>
                  </svg>
                </span>
                <span v-for="(ar, arIdx) in item.ar">
                  {{
                    arIdx == item.ar.length - 1
                      ? ar.name
                      : ar.name + "&nbsp;/&nbsp; "
                  }}
                </span>
                &nbsp;&nbsp;-&nbsp;&nbsp;
                {{ item.al.name }}
              </i>
            </div>
          </div>
          <div class="itemRight">
            <svg class="icon shipin" aria-hidden="true" v-if="item.mv != 0">
              <use xlink:href="#icon-shipin-"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shezhi2-copy"></use>
            </svg>
          </div>
        </li>
      </ul>
    </div>
    <van-back-top
      bottom="8vh"
      right="10vw"
      offset="500"
      style="background-color: #fe3346"
    />
  </div>
</template>

<script setup>
import { ref, onActivated, onDeactivated } from "vue";

import { useCount } from "@/store/count.js";
import { storeToRefs } from "pinia";

let countStore = useCount();

let { getMusicLists, getLyric } = countStore;
let { musLists, playlist, playlistIdx, isMusicShow, isLyricShow } = storeToRefs(
  useCount()
);

onActivated(() => {
  getMusicLists();
});

onDeactivated(() => {
  musLists.value = "";
});

// 播放全部
const playAll = () => {
  playlist.value = musLists.value;
  playlistIdx.value = 0;
  // getLyric(playlist.value[playlistIdx.value].id);

  localStorage.setItem("playlist", JSON.stringify(playlist.value));
  localStorage.setItem("playlistIdx", playlistIdx.value);
};

// 修改当前播放音乐
const setMusic = (idx) => {
  playlist.value = musLists.value;
  playlistIdx.value = idx;
  // console.log(playlist.value[playlistIdx.value].id);
  // getLyric(playlist.value[playlistIdx.value].id);

  isMusicShow.value = true; // 控制歌曲播放页面的弹出
  isLyricShow.value = true; // 歌曲播放页面 初始显示 歌曲图片
  // console.log(playlist.value[playlistIdx.value]);
  localStorage.setItem("playlistIdx", playlistIdx.value);
  localStorage.setItem("playlist", JSON.stringify(playlist.value));
};
</script>

<style lang="scss" scoped>
.musLists {
  background-color: #fff;
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
  // height: 300px;
  padding: 30px 32px 0;
  .muslTitle {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .musltLeft {
      display: flex;
      align-items: center;
      font-size: 25px;
      i {
        color: #b4b2b3;
      }
      .icon {
        font-size: 25px;
        margin-right: 30px;
        color: #fe3346;
      }
    }
    .musltRight {
      // font-size: ;
      display: flex;
      align-items: center;
      .upload {
        font-size: 30px;
        margin-right: 30px;
      }
    }
  }
  .active {
    color: #fe3346 !important;
  }
  .palyStatus {
    width: 25px;
  }

  .musl {
    padding-top: 20px;
    ul {
      li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 28px 0;
        .itemLeft {
          width: 80%;
          display: flex;
          align-items: center;

          color: #b4b2b3;

          .musName {
            margin-left: 30px;
            p {
              width: 500px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              span {
                font-size: 26px;
                color: #000;
              }
            }
          }
          .album {
            display: inline-block;
            width: 500px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            display: flex;
            align-items: center;
            .vip {
              color: #fe3346;
              .icon {
                font-size: 30px;
              }
            }
          }
        }
        .itemRight {
          display: flex;
          align-items: center;

          .shipin {
            font-size: 28px;
            margin-right: 30px;
          }
          color: #b4b2b3;
        }
      }
    }
  }
}
</style>
