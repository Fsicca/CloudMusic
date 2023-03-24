<template>
  <!-- 加载画面 -->
  <div class="loading">
    <div class="dots">
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script setup>
import { useCount } from "@/store/count";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { watch, ref, onActivated } from "vue";

const storeCount = useCount();
const route = useRoute();
</script>

<style lang="scss" scoped>
.loading {
  width: 100%;
  height: 100%;
  background-color: #fff;
  z-index: 9999;
  .dots {
    width: 3.5em;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
  }

  .dots div {
    width: 0.8em;
    height: 0.8em;
    border-radius: 50%;
    background-color: #fc2f70;
    animation: fade 0.8s ease-in-out alternate infinite;
  }

  .dots div:nth-of-type(1) {
    animation-delay: -0.4s;
  }

  .dots div:nth-of-type(2) {
    animation-delay: -0.2s;
  }

  @keyframes fade {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
}
</style>
