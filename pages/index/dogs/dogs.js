const app = getApp()

Component({
  properties: {
    foster: {
      type: Boolean,
      value: false
    }
  },

  data: {
    dogs: [],
    currentUser: null
  },

  ready: function (options) {
    console.log("im in ready")
    this.setData({
      currentUser: app.globalData.userInfo
    })
    this.data.foster? this.getFosterDogs() : this.getDogs()
  },

  methods: {
    getDogs(){
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

    getFosterDogs(){
      this.setData({
        dogs: []
      })
      // const self = this
      // let Dogs = new wx.BaaS.TableObject('adogtion_dogs')
  
      // Dogs.find().then(
      //   (res) => { 
      //     console.log('Dogs have been loaded',res)
      //     self.setData({
      //       dogs: res.data.objects
      //     })
      //   }, (err) => {
      //     console.log('dogs failed failed',err)
      //   }
      // )
    },
    navigateToDog: function(e) {
      console.log('calling a dog', e)
      wx.switchTab({
        url: `/pages/dog/dog?id=${e.currentTarget.dataset.id}`,
      })
    }
  }

})