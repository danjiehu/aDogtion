// pages/welcome/welcome.js
Page({

  data: {
    swiperList: [
      {
        image: "",
        subtitle: "Hawoof!",
        title: "Welcome to aDogtion",
        description: "We are The Haven Shelter in Anhui province, and we have over 200 dogs. All these dogs need is a little love."
      }
    ],
    activeSwiper: 0,
  },

  onLoad: function (options) {
    const self = this
    if (wx.getUserProfile) {
      self.setData({
        canIUseGetUserProfile: true
      })
    }
    wx.getStorage({
      key: 'userInfo',
      success: res=>{
        console.log(res)
        self.setData({
          currentUser: res.data,
          hasUserInfo: true
        })
      }
    })
  },

  swiperChange(e){
    // console.log("changed", e.detail.current)
    this.setData({
      activeSwiper: e.detail.current
    })
  },

  navigateToHome: function() {
    wx.navigateTo({
      url: '/pages/index/index'
    })
    console.log('navigate')
  }
})