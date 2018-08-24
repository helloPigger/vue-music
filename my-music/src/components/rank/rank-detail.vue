<template>
  <div class="rank_detail">
    <rank-song-list :items="rankDetailList" title="" :date="rankGuanFang.showtime" :bgStyle="bgStyle" :number="totalNumber"></rank-song-list>
  </div>
</template>
<script>
import NewList from '@/components/recommend/new-list'
import { getAxios, getSongList, SUCCESS_CODE } from '@/js/api'
import { mapGetters } from 'vuex'
import RankSongList from '@/components/rank/rank-song-list'

export default {
  data () {
    return {
      rankDetailList: [],
      totalNumber: 0
    }
  },
  created () {
    this.getRankGFList()
  },
  methods: {
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
    }
  },
  components: {
    RankSongList
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


