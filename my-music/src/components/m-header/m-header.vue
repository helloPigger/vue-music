<template>
<div :class="$style.hometop">
  <img src="/static/img/logo.png">
  <span>chopper云音乐</span>
</div>
</template>

<style lang="scss" module>
@import "../../common/scss/variable";
.hometop {
  background-color: $theme-color;
  width: 100%;
  height: 64px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  text-align: center;
  color: #fff;
  img {
    width: 64px;
    height: 64px;
  }
  span {
    font-size: 26px;
    vertical-align: middle;
  }
}
</style>


