<template>
  <div class="mlHead">
    <header>
      <van-nav-bar
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
      </van-nav-bar>
    </header>
  </div>
</template>

<script setup>
import { onActivated } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
</script>

<style lang="scss" scoped>
.mlHead {
  header {
    height: 1.22rem;
    span {
      padding-left: 35px;
      font-size: 30px;
    }
    .back {
      font-size: 33px;
    }
  }
}
.mdHeadRight {
  svg {
    padding-left: 45px;
  }
}
</style>
