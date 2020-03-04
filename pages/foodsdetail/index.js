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
  }
})