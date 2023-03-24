<template>
  <!-- 发现音乐 -->
  <div class="found">
    <header>
      <Header><FoundHeader /> </Header>
    </header>

    <SwipeTop />
    <CateGories />
    <RecommendedList />
  </div>
</template>

<script setup>
import Header from "../components/home/Header.vue";
import FoundHeader from "../components/foundMusic/FoundHeader.vue";
import SwipeTop from "../components/foundMusic/SwipeTop.vue";
import CateGories from "../components/foundMusic/CateGories.vue";
import RecommendedList from "../components/foundMusic/RecommendedList.vue";

import { useCount } from "@/store/count";
import { storeToRefs } from "pinia";

const countStore = useCount();

let {} = storeToRefs(useCount());
</script>

<style lang="scss" scoped></style>
