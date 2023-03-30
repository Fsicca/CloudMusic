<template>
  <!-- 歌单详情 -->
  <div class="mList" v-if="musLists">
    <div class="mListDetail">
      <!-- 歌单图片 -->
      <div class="mlCoverImg">
        <img :src="musListDetail.coverImgUrl" alt="" />
        <div class="playCount">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-bofang"></use>
          </svg>
          <span>{{ setCount(musListDetail.playCount) }}</span>
        </div>
      </div>

      <!-- 歌单信息 -->
      <div class="details">
        <p class="title">{{ musListDetail.name }}</p>
        <div class="creator">
          <img :src="musListDetail.creator?.avatarUrl" alt="" />
          <span>{{ musListDetail.creator?.nickname }} </span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-youjiantou"></use>
          </svg>
        </div>
        <div class="tags">
          <span v-for="item in musListDetail.algTags">
            {{ item }} <van-icon name="arrow" />
          </span>
        </div>
      </div>
    </div>

    <!-- 歌单详情页 -->
    <div class="mldeta" v-if="musListDetail.description">
      <span>{{ musListDetail.description }} </span>
      <van-icon name="arrow" />
    </div>

    <!-- 分享 评论 收藏 -->
    <div class="operate">
      <span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fenxiangzhuanfa"></use>
        </svg>
        <strong>{{ setCount(musListDetail.shareCount) }}</strong>
      </span>
      <span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-pinglun"></use>
        </svg>
        <strong>{{ setCount(musListDetail.commentCount) }}</strong>
      </span>
      <span class="collection">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-jia"></use>
        </svg>
        <strong>{{ setCount(musListDetail.subscribedCount) }}</strong>
      </span>
    </div>
    <!-- 加载 -->
    <!-- <div class="load" v-show="show">
      <van-toast v-model:show="show" style="padding: 10">
        <template #message>
          <van-loading color="#000" />
        </template>
      </van-toast>
    </div> -->
  </div>
</template>

<script setup>
import { ref, onActivated, onDeactivated } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCount } from "@/store/count.js";
import { storeToRefs } from "pinia";
import { showLoadingToast } from "vant";

const countStore = useCount();
const route = useRoute();
const router = useRouter();

// let show = ref(false);
onActivated(() => {
  // console.log(route.query.id);
  // show.value = true;
  setTimeout(() => {
    // show.value = false;
    getMusicListDetails();
  }, 200);
  // console.log(muList.value);
  // getMusicListDetails();
});
onDeactivated(() => {
  musListDetail.value = "";
});

let { musListDetail, musLists } = storeToRefs(useCount());
let { getMusicListDetails } = countStore;

// 播放量
const setCount = (num) => {
  if (num >= 100000000) {
    return (num / 100000000).toFixed(1) + " 亿";
  } else if (num >= 10000) {
    return (num / 10000).toFixed(1) + " 万";
  } else {
    return num;
  }
};
</script>

<style lang="scss" scoped>
.mList {
  // position: relative;
  padding: 30px 32px;

  .mListDetail {
    padding-top: 35px;
    display: flex;
    color: #fff;
    // flex-wrap: wrap;
    .mlCoverImg {
      position: relative;
      padding-right: 25px;
      img {
        width: 200px;
        height: auto;
        border-radius: 25px;
        box-shadow: 1px -2px 5px rgb(107, 123, 128, 0.5);
      }
      .playCount {
        position: absolute;
        top: 10px;
        right: 35px;
        display: flex;
        align-items: center;
        color: #fff;
        font-size: 12px;

        span {
          padding-left: 5px;
          font-weight: 600;
          font-size: 24px;
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
    color: #fff;

    span {
      line-height: 40px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
  }
  .operate {
    display: flex;
    justify-content: space-around;

    // margin-bottom: 40px;
    span {
      display: inline-block;
      padding: 20px 50px;
      background-color: rgb(107, 123, 128, 0.5);
      margin: 10px;
      border-radius: 40px;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      strong {
        width: 100%;
      }

      .icon {
        font-size: 25px;
        margin-right: 10px;
        padding-bottom: 5px;
      }
    }
    .collection {
      background-color: #fe3346;
    }
  }
}
</style>
