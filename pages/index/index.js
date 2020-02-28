//index.js
import axios from "../../utils/axios.js"
Page({
  data:{
    swiperlist:[],
    navs:[],
    pictures:[],
    flag:false
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
      // console.log(res);
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
    // 获取类型的图片
    axios({
      url:'/home/floordata',
    }).then(res=>{
      // console.log(res);
      let {message} = res.data;
      this.setData({
        pictures:message
      })
     })
  },
  toTop(){
    wx.pageScrollTo({
      scrollTop:0
    })
  },
  onPageScroll(e){
    // console.log(this.data.flag)
    let hight = e.scrollTop;
    var flag2 = this.data.flag;
    // console.log(hight)
    if(hight>=200) {
      flag2= true;
    }else {
     flag2=false;
    }
    if(flag2==this.data.flag) return;
    this.setData({
      flag:flag2
    })
  }
})
