<template>
  <div :class="$style.player" v-show="playList.length" :style="background(playSong.data)">
    <div :class="$style.big_player" v-show="showBigPlayer">
      <div :class="$style.title">
        <h2><i class="iconfont icon-zuo" :class="$style.icon" @click="back"></i>{{playSong.data.songname}}</h2> 
        <p>{{singer(playSong)}}</p>
      </div>
      

      <div :class="$style.cd_palyer">
        <img :src="src(playSong.data)" alt="">
      </div>
      <div :class="$style.progress">
        <span :class="$style.time_start">0:00</span>
        <span :class="$style.progress_line"></span>
        <span :class="$style.time_end">3:45</span>
      </div>
      <div :class="$style.controller">
        <i class="iconfont icon-suijibofang"></i>
        <i class="iconfont icon-zuo"></i>
        <i class="iconfont icon-bofang"></i>
        <i class="iconfont icon-you"></i>
        <i class="iconfont icon-Group-"></i>
      </div>

    </div>

    <div :class="$style.min_player" v-show="!showBigPlayer" @click="openBigPlayer">
      <div :class="$style.s_img"><img :src="sSrc(playSong.data)" alt=""></div>
      <div :class="$style.song">
        <p :class="$style.name">{{playSong.data.songname}}</p>
        <p :class="$style.singer">{{singer(playSong)}}</p>
      </div>
      <div :class="$style.icon">
        <i class="iconfont icon-bofang"></i>
      </div>
      <div :class="$style.icon">
        <i class="iconfont icon-Group-"></i>
      </div>

    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { getSinger } from '@/js/utils'

export default {
  methods: {
    back () {
      // this.showBigPlayer = false  //[Vue warn]: Computed property "showBigPlayer" was assigned to but it has no setter ，需要用mapMutations改变值
      this.setShowBigPlayer(false)
      // this.$router.go(-1)
      // console.log(this.playSong)
    },
    openBigPlayer () {
      this.setShowBigPlayer(true)

    },
    singer (item) {
      return getSinger(item)
    },
    src (item) {
      return `https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.albummid}.jpg?max_age=2592000`
    },
    sSrc (item) {
      return `http://y.gtimg.cn/music/photo_new/T002R90x90M000${item.albummid}.jpg?max_age=2592000`
    },
    background (item) {
      return `background: url('https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.albummid}.jpg?max_age=2592000') no-repeat;background-size: cover; background-position: center center; filter: blur(9px);`
    },
    ...mapMutations({
      setShowBigPlayer: 'SET_SHOW_BINGPLAYER'

    })
  },
  computed: {
    ...mapGetters([
      'playList',
      'showBigPlayer',
      'playSong' //可以直接从vuex中获取到值，好腻害！
    ])
  }
}
</script>



<style lang="scss" module>
@import "@/common/scss/mixin.scss";
@import "@/common/scss/variable.scss";

.player {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // background-color: tan;

  z-index: 200;
  padding: 0 10px;
  .big_player {
    .title {
      h2 {
        color: #fff;
        font-size: 16px;
        height: 28px;
        line-height: 40px;
      }
      p {
        color: #fff;
        font-size: 14px;
        padding-left: 42px;
      }
    }
    .cd_palyer {
      width: 100%;
      text-align: center;
      padding-top: 80px;
      img {
        width: 60%;
        height: auto;
        border-radius: 50%;
      }
    }
    .progress {
      width: 100%;
      padding-top: 160px;
      color: #fff;
      text-align: center;
      span {
        font-size: 12px;
      }
      .time_start {
        float: left;
      }
      .progress_line {
        display: inline-block;
        width: 82%;
        border-bottom: 2px solid #fff;
        vertical-align: middle;
      }
      .time_end {
        float: right;
      }
    }
    .controller {
      @include flex();
      padding-top: 20px;
      i {
        font-size: 28px;
        padding-right: 0;
      }
    }
  }
  .min_player {
    @include flex();
    align-items: center;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 60px;
    background-color: $bg_color;
    border-top: 1px solid #ddd;
    .s_img {
      width: 20%;
      img {
        width: 90%;
        height: auto;
        border-radius: 50%;
      }
    }
    .song {
      width: 70%;
      .name {
        font-size: 14px;
        color: #000;
      }
      .singer {
        font-size: 12px;
        color: #666;
      }
    }
    .icon {
      width: 10%;
      i {
        font-size: 26px;
        color: #000;
      }
    }
  }
}
</style>

