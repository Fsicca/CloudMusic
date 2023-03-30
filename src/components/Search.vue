<template>
  <!-- 搜索音乐 -->
  <div class="search">
    <!-- 顶部 -->
    <header>
      <van-nav-bar>
        <template #left>
          <svg
            class="icon"
            aria-hidden="true"
            @click="router.go(-1), (search = '')"
          >
            <use xlink:href="#icon-zuojiantou"></use>
          </svg>
        </template>
        <template #title>
          <van-search
            v-model.trim="search"
            placeholder="搜索"
            :placeholder="true"
            :fixed="true"
            shape="round"
            @search="enterSch"
          />
        </template>
        <template #right>
          <svg class="icon" aria-hidden="true" @click="enterSch">
            <use xlink:href="#icon-sousuo"></use>
          </svg>
        </template>
      </van-nav-bar>
    </header>
    <!-- 历史搜索 -->
    <div class="schHistory">
      <div class="schbox">
        <h3 class="schWordTitle">历史</h3>
        <!-- <div class="schWordLsit"></div> -->
        <ul>
          <li class="schWordLsit" v-for="word in schWord" @click="getHisWord">
            {{ word }}
          </li>
        </ul>
      </div>

      <svg
        class="icon"
        aria-hidden="true"
        v-show="schWord != ''"
        @click="delSchWord"
      >
        <use xlink:href="#icon-shanchu"></use>
      </svg>
    </div>

    <!-- 搜索列表 -->
    <div class="schList">
      <!-- <van-list
        v-model:loading="loading"
        @load="getMore"
        :immediate-check="false"
      > -->
      <ul ref="listBox">
        <li v-for="(item, idx) in schList" :key="item.id">
          <div
            class="itemLeft"
            @click="setMusic(idx)"
            :class="{ active: item.id == playlist[playlistIdx]?.id }"
          >
            <span v-if="item.id != playlist[playlistIdx]?.id">
              {{ idx + 1 }}
            </span>
            <img
              src="@/assets/play.gif"
              alt=""
              class="palyStatus"
              v-if="item.id == playlist[playlistIdx]?.id"
            />
            <!-- 歌曲名字 -->
            <div class="musName">
              <p>
                <span
                  :class="{ active: item.id == playlist[playlistIdx]?.id }"
                  >{{ item.name }}</span
                >
                &nbsp;
                <i v-if="item.alia[0]">({{ item.alia[0] }})</i>
              </p>

              <i class="album">
                <span class="vip" v-if="item.fee == 4 || item.fee == 1">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-VIP2"></use>
                  </svg>
                </span>
                <span v-for="(ar, arIdx) in item.ar">
                  {{
                    arIdx == item.ar.length - 1
                      ? ar.name
                      : ar.name + "&nbsp;/&nbsp; "
                  }}
                </span>
                &nbsp;&nbsp;-&nbsp;&nbsp;
                {{ item.al.name }}
              </i>
            </div>
          </div>
          <div class="itemRight">
            <svg class="icon shipin" aria-hidden="true" v-if="item.mv != 0">
              <use xlink:href="#icon-shipin-"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shezhi2-copy"></use>
            </svg>
          </div>
        </li>
      </ul>
      <!-- </van-list> -->
    </div>
  </div>
</template>

<script setup>
import { ref, onActivated } from "vue";
import { useCount } from "@/store/count";
import { storeToRefs } from "pinia";
import { getSeach } from "../services/api/found";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();

const countStore = useCount();

let { search } = storeToRefs(useCount());
let { musLists, playlist, playlistIdx, isMusicShow, isLyricShow } = storeToRefs(
  useCount()
);

let loading = ref(false); // 下拉加载 状态
let page = 0; // 页数

let schw = JSON.parse(localStorage.getItem("schWord"));
if (schw) {
  schw = schw;
} else {
  schw = [];
}
let schWord = ref(schw); // 历史搜索词

let schList = ref([]);
onActivated(() => {
  schList.value = [];
});

