import mutationTypes from './mutation-types'

const mutations = {
  [mutationTypes.SET_RECOMMEND] (state, newRecommend) {
    state.recommend = newRecommend
  },
  [mutationTypes.SET_RECOMMENDITEM] (state, newRecommendItem) {
    state.recommendItem = newRecommendItem
  }
}

export default mutations