<template>
  <div :class="$style.recom_list">
    <h2 @click="recommendMore(itemsAll)" v-show="items.length">{{title}}<i class="iconfont icon-you" :class="$style.icon_you"></i></h2>  
    <div :class="$style.container">
      <div v-for="(item, index) in items" :key=index @click="recomList(item)">
        <img :src="item.cover">
        <span :class="$style.num">
          {{getListenNumber(item.listen_num)}}
          <span class="iconfont icon-erji" :class="$style.icon"></span>
          </span>
        <p :class="$style.title">{{item.title}}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    itemsAll: {
      type: Array,
      default () {
        return []
      }
    },
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
    recommendMore (itemsAll) {
      this.$emit('recomMore', itemsAll)
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
    .icon_you {
      color: #999;
    }
  }
  .container {
    @include flex($wrap: wrap);
    padding: 0 10px;
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
        .icon {
          position: absolute;
          left: -20px;
          top: -1px;
          padding: 0;
        }
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
