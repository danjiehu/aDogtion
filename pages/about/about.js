// pages/dog/dog.js
const app = getApp()

Page({
  data: {
    currentUser: null,
    canIUseGetUserProfile: false,
    hasUserInfo: false,
    images: ['https://cloud-minapp-39668.cloud.ifanrusercontent.com/1lYSDLOOJq8xnW4Z.jpg', 'https://cloud-minapp-39668.cloud.ifanrusercontent.com/1lYT7KRqs8OpXnl7.jpg', 'https://cloud-minapp-39668.cloud.ifanrusercontent.com/1lYT7KfH12wShO4G.jpg', 'https://cloud-minapp-39668.cloud.ifanrusercontent.com/1lYT7KCQAvrmNcfx.jpg'],
    activeSwiper: 0
  },

  onLoad: function (options) {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    wx.getStorage({
      key: 'userInfo',
      success: res=>{
        this.setData({
          currentUser: res.data,
          hasUserInfo: true
        })
      }
    })

    this.setData({
      currentUser: app.globalData.userInfo
    })
  },

  goBack(e) {
    console.log("back", e)
    wx.navigateBack({
      delta: 1,
    })
  },

  swiperChange(e){
    console.log("changed", e.detail.current)
    this.setData({
      activeSwiper: e.detail.current
    })
  }
})