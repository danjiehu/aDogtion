const app = getApp()

Component({
  properties: {
    foster: {
      type: Boolean,
      value: false
    },
    adopt: {
      type: Boolean,
      value: false
    }
  },

  data: {
    dogs:[],
    selected_dogs: [],
    currentUser: null,
    category:"",
    filterOn: false
  },

  ready: function (options) {
    console.log("im in ready")
    this.setData({
      currentUser: app.globalData.userInfo
    })
    this.getDogsFromIndex();
  },

  methods: {
    getAllDogs(){
      const self = this
      let Dogs = new wx.BaaS.TableObject('adogtion_dogs')
      Dogs.find().then(
        (res) => { 
          self.setData({
            dogs: res.data.objects
          })
        }, (err) => {
          console.log('dogs failed failed',err)
        }
      )
    },
    
    getDogsFromIndex(){
      let category = this.properties.foster? "foster": "adopt";
      this.setData({category})
      this.getSelectedDogs(category);
    },

    getDogsFromDogs(category){
      this.setData({category})
      this.getSelectedDogs(category);
    },
    
    getSelectedDogs(category){
      const self = this
      let FosterDogs = new wx.BaaS.TableObject('adogtion_dogs')
      let query = new wx.BaaS.Query()
      query.compare(category, '=', true)
      FosterDogs.setQuery(query).find().then(
        (res) => { 
          self.setData({
            selected_dogs: res.data.objects
          })
        }, (err) => {
          console.log('dogs failed failed',err)
        }
      )
    },

    openFilter() {
      this.setData({filterOn: true})
    },
    
    navigateToDog: function(e) {
      console.log('calling a dog', e)
      wx.navigateTo({
        url: `/pages/dog/dog?id=${e.currentTarget.dataset.id}`,
      })
    },

    switchTab: function(e){
      console.log(e)
      this.getDogsFromDogs(e.currentTarget.dataset.category)
    }
  }

})