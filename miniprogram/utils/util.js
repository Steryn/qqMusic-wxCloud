const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const formatMinute = time => {
  let minute = parseInt(time / 60);
  let second = time % 60
  second < 10 ? second = '0' + second : second;
  return minute + ':' + second
}
module.exports = {
  formatTime,
  formatMinute
}