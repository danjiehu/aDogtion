const app = getApp()

Component({

  data: {
    dogs: [],
    currentUser: null,
    canIUseGetUserProfile: false,
    hasUserInfo: false,
    selected_dogs: []
    // favourite: []
  },

  ready: function (options) {
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

  
    // let self = this
    // let Favourites = new wx.BaaS.TableObject('adogtion_favourites')
    // let userQuery = new wx.BaaS.Query();
    // let user = this.data.user
    // userQuery.compare('user_id', '=', user.id)
    // let dogQuery = new wx.BaaS.Query();
    // let dog = self.data.dog
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

  methods: {
    
    navigateToDogs: function(e) {
      console.log('see dogs button', e)
      this.triggerEvent("toAdoptDogs")
    },

    getUserInfo(e) {
      getApp().globalData.userInfo = e.detail.userInfo
      // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    },

    getUserProfile(e) {
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
            wx.setStorageSync('userInfo', res)
          },
          err => {
            console.log('error!', err)
          }
         )
        }
      })
    }
  },

  navigateToDog: function(e) {
    console.log('calling a dog', e)
    wx.navigateTo({
      url: `/pages/dog/dog?id=${e.currentTarget.dataset.id}`,
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

})