// 搜索列表
const getSchLists = async () => {
  // loading.value = true;

  let res = await getSeach(search.value, page, 50);
  // if (res) {
  //   if (page == 1) {
  //     schList.value = res.result.songs;
  //   } else {
  //     schList.value.push(...res.result.songs);
  //   }
  // }

  console.log(schList.value);
  schList.value = res.result.songs;
  // loading.value = false;
};

let listBox = ref();

// 点击手机键盘的回车或者搜索按钮
const enterSch = async () => {
  if (search.value != "") {
    schWord.value.unshift(search.value);
    schWord.value = [...new Set(schWord.value)]; // 去重
    // console.log([...new Set(schWord.value)]);
    localStorage.setItem("schWord", JSON.stringify(schWord.value));

    if (schWord.value.length > 10) {
      schWord.value.pop();
    }

    getSchLists();
    // console.log([listBox.value]);
    listBox.value.scrollTop = 0;
    // console.log(listBox.value.scrollTop);
    // search.value = "";
  }
};

// 下滑加载
// const getMore = () => {
//   page += 30;
//   getSchLists();
// };

// 点击历史搜索
const getHisWord = async (e) => {
  console.log(e.target.innerHTML);
  search.value = e.target.innerHTML;
  schWord.value.unshift(search.value);
  schWord.value = [...new Set(schWord.value)]; // 去重

  localStorage.setItem("schWord", JSON.stringify(schWord.value));

  getSchLists();

  listBox.value.scrollTop = 0;
  // search.value = "";
};

// 删除历史搜索
const delSchWord = () => {
  schWord.value = [];
  localStorage.setItem("schWord", JSON.stringify(schWord.value));
};

// 点击播放
const setMusic = (idx) => {
  playlist.value = schList.value;
  playlistIdx.value = idx;
};
</script>

<style lang="scss" scoped>
.search {
  padding: 10px 0;
  height: 92vh;

  .schHistory {
    padding: 0 30px;
    margin-top: 30px;
    // display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    width: 100%;
    position: relative;
    box-sizing: border-box;
    overflow: auto;
    .schbox {
      width: 95%;
      padding: 10px 0;
      display: flex;
      overflow: auto;
      flex-shrink: 0;
      align-items: center;
      ul {
        display: flex;
        overflow: auto;
        flex-wrap: nowrap;
        flex: 1;
        li {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
      }
    }
    .schWordTitle {
      font-size: 28px;
      width: 10%;
      font-weight: 700;
      margin-right: 20px;
    }
    .schWordLsit {
      // width: 100px;
      // height: 30px;
      display: inline-block;
      // display: flex;
      // width: 20%;
      flex-wrap: wrap;
      padding: 15px 25px;
      margin: 5px 10px;
      background-color: rgb(107, 123, 128, 0.2);
      border-radius: 30px;
      text-align: center;
    }

    .icon {
      font-size: 26px;
      color: rgb(107, 123, 128, 0.8);
      position: absolute;
      top: 20px;
      right: 25px;
    }
  }

  .schbox ::-webkit-scrollbar {
    display: none;
  }
  .schWordLsit ::-webkit-scrollbar {
    display: none;
  }
  .schList ::-webkit-scrollbar {
    display: none;
  }

  .palyStatus {
    width: 25px;
  }
  .active {
    color: #fe3346 !important;
  }
  .schList {
    padding-top: 10px;
    padding: 0 30px;

    ul {
      overflow: auto;
      height: 80vh;
      li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 28px 0;
        .itemLeft {
          width: 80%;
          display: flex;
          align-items: center;

          color: #b4b2b3;

          .musName {
            margin-left: 30px;
            p {
              width: 500px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              span {
                font-size: 26px;
                color: #000;
              }
            }
          }
          .album {
            display: inline-block;
            width: 500px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            display: flex;
            align-items: center;
            .vip {
              color: #fe3346;
              .icon {
                font-size: 30px;
              }
            }
          }
        }
        .itemRight {
          display: flex;
          align-items: center;

          .shipin {
            font-size: 28px;
            margin-right: 30px;
          }
          color: #b4b2b3;
        }
      }
    }
  }
}
</style>
