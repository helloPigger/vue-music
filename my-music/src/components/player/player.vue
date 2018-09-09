<template>
  <div :class="$style.player" v-show="playList.length">
    <div :class="$style.big_player" v-show="showBigPlayer">
      <div :class="$style.background">
        <img :src="background(newPlaySong)">
      </div>

      <div :class="$style.title">
        <h2><i class="iconfont icon-zuo" :class="$style.icon" @click="back"></i>{{ newPlaySong.songname}}</h2> 
       
        <p>{{singer(newPlaySong)}}</p>
      </div>
      
      <div :class="$style.cd_palyer">
        <img :src="src(newPlaySong)" :class="cdClass()">
      </div>
      <div :class="$style.progress">
        <span :class="$style.time_start">0:00</span>
        <span :class="$style.progress_line"></span>
        <span :class="$style.time_end">3:45</span>
      </div>
      <div :class="$style.controller">
        <!-- <i class="iconfont icon-suijibofang"></i> -->
        <i class="iconfont icon-zuo" @click="prev()"></i>
        <i class="iconfont" :class="isBofangClass()" @click="isBofang()"></i>
        <i class="iconfont icon-you" @click="next()"></i>
        <i class="iconfont icon-Group-" @click="showList()"></i>
      </div>
    </div>

    <div :class="$style.min_player" v-show="!showBigPlayer">
      <div :class="$style.s_img" @click="openBigPlayer">
        <img :src="sSrc(newPlaySong)" :class="smallCdClass()">
        </div>
      <div :class="$style.song" @click="openBigPlayer">
        <p :class="$style.name">{{newPlaySong.songname || newPlaySong.title}}</p>
        <p :class="$style.singer">{{singer(newPlaySong)}}</p>
      </div>
      <div :class="$style.icon" @click="isBofang()">
        <i class="iconfont" :class="isBofangClass()"></i>
      </div>
      <div :class="$style.icon" @click="showList()">
        <i class="iconfont icon-Group-"></i>
      </div>
    </div>
    <audio  ref="audio" :src="audioSrc(newPlaySong)"></audio>

    <div :class="$style.bofang_list" v-show="show">
      <div :class="$style.shadow" @click="hideList()"></div>
      <div :class="$style.scroll_container">
        <scroll :data="playList" :songs="playList">
          <ul>           
            <li v-for="(item, index) in playList" :key=index :class="$style.item" @click="player(index)">
              <div :class="$style.text" :style="bofaingStyle(index)">
                <span :class="$style.songname">{{item.songname || item.data.songname}}</span> - <span :class="$style.singer">{{singer(item,'true')}}</span>
              </div>
            </li>
          </ul>
        </scroll>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { getSinger } from '@/js/utils'
import Scroll from '@/common/scroll/scroll'


export default {
  data () {
    return {
      show: false,
    }
  },
  methods: {
    back () {
      // this.showBigPlayer = false  //[Vue warn]: Computed property "showBigPlayer" was assigned to but it has no setter ，需要用mapMutations改变值
      this.setShowBigPlayer(false)
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
    audioSrc (item) {
      return `http://dl.stream.qqmusic.qq.com/C400${item.songmid}.m4a?guid=106795008&vkey=533D7B065C869C428A3AC77FE71F73DC516094FC53EDC6E84DDC9E3220890A8421E63E97C84053C7AF633670F2CCD8ED5FE916CD7DC82AFD&uin=0&fromtag=38`
    },
    background (item) {
      return `https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.albummid}.jpg?max_age=2592000`
    },
    cdClass () {
      return this.playing ? 'play' : 'pause'
    },
    smallCdClass () {
      return this.playing ? 'play' : 'pause'
    },
    isBofangClass () {
      return this.playing ? 'icon-zanting1' : 'icon-bofang'
    },
    bofaingStyle (index) {
      if (this.playIndex === index) {
        return 'color:red;'
      }
    },
    isBofang () {
      this.setPlaying(!this.playing)
    },
    prev () {
      let newIndex = this.playIndex - 1
      if (this.playIndex === 0) newIndex = this.playList.length - 1
      this.setPlayingIndex(newIndex)
      this.setPlaying(true)
    },
    next () {
      let newIndex = this.playIndex + 1
      if (this.playIndex === this.playList.length) newIndex = 0
      this.setPlayingIndex(newIndex)
      this.setPlaying(true)
    },
    player (index) {
      this.setPlayingIndex(index)
      this.setPlaying(true)
    },
    showList () {
      this.show = true
    },
    hideList () {
      this.show = false
    },
    ...mapMutations({
      setShowBigPlayer: 'SET_SHOW_BINGPLAYER',
      setPlaying: 'SET_PLAYING',
      setPlayingIndex: 'SET_PLAYINDEX'
    })
  },
  computed: {
    newPlaySong () {
      // console.log(this.playSong)
      if (this.playSong.length === 0) return []
      if (this.playSong.data) return this.playSong.data
      else return this.playSong
    },
    title () {
      return
    },
    ...mapGetters([
      'playList',
      'showBigPlayer',
      'playing',
      'playSong', //可以直接从vuex中获取到值，好腻害！
      'playIndex'
    ])
  },
  components: {
    Scroll
  },
  watch: {
    newPlaySong (y) {
      setTimeout(() => {//不加延时会报错
        this.$refs.audio.play()
      }, 20)
    },
    playing (playing) {//按钮只是形式，真正改变播放暂停的在这里
      this.$nextTick(() => {
        playing ? this.$refs.audio.play() : this.$refs.audio.pause()
      })
    }
  }
}
</script>

<style lang="scss">
.play {
  animation: play 20s linear infinite;
}
.pause {
  animation-play-state: paused;
}
@keyframes play {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>


<style lang="scss" module>
@import "@/common/scss/mixin.scss";
@import "@/common/scss/variable.scss";

.player {
  padding: 0 10px;

  .big_player {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 200;

    .background {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      z-index: -1;
      margin-left: -40px;
      margin-top: -40px;
      filter: blur(28px);
      img {
        width: 150%;
        height: 150%;
      }
    }
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
      padding-top: 100px;
      img {
        width: 80%;
        height: auto;
        border: 10px solid rgba(255, 255, 255, 0.1);
        border-radius: 50%;
      }
    }
    .progress {
      position: absolute;
      left: 0;
      bottom: 100px;
      width: 100%;
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
      position: absolute;
      left: 0;
      bottom: 50px;
      width: 100%;
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
    z-index: 200;
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
  .bofang_list {
    position: fixed;
    left: 0;
    bottom: 0;
    background-color: #fff;
    width: 100%;
    height: 300px;
    z-index: 200;
    border-radius: 10px 10px 0 0;
    .shadow {
      width: 100%;
      height: 100%;
      position: fixed;
      left: 0;
      top: 0;
      background-color: rgba(0, 0, 0, 0.3);
      z-index: -1;
    }
    .scroll_container {
      position: fixed;
      left: 0;
      bottom: 0;
      background-color: #fff;
      width: 100%;
      height: 300px;
      z-index: 200;
      border-radius: 10px 10px 0 0;
      ul {
        z-index: 200;
        background-color: #fff;
        border-radius: 10px 10px 0 0;
        .text {
          color: #000;
          border-bottom: 1px solid #ddd;
          height: 30px;
          line-height: 30px;
          padding: 0 10px;
          .songname {
            font-size: 14px;
          }
          .singer {
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>

