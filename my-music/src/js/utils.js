export function timestampToDate (timestamp) {
  var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = date.getDate() + ' ';
  var h = date.getHours() + ':';
  var m = date.getMinutes() + ':';
  var s = date.getSeconds();
  // return Y + M + D + h + m + s;
  return Y + M + D;
}

export function getSinger (item, albumname) {
  let singer = item.singer || item.data.singer
  let singerName = ''
  let lastSingerName = ''
  for (let i = 0, length = singer.length; i < length; i++) {
    if (i < length - 1) singerName += singer[i].name + " / "
    if (i === length - 1) lastSingerName = singer[i].name
  }
  singerName += lastSingerName
  if (albumname) return item.albumname || item.data.albumname + " - " + singerName
  else return singerName

}