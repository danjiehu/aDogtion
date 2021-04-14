// pages/dog/dog.js
Page({
  data: {
    swiperList: ['/images/coco.jpg'],
    // swiperList: ['/images/coco.jpg', '/images/cinnamon.JPG', '/images/bruno.jpg'],
    activeSwiper: 0
  },

  onLoad: function (options) {

  },

  swiperChange(e){
    // console.log("changed", e.detail.current)
    this.setData({
      activeSwiper: e.detail.current
    })
  },

})