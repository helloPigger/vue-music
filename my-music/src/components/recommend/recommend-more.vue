<template>
  <div :class="$style.recom_more" v-show="showRecoMore">
    <h2><i class="iconfont icon-zuo" @click="back"></i>为你推荐</h2>  
      <scroll :songs="recommend" :data="recommend">
        <div :class="$style.container">
          <div v-for="(item, index) in recommend" :class="$style.item" :key=index @click="recomMoreList(item)">
            <img v-lazy="item.cover">
            <span :class="$style.num">
              {{getListenNumber(item.listen_num)}}
              <span class="iconfont icon-erji" :class="$style.icon"></span>
            </span>
            <p :class="$style.title">{{item.title}}</p>
          </div>
        </div>
      </scroll>
    <loading v-show="!recommend.length"/>
    </div>
</template>

<script>
import Loading from '@/common/loading/loading'
import { mapMutations, mapGetters } from 'vuex'
import Scroll from '@/common/scroll/scroll'

export default {
  methods: {
    getListenNumber (num) {
      if (Number(num) >= 100000) {
        return (Number(num) * 0.0001).toFixed(1) + "万"
      } else {
        return num
      }
    },
    back () {
      this.setShowRecoMore(false)
      this.$router.push('/recommend')
    },
    recomMoreList (item) {
      this.$router.push({
        path: `/recommend/${item.content_id}`
      })
      this.setRecommendItem(item)
    },
    ...mapMutations({
      setRecommendItem: 'SET_RECOMMENDITEM',
      setShowRecoMore: 'SET_SHOW_RECOMORE'

    })
  },
  components: {
    Loading,
    Scroll
  },
  computed: {
    ...mapGetters([
      'recommend',
      'showRecoMore'
    ])
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
  padding-bottom: 20px;

  h2 {
    height: 40px;
    line-height: 40px;
    color: #fff;
    font-size: 17px;
    background-color: #fe666d;
  }
  .container {
    @include flex($wrap: wrap);
    // margin-top: 10px;
    .item {
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
        .icon {
          position: absolute;
          left: -20px;
          top: -1px;
          padding: 0;
        }
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
