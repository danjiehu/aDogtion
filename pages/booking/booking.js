// pages/booking/booking.js
Page({

  data: {

    selectedDate: null,
    timeSlots:"",
    selectedTime:""

  },

  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      selectedDate: e.detail.value
    })
  },

  onLoad: function (options) {

  },


  onReady: function () {

  },

  onShow: function () {

  },

  onHide: function () {

  },

  onUnload: function () {

  },

  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  }
})