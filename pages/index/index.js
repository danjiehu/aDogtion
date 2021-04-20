// pages/index/index.js
const app = getApp()

Page({
  data: {
    activeTab: 0,
    // for the dogs tab\
    adopt: false,
    foster: false,
    currentUser: null,
    canIUseGetUserProfile: false,
    hasUserInfo: false,
    selected_dogs: []
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
        console.log('user info', res)
        self.setData({
          currentUser: res.data,
          hasUserInfo: true
        }, ()=>{
          // self.getFavourites()
        })
      }
    })
  },

  haveUserInfo(e){
    console.log("has user info e")
  },

  changeTab(e){
    this.setData({
      activeTab: e.detail
    })
  },

  toAdoptDogs(e){
    this.setData({
      activeTab: 1
    })
    this.setData({
      foster: false,
      adopt: true
    })
  },

  toFosterDogs(e){
    this.setData({
      activeTab: 1
    })
    this.setData({
      foster: true,
      adopt: false
    })
  },

  
  
})