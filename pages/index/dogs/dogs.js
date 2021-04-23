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
    selectedSize: false,
    selectedAge: false,
    selectedGender: false,
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
      this.callingFilteredDogs()
    },

    switchTab: function(e){
      console.log(e)
      this.getDogsFromDogs(e.currentTarget.dataset.category)
      this.callingFilteredDogs()
    },

    selectGenderTag: function(e){
      let self = this
      let items = self.data.gender
      let values = e.currentTarget.dataset.value;
      console.log('select gender tag', items)
      items.forEach((aGender, index) => {
        if (index == values) {
          if (aGender.checked == true) {
            aGender.checked = false
            console.log('switch turned to false', aGender.checked)
          } else {
            aGender.checked = true
            console.log('switch turned to true', aGender.checked)
          }
        } else {
          aGender.checked = false
        }
        this.setData({
          gender: self.data.gender,
          selectedGender: true
        })
      })
    },

    selectSizeTag: function(e){
      let self = this
      let items = self.data.size
      let values = e.currentTarget.dataset.value;
      console.log('click on tag size', values, self.data.size)
      self.data.size.forEach((aSize, index)=>{
        if (index == values) {
          if (aSize.checked == true) {
            aSize.checked = false
            console.log('switch turned to false', aSize.checked)
          } else {
            aSize.checked = true
            console.log('switch turned to true', aSize.checked)
          }
        } else {
          aSize.checked = false
        }
        self.setData({
          size: items,
          selectedSize: true
        })
      })
      // console.log('SIZE TAG', this.data.size)
    },

    // selectAgeTag: function(e){
    //   let self = this
    //   let items = self.data.age
    //   let values = e.currentTarget.dataset.value;
    //   console.log('click on tag age',e)
    //   items.forEach((anAge, index)=>{
    //     if (index == values) {
    //       if (anAge.checked == true) {
    //         anAge.checked = false
    //         console.log('switch turned to false', anAge.checked)
    //       } else {
    //         anAge.checked = true
    //         console.log('switch turned to true', anAge.checked)
    //       }
    //     } else {
    //       anAge.checked = false
    //     }
    //     self.setData({
    //       age: items,
    //       selectedAge: true
    //     })
    //   })
    // },

    // callingAgeTag: function() {
    //    // query 4, the AGE match
    //   let ageQuery = new wx.BaaS.Query();
    //   let puppyCheck = this.data.age[0].checked
    //   console.log('puppy', puppyCheck)
    //   let youngCheck = this.data.age[1].checked
    //   console.log('young', youngCheck)
    //   let adultCheck = this.data.age[2].checked
    //   console.log('adult', adultCheck)
    //   let checkedAge
    //   if (puppyCheck) { checkedAge = '6' }
    //   if (youngCheck) { checkedAge = '12' }
    //   if (adultCheck) { checkedAge = '13' }
    //   console.log('checked age', checkedAge)
    //   ageQuery.compare('monthsold', "<", checkedAge)
    //   // query 1+2+3+4, the CATEGORY + GENDER + SIZE + AGE match
    //   let fourthQuery = wx.BaaS.Query.and(tripleQuery, ageQuery)
    // },

    callingFilteredDogs: function() {
      let self = this
      // calling the baas to filter dogs
      let FilteredDogs = new wx.BaaS.TableObject('adogtion_dogs')

      // query 1, the ADOPT tag match
      let categoryQuery = new wx.BaaS.Query()
      let category = self.data.category
      categoryQuery.compare(category, '=', true)

      let selectedGender = this.data.selectedGender
      let selectedSize = this.data.selectedSize
      let selectedAge = this.data.selectedAge
      // query 2, the GENDER tag match
      if (selectedGender)  {
        if (!selectedSize) {
          // Grabbing the gender tag with checked "true"
          let maleCheck = this.data.gender[0].checked
          let femaleCheck = this.data.gender[1].checked
          let checkedGender
          if (maleCheck) { checkedGender = 'male' }
          if (femaleCheck) { checkedGender = 'female' }
          // femaleCheck ? (checkedGender = 'female') : (checkedGender = 'male')
          // console.log('checked gender', checkedGender)
          let genderQuery = new wx.BaaS.Query();
          genderQuery.compare('gender', "=", checkedGender)
          // query 1+2, the CATEGORY + GENDER match
          let filterQuery = wx.BaaS.Query.and(categoryQuery, genderQuery)
          FilteredDogs.setQuery(filterQuery).find().then(
            (res) => {
              self.setData({
                filtered_dogs: res.data.objects
              })
              console.log('selected dogs', this.data.filtered_dogs)
            },
            (err) => {
              console.log('err', err)
            }
          )
        } else {
          // query 3, the SIZE match
          let smallCheck = this.data.size[0].checked
          // console.log('small size', smallCheck)
          let mediumCheck = this.data.size[1].checked
          // console.log('medium size', mediumCheck)
          let largeCheck = this.data.size[2].checked
          // console.log('large size', largeCheck)
          let checkedSize
          if (smallCheck) { checkedSize = 'small' }
          if (mediumCheck) { checkedSize = 'medium' }
          if (largeCheck) { checkedSize = 'large' }
          console.log('checked size', checkedSize)
          // Grabbing the gender tag with checked "true"
          let maleCheck = this.data.gender[0].checked
          let femaleCheck = this.data.gender[1].checked
          let checkedGender
          femaleCheck ? (checkedGender = 'female') : (checkedGender = 'male')
          let genderQuery = new wx.BaaS.Query();
          genderQuery.compare('gender', "=", checkedGender)
          // query 1+2, the CATEGORY + GENDER match
          let doubleQuery = wx.BaaS.Query.and(categoryQuery, genderQuery)
          let sizeQuery = new wx.BaaS.Query();
          sizeQuery.compare('size', "=", checkedSize)
          let filterQuery = wx.BaaS.Query.and(doubleQuery, sizeQuery)
          FilteredDogs.setQuery(filterQuery).find().then(
            (res) => {
              self.setData({
                filtered_dogs: res.data.objects
              })
              console.log('selected dogs', this.data.filtered_dogs)
            },
            (err) => {
              console.log('err', err)
            }
          )
        }
      } else {
        if(selectedSize) {
          // query 3, the SIZE match
          let smallCheck = this.data.size[0].checked
          // console.log('small size', smallCheck)
          let mediumCheck = this.data.size[1].checked
          // console.log('medium size', mediumCheck)
          let largeCheck = this.data.size[2].checked
          // console.log('large size', largeCheck)
          let checkedSize
          if (smallCheck) { checkedSize = 'small' }
          if (mediumCheck) { checkedSize = 'medium' }
          if (largeCheck) { checkedSize = 'large' }
          // query 1+3, the CATEGORY + SIZE match
          let sizeQuery = new wx.BaaS.Query();
          sizeQuery.compare('size', "=", checkedSize)
          let filterQuery = wx.BaaS.Query.and(categoryQuery, sizeQuery)
          FilteredDogs.setQuery(filterQuery).find().then(
            (res) => {
              self.setData({
                filtered_dogs: res.data.objects
              })
              console.log('selected dogs', this.data.filtered_dogs)
            },
            (err) => {
              console.log('err', err)
            }
          )
        }
      }
    },

    clearFilter: function(e) {
      let self = this
      let genders = self.data.gender
      let values = e.currentTarget.dataset.value;
      genders.forEach((aGender, index) => {
        aGender.checked = false
        console.log('genders cleared', aGender.checked)
      })
      let sizes = self.data.size
      sizes.forEach((aSize, index) => {
        aSize.checked = false
        console.log('sizes cleared', aSize.checked)
      })
      self.setData({
        gender: genders,
        selectedGender: false,
        size: sizes,
        selectedASize: false,
        filtered_dogs: []
      })
    }
  }

})