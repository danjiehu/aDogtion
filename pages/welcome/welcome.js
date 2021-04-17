// pages/welcome/welcome.js
Page({

  data: {
  },

  onLoad: function (options) {
  },

  onShow: function () {
  },

  navigateToHome: function() {
    wx.navigateTo({
      url: '/pages/index/home/home'
    })
    console.log('navigate')
  }
})