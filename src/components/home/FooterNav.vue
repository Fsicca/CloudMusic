<template>
  <!-- 头部导航 -->
  <div class="footerNav">
    <van-tabbar
      v-model="active"
      active-color="#ff235d"
      inactive-color="#949599"
      route
      :placeholder="true"
      :safe-area-inset-bottom="true"
      :border="false"
    >
      <van-tabbar-item to="/mine">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-yinle2"></use>
        </svg>
        <p>我的</p>
      </van-tabbar-item>
      <van-tabbar-item to="/foundMusic">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-wangyiyunyinle"></use>
        </svg>
        <p>发现</p>
      </van-tabbar-item>
      <van-tabbar-item to="/cloudVillage">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-guanzhu"></use>
        </svg>
        <p>关注</p>
      </van-tabbar-item>
      <van-tabbar-item to="/videos">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shequ"></use>
        </svg>
        <p>社区</p>
      </van-tabbar-item>
    </van-tabbar>
    <!-- <router-link to="/mine">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-yinle2"></use>
      </svg>
      <p>我的</p>
    </router-link>
    <router-link to="/foundMusic">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-wangyiyunyinle"></use>
      </svg>
      <p>发现</p>
    </router-link>
    <router-link to="/cloudVillage">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-guanzhu"></use>
      </svg>
      <p>关注</p>
    </router-link>
    <router-link to="/videos">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-shequ"></use>
      </svg>
      <p>社区</p>
    </router-link> -->
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.footerNav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  // background-color: rgb(255, 255, 255, 0);
  background-color: white;

  // display: flex;
  // justify-content: space-around;
  // align-items: center;
  box-shadow: 0 0 2px #949599;
  text-align: center;

  p {
    // color: #949599;
    font-size: 25px;
  }
}

.icon {
  font-size: 35px;
  // fill: #949599;
}
// .router-link-exact-active {
//   p {
//     color: #ff235d;
//   }
//   .icon {
//     background-color: #ff235d;
//     fill: #fff;
//     border-radius: 50%;
//   }
// }
</style>
recommend
