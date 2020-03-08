// pages/shopcar/index.js
import axios from "../../utils/axios.js"
Page({
  data: {
    useraddress: {},
    foods: [],
    total: 0,
    //默认可以全选
    quanxuanflag: true
  },
  //一开始加载地址
  onLoad() {
    const userinfo = wx.getStorageSync('userinfo') || {};
    this.setData({
      useraddress: userinfo
    })
    //不能在onload里面写，只执行一次等等如果改变了数量，就不能及时刷新
  },
  //登录获取地址
  addaddress() {
    wx.chooseAddress({
      success: (res) => {
        this.setData({
          useraddress: {
            username: res.userName,
            phone: res.telNumber,
            address: res.provinceName + res.cityName + res.countyName + res.detailInfo
          }
        })
        wx.setStorageSync('userinfo', this.data.useraddress)
      }
    })
  },
  //每次显示这个页面时候就展示而且能几时刷新
  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2,
        number: (wx.getStorageSync('foods') || []).length
      })
    }
    let arr = wx.getStorageSync('foods') || [];
    arr.filter(e=>{
      return e.flag==true;
    })
    this.setData({
      foods: arr,
    })
    this.suantotal();
  },
  // 计算总价格
  suantotal() {
    let price = 0;
    this.data.foods.forEach(e => {
        price += e.number * e.price;
    })
    this.setData({
      total: price,
    })
    //每次改变都调用了这个方法，所以这里保存着每次改变数量就好了
    wx.setStorageSync('foods', this.data.foods)
  },
  topay(){
    let token = wx.getStorageSync("token")
    if(!token) {
      wx.navigateTo({
        url: '/pages/shouquan/index',
      })
    }else {
      let goods =  this.data.foods.map(e=>{
        return {
          goods_id:e.id,
          goods_number:e.number,
          goods_price:e.price
        }
      })
      axios({
        method:'POST',
        url:'/my/orders/create',
        header: { Authorization:token},
        data:{
          order_price:this.data.total,
          consignee_addr:this.data.useraddress.username+this.data.useraddress.phone+this.data.useraddress.address,
          goods
        }
      }).then(res=>{
        // console.log(res);
        let { order_number} = res.data.message;
        axios({
          method:'POST',
          url:'/my/orders/req_unifiedorder',
          header: { Authorization:token},
          data: {order_number}
        }).then(res=>{
          // console.log(res);
          let {pay} =res.data.message;
          wx.requestPayment({
            ...pay,
            success:res=> { 
              // console.log(res);
              wx.showToast({
                title: '支付成功',
                icon: 'success',
                duration: 2000
              })
              wx.switchTab({
                url: '/pages/shopcar/index',
              })
              let arr = wx.getStorageSync('foods')
              arr = arr.filter((e,i)=>{
                if(this.data.foods[i]) {
                  if(this.data.foods[i].id !=e.id) {
                    return e;
                  }
                }
              })
              wx.setStorageSync("foods", arr)
            }
          })
        })
      })
    }
  }

})