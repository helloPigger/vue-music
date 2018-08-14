<template>
  <div :class="$style.new_list">
    <h2 :class="$style.title">最新音乐</h2>
    <div :class="$style.container">
      <ul>
        <li v-for="(item, index) in items" :key=index :class="$style.item">
          <div :class="$style.image">
            <!-- <img :src="getImgSrc(item)"> -->
            <img v-lazy="getImgSrc(item)">
          </div>
          <div :class="$style.text">
            <h2>{{item.name}}</h2>
            <p>{{getSinger(item)}}</p>
          </div>
          <i class="iconfont icon-bofang" :class="$style.icon"></i>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    items: {
      tyoe: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    getImgSrc (item) {
      let src = item.album.mid
      return `//y.gtimg.cn/music/photo_new/T002R90x90M000${src}.jpg?max_age=2592000`
    },
    getSinger (item) {
      let singer = item.singer
      let singerName = ''
      for (let i = 0, length = singer.length; i < length; i++) {
        singerName += singer[i].name + " / "
        if (length === 1) singerName = singer[i].name
      }
      return singerName
    }
  }

}
</script>
<style lang="scss">
.iconfont {
  font-size: 20px;
  color: #999;
}
</style>

<style lang="scss" module>
@import "@/common/scss/mixin.scss";
.new_list {
  padding-top: 20px;
  .title {
    @include title();
  }
  .container {
    .item {
      @include flex($justify: flex-start);
      height: 60px;
      padding: 6px 0 6px 10px;
      border-bottom: 1px solid #ddd;
      position: relative;
      .image {
        img {
          height: 100%;
          width: auto;
        }
      }
      .text {
        padding-left: 10px;
        width: 70%;
        h2 {
          @include nowrap();
          font-size: 15px;
          height: 28px;
          line-height: 28px;
        }
        p {
          @include nowrap();
          font-size: 12px;
          color: #888;
        }
      }
      .icon {
        position: absolute;
        top: 20px;
        right: 14px;
      }
    }
  }
}
</style>
