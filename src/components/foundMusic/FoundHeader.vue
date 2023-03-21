<template>
  <!-- 发现音乐顶部 -->

  <van-search
    v-model="search"
    placeholder="请输入搜索关键词"
    shape="round"
    @focus="this.$router.push('/search')"
  />

  <svg class="icon" aria-hidden="true">
    <use xlink:href="#icon-vipb"></use>
  </svg>
  <svg class="icon" aria-hidden="true">
    <use xlink:href="#icon-tinggeshiqu40x40"></use>
  </svg>
</template>

<script setup>
import { useCount } from "@/store/count";
import { storeToRefs } from "pinia";

const countStore = useCount();

// 搜索词
let { search } = storeToRefs(useCount());
</script>

<style lang="scss" scoped>
.icon {
  font-size: 35px;
  padding: 0 10px;
}
.foundHeader {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
