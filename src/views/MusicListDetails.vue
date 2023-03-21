<template>
  <!-- 歌单详情 -->
  <div class="mlDetails">
    <MusicLisNav />
    <van-pull-refresh
      v-model="loading"
      @refresh="onRefresh"
      pull-distance="10px"
    >
      <MusicListDetail />
    </van-pull-refresh>
  </div>
</template>

<script setup>
import MusicLisNav from "../components/musicList/MusicListNav.vue";
import MusicListDetail from "../components/musicList/MusicListDetail.vue";
import { ref } from "vue";

// 下拉刷新
let loading = ref(false);
const onRefresh = () => {
  setTimeout(() => {
    loading.value = false;
    count.value++;
  }, 500);
};
</script>

<style lang="scss" scoped>
.mlDetails {
  padding: 0 32px;
}
</style>
