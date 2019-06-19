// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const rp = require('request-promise')

// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()

  return rp('https://v1.itooi.cn/tencent/songList/hot?&orderType=' + event.orderType + '&pageSize=' + event.pageSize + '&page=' + event.page).then(html => {
    return html
  }).catch(err => {
    return err
  })
}