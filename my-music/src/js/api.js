import axios from 'axios'
import jsonp from 'jsonp'
export const SUCCESS_CODE = 0

export function getAxios (baseURL, url, data, callback) {
  return axios({
    method: 'get',
    baseURL: baseURL,
    url: url + (url.indexOf('?') < 0 ? '?' : '&') + param(data)
  }).then((res) => {
    return Promise.resolve(res)
  }).catch((err) => {
    console.log(err)
  })
}



// export function postApi () {
//   axios({
//     method: 'get',
//     baseURL: '/bannerApi',
//     url: '/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1533613038972'
//   }).then((res) => {
//     if (res.data.code === SUCCESS_CODE) return res.data.data.slider
//   }).catch((err) => {
//     console.log(err)
//   })
// }

export function getJsonp (url, data, option) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
  return new Promise((resolve, reject) => {
    jsonp(url, option, (err, res) => {
      if (!err) {
        resolve(res)
      } else {
        reject(err)
      }
    })
  })
}

//host 与 referer不一致导致无效的接口
export function getSongList (id) {
  const url = '/getSongList'
  const data = {
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    disstid: id,
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0,
    g_tk: 5381,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0
  }

  return axios({
    method: 'get',
    url: url,
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    console.log(err)
  })
}


function param (data) {
  let url = ''
  for (let i in data) {
    let value = data[i] !== undefined ? data[i] : ''
    url += `&${i}=${encodeURIComponent(value)}`
  }
  return url ? url.substring(1) : ''
}