// pages/booking/booking.js

Page({

  data: {
    // toView: 'green',
    selectedDate: null,
    timeSlots: ["09:00","10:00","11:00","12:00","13:00"],
    selectedSlot: null,
    dogProfile:{},
    dogId:null,
    formId:null
    // dog: []
  },

  onLoad: function (e) {
    console.log("load booking",e)
    this.setData({
      dogId: e.dogId,
      formId: e.formId
    })

    let Dogs = new wx.BaaS.TableObject('adogtion_dogs')
    const page = this
    Dogs.get(e.dogId).then(
      (res) => {
        console.log('dog id', res)
        page.setData ({
          dogProfile: res.data
        })
      }
    )

    let timetable = new wx.BaaS.TableObject('aDogtion_timetable')
    let recordId = "607da2c1de38ae2a76f43474"
    timetable.get(recordId).then( 
      (res)=>{
        console.log("real time slots",res)
      page.setData({
        timeSlots: res.data.available_slots
      })
    })


  // end of onload
  },
  
  // onShow: function () {
  // },

  // scroll(e) {
  //   console.log(e)
  // },

  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      selectedDate: e.detail.value
    })
  },

  // start of defining selectTimeslot
  selectTimeslot: function(e){
    console.log("slot selection changed, array index is", e.currentTarget.dataset.index)
    let i = e.currentTarget.dataset.index
    console.log("slot selection changed, value is", this.data.timeSlots[i])
    this.setData({
      selectedSlot: this.data.timeSlots[i]
    })
  },
  // start of defining selectTimeslot



// end of page
})