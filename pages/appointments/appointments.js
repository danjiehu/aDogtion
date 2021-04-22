
Page({
  data: {

  },

  onLoad: function (options) {

  },

  onReady: function () {

  },

  
  onShow: function () {

  },

  goBack(e) {
    console.log("back", e)
    wx.navigateBack({
      delta: 1,
    })
  },

})