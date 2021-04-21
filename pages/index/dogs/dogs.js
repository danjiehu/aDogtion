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
    },
  },

  data: {
    dogs:[],
    selected_dogs: [],
    filtered_dogs:[],
    currentUser: null,
    category:"",
    gender: [
      {
        name: 'Male',
        value: 0,
        checked:false,
      },
      {
        name: 'Female',
        value: 1,
        checked:false,
      }],
    
    size: [
      {
        name: 'Small',
        value: 0,
        checked:false,
      },
      {
        name: 'Medium',
        value: 1,
        checked:false,
      },
      {
        name: 'Large',
        value: 2,
        checked:false,
      }],
    
    age: [
      {
        name: 'Puppy',
        value: 0,
        checked:false,
      },
      {
        name: 'Young',
        value: 1,
        checked:false,
      },
      {
        name: 'Adult',
        value: 2,
        checked:false,
      }],
    // selectedIndex:null,
    // selectedTag: null,
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

    closeFilter() {
      // console.log('closing',e)
      this.setData({filterOn: false})
    },
    
    navigateToDog: function(e) {
      console.log('calling a dog', e)
      wx.navigateTo({
        url: `/pages/dog/dog?id=${e.currentTarget.dataset.id}`,
      })
    },

    showFilteredDogs: function(e) {
      console.log('show me filtered dogs', e)
      this.setData({filterOn: false})
      // const self = this
      // let FilteredDogs = new wx.BaaS.TableObject('adogtion_dogs')
      // let query = new wx.BaaS.Query()
      // query.compare(gender, '=', true)
      // FilteredDogs.setQuery(query).find().then(
      //   (res) => { 
      //     self.setData({
      //       selected_dogs: res.data.objects
      //     })
      //   }, (err) => {
      //     console.log('dogs failed failed',err)
      //   }
      // )
    },

    switchTab: function(e){
      console.log(e)
      this.getDogsFromDogs(e.currentTarget.dataset.category)
    },

    selectGenderTag: function(e){
      let self = this
      let items = self.data.gender
      let values = e.currentTarget.dataset.value;
      console.log('click on a tag',e)
      for (let i = 0, lenI = items.length; i < lenI; ++i) {
        if (items[i].value == values) {
          items[i].checked = !items[i].checked;
          break
        }
      }
      this.setData({
        gender: items
      })
    },

    selectSizeTag: function(e){
      let self = this
      let items = self.data.size
      let values = e.currentTarget.dataset.value;
      console.log('click on tag size',e)
      for (let i = 0, lenI = items.length; i < lenI; ++i) {
        if (items[i].value == values) {
          items[i].checked = !items[i].checked;
          break
        }
      }
      this.setData({
        size: items
      })
    },

    selectAgeTag: function(e){
      let self = this
      let items = self.data.age
      let values = e.currentTarget.dataset.value;
      console.log('click on tag age',e)
      for (let i = 0, lenI = items.length; i < lenI; ++i) {
        if (items[i].value == values) {
          items[i].checked = !items[i].checked;
          break
        }
      }
      this.setData({
        age: items
      })
    }
  }

})