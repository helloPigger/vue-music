<template>
  <div :class="$style.tabs" class="tabs">
    <router-link tag="div" to="/recommend"><span>推荐音乐</span></router-link>
    <router-link tag="div" to="/rank"><span>排行榜</span></router-link>
    <router-link tag="div" to="/search"><span>搜索</span></router-link>
  </div>
</template>

<style <style lang="scss">
@import "@/common/scss/variable.scss";
.tabs {
  .router-link-active {
    position: relative;
    span {
      color: $theme-color;
    }
    &::after {
      content: "";
      width: 100%;
      height: 2px;
      color: $theme-color;
      background-color: $theme-color;
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }
}
</style>
  
<style lang="scss" module>
@import "@/common/scss/mixin.scss";
.tabs {
  @include flex();
  width: 100%;
  background-color: #fff;
  border-bottom: 1px solid #eee;
  position: fixed;
  top: 64px;
  left: 0;
  // z-index: 100;
  div {
    span {
      font-size: 15px;
      height: 40px;
      line-height: 40px;
    }
  }
  // div::before {
  //   content: "";
  //   width：100%；height: 4px;
  // }
}
</style>

