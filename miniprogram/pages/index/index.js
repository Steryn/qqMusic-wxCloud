//index.js
const app = getApp()
let utils = require("../../utils/util.js");

Page({
  data: {
    banner: [], //banner
    hotsong: [], //热门歌单
    topList: [], //推荐歌曲,排行榜
  },

  onLoad: function() {
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           this.setData({
    //             avatarUrl: res.userInfo.avatarUrl,
    //             userInfo: res.userInfo
    //           })
    //         }
    //       })
    //     }
    //   }
    // })
    this.getBanner();
    this.getHot();
    this.getTopList();
  },

  toPlaySong: function(options) {
    wx.navigateTo({
      url: '/pages/play/play?id=' + options.currentTarget.dataset.id,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  // 首页轮播图
  getBanner: function() {
    wx.cloud.callFunction({
      name: 'banner',
      data: {},
      success: (res) => {
        console.log(JSON.parse(res.result).data)
        this.setData({
          banner: JSON.parse(res.result).data
        })
      },
      fail: console.err
    })
  },
  getHot: function() {
    wx.cloud.callFunction({
      name: 'hotsong',
      data: {
        orderType: 'hot',
        pageSize: 8,
        page: 0
      },
      success: (res) => {
        console.log(JSON.parse(res.result))
        this.setData({
          hotsong: JSON.parse(res.result).data.list
        })
      },
      fail: console.err
    })
  },
  // 获取排行榜
  getTopList: function() {
    wx.cloud.callFunction({
      name: 'bookinfo',
      data: {
        page: 0,
        pageSize: 20,
        id: 26
      },
      success: (res) => {
        console.log(JSON.parse(res.result))
        this.setData({
          topList: JSON.parse(res.result).data.map(item => {
            item.time = utils.formatMinute(item.time)
            return item
          })
        })
        console.log(this.data.topList)
      },
      fail: console.err
    })
  }
})