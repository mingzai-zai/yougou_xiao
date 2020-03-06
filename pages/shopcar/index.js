// pages/shopcar/index.js
Page({
  data:{
    useraddress:{}
  },
  //一开始加载地址
  onLoad(){
    const userinfo = wx.getStorageSync('userinfo') || {};
    this.setData({
      useraddress:userinfo
    })
  },
  //登录获取地址
  addaddress(){
    wx.chooseAddress({
      success:(res)=> {
        this.setData({
          useraddress:{
            username:res.userName,
            phone: res.telNumber,
            address: res.provinceName + res.cityName + res.countyName + res.detailInfo
          }
        })
        wx.setStorageSync('userinfo', this.data.useraddress)
      }
    })
  }
})