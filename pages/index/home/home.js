// pages/home/home.js
const app = getApp()

Component({

  data: {
    allDogs: [],
    dogs: [],
    currentUser: null,
    adoptCount: 0,
    fosterCount: 0,
    tenDogs: []
  },

  ready: function (options) {
    this.setData({
      currentUser: app.globalData.userInfo
    })

    const self = this
    let Dogs = new wx.BaaS.TableObject('adogtion_dogs')

    Dogs.find().then(
      (res) => { 
        console.log('Dogs have been loaded',res)
        self.setData({
          allDogs: res.data.objects.reverse()
        })
        this.countDogs()
        this.limitDogs()
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
      let dogs = self.data.allDogs
      // console.log(dogs)
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
    },

    limitDogs: function() {
      let self = this
      let dogs = self.data.allDogs
      // console.log('all your dogs', dogs)
      let newDogs = self.data.dogs
      for (let i = 0; i < 5; i++) {
        newDogs.push(dogs[i])
        // console.log('your limited dogs', newDogs)
        self.setData({
          dogs: newDogs
        })
      }
    }
  },

  // onShareAppMessage() {
  //   const promise = new Promise(resolve => {
  //     setTimeout(() => {
  //       resolve({
  //         title: '自定义转发标题'
  //       })
  //     }, 2000)
  //   })
  //   return {
  //     title: '自定义转发标题',
  //     path: '/page/user?id=123',
  //     promise 
  //   }
  // }

})