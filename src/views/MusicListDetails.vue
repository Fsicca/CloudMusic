<template>
  <!-- 进入前加载画面 -->
  <Loaidng v-show="isLoading" />

  <!-- 歌单详情 -->
  <div>
    <img
      :src="musListDetail.coverImgUrl"
      alt=""
      class="bgImg"
      v-if="musLists"
      v-show="isFoundMusic"
    />

    <div class="mlDetails">
      <MusicListNav />

      <van-pull-refresh
        v-model="loading"
        @refresh="onRefresh"
        pull-distance="30px"
        v-show="isFoundMusic"
      >
        <MusicListDetail />

        <MusicLists />
      </van-pull-refresh>
    </div>
  </div>
</template>

<script setup>
import MusicListNav from "../components/musicList/MusicListNav.vue";
import MusicLists from "../components/musicList/MusicLists.vue";
import Loaidng from "../components/Loaidng.vue";

import MusicListDetail from "../components/musicList/MusicListDetail.vue";
import { ref, watch, onActivated } from "vue";
import { useCount } from "@/store/count.js";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";

const countStore = useCount();
const route = useRoute();

let { getMusicListDetails, getMusicLists } = countStore;
let { musListDetail, musLists } = storeToRefs(useCount());

let isLoading = ref(false);
let isFoundMusic = ref(false);

// 加载画面
onActivated(() => {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;

    isFoundMusic.value = true;
  }, 1500);
});

// 下拉刷新
let loading = ref(false);
const onRefresh = () => {
  setTimeout(() => {
    getMusicListDetails();
    getMusicLists();
    loading.value = false;
  }, 200);
};
</script>

<style lang="scss" scoped>
.bgImg {
  width: 100%;
  // height: 700px;
  z-index: -1;
  position: fixed;
  filter: blur(30px);
}
.loading {
  z-index: 999;
  .dots {
    width: 3.5em;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
  }

  .dots div {
    width: 0.8em;
    height: 0.8em;
    border-radius: 50%;
    background-color: #fc2f70;
    animation: fade 0.8s ease-in-out alternate infinite;
  }

  .dots div:nth-of-type(1) {
    animation-delay: -0.4s;
  }

  .dots div:nth-of-type(2) {
    animation-delay: -0.2s;
  }

  @keyframes fade {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
}
</style>
