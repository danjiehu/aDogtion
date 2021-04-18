const app = getApp()

Component({

  data: {
    dogs: [],
    currentUser: null,
    canIUseGetUserProfile: false,
    hasUserInfo: false,
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
})