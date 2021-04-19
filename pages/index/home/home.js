// pages/home/home.js
const app = getApp()

Component({

  data: {
    dogs: [],
    currentUser: null,
    adoptCount: 0,
    fosterCount: 0
  },

  ready: function (options) {
    this.setData({
      currentUser: app.globalData.userInfo
    })

    const self = this
    let Dogs = new wx.BaaS.TableObject('adogtion_dogs')

    Dogs.limit(10).find().then(
      (res) => { 
        console.log('Dogs have been loaded',res)
        self.setData({
          dogs: res.data.objects.reverse()
        })
        this.countDogs()
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

    navigateToAbout: function(e) {
      wx.navigateTo({
        url: '/pages/about/about'
      })
      console.log('navigate to about')
    },

    // COUNTING DOGGIES TO SHOW THE CORRECT NUMBERS
    countDogs: function() {
      let self = this
      let dogs = self.data.dogs
      console.log(dogs)
      for (let i = 0; i < dogs.length; i++) {
        let dogAdopt = dogs[i].adopt
        let adoptCount = this.data.adoptCount
        if (dogAdopt) {
          let updatedCount = adoptCount + 1
          self.setData({
            adoptCount: updatedCount
          })
        // console.log('adopt count:', updatedCount)
        }
        let dogFoster = dogs[i].foster
        let fosterCount = this.data.fosterCount
        if (dogFoster) {
          let updatedFosterCount = adoptCount + 1
          self.setData({
            fosterCount: updatedFosterCount
          })
          // console.log('foster count:', updatedFosterCount)
        }
        // console.log('foster count:', fosterCount)
      }
    }
  }

})