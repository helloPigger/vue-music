<template>
  <div class="recommend">
    <slider :swiperOption=options :items="bannerList"/>
    <recommend-list title="为你推荐" :items="recommendList6" :itemsAll="recommendList" @recomMore="recomMore" @recomList="recomList"></recommend-list>
    <router-view></router-view>
    <new-list title = "最新音乐" :items="newMusicList"></new-list>
    <loading v-show="!recommendList.length"/>
  </div>
</template>

<script>
import { getAxios, getSongList, SUCCESS_CODE } from '@/js/api'
import Slider from '@/common/slider/slider'
import RecommendList from '@/components/recommend/recommend-list'
import NewList from '@/components/recommend/new-list'
import Loading from '@/common/loading/loading'
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      bannerList: [],
      recommendList: [],
      recommendList6: [],
      newMusicList: [],
      options: {
        loop: true,
        autoplay: true,
        disableOnInteraction: false,
        pagination: {
          el: '.swiper-pagination'
        }
      }
    }
  },
  created () {
    this.getBannerList()
    this.getNewMusicList()
  },
  methods: {
    recomMore (itemsAll) {
      this.$router.push({
        path: '/recommend/recommendMore'
      })
      this.setRecommend(itemsAll)
    },
    recomList (item) {
      this.$router.push({
        path: `/recommend/${item.content_id}`
      })
      //此id需传到二级路由页面 vuex
      this.setRecommendItem(item)
    },
    getBannerList () {
      const data = {
        g_tk: 5381,
        format: 'json',
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        uin: 0,
        platform: 'h5',
        needNewCode: 1,
        _: 1533696209982
      }
      getAxios('/bannerApi', '/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg', data).then((res) => {
        if (res.data.code === SUCCESS_CODE) this.bannerList = res.data.data.slider
      })
    },
    getNewMusicList () {
      const p = { "comm": { "ct": 24 }, "category": { "method": "get_hot_category", "param": { "qq": "" }, "module": "music.web_category_svr" }, "recomPlaylist": { "method": "get_hot_recommend", "param": { "async": 1, "cmd": 2 }, "module": "playlist.HotRecommendServer" }, "playlist": { "method": "get_playlist_by_category", "param": { "id": 8, "curPage": 1, "size": 40, "order": 5, "titleid": 8 }, "module": "playlist.PlayListPlazaServer" }, "new_song": { "module": "QQMusic.MusichallServer", "method": "GetNewSong", "param": { "type": 0 } }, "new_album": { "module": "music.web_album_library", "method": "get_album_by_tags", "param": { "area": 1, "company": -1, "genre": -1, "type": -1, "year": -1, "sort": 2, "get_tags": 1, "sin": 0, "num": 40, "click_albumid": 0 } }, "toplist": { "module": "music.web_toplist_svr", "method": "get_toplist_index", "param": {} }, "focus": { "module": "QQMusic.MusichallServer", "method": "GetFocus", "param": {} } }
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
      getAxios('/recommendApi', '/cgi-bin/musicu.fcg', data).then((res) => {
        if (res.data.code === SUCCESS_CODE) {
          this.recommendList = res.data.recomPlaylist.data.v_hot
          this.recommendList6 = this.recommendList.slice(0, 6)
          this.newMusicList = res.data.new_song.data.song_list
        }
      })
    },
    ...mapMutations({
      setRecommend: 'SET_RECOMMEND',
      setRecommendItem: 'SET_RECOMMENDITEM'
    })
  },
  components: {
    Slider,
    RecommendList,
    NewList,
    Loading
  }
}
</script>

<style lang="scss">
.recommend {
  margin-top: 105px;
  .swiper-wrapper {
    .swiper-slide {
      img {
        width: 100%;
        height: auto;
      }
    }
  }
}
</style>



