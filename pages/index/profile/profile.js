Component({

  data: {
    userId: null,
    userInfo: null,
    favouritedDogs: []
  },

  ready: function(){

    const page = this

        wx.BaaS.auth.loginWithWechat().then(res => {
          // 静默获取openid等基础信息
          console.log("user ids",res)
          page.setData({
            userId: res.id
          })
          this.getFavourites()
          wx.setStorage('userId', res.id)
        }, err => {
          // 静默获取openid等基础信息失败
        })
      
      wx.getStorage({
        key:"userInfo",
        success: res=>{
          console.log("getStorage success res", res)
          page.setData({
            userInfo: res.data
          })
          getApp().globalData.userInfo = res.data
        }
      })

  },

  pageLifetimes: {

    show: function(){ 

       

      

    // end of show function
    }

  },

  methods: {

   getProfile(){

    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log("getUserProfile api res", res)
        this.setData({
          userInfo: res.userInfo,
        })
        wx.setStorageSync('userInfo', res.userInfo)
      }
    })

  //  end of getProfile method, end of login
  },

  getFavourites: function () {    
    let self = this
    // calling the baas to check if a user has this dog in favourites
    let Favourites = new wx.BaaS.TableObject('adogtion_favourites')
    // query, the user match
    let userQuery = new wx.BaaS.Query();
    userQuery.compare('user_id', "=", self.data.userId)
    console.log("checking ids", self.data.userId)
    Favourites.expand('dog_id').setQuery(userQuery).find().then(
      (res) => {
        self.setData({
          favouritedDogs: res.data.objects
        })
        console.log('favouritedDogs', self.data.favouritedDogs)
      },
      (err) => {
        console.log('err', err)
      }
    )
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
  },

  navigateToAppointments: function(e){
    console.log('calling a dog', e)
      wx.navigateTo({
        url: "/pages/appointments/appointments",
      })
  }

    
  //end of methods
  }

// end of component
})