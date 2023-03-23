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
          {{ playlist[playlistIdx].name }} -
          <i class="arName">
            <span v-for="(ar, idx) in playlist[playlistIdx].ar" :key="ar.id">
              {{
                idx == playlist[playlistIdx].ar.length - 1
                  ? ar.name
                  : ar.name + " / "
              }}
            </span>
          </i>
        </span>
      </div>
      <div class="fmRight">
        <svg
          class="icon play"
          aria-hidden="true"
          @click="playMusic"
          v-show="!isPShow"
        >
          <use xlink:href="#icon-bofang4"></use>
        </svg>
        <svg
          class="icon pase"
          aria-hidden="true"
          @click="paseMusic"
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
    >
      <PlayMusicDetail />
    </van-popup>
  </div>
</template>

<script setup>
import PlayMusicDetail from "./PlayMusicDetail.vue";
import { ref, onMounted, watch } from "vue";
import { useCount } from "@/store/count";
import { storeToRefs } from "pinia";

const countStore = useCount();

let { palyDetails, isPShow, playlist, playlistIdx, isMusicShow } = storeToRefs(
  useCount()
);
let audio = ref(null);
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

// 监听播放列表的下标 发生改变自动播放音乐
watch(playlistIdx, () => {
  // console.log(playlistIdx.value);
  audio.value.autoplay = true;
  if (audio.value.paused) {
    isPShow.value = true;
  }
});

// 点击弹出播放页面
const getMusicPaly = () => {
  isMusicShow.value = true;
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
    .arName {
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
