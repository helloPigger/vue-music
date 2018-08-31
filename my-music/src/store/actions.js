//异步操作 或 一个动作时操作多个mutation

import mutationTypes from './mutation-types'

//点击被播放的列表时： 当前播放列表，播放状态改为播放，当前播放的index， 显示大播放器
export const clickPlayerItem = function ({ commit}, { playList, index }) {
  commit(mutationTypes.SET_PLAYLIST, playList)
  commit(mutationTypes.SET_PLAYINDEX, index)
  commit(mutationTypes.SET_PLAYING, true)
  commit(mutationTypes.SET_SHOW_BINGPLAYER, true)
}