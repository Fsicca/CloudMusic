<template>
  <!-- 底部音乐播放器 -->

  <div class="footerMusic">
    <div
      :class="[route.path == '/musicListDetail' ? 'fMusic' : 'fMusic_acitve']"
    >
      <div class="fmLeft" @click="getMusicPaly">
        <div class="fmImg">
          <van-image
            round
            width=".7rem"
            height=".7rem"
            :src="playlist[playlistIdx]?.al.picUrl"
          />
        </div>
        <span class="musName">
          <Vue3Marquee>
            {{ playlist[playlistIdx]?.name }}

            &nbsp;&nbsp;-&nbsp;&nbsp;
            <i class="arName">
              <span v-for="(ar, idx) in playlist[playlistIdx]?.ar" :key="ar.id">
                {{
                  idx == playlist[playlistIdx]?.ar.length - 1
                    ? ar.name
                    : ar.name + " / "
                }}
              </span>
            </i>
            <!-- 防止首尾相连 -->
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </Vue3Marquee>
        </span>
      </div>
      <div class="fmRight">
        <!-- 环形进度条播放暂停 -->
        <van-circle
          v-model:current-rate="slider"
          :rate="30"
          color="#000"
          size="24"
          layer-color="#b4b2b3"
          :speed="100"
          class="round"
        >
          <template #default>
            <div>
              <svg
                class="icon play"
                aria-hidden="true"
                @click="controlMusic"
                v-show="!isPShow"
              >
                <use xlink:href="#icon-bofang10"></use>
              </svg>
              <svg
                class="icon pase"
                aria-hidden="true"
                @click="controlMusic"
                v-show="isPShow"
              >
                <use xlink:href="#icon-zanting4"></use>
              </svg>
            </div>
          </template>
        </van-circle>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-24gl-playlist2"></use>
        </svg>
        <audio
          ref="audio"
          :src="`https://music.163.com/song/media/outer/url?id=1868206871.mp3 `"
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
import { ref, reactive, onMounted, watch, onUpdated, computed } from "vue";

import { useCount } from "@/store/count";
import { storeToRefs } from "pinia";

import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();

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

getLyric(playlist.value[playlistIdx.value]?.id);

onMounted(() => {
  if (audio.value.paused) {
    isPShow.value = false;
  }
});

onUpdated(() => {
  // console.log(route.path);
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
    localStorage.setItem("playlistIdx", playlistIdx.value);
  }
  if (e.ctrlKey && e.keyCode == 37) {
    playlistIdx.value--;
    localStorage.setItem("playlistIdx", playlistIdx.value);
  }
};
// 监听播放列表的下标 发生改变自动播放音乐
watch(playlistIdx, () => {
  // console.log(playlistIdx.value);
  audio.value.autoplay = true;
  if (audio.value.paused) {
    isPShow.value = true;
  }

  getLyric(playlist.value[playlistIdx.value]?.id); // 获取歌词

  // console.log(audio.value.error);
  // if (audio.value.error) {
  //   playlistIdx.value++;
  //   localStorage.setItem("playlistIdx", playlistIdx.value);
  // }
});

// 进度条时间改变
const timeupdate = () => {
  slider.value = (audio.value.currentTime / audio.value.duration) * 100;
  // console.log(audio.value.currentTime, audio.value.duration);
  allMusicTime.value = audio.value.duration;

  currentMusicTime.value = audio.value.currentTime;

  // 播放完毕下一首
  if (audio.value.currentTime == audio.value.duration) {
    playlistIdx.value++;
    localStorage.setItem("playlistIdx", playlistIdx.value);
  }
};
// 进度条拖动
const onChange = () => {
  audio.value.currentTime = (slider.value / 100) * audio.value.duration;
  if (audio.value.currentTime == audio.value.duration) {
    playlistIdx.value++;
    localStorage.setItem("playlistIdx", playlistIdx.value);
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
  .fMusic_acitve {
    width: 100%;
    height: 100px;
    background-color: #ffffff;
    position: fixed;
    bottom: 122px;
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
    display: flex;
    align-items: center;
    justify-content: space-around;
    .round {
      box-sizing: border-box;
      margin-right: 30px;
    }
    .play {
      width: 20px;
      padding-left: 33%;
    }
    .pase {
      width: 20px;
      padding-left: 28%;
    }
  }
}
</style>
