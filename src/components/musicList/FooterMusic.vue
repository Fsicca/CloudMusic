<template>
  <!-- 底部音乐播放器 -->

  <div class="footerMusic">
    <div class="fMusic">
      <div class="fmLeft" @click="getMusicPaly">
        <div class="fmImg">
          <van-image
            round
            width=".7rem"
            height=".7rem"
            :src="playlist[playlistIdx].al.picUrl"
          />
        </div>
        <span class="musName">
          <Vue3Marquee>
            {{ playlist[playlistIdx].name }}

            &nbsp;&nbsp;-&nbsp;&nbsp;
            <i class="arName">
              <span v-for="(ar, idx) in playlist[playlistIdx].ar" :key="ar.id">
                {{
                  idx == playlist[playlistIdx].ar.length - 1
                    ? ar.name
                    : ar.name + " / "
                }}
              </span>
            </i>
          </Vue3Marquee>
        </span>
      </div>
      <div class="fmRight">
        <svg
          class="icon play"
          aria-hidden="true"
          @click="controlMusic"
          v-show="!isPShow"
        >
          <use xlink:href="#icon-bofang4"></use>
        </svg>
        <svg
          class="icon pase"
          aria-hidden="true"
          @click="controlMusic"
          v-show="isPShow"
        >
          <use xlink:href="#icon-zanting2"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-24gl-playlist2"></use>
        </svg>
        <audio
          ref="audio"
          :src="`https://music.163.com/song/media/outer/url?id=${playlist[playlistIdx].id}.mp3 `"
          @timeupdate="timeupdate"
        ></audio>
      </div>
    </div>
    <van-popup
      v-model:show="isMusicShow"
      :close-on-popstate="true"
      position="bottom"
      :safe-area-inset-top="true"
      :safe-area-inset-bottom="true"
      :style="{ height: '100%' }"
      :z-index="999"
      @open="currentMusicTime = '00 : 00'"
    >
      <PlayMusicDetail
        :palyMusicDetails="playlist[playlistIdx]"
        :controlMusic="controlMusic"
        :onChange="onChange"
      />
    </van-popup>
  </div>
</template>

<script setup>
import PlayMusicDetail from "./PlayMusicDetail.vue";
import { ref, onMounted, watch, onUpdated, computed } from "vue";

import { useCount } from "@/store/count";
import { storeToRefs } from "pinia";

import { useRouter } from "vue-router";
const router = useRouter();

const countStore = useCount();
let { getLyric } = countStore;

let {
  palyDetails,
  isPShow,
  playlist,
  playlistIdx,
  isMusicShow,
  musLyric,
  currentMusicTime,
  allMusicTime,
  slider,
  isLyricShow,
} = storeToRefs(useCount());

getLyric(playlist.value[playlistIdx.value].id);

onMounted(() => {
  if (audio.value.paused) {
    isPShow.value = false;
  }
});

onUpdated(() => {
  getLyric(playlist.value[playlistIdx.value].id);
});

let audio = ref(null); // 获取audio元素节点

// 播放音乐
const playMusic = () => {
  audio.value.play();
  isPShow.value = true;
};
// 暂停音乐
const paseMusic = () => {
  audio.value.pause();
  isPShow.value = false;
};

// 按键播放 判断播放状态
const controlMusic = (e) => {
  if (audio.value.paused) {
    audio.value.play();
    isPShow.value = true;
  } else {
    audio.value.pause();
    isPShow.value = false;
  }
};

// 全局播放
document.onkeydown = (e) => {
  // console.log(e.keyCode);
  if (e.ctrlKey && e.keyCode == 81) {
    controlMusic();
  }
  if (e.ctrlKey && e.keyCode == 39) {
    playlistIdx.value++;
  }
  if (e.ctrlKey && e.keyCode == 37) {
    playlistIdx.value--;
  }
};
// 监听播放列表的下标 发生改变自动播放音乐
watch(playlistIdx, () => {
  // console.log(playlistIdx.value);
  audio.value.autoplay = true;
  if (audio.value.paused) {
    isPShow.value = true;
  }
});

// 进度条时间改变
const timeupdate = () => {
  slider.value = (audio.value.currentTime / audio.value.duration) * 100;
  // console.log(audio.value.currentTime, audio.value.duration);
  allMusicTime.value = audio.value.duration;

  let min = String(audio.value.currentTime / 60).substring(0, 1);
  let arr = String(audio.value.currentTime % 60).split(".");
  let sec = arr[0];
  // console.log(sec);
  if (min.length == 1) {
    min = "0" + min;
  } else {
    min = min;
  }
  if (sec.length == 1) {
    sec = "0" + String(audio.value.currentTime % 60).substring(0, 1);
  } else {
    sec = sec;
  }
  let time;
  if (allMusicTime.value) {
    time = min + " : " + sec;
  } else {
    time = "00 : 00";
  }
  currentMusicTime.value = time;
};
// 进度条拖动
const onChange = () => {
  audio.value.currentTime = (slider.value / 100) * audio.value.duration;
  if (audio.value.currentTime == audio.value.duration) {
    audio.value.pause();
    isPShow.value = false;
  } else {
    audio.value.play();
    isPShow.value = true;
  }
};

// 点击弹出播放页面
const getMusicPaly = () => {
  isMusicShow.value = true;
  isLyricShow = true;
};
</script>

<style lang="scss" scoped>
.footerMusic {
  height: 100px;
  .fMusic {
    width: 100%;
    height: 100px;
    background-color: #ffffff;
    position: fixed;
    bottom: 0;
    box-shadow: 0 0 2px #949599;
    z-index: 99;

    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 33px;
    box-sizing: border-box;
  }
  .fmLeft {
    display: flex;
    align-items: center;
    justify-content: center;
    .fmImg {
      width: 1rem;
      height: 1rem;
      background-color: #000;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 20px;
    }
    span {
      width: 420px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .musName {
      font-size: 26px;
    }
    .arName {
      font-size: 24px;
      color: #b4b2b3;
    }
  }
  .fmRight {
    font-size: 28px;
    .play {
      margin-right: 50px;
    }
    .pase {
      margin-right: 50px;
    }
  }
}
</style>
