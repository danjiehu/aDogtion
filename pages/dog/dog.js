// pages/dog/dog.js
const app = getApp()

Page({
  data: {
    swiperList: [],
    activeSwiper: 0,
    dog: [],
    currentUser: null,
    canIUseGetUserProfile: false,
    hasUserInfo: false,
    hasLike: false
  },

  onLoad: function (options) {
    const self = this
    if (wx.getUserProfile) {
      self.setData({
        canIUseGetUserProfile: true
      })
    }
    wx.getStorage({
      key: 'userInfo',
      success: res=>{
        console.log(res)
        self.setData({
          currentUser: res.data,
          hasUserInfo: true
        }, ()=>{
          self.checkIfLiked()
        })
      }
    })

    // this.setData({
    //   currentUser: app.globalData.userInfo
    // })

    let Dogs = new wx.BaaS.TableObject('adogtion_dogs')
    
    Dogs.get(options.id).then(
      (res) => {
        console.log('dog id', res)
        self.setData ({
          dog: res.data
        })
        // console.log(res.data)
        let gallery = res.data.image
        // console.log('gallery', gallery)
       for (let i = 0; i < gallery.length; i +=1) {
        let imagePath = gallery[i].path
        let swiperList = self.data.swiperList
        swiperList.push(imagePath)
        // console.log(self.data.swiperList)
        self.setData ({
          swiperList: this.data.swiperList
        })
      }
      },
      (err) => {
        console.log('error', err)
      }
    )
  },

  swiperChange(e){
    // console.log("changed", e.detail.current)
    this.setData({
      activeSwiper: e.detail.current
    })
  },

  goBack(e) {
    console.log("back", e)
    wx.navigateBack({
      delta: 1,
    })
  },

  fosterToContact: function(e) {
    console.log('going to contact', e)
    wx.navigateTo({
      url: `/pages/contact/contact?id=${this.data.dog.id}&action=Foster`,
    })
  },

  adoptToContact: function(e) {
    console.log('going to contact', e)
    wx.navigateTo({
      url: `/pages/contact/contact?id=${this.data.dog.id}&action=Adopt`,
    })
  },

  navigateToProfile: function(e) {
    console.log('going to contact', e)
    wx.navigateTo({
      url: '/pages/index/profile/profile',
    })
  },

  addLike: function(e) {
    let self = this
    console.log('get a like', e)
    let likeSwitcher = !self.data.hasLike
    self.setData({
      hasLike: likeSwitcher
    })
    let Likes = new wx.BaaS.TableObject('adogtion_favourites')
    let newLike = Likes.create()
    newLike.set({
      dog_id: this.data.dog.id,
      user_id: this.data.currentUser.id
    })

    newLike.save().then(
      (res) => {
        console.log('like added', res)
      }, (err) => {
        console.log('failed adding a like', res)
      }
    )
  },

  removeLike: function(e) {
    let self = this
    console.log('deleting a like', e)
    let likeSwitcher = !self.data.hasLike
    self.setData({
      hasLike: likeSwitcher
    })
    let Likes = new wx.BaaS.TableObject('adogtion_favourites')
    let likeQuery = new wx.BaaS.Query();
    likeQuery.compare('dog_id', '=', this.data.dog.id)
    Likes.delete(likeQuery).then(
      (res) => {
        console.log('like deleted', res)
      }, (err) => {
        console.log('failed deleting a like', res)
      }
    )
  },


  // start of share
  onShareAppMessage() {
    const promise = new Promise(resolve => {
      setTimeout(() => {
        resolve({
          title: `meet ${this.data.dog.name} 🥰 - find your best friend with aDogtion`,
          path: `/pages/dog/dog?id=${this.data.dog.id}`,
          imageUrl: this.data.dog.image[0].path,
        })
      }, 2000)
    })
    return {
      title: `meet ${this.data.dog.name} 🥰 - find your best friend with aDogtion`,
      path: `/pages/dog/dog?id=${this.data.dog.id}`,
      imageUrl: this.data.dog.image[0].path,
      promise 
    }
  },
  // end of share

  // end of page
  checkIfLiked: function () {    
    let self = this
    // calling the baas to check if a user has this dog in favourites
    let Favourites = new wx.BaaS.TableObject('adogtion_favourites')
    // query 1, the user match
    let userQuery = new wx.BaaS.Query();
    userQuery.compare('user_id', "=", self.data.currentUser.id)
    console.log("checking ids", self.data.currentUser.id, self.options.id)
    // query 2, the dog match
    let dogQuery = new wx.BaaS.Query();
    dogQuery.compare('dog_id', "=", self.options.id)

    // // query 1+2, the user + dog match
    let andQuery = wx.BaaS.Query.and(userQuery, dogQuery)
    Favourites.setQuery(andQuery).find().then(
      (res) => {
        self.setData({
          hasLike: res.data.objects.length > 0
        })
      },
      (err) => {
        console.log('err', err)
      }
    )
  }


})