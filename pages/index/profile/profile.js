const app = getApp()

Component({
  properties: {
    currentUser: {
      type: Object
    },
    selected_dogs: {
      type: Array
    }
  },

  data: {
    dogs: [],
    currentUser: null,
    canIUseGetUserProfile: false,
    hasUserInfo: false,
    selected_dogs: []
  },

  ready: function (options) {
    console.log("im inside profile", !wx.getUserProfile)
    const self = this
    self.data.currentUser ? self.getFavourites() : ''
    if (wx.getUserProfile) {
      self.setData({
        canIUseGetUserProfile: true
      })
    }
    wx.getStorage({
      key: 'userInfo',
      success: res=>{
        console.log(res)
        self.setData({
          currentUser: res.data,
          hasUserInfo: true
        }, ()=>{
          // self.getFavourites()
        })
      }
    })

    // this.setData({
    //   currentUser: app.globalData.userInfo
    // })
    
  },

  methods: {
    getFavourites: function () {    
      let self = this
      // calling the baas to check if a user has this dog in favourites
      let Favourites = new wx.BaaS.TableObject('adogtion_favourites')
      // query, the user match
      let userQuery = new wx.BaaS.Query();
      userQuery.compare('user_id', "=", self.data.currentUser.id)
      console.log("checking ids", self.data.currentUser.id)
      Favourites.expand('dog_id').setQuery(userQuery).find().then(
        (res) => {
          self.setData({
            selected_dogs: res.data.objects
          })
          console.log('loaded dogs', self.data.selected_dogs)
        },
        (err) => {
          console.log('err', err)
        }
      )
    },

    getUserInfo(e) {
      getApp().globalData.userInfo = e.detail.userInfo
      // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    },

    getProfile(e) {
      console.log("getUserProfile", e)
      // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
      // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
      let self = this
      wx.getUserProfile({
        desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          let userInfo = res.userInfo
          wx.setStorageSync('userInfo', userInfo)
          getApp().globalData.userInfo = userInfo
          this.setData({
            currentUser: userInfo,
            hasUserInfo: true
          })
          wx.BaaS.auth.loginWithWechat(userInfo).then(
          (res) => {
            console.log('bass update', res);
            self.setData({currentUser: res});
            self.triggerEvent("haveUserInfo", res)
            self.getFavourites()
            wx.setStorageSync('userInfo', res)
          },
          err => {
            console.log('error!', err)
          }
         )
        }
      })
    },

    navigateToAbout: function(e) {
      wx.navigateTo({
        url: '/pages/about/about'
      })
      console.log('navigate to about')
    },
  
    navigateToStories: function(e) {
      wx.navigateTo({
        url: '/pages/stories/stories'
      })
      console.log('navigate to stories')
    },
    
    navigateToDogs: function(e) {
      console.log('see dogs button', e)
      this.triggerEvent("toAdoptDogs")
    },

    navigateToDog: function(e) {
      console.log('calling a dog', e)
      wx.navigateTo({
        url: `/pages/dog/dog?id=${e.currentTarget.dataset.id}`,
      })
    }
  }

})