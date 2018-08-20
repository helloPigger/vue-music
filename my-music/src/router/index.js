import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '@/components/recommend/recommend'
import RecommendMore from '@/components/recommend/recommend-more'
import RecommendDetail from '@/components/recommend/recommend-detail'

import HotRank from '@/components/hot-rank/hot-rank'
import Search from '@/components/search/search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      name: 'Recommend',
      component: Recommend,
      children: [
        {
          path: 'recommendMore',
          component: RecommendMore,
        },
        {
          path: ':id',
          component: RecommendDetail
        }
      ]
    },
    {
      path: '/hot-rank',
      name: 'HotRank',
      component: HotRank
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    }
  ]
})
