Component({
  properties: {
    selected: {
      type: Number
    }
  },
  data: {
    selected: 0,
    color: "#b6b1b1",
    selectedColor: "#131313",
    list: [{
      text: "Home"
    }, {
      text: "Dogs"
    },
    {
      text: "Me"
    }
  ]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.pagepath
      this.setData({
        selected: data.index
      })
      this.triggerEvent("changeTab", data.index)
    //  wx.switchTab({url})
    }
  }
})