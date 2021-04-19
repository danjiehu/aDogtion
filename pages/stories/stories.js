const app = getApp()

Page({

  data: {
    dog: [],
    currentUser: null,
  },

  onLoad: function (options) {
    this.setData({
      currentUser: app.globalData.userInfo
    })

    const self = this
    let Dogs = new wx.BaaS.TableObject('adogtion_success_stories')
    
    Dogs.find().then(
      (res) => {
        console.log('success dog id', res)
        self.setData ({
          dog: res.data
        })
        // console.log(res.data)
        let gallery = res.data.image
        // console.log('gallery', gallery)
      },
      (err) => {
        console.log('error', err)
      }
    )
  },

  goBack(e) {
    console.log("back", e)
    wx.navigateBack({
      delta: 1,
    })
  }

})