import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '@/components/recommend/recommend'
import RecommendMore from '@/components/recommend/recommend-more'
import RecommendDetail from '@/components/recommend/recommend-detail'

import Rank from '@/components/rank/rank'
import RankDetail from '@/components/rank/rank-detail'
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
      path: '/rank',
      name: 'Rank',
      component: Rank,
      children: [
        {
          path: ':topId',
          component: RankDetail
        }
      ]
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    }
  ]
})
