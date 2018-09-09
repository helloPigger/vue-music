<template>
    <swiper :options="swiperOption"  v-if="songs.length" @slider-move="touchmove">
      <swiper-slide class="content">
        <slot/>
      </swiper-slide>
    </swiper>
</template>

<script>
export default {
  props: {
    songs: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      swiperOption: {
        direction: 'vertical',
        slidesPerView: 'auto',
        freeMode: true
      }
    }
  },
  methods: {
    touchmove (e) {
      this.$emit('scroll', e)
    }
  }
}
</script>

<style lang="scss">
.swiper-container {
  height: 100%;
  .swiper-slide.content {
    height: auto;
  }
}
</style>