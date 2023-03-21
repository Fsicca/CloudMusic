<template>
  <!-- 歌单详情 -->
  <div class="mList">
    <div class="mListDetail">
      <!-- 歌单图片 -->
      <div class="mlCoverImg">
        <img :src="musList.coverImgUrl" alt="" />
        <div class="playCount">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-bofang"></use>
          </svg>
          <span>{{ setPlayCount(musList.playCount) }}</span>
        </div>
      </div>

      <!-- 歌单信息 -->
      <div class="details">
        <p class="title">{{ musList.name }}</p>
        <div class="creator" v-if="musList.creator?.avatarUrl">
          <img :src="musList.creator?.avatarUrl" alt="" />
          <span>{{ musList.creator?.nickname }} </span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-youjiantou"></use>
          </svg>
        </div>
        <div class="tags">
          <span v-for="item in musList.algTags">
            {{ item }} <van-icon name="arrow" />
          </span>
        </div>
      </div>
    </div>
    <!-- 歌单详情页 -->
    <div class="mldeta" v-if="musList.description">
      <span>{{ musList.description }} </span>
      <van-icon name="arrow" />
    </div>
  </div>
</template>

<script setup>
import { ref, onActivated, onDeactivated } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCount } from "@/store/count.js";
import { storeToRefs } from "pinia";
import { showToast } from "vant";

const countStore = useCount();
const route = useRoute();
const router = useRouter();

onActivated(() => {
  console.log(route.query.id);

  setTimeout(() => {
    getMusciLits();
  }, 200);
  // console.log(muList.value);
});
onDeactivated(() => {
  musList.value = "";
});

let { musList } = storeToRefs(useCount());
let { getMusciLits } = countStore;

// 播放量
const setPlayCount = (num) => {
  if (num >= 100000000) {
    return (num / 100000000).toFixed(1) + " 亿";
  } else if (num >= 10000) {
    return (num / 10000).toFixed(0) + " 万";
  }
};
</script>

<style lang="scss" scoped>
.mList {
  .mListDetail {
    padding-top: 35px;
    display: flex;
    // flex-wrap: wrap;
    .mlCoverImg {
      position: relative;
      padding-right: 25px;
      img {
        width: 200px;
        height: auto;
        border-radius: 25px;
        box-shadow: 0 -5px 5px #ecf0ec;
      }
      .playCount {
        position: absolute;
        top: 10px;
        right: 35px;
        display: flex;
        align-items: center;
        color: #fff;
        font-size: 10px;

        span {
          padding-left: 5px;
          font-weight: 600;
        }
      }
    }
  }
  .title {
    font-size: 28px;
  }
  .creator {
    display: flex;
    align-items: center;
    padding: 20px 0;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    span {
      padding: 0 10px 2px;
    }
    .icon {
      font-size: 18px;
    }
  }

  .tags {
    display: flex;
    span {
      display: inline-block;
      background-color: rgb(107, 123, 128, 0.5);
      margin: 0 10px;
      padding: 5px 10px;
      color: #fff;
      font-size: 8px;
      // backdrop-filter: brightness(80%);
      border-radius: 5px;
    }
  }
  .mldeta {
    display: flex;
    align-items: center;
    font-size: 22px;
    padding: 15px 0;
    span {
      line-height: 40px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
  }
}
</style>
