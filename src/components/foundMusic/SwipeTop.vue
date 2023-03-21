<template>
  <!-- 发现 顶部轮播 -->
  <div class="swipeTop">
    <van-swipe :autoplay="3000" lazy-render indicator-color="#d53a21">
      <van-swipe-item v-for="image in bannersImg" :key="image">
        <img :src="image.pic" class="" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useCount } from "@/store/count";
import { storeToRefs } from "pinia";

const countStore = useCount();
let { getBanners } = countStore;
let { bannersImg } = storeToRefs(useCount());

// 初始获取轮播图
getBanners();
</script>

<style lang="scss" scoped>
.swipeTop {
  padding: 10px 0;
  img {
    width: 100%;
    height: auto;
  }
  .van-swipe {
    border-radius: 25px;

    .van-swipe__indicator--active {
      background-color: rgb(219, 130, 130);
    }
  }
}
</style>
