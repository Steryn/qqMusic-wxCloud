// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const rp = require('request-promise')

// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()
  return rp('https://v1.itooi.cn/tencent/banner').then(res => {
    return res
  }).catch(err => {
    console.log(err);
    return err
  })
}