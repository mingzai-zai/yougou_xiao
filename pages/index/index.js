//index.js
import axios from "../../utils/axios.js"
Page({
  data:{
    swiperlist:[],
  },
  onLoad(){
    axios({
      url:'/home/swiperdata'
    }).then(res=>{
      // console.log(res);
      let {message} = res.data;
      this.setData({
        swiperlist:message
      })
    })
  }
})
