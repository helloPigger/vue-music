<template>
  <div :class="$style.song_list">
    <h2><i class="iconfont icon-zuo" :class="$style.icon" @click="back"></i>每日新歌1111111111111</h2>  
    <new-list :items="newMusicList"></new-list>
    <router-view></router-view>
  </div>
</template>
<script>
import NewList from '@/components/recommend/new-list'
import { getAxios, SUCCESS_CODE } from '@/js/api'

export default {
  props: {
    items: {
      tyoe: Array,
      default () {
        return []
      }
    }
  },
  created () {
    this.getRecommendSongList()
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    getRecommendSongList () {
      const data = {
        type: 1,
        json: 1,
        utf8: 1,
        onlysong: 0,
        disstid: 4255737918,
        loginUin: 0,
        hostUin: 0,
        platform: 'yqq',
        needNewCode: 0,
        g_tk: 5381,
        format: 'json',
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice: 0
      }
      getAxios('/bannerApi', '/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg', data, (res) => {
        if (res.data.code === SUCCESS_CODE) this.bannerList = res.data.data.slider
      })
    }
  },
  components: {
    NewList
  }

}
</script>
<style lang="scss">
.iconfont {
  font-size: 20px;
  color: #999;
}
</style>

<style lang="scss" module>
@import "@/common/scss/mixin.scss";
.song_list {
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
      .icon {
        position: absolute;
        top: 20px;
        right: 14px;
      }
    }
  }
}
</style>
