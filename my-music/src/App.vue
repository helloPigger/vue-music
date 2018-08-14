<template>
  <div id="app">
    <m-header/>
    <tabs/>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import MHeader from '@/components/m-header/m-header'
import Tabs from '@/components/tabs/tabs'

export default {
  name: 'App',
  components: {
    MHeader,
    Tabs
  }
}
</script>

<style>
#app {
}
</style>
