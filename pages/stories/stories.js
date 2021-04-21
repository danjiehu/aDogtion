const app = getApp()

Page({
  data: {
    dogs: [],
    currentUser: null,
    canIUseGetUserProfile: false,
    hasUserInfo: false,
  },

  onLoad: function (options) {
    this.setData({
      currentUser: app.globalData.userInfo
    })
    const self = this
    let Dogs = new wx.BaaS.TableObject('adogtion_success_stories')
    Dogs.find().then(
      (res) => { 
        self.setData({
          dogs: res.data.objects.reverse()
        })
      }, (err) => {
        console.log('dogs failed',err)
      }
    )
  },

  navigateToDog: function(e) {
    console.log('calling a success dog', e)
    wx.navigateTo({
      url: `/pages/stories/onestory?id=${e.currentTarget.dataset.id}`,
    })
  },

  goBack(e) {
    console.log("back", e)
    wx.navigateBack({
      delta: 1,
    })
  },


})