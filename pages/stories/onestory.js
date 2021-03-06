const app = getApp()

Page({
  data: {
    dog: [],
    currentUser: null,
    canIUseGetUserProfile: false,
    hasUserInfo: false,
    swiperList: [],
    activeSwiper: 0
  },

  onLoad: function (options) {
    this.setData({
      currentUser: app.globalData.userInfo
    })

    const self = this
    let Dogs = new wx.BaaS.TableObject
    ('adogtion_success_stories')

    Dogs.get(options.id).then(
      (res) => {
        console.log('dog success id', res)
        self.setData ({
          dog: res.data
        })
        let gallery = res.data.gallery
      for (let i = 0; i < gallery.length; i +=1) {
        let imagePath = gallery[i].path
        let swiperList = self.data.swiperList
        swiperList.push(imagePath)
        self.setData ({
          swiperList: this.data.swiperList
        })
      }
      },
      (err) => {
        console.log('error', err)
      }
    )
    },

  swiperChange(e){
    // console.log("changed", e.detail.current)
    this.setData({
      activeSwiper: e.detail.current
    })
  },

  

  goBack(e) {
    console.log("back", e)
    wx.navigateBack({
      delta: 1,
    })
  },


})