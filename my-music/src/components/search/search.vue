<template>
  <div :class="$style.search" class="search">
    <div :class="$style.search_input">
      <input placeholder="请输入歌名、歌手" v-model="text"/>
      <i @click="clear" class="iconfont icon-shanchudelete30" :class="$style.icon" v-show="text"></i>
    </div>
    <div :class="$style.hotkey" v-show="!text">
      <h2>热门搜索</h2>
      <ul>
        <li v-for="(item,index) in hotkey" :key=index :class="$style.item" @click="addText(item.k)">{{item.k}} </li>
      </ul>
    </div>
    <div :class="$style.seatch_result" v-show="text">
      <song-list :items="hotResult" :sign="sign" @playerItem="playerItem"/>
    </div>
  </div>
</template>
<script>

import { getAxios, SUCCESS_CODE, getSearchResult } from '@/js/api'
import SongList from '@/components/song-list/song-list'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      text: "",
      hotkey: [],
      hotResult: [],
      sign: false
    }
  },
  created () {
    this.getHotKeyList()
  },
  methods: {
    clear () {
      this.text = ""
    },
    addText (item) {
      this.text = item
    },
    playerItem (index) {
      this.clickPlayerItem({
        playList: this.hotResult,
        index: index
      })
    },
    getHotKeyList () {
      const data = {
        g_tk: 5381,
        notice: 0,
        uin: 0,
        format: 'json',
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        platform: 'h5',
        needNewCode: 1
      }
      getAxios('/bannerApi', '/splcloud/fcgi-bin/gethotkey.fcg', data).then((res) => {
        if (res.data.code === SUCCESS_CODE)
          this.hotkey = res.data.data.hotkey.slice(0, 8)
      })
    },
    searchResult (newText) {
      let result = []
      getSearchResult(newText).then((res) => {
        if (res.code === SUCCESS_CODE) {
          this.hotResult = res.data.song.list
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
  watch: {
    text (newText) {
      this.searchResult(newText)//监听搜索框内容发生变化时，执行searchResult()，调搜索接口
    }
  }
}
</script>



<style lang="scss" module>
@import "@/common/scss/mixin.scss";
@import "@/common/scss/variable.scss";

.search {
  position: fixed;
  width: 100%;
  top: 105px;
  bottom: 0;
  padding: 0 10px;
  .search_input {
    @include flex();
    border-bottom: 1px solid $theme-color;
    margin-top: 10px;
    input {
      width: 100%;
      height: 30px;
      border: none;
      outline: none;
      background: $bg-color;
    }
    .icon {
      font-size: 20px;
      color: $theme-color;
      padding: 0;
    }
  }
  .hotkey {
    margin: 10px;
    h2 {
      margin-bottom: 10px;
      font-size: 14px;
      color: #666;
    }
    .item {
      display: inline-block;
      padding: 4px 6px;
      margin: 0 10px 10px 0;
      border-radius: 6px;
      border: 1px solid #666;
      font-size: 13px;
    }
  }
  .seatch_result {
    position: absolute;
    width: 94%;
    height: 100%;
    & > div {
      position: absolute;
      background: $bg-color;
      ul {
        padding-bottom: 100px;
        li {
          // &:first-child {
          //   display: none;
          // }
        }
      }
    }
  }
}
</style>

