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
    favourite: []
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

    // let Favourites = new wx.BaaS.TableObject('adogtion_favourites')
    // let userQuery = new wx.BaaS.Query();
    // let user = this.data.currentUser
    // console.log('user', user)
    // userQuery.compare('user_id', '=', user.id)
    // let dogQuery = new wx.BaaS.Query();
    // let dog = this.data.dog
    // console.log('dog', dog)
    // dogQuery.compare('dog_id', '=', dog.id)
    // let andQuery = wx.BaaS.Query.and(query1, query2)
    // Favourites.setQuery(andQuery).find().then(
    //   (res) => {
    //     self.setData({
    //       favourite: res.data.objects
    //     })
    //     console.log('like turned to true!', res)
    //   },
    //   (err) => {
    //     console.log('err', err)
    //   }
    // )
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
  }
  
})