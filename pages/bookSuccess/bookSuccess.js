// pages/bookSuccess/bookSuccess.js
const app = getApp()

Page({

  data: {
    // currentUser: wx.getStorageSync('userInfo'),
    dogProfile:{},
    dogId:null,
    formId:null
  },

  onLoad: function (e) {
    this.setData({
      dogId: e.dogId,
      formId: e.formId
    })

    let Dogs = new wx.BaaS.TableObject('adogtion_dogs')
    const page = this
    Dogs.get(e.dogId).then(
      (res) => {
        console.log('dog id', res)
        page.setData ({
          dogProfile: res.data
        })
      }
    )
  
  // end of onload
  },
  
  onShow: function () {

  },

  navigateToHome: function(e) {
    console.log('going to home', e)
    wx.navigateTo({
      url: `/pages/index/index`,
    })
  }
})