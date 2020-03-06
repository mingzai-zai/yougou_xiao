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
    //每次改变都调用了这个方法，所以这里保存着每次改变数量就好了
    wx.setStorageSync('foods', this.data.foods)
  },
  // 增加数量按钮
  changenumber(e){
    let {index,num}= e.target.dataset;
    // console.log(this.data.foods[index])
    // 如果是先计算再去判断的话就要判断就要<1时候而且取消按键时候值要等于1或者加1因为计算完是0取消要返回原来1这个值
    // console.log(this.data.foods[index].number)
    this.data.foods[index].number += num;
    // if (this.data.foods[index].number==1) return;
    if (this.data.foods[index].number<1) {
      wx.showModal({
        title: '提示',
        content: '是否要删除改商品',
        success:res=> {
          if (res.confirm) {
            //此时外面的setData已经设置完成了里面的数据没有更新，这里是异步队列
            // console.log('用户点击确定')
            this.data.foods.splice(index,1)
          } else if (res.cancel) {
            // console.log('用户点击取消')
            this.data.foods[index].number = 1;
          }
          this.setData({
            foods:this.data.foods,
          })
        }
      })
    }
    // 想要页面显示就必须要this.setData
    this.setData({
      foods:this.data.foods
    })
    //一改变就开始计算
    this.suantotal();
  }
})