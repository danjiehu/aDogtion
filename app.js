// app.js
let config = require('./key')
App({
  onLaunch() {
    wx.BaaS = requirePlugin('sdkPlugin')
    wx.BaaS.wxExtend(wx.login, wx.getUserInfo, wx.requestPayment)
    wx.BaaS.init(config.appKey)
  },
  globalData: {
    userInfo: null
  }
})
