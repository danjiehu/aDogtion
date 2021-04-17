// pages/booking/booking.js
Page({

  data: {
    toView: 'green',
    selectedDate: null,
    timeSlots: ["09:00","10:00","11:00","12:00","13:00"],
    selectedIndex: null,
    dog: []
  },

  scroll(e) {
    console.log(e)
  },

  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      selectedDate: e.detail.value
    })
  },

  // start of defining selectTimeslot
  selectTimeslot: function(e){
    console.log("selectTimeslot", e.currentTarget.dataset.id )
    this.setData({
      selectedIndex: e.currentTarget.dataset.id 
    })
  },
  // start of defining selectTimeslot

  onLoad: function (options) {
    let Dogs = new wx.BaaS.TableObject('adogtion_dogs')
    
    const self = this
    Dogs.get(options.id).then(
      (res) => {
        console.log('dog id', res)
        self.setData ({
          dog: res.data
        })
        // console.log(res.data)
        let image = res.data.image[0].path
      },
      (err) => {
        console.log('error', err)
      }
    )
  },

  onShow: function (e) {
    console.log("timeSlots",this.data.timeSlots)
  }
})