// pages/index/index.js
Page({
  data: {
    activeTab: 0,
    // for the dogs tab\
    adopt: false,
    foster: false
  },

  changeTab(e){
    this.setData({
      activeTab: e.detail
    })
  },

  toAdoptDogs(e){
    this.setData({
      activeTab: 1
    })
    this.setData({
      foster: false,
      adopt: true
    })
  },

  toFosterDogs(e){
    this.setData({
      activeTab: 1
    })
    this.setData({
      foster: true,
      adopt: false
    })
  }
  
})