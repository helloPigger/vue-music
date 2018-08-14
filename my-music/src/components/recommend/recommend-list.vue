<template>
  <div :class="$style.recom_list">
    <h2 @click="recommendMore">为你推荐<i class="iconfont icon-you"></i></h2>  
    <div :class="$style.container">
      <div v-for="(item, index) in items" :key=index @click="recomList(item.id)">
        <img :src="item.cover">
        <span :class="$style.num">{{getListenNumber(item.listen_num)}}</span>
        <span class="iconfont icon-erji" :class="$style.icon"></span>
        <p :class="$style.title">{{item.title}}</p>
      </div>
    </div>
  </div>
  
</template>
<script>
export default {
  props: {
    items: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    getListenNumber (num) {
      if (Number(num) >= 100000) {
        return (Number(num) * 0.0001).toFixed(1) + "万"
      } else {
        return num
      }
    },
    recommendMore () {
      this.$emit('recomMore')
    },
    recomList (item) {
      this.$emit('recomList', item)

    }
  }

}
</script>

<style lang="scss" module>
@import "@/common/scss/mixin.scss";
@import "@/common/scss/variable.scss";
.recom_list {
  padding-top: 20px;
  h2 {
    @include title();
  }
  .container {
    @include flex($wrap: wrap);
    div {
      width: 33.3%;
      padding-right: 2px;
      padding-bottom: 16px;
      position: relative;
      &:nth-child(3n) {
        padding-right: 0;
      }
      img {
        width: 100%;
        height: auto;
      }
      .num {
        position: absolute;
        top: 2px;
        right: 5px;
        color: #fff;
      }
      .icon {
        @extend .num;
        right: 46px;
      }
      .title {
        @include nowraps();
        padding: 6px 2px 0 6px;
        line-height: 1.2;
        font-size: 13px;
      }
    }
  }
}
</style>
