// pages/searchfoods/index.js
import axios from "../../utils/axios.js"
Page({
  data:{
    current:0,
      query:'',
      pagenum:1,
      foodslist:[],
  },
  typetab(e){
    this.setData({
      current:e.currentTarget.dataset.index
    })
  },
  // 搜索其他商品
  aboutfoods(e){
    this.setData({
        query:e.detail.value, 
    })
    // console.log(this.data.query)
    this.getData();
  },
  // 下拉
  onReachBottom(){
    this.setData({
      pagenum:++this.data.pagenum,
    })
    this.getData();
    // console.log(this.data.query)
    
  },
  tiaozhuan(e){
    wx.navigateTo({
      url: `/pages/foodsdetail/index?id=${e.currentTarget.dataset.id}`,
    })
  },
  // 刚开始加载时候
  onLoad(option){
    // console.log(option.keyword)
    if (option.keyword){
     this.setData({
       query: option.keyword,
     })
     this.getData();
   }
  },
  // 封装
  getData(){
    axios({
      url: "/goods/search",
      data: {
        query: this.data.query,
        pagenum: this.data.pagenum,
        pagesize: 10,
      }
    }).then(res => {
      // console.log(res)
      if (res.data.message.goods.length === 0) {
        wx.showToast({
          title: '没哟数据了哦',
          icon: 'success',
          duration: 2000
        })
        return;
      }
      let { goods } = res.data.message;
      goods = goods.map(e => {
        e.goods_price = parseInt(e.goods_price).toFixed(2)
        return e;
      })
      // goods.forEach(e=>{
      //   this.data.foodslist.push(e)
      // })
      this.setData({
        foodslist: [...this.data.foodslist, ...goods],
      })
    })
  }
})