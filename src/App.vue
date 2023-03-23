<template>
  <div>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component"></component>
      </keep-alive>
    </router-view>
    <FooterMusic />
  </div>
</template>

<script setup>
import FooterMusic from "@/components/musicList/FooterMusic.vue";
</script>

<style lang="scss" scoped></style>
