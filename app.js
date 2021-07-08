// app.js
let config = require('./key')
App({
  onLaunch() {
    wx.BaaS = requirePlugin('sdkPlugin')
    wx.BaaS.wxExtend(wx.login, wx.getUserInfo, wx.requestPayment)
    wx.BaaS.init(config.appKey)

    wx.BaaS.auth.loginWithWechat().then(res => {
      // 静默获取openid等基础信息
      console.log("user ids",res)
      // page.setData({
      //   userId: res.id
      // })
      // this.getFavourites()
      wx.setStorageSync('userId', res.id)
      getApp().globalData.userId = res.id
      console.log("set storage id success",res)
    }, err => {
      // 静默获取openid等基础信息失败
    })
  },
  globalData: {
    userInfo: null
  }
})
