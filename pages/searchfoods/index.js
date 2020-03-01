// pages/searchfoods/index.js
import axios from "../../utils/axios.js"
Page({
  data:{
    current:0,
      query:'',
      cid:'',
      pagenum:1,
      foodslist:[],
  },
  typetab(e){
    this.setData({
      current:e.currentTarget.dataset.index
    })
  },
  aboutfoods(e){
    this.setData({
        query:e.detail.value, 
    })
    // console.log(this.data.query)
    axios({
      url:"/goods/search",
      data:this.data.query,
    }).then(res=>{
      let {goods} = res.data.message;
      this.setData({
        foodslist:goods,
      })
    })
  },
  onReachBottom(){
    let page =1;
    this.setData({
      pagenum:page+this.data.pagenum,
    })
    // console.log(this.data.query)
    axios({
      url: "/goods/search",
      data: {
        query: this.data.query,
        pagenum:this.data.pagenum,
      }
    }).then(res => {
      // console.log(res)
      if(res.data.message.total===0) {
        wx.showToast({
          title: '没哟数据了哦',
          icon: 'success',
          duration: 2000
        })
        return;
      }
      let { goods } = res.data.message;
      goods.forEach(e=>{
        this.data.foodslist.push(e)
      })
      this.setData({
        foodslist:this.data.foodslist,
      })
    })
  },
  tiaozhuan(e){
    console.log(e.currentTarget.dataset.id)
  },
  onLoad(option){
    // console.log(option.id)
    this.setData({
      cid: option.id,
    })
    axios({
      url:'/goods/search',
      data:this.data.cid
    }).then(res=>{
      let { goods } = res.data.message;
      this.setData({
        foodslist: goods,
      })
    })
  }
})