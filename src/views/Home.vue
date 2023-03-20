<template>
  <div class="home">
    <Header />
    <router-view></router-view>
  </div>
</template>

<script setup>
import Header from "../components/home/TopNav.vue";
</script>

<style lang="scss" scoped>
.home {
  padding: 0 15px;
}
</style>
