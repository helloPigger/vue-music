<template>
  <div :class="$style.mv_detail">
    <div :class="$style.content">
      
      <div :class="$style.bg" :style="bgStyle">
        <i class="iconfont icon-zuo" @click="back"></i>
        <p v-show="mvDetailList.length">更新日期：{{date}}</p>
      </div>

      <scroll :class="$style.list" :songs="mvDetailList" :data="mvDetailList">
        <ul>   
          <li v-for="(item, index) in mvDetailList" :key=index :class="$style.item">
            <div :class="$style.image">
              <span :style="colorStyle(index)">{{index + 1}} - </span><i class="iconfont icon-bofang" :class="$style.icon"></i><img v-lazy="item.info.Fpic">
           </div>
            <div :class="$style.text">
              <h2>{{item.info.Fmv_title}}</h2>
              <p>{{singer(item)}}</p>
              <p>发布时间：{{getPublishDate(item)}}</p>
            </div>
          </li>
        </ul>
      </scroll>

      <loading v-show="!mvDetailList.length"/>
      <div :class="$style.bgScroll"></div>
    </div>
  </div>
</template>
<script>
import Loading from '@/common/loading/loading'
import Scroll from '@/common/scroll/scroll'
import NewList from '@/components/recommend/new-list'
import { getAxios, SUCCESS_CODE } from '@/js/api'
import { getSinger, timestampToDate } from '@/js/utils'
import { mapGetters } from 'vuex'
import SongList from '@/components/song-list/song-list'


export default {
  data () {
    return {
      mvDetailList: [],
      totalNumber: 0,
      date: ''
    }
  },
  created () {
    this.getMvGFList()
  },
  methods: {
    back () {
      this.$router.push('/rank')
    },
    singer (item) {
      return getSinger(item)
    },
    getPublishDate (item) {
      return timestampToDate(item.info.Fupload_time)
    },
    colorStyle (index) {
      if (index < 3) return 'color:#ff4222'
      else return "color:#666"

    },
    getMvGFList () {
      let data = {
        format: 'json',
        g_tk: 5381,
        loginUin: 0,
        hostUin: 0,
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq',
        needNewCode: 0,
        listtype: 'all',
        listid: 'all_musicshow_mvtoplist_current_new'
      }
      getAxios('/bannerApi', '/mv/fcgi-bin/fcg_musicshow_mvtoplist.fcg', data).then((res) => {
        if (res.data.code === SUCCESS_CODE) {
          this.mvDetailList = res.data.data.list
          this.date = res.data.data.date
        }
      })
    }
  },
  components: {
    // SongList
    Loading,
    Scroll
  },
  computed: {
    bgStyle () {
      return `background:url(${this.rankGuanFang.pic_h5}) no-repeat 100% 100%; background-size: cover;`
    },
    ...mapGetters([
      'rankGuanFang'
    ])
  }
}

</script>


<style lang="scss" module>
@import "@/common/scss/mixin.scss";
@import "@/common/scss/variable.scss";
.mv_detail {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
  z-index: 200;
  .content {
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
      .item {
        @include flex($justify: flex-start);
        padding: 6px 10px;
        border-bottom: 1px solid #ddd;
        position: relative;
        background-color: #fff;
        color: #000;
        .image {
          width: 40%;
          position: relative;
          span {
            position: absolute;
            top: 20px;
            left: 0;
            font-size: 17px;
          }
          .icon {
            color: #666;
            position: absolute;
            left: 50px;
            top: 16px;
            font-size: 30px;
          }
          img {
            height: auto;
            width: 100%;
            padding-left: 22px;
          }
        }
        .text {
          padding-left: 10px;
          width: 60%;
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
