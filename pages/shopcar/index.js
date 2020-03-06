// pages/shopcar/index.js
Page({
  data:{
    useraddress:{},
    foods:[],
    total:0
  },
  //一开始加载地址
  onLoad(){
    const userinfo = wx.getStorageSync('userinfo') || {};
    this.setData({
      useraddress:userinfo
    })
    //不能在onload里面写，只执行一次等等如果改变了数量，就不能及时刷新
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
  },
  //每次显示这个页面时候就展示而且能几时刷新
  onShow(){
    let arr = wx.getStorageSync('foods') || [];
    this.setData({
      foods:arr,
    })
    this.suantotal();
  },
  // 计算总价格
  suantotal(){
    let price=0;
    this.data.foods.forEach(e=>{
      price += e.number * e.price;
    })
    this.setData({
      total:price
    })
  }
})