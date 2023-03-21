<template>
  <!-- 搜索音乐 -->
  <div class="search">
    <header>
      <svg class="icon" aria-hidden="true" @click="this.$router.go(-1)">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <van-search
        v-model="search"
        placeholder="请输入搜索关键词"
        shape="round"
        @click=""
      />
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-sousuo"></use>
      </svg>
    </header>
  </div>
</template>

<script setup>
import { useCount } from "@/store/count";
import { storeToRefs } from "pinia";

const countStore = useCount();

let { search } = storeToRefs(useCount());
</script>

<style lang="scss" scoped>
.search {
  padding: 0 15px;
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon {
      font-size: 30px;
    }
  }
}
</style>
