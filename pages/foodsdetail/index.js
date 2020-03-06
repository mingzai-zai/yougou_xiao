// pages/foodsdetail/index.js
import axios from '../../utils/axios.js'
Page({
  data:{
    detail:{},
    current:0
  },
  onLoad(option){
    // console.log(option.id)
    axios({
      url:'/goods/detail',
      data: { goods_id: option.id }
      // data: { goods_id:57444}
    }).then(res=>{
      // console.log(res);
      let {message} = res.data
      this.setData({
        detail:message
      })
    })
  },
  //点击放大图片
  fangda(e){
    let arr = this.data.detail.pics.map(e=>{
      return e.pics_big_url
    })
    // console.log(e.currentTarget.dataset.src)
    wx.previewImage({
      current: e.currentTarget.dataset.src, // 当前显示图片的http链接
      urls: arr // 需要预览的图片http链接列表
    })
  },
  // 点击跳转到tabbar的购物车页面
  tocarpage(){
    wx.switchTab({
      url: '/pages/shopcar/index'
    })
  },
  // tab栏的切换
  qiehuan(e){
    this.setData({
      current:e.target.dataset.index
    })
  },
  //加入购物车
  joincar(){
    let arr = wx.getStorageSync('foods') || [];
    let obj = arr.find(e=>{
      return e.id == this.data.detail.goods_id
    })
    // console.log(obj);没有的话返回undefined
    if(obj) {
      obj.number +=1;
    }else {
      arr.unshift({
        //要有标识
        id: this.data.detail.goods_id,
        title: this.data.detail.goods_name,
        price: this.data.detail.goods_price,
        logo: this.data.detail.goods_small_logo,
        //默认一开始数量为1
        number: 1,
        //默认一开始是选中状态
        flag:true,
      })
    }
    
    wx.setStorageSync('foods',arr)
  }
})