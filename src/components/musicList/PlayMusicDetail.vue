<template>
  <!-- 播放页面 -->
  <div class="plDetail">
    <img :src="palyMusicDetails.al.picUrl" alt="" class="bgImg" />
    <header>
      <svg class="icon" aria-hidden="true" @click="isMusicShow = false">
        <use xlink:href="#icon-xia"></use>
      </svg>
      <div class="musName">
        <span class="palyname">
          {{ palyMusicDetails.name }}
        </span>
        <Vue3Marquee>
          <i class="arName">
            <span v-for="(ar, idx) in palyMusicDetails.ar" :key="ar.id">
              {{
                idx == palyMusicDetails.ar.length - 1
                  ? ar.name
                  : ar.name + "&nbsp;/&nbsp;"
              }}
            </span>
            &nbsp;&nbsp;-&nbsp;&nbsp;{{ palyMusicDetails.al.name }}
          </i>
        </Vue3Marquee>
      </div>

      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fenxiang"></use>
      </svg>
    </header>
    <!-- 图片 -->
    <div class="mImg" v-show="isLyricShow" @click="isLyricShow = !isLyricShow">
      <!-- 磁盘指针 -->
      <div class="pointerImg">
        <img
          src="@/assets/zhizhen.png"
          alt=""
          class="poImg"
          :class="{ poImg_active: isPShow }"
        />
      </div>
      <!-- 歌曲图片 -->
      <div class="playImg">
        <img src="@/assets/cipan.png" alt="" class="musBgImg" />
        <img
          :src="palyMusicDetails.al.picUrl"
          alt=""
          :class="['musImg', isPShow ? 'playImg_play' : 'playImg_paused']"
        />
      </div>
    </div>
    <!-- 歌词 -->
    <div
      class="musLyric"
      v-show="!isLyricShow"
      @click="isLyricShow = !isLyricShow"
    >
      <ul>
        <li v-for="item in disposeLyric">
          {{ item.lyrics }}
        </li>
      </ul>
    </div>
    <!-- playImg_play: isPShow, playImg_paused: !isPShow  class="musImg"-->
    <div class="footerPlay">
      <div class="playMenu" v-show="isLyricShow">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-aixin"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiazai"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-user-two"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-pinglun3"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shezhi2-copy"></use>
        </svg>
      </div>
      <!-- 进度条 -->
      <div class="playBar">
        <span class="playTime">{{ currentMusicTime }}</span>
        <van-slider
          v-model="slider"
          @change="onChange"
          :button-size="10"
          inactive-color="#545454"
          active-color="rgb(254, 51, 70, 0.7)"
          class="slider"
        />
        <span class="musTime">{{ disposeTime }}</span>
      </div>
      <div class="playControl">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-24gl-repeat2"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="playlistIdx--">
          <use xlink:href="#icon-shangyishoushangyige"></use>
        </svg>
        <div class="playIcon">
          <svg
            class="icon play"
            aria-hidden="true"
            v-show="!isPShow"
            @click="controlMusic"
          >
            <use xlink:href="#icon-bofang11"></use>
          </svg>
          <svg
            class="icon paused"
            aria-hidden="true"
            v-show="isPShow"
            @click="controlMusic"
          >
            <use xlink:href="#icon-zanting3"></use>
          </svg>
        </div>

        <svg class="icon" aria-hidden="true" @click="playlistIdx++">
          <use xlink:href="#icon-xiayigexiayishou"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-24gl-playlist2"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, computed } from "vue";
import { useCount } from "@/store/count";
import { storeToRefs } from "pinia";

import { useRouter } from "vue-router";
const router = useRouter();

const countStore = useCount();
let { getLyric } = countStore;

let {
  playlist,
  playlistIdx,
  isMusicShow,
  isPShow,
  musLyric,
  slider,
  currentMusicTime,
  allMusicTime,
} = storeToRefs(useCount());

const props = defineProps(["palyMusicDetails", "controlMusic", "onChange"]); // 父传子接收
console.log(props.palyMusicDetails);

let isLyricShow = ref(true);

