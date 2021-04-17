// pages/contact/contact.js
const app = getApp()

Page({

  data: {
    currentUser: null,
    dogId: null,
    dogProfile: {},
    dogImagePath: null
  },

  // start of onload get selected dog profile
  onLoad: function (res) {
    console.log("onLoadRes",res)
    this.setData({
      currentUser: app.globalData.userInfo,
      dogId: res.id
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

  submitContact: function(res) {
    console.log("subContact-res",res)
      let page = this
      let forms = new wx.BaaS.TableObject('adogtion_forms')
      let newForm = forms.create()

      newForm.set({
        user_id: page.data.currentUser,
        dog_id: page.data.dogId,
        name: res.detail.value.name,
        phone: res.detail.value.phone,
        message: res.detail.value.message
      })

      newForm.save().then(
        (res)=>{
          console.log("saveSuccess",res)
          wx.showToast({
            title: 'contact received!',
          })
          wx.navigateTo({
            url: `/pages/bookSuccess/bookSuccess?id=${page.data.dogId}`,
          })
        },
        (err)=>{
          console.log("saveFailed", err.code)
          console.log(err.message)
          console.log("type", typeof(err))
          if (err.code == 400) {
            console.log(400)
            wx.showModal({
              title: 'submit failed',
              content: 'please enter a valid phone number',
              showCancel: false,
              confirmText: "go back"
            })
          }
        } 
      )
  }

  // navigateToSuccess: function(e) {
  //   let self = this
  //   console.log('going to success', e)
  //   wx.navigateTo({
  //     url: `/pages/bookSuccess/bookSuccess?id=${self.data.dog.id}`,
  //   })
  // }

// end of page
})


