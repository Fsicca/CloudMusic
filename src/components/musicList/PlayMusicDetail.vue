<template>
  <div class="plDetail">
    <img :src="playlist[playlistIdx].al.picUrl" alt="" class="bgImg" />
    <header>
      <svg class="icon" aria-hidden="true" @click="isMusicShow = false">
        <use xlink:href="#icon-xia"></use>
      </svg>
      <span>
        {{ playlist[playlistIdx].name }}
      </span>
      <svg class="icon" aria-hidden="true" @click="isMusicShow = false">
        <use xlink:href="#icon-fenxiang"></use>
      </svg>
    </header>
    <img :src="playlist[playlistIdx].al.picUrl" alt="" class="musImg" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useCount } from "@/store/count";
import { storeToRefs } from "pinia";

const countStore = useCount();

let { playlist, playlistIdx, isMusicShow } = storeToRefs(useCount());

console.log(playlist.value[playlistIdx.value]);
</script>

<style lang="scss" scoped>
.plDetail {
  // padding: 0 30px;
  width: 100vw;
  height: 96vh;
  overflow: hidden;
  header {
    display: flex;
    align-items: center;
    // height: 80px;
    color: #fff;
    span {
      flex: 1;
      text-align: center;
    }
    .icon {
      font-size: 30px;
    }
  }
}
.musImg {
  width: 500px;
  height: 500px;
  border-radius: 50%;
}
.bgImg {
  position: absolute;

  width: 95vw;
  height: 95vh;
  filter: blur(20px);
  transform: scale(1.1);

  z-index: -1;
}
</style>
