// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
var rp = require('request-promise')

// 云函数入口函数
exports.main = async(event, context) => {
  console.log(event)
  let res = rp('https://v1.itooi.cn/tencent/topList?id=' + event.id + '&pageSize=' + event.pageSize + '&page=' + event.page + '&format=1').then(html => {
    return html
  }).catch(err => {
    console.log(err)
  })
  return res
}