<template>
  <!-- 发现音乐 类别 -->
  <div class="categories">
    <ul class="cateul">
      <li>
        <div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-meirituijian1"></use>
          </svg>
          <span>每日推荐</span>
        </div>
      </li>
      <li>
        <div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-diantai2"></use>
          </svg>
          <span>私人FM</span>
        </div>
      </li>
      <li>
        <div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-gedan1"></use>
          </svg>
          <span>歌单</span>
        </div>
      </li>
      <li>
        <div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-youshengshu"></use>
          </svg>
          <span>有声书</span>
        </div>
      </li>
      <li>
        <div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-a-40zhuanji-copy"></use>
          </svg>
          <span>数字专辑</span>
        </div>
      </li>
      <li>
        <div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-guanzhuxinge-copy"></use>
          </svg>
          <span>关注新歌</span>
        </div>
      </li>
      <li>
        <div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-yinle4-copy"></use>
          </svg>
          <span>一歌一遍</span>
        </div>
      </li>
      <li>
        <div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-chuizi-xuanzhong-copy"></use>
          </svg>
          <span>收藏家</span>
        </div>
      </li>
      <li>
        <div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-15"></use>
          </svg>
          <span>游戏</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.categories {
  // width: 350px;
  // overflow: auto;
  .cateul {
    display: flex;
    overflow: auto;

    li {
      div {
        width: 100px;
        display: flex;
        align-items: center;
        flex-direction: column;
        padding: 20px 20px;
        .icon {
          font-size: 42px;
          color: #ff235d;
        }
        span {
          padding: 15px 0;
        }
      }
    }
  }
}
.categories ::-webkit-scrollbar {
  display: none;
}
</style>
