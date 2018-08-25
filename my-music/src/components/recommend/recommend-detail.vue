<template>
  <div class="recommend_detail">
    <song-list :items="recomDetailList" title="歌单" :number="totalNumber" :sign="sign" @back=back>
      <div :class="$style.top">
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
import { mapGetters } from 'vuex'
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
      this.$router.push('/recommend')
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


<style lang="scss" module>
@import "@/common/scss/mixin.scss";
@import "@/common/scss/variable.scss";
.top {
  background-color: $theme-color;
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
</style>
