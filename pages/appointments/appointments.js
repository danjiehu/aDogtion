
Page({
  data: {
    currentUser: wx.getStorageSync('userInfo'),
    action:null,
    appointments: [],
    // dogProfiles:[]
    // dogId: null,
    // dogProfile: {},
    // dogImagePath: null,
    // name: null,
  },

  onLoad: function () {

  },

  onReady: function () {

  },
  
  onShow: function () {
    wx.showLoading({
      title: 'loading',
    })

    // console.log("1",this.data.appointments[0])
    // if(this.data.appointments[0]) {
    //   wx.hideLoading()
    // }
    // console.log("2",this.data.appointments[0])
    
    // setTimeout(function () {
    //   wx.hideLoading()
    // }, 3000)

    const page = this

    let forms = new wx.BaaS.TableObject('adogtion_forms')

    let user = page.data.currentUser.id
    let queryUser = new wx.BaaS.Query()
    queryUser.compare('user_id', "=", user)

    let statusCheck = new wx.BaaS.Query()
    statusCheck.compare("status", "!=", 2)

    let andQuery = wx.BaaS.Query.and(queryUser, statusCheck)
    
    // let dogs = new wx.BaaS.TableObject('adogtion_dogs')

    forms.setQuery(andQuery).expand('dog_id').find().then(
      (res)=>{console.log("36",res)
      
      page.setData({
        appointments:res.data.objects
      },()=>{
        wx.hideLoading()
      //   if(this.data.appointments[0]) {
      //   wx.hideLoading()
      // }
    })
     
    })

  // end of onShow
  },

  // edit: function(e){
  //   console.log("edit",e)
  //   let dogid = e.currentTarget.dataset.dogid
  //   wx.navigateTo({
  //     url: `/pages/booking/booking?id=${dogid}`,
  //   })

  // // end of edit
  // },

  cancel: function(e){
    console.log("cancel",e)
    let Forms = new wx.BaaS.TableObject('adogtion_forms')
    let formid = e.currentTarget.dataset.formid
    let currentForm = Forms.getWithoutData(formid)
    let page = this

    wx.showModal({
      // title: '提示',
      content: 'Are you sure you want to cancel the appointment?',
      confirmText: "Yes",
      cancelText: "No",
      cancelColor: "#606060",
      confirmColor: "#FF0000",

      success (res) {
        if (res.confirm) {
          console.log('user click confirm cancel')
          currentForm.set({
            status: 2, // 2 means cancelled
          })
          currentForm.update().then(
            (res) => {
              console.log("update form success",res)
              wx.reLaunch({
                url: "/pages/appointments/appointments"
              })
              // wx.navigateBack({
              //   delta: 1
              // })
            },
            (err) => {console.log("update form error",res)}
          )
        }
      }
    })




  // end of cancel
  },


  goBack(e) {
    console.log("back", e)
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },

})