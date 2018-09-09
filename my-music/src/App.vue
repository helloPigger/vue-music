<template>
  <div id="app">
    <m-header/>
    <tabs/>
    <keep-alive><router-view/></keep-alive>
    <recommend-more/>
    <player/>
  </div>
</template>

<script>
import MHeader from '@/components/m-header/m-header'
import Tabs from '@/components/tabs/tabs'
import RecommendMore from '@/components/recommend/recommend-more'
import Player from '@/components/player/player'

export default {
  name: 'App',
  components: {
    MHeader,
    Tabs,
    Player,
    RecommendMore
  }
}
</script>

<style>
#app {
}
</style>