// 拆分歌词数据
let disposeLyric = computed(() => {
  let arr;
  if (musLyric.value.lyric) {
    arr = musLyric.value.lyric.split(/[(\r\n)\r\n]+/).map((item, idx) => {
      let min = item.slice(1, 3);
      let sec = item.slice(4, 6);
      let mill = item.slice(7, 10);
      let lyrics = item.slice(11, item.length);
      let time = min * 60 * 1000 + sec * 1000 + mill * 1;

      if (isNaN(Number(mill))) {
        mill = item.slice(7, 9);
        lyrics = item.slice(10, item.length);
        time = min * 60 * 1000 + sec * 1000 + mill * 1;
      }
      // console.log(min, sec, Number(mill), lyrics);
      return { min, sec, mill, lyrics, time };
    });
  }
  console.log(arr);

  return arr;
});

let disposeTime = computed(() => {
  let min = String(allMusicTime.value / 60).substring(0, 1);
  let sec = String(allMusicTime.value % 60).substring(0, 2);

  if (min.length == 1) {
    min = "0" + min;
  } else {
    min = min;
  }

  // console.log(min, sec);
  let time;
  if (allMusicTime.value) {
    time = min + " : " + sec;
  } else {
    time = "00 : 00";
  }
  return time;
});
</script>

<style lang="scss" scoped>
.plDetail {
  // padding: 0 30px;
  // width: 100vw;
  height: 100vh;
  // overflow: hidden;
  display: flex;
  flex-direction: column;
  header {
    display: flex;
    align-items: center;
    // height: 80px;
    color: #fff;
    padding: 20px 30px;
    justify-content: space-between;
    .icon {
      font-size: 30px;
    }
    .musName {
      text-align: center;
      font-size: 30px;
      display: flex;
      flex-direction: column;
      width: 50%;
      .palyname {
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .arName {
        padding: 5px 0;
        color: #e7e7e7;
        font-size: 24px;
      }
    }
  }

  .footerPlay {
    // position: absolute;
    // bottom: 0;
    // width: 100%;
    // box-shadow: 0 0 200px rgba(67, 67, 67, 0.2);
    .playMenu {
      display: flex;
      align-items: center;
      justify-content: space-around;
      padding: 60px 60px;
      .icon {
        color: #fff;
        font-size: 30px;
      }
    }
    .playControl {
      display: flex;
      align-items: center;
      justify-content: space-around;
      padding: 30px 70px;
      .icon {
        color: #fff;
        font-size: 30px;
      }
      .playIcon {
        width: 15%;
        padding: 10px;
        .play {
          font-size: 60px;
        }
        .paused {
          font-size: 60px;
        }
      }
    }
    .playBar {
      padding: 0 10px;
      display: flex;
      align-items: center;
      justify-content: space-around;

      .slider {
        width: 75%;
      }

      .playTime {
        color: #fff;
      }
      .musTime {
        color: #d7d7d7;
      }
    }
  }

  .musLyric {
    flex: 1;

    color: #aeaeae;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 30px 0 60px;
    overflow: auto;
    ul {
      li {
        padding: 20px 0;
        text-align: center;
        font-size: 26px;
      }
    }
  }
  .musLyric::-webkit-scrollbar {
    display: none;
  }
}
.mImg {
  flex: 1;
}
.pointerImg {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.poImg {
  width: 220px;
  // height: 250px;
  // position: absolute;
  top: 0;
  left: 45%;
  transform-origin: 0 0;
  transform: rotate(-20deg);
  transition: all 1.5s;
  z-index: 9;
}

.poImg_active {
  width: 220px;
  // height: 250px;
  position: absolute;
  top: 0;
  left: 45%;
  transform-origin: 0 0;
  transform: rotate(3deg);
  transition: all 1.5s;
  z-index: 9;
}
.musImg {
  width: 380px;
  height: 380px;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 300px;
  right: 0;
  margin: auto;
  animation: rotate_paly 20s linear infinite;
}

.playImg_play {
  animation-play-state: running;
}
.playImg_paused {
  animation-play-state: paused;
}
@keyframes rotate_paly {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
}
.musBgImg {
  width: 600px;
  height: 600px;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 300px;
  right: 0;
  margin: auto;
}
.bgImg {
  position: absolute;

  width: 95%;
  height: 95%;
  // filter: blur(10px);
  filter: brightness(0.1);
  transform: scale(1.1);

  z-index: -1;
}
</style>
