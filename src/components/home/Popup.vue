<template>
  <!-- 弹出层 -->
  <div class="popup">
    <!-- 左侧弹出层 -->
    <van-popup
      v-model:show="showLeft"
      position="left"
      :style="{ width: '80%', height: '100%' }"
    />
  </div>
</template>

<script setup>
import { useCount } from "@/store/count";
import { storeToRefs } from "pinia";

const countStore = useCount();
let { showLeft } = storeToRefs(useCount());
</script>

<style lang="scss" scoped></style>
