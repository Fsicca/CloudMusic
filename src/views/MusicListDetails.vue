<template>
  <!-- 歌单详情 -->
  <div>
    <img
      :src="musListDetail.coverImgUrl"
      alt=""
      class="bgImg"
      v-if="musLists"
    />

    <div class="mlDetails">
      <MusicListNav />

      <van-pull-refresh
        v-model="loading"
        @refresh="onRefresh"
        pull-distance="30px"
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

import MusicListDetail from "../components/musicList/MusicListDetail.vue";
import { ref } from "vue";
import { useCount } from "@/store/count.js";
import { storeToRefs } from "pinia";

const countStore = useCount();

let { getMusicListDetails, getMusicLists } = countStore;
let { musListDetail, musLists } = storeToRefs(useCount());

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
</style>
