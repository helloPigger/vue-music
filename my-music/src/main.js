import Vue from 'vue'
import App from './App'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import store from './store'
import "@/common/scss/reset.scss"
import "@/assets/iconfont/iconfont.css"
import 'swiper/dist/css/swiper.css'


Vue.config.productionTip = false
FastClick.attach(document.body)
Vue.use(VueAwesomeSwiper)
Vue.use(VueLazyload, {
  // preLoad: 1.3,
  loading: "/static/img/img-default.png"
  // attempt: 1
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
