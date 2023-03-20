<template>
  <!-- 头部导航 -->
  <div class="topNav">
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-caidan"></use>
    </svg>

    <div class="nav">
      <span @click="this.$router.push('/mine')">我的</span>
      <span @click="this.$router.push('/foundMusic')">发现</span>
      <span @click="this.$router.push('/cloudVillage')">云村</span>
      <span @click="this.$router.push('/videos')">视频</span>
    </div>

    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-sousuo"></use>
    </svg>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.topNav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 36px;
  .nav span {
    display: inline-block;
    padding: 15px 15px;
  }
}
</style>
