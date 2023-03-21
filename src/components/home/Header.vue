<template>
  <!-- 顶部导航 -->
  <div class="topNav">
    <svg class="icon menu" aria-hidden="true" @click="showPopup">
      <use xlink:href="#icon-caidan"></use>
    </svg>
    <!-- 插槽 -->
    <slot></slot>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useCount } from "@/store/count";
import { storeToRefs } from "pinia";

const countStore = useCount();
let { showLeft } = storeToRefs(useCount());

const showPopup = () => {
  showLeft.value = true;
};
</script>

<style lang="scss" scoped>
.topNav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 30px;
}
</style>
