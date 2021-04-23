// pages/dog/dog.js
const app = getApp()

Page({
  data: {
    currentUser: null,
    canIUseGetUserProfile: false,
    hasUserInfo: false,
    images: ['https://cloud-minapp-39668.cloud.ifanrusercontent.com/1lZxOhrrJTW93My9.jpg', 'https://cloud-minapp-39668.cloud.ifanrusercontent.com/1lZxOhr7KPaBVeLA.jpg', 'https://cloud-minapp-39668.cloud.ifanrusercontent.com/1lZxOhml4S2d1QXV.jpg','https://cloud-minapp-39668.cloud.ifanrusercontent.com/1lYUgyCg6xV96EWD.JPG', 'https://cloud-minapp-39668.cloud.ifanrusercontent.com/1lYUgxFnPeYG1XLS.JPG', 'https://cloud-minapp-39668.cloud.ifanrusercontent.com/1lYUgyZ0bhUmyQyG.JPG'],
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