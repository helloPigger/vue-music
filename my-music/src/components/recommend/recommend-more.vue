<template>
  <div :class="$style.recom_more" class="recom-more">
    <h2><i class="iconfont icon-zuo" :class="$style.icon" @click="back"></i>为你推荐</h2>  
    <div :class="$style.container">
      <div v-for="(item, index) in recommendList" :key=index>
        <img v-lazy="item.cover">
        <span :class="$style.num">{{getListenNumber(item.listen_num)}}</span>
        <span class="iconfont icon-erji" :class="$style.icon"></span>
        <p :class="$style.title">{{item.title}}</p>
      </div>
    </div>
    <loading v-show="!recommendList.length"/>
    </div>
</template>

<script>
import { getAxios, getJsonp, jsonpOption, SUCCESS_CODE } from '@/js/api'
import Loading from '@/common/loading/loading'
export default {
  data () {
    return {
      recommendList: []
    }
  },
  created () {
    this.getRecommendList()
  },
  methods: {
    getListenNumber (num) {
      if (Number(num) >= 100000) {
        return (Number(num) * 0.0001).toFixed(1) + "万"
      } else {
        return num
      }
    },
    back () {
      this.$router.go(-1)
    },
    getRecommendList () {
      const p = { "comm": { "ct": 24 }, "recomPlaylist": { "method": "get_hot_recommend", "param": { "async": 1, "cmd": 2 }, "module": "playlist.HotRecommendServer" } }
      const dataParam = encodeURIComponent(JSON.stringify(p))
      const data = {
        g_tk: 5381,
        loginUin: 0,
        hostUin: 0,
        format: 'jsonp',
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq',
        needNewCode: 0,
        data: dataParam
      }
      getAxios('/recommendApi', '/cgi-bin/musicu.fcg', data, (res) => {
        if (res.data.code === SUCCESS_CODE) {
          this.recommendList = res.data.recomPlaylist.data.v_hot
          this.recommendList6 = this.recommendList
        }
      })
    }
  },
  components: {
    Loading
  }

}
</script>


<style lang="scss" module>
@import "@/common/scss/mixin.scss";
@import "@/common/scss/variable.scss";
.recom_more {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 200;
  background-color: $bg-color;
  overflow-y: scroll;
  overflow-x: hidden;

  h2 {
    height: 40px;
    line-height: 40px;
    color: #fff;
    font-size: 17px;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 201;
    background-color: $theme-color;
    .icon {
      color: #fff;
      padding-left: 4px;
      padding-right: 10px;
      vertical-align: middle;
    }
  }

  .container {
    @include flex($wrap: wrap);
    margin-top: 40px;
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
