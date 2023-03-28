<template>
  <!-- 头部导航 -->
  <div class="footerNav">
    <router-link to="/mine">
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
    </router-link>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.footerNav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgb(255, 255, 255, 0);
  background-color: white;

  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 0 2px #949599;
  text-align: center;
  padding: 20px 0 10px;

  p {
    color: #949599;
    font-size: 25px;
  }
}

.icon {
  font-size: 35px;
  fill: #949599;
}
.router-link-exact-active {
  p {
    color: #ff235d;
  }
  .icon {
    background-color: #ff235d;
    fill: #fff;
    border-radius: 50%;
  }
}
</style>
recommend
