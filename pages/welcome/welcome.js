// pages/welcome/welcome.js
Page({
  lifetimes: {
    attached: function () {
      this.setData({
        cardCur: 0
      })
    },
    detached: function () {
      //  Execute when the component instance is removed from the page node tree 
    },
  },
  pageLifetimes: {
    show: function () {
      this.setData({
        cardCur: 0
      })
    },
  },

  data: {
    cardCur: 0,
    swiperList: [ {
      id: 0,
      type: 'image',
      url: 'https://cloud-minapp-39668.cloud.ifanrusercontent.com/1lXbicGexLnQ6Ora.svg',
      title: 'aDogtion',
      subtitle: 'Adopt & Foster Dogs',
      yiyan: 'Find your new best friend here',
    }, {
      id: 2,
      type: 'image',
      url: 'https://cloud-minapp-39668.cloud.ifanrusercontent.com/1lXbiccrE9Kdr5bd.svg',
      title: 'aDogtion',
      subtitle: 'Adopt & Foster Dogs',
      yiyan: 'Browse dogs & find your perfect match',
    }, {
      id: 2,
      type: 'image',
      url: 'https://cloud-minapp-39668.cloud.ifanrusercontent.com/1lZo2jG3aQx9uNNw.svg',
      title: 'aDogtion',
      subtitle: 'Adopt & Foster Dogs',
      yiyan: 'Contact us to make an appointment & meet the dog',
    }],
  },

  onLoad: function (options) {
    this.towerSwiper('swiperList');
  },

  onShow: function () {
  },

  navigateToHome: function() {
    wx.navigateTo({
      url: '/pages/index/index'
    })
    console.log('navigate')
  },

  DotStyle(e) {
    console.log('e', e)
    this.setData({
      DotStyle: e.detail.value
    })
  },

  cardSwiper(e) {
    console.log('give me something', e)
    this.setData({
      cardCur: e.detail.current
    })
  },

  // towerSwiper Calculation direction 
  towerMove(e) {
    this.setData({
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  }
})