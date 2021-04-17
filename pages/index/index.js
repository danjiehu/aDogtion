// pages/index/index.js
Page({
  data: {
    activeTab: 0,

    // for the dogs tab
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
      foster: false
    })
  },

  toFosterDogs(e){
    this.setData({
      activeTab: 1
    })
    this.setData({
      foster: true
    })
  }
})