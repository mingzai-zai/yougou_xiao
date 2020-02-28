//index.js
import axios from "../../utils/axios.js"
Page({
  data:{
    swiperlist:[],
    navs:[]
  },
  onLoad(){
    // 轮播图的
    axios({
      url:'/home/swiperdata'
    }).then(res=>{
      // console.log(res);
      let {message} = res.data;
      this.setData({
        swiperlist:message
      })
    })
    // nvas的
    axios({
      url:'/home/catitems'
    }).then(res=>{
      console.log(res);
      let {message} = res.data;
      message.map((e,i)=>{
        if(i===0) {
          e.url="/pages/sort/index"
        }
        return e;
      })
      this.setData({
        navs:message
      })
    })

  }
})
