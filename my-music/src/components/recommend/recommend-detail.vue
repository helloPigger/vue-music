<template>
  <div class="recommend_detail">
    <song-list :items="recomDetailList" title="歌单" :name="recommendItem.title" :image="recommendItem.cover"/>
    <!-- <router-view></router-view> -->
  </div>
</template>
<script>
import NewList from '@/components/recommend/new-list'
import { getAxios, getSongList, SUCCESS_CODE } from '@/js/api'
import { mapGetters } from 'vuex'
import SongList from '@/components/song-list/song-list'

export default {
  data () {
    return {
      recomDetailList: []
    }
  },
  created () {
    this.getRecommendSongList()
  },
  methods: {
    getRecommendSongList () {
      if (!this.recommendItem.content_id) {
        return
      }
      getSongList(this.recommendItem.content_id).then((res) => {
        if (res.code === SUCCESS_CODE) this.recomDetailList = res.cdlist[0].songlist
      })
    }
  },
  components: {
    SongList
  },
  computed: {
    ...mapGetters([
      'recommendItem'
    ])
  }
}
</script>
