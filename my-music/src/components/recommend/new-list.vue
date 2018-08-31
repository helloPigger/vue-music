<template>
  <div :class="$style.new_list">
    <h2 :class="$style.title" v-show="items.length">{{title}}</h2>
    <div :class="$style.container">
      <ul>
        <li v-for="(item, index) in items" :key=index :class="$style.item" @click="player(item)">
          <div :class="$style.image">
            <img v-lazy="getImgSrc(item)">
          </div>
          <div :class="$style.text">
            <h2>{{item.name}}</h2>
            <p>{{singer(item)}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getSinger } from '@/js/utils'
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    items: {
      tyoe: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    player (item) {
      this.$emit('player', item)
    },
    getImgSrc (item) {
      let src = item.album.mid
      return `//y.gtimg.cn/music/photo_new/T002R90x90M000${src}.jpg?max_age=2592000`
    },
    singer (item) {
     return getSinger(item)
    }
  }

}
</script>

<style lang="scss" module>
@import "@/common/scss/mixin.scss";
.new_list {
  padding-top: 20px;
  .title {
    @include title();
  }
  .container {
    .item {
      @include flex($justify: flex-start);
      height: 60px;
      padding: 6px 0 6px 10px;
      border-bottom: 1px solid #ddd;
      position: relative;
      .image {
        width: 20%;
        img {
          height: 100%;
          width: auto;
        }
      }
      .text {
        padding-left: 10px;
        width: 70%;
        h2 {
          @include nowrap();
          font-size: 15px;
          height: 28px;
          line-height: 28px;
        }
        p {
          @include nowrap();
          font-size: 12px;
          color: #888;
        }
      }
    }
  }
}
</style>
