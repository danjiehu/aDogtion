// pages/booking/booking.js

Page({

  data: {
    // toView: 'green',
    // currentUser: wx.getStorageSync('userInfo'),
    selectedDate: null,
    timeSlots: ["09:00","10:00","11:00","12:00","13:00"],
    selectedIndex:null,
    selectedSlot: null,
    dogProfile:{},
    dogId:null,
    formId:null
  },

  onLoad: function (e) {
    wx.showToast({
      title: 'received!',
    })

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

  bindDateChange: function (e) {
    console.log('date picker changed, value is', e.detail.value)
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
      selectedIndex: e.currentTarget.dataset.index,
      selectedSlot: this.data.timeSlots[i]
    })
  },
  // start of defining selectTimeslot

  // start of sumit date and time
  submitVisit: function(e){
    console.log("submitVisit",e)
    let Forms = new wx.BaaS.TableObject('adogtion_forms')
    let formId = this.data.formId
    let currentForm = Forms.getWithoutData(formId)
    currentForm.set({
      status: 1,
      visit_date: this.data.selectedDate,
      visit_time: this.data.selectedSlot
    })

    currentForm.update().then(
      (res) => {
        console.log("update form success",res)
        wx.navigateTo({
          url: `/pages/bookSuccess/bookSuccess?dogId=${this.data.dogId}&formId=${this.data.formId}`
        })
      },
      (err) => {console.log("update form error",res)}
    )

  // end of sumit date and time
  },
  

  // start of skip
  skip:function(){
    wx.navigateTo({
      url: `/pages/bookSuccess/bookSuccess?dogId=${this.data.dogId}&formId=${this.data.formId}`
    })

  // end of skip
  }
  


// end of page
})