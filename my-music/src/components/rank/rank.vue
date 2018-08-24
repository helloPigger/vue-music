<template>
  <div :class="$style.rank" class="rank" v-if="rankName.length">
    <div :class="$style.guanfang_list">
      <h2 :class="$style.title">官方榜</h2>
      <div :class="$style.container">
        <ul>
          <li v-for="(item, index) in rankName[0].List" :key=index :class="$style.item" @click="guanfangList(item)">
            <div :class="$style.image">
              <img v-lazy="item.MacListPicUrl">
            </div>
            <div :class="$style.text" >
              <h2 v-for="(value,index1) in item.songlist" :key="index1">{{getThreeSongs(value)}}</h2>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div :class="$style.quanqiu_list">
    <h2>{{rankName[1].GroupName}}</h2>  
    <div :class="$style.container">
      <div v-for="(item, index) in rankName[1].List" :key=index @click="quanqiuList(item)">
        <img v-lazy="item.MacListPicUrl">
        <p :class="$style.title">{{item.ListName}}</p>
      </div>
    </div>
   </div>
    <router-view/>
  </div>
</template>

<script>
import { getJsonp } from '@/js/api'
import { getAxios, SUCCESS_CODE } from '@/js/api'
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      rankName: []
    }
  },
  created () {
    this.getRankName()
  },
  methods: {
    guanfangList (item) {
      this.$router.push({
        path: `/rank/${item.topID}`
      })
      this.SET_RANKGF(item)

      if (item.topID === 201) { console.log('mv接口单独处理') }
    },
    quanqiuList () {
      console.log('跳转到列表')
    },
    getThreeSongs (value) {
      return `${value.songname}-${value.singername}`
    },
    getRankName () {
      const data = {
        page: 'index',
        format: 'html',
        tpl: 'macv4',
        v8debug: 1
      }
      const option = {
        param: 'jsonCallback',
        prefix: 'jsonCallback'
      }
      getJsonp('https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_opt.fcg', data, option).then((res) => {
        this.rankName = res
      })
    },
    ...mapMutations({
      SET_RANKGF: 'SET_RANKGF'
    })
  },

  components: {

  }
}
</script>

<style lang="scss" module>
@import "@/common/scss/mixin.scss";
@import "@/common/scss/variable.scss";
.rank {
  margin-top: 105px;
  .guanfang_list {
    padding-top: 20px;
    .title {
      @include title();
    }
    .container {
      .item {
        @include flex($justify: flex-start);
        padding: 6px 0 6px 10px;
        border-bottom: 1px solid #ddd;
        position: relative;
        .image {
          width: 30%;
          img {
            height: auto;
            width: 100%;
            vertical-align: middle;
          }
        }
        .text {
          padding-left: 10px;
          width: 70%;
          h2 {
            @include nowrap();
            font-size: 13px;
            height: 24px;
            line-height: 24px;
          }
        }
      }
    }
  }
  .quanqiu_list {
    padding-top: 20px;
    h2 {
      @include title();
      .icon_you {
        color: #999;
      }
    }
    .container {
      @include flex($wrap: wrap);
      justify-content: flex-start;
      padding: 0 10px;

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
        .title {
          @include nowraps();
          padding: 6px 2px 0 6px;
          line-height: 1.2;
          font-size: 13px;
        }
      }
    }
  }
}
</style>
