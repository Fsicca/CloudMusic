<template>
  <!-- 我的 -->
  <div class="mine">
    <header>
      <Header>
        <span>我的</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-sousuo"></use>
        </svg>
      </Header>
    </header>

    我的
  </div>
</template>

<script setup>
import Header from "../components/home/Header.vue";
</script>

<style lang="scss" scoped>
.mine {
  header {
    padding: 32px 0;
  }
}
</style>
