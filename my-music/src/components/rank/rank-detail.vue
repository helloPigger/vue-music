<template>
  <div class="rank_detail">
    <song-list :items="rankDetailList" :bgStyle="bgStyle" :number="totalNumber" :sign="sign" @playerItem="playerItem">
      <div :class="$style.bg" :style="bgStyle">
        <i class="iconfont icon-zuo" @click="back"></i>
        <p>更新日期：{{rankGuanFang.showtime}}</p>
      </div>
    </song-list>
  </div>
</template>
<script>
import NewList from '@/components/recommend/new-list'
import { getAxios, SUCCESS_CODE } from '@/js/api'
import { mapGetters, mapActions } from 'vuex'
import SongList from '@/components/song-list/song-list'


export default {
  data () {
    return {
      rankDetailList: [],
      totalNumber: 0,
      sign: true
    }
  },
  created () {
    this.getRankGFList()
  },
  methods: {
    back () {
      this.$router.push(`/rank`)
    },
    playerItem (index) {
      this.clickPlayerItem({
        playList: this.rankDetailList,
        index: index
      })
    },
    getRankGFList () {
      let data = {
        tpl: 3,
        page: 'detail',
        date: this.rankGuanFang.update_key,
        topid: this.rankGuanFang.topID,
        type: 'top',
        song_begin: 0,
        song_num: 30,
        g_tk: 5381,
        loginUin: 0,
        hostUin: 0,
        format: 'jsonp',
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq',
        needNewCode: 0
      }
      getAxios('/bannerApi', '/v8/fcg-bin/fcg_v8_toplist_cp.fcg', data).then((res) => {
        if (res.data.code === SUCCESS_CODE) {
          this.rankDetailList = res.data.songlist
          this.totalNumber = res.data.total_song_num
        }
      })
    },
    ...mapActions([
      'clickPlayerItem'
    ])
  },
  components: {
    SongList
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

<style <style lang="scss" module>
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
</style>



