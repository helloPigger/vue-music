import mutationTypes from './mutation-types'

const mutations = {
  [mutationTypes.SET_RECOMMEND] (state, list) {
    state.recommend = list
  },
  [mutationTypes.SET_RECOMMENDITEM] (state, list) {
    state.recommendItem = list
  },
  [mutationTypes.SET_RANKGF] (state, list) {
    state.rankGuanFang = list
  }
}

export default mutations