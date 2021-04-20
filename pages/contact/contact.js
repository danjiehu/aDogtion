// pages/contact/contact.js
const app = getApp()

Page({

  data: {
    currentUser: wx.getStorageSync('userInfo'),
    action:null,
    dogId: null,
    dogProfile: {},
    dogImagePath: null,
    name: null,
    mobile: null,
    message: null,
    alertName: false,
    alertPhone: false,
    alertMessage: false,
  },

  // start of onload get selected dog profile
  onLoad: function (res) {
    console.log("load contact",res)
    this.setData({
      // currentUser: wx.getStorageSync('userInfo.openid'),
      // currentUser: app.globalData.userInfo,
      dogId: res.id,
      action: res.action
    })

    let dogs = new wx.BaaS.TableObject('adogtion_dogs')
    
    const page = this
    dogs.get(res.id).then(
      (res) => {
        console.log('getDogProfile', res)
        page.setData ({
          dogProfile: res.data,
          dogImagePath: res.data.image[0].path
        })
      },
      (err) => {
        console.log('error', err)
      }
    )
  },
  // end of onload get selected dog profile
  
  onShow: function () {

  },

  // start of clearAlert
  clearAlert: function(){
    this.setData({
      alertName: false,
      alertPhone: false,
      alertMessage: false
    })
  },
  // end of clearAlert

  submitContact: function(res) {
    console.log("subContact-res",res)
      let page = this
      let forms = new wx.BaaS.TableObject('adogtion_forms')
      let newForm = forms.create()
      let name = res.detail.value.name
      let phone = res.detail.value.phone
      let message = res.detail.value.message
      let action = page.data.action

      if (!name){
        page.setData({
          alertName: true
          })
        }

      if (!phone){
          page.setData({
            alertPhone: true
            })
        }

      if (!message){
        page.setData({
          alertMessage: true
          })
      }

      if (name&&phone&&message){
        newForm.set({
          status: 0,
          user_id: page.data.currentUser.id,
          dog_id: page.data.dogId,
          name,
          phone,
          message,
          action
        })

        newForm.save().then(
          (res)=>{
            console.log("saveSuccess",res)
            wx.navigateTo({
              url: `/pages/booking/booking?dogId=${page.data.dogId}&formId=${res.data.id}`,
            })
          },
          (err)=>{
            console.log(err.message)
            console.log("error message validation",err.message.includes("phone"))
            if(err.message.includes("phone")){
              page.setData({
                alertPhone: true })
            }
      })
      
          // console.log("type", typeof(err))
          // if (err.code == 400) {
          //   wx.showModal({
          //     title: 'submit failed',
          //     content: 'please make sure all the fields are entered correctly',
          //     showCancel: false,
          //     confirmText: "go back"
          //   })
          // } 
        } 
  
    //end of submit function
    }

 
// end of page
})


