// pages/contact/contact.js
const app = getApp()

Page({

  data: {
    dog: []
  },

  onLoad: function (options) {
    this.setData({
      currentUser: app.globalData.userInfo
    })

    let Dogs = new wx.BaaS.TableObject('adogtion_dogs')
    
    const self = this
    Dogs.get(options.id).then(
      (res) => {
        console.log('dog id', res)
        self.setData ({
          dog: res.data
        })
        // console.log(res.data)
        let image = res.data.image[0].path
      },
      (err) => {
        console.log('error', err)
      }
    )
  },
  
  onShow: function () {

  },

  navigateToSuccess: function(e) {
    console.log('going to success', e)
    wx.navigateTo({
      url: `/pages/bookSuccess/bookSuccess?id=${this.data.dog.id}`,
    })
  }
})