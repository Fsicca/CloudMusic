<template>
  <!-- 发现音乐 推荐歌单 -->
  <div class="recomList">
    <div class="reHead">
      <span>推荐歌单 <van-icon name="arrow" size="15" /></span>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-shezhi2-copy"></use>
      </svg>
    </div>

    <div class="reList">
      <ul class="reul">
        <li
          v-for="item in recomList"
          :key="item.id"
          @click="
            this.$router.push({
              path: '/musicListDetail',
              query: { id: item.id },
            })
          "
        >
          <div>
            <img :src="item.picUrl" alt="" />
            <div class="playCount">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-bofang"></use>
              </svg>
              <span>{{ setCount(item.playCount) }}</span>
            </div>

            <span class="reTitle">{{ item.name }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useCount } from "@/store/count";
import { storeToRefs } from "pinia";

const countStore = useCount();
let { getRecomList } = countStore;
let { recomList } = storeToRefs(useCount());

getRecomList();

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
.recomList {
  padding-bottom: 30px;
  border-bottom: 1px solid #eee;
  .reHead {
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      font-size: 35px;
    }
    .icon {
      fill: #666;
      font-size: 22px;
    }
  }

  .reList {
    .reul {
      display: flex;
      overflow: auto;

      li {
        width: 500px;
        padding: 10px;
        position: relative;
        img {
          width: 250px;
          height: auto;
          border-radius: 25px;
          box-shadow: 0 -5px 5px #ecf0ec;
        }
        .playCount {
          position: absolute;
          top: 20px;
          right: 30px;
          display: flex;
          align-items: center;
          color: #fff;
          font-size: 10px;

          span {
            padding-left: 5px;
            font-weight: 600;
          }
        }
        .reTitle {
          font-size: 25px;
          line-height: 40px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
    }
  }
  .reList ::-webkit-scrollbar {
    display: none;
  }
}
</style>
