export const recommend = state => state.recommend
export const recommendItem = state => state.recommendItem
export const rankGuanFang = state => state.rankGuanFang

export const playing = state => state.playing
export const playMode = state => state.playMode
export const playList = state => state.playList
export const playIndex = state => state.playIndex
export const showBigPlayer = state => state.showBigPlayer
export const showRecoMore = state => state.showRecoMore
export const playSong = state => {
  return state.playList[state.playIndex] || {}//不是最基础数据，不用放在state.js
}


