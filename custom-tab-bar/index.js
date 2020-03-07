Component({
  data: {
    selected: 0,
    color: "#000",
    selectedColor: "#ff2d4a",
    backgroundColor: "#fff",
    list: [{
      "text": "首页",
      "pagePath": "/pages/index/index",
      "iconPath": "../images/icon_home@3x.png",
      "selectedIconPath": "../images/icon_home_active@3x.png"
      },
      {
        "text": "分类",
        "pagePath": "/pages/sort/index",
        "iconPath": "../images/icon_category@3x.png",
        "selectedIconPath": "../images/icon_category_active@3x.png"
      },
      {
        "text": "购物车",
        "pagePath": "/pages/shopcar/index",
        "iconPath": "../images/icon_cart@3x.png",
        "selectedIconPath": "../images/icon_cart_active@3x.png"
      },
      {
        "text": "我的",
        "pagePath": "/pages/myself/index",
        "iconPath": "../images/icon_me@3x.png",
        "selectedIconPath": "../images/icon_me_active@3x.png"
      }],
      number:(wx.getStorageSync('foods') || []).length
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})