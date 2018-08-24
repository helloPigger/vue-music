<template>
  <div :class="$style.rank_song_list">
    <h2 :class="$style.title"><i class="iconfont icon-zuo"  @click="back"></i>{{title}}</h2> 
    <div :class="$style.content">
      
      <div :class="$style.bg" :style="bgStyle">
        <p>更新日期：{{date}}</p>
      </div>

      <scroll :class="$style.list" :songs="items" :data="items" @scroll="scroll">
        <ul>
          <li :class="$style.title" v-show="items.length"><i class="iconfont icon-bofang" :class="$style.icon"></i>播放全部（共{{number}}首）</li>            
          <li v-for="(item, index) in items" :key=index :class="$style.item">
            <div :class="$style.text">
              <!-- <h2><span>{{item.cur_count}}</span>{{item.data.songname}}</h2> -->
              <h2><span>{{index + 1}} . </span>{{item.data.songname}}</h2>
              <p>{{getSinger(item)}}</p>
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

export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    date: {
      type: String,
      default: ''
    },
    bgStyle: {
      type: String,
      default: ''
    },
    number: {
      type: Number,
      default: 0
    },
    name: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: ''
    },
    items: {
      type: Array,
      default () {
        return []
      }
    }
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
    back () {
      this.$router.push('/rank')
    },
    getSinger (item) {
      let singer = item.data.singer
      console.log(singer)
      let singerName = ''
      for (let i = 0, length = singer.length; i < length; i++) {
        singerName += singer[i].name + " / "
        if (length === 1) singerName = singer[i].name
      }
      return item.data.albumname + " - " + singerName
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
.rank_song_list {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
  z-index: 200;
  .title {
    @include topTitle();
  }
  .content {
    margin-top: 40px;
    height: 100%;
    .bg {
      width: 100%;
      height: 150px;
      position: relative;
      p {
        padding-left: 20px;
        color: #fff;
        font-weight: 300;
        font-size: 14px;
        position: absolute;
        right: 10px;
        bottom: 10px;
      }
    }
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
