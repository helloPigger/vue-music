<template>
  <swiper :options="swiperOption">
    <!-- <swiper-slide v-for="(item,index) in sliderList" :key=index> -->
    <swiper-slide v-for="(item,index) in items" :key=index>
      <router-link :to="{name: item.linkUrl}">
        <img :src="item.picUrl">
      </router-link>
    </swiper-slide>
    <div class="swiper-pagination"  slot="pagination" v-if="swiperOption.pagination"></div>
  </swiper>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  props: {
    items: {
      type: Array,
      default () {
        return []
      }
    },
    swiperOption: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  components: {
    swiper,
    swiperSlide
  }

}
</script>

<style lang="scss">
</style>
