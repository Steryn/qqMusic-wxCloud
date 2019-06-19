const db = wx.cloud.database()
const iACt = wx.createInnerAudioContext()
iACt.autoplay = true
Page({
  data: {
    id: '',
    songDetail: {},
    active: false,
    progress: 0,
    play: true
  },

  onLoad: function(options) {
    this.setData({
      id: options.id
    })
    this.getSongDetail();
    this.getPlay();
    this.getLrc();
  },

  onReady: function() {},
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {
    iACt.destory()
  },
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
  onShareAppMessage: function() {},

  like: function() {
    const _likeSong = db.collection('likeSong');
    _likeSong.where({
      'songDetail.id': this.data.songDetail.id
    }).get({
      success: res => {
        console.log(res)
        if (res.data.length === 0) {
          _likeSong.add({
            data: {
              due: new Date("2018-09-01"),
              songDetail: this.data.songDetail,
            },
            success: function(res) {
              console.log(res)
            }
          })
        }
      },
      fail: console.err
    })

  },

  getSongDetail: function() {
    wx.cloud.callFunction({
      name: "songDetail",
      data: {
        id: this.data.id
      },
      success: res => {
        this.setData({
          songDetail: JSON.parse(res.result).data[0]
        })
        console.log(JSON.parse(res.result).data[0])
      },
      fail: console.err
    })
  },
  getPlay: function() {
    // wx.request({
    //   url: 'https://v1.itooi.cn/tencent/url?id='+this.data.id+'&quality=128',
    // })
    iACt.src = 'https://v1.itooi.cn/tencent/url?id=' + this.data.id + '&quality=128';
    iACt.startTime = 50;
    iACt.onPlay(() => {
      console.log('开始播放' + iACt.duration + iACt.currentTime)
      this.isActive(true)
    })
    setInterval(() => {
      this.setData({
        progress: iACt.currentTime * 100 / iACt.duration
      })
    }, 1000)
    iACt.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
  },

  // 暂停or播放
  playOrStop: function() {
    if (iACt.paused) {
      iACt.play();
      this.isActive(true);
      console.log('继续播放')
    } else {
      iACt.pause();
      this.isActive(false);
      console.log('暂停')
    }
  },

  isActive: function(options) {
    this.setData({
      active: options
    })
  },

  getLrc: function() {
    wx.cloud.callFunction({
      name: "songLrc",
      data: {
        id: this.data.id
      },
      sunccess: res => {
        this.setData({
          songLrcl: JSON.parse(res.result).data
        })
      },
      fail: console.err
    })
  }
})