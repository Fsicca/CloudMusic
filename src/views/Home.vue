<template>
  <div class="home">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component"></component>
      </keep-alive>
    </router-view>
    <!-- <router-view></router-view> -->
    <Popup />
    <FooterNav />
  </div>
</template>

<script setup>
import FooterNav from "../components/home/FooterNav.vue";
import Popup from "../components/home/Popup.vue";
</script>

<style lang="scss" scoped>
.home {
  padding: 0 15px;
  // background-image: url("../assets/bg.jpg");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
  height: 100vh;
}
</style>
