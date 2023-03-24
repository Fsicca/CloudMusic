<template>
  <div>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component"></component>
      </keep-alive>
    </router-view>
    <FooterMusic />
    <!-- <Loaidng /> -->
  </div>
</template>

<script setup>
import FooterMusic from "@/components/musicList/FooterMusic.vue";
// import Loaidng from "./components/Loaidng.vue";
import { useRoute, useRouter } from "vue-router";

import { useCount } from "@/store/count";
import { storeToRefs } from "pinia";

const countStore = useCount();
const router = useRouter();

let { isMusicShow } = storeToRefs(useCount());

// 全局退出和隐藏
document.onkeyup = (e) => {
  // console.log(e.keyCode);
  if (e.keyCode == 27) {
    if (isMusicShow.value) {
      isMusicShow.value = false;
    } else {
      router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped></style>
