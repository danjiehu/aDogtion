// pages/home/home.js
const app = getApp()

Component({

  data: {
    dogs: [],
    currentUser: null
  },

  ready: function (options) {
    this.setData({
      currentUser: app.globalData.userInfo
    })

    const self = this
    let Dogs = new wx.BaaS.TableObject('adogtion_dogs')

    Dogs.limit(5).find().then(
      (res) => { 
        console.log('Dogs have been loaded',res)
        self.setData({
          dogs: res.data.objects.reverse()
        })
      }, (err) => {
        console.log('dogs failed failed',err)
      }
    )
  },
  
  methods: {
    navigateToDog: function(e) {
      console.log('calling a dog', e)
      wx.navigateTo({
        url: `/pages/dog/dog?id=${e.currentTarget.dataset.id}`,
      })
    },

    navigateToDogs: function(e) {
      this.triggerEvent("toAdoptDogs")
    },

    navigateToFosterDogs: function(e) {
      this.triggerEvent("toFosterDogs")
    },
  }

})