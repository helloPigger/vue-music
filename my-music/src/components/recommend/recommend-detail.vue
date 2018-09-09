<template>
  <div :class="$style.recommend_detail" class="recommend_detail">
    <song-list :items="recomDetailList" :number="totalNumber" :sign="sign" @back=back @playerItem="playerItem">
      <div :class="$style.top">
        <h2 :class="$style.title"><i class="iconfont icon-zuo"  @click="back"></i>歌单</h2> 
        <div :class="$style.bg">
          <img :src="recommendItem.cover">
          <p>{{recommendItem.title}}</p>
        </div>
      </div>
    </song-list>
  </div>
</template>
<script>
import NewList from '@/components/recommend/new-list'
import { getAxios, getSongList, SUCCESS_CODE } from '@/js/api'
import { mapGetters, mapActions } from 'vuex'
import SongList from '@/components/song-list/song-list'

export default {
  data () {
    return {
      recomDetailList: [],
      totalNumber: 0,
      sign: false
    }
  },
  created () {
    this.getRecommendSongList()
  },
  methods: {
    back () {
      this.$router.push({
        path: `/recommend/`
      })
    },
    getRecommendSongList () {
      if (!this.recommendItem.content_id) {
        return
      }
      getSongList(this.recommendItem.content_id).then((res) => {
        if (res.code === SUCCESS_CODE) {
          this.recomDetailList = res.cdlist[0].songlist
          this.totalNumber = res.cdlist[0].songnum
        }
      })
    },
    playerItem (index) {
      this.clickPlayerItem({
        playList: this.recomDetailList,
        index: index
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
    ...mapGetters([
      'recommendItem'
    ])
  }
}

</script>


<style lang="scss" module>
@import "@/common/scss/mixin.scss";
@import "@/common/scss/variable.scss";
.recommend_detail {
  // position: fixed;
  // top: 0;
  // left: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
  z-index: 200;
  .top {
    background-color: $theme-color;
    .title {
      height: 40px;
      line-height: 40px;
      color: #fff;
      font-size: 17px;
    }
    .bg {
      @include flex();
      align-items: center;
      padding: 10px 10px 20px 10px;
      img {
        width: 90px;
        height: auto;
      }
      p {
        padding-left: 20px;
        color: #fff;
        font-weight: 300;
        font-size: 14px;
      }
    }
  }
}
</style>
