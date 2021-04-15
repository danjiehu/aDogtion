// pages/dog/dog.js
const app = getApp()

Page({
  data: {
    swiperList: [],
    activeSwiper: 0,
    dog: [],
    currentUser: null
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
        let gallery = res.data.image
        // console.log('gallery', gallery)
       for (let i = 0; i < gallery.length; i +=1) {
        let imagePath = gallery[i].path
        let swiperList = self.data.swiperList
        swiperList.push(imagePath)
        // console.log(self.data.swiperList)
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
  }

})