// pages/foodsdetail/index.js
import axios from '../../utils/axios.js'
Page({
  data:{
    detail:{}
  },
  onLoad(option){
    // console.log(option.id)
    axios({
      url:'/goods/detail',
      // data: { goods_id: option.id }
      data: { goods_id:57444}
    }).then(res=>{
      console.log(res);
      let {message} = res.data
      this.setData({
        detail:message
      })
    })
  }
  
})