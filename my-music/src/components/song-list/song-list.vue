<template>
  <div :class="$style.song_list">
    <div :class="$style.content">
      <slot/>
      <scroll :class="$style.list" :songs="items" :data="items" @scroll="scroll">
        <ul>
          <!-- <li :class="$style.title" v-show="items.length"><i class="iconfont icon-bofang" :class="$style.icon"></i>播放全部（共{{number}}首）</li>             -->
          <li v-for="(item, index) in items" :key=index :class="$style.item" @click="playerItem(index)">
            <div :class="$style.text">
              <h2><span v-show="sign">{{index + 1}} . </span>{{item.songname || item.data.songname}}</h2>
              <p>{{singer(item,'true')}}</p>
            </div>
          </li>
        </ul>
      </scroll>
      <loading v-show="!items.length"/>
      <div :class="$style.bgScroll"></div>
    </div>
  </div>
</template>

<script>
import Loading from '@/common/loading/loading'
import Scroll from '@/common/scroll/scroll'
import { getSinger } from '@/js/utils'
export default {

  props: {
    bgStyle: {
      type: String,
      default: ''
    },
    number: {
      type: Number,
      default: 0
    },
    items: {
      type: Array,
      default () {
        return []
      }
    },
    sign: {
      type: Boolean,
      default: false
    },
  },
  data () {
    return {
      options: {
        direction: 'vertical',
        slidesPerView: 'auto',
        freeMode: true,
        mousewheel: true

      },
      scrollY: 0
    }
  },
  methods: {
    singer (item) {
      return getSinger(item, true)
    },
    playerItem (index) {
      this.$emit('playerItem', index)
    },
    scroll (e) {
      // let y = e.changedTouches[0].clientY 
      // let y1 = e.changedTouches[0].screenY 
      // this.scrollY = y
      // console.log(y)
      // console.log(y1 - y)
    }
  },
  watch: {
    // scrollY (newY) {
    //   console.log("newY:"+newY)
    // }
  },
  components: {
    Loading,
    Scroll
  }
}
</script>

<style lang="scss" module>
@import "@/common/scss/mixin.scss";
@import "@/common/scss/variable.scss";
.song_list {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
  z-index: 200;
  .title {
    font-size: 17px;
  }
  .content {
    height: 100%;
    .list {
      background-color: #fff;
      li {
        .icon {
          color: #000;
        }
        @include flex($justify: flex-start);
        padding: 6px 10px;
        border-bottom: 1px solid #ddd;
        position: relative;
        background-color: #fff;
        color: #000;
        .text {
          padding-left: 10px;
          width: 100%;
          h2 {
            @include nowrap();
            font-size: 14px;
            height: 24px;
            line-height: 24px;
          }
          p {
            @include nowrap();
            font-size: 12px;
            color: #888;
          }
        }
      }
      .title {
        border-radius: 2px 2px / 0.2px 2px;
      }
    }
    .bgScroll {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 160px;
      left: 0;
    }
  }
}
</style>
