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
  },

  [mutationTypes.SET_PLAYING] (state, boolean) {
    state.playing = boolean
  },
  [mutationTypes.SET_PLAYMODE] (state, list) {
    state.playMode = list
  },
  [mutationTypes.SET_PLAYLIST] (state, list) {
    state.playList = list
  },
  [mutationTypes.SET_PLAYINDEX] (state, index) {
    state.playIndex = index
  },
  [mutationTypes.SET_SHOW_BINGPLAYER] (state, boolean) {
    state.showBigPlayer = boolean
  }
}

export default mutations