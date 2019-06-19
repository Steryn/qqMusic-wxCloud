// miniprogram/pages/scanCode/scanCode.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.scanCode()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  scanCode: function(event) {
    wx.cloud.callFunction({
      name: 'bookinfo',
      data: {
        page: 0,
        pageSize: 20,
        id: 26
      }
    }).then(res => {
      console.log(JSON.parse(res.result))
      this.setData({
        listData: JSON.parse(res.result).data
      })
    }).catch(err => {
      console.log(err)
    })
  }
    
})