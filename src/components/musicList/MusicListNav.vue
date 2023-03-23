<template>
  <div class="mlHHH"></div>
  <div class="mlHead">
    <div class="mlHeadLeft" @click="router.go(-1)">
      <svg class="icon back" aria-hidden="true">
        <use xlink:href="#icon-zuojiantou1"></use>
      </svg>
      <span>歌单</span>
    </div>
    <div class="mlHeadRight">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-sousuo"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-shezhi2-copy"></use>
      </svg>
    </div>
    <!-- vant 导航组件 -->
    <!-- <van-nav-bar
        left-arrow
        @click-left="router.go(-1)"
        :fixed="true"
        :border="false"
        z-index="99"
      >
        <template #left>
          <svg class="icon back" aria-hidden="true">
            <use xlink:href="#icon-zuojiantou1"></use>
          </svg>
          <span>歌单</span>
        </template>
        <template #right>
          <div class="mdHeadRight">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-sousuo"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shezhi2-copy"></use>
            </svg>
          </div>
        </template>
      </van-nav-bar> -->
  </div>
</template>

<script setup>
import { onActivated } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
</script>

<style lang="scss" scoped>
.mlHHH {
  height: 1.22rem;
}
.mlHead {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 1.22rem;
  color: #000000;
  padding: 0 32px;
  position: fixed;
  top: 0;
  background-color: rgb(255, 255, 255, 0.1);
  width: 100%;
  box-sizing: border-box;
  z-index: 99;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  span {
    padding-left: 35px;
    font-size: 30px;
  }
  .back {
    font-size: 33px;
  }
}
.mlHeadLeft {
  display: flex;
  align-items: center;
}
.mlHeadRight {
  svg {
    padding-left: 45px;
  }
}
</style>
