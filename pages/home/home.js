// pages/home/home.js
const app = getApp()

Page({

  data: {
    dogs: [],
    currentUser: null
  },

  onLoad: function (options) {
    this.setData({
      currentUser: app.globalData.userInfo
    })

    const self = this
    let Dogs = new wx.BaaS.TableObject('adogtion_dogs')

    Dogs.find().then(
      (res) => { 
        console.log('Dogs have been loaded',res)
        self.setData({
          dogs: res.data.objects
        })
      }, (err) => {
        console.log('dogs failed failed',err)
      }
    )
  },

  navigateToDog: function(e) {
    console.log('calling a dog', e)
    wx.navigateTo({
      url: `/pages/dog/dog?id=${e.currentTarget.dataset.id}`,
    })
  },

  navigateToDogs: function(e) {
    console.log('calling all dogs', e)
    wx.navigateTo({
      url: '/pages/dogs/dogs',
    })
  }

})